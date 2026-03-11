import { SettingsManager } from '@/config/settings';
import { Logger, LogModule } from '@/core/logger';
import { tryGetDbForChat } from '@/data/db';
import { getCurrentChatId } from '@/integrations/tavern';
import { scanEntities, scanEvents } from '@/modules/memory/EntityScanner';
import { ScoredEvent } from '@/modules/rag/retrieval/HybridScorer';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

const MODULE = 'KeywordRetrieveStep';

export class KeywordRetrieveStep implements IStep {
    name = 'KeywordRetrieveStep';

    async execute(context: JobContext): Promise<void> {
        context.data = context.data || {};

        const query = context.input?.query as string;
        const unifiedQueries = context.input?.unifiedQueries as string[] | undefined;

        const textToScan = unifiedQueries && unifiedQueries.length > 0
            ? unifiedQueries.join('\n')
            : query;

        if (!textToScan) {
            Logger.debug(LogModule.RAG_INJECT, '没有提供扫描上下文，跳过关键词检索');
            context.data.keywordCandidates = [];
            context.data.keywordEntityIds = [];
            return;
        }

        const chatId = getCurrentChatId();
        if (!chatId) return;

        const db = tryGetDbForChat(chatId);
        if (!db) return;

        const startTime = Date.now();
        const apiSettings = SettingsManager.get('apiSettings');
        const recallConfig = apiSettings?.recallConfig;

        // P0 & P1 Fix: 此处不再因为无归档事件而直接返回
        // 归档事件检查应仅限制在“事件扫描”部分，不能连累实体扫描
        let hasArchivedEvents = false;
        try {
            const filtered: any = (db.events as any).where?.('is_archived').equals(1);
            if (filtered) {
                const count = await filtered.limit(1).count();
                hasArchivedEvents = count > 0;
            } else {
                // 回退逻辑
                const count = await db.events.toCollection().filter(e => !!e.is_archived).limit(1).count();
                hasArchivedEvents = count > 0;
            }
        } catch (err) {
            Logger.warn(MODULE, '无法检查归档事件状态，默认尝试扫描', err);
            hasArchivedEvents = true; 
        }

        // 1. 获取轻量级数据镜像进行初步扫描 (P1 Fix: 内存优化)
        // 仅获取匹配关键词所需的最小字段：id, name, aliases
        const entityIndex = await db.entities.toCollection().toArray(items => 
            items.map(e => ({ id: e.id, name: e.name, aliases: e.aliases }))
        );

        Logger.debug(LogModule.RAG_INJECT, `准备扫描。实体索引总量: ${entityIndex.length}`);

        // P1 Fix: Hard limit keyword results to avoid candidate explosion
        // 事件/实体分别设上限（优先读 recallConfig.keywordTopK，其次回退到 embedding.topK/默认值）
        const eventTopK = recallConfig?.keywordTopK?.events
            ?? recallConfig?.embedding?.topK
            ?? 50;
        const entityTopK = recallConfig?.keywordTopK?.entities
            ?? 30;

        let hitEntities: any[] = [];
        let hitEvents: any[] = [];

        // 2. 执行关键词扫描
        Logger.debug(LogModule.RAG_INJECT, `扫描文本预览: ${textToScan.slice(0, 50)}...`);

        // 实体扫描 (P0 Fix: 即使无事件也执行)
        if (recallConfig?.enableEntityKeyword !== false) {
            // 首先通过索引进行初步过滤
            const matchedIndex = scanEntities(textToScan, entityIndex as any).slice(0, entityTopK);
            
            if (matchedIndex.length > 0) {
                // 命中后，再批量获取完整对象以进行后续的多跳联想
                const matchedIds = matchedIndex.map(e => e.id);
                hitEntities = await db.entities.bulkGet(matchedIds);
                // 过滤掉可能存在的 undefined
                hitEntities = hitEntities.filter(e => !!e);
                
                Logger.debug(LogModule.RAG_INJECT, `命中了 ${hitEntities.length} 个实体(TopK=${entityTopK}): ${hitEntities.map(e => e.name).join(', ')}`);
            }
        } else {
            Logger.debug(LogModule.RAG_INJECT, '实体关键词扫描已禁用');
        }

        // 事件仅在配置开启且有归档事件时扫描 (P0 Fix: 守卫下沉)
        if (recallConfig?.useKeywordRecall !== false && recallConfig?.enableEventKeyword !== false) {
            if (hasArchivedEvents) {
                const allEvents = await db.events.toArray();
                hitEvents = scanEvents(textToScan, allEvents).slice(0, eventTopK);
                if (hitEvents.length > 0) {
                    Logger.debug(LogModule.RAG_INJECT, `命中了 ${hitEvents.length} 条事件(TopK=${eventTopK})`);
                }
            } else {
                Logger.info(LogModule.RAG_INJECT, '事件关键词扫描跳过：当前无归档事件');
            }
        } else {
            Logger.debug(LogModule.RAG_INJECT, '事件关键词扫描已禁用或主开关关闭');
        }

        // 3. 将命中的事件转化为 ScoredEvent 格式，赋予高初始权重
        const keywordCandidates: ScoredEvent[] = hitEvents.map(event => ({
            id: event.id,
            summary: event.summary,
            // 关键词命中的基础分较高，确保在后续 Rerank 或截断时能占优
            keywordScore: 0.8,
            node: event
        }));

        // 4. 将命中的实体 ID 转储，并执行关系多跳 (Relation Multi-Hop)
        const keywordEntityMap = new Map<string, number>(); // id -> score

        // 4.1. 初始命中实体 (第一跳)
        for (const entity of hitEntities) {
            keywordEntityMap.set(entity.id, 0.9); // 直接命中最高分
        }

        // 4.2. 关系多跳 (第二跳)
        // 优化方案 (V1.4.3): 预构建实体名 -> 实体 Map 以便快速查找
        // 注意：此处多跳依然需要完整的 allEntities 信息（至少需要关系网）
        // 如果命中实体很多，可能还是需要性能考量，暂维持现状或改用动态加载
        const allEntities = await db.entities.toArray();
        const entryMap = new Map<string, any>();
        for (const e of allEntities) {
            entryMap.set(e.name.toLowerCase(), e);
            if (Array.isArray(e.aliases)) {
                for (const alias of e.aliases) {
                    entryMap.set(alias.toLowerCase(), e);
                }
            }
        }

        const hopAttenuation = 0.8; // 多跳衰减系数

        for (const seedEntity of hitEntities) {
            const relations = seedEntity.profile?.relations as Record<string, any> | undefined;
            if (!relations) continue;

            const seedScore = keywordEntityMap.get(seedEntity.id) || 0;
            const hopScore = seedScore * hopAttenuation;

            // 遍历声明的所有关联网
            for (const targetName of Object.keys(relations)) {
                // 使用 Map 替代 O(N) 的 allEntities.find
                const targetEntity = entryMap.get(targetName.toLowerCase());

                if (targetEntity) {
                    const currentScore = keywordEntityMap.get(targetEntity.id) || 0;
                    if (hopScore > currentScore) {
                        keywordEntityMap.set(targetEntity.id, hopScore);
                        Logger.debug(LogModule.RAG_INJECT, `[多跳联想] 由 ${seedEntity.name} 联想到了 ${targetEntity.name} (${hopScore.toFixed(2)})`);
                    }
                }
            }
        }

        const keywordEntityIds = Array.from(keywordEntityMap.entries()).map(([id, score]) => ({ id, score }));

        context.data.keywordCandidates = keywordCandidates;
        context.data.keywordEntityIds = keywordEntityIds;
        context.data.keywordRetrieveTime = Date.now() - startTime;

        Logger.debug(LogModule.RAG_INJECT, `关键词扫描完成，耗时 ${context.data.keywordRetrieveTime}ms。命中实体: ${hitEntities.length} 个，命中事件: ${hitEvents.length} 个`);
    }
}

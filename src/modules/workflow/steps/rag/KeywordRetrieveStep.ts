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

        // V1.4.4: 二次保护——无归档事件时跳过关键词扫描
        // 冷启动阶段即使误入工作流，也不做无效关键词全扫
        const archivedEventCount = await db.events
            .filter(e => !!e.is_archived)
            .limit(1)
            .count();

        if (archivedEventCount === 0) {
            Logger.info(LogModule.RAG_INJECT, '关键词扫描跳过：当前无归档事件可召回');
            context.data.keywordCandidates = [];
            context.data.keywordEntityIds = [];
            context.data.keywordRetrieveTime = Date.now() - startTime;
            return;
        }

        // 1. 获取全量数据 (包含归档实体，因为它们需要通过关键词唤醒)
        const allEntities = await db.entities.toArray();
        Logger.debug(LogModule.RAG_INJECT, `准备扫描。实体库总量: ${allEntities.length}`, {
            archivedCount: allEntities.filter(e => e.is_archived).length
        });

        let hitEntities: any[] = [];
        let hitEvents: any[] = [];

        // 2. 执行关键词扫描
        Logger.debug(LogModule.RAG_INJECT, `扫描文本预览: ${textToScan.slice(0, 50)}...`);

        // 实体扫描
        if (recallConfig?.enableEntityKeyword !== false) {
            hitEntities = scanEntities(textToScan, allEntities);
            if (hitEntities.length > 0) {
                Logger.debug(LogModule.RAG_INJECT, `命中了 ${hitEntities.length} 个实体: ${hitEntities.map(e => e.name).join(', ')}`);
            }
        } else {
            Logger.debug(LogModule.RAG_INJECT, '实体关键词扫描已禁用');
        }

        // 事件仅在配置开启时扫描
        if (recallConfig?.useKeywordRecall !== false && recallConfig?.enableEventKeyword !== false) {
            const allEvents = await db.events.toArray();
            hitEvents = scanEvents(textToScan, allEvents);
            if (hitEvents.length > 0) {
                Logger.debug(LogModule.RAG_INJECT, `命中了 ${hitEvents.length} 条事件`);
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
        // 优化方案 (V1.4.3): 预构建实体名 -> 实体 Map 以便快速查找，消除 O(N) 复杂度的 find
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

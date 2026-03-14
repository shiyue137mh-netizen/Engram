import { SettingsManager } from '@/config/settings';
import { DEFAULT_RECALL_CONFIG } from '@/config/types/defaults';
import { Logger, LogModule } from '@/core/logger';
import { tryGetDbForChat } from '@/data/db';
import { getCurrentChatId } from '@/integrations/tavern';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { type ScoredEvent } from '@/modules/rag/retrieval/HybridScorer';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

export class VectorRetrieveStep implements IStep {
    name = 'VectorRetrieveStep';

    async execute(context: JobContext): Promise<void> {
        // Ensure context.data is initialized
        context.data = context.data || {};

        // P0 Fix: 不再暴力抛错，改为在后文根据 fallback 逻辑判断
        const query = (context.input?.query as string) || '';
        const unifiedQueries = context.input?.unifiedQueries as string[] | undefined;

        const apiSettings = SettingsManager.get('apiSettings');
        const config = apiSettings?.recallConfig || DEFAULT_RECALL_CONFIG;

        // 如果未启用向量检索，则跳过 (但不清空 keyword 结果)
        if (!config.useEmbedding || !config.enabled) {
            Logger.debug(LogModule.RAG_INJECT, '向量检索未开启，跳过 VectorRetrieveStep');
            return;
        }

        const startTime = Date.now(); // Renamed from vectorRetrieveStartTime
        context.data.vectorRetrieveStartTime = startTime; // Keep for backward compatibility if needed

        const chatId = getCurrentChatId();
        if (!chatId) {
            context.data.candidates = [];
            return;
        }

        const db = tryGetDbForChat(chatId);
        if (!db) {
            context.data.candidates = [];
            return;
        }

        // P1 Fix: 使用流式读取或更轻量的过滤。此处暂时先读取有向量的事件，后面可以考虑游标过滤
        // 注意：Dexie 的 filter 是内存操作，toArray 才会拉取。这里如果是大量事件，toArray 依然有压力。
        // 改为流式处理计算相似度时再收集。
        const events: any[] = [];
        await db.events
            .toCollection()
            .each(e => {
                if (e.embedding && e.embedding.length > 0) {
                    events.push(e);
                }
            });

        // 获取查询的嵌入向量
        let queryVector: number[];

        try {
            // V1.4.1 Fix: 在嵌入前配置 Embedding 服务，防止 "config not set" 错误
            const vectorConfig = SettingsManager.get('apiSettings')?.vectorConfig;
            Logger.debug(LogModule.RAG_RETRIEVE, 'VectorRetrieveStep: 准备设置配置', { hasConfig: !!vectorConfig });
            if (vectorConfig) {
                embeddingService.setConfig(vectorConfig);
                Logger.debug(LogModule.RAG_RETRIEVE, 'VectorRetrieveStep: 配置已设置');
            } else {
                Logger.warn(LogModule.RAG_RETRIEVE, 'VectorRetrieveStep: 向量配置缺失，跳过向量检索');
                context.data.candidates = [];
                return;
            }

            // V1.0.3: 优先使用 unifiedQueries 第一条，否则使用 userInput
            const isFallbackFromChat = !unifiedQueries || unifiedQueries.length === 0;
            const rawQuery = !isFallbackFromChat ? unifiedQueries![0] : query;
            
            // P2 Fix: 使用字符级安全的截断方式，防止 Emoji/多字节字符截断损坏
            const maxLength = isFallbackFromChat ? 300 : 500;
            const searchQuery = Array.from(rawQuery).length > maxLength 
                ? Array.from(rawQuery).slice(0, maxLength).join('') + "..." 
                : rawQuery;

            if (Array.from(rawQuery).length > maxLength) {
                Logger.debug(LogModule.RAG_RETRIEVE, `VectorRetrieveStep: 查询过长，已裁剪至 ${maxLength} 字符`, {
                    originalLength: rawQuery.length,
                    isFallback: isFallbackFromChat
                });
            }

            queryVector = await embeddingService.embed(searchQuery);
        } catch (e: any) {
            Logger.warn(LogModule.RAG_RETRIEVE, '生成查询向量失败', { error: e.message });
            context.data.candidates = [];
            return;
        }

        // 计算相似度
        const candidates: ScoredEvent[] = [];
        for (const event of events) {
            if (event.embedding && event.embedding.length > 0) {
                const similarity = embeddingService.cosineSimilarity(queryVector, event.embedding);
                const threshold = config.embedding?.minScoreThreshold ?? 0.3;
                if (similarity >= threshold) {
                    candidates.push({
                        id: event.id,
                        summary: event.summary,
                        embeddingScore: similarity,
                        node: event,
                    });
                }
            }
        }

        // 按相似度降序排序
        const sortedCandidates = candidates.sort((a, b) => (b.embeddingScore || 0) - (a.embeddingScore || 0));

        // 截取 Top K (在 HybridPipeline 中可以稍微多取一点供 Rerank，但这里为了保持一致先按配置)
        // 注意：hybridSearch 原始逻辑中如果后续有 rerank 会传给 rerank，因此多保留些可能是好的。
        // 但原始代码直接 slice(0, topK)。我们沿用它。
        const topK = config.embedding?.topK || 20;
        context.data.candidates = sortedCandidates.slice(0, topK);
        context.data.embeddingTime = Date.now() - startTime; // New field
        context.data.vectorRetrieveTime = context.data.embeddingTime; // Keep for backward compatibility if needed
        context.data.vectorConfig = config.embedding; // New field
        context.data.recallConfig = config;

        Logger.debug(LogModule.RAG_INJECT, `向量检索完成，得到 ${context.data.candidates.length} 个候选`);
    }
}

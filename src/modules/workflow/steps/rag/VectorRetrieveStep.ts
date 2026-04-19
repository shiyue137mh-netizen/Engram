import { SettingsManager } from '@/config/settings';
import { DEFAULT_RECALL_CONFIG } from '@/config/types/defaults';
import { LogModule, Logger } from '@/core/logger';
import { tryGetDbForChat } from '@/data/db';
import { getCurrentChatId } from '@/integrations/tavern';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import type { ScoredEvent } from '@/modules/rag/retrieval/HybridScorer';
import type { JobContext } from '../../core/JobContext';
import type { IStep, RetryConfig } from '../../core/Step';

export class VectorRetrieveStep implements IStep {
    name = 'VectorRetrieveStep';

    get retry(): RetryConfig {
        const vectorConfig = SettingsManager.get('apiSettings')?.vectorConfig;
        const customConfig = vectorConfig?.retryConfig;
        return {
            backoff: 'exponential',
            delay: customConfig?.retryDelay ?? 2000,
            maxAttempts: customConfig?.maxAttempts ?? 3,
            retryIf: (error: any) => {
                const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
                return msg.includes('429') ||
                       msg.includes('rate limit') ||
                       msg.includes('timeout') ||
                       msg.includes('network error') ||
                       msg.includes('failed to fetch');
            }
        };
    }

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

        const threshold = config.embedding?.minScoreThreshold ?? 0.3;
        const topK = config.embedding?.topK || 20;

        // 获取查询的嵌入向量
        let queryVector: number[];

        try {
            // V1.4.1 Fix: 在嵌入前配置 Embedding 服务，防止 "config not set" 错误
            const vectorConfig = SettingsManager.get('apiSettings')?.vectorConfig;
            Logger.debug(LogModule.RAG_RETRIEVE, 'VectorRetrieveStep: 准备设置配置', { hasConfig: Boolean(vectorConfig) });
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
            const searchQuery = [...rawQuery].length > maxLength
                ? [...rawQuery].slice(0, maxLength).join('') + "..."
                : rawQuery;

            if ([...rawQuery].length > maxLength) {
                Logger.debug(LogModule.RAG_RETRIEVE, `VectorRetrieveStep: 查询过长，已裁剪至 ${maxLength} 字符`, {
                    isFallback: isFallbackFromChat,
                    originalLength: rawQuery.length
                });
            }

            queryVector = await embeddingService.embed(searchQuery);
        } catch (error: any) {
            Logger.warn(LogModule.RAG_RETRIEVE, '生成查询向量失败', { error: error.message });
            // P2 Update: 为了让 WorkflowEngine 触发重试逻辑，这里需要向上抛出而不是静默吞没
            // 如果所有的重试都失败了，WorkflowEngine 会中断整个 Workflow，这比悄悄生成低质量回复更好
            throw error;
        }

        // 计算相似度（流式维护 TopK，避免全量事件入内存）
        const candidates: ScoredEvent[] = [];
        let scannedEvents = 0;
        let embeddedEvents = 0;
        let matchedEvents = 0;

        await db.events.toCollection().each(event => {
            scannedEvents += 1;

            if (!event.embedding || event.embedding.length === 0) {
                return;
            }

            embeddedEvents += 1;

            const similarity = embeddingService.cosineSimilarity(queryVector, event.embedding);
            if (similarity < threshold) {
                return;
            }

            matchedEvents += 1;
            const candidate: ScoredEvent = {
                embeddingScore: similarity,
                id: event.id,
                node: event,
                summary: event.summary,
            };

            if (candidates.length < topK) {
                candidates.push(candidate);
                candidates.sort((a, b) => (b.embeddingScore || 0) - (a.embeddingScore || 0));
                return;
            }

            const tailScore = candidates.at(-1)?.embeddingScore || 0;
            if (similarity <= tailScore) {
                return;
            }

            candidates[candidates.length - 1] = candidate;
            candidates.sort((a, b) => (b.embeddingScore || 0) - (a.embeddingScore || 0));
        });

        context.data.candidates = candidates;
        context.data.embeddingTime = Date.now() - startTime; // New field
        context.data.vectorRetrieveTime = context.data.embeddingTime; // Keep for backward compatibility if needed
        context.data.vectorConfig = config.embedding; // New field
        context.data.recallConfig = config;

        Logger.debug(LogModule.RAG_INJECT, '向量检索完成', {
            candidateCount: context.data.candidates.length,
            embeddedEvents,
            matchedEvents,
            scannedEvents,
            threshold,
            topK,
        });
    }
}

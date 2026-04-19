import { SettingsManager } from '@/config/settings';
import { DEFAULT_RECALL_CONFIG } from '@/config/types/defaults';
import type { RecallConfig } from '@/config/types/rag';
import { LogModule, Logger } from '@/core/logger';
import { type ScoredEvent, mergeResults, scoreAndSort } from '@/modules/rag/retrieval/HybridScorer';
import { rerankService } from '@/modules/rag/retrieval/Reranker';
import type { JobContext } from '../../core/JobContext';
import type { IStep, RetryConfig } from '../../core/Step';

export class RerankMergeStep implements IStep {
    name = 'RerankMergeStep';
    ignoreFailure = true;

    get retry(): RetryConfig {
        const rerankConfig = SettingsManager.get('apiSettings')?.rerankConfig;
        const customConfig = rerankConfig?.retryConfig;
        
        return {
            backoff: 'exponential',
            delay: customConfig?.retryDelay ?? 2000,
            maxAttempts: customConfig?.maxAttempts ?? 3,
            retryIf: (error: any) => {
                const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
                return msg.includes('429') ||
                       msg.includes('rate limit') ||
                       msg.includes('timeout') ||
                       msg.includes('network') ||
                       msg.includes('failed to fetch');
            }
        };
    }


    async execute(context: JobContext): Promise<void> {
        context.data = context.data || {};
        const vectorCandidates: ScoredEvent[] = context.data.candidates || [];
        const keywordCandidates: ScoredEvent[] = context.data.keywordCandidates || [];
        const config: RecallConfig | undefined = context.data.recallConfig;

        // 1. 合并向量检索和关键词检索的候选 (按 ID 去重，保留最高分)
        const candidateMap = new Map<string, ScoredEvent>();

        // 优先加载关键词候选
        for (const candidate of keywordCandidates) {
            candidateMap.set(candidate.id, candidate);
        }

        // 合并向量候选，记录 embeddingScore
        for (const candidate of vectorCandidates) {
            if (candidateMap.has(candidate.id)) {
                // 如果已存在（被关键词命中），补充 embeddingScore
                const existing = candidateMap.get(candidate.id)!;
                existing.embeddingScore = candidate.embeddingScore;
            } else {
                candidateMap.set(candidate.id, candidate);
            }
        }

        const candidates = [...candidateMap.values()];
        const activeConfig = config || SettingsManager.get('apiSettings')?.recallConfig || DEFAULT_RECALL_CONFIG;

        if (candidates.length === 0) {
            Logger.info(LogModule.RAG_INJECT, '没有合并候选，跳过 RerankMergeStep');
            context.data.candidates = [];
            return;
        }

        // P1 Fix: 二次 hard-limit，避免 KeywordRetrieveStep 的候选爆炸穿透到后续
        // - 若配置存在 keywordTopK/events，则以其为上限，否则回退 embedding.topK
        const hardLimit = activeConfig.keywordTopK?.events ?? activeConfig.embedding?.topK ?? 50;
        const limitedCandidates = candidates.slice(0, Math.max(1, hardLimit));

        context.data.originalCandidateCount = candidates.length;
        context.data.keywordHardLimit = hardLimit;

        // 在重试机制介入前，预先设置好降级候选列表，以防多次尝试彻底失败后 WorkflowEngine 根据 ignoreFailure 继续执行时空结果
        context.data.candidates = scoreAndSort(limitedCandidates, 0);

        // 2. Rerank 重排序 (如果启用且服务可用)
        let finalCandidates = limitedCandidates;
        let rerankTime = 0;

        if (activeConfig.useRerank && rerankService.isEnabled()) {
            context.data.rerankStartTime = Date.now();
            const query = context.input?.query as string;
            const unifiedQueries = context.input?.unifiedQueries as string[] | undefined;
            const rerankQuery = unifiedQueries?.[0] || query;
            const documents = limitedCandidates.map(c => c.summary);

            try {
                const rerankResults = await rerankService.rerank(rerankQuery, documents);
                rerankTime = Date.now() - context.data.rerankStartTime;

                const embeddingMap = new Map(limitedCandidates.map(c => [c.id, c]));
                const alpha = rerankService.getHybridAlpha();

                finalCandidates = mergeResults(
                    embeddingMap,
                    rerankResults,
                    limitedCandidates,
                    alpha
                );
                
                context.data.candidates = finalCandidates;
            } catch (error: any) {
                Logger.warn(LogModule.RAG_RETRIEVE, 'Rerank 失败，准备重试或回退', { error: error.message });
                throw error; // 抛出异常交给 WorkflowEngine 重试，若穷尽则忽略失败继续使用初始 fallback
            }
        }

        context.data.rerankTime = rerankTime;

        Logger.debug(LogModule.RAG_INJECT, `Rerank/Merge 完成，最终事件候选: ${finalCandidates.length} 个`, {
            keyword: keywordCandidates.length,
            vector: vectorCandidates.length
        });
    }
}

import { Logger, LogModule } from '@/core/logger';
import { RecallLogService } from '@/core/logger/RecallLogger';
import { WorldbookScannerService } from '@/integrations/tavern/worldbook/scanner';
import { ScoredEvent } from '@/modules/rag/retrieval/HybridScorer';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

export class RecordRecallLogStep implements IStep {
    name = 'RecordRecallLogStep';

    async execute(context: JobContext): Promise<void> {
        context.data = context.data || {};
        const candidates: ScoredEvent[] = context.data.candidates || [];
        const query = (context.input?.query as string) || '';
        const unifiedQueries = context.input?.unifiedQueries as string[] | undefined;
        const mode = (context.input?.mode as string) || 'hybrid';
        const recalledEntities = context.data.recalledEntities || [];

        // 整理输出结构匹配原 Retriever 的 RetrievalResult
        const nodes = candidates
            .filter(c => c.node)
            .map(c => c.node!);

        const entries = candidates.map(c => c.summary);

        // 获取并行激活的世界书条目 (用于汇总日志展示)
        let worldbookEntriesCount = 0;
        try {
            // 这只是为了展示在日志里，不需要等待它注入，ST 会自己处理注入
            const worldInfoText = await WorldbookScannerService.getActivatedWorldInfo();
            worldbookEntriesCount = worldInfoText ? worldInfoText.split('\n\n').length : 0;
        } catch (e) {
            Logger.debug(LogModule.RAG_INJECT, '获取世界书条目统计失败');
        }

        RecallLogService.log({
            query,
            preprocessedQuery: unifiedQueries?.[0],
            mode: mode as 'hybrid' | 'agentic',
            results: candidates.map(c => ({
                eventId: c.id,
                summary: c.summary,
                category: c.node?.structured_kv?.event || 'unknown',
                embeddingScore: c.embeddingScore || 0,
                keywordScore: (c as any).keywordScore,
                rerankScore: c.rerankScore,
                hybridScore: c.hybridScore,
                isTopK: true,
                isReranked: c.rerankScore != null,
                sourceFloor: c.node?.source_range?.start_index,
            })),
            recalledEntities,
            stats: {
                totalCandidates: context.data.originalCandidateCount || candidates.length,
                topKCount: candidates.length,
                rerankCount: candidates.length,
                latencyMs: (context.data.vectorRetrieveTime || 0) + (context.data.keywordRetrieveTime || 0) + (context.data.rerankTime || 0),
            },
            brainStats: context.data.brainStats,
        });

        const totalTime = (context.data.vectorRetrieveTime || 0) + (context.data.keywordRetrieveTime || 0) + (context.data.rerankTime || 0);

        Logger.info(LogModule.RAG_INJECT, '召回汇总报告', {
            entities: recalledEntities.length,
            events: nodes.length,
            worldbook: worldbookEntriesCount,
            totalTime: `${totalTime}ms`,
            isEmbedding: !!context.data.recallConfig?.useEmbedding,
            isRerank: !!context.data.recallConfig?.useRerank,
        });

        context.output = { entries, nodes, candidates, recalledEntities };
    }
}

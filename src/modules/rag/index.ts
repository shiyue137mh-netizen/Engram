/**
 * RAG 服务模块导出
 */

export { embeddingService, EmbeddingService } from './embedding/EmbeddingService';
export type { EmbedRequest, EmbedResult, EmbedProgressCallback } from './embedding/EmbeddingService';

export { retriever, Retriever } from './retrieval/Retriever';
export type { RetrievalResult } from './retrieval/Retriever';

export { rerankService, RerankService } from './retrieval/Reranker';
export type { RerankResultItem } from './retrieval/Reranker';

export { scoreAndSort, mergeResults, calculateHybridScore, normalizeScores, applySticky } from './retrieval/HybridScorer';
export type { ScoredEvent, RecallResult } from './retrieval/HybridScorer';

export { injector, Injector } from './injection/Injector';

export { RecallLogService } from '@/core/logger/RecallLogger';

export { stickyCache, StickyCache, DEFAULT_STICKY_CONFIG } from './retrieval/StickyCache';
export type { StickyConfig } from './retrieval/StickyCache';

// V0.9.5: 类脑召回系统
export { brainRecallCache, BrainRecallCache } from './retrieval/BrainRecallCache';
export type { MemorySlot, RecallCandidate } from './retrieval/BrainRecallCache';

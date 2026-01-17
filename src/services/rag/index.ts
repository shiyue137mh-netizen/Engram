/**
 * RAG 服务模块导出
 */

export { embeddingService, EmbeddingService } from './EmbeddingService';
export type { EmbedRequest, EmbedResult, EmbedProgressCallback } from './EmbeddingService';

export { retriever, Retriever } from './Retriever';
export type { RetrievalResult } from './Retriever';

export { rerankService, RerankService } from './RerankService';
export type { RerankResultItem } from './RerankService';

export { scoreAndSort, mergeResults, calculateHybridScore, normalizeScores, applySticky } from './HybridScorer';
export type { ScoredEvent, RecallResult } from './HybridScorer';

export { injector, Injector } from './Injector';

export { RecallLogService } from './RecallLogService';

export { stickyCache, StickyCache, DEFAULT_STICKY_CONFIG } from './StickyCache';
export type { StickyConfig } from './StickyCache';

// V0.9.5: 类脑召回系统
export { brainRecallCache, BrainRecallCache } from './BrainRecallCache';
export type { MemorySlot, RecallCandidate } from './BrainRecallCache';

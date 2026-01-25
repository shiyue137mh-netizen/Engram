/**
 * 召回日志类型定义
 */

/**
 * 单条召回结果
 */
export interface RecallResultItem {
    eventId: string;
    summary: string;
    category: string;
    embeddingScore: number;       // 向量相似度 [0-1]
    rerankScore?: number;         // Rerank 分数 [0-1]
    hybridScore?: number;         // 混合分数
    isTopK: boolean;              // 是否进入 TopK
    isReranked: boolean;          // 是否通过 Rerank
    sourceFloor?: number;         // 来源楼层
}

/**
 * 召回统计
 */
export interface RecallStats {
    totalCandidates: number;      // 候选总数
    topKCount: number;            // TopK 数量
    rerankCount: number;          // Rerank 后数量
    latencyMs: number;            // 耗时 (ms)
}

/**
 * 召回日志条目
 */
export interface RecallLogEntry {
    id: string;
    timestamp: number;
    query: string;                        // 检索查询
    preprocessedQuery?: string;           // 预处理后的查询
    mode: 'embedding' | 'hybrid';         // (Disabled in V0.8.5)
    results: RecallResultItem[];          // 召回结果
    stats: RecallStats;                   // 统计信息
}

/**
 * 召回日志存储
 */
interface RecallLogStore {
    logs: RecallLogEntry[];
    maxLogs: number;
}

/**
 * 默认配置
 */
const DEFAULT_RECALL_LOG_STORE: RecallLogStore = {
    logs: [],
    maxLogs: 50,
};

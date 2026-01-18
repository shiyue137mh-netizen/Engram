/**
 * HybridScorer - 混合打分算法
 *
 * V0.8.5: 用于合并 Embedding 相似度分数和 Rerank 分数
 */

import { Logger } from '@/core/logger';
import type { EventNode } from '@/data/types/graph';
import type { StickyCache, StickyConfig } from './StickyCache';

// ==================== 类型定义 ====================

/**
 * 带分数的事件
 */
export interface ScoredEvent {
    /** 事件 ID */
    id: string;
    /** 事件摘要 */
    summary: string;
    /** Embedding 余弦相似度分数 (0-1) */
    embeddingScore?: number;
    /** Rerank 相关性分数 (0-1) */
    rerankScore?: number;
    /** 混合分数 */
    hybridScore?: number;
    /** 黏性惩罚分数 (0-1) */
    stickyPenalty?: number;
    /** 是否处于黏性期 */
    isSticky?: boolean;
    /** 原始事件节点 */
    node?: EventNode;
}

/**
 * 召回结果
 */
export interface RecallResult {
    /** 最终召回的事件 ID 列表 */
    finalIds: string[];
    /** 带分数的候选事件 */
    scoredEvents: ScoredEvent[];
    /** 统计信息 */
    stats: {
        embeddingCandidateCount: number;
        rerankCandidateCount: number;
        finalCount: number;
        embeddingTime: number;
        rerankTime: number;
        totalTime: number;
    };
}

// ==================== 打分函数 ====================

/**
 * 计算混合分数
 *
 * @param embeddingScore Embedding 相似度分数 (0-1)
 * @param rerankScore Rerank 相关性分数 (0-1)
 * @param alpha 混合权重 (0=纯Embedding, 1=纯Rerank)
 * @returns 混合分数
 */
export function calculateHybridScore(
    embeddingScore: number | null | undefined,
    rerankScore: number | null | undefined,
    alpha: number
): number {
    // 如果只有一个分数，直接返回
    if (embeddingScore == null && rerankScore == null) return 0;
    if (embeddingScore == null) return rerankScore ?? 0;
    if (rerankScore == null) return embeddingScore;

    // 加权平均: hybrid = (1-α) * embedding + α * rerank
    return (1 - alpha) * embeddingScore + alpha * rerankScore;
}

/**
 * 归一化分数到 0-1 范围
 *
 * @param scores 分数数组
 * @returns 归一化后的分数数组
 */
export function normalizeScores(scores: number[]): number[] {
    if (scores.length === 0) return [];

    const min = Math.min(...scores);
    const max = Math.max(...scores);

    // 如果所有分数相同，返回均匀分布
    if (max === min) {
        return scores.map(() => 0.5);
    }

    return scores.map(s => (s - min) / (max - min));
}

/**
 * 对候选事件进行混合打分和排序
 *
 * @param candidates 候选事件列表
 * @param alpha 混合权重
 * @returns 排序后的事件列表
 */
export function scoreAndSort(
    candidates: ScoredEvent[],
    alpha: number
): ScoredEvent[] {
    // 计算每个事件的混合分数
    const scored = candidates.map(event => ({
        ...event,
        hybridScore: calculateHybridScore(
            event.embeddingScore,
            event.rerankScore,
            alpha
        ),
    }));

    // 按混合分数降序排列
    scored.sort((a, b) => (b.hybridScore ?? 0) - (a.hybridScore ?? 0));

    Logger.debug('HybridScorer', '混合打分完成', {
        candidateCount: scored.length,
        topScore: scored[0]?.hybridScore,
        alpha,
    });

    return scored;
}

/**
 * 合并 Embedding 结果和 Rerank 结果
 *
 * @param embeddingResults Embedding 检索结果 (id -> score)
 * @param rerankResults Rerank 结果 (index -> score)
 * @param embeddingCandidates 原始候选列表 (用于索引映射)
 * @param alpha 混合权重
 * @returns 合并后的分数事件列表
 */
export function mergeResults(
    embeddingResults: Map<string, ScoredEvent>,
    rerankResults: { index: number; relevance_score: number }[],
    embeddingCandidates: ScoredEvent[],
    alpha: number
): ScoredEvent[] {
    // 将 Rerank 分数合并到 Embedding 结果中
    for (const rerankItem of rerankResults) {
        const candidate = embeddingCandidates[rerankItem.index];
        if (candidate && embeddingResults.has(candidate.id)) {
            const event = embeddingResults.get(candidate.id)!;
            event.rerankScore = rerankItem.relevance_score;
        }
    }

    // 转换为数组并计算混合分数
    const candidates = Array.from(embeddingResults.values());
    return scoreAndSort(candidates, alpha);
}

/**
 * 应用黏性惩罚
 *
 * 常用于混合打分之后，降低已被连续召回的事件权重
 *
 * @param candidates 候选事件列表
 * @param stickyCache 黏性缓存实例
 * @param config 黏性配置
 * @returns 应用惩罚后重新排序的列表
 */
export function applySticky(
    candidates: ScoredEvent[],
    stickyCache: StickyCache,
    config: StickyConfig
): ScoredEvent[] {
    if (!config.enabled) {
        return candidates;
    }

    // 应用黏性惩罚
    const adjusted = candidates.map(event => {
        const penalty = stickyCache.getStickyPenalty(event.id, config);
        const baseScore = event.hybridScore ?? event.embeddingScore ?? 0;

        // 降低已召回多次的项的分数
        const adjustedScore = baseScore * (1 - penalty);

        return {
            ...event,
            hybridScore: adjustedScore,
            stickyPenalty: penalty,
            isSticky: penalty > 0,
        };
    });

    // 按调整后的分数重新排序
    adjusted.sort((a, b) => (b.hybridScore ?? 0) - (a.hybridScore ?? 0));

    Logger.debug('HybridScorer', '应用黏性惩罚', {
        totalCandidates: candidates.length,
        stickyCount: adjusted.filter(e => e.isSticky).length,
        maxPenalty: Math.max(...adjusted.map(e => e.stickyPenalty ?? 0)),
    });

    return adjusted;
}

/**
 * HybridScorer 单元测试
 *
 * 测试混合打分算法：
 * - calculateHybridScore (通过 scoreAndSort 间接测试)
 * - scoreAndSort
 * - mergeResults
 * - normalizeScores (内部函数，通过行为验证)
 */
import { mergeResults, scoreAndSort, type ScoredEvent } from '@/modules/rag/retrieval/HybridScorer';
import { describe, expect, it } from 'vitest';

// ==================== 工具函数 ====================

function makeScoredEvent(id: string, embeddingScore?: number, rerankScore?: number): ScoredEvent {
    return {
        id,
        summary: `Summary of ${id}`,
        embeddingScore,
        rerankScore,
    };
}

// ==================== 测试 ====================

describe('HybridScorer', () => {

    describe('scoreAndSort', () => {
        it('应按混合分数降序排列', () => {
            const candidates = [
                makeScoredEvent('low', 0.3, 0.2),
                makeScoredEvent('high', 0.9, 0.8),
                makeScoredEvent('mid', 0.6, 0.5),
            ];

            const result = scoreAndSort(candidates, 0.5);

            expect(result[0].id).toBe('high');
            expect(result[1].id).toBe('mid');
            expect(result[2].id).toBe('low');
        });

        it('alpha 参数目前被忽略，应执行简单的分数累加', () => {
            const candidates = [
                makeScoredEvent('emb_high', 0.9, 0.1), // Sum 1.0
                makeScoredEvent('rer_high', 0.1, 0.9), // Sum 1.0
            ];

            const result = scoreAndSort(candidates, 0.5);

            // 验证分数是相加的 (0.9 + 0.1 = 1.0)
            expect(result[0].hybridScore).toBeCloseTo(1.0);
        });

        it('应正确处理多路分数的累加贡献', () => {
            const candidates = [
                makeScoredEvent('both', 0.8, 0.7), // Sum 1.5
                makeScoredEvent('one', 0.9, undefined), // Sum 0.9
            ];

            const result = scoreAndSort(candidates, 0.5);

            expect(result[0].id).toBe('both');
            expect(result[0].hybridScore).toBeCloseTo(1.5);
            expect(result[1].hybridScore).toBeCloseTo(0.9);
        });

        it('应支持 Embedding 和 Rerank 分数的累加', () => {
            const event = makeScoredEvent('test', 0.8, 0.4);
            const result = scoreAndSort([event], 0.5);

            // 0.8 + 0.4 = 1.2
            expect(result[0].hybridScore).toBeCloseTo(1.2);
        });

        it('只有 Embedding 分数时应正确处理', () => {
            const candidates = [
                makeScoredEvent('a', 0.8, undefined),
                makeScoredEvent('b', 0.6, undefined),
            ];

            const result = scoreAndSort(candidates, 0.5);

            expect(result[0].id).toBe('a');
            // 无 rerankScore → 直接返回 embeddingScore
            expect(result[0].hybridScore).toBeCloseTo(0.8);
        });

        it('双 null 分数应返回 0', () => {
            const candidates = [makeScoredEvent('null_test', undefined, undefined)];
            const result = scoreAndSort(candidates, 0.5);

            expect(result[0].hybridScore).toBe(0);
        });

        it('空候选列表应返回空数组', () => {
            const result = scoreAndSort([], 0.5);
            expect(result).toEqual([]);
        });
    });

    describe('mergeResults', () => {
        it('应正确合并 Embedding 和 Rerank 结果', () => {
            const candidates = [
                makeScoredEvent('evt_1', 0.8),
                makeScoredEvent('evt_2', 0.6),
                makeScoredEvent('evt_3', 0.4),
            ];

            const embeddingMap = new Map(candidates.map(c => [c.id, { ...c }]));

            // Rerank 重新排序了顺序
            const rerankResults = [
                { index: 2, relevance_score: 0.9 }, // evt_3 被 Rerank 认为最相关
                { index: 0, relevance_score: 0.7 }, // evt_1
                { index: 1, relevance_score: 0.3 }, // evt_2 被降权
            ];

            const result = mergeResults(embeddingMap, rerankResults, candidates, 0.6);

            // alpha=0.6 → Rerank 占主导
            // evt_1: 0.8 + 0.7 = 1.5
            // evt_3: 0.4 + 0.9 = 1.3
            // evt_2: 0.6 + 0.3 = 0.9
            expect(result[0].id).toBe('evt_1');
            expect(result[1].id).toBe('evt_3');
            expect(result[2].id).toBe('evt_2');

            // 验证 rerankScore 被正确写入
            expect(result.find(r => r.id === 'evt_3')!.rerankScore).toBe(0.9);
        });

        it('应保留未被 Rerank 覆盖的候选', () => {
            const candidates = [
                makeScoredEvent('evt_1', 0.8),
                makeScoredEvent('evt_2', 0.6),
            ];
            const embeddingMap = new Map(candidates.map(c => [c.id, { ...c }]));

            // Rerank 只返回了 1 个
            const rerankResults = [
                { index: 0, relevance_score: 0.9 },
            ];

            const result = mergeResults(embeddingMap, rerankResults, candidates, 0.5);

            expect(result.length).toBe(2); // 两个都保留
            expect(result.find(r => r.id === 'evt_1')!.rerankScore).toBe(0.9);
            expect(result.find(r => r.id === 'evt_2')!.rerankScore).toBeUndefined();
        });
    });
});

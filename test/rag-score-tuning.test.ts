import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrainRecallCache, RecallCandidate } from '../src/modules/rag/retrieval/BrainRecallCache';

// 模拟配置
const mockConfig: any = {
    enabled: true,
    workingLimit: 10,
    shortTermLimit: 50,
    decayRate: 0.08,
    reinforceFactor: 0.2,
    sigmoidTemperature: 0.25, // 0.15 -> 0.25 (V1.4)
    contextSwitchThreshold: 0.3,
    boredomThreshold: 5,
};

describe('RAG Score Tuning - BrainRecallCache Bug Reproduction', () => {
    let cache: BrainRecallCache;

    beforeEach(() => {
        cache = new BrainRecallCache();
        cache.setConfig(mockConfig);
        cache.nextRound();
    });

    it('should calculate correct finalScore without double division bug', () => {
        // 场景：有一个 Rerank 分数很高的候选 (0.65)
        // 在原有 Bug 中 (temp=0.25)：
        // effectiveStrength = 0.65
        // z = (0.65 - 0.2) / 0.25 = 1.8
        // sigmoid(z, 0.25) = 1 / (1 + exp(-1.8/0.25)) = 1 / (1 + exp(-7.2)) = 0.999
        
        // 场景：如果 effectiveStrength 恰好等于 bias (0.20)
        // z = 0, sigmoid(0) = 0.5
        
        const candidate: RecallCandidate = {
            id: 'event-1',
            label: 'Test Event',
            embeddingScore: 0.5,
            rerankScore: 0.65,
        };

        const results = cache.process([candidate]);
        const slot = results[0];

        console.log(`[Test] Candidate: Rerank=0.65, FinalScore=${slot.finalScore}`);
        
        // 修复后：z = (0.65 - 0.2) / 0.25 = 1.8
        // 1 / (1 + exp(-1.8)) ≈ 0.858
        expect(slot.finalScore).toBeCloseTo(0.858, 2);
    });

    it('should reproduce 0.5 collapse when strength is near bias', () => {
        const candidate: RecallCandidate = {
            id: 'event-2',
            label: 'Low Score Event',
            embeddingScore: 0.25, // 0.25 * 0.8 = 0.20 (Hits bias)
            rerankScore: 0.1,
        };

        const results = cache.process([candidate]);
        const slot = results[0];

        console.log(`[Test] Collapse Check: Strength=0.20, FinalScore=${slot.finalScore}`);
        
        // 如果强度在 bias 附近，分数会坍缩到 0.5
        expect(slot.finalScore).toBeCloseTo(0.5, 1);
    });

    it('should handle high-pressure scenario with 40 candidates', () => {
        // 模拟 40 条候选数据
        const candidates: RecallCandidate[] = [];
        
        // 1. 一个特别强的新候选 (Rerank 优化命中)
        candidates.push({
            id: 'top-rerank',
            label: 'Top Rerank Event',
            embeddingScore: 0.45,
            rerankScore: 0.85, 
        });

        // 2. 若干个向量分还可以但 Rerank 一般的候选
        for (let i = 1; i <= 5; i++) {
            candidates.push({
                id: `vector-high-${i}`,
                label: `Vector High ${i}`,
                embeddingScore: 0.6 + (i * 0.02),
                rerankScore: 0.3,
            });
        }

        // 3. 大量背景中低分候选 (34 条)
        for (let i = 1; i <= 34; i++) {
            candidates.push({
                id: `bg-low-${i}`,
                label: `Background ${i}`,
                embeddingScore: 0.1 + (Math.random() * 0.2),
                rerankScore: 0.05,
            });
        }

        const results = cache.process(candidates);
        
        // 验证: 
        // 1. 总数应被 Working Limit 截断 (此处配置为 10)
        expect(results.length).toBe(mockConfig.workingLimit);

        // 2. 第一名应该是 Rerank 高分项 (因为有 Newcomer Boost + 修复后的公式)
        // sortScore = finalScore + boost
        // Top Rerank: effectiveStrength = 0.85, z = (0.85-0.2)/0.25 = 2.6, sigmoid ≈ 0.93 -> finalScore = 0.93 + 0.2 = 1.13
        // Vector High: effectiveStrength = 0.7 * 0.8 = 0.56, z = (0.56-0.2)/0.25 = 1.44, sigmoid ≈ 0.80 -> finalScore = 0.80 + 0 = 0.80
        expect(results[0].id).toBe('top-rerank');

        console.log(`[Test] High Pressure: Top ID=${results[0].id}, Score=${results[0].finalScore.toFixed(3)}`);
        console.log(`[Test] High Pressure: 10th ID=${results[9].id}, Score=${results[9].finalScore.toFixed(3)}`);
    });
});

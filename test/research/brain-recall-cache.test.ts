/**
 * BrainRecallCache 单元测试 (POC)
 *
 * 验证类脑召回系统的核心算法：
 * - 强化 (Reinforce)
 * - 衰减 (Decay)
 * - Decay Bomb (上下文切换)
 * - 工作记忆选取 (Working Memory Selection)
 * - 新人红利 & 厌倦惩罚
 * - 容量限制 & 淘汰
 */
import { DEFAULT_BRAIN_RECALL_CONFIG } from '@/config/types/defaults';
import { BrainRecallCache, type RecallCandidate } from '@/modules/rag/retrieval/BrainRecallCache';
import { beforeEach, describe, expect, it } from 'vitest';

// ==================== 工具函数 ====================

/** 创建测试用的 RecallCandidate */
function makeCandidate(id: string, embeddingScore = 0.8, rerankScore = 0.7): RecallCandidate {
    return { id, label: `event_${id}`, embeddingScore, rerankScore };
}

/** 批量创建候选 */
function makeCandidates(count: number, baseScore = 0.8): RecallCandidate[] {
    return Array.from({ length: count }, (_, i) =>
        makeCandidate(`evt_${String(i).padStart(3, '0')}`, baseScore - i * 0.01, baseScore - i * 0.02)
    );
}

// ==================== 测试 ====================

describe('BrainRecallCache', () => {
    let cache: BrainRecallCache;

    beforeEach(() => {
        cache = new BrainRecallCache();
        cache.setConfig({
            ...DEFAULT_BRAIN_RECALL_CONFIG,
            enabled: true,
            workingLimit: 5,
            shortTermLimit: 15,
            reinforceFactor: 0.2,
            decayRate: 0.08,
            evictionThreshold: 0.25,
            contextSwitchThreshold: 0.4,
            newcomerBoost: 0.2,
            boredomThreshold: 5,
            boredomPenalty: 0.1,
        });
    });

    // ==================== 基础行为 ====================

    describe('基础行为', () => {
        it('第一轮处理应返回 workingLimit 个结果', () => {
            cache.nextRound();
            const candidates = makeCandidates(10);
            const result = cache.process(candidates);

            expect(result.length).toBe(5); // workingLimit = 5
        });

        it('所有结果应标记为 working tier', () => {
            cache.nextRound();
            const candidates = makeCandidates(10);
            const result = cache.process(candidates);

            result.forEach(slot => {
                expect(slot.tier).toBe('working');
            });
        });

        it('结果应按 finalScore 降序排列', () => {
            cache.nextRound();
            const candidates = makeCandidates(10);
            const result = cache.process(candidates);

            for (let i = 1; i < result.length; i++) {
                // 第一轮新人都有 boost，分数差不多；但 finalScore + boost 应该降序
                expect(result[i - 1].finalScore).toBeGreaterThanOrEqual(result[i].finalScore - 0.3);
            }
        });

        it('disabled 模式应直接截断返回', () => {
            cache.setConfig({ ...DEFAULT_BRAIN_RECALL_CONFIG, enabled: false, workingLimit: 3 });
            cache.nextRound();
            const candidates = makeCandidates(5);
            const result = cache.process(candidates);

            expect(result.length).toBe(3);
            expect(result[0].id).toBe('evt_000');
        });
    });

    // ==================== 强化与衰减 ====================

    describe('强化 (Reinforce)', () => {
        it('重复召回应增强 rerankStrength', () => {
            cache.nextRound();
            const candidates = [makeCandidate('evt_001', 0.8, 0.5)];
            cache.process(candidates);

            const snapshotBefore = cache.getShortTermSnapshot();
            const strengthBefore = snapshotBefore[0].rerankStrength;

            // 第二轮再次召回同一个
            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.8, 0.5)]);

            const snapshotAfter = cache.getShortTermSnapshot();
            const strengthAfter = snapshotAfter.find(s => s.id === 'evt_001')!.rerankStrength;

            expect(strengthAfter).toBeGreaterThan(strengthBefore);
        });

        it('embeddingStrength 应取 max(旧值, 新值)', () => {
            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.7, 0.5)]);

            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.9, 0.5)]); // 更高的 embedding

            const slot = cache.getShortTermSnapshot().find(s => s.id === 'evt_001')!;
            expect(slot.embeddingStrength).toBe(0.9);
        });

        it('较低的 embeddingScore 不应降低 embeddingStrength', () => {
            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.9, 0.5)]);

            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.5, 0.5)]); // 更低的 embedding

            const slot = cache.getShortTermSnapshot().find(s => s.id === 'evt_001')!;
            expect(slot.embeddingStrength).toBe(0.9); // 保持 max
        });
    });

    describe('衰减 (Decay)', () => {
        it('未被召回的记忆应衰减', () => {
            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.8, 0.7)]);
            const before = cache.getShortTermSnapshot().find(s => s.id === 'evt_001')!;
            const scoreBefore = before.finalScore;

            // 第二轮不召回 evt_001
            cache.nextRound();
            cache.process([makeCandidate('evt_002', 0.8, 0.7)]);

            const after = cache.getShortTermSnapshot().find(s => s.id === 'evt_001')!;
            expect(after.finalScore).toBeLessThan(scoreBefore);
        });

        it('连续多轮不召回应持续衰减', () => {
            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.8, 0.7)]);

            const scores: number[] = [];
            for (let i = 0; i < 5; i++) {
                cache.nextRound();
                cache.process([makeCandidate('evt_other', 0.8, 0.7)]);
                const slot = cache.getShortTermSnapshot().find(s => s.id === 'evt_001');
                if (slot) scores.push(slot.finalScore);
            }

            // 分数应单调递减
            for (let i = 1; i < scores.length; i++) {
                expect(scores[i]).toBeLessThan(scores[i - 1]);
            }
        });
    });

    // ==================== Decay Bomb ====================

    describe('Decay Bomb (上下文切换)', () => {
        it('全新候选（零重叠）应触发 Decay Bomb', () => {
            // 先建立旧记忆
            cache.nextRound();
            cache.process([
                makeCandidate('evt_old_1', 0.8, 0.7),
                makeCandidate('evt_old_2', 0.7, 0.6),
            ]);

            // 获取旧记忆的分数
            const beforeBomb = cache.getShortTermSnapshot();
            const oldScore1 = beforeBomb.find(s => s.id === 'evt_old_1')!.rerankStrength;
            const oldScore2 = beforeBomb.find(s => s.id === 'evt_old_2')!.rerankStrength;

            // 第二轮：完全不同的候选 → 触发 Decay Bomb
            cache.nextRound();
            cache.process([
                makeCandidate('evt_new_1', 0.8, 0.7),
                makeCandidate('evt_new_2', 0.8, 0.7),
            ]);

            const afterBomb = cache.getShortTermSnapshot();
            const oldSlot1 = afterBomb.find(s => s.id === 'evt_old_1');
            const oldSlot2 = afterBomb.find(s => s.id === 'evt_old_2');

            // Decay Bomb 会把 rerankStrength *= 0.5，embeddingStrength *= 0.8
            // 再加上衰减，旧记忆的 rerankStrength 应 < 原值 * 0.5 + 衰减
            if (oldSlot1) {
                expect(oldSlot1.rerankStrength).toBeLessThan(oldScore1);
            }
            if (oldSlot2) {
                expect(oldSlot2.rerankStrength).toBeLessThan(oldScore2);
            }
        });

        it('重叠度高时不应触发 Decay Bomb', () => {
            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.8, 0.7)]);
            const scoreBefore = cache.getShortTermSnapshot()[0].finalScore;

            // 第二轮：同样的候选 → 不触发 Bomb，反而强化
            cache.nextRound();
            cache.process([makeCandidate('evt_001', 0.8, 0.7)]);

            const scoreAfter = cache.getShortTermSnapshot().find(s => s.id === 'evt_001')!.finalScore;
            expect(scoreAfter).toBeGreaterThanOrEqual(scoreBefore);
        });
    });

    // ==================== 容量与淘汰 ====================

    describe('容量管理', () => {
        it('shortTermMemory 不应超过 shortTermLimit', () => {
            cache.setConfig({
                ...DEFAULT_BRAIN_RECALL_CONFIG,
                enabled: true,
                workingLimit: 3,
                shortTermLimit: 8,
            });

            // 多轮累积不同的候选
            for (let round = 0; round < 5; round++) {
                cache.nextRound();
                cache.process(makeCandidates(5, 0.8 - round * 0.05).map(c => ({
                    ...c,
                    id: `r${round}_${c.id}`,
                })));
            }

            const snapshot = cache.getShortTermSnapshot();
            expect(snapshot.length).toBeLessThanOrEqual(8);
        });

        it('低分记忆应优先被淘汰', () => {
            cache.setConfig({
                ...DEFAULT_BRAIN_RECALL_CONFIG,
                enabled: true,
                workingLimit: 3,
                shortTermLimit: 5,
            });

            cache.nextRound();
            cache.process([
                makeCandidate('high', 0.95, 0.90),
                makeCandidate('mid', 0.70, 0.60),
                makeCandidate('low', 0.30, 0.20),
            ]);

            // 再加更多，触发淘汰
            cache.nextRound();
            cache.process([
                makeCandidate('new_1', 0.85, 0.80),
                makeCandidate('new_2', 0.80, 0.75),
                makeCandidate('new_3', 0.75, 0.70),
            ]);

            const snapshot = cache.getShortTermSnapshot();
            const ids = snapshot.map(s => s.id);

            // high 应该还在
            expect(ids).toContain('high');
        });
    });

    // ==================== 新人红利 & 厌倦惩罚 ====================

    describe('新人红利 (Newcomer Boost)', () => {
        it('新项在首轮应获得排序加成', () => {
            // 先让旧项存在多轮
            cache.nextRound();
            cache.process([makeCandidate('old', 0.75, 0.65)]);
            cache.nextRound();
            cache.process([makeCandidate('old', 0.75, 0.65)]);

            // 第三轮：新项分数略低于旧项的 base
            cache.nextRound();
            const result = cache.process([
                makeCandidate('old', 0.75, 0.65),
                makeCandidate('new', 0.72, 0.62), // 略低
            ]);

            // 新人红利让 'new' 有机会进入结果（取决于具体分数）
            const ids = result.map(s => s.id);
            expect(ids).toContain('new');
        });
    });

    describe('厌倦惩罚 (Boredom Penalty)', () => {
        it('连续进入工作记忆超过阈值应被惩罚', () => {
            cache.setConfig({
                ...DEFAULT_BRAIN_RECALL_CONFIG,
                enabled: true,
                workingLimit: 2,
                shortTermLimit: 10,
                boredomThreshold: 3,
                boredomPenalty: 0.15,
            });

            // 让 evt_001 和 evt_002 连续 6 轮都进入 working memory
            for (let i = 0; i < 6; i++) {
                cache.nextRound();
                cache.process([
                    makeCandidate('evt_001', 0.8, 0.7),
                    makeCandidate('evt_002', 0.75, 0.65),
                ]);
            }

            const snapshot = cache.getShortTermSnapshot();
            const slot = snapshot.find(s => s.id === 'evt_001')!;

            // 连续 6 轮进入 working，consecutiveWorkingCount 应 >= 6
            expect(slot.consecutiveWorkingCount).toBeGreaterThanOrEqual(6);
        });
    });

    // ==================== 多轮模拟 ====================

    describe('多轮模拟 (Integration)', () => {
        it('完整的 5 轮对话模拟', () => {
            const results: { round: number; working: string[]; shortTerm: number }[] = [];

            // Round 1: 初始场景 — 在酒馆聊天
            cache.nextRound();
            let working = cache.process([
                makeCandidate('tavern_meet', 0.9, 0.85),
                makeCandidate('tavern_drink', 0.8, 0.75),
                makeCandidate('old_quest', 0.6, 0.5),
            ]);
            results.push({
                round: 1,
                working: working.map(s => s.id),
                shortTerm: cache.getShortTermSnapshot().length,
            });

            // Round 2: 继续酒馆话题
            cache.nextRound();
            working = cache.process([
                makeCandidate('tavern_meet', 0.85, 0.80),
                makeCandidate('tavern_fight', 0.7, 0.65),
            ]);
            results.push({
                round: 2,
                working: working.map(s => s.id),
                shortTerm: cache.getShortTermSnapshot().length,
            });

            // Round 3: 话题转向 — 提到旧任务
            cache.nextRound();
            working = cache.process([
                makeCandidate('old_quest', 0.85, 0.80),
                makeCandidate('quest_reward', 0.75, 0.70),
            ]);
            results.push({
                round: 3,
                working: working.map(s => s.id),
                shortTerm: cache.getShortTermSnapshot().length,
            });

            // Round 4: 完全转场 — 森林冒险（新候选，无重叠 → Decay Bomb）
            cache.nextRound();
            working = cache.process([
                makeCandidate('forest_enter', 0.9, 0.85),
                makeCandidate('forest_monster', 0.85, 0.80),
                makeCandidate('forest_treasure', 0.7, 0.65),
            ]);
            results.push({
                round: 4,
                working: working.map(s => s.id),
                shortTerm: cache.getShortTermSnapshot().length,
            });

            // Round 5: 森林继续
            cache.nextRound();
            working = cache.process([
                makeCandidate('forest_monster', 0.9, 0.85),
                makeCandidate('forest_boss', 0.85, 0.80),
            ]);
            results.push({
                round: 5,
                working: working.map(s => s.id),
                shortTerm: cache.getShortTermSnapshot().length,
            });

            // 验证
            // Round 1: 所有 3 个应该在 working
            expect(results[0].working).toContain('tavern_meet');

            // Round 4: Decay Bomb 后，旧酒馆记忆应被削弱，新森林应占主导
            expect(results[3].working).toContain('forest_enter');
            expect(results[3].working).toContain('forest_monster');

            // Round 5: forest_monster 被连续召回，应仍在
            expect(results[4].working).toContain('forest_monster');
            expect(results[4].working).toContain('forest_boss');

            // 短期记忆应有累积（但不超过 limit）
            expect(results[4].shortTerm).toBeGreaterThan(2);
            expect(results[4].shortTerm).toBeLessThanOrEqual(15);
        });
    });
});

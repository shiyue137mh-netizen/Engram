/**
 * BrainRecallCache - 类脑召回缓存系统
 *
 * V1.3.1: 逻辑调优
 * - Newcomer Boost: 改为排序时的临时加分，不修改永久 Strength
 * - Boredom Penalty: 改为排序时的临时减分 (Penalty * (Count - Threshold))
 * - MMR: 引入 Greedy 算法和 Cosine Similarity
 */

import { Logger, LogModule } from '@/core/logger';
import type { BrainRecallConfig } from '@/config/types/rag';
import { DEFAULT_BRAIN_RECALL_CONFIG } from '@/config/types/defaults';
import { embeddingService } from '../embedding/EmbeddingService';

const MODULE = 'BrainRecallCache';

/**
 * 记忆槽位
 */
export interface MemorySlot {
    id: string;
    label: string; // V1.3.4: 可读名称 (Event Type)

    // 双轨强度
    embeddingStrength: number;
    rerankStrength: number;

    // 最终计算分 (基础分，不含临时加成)
    finalScore: number;

    // 时间与计数
    firstRound: number;
    lastRound: number;
    recallCount: number;

    // 连胜计数
    consecutiveWorkingCount: number;

    // 层级
    tier: 'working' | 'shortTerm';

    // 向量缓存
    embeddingVector?: number[];
}

export interface RecallCandidate {
    id: string;
    label?: string; // V1.3.4: 可读名称
    embeddingScore: number;
    rerankScore?: number;
    embeddingVector?: number[];
}

export class BrainRecallCache {
    private shortTermMemory: Map<string, MemorySlot> = new Map();
    private currentRound: number = 0;
    private config: BrainRecallConfig = DEFAULT_BRAIN_RECALL_CONFIG;

    constructor() {
        Logger.debug(LogModule.RAG_CACHE, '类脑召回缓存初始化 (V1.3.1)');
    }

    setConfig(config: BrainRecallConfig): void {
        this.config = config;
    }

    getConfig(): BrainRecallConfig {
        return this.config;
    }

    nextRound(): void {
        this.currentRound++;
        Logger.debug(LogModule.RAG_CACHE, `开始第 ${this.currentRound} 轮类脑召回`);
    }

    getCurrentRound(): number {
        return this.currentRound;
    }

    private sigmoid(x: number, temp: number): number {
        return 1 / (1 + Math.exp(-x / temp));
    }

    /**
     * 处理召回候选
     */
    process(candidates: RecallCandidate[]): MemorySlot[] {
        if (!this.config.enabled) {
            return candidates.slice(0, this.config.workingLimit).map(c => ({
                id: c.id,
                label: c.label || c.id,
                embeddingStrength: c.embeddingScore,
                rerankStrength: c.rerankScore || 0,
                finalScore: c.embeddingScore * 0.4 + (c.rerankScore || 0) * 0.6,
                firstRound: this.currentRound,
                lastRound: this.currentRound,
                recallCount: 1,
                consecutiveWorkingCount: 1,
                tier: 'working' as const,
                embeddingVector: c.embeddingVector,
            }));
        }

        const candidateIds = new Set(candidates.map(c => c.id));
        const candidateMap = new Map(candidates.map(c => [c.id, c]));

        // 1. Decay Bomb
        if (this.shouldTriggerDecayBomb(candidates)) {
            Logger.info(LogModule.RAG_CACHE, '检测到上下文切换，投放 Decay Bomb');
            this.decayBomb();
        }

        // 2. 更新短期记忆
        for (const [id, slot] of this.shortTermMemory) {
            if (candidateIds.has(id)) {
                // 再次召回
                const candidate = candidateMap.get(id)!;
                if (candidate.embeddingVector) slot.embeddingVector = candidate.embeddingVector;

                // V1.3.4: 更新 Label (防止名字变了)
                if (candidate.label) slot.label = candidate.label;

                this.reinforceSlot(slot, candidate);

                slot.lastRound = this.currentRound;
                slot.recallCount++;
            } else {
                // 未召回
                this.decaySlot(slot);
            }
        }

        // 3. 添加新项
        let addedCount = 0;
        for (const candidate of candidates) {
            if (!this.shortTermMemory.has(candidate.id)) {
                const slot: MemorySlot = {
                    id: candidate.id,
                    label: candidate.label || candidate.id, // V1.3.4: 使用 label
                    embeddingStrength: candidate.embeddingScore,
                    rerankStrength: candidate.rerankScore || 0,
                    finalScore: 0,
                    firstRound: this.currentRound,
                    lastRound: this.currentRound,
                    recallCount: 1,
                    consecutiveWorkingCount: 0,
                    tier: 'shortTerm',
                    embeddingVector: candidate.embeddingVector,
                };

                // V1.3.1: Newcomer Boost 不再永久修改 rerankStrength
                // 仅计算基础分数
                this.calculateFinalScore(slot);

                this.shortTermMemory.set(candidate.id, slot);
                addedCount++;
            }
        }
        Logger.debug(LogModule.RAG_CACHE, `Added ${addedCount} new items. Current Size: ${this.shortTermMemory.size}`);

        // 4. 淘汰 (Eviction)
        const sizeBeforeEvict = this.shortTermMemory.size;
        this.evict();
        Logger.debug(LogModule.RAG_CACHE, `Evicted ${sizeBeforeEvict - this.shortTermMemory.size} items. Current Size: ${this.shortTermMemory.size}`);

        // 5. 容量限制
        this.enforceShortTermLimit();

        // 6. 选取工作记忆 (Sorting Logic)
        const workingMemory = this.selectWorkingMemory();

        // 7. 更新连胜计数 (由 selectWorkingMemoryMMR 处理更准确?
        // 不，selectWorkingMemoryMMR 只返回了选中的。
        // 我们需要遍历所有 shortTermMemory：
        //   - 如果在 workingMemory 中 -> count++
        //   - 否则 -> count = 0 (或者按照 MMR 逻辑减 1，为了简化逻辑且符合"连胜"定义，这里统一切断连胜)
        // 用户建议：如果被 MMR 淘汰，count - 1。如果纯粹分低？count 归零。
        // 为了实现这个区分，我们在 selectWorkingMemoryMMR 里不好做。
        // 简化策略：只要没进 Working，连胜就断。这是最符合直觉的。
        this.updateConsecutiveCounts(workingMemory);

        Logger.info(LogModule.RAG_CACHE, '类脑召回完成', {
            round: this.currentRound,
            shortTermSize: this.shortTermMemory.size,
            workingSize: workingMemory.length,
        });

        return workingMemory;
    }

    /**
     * 强化 (V1.3.3: 移除 Gate 门控，采用无条件强化策略)
     * 用户反馈：类脑应管理优胜劣汰，而不是拒之门外。只要被召回，就应该获得强化。
     */
    private reinforceSlot(slot: MemorySlot, candidate: RecallCandidate): void {
        const factor = this.config.reinforceFactor || 0.2;
        const maxDamping = this.config.maxDamping || 0.1;

        // Embroidery 保底
        slot.embeddingStrength = Math.max(slot.embeddingStrength, candidate.embeddingScore);

        // Rerank 强化逻辑：不再设置门槛
        // 只要这个记忆被本次 RAG 流程召回了（出现在 candidates 里），它就应该获得加强。
        // 即使 Rerank 分数不高，也说明它比库存里那些没被召回的要强。
        // 加强幅度可以是固定的，也可以跟本次分数挂钩。
        // 这里沿用原来的 "向目标值逼近" 的逻辑，但目标值设为 "更强"。

        // 逻辑A：直接 += factor * (1 - current)  (简单累加)
        // 逻辑B：current += factor * (newScore - current) (移动平均，可能会下降)
        // 既然是 "Reinforce"，我们采用逻辑A，确保是正向增益。

        const potentialGain = factor * (1 - slot.rerankStrength);
        const actualGain = Math.min(potentialGain, maxDamping);

        slot.rerankStrength += actualGain;

        this.calculateFinalScore(slot);
    }

    private decaySlot(slot: MemorySlot): void {
        const rate = this.config.decayRate || 0.08;

        slot.embeddingStrength = Math.max(0, slot.embeddingStrength - (rate * 0.5));
        slot.rerankStrength = Math.max(0, slot.rerankStrength - rate);

        this.calculateFinalScore(slot);
    }

    private calculateFinalScore(slot: MemorySlot): void {
        // V1.4: 调整参数，让分数分布更平滑
        const temp = this.config.sigmoidTemperature || 0.25; // 0.15 -> 0.25

        // 归一化防饱和
        const clampedRerank = Math.min(0.95, slot.rerankStrength);

        // V1.3.5: Max Strategy (取长板策略)
        // 问题：如果 Rerank 模型给分很低 (0.01)，即使 Embedding 很高 (0.45)，加权平均也会导致最终分过低被淘汰。
        // 修正：只要 Embedding 或 Rerank 其中一项强，就认为该记忆有价值。
        // Embedding 系数设为 0.8，因为向量相似度通常比 Rerank 概率值要“虚”一些。
        const effectiveStrength = Math.max(clampedRerank, slot.embeddingStrength * 0.8);

        // V1.4: 降低 Bias (0.35 -> 0.20)，让更多记忆存活
        const bias = 0.20;

        const z = (effectiveStrength - bias) / temp;
        slot.finalScore = this.sigmoid(z, temp);
    }

    /**
     * V1.4: 基于容量的淘汰策略
     * 只有当 STM 超出容量上限时才淘汰，而非基于阈值
     */
    private evict(): void {
        const limit = this.config.shortTermLimit;

        // 不满，不淘汰
        if (this.shortTermMemory.size <= limit) {
            return;
        }

        // 超出容量时，按 finalScore 从低到高淘汰多余的
        const overflow = this.shortTermMemory.size - limit;
        const sorted = Array.from(this.shortTermMemory.values())
            .filter(slot => slot.firstRound !== this.currentRound) // 保护新人
            .sort((a, b) => a.finalScore - b.finalScore);

        for (let i = 0; i < overflow && i < sorted.length; i++) {
            this.shortTermMemory.delete(sorted[i].id);
        }
    }

    private enforceShortTermLimit(): void {
        const limit = this.config.shortTermLimit;
        if (this.shortTermMemory.size <= limit) return;

        // 这里用 finalScore 排序淘汰是合理的，因为这是 Long-term retention 机制
        const sorted = Array.from(this.shortTermMemory.values())
            .sort((a, b) => a.finalScore - b.finalScore);

        const toRemove = sorted.slice(0, this.shortTermMemory.size - limit);
        for (const slot of toRemove) {
            this.shortTermMemory.delete(slot.id);
        }
    }

    /**
     * V1.4: 填满优先的工作记忆选取
     * 移除 MMR（剧情事件的相似性是特征而非缺陷）
     */
    private selectWorkingMemory(): MemorySlot[] {
        const limit = this.config.workingLimit;
        const newcomerBoost = this.config.newcomerBoost || 0.2;
        const boredomPenalty = this.config.boredomPenalty || 0.1;
        const boredomThreshold = this.config.boredomThreshold || 5;

        // 1. 计算排序分数
        const pool = Array.from(this.shortTermMemory.values()).map(slot => {
            // Newcomer Boost (只在第一轮生效)
            const boost = (slot.firstRound === this.currentRound) ? newcomerBoost : 0;

            // Boredom Penalty (累积扣分)
            const boredomCount = Math.max(0, slot.consecutiveWorkingCount - boredomThreshold);
            const penalty = boredomCount * boredomPenalty;

            const sortScore = slot.finalScore + boost - penalty;

            return { slot, sortScore };
        });

        // 按分数降序排序
        pool.sort((a, b) => b.sortScore - a.sortScore);

        // 2. 直接取 Top-K，保证填满
        const selected = pool.slice(0, limit).map(item => item.slot);

        // 3. 更新所有 slot 的 tier 状态
        const selectedIds = new Set(selected.map(s => s.id));
        for (const slot of this.shortTermMemory.values()) {
            slot.tier = selectedIds.has(slot.id) ? 'working' : 'shortTerm';
        }

        return selected;
    }

    private updateConsecutiveCounts(workingMemory: MemorySlot[]): void {
        const workingIds = new Set(workingMemory.map(s => s.id));

        for (const [id, slot] of this.shortTermMemory) {
            if (workingIds.has(id)) {
                slot.consecutiveWorkingCount++;
            } else {
                // 断连归零
                slot.consecutiveWorkingCount = 0;
            }
        }
    }

    private shouldTriggerDecayBomb(candidates: RecallCandidate[]): boolean {
        if (this.shortTermMemory.size === 0) return false;
        if (candidates.length === 0) return false;

        const candidateIds = new Set(candidates.map(c => c.id));
        let overlapCount = 0;
        let totalBaseStrength = 0;
        let totalCurrentStrength = 0;

        for (const [id, slot] of this.shortTermMemory) {
            if (candidateIds.has(id)) {
                overlapCount++;
                totalBaseStrength += slot.embeddingStrength;
                const candidate = candidates.find(c => c.id === id);
                if (candidate) {
                    totalCurrentStrength += candidate.embeddingScore;
                }
            }
        }

        if (overlapCount === 0) return true;

        const avgBase = totalBaseStrength / overlapCount;
        const avgCurrent = totalCurrentStrength / overlapCount;
        if (avgBase < 0.01) return false;

        return (avgCurrent / avgBase) < this.config.contextSwitchThreshold;
    }

    decayBomb(): void {
        for (const [id, slot] of this.shortTermMemory) {
            slot.rerankStrength *= 0.5;
            slot.embeddingStrength *= 0.8;
            slot.consecutiveWorkingCount = 0;
            this.calculateFinalScore(slot);
        }
        this.evict();
    }

    hardReset(): void {
        this.shortTermMemory.clear();
        this.currentRound = 0;
        Logger.info(LogModule.RAG_CACHE, 'hardReset: 类脑召回缓存已重置');
    }

    getShortTermSnapshot(): MemorySlot[] {
        return Array.from(this.shortTermMemory.values())
            .sort((a, b) => b.finalScore - a.finalScore);
    }
}

export const brainRecallCache = new BrainRecallCache();

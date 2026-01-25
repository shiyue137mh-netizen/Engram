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
     * 计算余弦相似度
     */
    private cosineSimilarity(vecA: number[] | undefined, vecB: number[] | undefined): number {
        if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

        let dot = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dot += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }

        if (normA === 0 || normB === 0) return 0;
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    process(candidates: RecallCandidate[]): MemorySlot[] {
        if (!this.config.enabled) {
            return candidates.slice(0, this.config.workingLimit).map(c => ({
                id: c.id,
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

                this.reinforceSlot(slot, candidate);

                slot.lastRound = this.currentRound;
                slot.recallCount++;
            } else {
                // 未召回
                this.decaySlot(slot);
            }
        }

        // 3. 添加新项
        for (const candidate of candidates) {
            if (!this.shortTermMemory.has(candidate.id)) {
                const slot: MemorySlot = {
                    id: candidate.id,
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
            }
        }

        // 4. 淘汰 (Eviction)
        this.evict();

        // 5. 容量限制
        this.enforceShortTermLimit();

        // 6. 选取工作记忆 (MMR + Sorting Logic)
        const workingMemory = this.selectWorkingMemoryMMR();

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
     * 强化 (V1.3.1: 移除 Boredom 对 Strength 的永久影响)
     */
    private reinforceSlot(slot: MemorySlot, candidate: RecallCandidate): void {
        const factor = this.config.reinforceFactor || 0.2;
        const maxDamping = this.config.maxDamping || 0.1;
        const gateThreshold = this.config.gateThreshold || 0.6;

        // Embroidery 保底
        slot.embeddingStrength = Math.max(slot.embeddingStrength, candidate.embeddingScore);

        // Rerank 门控
        const currentRerank = candidate.rerankScore || 0;

        if (currentRerank > gateThreshold) {
            // 纯净的强化逻辑
            const potentialGain = factor * (1 - slot.rerankStrength);
            const actualGain = Math.min(potentialGain, maxDamping);

            slot.rerankStrength += actualGain;
        } else {
            slot.rerankStrength = Math.max(0, slot.rerankStrength - (this.config.decayRate / 2));
        }

        this.calculateFinalScore(slot);
    }

    private decaySlot(slot: MemorySlot): void {
        const rate = this.config.decayRate || 0.08;

        slot.embeddingStrength = Math.max(0, slot.embeddingStrength - (rate * 0.5));
        slot.rerankStrength = Math.max(0, slot.rerankStrength - rate);

        this.calculateFinalScore(slot);
    }

    private calculateFinalScore(slot: MemorySlot): void {
        const temp = this.config.sigmoidTemperature || 0.15;

        // 归一化防饱和
        const clampedRerank = Math.min(0.95, slot.rerankStrength);

        const rawInput = (clampedRerank * 0.7) + (slot.embeddingStrength * 0.3);
        const bias = 0.5;

        const z = (rawInput - bias) / temp;
        slot.finalScore = this.sigmoid(z, temp);
    }

    private evict(): void {
        const threshold = this.config.evictionThreshold;
        for (const [id, slot] of this.shortTermMemory) {
            if (slot.finalScore < threshold) {
                this.shortTermMemory.delete(id);
            }
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
     * V1.3.1: MMR + Sorting Logic
     */
    private selectWorkingMemoryMMR(): MemorySlot[] {
        const k = this.config.workingLimit;
        const mmrThreshold = this.config.mmrThreshold || 0.85;
        const newcomerBoost = this.config.newcomerBoost || 0.2; // 0.2
        const boredomPenalty = this.config.boredomPenalty || 0.1;
        const boredomThreshold = this.config.boredomThreshold || 5;

        // 1. 计算 Effective Score 并排序
        const pool = Array.from(this.shortTermMemory.values()).map(slot => {
            // Newcomer Boost (只在第一轮生效)
            const boost = (slot.firstRound === this.currentRound) ? newcomerBoost : 0;

            // Boredom Penalty (累积扣分)
            const boredomCount = Math.max(0, slot.consecutiveWorkingCount - boredomThreshold);
            const penalty = boredomCount * boredomPenalty;

            const sortScore = slot.finalScore + boost - penalty;

            return { slot, sortScore };
        });

        // 降序
        pool.sort((a, b) => b.sortScore - a.sortScore);

        // 2. Greedy MMR
        const selected: MemorySlot[] = [];

        // 只需要遍历 pool，直到选满 k 个
        for (const item of pool) {
            if (selected.length >= k) break;

            const currentSlot = item.slot;

            // 冗余检查
            let isRedundant = false;
            // 只有当有向量且已选列表不为空时才检查
            if (currentSlot.embeddingVector && selected.length > 0) {
                for (const picked of selected) {
                    if (!picked.embeddingVector) continue;

                    const sim = this.cosineSimilarity(currentSlot.embeddingVector, picked.embeddingVector);
                    if (sim > mmrThreshold) {
                        isRedundant = true;
                        // Logger.debug(LogModule.RAG_CACHE, `MMR Redundant: ${currentSlot.id} vs ${picked.id} (${sim.toFixed(2)})`);
                        break;
                    }
                }
            }

            if (!isRedundant) {
                selected.push(currentSlot);
                currentSlot.tier = 'working';
            } else {
                currentSlot.tier = 'shortTerm';
            }
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

/**
 * BrainRecallCache - 类脑召回缓存系统
 *
 * V0.9.5 实验性特性
 * 模拟人脑记忆机制：工作记忆 + 短期记忆
 * 实现记忆强化、衰减、竞争淘汰、上下文切换检测
 */

import { Logger } from '@/core/logger';
import type { BrainRecallConfig } from '@/config/types/rag';
import { DEFAULT_BRAIN_RECALL_CONFIG } from '@/config/types/defaults';

const MODULE = 'BrainRecallCache';

/**
 * 记忆槽位
 */
export interface MemorySlot {
    id: string;                   // 事件或实体 ID

    // 分数
    strength: number;             // 当前强度 [0, 1]
    baseScore: number;            // 首次进入时的分数

    // 时间
    firstRound: number;           // 首次召回轮次
    lastRound: number;            // 最后召回轮次
    recallCount: number;          // 被召回次数

    // 层级
    tier: 'working' | 'shortTerm';
}

/**
 * 召回候选项（从 Retriever 传入）
 */
export interface RecallCandidate {
    id: string;
    score: number;  // 混合分数 (embedding + rerank)
}

/**
 * 类脑召回缓存
 */
export class BrainRecallCache {
    private shortTermMemory: Map<string, MemorySlot> = new Map();
    private currentRound: number = 0;
    private config: BrainRecallConfig = DEFAULT_BRAIN_RECALL_CONFIG;

    constructor() {
        Logger.debug(MODULE, '类脑召回缓存初始化');
    }

    /**
     * 设置配置
     */
    setConfig(config: BrainRecallConfig): void {
        this.config = config;
    }

    /**
     * 获取当前配置
     */
    getConfig(): BrainRecallConfig {
        return this.config;
    }

    /**
     * 开始新一轮召回
     */
    nextRound(): void {
        this.currentRound++;
        Logger.debug(MODULE, `开始第 ${this.currentRound} 轮类脑召回`);
    }

    /**
     * 获取当前轮次
     */
    getCurrentRound(): number {
        return this.currentRound;
    }

    /**
     * 核心方法：处理新召回结果，与短期记忆合并
     *
     * @param candidates 本轮向量检索结果
     * @returns 最终工作记忆（用于注入）
     */
    process(candidates: RecallCandidate[]): MemorySlot[] {
        if (!this.config.enabled) {
            // 未启用时，直接返回候选项（转换格式）
            return candidates.slice(0, this.config.workingLimit).map(c => ({
                id: c.id,
                strength: c.score,
                baseScore: c.score,
                firstRound: this.currentRound,
                lastRound: this.currentRound,
                recallCount: 1,
                tier: 'working' as const,
            }));
        }

        const candidateIds = new Set(candidates.map(c => c.id));
        const candidateMap = new Map(candidates.map(c => [c.id, c]));

        // 1. 检测上下文切换
        if (this.shouldSoftReset(candidates)) {
            Logger.info(MODULE, '检测到上下文切换，执行 softReset');
            this.softReset();
        }

        // 2. 更新短期记忆中的槽位
        for (const [id, slot] of this.shortTermMemory) {
            if (candidateIds.has(id)) {
                // 再次召回：强化
                const candidate = candidateMap.get(id)!;
                slot.strength = this.reinforce(slot.strength);
                slot.lastRound = this.currentRound;
                slot.recallCount++;
                Logger.debug(MODULE, `强化记忆: ${id}, strength=${slot.strength.toFixed(3)}`);
            } else {
                // 未召回：衰减
                slot.strength = this.decay(slot.strength);
            }
        }

        // 3. 添加新召回的项
        for (const candidate of candidates) {
            if (!this.shortTermMemory.has(candidate.id)) {
                // 新项：创建槽位
                const slot: MemorySlot = {
                    id: candidate.id,
                    strength: candidate.score,
                    baseScore: candidate.score,
                    firstRound: this.currentRound,
                    lastRound: this.currentRound,
                    recallCount: 1,
                    tier: 'shortTerm',
                };
                this.shortTermMemory.set(candidate.id, slot);
                Logger.debug(MODULE, `新增记忆: ${candidate.id}, score=${candidate.score.toFixed(3)}`);
            }
        }

        // 4. 淘汰低强度项
        this.evict();

        // 5. 限制短期记忆容量
        this.enforceShortTermLimit();

        // 6. 选取工作记忆（Top-K）
        const workingMemory = this.selectWorkingMemory();

        Logger.info(MODULE, '类脑召回完成', {
            round: this.currentRound,
            shortTermSize: this.shortTermMemory.size,
            workingSize: workingMemory.length,
        });

        return workingMemory;
    }

    /**
     * 强化函数（饱和增长）
     */
    private reinforce(strength: number): number {
        const factor = this.config.reinforceFactor;
        return Math.min(1.0, strength + factor * (1 - strength));
    }

    /**
     * 衰减函数
     */
    private decay(strength: number): number {
        return Math.max(0, strength - this.config.decayRate);
    }

    /**
     * 淘汰低于阈值的项
     */
    private evict(): void {
        const threshold = this.config.evictionThreshold;
        const toRemove: string[] = [];

        for (const [id, slot] of this.shortTermMemory) {
            if (slot.strength < threshold) {
                toRemove.push(id);
            }
        }

        for (const id of toRemove) {
            this.shortTermMemory.delete(id);
            Logger.debug(MODULE, `淘汰记忆: ${id}`);
        }

        if (toRemove.length > 0) {
            Logger.debug(MODULE, `淘汰了 ${toRemove.length} 条记忆`);
        }
    }

    /**
     * 限制短期记忆容量
     */
    private enforceShortTermLimit(): void {
        const limit = this.config.shortTermLimit;
        if (this.shortTermMemory.size <= limit) return;

        // 按 strength 排序，移除最低的
        const sorted = Array.from(this.shortTermMemory.values())
            .sort((a, b) => a.strength - b.strength);

        const toRemove = sorted.slice(0, this.shortTermMemory.size - limit);
        for (const slot of toRemove) {
            this.shortTermMemory.delete(slot.id);
        }

        Logger.debug(MODULE, `短期记忆容量限制：移除 ${toRemove.length} 条`);
    }

    /**
     * 选取工作记忆
     */
    private selectWorkingMemory(): MemorySlot[] {
        const limit = this.config.workingLimit;

        const sorted = Array.from(this.shortTermMemory.values())
            .sort((a, b) => b.strength - a.strength)
            .slice(0, limit);

        // 标记为工作记忆
        for (const slot of sorted) {
            slot.tier = 'working';
        }

        return sorted;
    }

    /**
     * 检测是否需要 softReset（上下文切换）
     */
    private shouldSoftReset(candidates: RecallCandidate[]): boolean {
        if (this.shortTermMemory.size === 0) return false;
        if (candidates.length === 0) return false;

        // 计算短期记忆中与新候选重叠的部分
        const candidateIds = new Set(candidates.map(c => c.id));
        let overlapCount = 0;
        let totalBaseScore = 0;
        let totalCurrentScore = 0;

        for (const [id, slot] of this.shortTermMemory) {
            if (candidateIds.has(id)) {
                overlapCount++;
                totalBaseScore += slot.baseScore;
                const candidate = candidates.find(c => c.id === id);
                if (candidate) {
                    totalCurrentScore += candidate.score;
                }
            }
        }

        if (overlapCount === 0) {
            // 完全无重叠，可能是话题切换
            return true;
        }

        // 计算平均分数比
        const avgBaseScore = totalBaseScore / overlapCount;
        const avgCurrentScore = totalCurrentScore / overlapCount;
        const ratio = avgCurrentScore / avgBaseScore;

        return ratio < this.config.contextSwitchThreshold;
    }

    /**
     * 软重置：清空短期记忆但保留轮次
     */
    softReset(): void {
        this.shortTermMemory.clear();
        Logger.info(MODULE, 'softReset: 短期记忆已清空');
    }

    /**
     * 硬重置：完全重置
     */
    hardReset(): void {
        this.shortTermMemory.clear();
        this.currentRound = 0;
        Logger.info(MODULE, 'hardReset: 类脑召回缓存已重置');
    }

    /**
     * 获取短期记忆快照（用于调试/UI）
     */
    getShortTermSnapshot(): MemorySlot[] {
        return Array.from(this.shortTermMemory.values())
            .sort((a, b) => b.strength - a.strength);
    }

    /**
     * 获取统计信息
     */
    getStats(): { size: number; currentRound: number; avgStrength: number } {
        const slots = Array.from(this.shortTermMemory.values());
        const avgStrength = slots.length > 0
            ? slots.reduce((sum, s) => sum + s.strength, 0) / slots.length
            : 0;

        return {
            size: this.shortTermMemory.size,
            currentRound: this.currentRound,
            avgStrength,
        };
    }
}

// 单例导出
export const brainRecallCache = new BrainRecallCache();

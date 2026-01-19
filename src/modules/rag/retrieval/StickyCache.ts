/**
 * StickyCache - 黏性系统缓存
 *
 * 设计理念：连续几轮剧情大多是连贯的，召回结果应有一定「惯性」。
 * 但为避免同一记忆反复出现，连续召回多次的项应降低权重。
 *
 * 生命周期：内存缓存，Retriever 单例持有，重启后失效
 */

import { Logger, LogModule } from '@/core/logger';

/**
 * 黏性配置
 */
export interface StickyConfig {
    /** 是否启用 */
    enabled: boolean;
    /** 衰减系数：每次连续召回增加的惩罚 (默认 0.15) */
    decayFactor: number;
    /** 最大停留轮数：超过此轮数不再惩罚 (默认 3) */
    maxStickRounds: number;
}

/**
 * 默认黏性配置
 */
export const DEFAULT_STICKY_CONFIG: StickyConfig = {
    enabled: true,
    decayFactor: 0.15,
    maxStickRounds: 3,
};

/**
 * 缓存条目
 */
interface StickyCacheEntry {
    /** 上次召回的轮次 */
    lastRound: number;
    /** 连续召回次数 */
    consecutiveCount: number;
}

/**
 * StickyCache 类
 */
export class StickyCache {
    /** 缓存: eventId -> StickyCacheEntry */
    private cache: Map<string, StickyCacheEntry> = new Map();
    /** 当前轮次 */
    private currentRound: number = 0;

    /**
     * 开始新一轮召回
     */
    nextRound(): void {
        this.currentRound++;
        Logger.debug(LogModule.RAG_CACHE, `开始第 ${this.currentRound} 轮召回`);
    }

    /**
     * 获取当前轮次
     */
    getCurrentRound(): number {
        return this.currentRound;
    }

    /**
     * 标记某事件被召回
     */
    markRecalled(eventId: string): void {
        const existing = this.cache.get(eventId);

        if (existing && existing.lastRound === this.currentRound - 1) {
            // 连续召回，增加计数
            this.cache.set(eventId, {
                lastRound: this.currentRound,
                consecutiveCount: existing.consecutiveCount + 1,
            });
        } else {
            // 首次召回或中断后重新召回
            this.cache.set(eventId, {
                lastRound: this.currentRound,
                consecutiveCount: 1,
            });
        }
    }

    /**
     * 批量标记召回
     */
    markRecalledBatch(eventIds: string[]): void {
        eventIds.forEach(id => this.markRecalled(id));
    }

    /**
     * 获取黏性惩罚
     *
     * @param eventId 事件 ID
     * @param config 黏性配置
     * @returns 惩罚值 [0, 1]，0 = 无惩罚，1 = 完全惩罚
     */
    getStickyPenalty(eventId: string, config: StickyConfig): number {
        if (!config.enabled) return 0;

        const entry = this.cache.get(eventId);
        if (!entry) return 0;

        // 计算距离上次召回的轮数
        const roundGap = this.currentRound - entry.lastRound;

        // 如果超出最大黏性轮数，无惩罚（已经「冷却」）
        if (roundGap > config.maxStickRounds) return 0;

        // 连续召回次数越多，惩罚越大
        // 惩罚 = min(1, consecutiveCount * decayFactor)
        const penalty = Math.min(1, entry.consecutiveCount * config.decayFactor);

        return penalty;
    }

    /**
     * 检查是否处于黏性期
     */
    isSticky(eventId: string, config: StickyConfig): boolean {
        return this.getStickyPenalty(eventId, config) > 0;
    }

    /**
     * 清理过期缓存
     *
     * @param maxAge 最大年龄（轮数），超过此年龄的条目将被清理
     */
    cleanup(maxAge: number = 10): void {
        let cleanedCount = 0;

        for (const [id, entry] of this.cache) {
            if (this.currentRound - entry.lastRound > maxAge) {
                this.cache.delete(id);
                cleanedCount++;
            }
        }

        if (cleanedCount > 0) {
            Logger.debug(LogModule.RAG_CACHE, `清理了 ${cleanedCount} 条过期缓存`);
        }
    }

    /**
     * 清空所有缓存
     */
    clear(): void {
        this.cache.clear();
        this.currentRound = 0;
        Logger.debug(LogModule.RAG_CACHE, '缓存已清空');
    }

    /**
     * 获取缓存统计
     */
    getStats(): { size: number; currentRound: number } {
        return {
            size: this.cache.size,
            currentRound: this.currentRound,
        };
    }

    /**
     * 获取事件的黏性信息（用于调试/日志）
     */
    getEventInfo(eventId: string): StickyCacheEntry | undefined {
        return this.cache.get(eventId);
    }
}

/** 单例导出 */
export const stickyCache = new StickyCache();
export default StickyCache;

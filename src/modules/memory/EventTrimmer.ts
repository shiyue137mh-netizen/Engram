/**
 * EventTrimmer - IndexedDB 事件精简服务
 *
 * V0.6: 直接调用 llmAdapter，不再依赖 Extractor
 */

import { useMemoryStore } from '@/state/memoryStore';
import { Logger, LogModule } from '@/core/logger';
import { notificationService } from '@/ui/services/NotificationService';
import { SettingsManager } from '@/config/settings';
import type { EventNode } from '@/data/types/graph';


export interface TrimConfig {
    /** 保留最近 N 条不合并 */
    keepRecentCount: number;
    /** 是否启用预览确认 */
    previewEnabled: boolean;
    /** 触发类型 */
    trigger?: 'token' | 'count';
    /** Token 阈值 */
    tokenLimit?: number;
    /** 条目数阈值 */
    countLimit?: number;
    /** 是否启用 */
    enabled?: boolean;
}

export const DEFAULT_TRIM_CONFIG: TrimConfig = {
    keepRecentCount: 3,
    previewEnabled: true,
};

interface TrimResult {
    /** 精简后的事件 */
    newEvent: EventNode;
    /** 被删除的事件数量 */
    deletedCount: number;
    /** 原始事件 ID 列表 */
    sourceEventIds: string[];
}

/** JSON 响应格式 */
interface TrimResponse {
    events: Array<{
        summary: string;
        meta: {
            time_anchor?: string;
            role?: string[];
            location?: string;
            event?: string;
            logic?: string[];
            causality?: string;
        };
        significance_score: number;
    }>;
}

/**
 * 精简状态
 */
export interface TrimmerStatus {
    triggered: boolean;
    triggerType: 'token' | 'count';
    currentValue: number;
    threshold: number;
    pendingEntryCount: number;
    isTrimming: boolean;
}

/**
 * EventTrimmer 类
 */
class EventTrimmer {
    private config: TrimConfig;
    private isTrimming = false;

    constructor(config?: Partial<TrimConfig>) {
        this.config = { ...DEFAULT_TRIM_CONFIG, ...config };
    }

    /**
     * 更新配置
     */
    updateConfig(config: Partial<TrimConfig>): void {
        this.config = { ...this.config, ...config };
    }

    /**
     * 检查是否可以触发精简
     */
    async canTrim(): Promise<{ canTrim: boolean; eventCount: number; pendingCount: number }> {
        const store = useMemoryStore.getState();
        const events = await store.getAllEvents();
        const pendingCount = Math.max(0, events.length - this.config.keepRecentCount);

        return {
            canTrim: pendingCount >= 2,  // 至少需要 2 条才能合并
            eventCount: events.length,
            pendingCount
        };
    }

    /**
     * 执行精简
     * 将多条旧事件合并为 1 条压缩后的事件
     */
    async trim(manual = false): Promise<TrimResult | null> {
        if (this.isTrimming) {
            Logger.warn(LogModule.MEMORY_TRIM, '正在执行精简，跳过本次触发');
            return null;
        }

        this.isTrimming = true;

        try {
            // Lazy import
            const { WorkflowEngine } = await import('@/modules/workflow/core/WorkflowEngine');
            const { createTrimmerWorkflow } = await import('@/modules/workflow/definitions/TrimmerWorkflow');

            const context = await WorkflowEngine.run(createTrimmerWorkflow(), {
                trigger: manual ? 'manual' : 'auto',
                config: {
                    keepRecentCount: this.config.keepRecentCount,
                    previewEnabled: this.config.previewEnabled,
                    templateId: 'builtin_trim', // Hardcoded for now, matches BuildPrompt category mapping potentially
                    logType: 'trimming'
                }
            });

            if (context.data?.skipTrimming) {
                // Not strictly an error, just skipped
                return null;
            }

            return context.output as TrimResult;

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            if (errorMsg === 'UserCancelled') {
                Logger.info(LogModule.MEMORY_TRIM, '精简被用户取消');
                return null;
            }
            Logger.error(LogModule.MEMORY_TRIM, '精简流程异常', { error: errorMsg });
            if (manual) {
                notificationService.error(`精简异常: ${errorMsg}`, 'Engram 错误');
            }
            return null;
        } finally {
            this.isTrimming = false;
        }
    }

    /**
     * 将事件格式化为精简输入文本 (烧录格式)
     */
    private formatEventsForTrim(events: EventNode[]): string {
        return events.map(e => {
            const kv = e.structured_kv;
            // V1.0.2: location 现在是数组
            const locStr = Array.isArray(kv.location) ? kv.location.join(', ') : kv.location;
            return `${e.summary}
Role: [${kv.role.join(', ')}]
Loc: [${locStr}]
Event: ${kv.event}
Logic: [${kv.logic.join(', ')}]
Causality: ${kv.causality}
Significance: ${e.significance_score}`;
        }).join('\n\n---\n\n');
    }

    /**
     * 合并多个数组并去重
     */
    private mergeArrays(arrays: string[][]): string[] {
        const set = new Set<string>();
        for (const arr of arrays) {
            for (const item of arr) {
                set.add(item);
            }
        }
        return Array.from(set);
    }

    /**
     * 获取配置
     */
    getConfig(): TrimConfig {
        return { ...this.config };
    }

    /**
     * 获取状态 (UI 适配)
     */
    async getStatus() {
        // 动态导入以避免循环依赖
        const { useMemoryStore } = await import('@/state/memoryStore');
        const store = useMemoryStore.getState();
        const { totalTokens, eventCount } = await store.countEventTokens();

        // 触发检测
        let triggered = false;
        let currentValue = 0;
        let threshold = 0;

        // 获取阈值配置 (SettingsManager 中读取)
        const settings = SettingsManager.getSummarizerSettings()?.trimConfig || this.config;
        const limitConfig = settings as any; // Temporary cast

        // 注意：这里我们需要统一配置来源。UI目前是从 SettingsManager 读取 trimConfig
        // EventTrimmer 构造函数加载了 DEFAULT，但应该也读取 Settings

        // 检查触发器类型 (假设 TrimConfig 扩展了 trigger 字段，虽然当前接口没写，但 UI 有用)
        // 我们需要在 TrimConfig 中补充这些字段以匹配 TrimmerService 的定义
        const triggerType = (limitConfig.trigger || 'token') as 'token' | 'count';
        const tokenLimit = limitConfig.tokenLimit || 10240;
        const countLimit = limitConfig.countLimit || 5;

        if (triggerType === 'token') {
            currentValue = totalTokens;
            threshold = tokenLimit;
        } else {
            currentValue = eventCount;
            threshold = countLimit;
        }

        triggered = currentValue >= threshold;

        // 待合并条目
        const keepCount = limitConfig.keepRecentCount || 3;
        const pendingEntryCount = Math.max(0, eventCount - keepCount);

        return {
            triggered,
            triggerType,
            currentValue,
            threshold,
            pendingEntryCount,
            isTrimming: this.isTrimming
        };
    }
}

/** 默认实例 */
export const eventTrimmer = new EventTrimmer();

/**
 * EventTrimmer - IndexedDB 事件精简服务
 *
 * V0.6: 直接调用 llmAdapter，不再依赖 Extractor
 */

import { SettingsManager } from '@/config/settings';
import { DEFAULT_TRIM_CONFIG } from '@/config/types/defaults';
import type { TrimConfig } from '@/config/types/memory';
import { LogModule, Logger } from '@/core/logger';
import type { EventNode } from '@/data/types/graph';
import { useMemoryStore } from '@/state/memoryStore';
import { notificationService } from '@/ui/services/NotificationService';

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
    events: {
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
    }[];
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
        this.config = this.getEffectiveConfig(config);
    }

    /**
     * 更新配置
     */
    updateConfig(config: Partial<TrimConfig>): void {
        this.config = this.getEffectiveConfig(config);
    }

    private getStoredConfig(): Partial<TrimConfig> {
        return SettingsManager.getSummarizerSettings()?.trimConfig || {};
    }

    private getEffectiveConfig(override: Partial<TrimConfig> = {}): TrimConfig {
        return {
            ...DEFAULT_TRIM_CONFIG,
            ...this.getStoredConfig(),
            ...this.config,
            ...override,
        };
    }

    /**
     * 检查是否可以触发精简
     * V1.0.5: 使用 getEventsToMerge 而非 getAllEvents，确保只统计活跃事件
     */
    async canTrim(): Promise<{ canTrim: boolean; eventCount: number; pendingCount: number }> {
        const config = this.getEffectiveConfig();
        const store = useMemoryStore.getState();
        const eventsToMerge = await store.getEventsToMerge(config.keepRecentCount);
        const { activeEventCount } = await store.countEventTokens();

        return {
            canTrim: eventsToMerge.length >= 2,  // 至少需要 2 条才能合并
            eventCount: activeEventCount,
            pendingCount: eventsToMerge.length
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

            const config = this.getEffectiveConfig();
            const context = await WorkflowEngine.run(createTrimmerWorkflow(), {
                config: {
                    keepRecentCount: config.keepRecentCount,
                    previewEnabled: (SettingsManager.get('globalPreviewEnabled') ?? true) && (config.previewEnabled ?? true),
                    templateId: 'builtin_trim', // Hardcoded for now, matches BuildPrompt category mapping potentially
                    logType: 'trimming'
                },
                trigger: manual ? 'manual' : 'auto'
            });

            if (context.data?.skipTrimming) {
                // Not strictly an error, just skipped
                return null;
            }

            return context.output as TrimResult;

        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
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
     * 获取配置
     */
    async trimSelected(eventIds: string[]): Promise<TrimResult | null> {
        if (!Array.isArray(eventIds) || eventIds.length < 2) {
            notificationService.warning('Please select at least 2 events to trim.', 'Engram');
            return null;
        }

        if (this.isTrimming) {
            Logger.warn(LogModule.MEMORY_TRIM, 'Trim is already running, skip selected trim');
            return null;
        }

        this.isTrimming = true;

        try {
            const { WorkflowEngine } = await import('@/modules/workflow/core/WorkflowEngine');
            const { createTrimmerWorkflow } = await import('@/modules/workflow/definitions/TrimmerWorkflow');

            const config = this.getEffectiveConfig();
            const context = await WorkflowEngine.run(createTrimmerWorkflow(), {
                config: {
                    keepRecentCount: config.keepRecentCount,
                    previewEnabled: (SettingsManager.get('globalPreviewEnabled') ?? true) && (config.previewEnabled ?? true),
                    templateId: 'builtin_trim',
                    logType: 'trimming'
                },
                input: {
                    selectedEventIds: [...new Set(eventIds)]
                },
                trigger: 'manual'
            });

            if (context.data?.skipTrimming) {
                return null;
            }

            return context.output as TrimResult;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            if (errorMsg === 'UserCancelled') {
                Logger.info(LogModule.MEMORY_TRIM, 'Selected trim was cancelled by user');
                return null;
            }
            Logger.error(LogModule.MEMORY_TRIM, 'Selected trim workflow failed', { error: errorMsg });
            notificationService.error(`Selected trim failed: ${errorMsg}`, 'Engram Error');
            return null;
        } finally {
            this.isTrimming = false;
        }
    }

    getConfig(): TrimConfig {
        return this.getEffectiveConfig();
    }

    /**
     * 获取状态 (UI 适配)
     */
    async getStatus() {
        // 动态导入以避免循环依赖
        const { useMemoryStore } = await import('@/state/memoryStore');
        const store = useMemoryStore.getState();
        // V1.0.5: 使用 activeEventCount 而非 eventCount
        const { totalTokens, activeEventCount } = await store.countEventTokens();

        // 触发检测
        let triggered = false;
        let currentValue = 0;
        let threshold = 0;

        const config = this.getEffectiveConfig();
        const triggerType = config.trigger;
        const {tokenLimit} = config;
        const {countLimit} = config;

        if (triggerType === 'token') {
            currentValue = totalTokens;
            threshold = tokenLimit;
        } else {
            // V1.0.5: 使用 activeEventCount
            currentValue = activeEventCount;
            threshold = countLimit;
        }

        triggered = currentValue >= threshold;

        // 待合并条目 —— 复用 getEventsToMerge 确保口径一致（仅统计 level 0 未归档事件）
        const eventsToMerge = await store.getEventsToMerge(config.keepRecentCount);
        const pendingEntryCount = eventsToMerge.length;
        triggered = triggered && pendingEntryCount >= 2;

        Logger.debug(LogModule.MEMORY_TRIM, '精简状态检查', {
            currentValue,
            enabled: config.enabled,
            keepRecentCount: config.keepRecentCount,
            pendingEntryCount,
            threshold,
            triggerType,
            triggered,
        });

        return {
            currentValue,
            isTrimming: this.isTrimming,
            pendingEntryCount,
            threshold,
            triggerType,
            triggered
        };
    }
}

/** 默认实例 */
export const eventTrimmer = new EventTrimmer();

/**
 * EventTrimmer - IndexedDB 事件精简服务
 *
 * V0.6: 直接调用 llmAdapter，不再依赖 Extractor
 */

import { useMemoryStore } from '@/state/memoryStore';
import { MacroService } from '@/integrations/tavern/macros';
import { Logger } from '@/core/logger';
import { notificationService } from '@/ui/services/NotificationService';
import { revisionService } from '@/core/events/RevisionBridge';
import { llmAdapter } from '@/integrations/llm';
import { embeddingService } from '@/modules/rag';
import { SettingsManager } from '@/config/settings';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import type { EventNode } from '@/data/types/graph';

// 精简 Prompt 模板
import trimPromptRaw from '@/integrations/llm/prompts/trim.md?raw';

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

export interface TrimResult {
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
 * EventTrimmer 类
 */
export class EventTrimmer {
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
            Logger.warn('EventTrimmer', '正在执行精简，跳过本次触发');
            return null;
        }

        const store = useMemoryStore.getState();

        // 1. 获取待合并的事件
        const eventsToMerge = await store.getEventsToMerge(this.config.keepRecentCount);
        if (eventsToMerge.length < 2) {
            if (manual) {
                notificationService.info('待合并的事件不足 (需要至少 2 条)', 'Engram');
            }
            return null;
        }

        this.isTrimming = true;
        Logger.info('EventTrimmer', '开始执行精简', { eventCount: eventsToMerge.length });

        try {
            // 2. 组装待精简的文本 (烧录格式)
            const inputText = this.formatEventsForTrim(eventsToMerge);

            // 3. 调用 LLM 压缩 (V0.6: 直接调用 llmAdapter)
            const response = await llmAdapter.generate({
                systemPrompt: trimPromptRaw,
                userPrompt: `请将以下多条事件记录精简合并为更少的事件：\n\n${inputText}`
            });

            if (!response.success || !response.content) {
                Logger.error('EventTrimmer', 'LLM 调用失败', { error: response.error });
                notificationService.error('精简失败：LLM 调用失败', 'Engram');
                return null;
            }

            // 4. 解析 JSON
            const parsed = RobustJsonParser.parse<TrimResponse>(response.content);
            if (!parsed || !parsed.events || parsed.events.length === 0) {
                Logger.error('EventTrimmer', 'JSON 解析失败或无事件');
                notificationService.error('精简失败：无法解析结果', 'Engram');
                return null;
            }

            // 5. 预览确认 (如果启用)
            let finalSummary = parsed.events.map(e => e.summary).join('\n\n');
            if (this.config.previewEnabled) {
                try {
                    finalSummary = await revisionService.requestRevision(
                        '精简摘要修订',
                        `合并 ${eventsToMerge.length} 条事件`,
                        finalSummary
                    );
                } catch {
                    Logger.warn('EventTrimmer', '用户取消了精简');
                    notificationService.info('已取消精简操作', '操作取消');
                    return null;
                }
            }

            // 6. 保存新的合并事件
            const firstParsed = parsed.events[0];
            const newEvent = await store.saveEvent({
                summary: finalSummary,
                structured_kv: {
                    time_anchor: firstParsed.meta.time_anchor || '',
                    role: this.mergeArrays(eventsToMerge.map(e => e.structured_kv.role)),
                    location: firstParsed.meta.location || '',
                    event: '精简合并',
                    logic: this.mergeArrays(eventsToMerge.map(e => e.structured_kv.logic)),
                    causality: 'Chain'
                },
                significance_score: Math.max(...eventsToMerge.map(e => e.significance_score)),
                level: 1,  // 标记为二层精简
                is_embedded: false, // 摘要默认不嵌入 (等待下一次 Trim 或手动触发)
                is_archived: false, // 摘要始终显示
                source_range: {
                    start_index: Math.min(...eventsToMerge.map(e => e.source_range?.start_index ?? 0)),
                    end_index: Math.max(...eventsToMerge.map(e => e.source_range?.end_index ?? 0))
                }
            });

            // 7. Trim Linkage: 归档 & 嵌入联动
            const sourceEventIds = eventsToMerge.map(e => e.id);

            // 检查嵌入配置
            const settings = SettingsManager.get('apiSettings');
            const embeddingConfig = settings?.embeddingConfig;

            if (embeddingConfig?.enabled && embeddingConfig.trigger === 'with_trim') {
                Logger.info('EventTrimmer', '触发联动嵌入', { count: eventsToMerge.length });
                try {
                    // 1. 生成向量
                    await embeddingService.embedEvents(eventsToMerge);
                    // 2. 标记为已嵌入
                    await store.markEventsAsEmbedded(sourceEventIds);
                } catch (embedError) {
                    Logger.error('EventTrimmer', '联动嵌入失败', { error: embedError });
                    notificationService.warning('联动嵌入失败，但精简已完成', 'Engram');
                }
            }

            // 8. 归档原始事件 (Hidden from Context)
            // V0.7: 不再物理删除，而是标记为 is_archived
            await store.archiveEvents(sourceEventIds);

            // 9. 刷新宏缓存
            await MacroService.refreshCache();

            Logger.success('EventTrimmer', '精简完成', {
                merged: eventsToMerge.length,
                newEventId: newEvent.id
            });

            notificationService.success(
                `已精简 ${eventsToMerge.length} 条事件为 1 条`,
                'Engram'
            );

            return {
                newEvent,
                deletedCount: 0, // V0.7: 不再删除
                sourceEventIds
            };

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            Logger.error('EventTrimmer', '精简执行异常', { error: errorMsg });
            notificationService.error(`精简异常: ${errorMsg}`, 'Engram 错误');
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
            return `${e.summary}
Role: [${kv.role.join(', ')}]
Loc: ${kv.location}
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

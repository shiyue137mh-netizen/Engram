/**
 * EventTrimmer - IndexedDB 事件精简服务
 *
 * V0.5 架构：专门处理 IndexedDB 中的 EventNode 精简
 * 取代旧的 TrimmerService 中的 WorldBook 操作
 */

import { useMemoryStore } from '@/stores/memoryStore';
import { extractor, ExtractedEvent } from '@/services/pipeline/Extractor';
import { MacroService } from '@/tavern/MacroService';
import { Logger } from '@/lib/logger';
import { notificationService } from '@/services/NotificationService';
import { revisionService } from '@/services/RevisionService';
import type { EventNode } from '@/services/types/graph';

export interface TrimConfig {
    /** 保留最近 N 条不合并 */
    keepRecentCount: number;
    /** 是否启用预览确认 */
    previewEnabled: boolean;
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

            // 3. 调用 LLM 压缩 (复用 Extractor)
            const extractedEvents = await extractor.extract([{
                role: 'user',
                content: `请将以下多条事件记录精简合并：\n\n${inputText}`
            }]);

            if (!extractedEvents || extractedEvents.length === 0) {
                Logger.error('EventTrimmer', 'LLM 返回空结果');
                notificationService.error('精简失败：LLM 返回空结果', 'Engram');
                return null;
            }

            // 4. 预览确认 (如果启用)
            let finalSummary = extractedEvents.map(e => e.summary).join('\n\n');
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

            // 5. 保存新的合并事件
            const scope = store.currentScope;
            if (!scope?.id) {
                throw new Error('No current scope');
            }

            // 使用第一个提取的事件的 meta 作为合并后的 meta
            const firstExtracted = extractedEvents[0];
            const newEvent = await store.saveEvent({
                scope_id: scope.id,
                summary: finalSummary,
                structured_kv: {
                    time_anchor: firstExtracted.meta.time_anchor || '',
                    role: this.mergeArrays(eventsToMerge.map(e => e.structured_kv.role)),
                    location: firstExtracted.meta.location,
                    event: '精简合并',
                    logic: this.mergeArrays(eventsToMerge.map(e => e.structured_kv.logic)),
                    causality: 'Chain'
                },
                significance_score: Math.max(...eventsToMerge.map(e => e.significance_score)),
                level: 1,  // 标记为二层精简
                source_range: {
                    start_index: Math.min(...eventsToMerge.map(e => e.source_range?.start_index ?? 0)),
                    end_index: Math.max(...eventsToMerge.map(e => e.source_range?.end_index ?? 0))
                }
            });

            // 6. 删除原始事件
            const sourceEventIds = eventsToMerge.map(e => e.id);
            await store.deleteEvents(sourceEventIds);

            // 7. 刷新宏缓存
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
                deletedCount: sourceEventIds.length,
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
}

/** 默认实例 */
export const eventTrimmer = new EventTrimmer();

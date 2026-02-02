import { SettingsManager } from '@/config/settings';
import { Logger } from '@/core/logger';
import { EventNode } from '@/data/types/graph';
import { MacroService } from '@/integrations/tavern/macros';
import { embeddingService } from '@/modules/rag';
import { useMemoryStore } from '@/state/memoryStore';
import { notificationService } from '@/ui/services/NotificationService';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

export class ApplyTrim implements IStep {
    name = 'ApplyTrim';

    async execute(context: JobContext): Promise<void> {
        if (context.data?.skipTrimming) {
            return;
        }

        const store = useMemoryStore.getState();
        const eventsToMerge = context.input.eventsToMerge as EventNode[];

        // Output from ParseJson (TrimResponse structure)
        // V1.2.2: 优先从 context.parsedData 读取，对齐 ParseJson 逻辑
        const parsed = context.parsedData || context.output;

        if (!parsed || !parsed.events || parsed.events.length === 0) {
            throw new Error('ApplyTrim: 无有效的精简结果');
        }

        // 我们假设精简结果只包含 1 个合并后的事件 (或者 LLM 可能返回多个？EventTrimmer 取的是 0)
        // 原逻辑: const firstParsed = parsed.events[0];
        const firstParsed = parsed.events[0];

        // 1. 保存新的合并事件
        const newEvent = await store.saveEvent({
            summary: parsed.events.map((e: any) => e.summary).join('\n\n'), // 如果有多个，合并 summary? 或者只取第一个
            structured_kv: {
                time_anchor: firstParsed.meta.time_anchor || '',
                role: this.mergeArrays(eventsToMerge.map(e => e.structured_kv.role)),
                location: Array.isArray(firstParsed.meta.location)
                    ? firstParsed.meta.location as string[]
                    : [firstParsed.meta.location].filter((x: any) => Boolean(x)),
                event: '精简合并',
                logic: this.mergeArrays(eventsToMerge.map(e => e.structured_kv.logic)),
                causality: 'Chain'
            },
            significance_score: Math.max(...eventsToMerge.map(e => e.significance_score)),
            level: 1,  // 标记为二层精简
            is_embedded: false,
            is_archived: false,
            source_range: {
                start_index: Math.min(...eventsToMerge.map(e => e.source_range?.start_index ?? 0)),
                end_index: Math.max(...eventsToMerge.map(e => e.source_range?.end_index ?? 0))
            }
        });

        // 2. 联动嵌入 (Trim Linkage)
        const sourceEventIds = eventsToMerge.map(e => e.id);
        const settings = SettingsManager.get('apiSettings');
        // @ts-ignore
        const embeddingConfig = settings?.embeddingConfig;

        if (embeddingConfig?.enabled && embeddingConfig.trigger === 'with_trim') {
            Logger.info('ApplyTrim', '触发联动嵌入', { count: eventsToMerge.length });
            try {
                // V1.2.2: 初始化 Embedding 服务配置，防止联动时配置丢失
                const vectorConfig = settings?.vectorConfig;
                if (vectorConfig) {
                    embeddingService.setConfig(vectorConfig);
                }

                await embeddingService.embedEvents(eventsToMerge);
                await store.markEventsAsEmbedded(sourceEventIds);
            } catch (embedError) {
                Logger.error('ApplyTrim', '联动嵌入失败', { error: embedError });
                notificationService.warning('联动嵌入失败，但精简已完成', 'Engram');
            }
        }

        // 3. 归档原始事件
        await store.archiveEvents(sourceEventIds);

        // 4. 刷新缓存
        await MacroService.refreshCache();

        Logger.success('ApplyTrim', '精简完成', {
            merged: eventsToMerge.length,
            newEventId: newEvent.id
        });

        context.output = {
            newEvent,
            deletedCount: 0,
            sourceEventIds
        };
    }

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

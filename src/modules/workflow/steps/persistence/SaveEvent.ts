import { Logger } from '@/core/logger';
import { EventNode } from '@/data/types/graph';
import { hideMessageRange } from '@/integrations/tavern/bridge';
import { MacroService } from '@/integrations/tavern/macros';
import { useMemoryStore } from '@/state/memoryStore';
import { notificationService } from '@/ui/services/NotificationService';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

// Replaces Pipeline.ts logic
export class SaveEvent implements IStep {
    name = 'SaveEvent';

    async execute(context: JobContext): Promise<void> {


        const content = context.output || context.cleanedContent;
        if (!content) {
            throw new Error('SaveEvent: 无内容可保存');
        }

        const store = useMemoryStore.getState();
        const db = await store.initChat();
        if (!db) throw new Error('No chat context');


        let eventsToSave: any[] = [];

        if (context.parsedData && context.parsedData.events) {
            eventsToSave = context.parsedData.events;
        } else {

            try {
                const { RobustJsonParser } = await import('@/core/utils/JsonParser');
                const parsed = RobustJsonParser.parse<any>(content);
                if (parsed && parsed.events) {
                    eventsToSave = parsed.events;
                }
            } catch (e) {
                throw new Error('SaveEvent: 无法解析 JSON 事件数据');
            }
        }

        if (eventsToSave.length === 0) {
            throw new Error('SaveEvent: 无有效事件');
        }

        const savedEvents: EventNode[] = [];
        const range = context.input.range || [0, 0];

        // 3. 保存逻辑 (Burn & Save)
        for (const evt of eventsToSave) {
            const meta = evt.meta || {};

            // Burn logic (Construct Summary String) V1.6: New compact format
            // Format: 标题(因果链 | 逻辑标签):
            // (时间 | 人物) 摘要内容

            // Build title suffix with causality and logic
            const titleSuffixParts: string[] = [];
            if (meta.causality) titleSuffixParts.push(meta.causality);
            if (meta.logic && meta.logic.length > 0) titleSuffixParts.push(meta.logic.join(', '));
            const titleSuffix = titleSuffixParts.length > 0 ? `(${titleSuffixParts.join(' | ')})` : '';

            // Build title line
            const eventTitle = meta.event || '';
            const titleLine = eventTitle ? `${eventTitle}${titleSuffix}:\n` : '';

            // Build meta line (time | location | characters)
            const metaParts: string[] = [];
            if (meta.time_anchor) metaParts.push(meta.time_anchor);
            if (meta.location) {
                const loc = Array.isArray(meta.location) ? meta.location.join(', ') : meta.location;
                if (loc) metaParts.push(loc);
            }
            if (meta.role && meta.role.length > 0) metaParts.push(meta.role.join(', '));
            const metaLine = metaParts.length > 0 ? `(${metaParts.join(' | ')}) ` : '';

            let rawSummary = evt.summary || `[Summary Missing] ${meta.event || '无摘要'}`;
            const burnedSummary = `${titleLine}${metaLine}${rawSummary}`;

            const saved = await store.saveEvent({
                summary: burnedSummary,
                structured_kv: {
                    time_anchor: meta.time_anchor || '',
                    role: meta.role || [],
                    location: Array.isArray(meta.location) ? meta.location : (meta.location ? [meta.location] : []),
                    event: meta.event || '',
                    logic: meta.logic || [],
                    causality: meta.causality || ''
                },
                significance_score: evt.significance_score || 0.5,
                level: 0,
                is_embedded: false,
                is_archived: false,
                source_range: {
                    start_index: range[0],
                    end_index: range[1]
                }
            });
            savedEvents.push(saved);
        }

        context.output = savedEvents;

        // 4. 后置操作
        // Update last summarized floor (State)
        if (range[1] > 0) {
            await store.setLastSummarizedFloor(range[1]);
        }

        // Refresh Macro Cache
        await MacroService.refreshEngramCache();

        // 5. Auto Hide (Optional) - Should this be a separate step?
        // 放在这里方便，或者放在 Workflow 的最后
        if (context.config.autoHide && range[1] > 0) {
            const startIndex = range[0] - 1;
            const endIndex = range[1] - 1;
            hideMessageRange(startIndex, endIndex).catch(e => {
                Logger.error('SaveEvent', '自动隐藏失败', e);
            });
        }

        Logger.success('SaveEvent', `已保存 ${savedEvents.length} 个事件`);
        notificationService.success(`已保存 ${savedEvents.length} 个事件`, 'Engram');
    }
}

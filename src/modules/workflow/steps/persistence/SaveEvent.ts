import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { useMemoryStore } from '@/state/memoryStore';
import { Logger } from '@/core/logger';
import { MacroService } from '@/integrations/tavern/macros';
import { EventNode } from '@/data/types/graph';
import { notificationService } from '@/ui/services/NotificationService';
import { hideMessageRange } from '@/integrations/tavern/bridge';

// Replaces Pipeline.ts logic
export class SaveEvent implements IStep {
    name = 'SaveEvent';

    async execute(context: JobContext): Promise<void> {
        // 输入可以是 parsedData (结构化) 或 output (纯文本)
        // 旧 Pipeline 逻辑主要处理文本内容的解析和存储
        // 这里我们假设前序步骤已经产生了要存储的内容

        // 1. 获取内容
        // 如果有 parsedData，说明走了结构化解析？目前 SummaryWorkflow 主要是文本摘要，
        // 但 Pipeline 实际上尝试解析 JSON。
        // 我们这里复用 Pipeline 的逻辑，先假定 input 是 String (JSON or Text)

        const content = context.output || context.cleanedContent;
        if (!content) {
            throw new Error('SaveEvent: 无内容可保存');
        }

        const store = useMemoryStore.getState();
        const db = await store.initChat();
        if (!db) throw new Error('No chat context');

        // 2. 尝试解析 (如果是 JSON 格式)
        // 为了兼容 V0.6 的 Pipeline 逻辑，我们需要在这里做 解析 -> Burn -> Store
        // 但更好的做法是，如果需要解析，应该在前面加 ParseJson Step。
        // 不过 Summary 生成的内容往往是 "纯文本" 或者 "包含 JSON 的文本"。
        // 让我们看看原代码：pipeline.run 从 result.content (string) 跑起，ParseJson<ParsedEventsResponse>

        // 如果前面的步骤只是 CleanRegex，那么 content 还是 string。
        // 我们在这里尝试解析，或者依赖前面的 ParseJson。
        // 如果 context.parsedData 存在，直接用。

        let eventsToSave: any[] = [];

        if (context.parsedData && context.parsedData.events) {
            eventsToSave = context.parsedData.events;
        } else {
            // 尝试解析
            // TODO: 这里是否应该引入 RobustJsonParser?
            // 原 Pipeline 是强制要求 JSON 的。
            // 但如果 Summary 模板返回的是纯文本呢？
            // 看 Summary Prompt，它要求 "请按要求输出 JSON 格式的剧情总结"。
            // 所以我们可以预期是 JSON。
            try {
                const { RobustJsonParser } = await import('@/core/utils/JsonParser');
                const parsed = RobustJsonParser.parse<any>(content);
                if (parsed && parsed.events) {
                    eventsToSave = parsed.events;
                }
            } catch (e) {
                // Ignore parse error, maybe raw text?
                // 如果解析失败，原 Pipeline 会报错。
                // 我们这里做个 fallback? 还是报错？
                // 原代码：if (!parsed || !parsed.events) return { error: 'No events in JSON content' };
                // 所以我们应该报错，或者把整段文本作为一个 Event。
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

            // Burn logic (Construct Summary String)
            const metaParts: string[] = [];
            if (meta.time_anchor) metaParts.push(meta.time_anchor);
            if (meta.location && !Array.isArray(meta.location)) metaParts.push(meta.location);
            if (meta.role && meta.role.length > 0) metaParts.push(meta.role.join(', '));
            const metaLine = metaParts.length > 0 ? `(${metaParts.join(' | ')}) ` : '';
            const titleLine = meta.event ? `${meta.event}:\n` : '';

            const logicParts: string[] = [];
            if (meta.logic && meta.logic.length > 0) logicParts.push(`[逻辑: ${meta.logic.join(', ')}]`);
            if (meta.causality) logicParts.push(`[因果: ${meta.causality}]`);
            const logicLine = logicParts.length > 0 ? `\n${logicParts.join(' ')}` : '';

            let rawSummary = evt.summary || `[Summary Missing] ${meta.event || '无摘要'}`;
            const burnedSummary = `${titleLine}${metaLine}${rawSummary}${logicLine}`;

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

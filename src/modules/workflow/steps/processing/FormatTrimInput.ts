import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { EventNode } from '@/data/types/graph';
import { Logger } from '@/core/logger';

export class FormatTrimInput implements IStep {
    name = 'FormatTrimInput';

    async execute(context: JobContext): Promise<void> {
        if (context.data?.skipTrimming) {
            return;
        }

        const events = context.input.eventsToMerge as EventNode[];
        if (!events || events.length === 0) {
            throw new Error('FormatTrimInput: 未找到事件');
        }

        const formattedText = events.map(e => {
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

        // 将格式化后的文本放入变量，供 BuildPrompt 使用
        // 假设 BuildPrompt 会使用 {{eventsText}}
        context.input.eventsText = formattedText;
        context.input.eventCount = events.length.toString();

        Logger.debug('FormatTrimInput', `格式化完成 (${formattedText.length} chars)`);
    }
}

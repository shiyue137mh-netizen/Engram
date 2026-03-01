import { Logger } from '@/core/logger';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

export class ParseJson implements IStep {
    name = 'ParseJson';

    async execute(context: JobContext): Promise<void> {
        // V0.9.1: 优先使用 CleanRegex 清洗后的内容
        const contentToparse = context.cleanedContent
            || context.llmResponse?.content;

        if (!contentToparse) {
            throw new Error('ParseJson: 无 LLM 响应内容');
        }

        const parsed = RobustJsonParser.parse<any>(contentToparse);


        if (!parsed) {
            throw new Error('ParseJson: JSON 解析失败');
        }

        // 防御性校验：如果解析出的对象包含 events 字段，确保它是数组
        if (parsed.events !== undefined && !Array.isArray(parsed.events)) {
            Logger.warn('ParseJson', 'events 字段不是数组，尝试修正', { type: typeof parsed.events });
            parsed.events = [];
        }

        context.parsedData = parsed;
        Logger.debug('ParseJson', 'JSON 解析成功');
    }
}

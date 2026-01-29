import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import { Logger } from '@/core/logger';

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

        context.parsedData = parsed;
        Logger.debug('ParseJson', 'JSON 解析成功');
    }
}

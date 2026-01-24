import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import { Logger } from '@/core/logger';

export class ParseJson implements IStep {
    name = 'ParseJson';

    async execute(context: JobContext): Promise<void> {
        if (!context.llmResponse || !context.llmResponse.content) {
            throw new Error('ParseJson: 无 LLM 响应内容');
        }

        const parsed = RobustJsonParser.parse<any>(context.llmResponse.content);

        if (!parsed) {
            throw new Error('ParseJson: JSON 解析失败');
        }

        context.parsedData = parsed;
        Logger.debug('ParseJson', 'JSON 解析成功');
    }
}

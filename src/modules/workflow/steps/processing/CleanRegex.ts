import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { regexProcessor } from './RegexProcessor';
import { Logger } from '@/core/logger';

export class CleanRegex implements IStep {
    name = 'CleanRegex';

    constructor(private type: 'input' | 'output' | 'both' = 'output') { }

    async execute(context: JobContext): Promise<void> {
        const input = context.llmResponse?.content;
        if (!input) {
            // 如果 LLM 没响应，可能是在处理 userInput?
            // 暂时假设只处理 LLM 响应，或者从 context.input.text 读取
            return;
        }

        const cleaned = regexProcessor.process(input, this.type);

        context.cleanedContent = cleaned;

        Logger.debug('CleanRegex', '正则清洗完成');
    }
}

import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { regexProcessor } from './RegexProcessor';
import { Logger } from '@/core/logger';

export class ExtractTags implements IStep {
    name = 'ExtractTags';

    constructor(private tagsToExtract: string[] = ['output', 'query']) { }

    async execute(context: JobContext): Promise<void> {
        // Source content: usually cleaned output
        const content = context.cleanedContent || context.llmResponse?.content;

        if (!content) return;

        const captured = regexProcessor.captureTags(content, this.tagsToExtract);

        // Store in dedicated context field
        const safeCaptured: Record<string, string> = {};
        for (const key of Object.keys(captured)) {
            if (captured[key]) {
                safeCaptured[key] = captured[key]!;
            }
        }
        context.extractedTags = safeCaptured;

        // Also update output to be the 'output' tag content if present,
        // as Preprocessor expects the final text to be the replacement content
        if (captured.output) {
            context.output = captured.output;
            // Also update cleanedContent to reflect the extracted part?
            // Depends on whether UserReview shows full LLM output or just the injection part.
            // In original code, UserReview showed `tags.output`.
            context.cleanedContent = captured.output;
        }

        Logger.debug('ExtractTags', `提取标签: ${Object.keys(captured).join(', ')}`);
    }
}

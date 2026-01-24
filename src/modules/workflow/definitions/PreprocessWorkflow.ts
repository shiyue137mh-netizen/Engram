import { WorkflowDefinition } from '../core/WorkflowEngine';
import {
    BuildPrompt,
    LlmRequest,
    CleanRegex,
    ExtractTags,
    UserReview,
    FetchContext
} from '../steps';

export const createPreprocessWorkflow = (): WorkflowDefinition => ({
    name: 'PreprocessWorkflow',
    steps: [
        // Unified context fetching
        new FetchContext(),
        new BuildPrompt({ category: 'preprocessing' }),
        new LlmRequest(),
        // 1. Remove <think> blocks
        new CleanRegex('output'),
        // 2. Extract <output> and <query>
        new ExtractTags(['output', 'query']),
        // 3. User Review (Preview/Revision)
        new UserReview({
            title: '预处理结果预览',
            description: '请确认即将注入到用户输入的内容。您可以直接在此修改，确认后将替换原文。'
        })
    ]
});

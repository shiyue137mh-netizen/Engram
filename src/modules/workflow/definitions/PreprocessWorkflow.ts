import { WorkflowDefinition } from '../core/WorkflowEngine';
import {
    BuildPrompt,
    CleanRegex,
    ExtractTags,
    FetchContext,
    KeywordRetrieveStep,
    LlmRequest,
    UserReview
} from '../steps';

export const createPreprocessWorkflow = (): WorkflowDefinition => ({
    name: 'PreprocessWorkflow',
    steps: [
        // 1. Unified context fetching
        new FetchContext(),
        // 2. 前置关键词扫描 (V1.4.1 NEW)
        // 这里的扫描结果会存入 context.data.keywordEntityIds，供随后的 BuildPrompt 使用
        new KeywordRetrieveStep(),
        new BuildPrompt({ category: 'preprocessing' }),
        new LlmRequest(),
        // 1. Remove <think> blocks
        new CleanRegex('output'),
        // 2. Extract <output>, <query>, and <recall_decision> (Agentic RAG)
        new ExtractTags(['output', 'query', 'recall_decision']),
        // 3. User Review (Preview/Revision)
        new UserReview({
            title: '预处理结果预览',
            description: '请确认即将注入到用户输入的内容。您可以直接在此修改，确认后将替换原文。'
        })
    ]
});

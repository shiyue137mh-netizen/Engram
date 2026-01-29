import { WorkflowDefinition } from '../core/WorkflowEngine';
import {
    FetchExistingEntities,
    FetchContext,
    BuildPrompt,
    LlmRequest,
    CleanRegex,
    ParseJson,
    SaveEntity,
    UserReview
} from '../steps';

export const createEntityWorkflow = (): WorkflowDefinition => ({
    name: 'EntityWorkflow',
    steps: [
        new FetchContext(),
        new FetchExistingEntities(),
        new BuildPrompt({ category: 'entity_extraction' }),
        new LlmRequest(),
        new CleanRegex('output'),  // V0.9.1: 清洗思维链等标签
        new ParseJson(),
        // Add Review Step
        new UserReview({
            title: '实体提取确认',
            description: '请确认提取的实体列表 (JSON/YAML)。您可以直接编辑以修正错误。'
        }),
        new SaveEntity()
    ]
});


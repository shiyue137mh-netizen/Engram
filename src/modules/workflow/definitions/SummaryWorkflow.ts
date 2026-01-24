import { WorkflowDefinition } from '../core/WorkflowEngine';
import {
    BuildPrompt,
    FetchContext,
    LlmRequest,
    StopGeneration,
    CleanRegex,
    UserReview,
    SaveEvent
} from '../steps';

export const createSummaryWorkflow = (): WorkflowDefinition => ({
    name: 'SummaryWorkflow',
    steps: [
        new StopGeneration(),
        new FetchContext(),
        new BuildPrompt({ category: 'summary' }),
        new LlmRequest(),
        new CleanRegex('output'),
        new UserReview({
            title: '剧情摘要修订',
        }),
        new SaveEvent()
    ]
});

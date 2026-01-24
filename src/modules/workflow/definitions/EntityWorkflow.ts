import { WorkflowDefinition } from '../core/WorkflowEngine';
import {
    FetchExistingEntities,
    FetchContext,
    BuildPrompt,
    LlmRequest,
    ParseJson,
    SaveEntity
} from '../steps';

export const createEntityWorkflow = (): WorkflowDefinition => ({
    name: 'EntityWorkflow',
    steps: [
        new FetchContext(),
        new FetchExistingEntities(),
        new BuildPrompt({ category: 'entity_extraction' }),
        new LlmRequest(),
        new ParseJson(),
        new SaveEntity()
    ]
});

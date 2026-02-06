import { WorkflowDefinition } from '../core/WorkflowEngine';
import {
    BuildPrompt,
    CleanRegex,
    FetchContext,
    FetchExistingEntities,
    LlmRequest,
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
        // V1.2.7: 预览步骤 - DryRun 模式生成 newEntities/updatedEntities 供 UI 显示
        new SaveEntity({ dryRun: true }),
        // Add Review Step
        new UserReview({
            title: '实体提取确认',
            description: '请确认提取的实体列表 (JSON/YAML)。您可以直接编辑以修正错误。'
        }),
        // V1.2.7: 实际保存步骤 - 使用用户可能修改后的数据
        new SaveEntity({ dryRun: false })
    ]
});


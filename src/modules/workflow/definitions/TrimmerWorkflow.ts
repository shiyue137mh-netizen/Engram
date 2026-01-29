import { WorkflowDefinition } from '../core/WorkflowEngine';
import {
    FetchEventsToTrim,
    FormatTrimInput,
    BuildPrompt,
    LlmRequest,
    CleanRegex,
    StopGeneration,
    ParseJson,
    ApplyTrim
} from '../steps';

export const createTrimmerWorkflow = (): WorkflowDefinition => ({
    name: 'TrimmerWorkflow',
    steps: [
        new StopGeneration(),
        new FetchEventsToTrim(),
        new FormatTrimInput(),
        // 映射变量: FormatTrimInput 产生 eventsText, BuildPrompt 填入 prompt
        // 需要确保 prompt template (id='builtin_trim') 使用了 {{eventsText}} 或类似名字?
        // 实际上 `LlmRequest` 会拿 prompt。`BuildPrompt` 负责把 input 里的变量塞进 template。
        // 我们需要在 BuildPrompt 增加 {{eventsText}} 的支持 (如果不在 contextMapping 里的话)。
        // V0.9.1 Preprocessor 使用 input.text. 这里我们用 FormatTrimInput 将结果放在 input.eventsText
        new BuildPrompt({ category: 'trimming' }), // 会找 'builtin_trim'
        new LlmRequest(), // 返回 JSON string
        new CleanRegex('output'),  // V0.9.1: 清洗思维链等标签
        new ParseJson(),  // 解析为 Object
        new ApplyTrim()
    ]
});


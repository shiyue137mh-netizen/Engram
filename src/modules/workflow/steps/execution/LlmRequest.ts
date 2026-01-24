import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { llmAdapter } from '@/integrations/llm/Adapter';
import { ModelLogger } from '@/core/logger/ModelLogger';
import { getCurrentCharacter, getCurrentModel } from '@/integrations/tavern/context';
import { Logger } from '@/core/logger';

export class LlmRequest implements IStep {
    name = 'LlmRequest';

    async execute(context: JobContext): Promise<void> {
        if (!context.prompt) {
            throw new Error('LlmRequest: Prompt 未准备好 (previous step missing?)');
        }

        const { system, user } = context.prompt;

        // 1. 记录发送日志
        const logId = ModelLogger.logSend({
            type: context.config.logType || 'generation', // 允许 config 覆盖
            systemPrompt: system,
            userPrompt: user,
            model: getCurrentModel() || 'Unknown',
            character: getCurrentCharacter()?.name,
            floorRange: context.input.range
        });

        const startTime = Date.now();

        try {
            // 2. 调用 Adapter
            const response = await llmAdapter.generate({
                systemPrompt: system,
                userPrompt: user,
                // presetId: context.config.presetId // TODO: 未来支持从 Workflow Config 指定 LLM Preset，允许不同步骤使用不同模型参数
                internal: true, // 标记为内部请求，防止触发 Preprocessor
            });

            // 3. 记录接收日志
            ModelLogger.logReceive(logId, {
                response: response.content,
                status: response.success ? 'success' : 'error',
                error: response.error,
                duration: Date.now() - startTime,
            });

            if (!response.success) {
                throw new Error(response.error || 'LLM Generation Failed');
            }

            // 4. 保存结果
            context.llmResponse = {
                content: response.content,
                success: true,
                tokenUsage: response.tokenUsage
            };

            Logger.debug('LlmRequest', 'LLM 请求成功', { duration: Date.now() - startTime });

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            ModelLogger.logReceive(logId, {
                status: 'error',
                error: errorMsg,
                duration: Date.now() - startTime,
            });
            throw e;
        }
    }
}

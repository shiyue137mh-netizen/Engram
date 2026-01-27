import { IStep, StepResult } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { revisionService } from '@/core/events/RevisionBridge';
import { WorldInfoService } from '@/integrations/tavern/worldbook';
import { Logger } from '@/core/logger';
import { notificationService } from '@/ui/services/NotificationService';

interface UserReviewConfig {
    title: string;
    description?: string;
}

export class UserReview implements IStep {
    name = 'UserReview';

    constructor(private config: UserReviewConfig) { }

    async execute(context: JobContext): Promise<StepResult> {
        // 检查配置是否启用预览
        if (!context.config.previewEnabled) {
            // 如果未启用，直接使用 cleanedContent 或 llmResponse.content
            context.output = context.cleanedContent || context.llmResponse?.content;
            return; // 默认 next
        }

        const contentToReview = context.cleanedContent || context.llmResponse?.content || '';

        // 计算 Token (供显示)
        const tokenCount = await WorldInfoService.countTokens(contentToReview);
        const range = context.input.range ? `${context.input.range[0]} - ${context.input.range[1]} 楼` : '未知范围';

        Logger.info('UserReview', '等待用户修订...');

        try {
            // 默认动作：确认，取消 (implicit in modal close)
            // 预处理特有动作：跳过 (作为 AI 消息)，打回 (重生成)
            // 根据 context 类型判断可用动作? 暂时全部提供扩展动作
            const result = await revisionService.requestRevision(
                this.config.title,
                this.config.description || `范围: ${range} | Token: ${tokenCount}`,
                contentToReview,
                ['confirm', 'skip', 'reject']
            );

            // 处理结果
            if (result.action === 'skip') {
                Logger.info('UserReview', '用户选择跳过 (转为 AI 消息)');
                // 存入 output 供 Preprocessor.ts 注入
                context.output = result.content; // 用户可能微调了内容
                // 标记为需要注入
                context.metadata.skipToInjection = true;
                return { action: 'finish' };
            }

            if (result.action === 'reject') {
                Logger.info('UserReview', '用户选择打回重生成');
                // 保存反馈
                context.input.feedback = result.feedback;
                context.input.previousOutput = contentToReview; // 保存旧内容供参考
                // 跳转回 BuildPrompt
                return { action: 'jump', targetStep: 'BuildPrompt', reason: 'User rejected' };
            }

            // Confirm
            context.cleanedContent = result.content;
            context.output = result.content;
            Logger.info('UserReview', '用户确认修订');
            return { action: 'next' };

        } catch (e) {
            Logger.warn('UserReview', '用户取消操作');
            notificationService.info('已取消操作', '操作取消');
            throw new Error('UserCancelled');
        }
    }
}

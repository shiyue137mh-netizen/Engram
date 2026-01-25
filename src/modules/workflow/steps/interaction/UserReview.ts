import { IStep } from '../../core/Step';
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

    async execute(context: JobContext): Promise<void> {
        // 检查配置是否启用预览
        if (!context.config.previewEnabled) {
            // 如果未启用，直接使用 cleanedContent 或 llmResponse.content
            context.output = context.cleanedContent || context.llmResponse?.content;
            return;
        }

        const contentToReview = context.cleanedContent || context.llmResponse?.content || '';

        // 计算 Token (供显示)
        const tokenCount = await WorldInfoService.countTokens(contentToReview);
        const range = context.input.range ? `${context.input.range[0]} - ${context.input.range[1]} 楼` : '未知范围';

        Logger.info('UserReview', '等待用户修订...');

        try {
            const revisedContent = await revisionService.requestRevision(
                this.config.title,
                this.config.description || `范围: ${range} | Token: ${tokenCount}`,
                contentToReview
            );

            // 更新结果
            context.cleanedContent = revisedContent;
            context.output = revisedContent; // 如果后续步骤需要 string

            Logger.info('UserReview', '用户确认修订');
        } catch (e) {
            Logger.warn('UserReview', '用户取消修订');
            notificationService.info('已取消操作', '操作取消');
            throw new Error('UserCancelled');
        }
    }
}

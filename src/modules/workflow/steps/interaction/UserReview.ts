import { reviewService } from '@/core/events/ReviewBridge';
import { Logger } from '@/core/logger';
import { WorldInfoService } from '@/integrations/tavern/worldbook';
import { notificationService } from '@/ui/services/NotificationService';
import { JobContext } from '../../core/JobContext';
import { IStep, StepResult } from '../../core/Step';

interface UserReviewConfig {
    title: string;
    description?: string;
}

export class UserReview implements IStep {
    name = 'UserReview';

    constructor(private config: UserReviewConfig) { }

    async execute(context: JobContext): Promise<StepResult> {
        // V1.0.5: 调试日志
        Logger.debug('UserReview', 'previewEnabled check', {
            previewEnabled: context.config.previewEnabled,
            configKeys: Object.keys(context.config)
        });

        // 检查配置是否启用预览
        if (!context.config.previewEnabled) {
            // 如果未启用，直接使用 cleanedContent 或 llmResponse.content
            context.output = context.cleanedContent || context.llmResponse?.content;
            Logger.info('UserReview', 'Preview disabled, skipping review');
            return; // 默认 next
        }

        const contentToReview = context.cleanedContent || context.llmResponse?.content || '';

        // V1.2.1: 如果内容为空，视为生成失败，抛出错误中止流程 (不进入预览)
        if (!contentToReview || !contentToReview.trim()) {
            Logger.warn('UserReview', 'Content is empty, skipping review');
            throw new Error('生成的摘要内容为空，请检查模型输出或 Token 限制。');
        }

        // 计算 Token (供显示)
        const tokenCount = await WorldInfoService.countTokens(contentToReview);
        const range = context.input.range ? `${context.input.range[0]} - ${context.input.range[1]} 楼` : '未知范围';

        Logger.info('UserReview', '等待用户修订...');

        try {
            // 默认动作：确认，取消 (implicit in modal close)
            // 预处理特有动作：跳过 (作为 AI 消息)，打回 (重生成)
            // 根据 context 类型判断可用动作? 暂时全部提供扩展动作
            // 准备数据
            let reviewType: 'text' | 'json' | 'entity' = 'text';
            let reviewData = undefined;

            // V1.2.7: 优先使用 context.output（来自 SaveEntity dryRun 步骤的 newEntities/updatedEntities）
            if (context.output && typeof context.output === 'object' &&
                ('newEntities' in context.output || 'updatedEntities' in context.output)) {
                reviewType = 'entity';
                reviewData = context.output;
            } else if (context.parsedData) {
                // 如果有 parsedData，优先假设是结构化数据
                // 暂时简单判断: TODO: Config or Schema check
                reviewType = 'entity'; // 默认假设，或者根据 context.workflowName 判断
                reviewData = context.parsedData;
            } else if (context.extractedTags?.query) {
                // V1.3: 预处理模式 - 传递 query 供编辑
                reviewData = { query: context.extractedTags.query };
            }

            // V1.2.0: 使用新的 ReviewService
            const result = await reviewService.requestReview(
                this.config.title,
                this.config.description || `范围: ${range} | Token: ${tokenCount}`,
                contentToReview,
                ['confirm', 'fill', 'reject', 'reroll', 'cancel'],
                reviewType,
                reviewData
            );

            // 处理结果
            if (result.action === 'fill') {
                // Fill: Use the content directly, skipping subsequent specialized processing if any
                // But in UserReview context, 'confirm' and 'fill' might do same thing (output content)?
                // Usually 'skip' meant "Skip review/edit", but here we reviewed.
                // If user clicks "Fill", they mean "Take this text and put it in chat".
                // Confirm -> "Take this text and continue flow" (which usually puts it in chat).
                // So they act similarly here, but intent differs.
                Logger.info('UserReview', 'User chose to Fill/Skip');
                context.output = result.content;
                context.metadata.skipToInjection = true;
                return { action: 'finish' };
            }

            if (result.action === 'reroll') {
                Logger.info('UserReview', '用户选择重抽 (无反馈)');
                // 清空旧数据以触发重生成
                context.input.feedback = '';
                return { action: 'jump', targetStep: 'BuildPrompt', reason: 'User reroll' };
            }

            if (result.action === 'reject') {
                Logger.info('UserReview', '用户选择打回重生成');
                context.input.feedback = result.feedback;
                context.input.previousOutput = contentToReview;
                return { action: 'jump', targetStep: 'BuildPrompt', reason: 'User rejected' };
            }

            if (result.action === 'cancel') {
                Logger.info('UserReview', 'User explicitly cancelled via Review UI');
                throw new Error('UserCancelled');
            }

            // Confirm
            context.cleanedContent = result.content;

            // 如果 Review 返回了新的 structured data (例如实体编辑结果)，更新 context
            if (result.data) {
                // V1.3: 处理编辑后的 query
                if (result.data.query !== undefined && context.extractedTags) {
                    context.extractedTags.query = result.data.query;
                    Logger.debug('UserReview', 'Query 已更新', { query: result.data.query });
                }

                // 如果是实体数据，更新 parsedData 和 output
                if (result.data.newEntities || result.data.updatedEntities) {
                    context.parsedData = result.data;
                    context.output = result.data;
                } else {
                    context.output = result.content;
                }
            } else {
                context.output = result.content;
            }

            Logger.info('UserReview', '用户确认修订');
            return { action: 'next' };

        } catch (e) {
            Logger.warn('UserReview', '用户取消操作');
            notificationService.info('已取消操作', '操作取消');
            throw new Error('UserCancelled');
        }
    }
}

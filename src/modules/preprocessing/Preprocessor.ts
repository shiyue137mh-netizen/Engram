/**
 * Preprocessor - V0.8 输入预处理器
 *
 * 核心功能：
 * 1. 拦截用户输入
 * 2. 调用 LLM 进行预处理
 * 3. 解析输出 (<output>, <query> 标签)
 * 4. 返回处理结果供注入
 */

import { SettingsManager } from '@/config/settings';
import { Logger, LogModule } from '@/core/logger';
import { notificationService } from '@/ui/services/NotificationService';
import type { PreprocessingConfig, PreprocessingResult } from './types';
import { DEFAULT_PREPROCESSING_CONFIG } from './types';





// Helper functions to get context info safely
// (Removed unused helpers)

class Preprocessor {
    private static instance: Preprocessor;
    private cancelRequested = false;

    private constructor() { }

    // ... (rest of class)



    static getInstance(): Preprocessor {
        if (!Preprocessor.instance) {
            Preprocessor.instance = new Preprocessor();
        }
        return Preprocessor.instance;
    }

    /**
     * 请求停止生成
     */
    private async requestStopGeneration(): Promise<void> {
        const { StopGeneration } = await import('@/modules/workflow/steps/execution/StopGeneration');
        await StopGeneration.abort();
    }

    /**
     * 执行预处理
     * @param userInput 用户原始输入
     * @returns 预处理结果
     */
    async process(userInput: string): Promise<PreprocessingResult> {
        const startTime = Date.now();
        const config = this.getConfig();

        // 只在启用时记录开始日志（避免未启用时也刷日志）
        if (!config.enabled) {
            return {
                success: true,
                output: null,
                query: null,
                rawOutput: '',
                processingTime: 0,
            };
        }

        Logger.info(LogModule.PREPROCESS, '开始预处理', { inputLength: userInput.length });

        // 重置取消标志
        this.cancelRequested = false;

        // 显示运行中通知（支持点击取消）
        const runningToast = notificationService.running('预处理中...', 'Engram', () => {
            this.cancelRequested = true;
            Logger.debug(LogModule.PREPROCESS, '用户请求取消');
            this.requestStopGeneration();
            notificationService.warning('正在取消预处理...', 'Engram');
        });

        try {
            // Lazy import
            const { WorkflowEngine } = await import('@/modules/workflow/core/WorkflowEngine');
            const { createPreprocessWorkflow } = await import('@/modules/workflow/definitions/PreprocessWorkflow');

            const context = await WorkflowEngine.run(createPreprocessWorkflow(), {
                trigger: 'auto',
                config: {
                    previewEnabled: config.preview,
                    templateId: config.templateId,
                    logType: 'query' // Log as 'query' type for ModelLogger
                },
                input: {
                    text: userInput
                }
            });

            // Handle Skip to Injection
            if (context.metadata.skipToInjection) {
                Logger.info(LogModule.PREPROCESS, '检测到跳过标记，执行 AI 消息注入');
                const contentToInject = context.output;
                if (typeof contentToInject === 'string') {
                    const { injectMessage } = await import('@/integrations/tavern/chat');
                    await injectMessage('char', contentToInject);
                    notificationService.success('已作为 AI 消息注入', 'Engram');
                } else {
                    Logger.warn(LogModule.PREPROCESS, '跳过注入失败：内容不是字符串');
                }

                // Return failed to prevent original flow from using this as user input replacement
                // Or clearer: Success=false but w/o error?
                // Depending on how hook handles it:
                // If we return success: true, ST might replace input box with empty string or something
                // We typically want ST to clear input box?
                // If we injected message, we probably want to consume the user input event completely.
                // Assuming Preprocessor.process is called by an event handler that looks at result.output.

                // For "Skip", we want ST to do NOTHING with the original user input (or clear it).
                // Returning success=true with empty output usually replaces user input with empty?
                // Let's assume we want to clear input.

                return {
                    success: true,
                    output: '', // Clear user input
                    query: null,
                    rawOutput: context.llmResponse?.content || '',
                    processingTime: Date.now() - startTime,
                };
            }

            // Construct Result (Normal Flow)
            const output = context.output; // From UserReview -> ExtractTags -> output tag
            const query = context.extractedTags?.query || null;
            const rawOutput = context.llmResponse?.content || '';

            const processingTime = Date.now() - startTime;
            Logger.success(LogModule.PREPROCESS, '预处理完成', {
                outputLength: output?.length || 0,
                processingTime,
            });

            // notificationService.success('预处理完成', 'Engram'); // Reduced noise

            return {
                success: true,
                output: output,
                query: query,
                rawOutput: rawOutput,
                processingTime,
            };

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : '未知错误';

            if (errorMsg === 'UserCancelled' || this.cancelRequested) {
                Logger.debug(LogModule.PREPROCESS, '预处理已取消');
                return {
                    success: false,
                    output: null,
                    query: null,
                    rawOutput: '',
                    processingTime: Date.now() - startTime,
                    error: '用户取消',
                };
            }

            Logger.error(LogModule.PREPROCESS, '预处理失败', { error: errorMsg });
            notificationService.error(`预处理失败: ${errorMsg}`, 'Engram');
            return {
                success: false,
                output: null,
                query: null,
                rawOutput: '',
                processingTime: Date.now() - startTime,
                error: errorMsg,
            };
        } finally {
            // 移除运行中通知
            notificationService.remove(runningToast);
        }
    }

    /**
     * 获取预处理配置
     */
    getConfig(): PreprocessingConfig {
        const config = SettingsManager.get('preprocessingConfig');
        return config || DEFAULT_PREPROCESSING_CONFIG;
    }

    /**
     * 保存预处理配置
     */
    saveConfig(config: PreprocessingConfig): void {
        Logger.debug(LogModule.PREPROCESS, '保存配置', config);
        SettingsManager.set('preprocessingConfig', config);
    }

    /**
     * 快速启用/禁用
     */
    toggle(): boolean {
        const config = this.getConfig();
        config.enabled = !config.enabled;
        this.saveConfig(config);
        Logger.info(LogModule.PREPROCESS, config.enabled ? '预处理已启用' : '预处理已禁用');
        return config.enabled;
    }
}

/** 单例导出 */
export const preprocessor = Preprocessor.getInstance();

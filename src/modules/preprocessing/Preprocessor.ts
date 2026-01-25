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

            // Construct Result
            const output = context.output; // From UserReview -> ExtractTags -> output tag
            const query = context.extractedTags?.query || null;
            const rawOutput = context.llmResponse?.content || '';

            const processingTime = Date.now() - startTime;
            Logger.success(LogModule.PREPROCESS, '预处理完成', {
                outputLength: output?.length || 0,
                processingTime,
            });

            notificationService.success('预处理完成', 'Engram');

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

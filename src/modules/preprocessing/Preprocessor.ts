/**
 * Preprocessor - V0.8 输入预处理器
 *
 * 核心功能：
 * 1. 拦截用户输入
 * 2. 调用 LLM 进行预处理
 * 3. 解析输出 (<output>, <query> 标签)
 * 4. 返回处理结果供注入
 */

import { llmAdapter } from '@/integrations/llm/Adapter';
import { regexProcessor } from '@/modules/memory/extractors/RegexProcessor';
import { SettingsManager } from '@/config/settings';
import { Logger, ModelLogger } from '@/core/logger';
import { notificationService } from '@/ui/services/NotificationService';
import { EventBus, TavernEventType } from '@/integrations/tavern/api';
import type { PromptCategory } from '@/config/types/prompt';
import type { PreprocessingConfig, PreprocessingResult } from './types';
import { DEFAULT_PREPROCESSING_CONFIG } from './types';
import { getCurrentCharacter, getCurrentModel } from '@/integrations/tavern/context';

/**
 * 使用酒馆原生 substituteParams 替换宏
 * @param text 包含宏的文本
 * @returns 替换后的文本
 */
function substituteParams(text: string): string {
    try {
        // @ts-ignore - SillyTavern 全局对象
        const context = window.SillyTavern?.getContext?.();
        if (context?.substituteParams) {
            return context.substituteParams(text);
        }
        Logger.warn('Preprocessor', 'substituteParams 不可用，返回原文');
        return text;
    } catch (e) {
        Logger.warn('Preprocessor', 'substituteParams 调用失败', e);
        return text;
    }
}

/**
 * 调用酒馆 stopGeneration API
 */
async function stopSTGeneration(): Promise<void> {
    try {
        // @ts-ignore - SillyTavern 全局对象
        const context = window.SillyTavern?.getContext?.();
        if (context?.stopGeneration) {
            context.stopGeneration();
            Logger.info('Preprocessor', '已调用酒馆 stopGeneration');
        }
    } catch (e) {
        Logger.warn('Preprocessor', '调用 stopGeneration 失败', e);
    }
}

// Helper functions to get context info safely
function getCharacterName(): string | undefined {
    try {
        const char = getCurrentCharacter();
        return char?.name;
    } catch (e) { }
    return undefined;
}

function getModelName(): string | undefined {
    try {
        return getCurrentModel();
    } catch (e) { }
    return undefined;
}

export class Preprocessor {
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
    private requestStopGeneration(): void {
        stopSTGeneration();
    }

    /**
     * 执行预处理
     * @param userInput 用户原始输入
     * @returns 预处理结果
     */
    async process(userInput: string): Promise<PreprocessingResult> {
        const startTime = Date.now();
        const config = this.getConfig();

        Logger.info('Preprocessor', '开始预处理', {
            enabled: config.enabled,
            templateId: config.templateId,
            inputLength: userInput.length
        });

        // 如果未启用，直接返回空结果
        if (!config.enabled) {
            Logger.debug('Preprocessor', '预处理未启用，跳过');
            return {
                success: true,
                output: null,
                query: null,
                rawOutput: '',
                processingTime: 0,
            };
        }

        // 重置取消标志
        this.cancelRequested = false;

        // 显示运行中通知（支持点击取消）
        const runningToast = notificationService.running('预处理中...', 'Engram', () => {
            this.cancelRequested = true;
            Logger.info('Preprocessor', '用户请求取消预处理');
            this.requestStopGeneration();
            notificationService.warning('正在取消预处理...', 'Engram');
        });

        try {
            // 1. 获取提示词模板 (templateId 现在是具体的 UUID，或者是兼容的 category 字符串)
            const template = SettingsManager.getPromptTemplateById(config.templateId);

            Logger.debug('Preprocessor', '查找模板', {
                templateId: config.templateId,
                found: !!template,
                templateName: template?.name
            });

            if (!template) {
                const errorMsg = `模板 ${config.templateId} 未找到或未启用。请在 API 配置中创建并启用该分类的模板。`;
                Logger.warn('Preprocessor', errorMsg);
                return {
                    success: false,
                    output: null,
                    query: null,
                    rawOutput: '',
                    processingTime: Date.now() - startTime,
                    error: errorMsg,
                };
            }

            // 检查是否被取消
            if (this.cancelRequested) {
                return {
                    success: false,
                    output: null,
                    query: null,
                    rawOutput: '',
                    processingTime: Date.now() - startTime,
                    error: '用户取消',
                };
            }

            // 构建提示词 - 使用酒馆原生宏替换
            // 先替换 {{input}} (我们自定义的)，再用酒馆的 substituteParams 替换其他宏
            let systemPrompt = template.systemPrompt.replace(/\{\{input\}\}/gi, userInput);
            let userPrompt = template.userPromptTemplate.replace(/\{\{input\}\}/gi, userInput);

            // 使用酒馆原生的宏替换（支持 {{user}}, {{char}}, {{worldInfoBefore}} 等）
            systemPrompt = substituteParams(systemPrompt);
            userPrompt = substituteParams(userPrompt);

            Logger.debug('Preprocessor', '构建提示词（宏已替换）', {
                systemPromptLength: systemPrompt.length,
                userPromptLength: userPrompt.length,
                userPromptPreview: userPrompt.substring(0, 100) + '...',
            });

            // 2. 调用 LLM - 记录模型日志
            const logId = ModelLogger.logSend({
                type: 'query',
                systemPrompt: systemPrompt,
                userPrompt: userPrompt,
                model: getModelName() || 'Unknown',
                character: getCharacterName() || 'System',
            });

            const response = await llmAdapter.generate({
                systemPrompt,
                userPrompt,
            });

            ModelLogger.logReceive(logId, {
                response: response.content,
                status: response.success ? 'success' : 'error',
                error: response.error,
                duration: Date.now() - startTime,
            });

            // 检查是否被取消
            if (this.cancelRequested) {
                Logger.info('Preprocessor', '预处理已被取消');
                return {
                    success: false,
                    output: null,
                    query: null,
                    rawOutput: '',
                    processingTime: Date.now() - startTime,
                    error: '用户取消',
                };
            }

            if (!response.success || !response.content) {
                const errorMsg = response.error || 'LLM 调用失败';
                Logger.error('Preprocessor', 'LLM 调用失败', { error: errorMsg });
                return {
                    success: false,
                    output: null,
                    query: null,
                    rawOutput: '',
                    processingTime: Date.now() - startTime,
                    error: errorMsg,
                };
            }

            // 3. 清理输出 (移除 <think>)
            const cleanedOutput = regexProcessor.process(response.content, 'output');

            // 4. 捕获标签内容
            const tags = regexProcessor.captureTags(cleanedOutput, ['output', 'query']);

            // 5. 预览与修订 (V0.8.6+)
            if (config.preview && tags.output) {
                Logger.info('Preprocessor', '请求用户预览修订');
                try {
                    // V0.9.2: 封装 LLM 调用逻辑为可复用函数
                    const callLLMAndGetOutput = async (): Promise<string> => {
                        const rerollLogId = ModelLogger.logSend({
                            type: 'query',
                            systemPrompt: systemPrompt,
                            userPrompt: userPrompt,
                            model: getModelName() || 'Unknown',
                            character: getCharacterName() || 'System',
                        });

                        const rerollResponse = await llmAdapter.generate({
                            systemPrompt,
                            userPrompt,
                        });

                        ModelLogger.logReceive(rerollLogId, {
                            response: rerollResponse.content,
                            status: rerollResponse.success ? 'success' : 'error',
                            error: rerollResponse.error,
                            duration: 0,
                        });

                        if (!rerollResponse.success || !rerollResponse.content) {
                            throw new Error(rerollResponse.error || 'LLM 调用失败');
                        }

                        const rerollCleaned = regexProcessor.process(rerollResponse.content, 'output');
                        const rerollTags = regexProcessor.captureTags(rerollCleaned, ['output', 'query']);
                        return rerollTags.output || rerollCleaned;
                    };

                    const reviewedContent = await new Promise<string | null>((resolve) => {
                        EventBus.emit(TavernEventType.ENGRAM_REQUEST_REVISION, {
                            title: '预处理结果预览',
                            content: tags.output,
                            description: '请确认即将注入到用户输入的内容。您可以直接在此修改，确认后将替换原文。',
                            onConfirm: (newContent: string) => resolve(newContent),
                            onCancel: () => resolve(null),
                            // V0.9.2: 重 Roll 回调
                            onReroll: callLLMAndGetOutput,
                        });
                    });

                    if (reviewedContent !== null) {
                        // 用户确认修改
                        tags.output = reviewedContent;
                        Logger.info('Preprocessor', '用户已确认修订');
                    } else {
                        // 用户取消
                        Logger.info('Preprocessor', '用户取消了修订，视为放弃预处理结果');
                        return {
                            success: false,
                            output: null,
                            query: null,
                            rawOutput: '',
                            processingTime: Date.now() - startTime,
                            error: '用户取消应用预处理结果',
                        };
                    }
                } catch (e) {
                    Logger.warn('Preprocessor', '预览修订过程出错，将直接使用原结果', e);
                }
            }

            const processingTime = Date.now() - startTime;
            Logger.info('Preprocessor', '预处理完成', {
                hasOutput: !!tags.output,
                hasQuery: !!tags.query,
                outputLength: tags.output?.length || 0,
                processingTime,
            });

            notificationService.success('预处理完成', 'Engram');

            return {
                success: true,
                output: tags.output,
                query: tags.query,
                rawOutput: cleanedOutput,
                processingTime,
            };

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : '未知错误';
            Logger.error('Preprocessor', '预处理失败', { error: errorMsg, stack: (e as Error).stack });
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
        Logger.debug('Preprocessor', '保存配置', config);
        SettingsManager.set('preprocessingConfig', config);
    }

    /**
     * 快速启用/禁用
     */
    toggle(): boolean {
        const config = this.getConfig();
        config.enabled = !config.enabled;
        this.saveConfig(config);
        Logger.info('Preprocessor', `预处理已${config.enabled ? '启用' : '禁用'}`);
        return config.enabled;
    }
}

/** 单例导出 */
export const preprocessor = Preprocessor.getInstance();

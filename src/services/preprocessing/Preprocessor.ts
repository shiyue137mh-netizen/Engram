/**
 * Preprocessor - V0.8 输入预处理器
 *
 * 核心功能：
 * 1. 拦截用户输入
 * 2. 调用 LLM 进行预处理
 * 3. 解析输出 (<output>, <query> 标签)
 * 4. 返回处理结果供注入
 */

import { llmAdapter } from '@/services/api/LLMAdapter';
import { regexProcessor } from '@/services/pipeline/RegexProcessor';
import { SettingsManager } from '@/services/settings/Persistence';
import { Logger, ModelLogger } from '@/lib/logger';
import type { PromptCategory } from '@/services/api/types';
import type { PreprocessingConfig, PreprocessingResult } from './types';
import { DEFAULT_PREPROCESSING_CONFIG } from './types';

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

export class Preprocessor {
    private static instance: Preprocessor;

    private constructor() { }

    static getInstance(): Preprocessor {
        if (!Preprocessor.instance) {
            Preprocessor.instance = new Preprocessor();
        }
        return Preprocessor.instance;
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

        try {
            // 1. 获取提示词模板 (templateId 映射到 PromptCategory)
            const category = config.templateId as PromptCategory;
            const template = SettingsManager.getEnabledPromptTemplate(category);

            Logger.debug('Preprocessor', '查找模板', {
                category,
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
                systemPrompt: systemPrompt.substring(0, 200) + '...',
                userPrompt: userPrompt,
            });

            const response = await llmAdapter.generate({
                systemPrompt,
                userPrompt,
            });

            ModelLogger.logReceive(logId, {
                response: response.content?.substring(0, 200),
                status: response.success ? 'success' : 'error',
                error: response.error,
                duration: Date.now() - startTime,
            });

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

            const processingTime = Date.now() - startTime;
            Logger.info('Preprocessor', '预处理完成', {
                hasOutput: !!tags.output,
                hasQuery: !!tags.query,
                outputLength: tags.output?.length || 0,
                processingTime,
            });

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
            return {
                success: false,
                output: null,
                query: null,
                rawOutput: '',
                processingTime: Date.now() - startTime,
                error: errorMsg,
            };
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

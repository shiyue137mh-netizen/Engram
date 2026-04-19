/**
 * LLMAdapter - LLM 调用适配器
 *
 * 封装对 SillyTavern/TavernHelper LLM API 的调用
 *
 * 通用服务：可被 Summarizer、RAG、Graph 等模块复用
 *
 * V0.9.1 改进：
 * - 添加请求队列和执行锁，防止并发请求导致的配置冲突
 * - 支持 tavern_profile 临时切换模式
 */

import { SettingsManager } from "@/config/settings";
import type { LLMPreset } from "@/config/types/llm";
import { Logger } from "@/core/logger";

const MODULE = 'LLMAdapter';

/** LLM 生成请求 */
interface LLMRequest {
    /** 系统提示词 */
    systemPrompt: string;
    /** 用户提示词 */
    userPrompt: string;
    /** 预设 ID */
    presetId?: string;
    /** 是否为内部请求 (不触发预处理/脚本) */
    internal?: boolean;
}

/** LLM 生成响应 */
interface LLMResponse {
    /** 生成内容 */
    content: string;
    /** 是否成功 */
    success: boolean;
    /** 错误信息 */
    error?: string;
    /** Token 使用量 */
    tokenUsage?: {
        prompt: number;
        completion: number;
        total: number;
    };
}

/** 队列中的请求项 */
interface QueuedRequest {
    request: LLMRequest;
    resolve: (value: LLMResponse) => void;
    reject: (reason: unknown) => void;
}

/**
 * 获取 TavernHelper API
 */
function getTavernHelper(): {
    generate?: (options: unknown) => Promise<string>;
    generateRaw?: (options: unknown) => Promise<string>;
} | null {
    try {
        // @ts-expect-error - TavernHelper 全局对象
        return window.TavernHelper || null;
    } catch {
        return null;
    }
}



/**
 * LLMAdapter 类
 * 封装 LLM 调用，支持队列和锁机制
 */
class LLMAdapter {
    /** 执行锁 */
    private isExecuting = false;

    /** 请求队列 */
    private requestQueue: QueuedRequest[] = [];

    /**
     * 调用 LLM 生成 (队列模式)
     * @param request 请求参数
     */
    async generate(request: LLMRequest): Promise<LLMResponse> {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({ reject, request, resolve });
            this.processQueue();
        });
    }

    /**
     * 处理请求队列
     */
    private async processQueue(): Promise<void> {
        if (this.isExecuting || this.requestQueue.length === 0) {
            return;
        }

        this.isExecuting = true;
        const { request, resolve, reject } = this.requestQueue.shift()!;

        try {
            const result = await this.executeRequest(request);
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.isExecuting = false;
            // 递归处理下一个请求
            this.processQueue();
        }
    }

    /**
     * 执行单个请求
     */
    private async executeRequest(request: LLMRequest): Promise<LLMResponse> {
        const helper = getTavernHelper();

        if (!helper?.generateRaw && !helper?.generate) {
            return {
                content: '',
                error: 'TavernHelper 不可用',
                success: false,
            };
        }

        try {
            // 获取预设配置
            const settings = SettingsManager.getSettings();
            let preset: LLMPreset | undefined;

            if (request.presetId) {
                preset = settings.apiSettings?.llmPresets?.find(p => p.id === request.presetId);
            }

            if (!preset && settings.apiSettings?.selectedPresetId) {
                preset = settings.apiSettings?.llmPresets?.find(p => p.id === settings.apiSettings?.selectedPresetId);
            }

            // 统一提取预设中的参数配置
            const customApiConfig = preset ? this.extractPresetParameters(preset) : undefined;

            return await this.callTavernHelper(request, helper, customApiConfig, preset);

        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            Logger.error(MODULE, '调用失败', error);

            return {
                content: '',
                error: errorMsg,
                success: false,
            };
        }
    }



    // =========================================================================
    // 执行路径：custom (自定义 API)
    // =========================================================================

    // =========================================================================
    // 助手方法：提取预设参数
    // =========================================================================

    private extractPresetParameters(preset: LLMPreset): Record<string, any> {
        const config: Record<string, any> = {
            // 采样参数
            frequency_penalty: preset.parameters?.frequencyPenalty,
            max_context: preset.parameters?.maxContext,
            max_tokens: preset.parameters?.maxTokens,
            presence_penalty: preset.parameters?.presencePenalty,
            temperature: preset.parameters?.temperature,
            top_k: preset.parameters?.topK,
            top_p: preset.parameters?.topP,
        };

        // 移除 undefined 项，避免覆盖酒馆默认值
        Object.keys(config).forEach(key => config[key] === undefined && delete config[key]);

        // 如果是 custom，额外添加连接信息
        if (preset.source === 'custom' && preset.custom) {
            config.apiurl = preset.custom.apiUrl;
            config.key = preset.custom.apiKey;
            config.model = preset.custom.model;
            config.source = 'openai';
            config.stream = preset.stream ?? false;
        } else if (preset.modelOverride) {
            // 如果是非 custom 预设但指定了模型名，也强制覆盖
            config.model = preset.modelOverride;
        }

        return config;
    }

    // =========================================================================
    // 核心调用逻辑
    // =========================================================================

    private async callTavernHelper(
        request: LLMRequest,
        helper: NonNullable<ReturnType<typeof getTavernHelper>>,
        customApiConfig?: Record<string, any>,
        currentPreset?: LLMPreset
    ): Promise<LLMResponse> {
        // =========================================================================
        // Prompt Pre-processing (V1.0 Fix)
        // =========================================================================
        const finalSystemPrompt = request.systemPrompt || '';
        let finalUserPrompt = request.userPrompt || '';

        // Engram Pipeline (RegexProcessor)
        // Fix P1: 移除导致循环依赖的 @/modules/workflow/steps 导入，改为直接导入
        const { regexProcessor } = await import('@/modules/workflow/steps/processing/RegexProcessor');
        finalUserPrompt = regexProcessor.process(finalUserPrompt, 'input');

        // =========================================================================
        // 调用 TavernHelper
        // =========================================================================

        // V1.5 获取此请求所用的 Preset (由 executeRequest 传递进来，或者回退到默认)
        if (!currentPreset) {
            const settings = SettingsManager.getSettings();
            currentPreset = request.presetId
                ? settings.apiSettings?.llmPresets?.find(p => p.id === request.presetId)
                : settings.apiSettings?.llmPresets?.find(p => p.id === settings.apiSettings?.selectedPresetId);
        }

        const generationOptions = {
            should_stream: currentPreset?.stream ?? false, // 释放底层硬编码
            should_silence: true, // V0.9.1: 后台请求静默，不绑定停止按钮
            _engram_internal: request.internal,
        };

        let content: string;

        if (helper.generateRaw) {
            const prompts: any[] = [];
            
            // 严格遵循：System -> User 顺序
            if (finalSystemPrompt) {
                prompts.push({ content: finalSystemPrompt, role: 'system' });
            }
            
            // 直接将用户内容作为 user 角色推入，不再使用 'user_input' 占位符
            // 这样酒馆就不会在末尾自动追加多余的内容
            prompts.push({ content: finalUserPrompt, role: 'user' });

            content = await helper.generateRaw({
                custom_api: customApiConfig,
                ordered_prompts: prompts,
                ...generationOptions,
            });
        } else if (helper.generate) {
            content = await helper.generate({
                custom_api: customApiConfig,
                max_chat_history: 0,
                system_prompt: finalSystemPrompt,
                user_input: finalUserPrompt,
                ...generationOptions,
            });
        } else {
            throw new Error('无可用的生成 API');
        }

        // --- 全局数据遥测 (Telemetry) ---
        SettingsManager.incrementStatistic('totalLlmCalls', 1);
        const estimatedPromptTokens = this.estimateTokens(finalSystemPrompt + finalUserPrompt);
        const estimatedCompletionTokens = this.estimateTokens(content || '');
        SettingsManager.incrementStatistic('totalTokens', estimatedPromptTokens + estimatedCompletionTokens);

        return {
            content: content || '',
            success: true,
            tokenUsage: {
                completion: estimatedCompletionTokens,
                prompt: estimatedPromptTokens,
                total: estimatedPromptTokens + estimatedCompletionTokens
            }
        };
    }

    /**
     * 检查 LLM API 是否可用
     */
    isAvailable(): boolean {
        const helper = getTavernHelper();
        return Boolean(helper?.generate || helper?.generateRaw);
    }

    /**
     * 估算文本 Token 数（简单估算）
     * @param text 文本
     */
    estimateTokens(text: string): number {
        return Math.ceil(text.length / 3);
    }

    /**
     * 获取队列长度 (调试用)
     */
    getQueueLength(): number {
        return this.requestQueue.length;
    }

    /**
     * 是否正在执行 (调试用)
     */
    isBusy(): boolean {
        return this.isExecuting;
    }
}

/** 默认实例 */
export const llmAdapter = new LLMAdapter();


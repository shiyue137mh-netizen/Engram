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
            this.requestQueue.push({ request, resolve, reject });
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
        } catch (e) {
            reject(e);
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
                success: false,
                content: '',
                error: 'TavernHelper 不可用',
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

            // 根据预设类型选择执行路径
            if (preset?.source === 'custom' && preset.custom) {
                return await this.executeWithCustomApi(request, preset, helper);
            } else {
                return await this.executeWithTavern(request, helper, preset);
            }

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            Logger.error(MODULE, '调用失败', e);

            return {
                success: false,
                content: '',
                error: errorMsg,
            };
        }
    }



    // =========================================================================
    // 执行路径：custom (自定义 API)
    // =========================================================================

    private async executeWithCustomApi(
        request: LLMRequest,
        preset: LLMPreset,
        helper: NonNullable<ReturnType<typeof getTavernHelper>>
    ): Promise<LLMResponse> {
        Logger.info(MODULE, `使用自定义 API: ${preset.name}`);

        // 构建 custom_api 配置
        const customApiConfig: Record<string, any> = {
            // 连接配置
            apiurl: preset.custom!.apiUrl,
            key: preset.custom!.apiKey,
            model: preset.custom!.model,
            source: 'openai', // 自定义 API 走 OpenAI 兼容接口
            stream: preset.stream ?? false, // V1.5 透传给 Custom OpenAi 端点强制验证

            // 采样参数
            temperature: preset.parameters?.temperature,
            max_tokens: preset.parameters?.maxTokens,
            top_p: preset.parameters?.topP,
            top_k: preset.parameters?.topK ?? 60, // V1.5
            frequency_penalty: preset.parameters?.frequencyPenalty,
            presence_penalty: preset.parameters?.presencePenalty,
            max_context: preset.parameters?.maxContext,
        };

        return await this.callTavernHelper(request, helper, customApiConfig);
    }

    // =========================================================================
    // 执行路径：tavern (使用酒馆当前配置)
    // =========================================================================

    private async executeWithTavern(
        request: LLMRequest,
        helper: NonNullable<ReturnType<typeof getTavernHelper>>,
        preset?: LLMPreset
    ): Promise<LLMResponse> {
        // 直接使用酒馆当前配置，不做覆盖
        return await this.callTavernHelper(request, helper);
    }

    // =========================================================================
    // 核心调用逻辑
    // =========================================================================

    private async callTavernHelper(
        request: LLMRequest,
        helper: NonNullable<ReturnType<typeof getTavernHelper>>,
        customApiConfig?: Record<string, any>
    ): Promise<LLMResponse> {
        // =========================================================================
        // Context Aggregation Gateway (V0.8 Upgrade)
        // =========================================================================
        const combinedPrompt = request.systemPrompt ?
            `${request.systemPrompt}\n\n${request.userPrompt}` :
            request.userPrompt;

        const generateData = {
            prompt: combinedPrompt,
            body: {
                messages: [
                    { role: 'system', content: request.systemPrompt },
                    { role: 'user', content: request.userPrompt }
                ]
            },
        };

        // 触发 Native Pipeline Hook
        const { EventBus, TavernEventType } = await import('@/integrations/tavern/api');
        await EventBus.emit(TavernEventType.GENERATION_AFTER_COMMANDS, 'engram', {}, false);
        await EventBus.emit(TavernEventType.GENERATE_AFTER_DATA, generateData);

        // 提取处理后的上下文
        const processedPrompt = typeof generateData.prompt === 'string' ?
            generateData.prompt : combinedPrompt;

        let finalSystemPrompt = request.systemPrompt;
        let finalUserPrompt = request.userPrompt;

        if (processedPrompt !== combinedPrompt) {
            finalSystemPrompt = '';
            finalUserPrompt = processedPrompt;
        }

        // Engram Pipeline (RegexProcessor)
        const { regexProcessor } = await import('@/modules/workflow/steps');
        finalUserPrompt = regexProcessor.process(finalUserPrompt, 'input');

        // =========================================================================
        // 调用 TavernHelper
        // =========================================================================

        // V1.5 获取此请求所用的 Preset (如果是内部预设，需要再查一次或从上层传下来)
        // 这里基于 SettingsManager 直接根据 context 取一下当前在跑哪个 preset
        const settings = SettingsManager.getSettings();
        let currentPreset = request.presetId
            ? settings.apiSettings?.llmPresets?.find(p => p.id === request.presetId)
            : settings.apiSettings?.llmPresets?.find(p => p.id === settings.apiSettings?.selectedPresetId);

        const generationOptions = {
            should_stream: currentPreset?.stream ?? false, // 释放底层硬编码
            should_silence: true, // V0.9.1: 后台请求静默，不绑定停止按钮
            _engram_internal: request.internal,
        };

        let content: string;

        if (helper.generateRaw) {
            const prompts: any[] = [];
            if (finalSystemPrompt) {
                prompts.push({ role: 'system', content: finalSystemPrompt });
            }
            // 在指定位置插入内置的 user_input
            prompts.push('user_input');

            content = await helper.generateRaw({
                user_input: finalUserPrompt,
                ordered_prompts: prompts,
                custom_api: customApiConfig,
                ...generationOptions,
            });
        } else if (helper.generate) {
            content = await helper.generate({
                user_input: finalUserPrompt,
                system_prompt: finalSystemPrompt,
                max_chat_history: 0,
                custom_api: customApiConfig,
                ...generationOptions,
            });
        } else {
            throw new Error('无可用的生成 API');
        }

        return {
            success: true,
            content: content || '',
        };
    }

    /**
     * 检查 LLM API 是否可用
     */
    isAvailable(): boolean {
        const helper = getTavernHelper();
        return !!(helper?.generate || helper?.generateRaw);
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


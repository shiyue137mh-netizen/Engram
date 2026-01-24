/**
 * LLMAdapter - LLM 调用适配器
 *
 * 封装对 SillyTavern/TavernHelper LLM API 的调用
 *
 * 通用服务：可被 Summarizer、RAG、Graph 等模块复用
 */

import { SettingsManager } from "@/config/settings";
import type { PromptCategory } from '@/config/types/prompt';
import type { LLMPreset } from "@/config/types/llm";
import { Logger } from "@/core/logger";

/** LLM 生成请求 */
export interface LLMRequest {
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
export interface LLMResponse {
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
 * 获取酒馆 Connection Profiles
 */
function getTavernProfiles(): any[] {
    try {
        // @ts-ignore - 访问酒馆的 extension_settings
        const context = window.SillyTavern?.getContext?.();
        return context?.extensionSettings?.connectionManager?.profiles || [];
    } catch {
        return [];
    }
}

/**
 * LLMAdapter 类
 * 封装 LLM 调用
 */
export class LLMAdapter {
    /**
     * 调用 LLM 生成
     * @param request 请求参数
     */
    async generate(request: LLMRequest): Promise<LLMResponse> {
        const helper = getTavernHelper();

        if (!helper?.generateRaw && !helper?.generate) {
            return {
                success: false,
                content: '',
                error: 'TavernHelper 不可用',
            };
        }

        try {
            let content: string;

            // [Step 0] 获取预设配置 (Fix for API Presets issue)
            const settings = SettingsManager.getSettings();
            let preset: LLMPreset | undefined;

            if (request.presetId) {
                // 1. 尝试使用请求指定的预设
                preset = settings.apiSettings?.llmPresets?.find(p => p.id === request.presetId);
            }

            if (!preset && settings.apiSettings?.selectedPresetId) {
                // 2. 尝试使用全局选中的预设
                preset = settings.apiSettings?.llmPresets?.find(p => p.id === settings.apiSettings?.selectedPresetId);
            }

            // 如果找到了预设，且预设不是默认的 'tavern' 源，我们需要准备 Custom API 配置
            // 根据 SillyTavern 架构，必须通过 custom_api 对象传递 overrides
            let customApiConfig: Record<string, any> | undefined;

            if (preset && preset.source !== 'tavern') {
                customApiConfig = {};
                Logger.info('LLMAdapter', `使用预设: ${preset.name} (${preset.source})`);

                // 1. 映射采样参数 (Common Parameters)
                if (preset.parameters) {
                    customApiConfig = {
                        ...customApiConfig,
                        // 映射标准参数到 ST API 字段
                        temperature: preset.parameters.temperature,
                        max_tokens: preset.parameters.maxTokens, // ST API 通常使用 max_tokens
                        top_p: preset.parameters.topP,
                        frequency_penalty: preset.parameters.frequencyPenalty,
                        presence_penalty: preset.parameters.presencePenalty,

                        // 某些后端可能需要 rep_pen 作为 frequency_penalty 的别名
                        // rep_pen: preset.parameters.frequencyPenalty,
                    };
                }

                // 2. 根据源类型映射连接配置
                if (preset.source === 'custom' && preset.custom) {
                    // [Custom Source]
                    customApiConfig.apiurl = preset.custom.apiUrl;
                    customApiConfig.key = preset.custom.apiKey;
                    customApiConfig.model = preset.custom.model;

                    // 默认为 openai，除非指定
                    customApiConfig.source = preset.custom.apiSource || 'openai';

                } else if (preset.source === 'tavern_profile' && preset.tavernProfileId) {
                    // [Tavern Profile Source]
                    const profiles = getTavernProfiles();
                    const profile = profiles.find(p => p.id === preset.tavernProfileId);

                    if (profile) {
                        Logger.info('LLMAdapter', `找到酒馆 Profile: ${profile.name}`);

                        // 映射 Profile 字段到 custom_api
                        // 根据调研文档，Tavern Profile 字段可能包括 api, api-url, model, etc.

                        // 必填字段映射
                        customApiConfig.model = profile.model;

                        // 根据 API 类型推断 source
                        // profile.api 通常是 'openai', 'anthropic' 等
                        customApiConfig.source = profile.api;

                        // 尝试提取 URL (不同版本字段可能不同)
                        // 常见：api-url, request_url, openai_url
                        if (profile['api-url']) customApiConfig.apiurl = profile['api-url'];
                        else if (profile.request_url) customApiConfig.apiurl = profile.request_url;
                        else if (profile.openai_url) customApiConfig.apiurl = profile.openai_url;

                        // 尝试提取 Key
                        // 常见：key, request_apikey, openai_key, secret-id (如果是 secret-id 需要 ST 内部解析，这里尽量找直接的 key)
                        // 注意：如果 Key 存储在 Secret 中，Engram 可能无法直接获取明文。
                        const potentialKeyFields = ['key', 'request_apikey', 'openai_key', 'api_key', 'auth_token', 'password'];
                        for (const field of potentialKeyFields) {
                            if (profile[field]) {
                                customApiConfig.key = profile[field];
                                break;
                            }
                        }

                    } else {
                        Logger.warn('LLMAdapter', `未找到 ID 为 ${preset.tavernProfileId} 的酒馆配置，将回退到默认设置`);
                        customApiConfig = undefined; // 回退
                    }
                }
            }

            // =========================================================================
            // Context Aggregation Gateway (V0.8 Upgrade)
            // =========================================================================
            // 目标：
            // 1. 兼容性: 让 ST-Prompt-Template (EJS) 和原生 Regex 生效
            // 2. 双重管道: Native Pipeline -> Engram Pipeline

            // [Step 1] 构建基础上下文 (Simulation)
            // 即使是单次生成，我们也模拟为一次标准的 User 消息交互，以便触发扩展钩子
            const combinedPrompt = request.systemPrompt ?
                `${request.systemPrompt}\n\n${request.userPrompt}` :
                request.userPrompt;

            // 模拟酒馆标准生成数据结构
            const generateData = {
                prompt: combinedPrompt, // 核心字段：大部分扩展修改此字段
                body: {
                    messages: [
                        { role: 'system', content: request.systemPrompt },
                        { role: 'user', content: request.userPrompt }
                    ]
                },
                // 尽可能提供更多上下文信息以满足某些挑剔的扩展
                // is_engram: true, // 标记请求来源 (可选) - 暂时移除，避免污染
            };

            // [Step 2] 触发 Native Pipeline Hook (兼容 ST-Prompt-Template)
            // 这将激活 EJS 渲染、宏替换和（可能的）原生 Regex
            const { EventBus, TavernEventType } = await import('@/integrations/tavern/api');

            // 2.1 模拟 GENERATION_AFTER_COMMANDS (ST-Prompt-Template 初始化需要)
            // type='engram', options={}, dryRun=false
            await EventBus.emit(TavernEventType.GENERATION_AFTER_COMMANDS, 'engram', {}, false);

            // 2.2 触发 GENERATION_AFTER_DATA
            await EventBus.emit(TavernEventType.GENERATE_AFTER_DATA, generateData);

            // [Step 3] 提取处理后的上下文
            // ST-Prompt-Template 通常会修改 generateData.prompt
            const processedPrompt = typeof generateData.prompt === 'string' ?
                generateData.prompt : combinedPrompt;

            // 简单的回填策略：
            // 如果 prompt 被修改了，我们将修改后的内容作为 User Trigger 发送
            // (这是最安全的做法，因为可以将 system prompt 保持独立)
            // 注意：如果 processedPrompt 包含了 system prompt (因为我们在 step 1 合并了)，
            // 那么在发送给 API 时应避免重复发送 system prompt。

            let finalSystemPrompt = request.systemPrompt;
            let finalUserPrompt = request.userPrompt;

            if (processedPrompt !== combinedPrompt) {
                // 如果发生了变化（说明有 EJS/Regex 生效）
                // 各种扩展对 prompt 的修改方式不同，简单起见，我们假设
                // 扩展处理后的 prompt 包含了所有必要信息。
                // 策略：清空 System Prompt，将处理后的全文作为 User Prompt 发送 (Raw Mode)
                finalSystemPrompt = '';
                finalUserPrompt = processedPrompt;
            }

            // [Step 4] 执行 Engram Pipeline (RegexProcessor)
            // 这是第二道清洗，用于移除 Engram 特定的标记（如 <think> 如果还没被处理）
            // 或者处理原生清洗后残留的问题
            const { regexProcessor } = await import('@/modules/workflow/steps');
            finalUserPrompt = regexProcessor.process(finalUserPrompt, 'input');

            // =========================================================================
            // End of Gateway
            // =========================================================================

            // [Fix] 显式禁用流式，否则可能继承全局设置
            const generationOptions = {
                should_stream: false, // 核心修正：后台任务不需要流式
                _engram_internal: request.internal, // 内部请求标记
            };

            if (helper.generateRaw) {
                // 使用 generateRaw 进行完全自定义
                const prompts = [];
                if (finalSystemPrompt) {
                    prompts.push({ role: 'system', content: finalSystemPrompt });
                }
                prompts.push({ role: 'user', content: finalUserPrompt });

                content = await helper.generateRaw({
                    ordered_prompts: prompts,
                    custom_api: customApiConfig, // V0.8.6 Fix
                    ...generationOptions,         // [Fix] Apply should_stream: false
                });
            } else if (helper.generate) {
                // fallback: 使用 generate
                content = await helper.generate({
                    user_input: finalUserPrompt,
                    system_prompt: finalSystemPrompt,
                    max_chat_history: 0,
                    custom_api: customApiConfig, // V0.8.6 Fix
                    ...generationOptions,         // [Fix] Apply should_stream: false
                });
            } else {
                throw new Error('无可用的生成 API');
            }

            return {
                success: true,
                content: content || '',
            };
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            console.error('[Engram] LLMAdapter 调用失败:', e);

            return {
                success: false,
                content: '',
                error: errorMsg,
            };
        }
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
        // 简单估算：中文约 2 字符/token，英文约 4 字符/token
        // 这里取平均值 3
        return Math.ceil(text.length / 3);
    }
}

/** 默认实例 */
export const llmAdapter = new LLMAdapter();

export default LLMAdapter;

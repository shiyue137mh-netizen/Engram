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
 * 获取当前 Profile ID
 */
function getCurrentProfileId(): string | null {
    try {
        // @ts-ignore
        const context = window.SillyTavern?.getContext?.();
        return context?.extensionSettings?.connectionManager?.selectedProfile || null;
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

    /** 切换前的原始 Profile ID */
    private originalProfileId: string | null = null;

    /** 防抖延迟 (ms) */
    private static readonly PROFILE_SWITCH_DELAY = 150;

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
            if (preset?.source === 'tavern_profile' && preset.tavernProfileId) {
                return await this.executeWithProfileSwitch(request, preset, helper);
            } else if (preset?.source === 'custom' && preset.custom) {
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
    // 执行路径：tavern_profile (临时切换)
    // =========================================================================

    private async executeWithProfileSwitch(
        request: LLMRequest,
        preset: LLMPreset,
        helper: NonNullable<ReturnType<typeof getTavernHelper>>
    ): Promise<LLMResponse> {
        // 检查 Profile 是否存在
        const profiles = getTavernProfiles();
        const targetProfile = profiles.find(p => p.id === preset.tavernProfileId);

        if (!targetProfile) {
            Logger.warn(MODULE, `未找到 Profile: ${preset.tavernProfileId}，回退到默认`);
            return await this.executeWithTavern(request, helper, preset);
        }

        // 记录当前 Profile
        this.originalProfileId = getCurrentProfileId();
        Logger.info(MODULE, `临时切换 Profile: ${this.originalProfileId} -> ${preset.tavernProfileId}`);

        try {
            // 切换到目标 Profile
            await this.switchProfile(preset.tavernProfileId!);
            await this.waitForProfileReady();

            // 使用酒馆当前设置执行 (因为已经切换了)
            return await this.executeWithTavern(request, helper, preset);

        } finally {
            // 切回原 Profile
            if (this.originalProfileId && this.originalProfileId !== preset.tavernProfileId) {
                Logger.info(MODULE, `切回原 Profile: ${this.originalProfileId}`);
                await this.switchProfile(this.originalProfileId);
                await this.waitForProfileReady();
            }
            this.originalProfileId = null;
        }
    }

    /**
     * 切换 Profile
     */
    private async switchProfile(profileId: string): Promise<void> {
        try {
            // @ts-ignore - 从酒馆全局获取 SlashCommandParser
            const SlashCommandParser = window.SillyTavern?.getContext?.()?.SlashCommandParser;

            // 使用酒馆的 /profile 命令切换
            if (SlashCommandParser?.commands?.['profile']?.callback) {
                await SlashCommandParser.commands['profile'].callback({ _scope: null }, profileId);
            } else {
                // 备用方案：直接设置
                // @ts-ignore
                const context = window.SillyTavern?.getContext?.();
                if (context?.extensionSettings?.connectionManager) {
                    context.extensionSettings.connectionManager.selectedProfile = profileId;
                }
            }
        } catch (e) {
            Logger.error(MODULE, `切换 Profile 失败: ${profileId}`, e);
            throw e;
        }
    }


    /**
     * 等待 Profile 切换生效 (防抖)
     */
    private async waitForProfileReady(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, LLMAdapter.PROFILE_SWITCH_DELAY));
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

            // 采样参数
            temperature: preset.parameters?.temperature,
            max_tokens: preset.parameters?.maxTokens,
            top_p: preset.parameters?.topP,
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
        let customApiConfig: Record<string, any> | undefined;

        if (preset && (preset.modelOverride || preset.parameters?.maxContext)) {
            customApiConfig = {};
            if (preset.modelOverride) {
                Logger.info(MODULE, `Tavern 模式，局部覆盖模型名: ${preset.modelOverride}`);
                customApiConfig.model = preset.modelOverride;
            }
            if (preset.parameters?.maxContext) {
                customApiConfig.max_context = preset.parameters.maxContext;
            }
        }

        return await this.callTavernHelper(request, helper, customApiConfig);
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
        const generationOptions = {
            should_stream: false,
            should_silence: true, // V0.9.1: 后台请求静默，不绑定停止按钮
            _engram_internal: request.internal,
        };

        let content: string;

        if (helper.generateRaw) {
            const prompts = [];
            if (finalSystemPrompt) {
                prompts.push({ role: 'system', content: finalSystemPrompt });
            }
            prompts.push({ role: 'user', content: finalUserPrompt });

            content = await helper.generateRaw({
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


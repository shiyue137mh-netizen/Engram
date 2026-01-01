/**
 * LLMAdapter - LLM 调用适配器
 * 
 * 封装对 SillyTavern/TavernHelper LLM API 的调用
 */

import type { LLMRequest, LLMResponse } from './types';

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

            if (helper.generateRaw) {
                // 使用 generateRaw 进行完全自定义
                content = await helper.generateRaw({
                    ordered_prompts: [
                        { role: 'system', content: request.systemPrompt },
                        { role: 'user', content: request.userPrompt },
                    ],
                    // 如果指定了预设 ID，可以在这里配置
                    // custom_api: request.presetId ? await this.getPresetConfig(request.presetId) : undefined,
                });
            } else if (helper.generate) {
                // fallback: 使用 generate
                content = await helper.generate({
                    user_input: request.userPrompt,
                    system_prompt: request.systemPrompt,
                    should_stream: false,
                    max_chat_history: 0,
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

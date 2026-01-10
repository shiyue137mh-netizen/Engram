/**
 * Injector Service V0.7.1
 *
 * 使用 GENERATE_BEFORE_COMBINE_PROMPTS 事件进行 RAG 注入
 * V0.7.1: 简化逻辑，召回部分暂时占位
 */

import { EventBus, TavernEventType } from '@/tavern/api';
import { getCurrentChatId } from '@/tavern/context';
import { MacroService } from '@/tavern/MacroService';
import { Logger } from '@/lib/logger';

/**
 * GENERATE_BEFORE_COMBINE_PROMPTS 事件数据类型
 */
interface GenerateBeforeCombineData {
    api: string;
    combinedPrompt: string | null;
    description: string;
    personality: string;
    persona: string;
    scenario: string;
    char: string;
    user: string;
    worldInfoBefore: string;
    worldInfoAfter: string;
    mesSendString: string;
    finalMesSend: Array<{ message: string; extensionPrompts: string[] }>;
    // ... 其他字段
}

export class Injector {
    private isInitialized = false;

    /**
     * Initialize the Injector
     */
    public init() {
        if (this.isInitialized) return;

        // V0.7.1: 使用 GENERATE_BEFORE_COMBINE_PROMPTS 进行 RAG 注入
        // 这个事件是 await 的，确保我们的异步操作完成后再继续生成
        EventBus.on(
            TavernEventType.GENERATE_BEFORE_COMBINE_PROMPTS,
            (data: unknown) => this.handleBeforeCombinePrompts(data as GenerateBeforeCombineData)
        );

        // 聊天切换时刷新宏缓存
        EventBus.on(TavernEventType.CHAT_CHANGED, this.handleChatChanged.bind(this));

        this.isInitialized = true;
        console.log('[Injector] V0.7.1 Initialized with GENERATE_BEFORE_COMBINE_PROMPTS hook.');
    }

    /**
     * V0.7.1: 核心注入逻辑
     * 在 prompt 组合之前触发，刷新宏缓存
     * TODO: 后续实现向量检索 + 取消归档逻辑
     */
    private async handleBeforeCombinePrompts(_data: GenerateBeforeCombineData) {
        try {
            const chatId = getCurrentChatId();
            if (!chatId) {
                return;
            }

            // V0.7.1: 暂时只刷新宏缓存，确保最新事件可见
            // TODO: 后续实现:
            // 1. 获取用户最新消息
            // 2. 向量检索相关事件
            // 3. 取消归档召回的事件
            // 4. 刷新宏缓存
            await MacroService.refreshCache();

            Logger.debug('Injector', '宏缓存已刷新 (BEFORE_COMBINE_PROMPTS)');

        } catch (e) {
            console.error('[Injector] Failed to refresh cache:', e);
        }
    }

    /**
     * Handle chat change - 刷新宏缓存
     */
    private handleChatChanged() {
        MacroService.refreshCache().catch(e => {
            Logger.warn('Injector', '聊天切换时刷新缓存失败', e);
        });
    }
}

export const injector = new Injector();


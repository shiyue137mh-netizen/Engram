/**
 * Injector Service V0.8
 *
 * 监听生成事件进行预处理和 RAG 注入
 * V0.8: 使用多个事件触发点确保可靠性
 */

import { EventBus, TavernEventType } from '@/tavern/api';
import { getCurrentChatId } from '@/tavern/context';
import { MacroService } from '@/tavern/MacroService';
import { Logger } from '@/lib/logger';
import { preprocessor } from '@/services/preprocessing';

/**
 * CHAT_COMPLETION_PROMPT_READY 事件数据类型
 */
interface ChatCompletionPromptData {
    chat: Array<{ role: string; content: string }>;
    dryRun: boolean;
}

export class Injector {
    private isInitialized = false;
    private isProcessing = false; // 防止重入

    /**
     * Initialize the Injector
     */
    public init() {
        if (this.isInitialized) return;

        Logger.info('Injector', '开始初始化 V0.8 预处理注入器...');
        console.log('[Injector] Starting initialization...');

        // V0.8: 主要使用 CHAT_COMPLETION_PROMPT_READY
        EventBus.on(
            TavernEventType.CHAT_COMPLETION_PROMPT_READY,
            (data: unknown) => {
                console.log('[Injector] 🎯 CHAT_COMPLETION_PROMPT_READY triggered');
                Logger.info('Injector', '🎯 捕获到 CHAT_COMPLETION_PROMPT_READY 事件');
                this.handleChatCompletionReady(data as ChatCompletionPromptData);
            }
        );

        // 聊天切换时重置状态
        EventBus.on(TavernEventType.CHAT_CHANGED, () => {
            Logger.debug('Injector', '捕获到 CHAT_CHANGED 事件');
            this.isProcessing = false;
            MacroService.refreshCache().catch(e => {
                Logger.warn('Injector', '聊天切换时刷新缓存失败', e);
            });
        });

        this.isInitialized = true;
        Logger.success('Injector', 'V0.8 Injector 初始化完成');
        console.log('[Injector] ✅ V0.8 Initialized');
    }

    /**
     * 处理 CHAT_COMPLETION_PROMPT_READY 事件
     */
    private async handleChatCompletionReady(data: ChatCompletionPromptData) {
        try {
            // 防止重入（同一次生成可能触发多次）
            if (this.isProcessing) {
                Logger.debug('Injector', '正在处理中，跳过重复调用');
                return;
            }

            // dryRun 模式是预览/计算 token，不需要预处理
            if (data.dryRun) {
                Logger.debug('Injector', 'dryRun 模式，跳过');
                return;
            }

            const chatId = getCurrentChatId();
            if (!chatId) {
                Logger.warn('Injector', '无有效聊天 ID');
                return;
            }

            // 获取最后一条用户消息
            const lastUserMessage = [...data.chat].reverse().find(m => m.role === 'user');
            if (!lastUserMessage) {
                Logger.debug('Injector', '未找到用户消息');
                return;
            }

            const userInput = lastUserMessage.content;
            const config = preprocessor.getConfig();

            Logger.info('Injector', '准备预处理', {
                chatId,
                userInputLength: userInput.length,
                userInputPreview: userInput.substring(0, 50) + '...',
                enabled: config.enabled,
                autoTrigger: config.autoTrigger,
                templateId: config.templateId,
            });

            console.log('[Injector] Config:', config);
            console.log('[Injector] User input:', userInput.substring(0, 100));

            // 检查是否启用
            if (!config.enabled) {
                Logger.debug('Injector', '预处理未启用');
                return;
            }

            if (!config.autoTrigger) {
                Logger.debug('Injector', 'autoTrigger 未开启');
                return;
            }

            // 开始处理
            this.isProcessing = true;
            Logger.info('Injector', '🚀 开始执行预处理...');
            console.log('[Injector] 🚀 Starting preprocessing...');

            try {
                const result = await preprocessor.process(userInput);

                Logger.info('Injector', '预处理结果', {
                    success: result.success,
                    hasOutput: !!result.output,
                    hasQuery: !!result.query,
                    processingTime: result.processingTime,
                    error: result.error,
                });

                console.log('[Injector] Preprocessing result:', result);

                if (result.success && result.output) {
                    Logger.success('Injector', '✅ 预处理完成', {
                        outputLength: result.output.length,
                        outputPreview: result.output.substring(0, 100) + '...'
                    });
                } else if (result.error) {
                    Logger.error('Injector', '预处理失败', { error: result.error });
                }

            } finally {
                // 延迟重置，防止同一生成周期内的其他事件
                setTimeout(() => {
                    this.isProcessing = false;
                }, 1000);
            }

            // 刷新宏缓存
            await MacroService.refreshCache();

        } catch (e) {
            this.isProcessing = false;
            Logger.error('Injector', 'handleChatCompletionReady 失败', e);
            console.error('[Injector] Error:', e);
        }
    }
}

export const injector = new Injector();

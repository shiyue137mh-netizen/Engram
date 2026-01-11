/**
 * Injector Service V0.8
 *
 * 监听生成事件进行预处理和 RAG 注入
 * V0.8: 使用 GENERATION_AFTER_COMMANDS 事件，阻塞生成直到预处理完成
 *
 * 参考 test/脚本.js 的剧情推进实现：
 * - 监听 GENERATION_AFTER_COMMANDS 事件
 * - 修改 chat 中最后一条用户消息的内容
 * - 酒馆会 await 事件处理器，确保预处理完成后再继续
 */

import { EventBus, TavernEventType } from '@/tavern/api';
import { getCurrentChatId, getSTContext } from '@/tavern/context';
import { MacroService } from '@/tavern/MacroService';
import { Logger } from '@/lib/logger';
import { preprocessor } from '@/services/preprocessing';

/**
 * GENERATION_AFTER_COMMANDS 事件参数类型
 */
interface GenerationAfterCommandsParams {
    automatic_trigger?: boolean;
    force_name2?: boolean;
    quiet_prompt?: string;
    quietToLoud?: boolean;
    skipWIAN?: boolean;
    force_chid?: number;
    signal?: AbortSignal;
    quietImage?: string;
    _engram_processed?: boolean; // 我们添加的标记，防止重复处理
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

        // V0.8: 使用 GENERATION_AFTER_COMMANDS 事件
        // 这个事件在命令处理后、生成开始前触发，酒馆会 await 处理器
        EventBus.on(
            TavernEventType.GENERATION_AFTER_COMMANDS,
            async (type: string, params: GenerationAfterCommandsParams, dryRun: boolean) => {
                console.log('[Injector] 🎯 GENERATION_AFTER_COMMANDS triggered', { type, dryRun });
                Logger.info('Injector', '🎯 捕获到 GENERATION_AFTER_COMMANDS 事件', { type, dryRun });

                // 重要！必须 await 处理，才能阻塞酒馆的生成流程
                await this.handleGenerationAfterCommands(type, params, dryRun);
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
        console.log('[Injector] ✅ V0.8 Initialized - Listening for GENERATION_AFTER_COMMANDS');
    }

    /**
     * 处理 GENERATION_AFTER_COMMANDS 事件
     * 注意：这个函数必须是 async 并被 await，才能阻塞酒馆生成
     */
    private async handleGenerationAfterCommands(
        type: string,
        params: GenerationAfterCommandsParams,
        dryRun: boolean
    ): Promise<void> {
        try {
            // dryRun 模式是预览/计算 token，不需要预处理
            if (dryRun) {
                Logger.debug('Injector', 'dryRun 模式，跳过');
                return;
            }

            // 只处理正常生成，跳过 regenerate、swipe、quiet 等
            if (type === 'regenerate' || type === 'swipe' || type === 'quiet' || type === 'impersonate') {
                Logger.debug('Injector', `跳过 ${type} 类型生成`);
                return;
            }

            // 检查是否已被处理（防止重复）
            if (params._engram_processed) {
                Logger.debug('Injector', '已被处理，跳过');
                return;
            }

            // 防止重入（同一次生成可能触发多次）
            if (this.isProcessing) {
                Logger.debug('Injector', '正在处理中，跳过重复调用');
                return;
            }

            const chatId = getCurrentChatId();
            if (!chatId) {
                Logger.warn('Injector', '无有效聊天 ID');
                return;
            }

            // 获取 SillyTavern 上下文
            const context = getSTContext();
            if (!context || !context.chat || context.chat.length === 0) {
                Logger.warn('Injector', '无法获取聊天上下文');
                return;
            }

            // 找到最后一条用户消息
            const chat = context.chat;
            const lastMessageIndex = chat.length - 1;
            const lastMessage = chat[lastMessageIndex];

            // 只处理用户消息
            if (!lastMessage || !lastMessage.is_user) {
                Logger.debug('Injector', '最后一条不是用户消息，跳过');
                return;
            }

            const userInput = lastMessage.mes;
            if (!userInput || userInput.trim().length === 0) {
                Logger.debug('Injector', '用户消息为空，跳过');
                return;
            }

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
            params._engram_processed = true; // 标记已处理
            Logger.info('Injector', '🚀 开始执行预处理（阻塞生成）...');
            console.log('[Injector] 🚀 Starting preprocessing (blocking generation)...');

            try {
                // 设置用户输入到宏缓存
                MacroService.setUserInput(userInput);
                await MacroService.refreshCache();

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

                    // 关键：修改最后一条用户消息的内容
                    // 这样酒馆在后续构建 prompt 时会使用修改后的内容
                    lastMessage.mes = result.output;

                    // 触发消息更新事件刷新 UI
                    try {
                        const eventSource = context.eventSource;
                        const eventTypes = context.eventTypes;
                        if (eventSource && eventTypes?.MESSAGE_UPDATED) {
                            eventSource.emit(eventTypes.MESSAGE_UPDATED, lastMessageIndex);
                            Logger.debug('Injector', '已触发 MESSAGE_UPDATED 事件');
                        }
                    } catch (e) {
                        Logger.warn('Injector', '触发 MESSAGE_UPDATED 失败', e);
                    }

                    // 同步清空输入框（如果内容还是原始输入）
                    try {
                        const textarea = document.getElementById('send_textarea') as HTMLTextAreaElement;
                        if (textarea && textarea.value === userInput) {
                            textarea.value = '';
                            textarea.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    } catch (e) {
                        // 忽略
                    }

                } else if (result.error) {
                    Logger.error('Injector', '预处理失败', { error: result.error });
                }

            } finally {
                // 延迟重置，防止同一生成周期内的其他事件
                setTimeout(() => {
                    this.isProcessing = false;
                }, 1000);
            }

        } catch (e) {
            this.isProcessing = false;
            Logger.error('Injector', 'handleGenerationAfterCommands 失败', e);
            console.error('[Injector] Error:', e);
        }
    }
}

export const injector = new Injector();

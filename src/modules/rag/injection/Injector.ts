/**
 * Injector Service V0.8
 *
 * 监听生成事件进行预处理和 RAG 注入
 * V0.8: 使用 GENERATION_AFTER_COMMANDS 事件，阻塞生成直到预处理完成
 *
 * 参考别人的剧情推进实现：
 * - 监听 GENERATION_AFTER_COMMANDS 事件
 * - 修改 chat 中最后一条用户消息的内容
 * - 酒馆会 await 事件处理器，确保预处理完成后再继续
 */

import { SettingsManager } from '@/config/settings';
import { DEFAULT_RECALL_CONFIG } from '@/config/types/defaults';
import { Logger, LogModule } from '@/core/logger';
import { EventBus, getCurrentChatId, getSTContext, MacroService, TavernEventType } from '@/integrations/tavern';
import { preprocessor } from '@/modules/preprocessing';
import { retriever } from '@/modules/rag/retrieval/Retriever';
import { regexProcessor } from "@/modules/workflow/steps";

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
    _engram_internal?: boolean; // 内部请求标记
}

class Injector {
    private isInitialized = false;
    private isProcessing = false; // 防止重入
    private cacheInvalid = false; // V0.9.5: 缓存失效标记（用户编辑消息后设为 true）

    /**
     * Initialize the Injector
     */
    public init() {
        if (this.isInitialized) return;

        Logger.info(LogModule.RAG_INJECT, '开始初始化 V0.8 预处理注入器...');
        console.log('[Injector] Starting initialization...');

        // V0.8: 使用 GENERATION_AFTER_COMMANDS 事件
        // 这个事件在命令处理后、生成开始前触发，酒馆会 await 处理器
        EventBus.on(
            TavernEventType.GENERATION_AFTER_COMMANDS,
            async (type: any, params: any, dryRun: any) => {
                console.log('[Injector] 🎯 GENERATION_AFTER_COMMANDS triggered', { type, dryRun });
                Logger.debug(LogModule.RAG_INJECT, '捕获 GENERATION_AFTER_COMMANDS', { type });

                // 重要！必须 await 处理，才能阻塞酒馆的生成流程
                await this.handleGenerationAfterCommands(type, params, dryRun);
            }
        );

        // 聊天切换时重置状态
        EventBus.on(TavernEventType.CHAT_CHANGED, () => {
            Logger.debug(LogModule.RAG_INJECT, '捕获到 CHAT_CHANGED 事件');
            this.isProcessing = false;
            this.cacheInvalid = false; // 切换聊天时重置缓存状态
            MacroService.refreshCache().catch(e => {
                Logger.warn(LogModule.RAG_INJECT, '聊天切换时刷新缓存失败', e);
            });
        });

        // V0.9.5: 监听消息编辑事件，用户编辑自己的消息后标记缓存失效
        EventBus.on(TavernEventType.MESSAGE_EDITED, (...args: unknown[]) => {
            const msgIndex = args[0] as number;
            const context = getSTContext();
            const msg = context?.chat?.[msgIndex];
            if (msg?.is_user) {
                this.cacheInvalid = true;
                Logger.info(LogModule.RAG_INJECT, '用户消息被编辑，标记召回缓存失效', { msgIndex });
            }
        });

        this.isInitialized = true;
        Logger.success(LogModule.RAG_INJECT, 'V0.8 Injector 初始化完成');
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
                Logger.debug(LogModule.RAG_INJECT, 'dryRun 模式，跳过');
                return;
            }

            // V0.9.5: 改进的跳过逻辑
            // quiet/impersonate 始终跳过
            if (type === 'quiet' || type === 'impersonate') {
                Logger.debug(LogModule.RAG_INJECT, `跳过 ${type} 类型生成`);
                return;
            }

            // regenerate/swipe 时检查缓存是否失效
            if (type === 'regenerate' || type === 'swipe') {
                if (!this.cacheInvalid) {
                    Logger.debug(LogModule.RAG_INJECT, `${type} 使用召回缓存，跳过重新召回`);
                    return;
                }
                Logger.info(LogModule.RAG_INJECT, `${type} 检测到缓存失效（用户编辑了消息），执行重新召回`);
                // 继续执行，不 return
            }

            // 检查是否已被处理（防止重复）
            if (params._engram_processed) {
                Logger.debug(LogModule.RAG_INJECT, '已被处理，跳过');
                return;
            }

            // 防止重入（同一次生成可能触发多次）
            if (this.isProcessing) {
                Logger.debug(LogModule.RAG_INJECT, '正在处理中，跳过重复调用');
                return;
            }

            // V0.9.6: 检查内部请求标记
            if (params._engram_internal) {
                Logger.debug(LogModule.RAG_INJECT, '检测到内部请求，跳过预处理');
                return;
            }

            const chatId = getCurrentChatId();
            if (!chatId) {
                Logger.warn(LogModule.RAG_INJECT, '无有效聊天 ID');
                return;
            }

            // 获取 SillyTavern 上下文
            const context = getSTContext();
            if (!context || !context.chat || context.chat.length === 0) {
                Logger.warn(LogModule.RAG_INJECT, '无法获取聊天上下文');
                return;
            }

            // 找到最后一条用户消息
            // 如果最新消息不是用户消息（例如是系统消息、Thinking消息等），则跳过处理，
            // 严禁往前查找，否则会导致注入到上一轮对话中。
            const chat = context.chat;
            const lastMessageIndex = chat.length - 1;
            const lastMessage = chat[lastMessageIndex];

            // 严格校验：最新消息是否为用户消息
            let userInput = '';
            let targetSource: 'chat' | 'textarea' = 'chat';

            if (lastMessage && lastMessage.is_user) {
                // V0.9.12 Fix: Check duplication on retry
                // @ts-ignore
                if (lastMessage._engram_processed) {
                    Logger.debug(LogModule.RAG_INJECT, '消息已标记为已处理 (Prevent Re-entry)', {
                        index: lastMessageIndex
                    });
                    return;
                }
                userInput = lastMessage.mes;
            } else {
                // [Strategy 2] Fallback: 尝试读取输入框
                const textarea = document.getElementById('send_textarea') as HTMLTextAreaElement;
                if (textarea && textarea.value && textarea.value.trim().length > 0) {
                    userInput = textarea.value;
                    targetSource = 'textarea';
                    Logger.info(LogModule.RAG_INJECT, '最新消息未入列，使用 Textarea 作为输入源 (Strategy 2)', {
                        preview: userInput.substring(0, 50)
                    });
                } else {
                    Logger.debug(LogModule.RAG_INJECT, '最新消息不是用户消息且输入框为空，跳过预处理', {
                        index: lastMessageIndex,
                        isUser: lastMessage?.is_user
                    });
                    return;
                }
            }

            if (!userInput || userInput.trim().length === 0) {
                Logger.debug(LogModule.RAG_INJECT, '用户输入为空，跳过');
                return;
            }

            // 获取配置
            let apiSettings, recallConfig, preprocessorConfig;
            try {
                apiSettings = SettingsManager.get('apiSettings');
                recallConfig = apiSettings?.recallConfig || DEFAULT_RECALL_CONFIG;

                if (!preprocessor) {
                    throw new Error('Preprocessor service is undefined');
                }
                preprocessorConfig = preprocessor.getConfig();
            } catch (configError) {
                Logger.error(LogModule.RAG_INJECT, '配置获取失败', configError);
                throw configError;
            }

            // 合并日志：仅记录关键信息
            Logger.info(LogModule.RAG_INJECT, '开始处理', {
                inputLength: userInput.length,
                recall: recallConfig.enabled,
                preprocess: recallConfig.usePreprocessing && preprocessorConfig.enabled,
            });

            // 检查自动触发 (仅当预处理启用时检查 preprocessor 配置，否则视为纯 RAG)
            if (recallConfig.usePreprocessing && preprocessorConfig.enabled && !preprocessorConfig.autoTrigger) {
                Logger.debug(LogModule.RAG_INJECT, '预处理 autoTrigger 未开启');
                // 如果 RAG 也没开启，直接返回
                if (!recallConfig.enabled) return;
            }

            // 开始处理
            this.isProcessing = true;
            this.cacheInvalid = false; // 重置缓存失效标记
            params._engram_processed = true; // 标记 Params 已处理
            if (lastMessage) {
                // @ts-ignore
                lastMessage._engram_processed = true; // 标记消息对象已处理 (参考脚本.js)
            }
            // 开始处理（不再重复记录，上面已经有 info 了）

            let finalOutput = userInput;
            let queries: string[] = [];
            let preprocessResult: import('@/modules/preprocessing/types').PreprocessingResult | null = null;

            try {
                // 1. 预处理 (如果启用 且 自动触发开启)
                if (recallConfig.usePreprocessing && preprocessorConfig.enabled && preprocessorConfig.autoTrigger) {
                    try {
                        // 设置用户输入到宏缓存
                        MacroService.setUserInput(userInput);
                        await MacroService.refreshCache();

                        preprocessResult = await preprocessor.process(userInput);

                        if (preprocessResult.success && preprocessResult.output) {
                            Logger.success(LogModule.RAG_INJECT, '预处理完成', {
                                outputLength: preprocessResult.output.length,
                            });
                            // 根据模板的注入模式决定如何组合
                            const template = SettingsManager.getPromptTemplateById(preprocessorConfig.templateId);
                            const mode = template?.injectionMode || 'replace';

                            if (mode === 'append') {
                                finalOutput = `${userInput}\n\n${preprocessResult.output}`;
                            } else if (mode === 'prepend') {
                                finalOutput = `${preprocessResult.output}\n\n${userInput}`;
                            } else {
                                finalOutput = preprocessResult.output;
                            }

                            if (preprocessResult.query) {
                                queries.push(preprocessResult.query);
                            }
                        } else {
                            Logger.warn(LogModule.RAG_INJECT, '预处理未返回有效结果，使用原始输入');
                        }
                    } catch (err) {
                        Logger.warn(LogModule.RAG_INJECT, '⚠️ 预处理失败，降级为普通模式', err);
                        // 降级：不中断，继续后续 RAG
                    }
                }

                // 2. RAG 召回 (如果启用)
                if (recallConfig.enabled) {
                    try {
                        let ragHandled = false;

                        // 2a. Agentic RAG (优先路径)
                        if (recallConfig.useAgenticRAG && preprocessResult?.agenticRecalls && preprocessResult.agenticRecalls.length > 0) {
                            try {
                                Logger.info(LogModule.RAG_INJECT, 'Agentic RAG: 执行 ID 直通检索', {
                                    recallCount: preprocessResult.agenticRecalls.length,
                                });

                                const agenticResult = await retriever.agenticSearch(preprocessResult.agenticRecalls);

                                if (agenticResult.nodes.length > 0) {
                                    Logger.success(LogModule.RAG_INJECT, 'Agentic RAG 召回完成', {
                                        nodeCount: agenticResult.nodes.length,
                                    });
                                    await MacroService.refreshCacheWithNodes(agenticResult.nodes);
                                    SettingsManager.incrementStatistic('totalRagInjections', 1);
                                    ragHandled = true;
                                } else {
                                    Logger.warn(LogModule.RAG_INJECT, 'Agentic RAG 无有效结果，尝试降级');
                                }
                            } catch (agenticErr) {
                                Logger.warn(LogModule.RAG_INJECT, 'Agentic RAG 失败，降级到传统检索', agenticErr);
                            }
                        }

                        // 2b. 传统 Embedding RAG (Agentic 未启用或降级后的 fallback)
                        if (!ragHandled && recallConfig.useEmbedding) {
                            const hasVectorData = await retriever.hasVectorizedNodes();
                            if (!hasVectorData) {
                                Logger.debug(LogModule.RAG_INJECT, '未检测到向量化数据，跳过 RAG');
                            } else {
                                Logger.debug(LogModule.RAG_INJECT, '执行传统 RAG 召回');

                                const recallResult = await retriever.search(
                                    userInput,
                                    queries.length > 0 ? queries : undefined
                                );

                                if (recallResult.nodes.length > 0) {
                                    Logger.success(LogModule.RAG_INJECT, 'RAG 召回完成', {
                                        nodeCount: recallResult.nodes.length,
                                    });
                                    await MacroService.refreshCacheWithNodes(recallResult.nodes);
                                    SettingsManager.incrementStatistic('totalRagInjections', 1);
                                } else {
                                    Logger.debug(LogModule.RAG_INJECT, 'RAG 无匹配结果');
                                }
                            }
                        }
                    } catch (e) {
                        Logger.error(LogModule.RAG_INJECT, 'RAG 召回失败', e);
                    }
                }

                // 3. 更新用户消息 (如果内容发生了变化)
                // 2.5 最终清洗 (确保所有标签都被移除)
                // 强制对最终结果进行一次清洗，确保组合后的内容不包含 <think> 等标签
                finalOutput = regexProcessor.process(finalOutput, 'output');

                // 3. 更新用户消息 (如果内容发生了变化)
                if (finalOutput !== userInput) {
                    if (targetSource === 'chat') {
                        // 策略1：直接修改消息对象
                        lastMessage.mes = finalOutput;

                        // 触发消息更新事件刷新 UI
                        try {
                            const eventSource = context.eventSource;
                            const eventTypes = context.event_types;
                            if (eventSource && eventTypes?.MESSAGE_UPDATED) {
                                eventSource.emit(eventTypes.MESSAGE_UPDATED, lastMessageIndex);
                                Logger.debug(LogModule.RAG_INJECT, '已触发 MESSAGE_UPDATED 事件');
                            }
                        } catch (e) {
                            Logger.warn(LogModule.RAG_INJECT, '触发 MESSAGE_UPDATED 失败', e);
                        }

                        // 同步清空输入框 (仅当输入框内容仍为旧内容时)
                        try {
                            const textarea = document.getElementById('send_textarea') as HTMLTextAreaElement;
                            if (textarea && textarea.value === userInput) {
                                textarea.value = '';
                                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                        } catch (e) { }

                    } else if (targetSource === 'textarea') {
                        // 策略2：修改输入框内容，并尝试修改 params.prompt
                        Logger.debug(LogModule.RAG_INJECT, '回写到 Textarea');
                        try {
                            const textarea = document.getElementById('send_textarea') as HTMLTextAreaElement;
                            if (textarea) {
                                textarea.value = finalOutput;
                                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            // 尝试修改本次生成的 prompt (如果 params 可写)
                            if (params) {
                                // @ts-ignore
                                params.prompt = finalOutput;
                            }
                        } catch (e) {
                            Logger.warn(LogModule.RAG_INJECT, '回写 Textarea 失败', e);
                        }
                    }
                }

            } finally {
                // 延迟重置，防止同一生成周期内的其他事件
                setTimeout(() => {
                    this.isProcessing = false;
                }, 1000);
            }

        } catch (e: any) {
            this.isProcessing = false;
            Logger.error(LogModule.RAG_INJECT, 'handleGenerationAfterCommands 失败', {
                message: e?.message || e,
                stack: e?.stack
            });
            console.error('[Injector] Error:', e);
        }
    }

}

export const injector = new Injector();

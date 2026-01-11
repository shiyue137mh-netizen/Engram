import { useMemoryStore } from '@/stores/memoryStore';
import { Logger } from '@/lib/logger';
import { WorldInfoService } from '@/tavern/api';

/**
 * MacroService 类
 * V0.8: 支持预处理使用的宏，包括 {{engramSummaries}} 和 {{worldbookContext}}
 */
export class MacroService {
    private static isInitialized = false;

    /**
     * 初始化并注册所有 Engram 宏
     */
    static async init(): Promise<void> {
        if (this.isInitialized) return;

        try {
            // @ts-ignore - SillyTavern 全局对象
            const context = window.SillyTavern?.getContext?.();

            if (!context?.registerMacro) {
                Logger.warn('MacroService', 'SillyTavern registerMacro API 不可用');
                return;
            }

            // --- 注册宏 ---

            // {{engramSummaries}} - 从 IndexedDB 获取当前聊天的所有事件摘要
            context.registerMacro(
                'engramSummaries',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedSummaries;
                },
                'Engram: 当前聊天的所有事件摘要 (从 IndexedDB)'
            );

            // {{worldbookContext}} - 获取激活的世界书内容
            context.registerMacro(
                'worldbookContext',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedWorldbookContext;
                },
                'Engram: 当前激活的世界书内容'
            );

            // {{userInput}} - 当前用户输入（预处理专用）
            context.registerMacro(
                'userInput',
                () => {
                    return MacroService.cachedUserInput;
                },
                'Engram: 当前用户输入（预处理专用）'
            );

            // {{chatHistory}} - 最近对话历史
            context.registerMacro(
                'chatHistory',
                () => {
                    return MacroService.cachedChatHistory;
                },
                'Engram: 最近对话历史'
            );

            // {{context}} - 角色卡设定（同酒馆 description）
            context.registerMacro(
                'context',
                () => {
                    return MacroService.cachedCharDescription;
                },
                'Engram: 角色卡设定'
            );

            this.isInitialized = true;
            Logger.success('MacroService', '全局宏已注册', {
                macros: ['{{engramSummaries}}', '{{worldbookContext}}', '{{userInput}}', '{{chatHistory}}', '{{context}}']
            });

            // 初始化缓存
            await this.refreshCache();

            // 监听聊天切换事件，刷新缓存
            // @ts-ignore
            const eventSource = context.eventSource;
            if (eventSource) {
                eventSource.on('chat_id_changed', () => {
                    this.refreshCache().catch(e => Logger.warn('MacroService', '刷新缓存失败', e));
                });
            }

        } catch (e) {
            Logger.error('MacroService', '初始化失败', e);
        }
    }

    // --- 缓存 ---
    private static cachedSummaries: string = '';
    private static cachedWorldbookContext: string = '';
    private static cachedUserInput: string = '';
    private static cachedChatHistory: string = '';
    private static cachedCharDescription: string = '';

    /**
     * 设置用户输入（预处理时调用）
     */
    static setUserInput(input: string): void {
        this.cachedUserInput = input;
    }

    /**
     * 刷新缓存 - 从 IndexedDB 读取事件摘要，从世界书读取激活内容
     * @param recalledIds 可选，RAG 召回的事件 ID 列表（绿灯事件临时显示）
     */
    static async refreshCache(recalledIds?: string[]): Promise<void> {
        try {
            // 刷新 Engram 摘要
            const store = useMemoryStore.getState();
            this.cachedSummaries = await store.getEventSummaries(recalledIds);

            // 刷新世界书上下文
            try {
                this.cachedWorldbookContext = await WorldInfoService.getActivatedWorldInfo();
            } catch (e) {
                Logger.debug('MacroService', '获取世界书内容失败', e);
                this.cachedWorldbookContext = '';
            }

            // 刷新对话历史
            this.refreshChatHistory();

            // 刷新角色描述
            this.refreshCharDescription();

            Logger.debug('MacroService', '缓存已刷新', {
                summariesLength: this.cachedSummaries.length,
                worldbookLength: this.cachedWorldbookContext.length,
                recalledCount: recalledIds?.length ?? 0
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新缓存失败', e);
        }
    }

    /**
     * 刷新对话历史缓存
     */
    private static refreshChatHistory(): void {
        try {
            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            if (context?.chat && Array.isArray(context.chat)) {
                const recentMessages = context.chat.slice(-10);
                this.cachedChatHistory = recentMessages.map((m: { is_user?: boolean; mes?: string }) => {
                    const role = m.is_user ? '{{user}}' : '{{char}}';
                    return `${role}: ${m.mes || ''}`;
                }).join('\n');
            }
        } catch (e) {
            Logger.debug('MacroService', '刷新对话历史失败', e);
        }
    }

    /**
     * 刷新角色描述缓存
     */
    private static refreshCharDescription(): void {
        try {
            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            if (context?.characters && context.characterId >= 0) {
                const char = context.characters[context.characterId];
                this.cachedCharDescription = char?.description || '';
            }
        } catch (e) {
            Logger.debug('MacroService', '刷新角色描述失败', e);
        }
    }
}

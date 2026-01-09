import { useMemoryStore } from '@/stores/memoryStore';
import { Logger } from '@/lib/logger';

/**
 * MacroService 类
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

            // 1. {{engramSummaries}} - 从 IndexedDB 获取当前 Scope 的所有事件摘要
            context.registerMacro(
                'engramSummaries',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedSummaries;
                },
                'Engram: 当前聊天的所有事件摘要 (从 IndexedDB)'
            );

            // 2. {{engramContext}} - 动态上下文 (RAG 检索结果)
            context.registerMacro(
                'engramContext',
                () => {
                    return MacroService.cachedContext;
                },
                'Engram: 动态上下文 (RAG 检索的记忆片段)'
            );

            this.isInitialized = true;
            Logger.success('MacroService', '全局宏已注册', {
                macros: ['{{engramSummaries}}', '{{engramContext}}']
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
    private static cachedContext: string = '';

    /**
     * 刷新缓存 - 从 IndexedDB 读取事件摘要
     */
    static async refreshCache(): Promise<void> {
        try {
            // 从 memoryStore 获取所有事件摘要
            const store = useMemoryStore.getState();
            this.cachedSummaries = await store.getEventSummaries();
            Logger.debug('MacroService', '缓存已刷新', {
                length: this.cachedSummaries.length
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新缓存失败', e);
        }
    }

    /**
     * 更新动态上下文缓存 (由 Injector 调用)
     */
    static updateContextCache(content: string): void {
        this.cachedContext = content;
    }
}

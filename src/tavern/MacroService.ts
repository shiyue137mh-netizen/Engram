import { useMemoryStore } from '@/stores/memoryStore';
import { Logger } from '@/lib/logger';

/**
 * MacroService 类
 * V0.7.1: 简化为单一宏 {{engramSummaries}}，支持 RAG 召回
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
            // V0.7.1: RAG 召回的事件（绿灯）通过 recalledIds 临时显示
            context.registerMacro(
                'engramSummaries',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedSummaries;
                },
                'Engram: 当前聊天的所有事件摘要 (从 IndexedDB)'
            );

            this.isInitialized = true;
            Logger.success('MacroService', '全局宏已注册', {
                macros: ['{{engramSummaries}}']
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

    /**
     * 刷新缓存 - 从 IndexedDB 读取事件摘要
     * @param recalledIds 可选，RAG 召回的事件 ID 列表（绿灯事件临时显示）
     */
    static async refreshCache(recalledIds?: string[]): Promise<void> {
        try {
            const store = useMemoryStore.getState();
            this.cachedSummaries = await store.getEventSummaries(recalledIds);
            Logger.debug('MacroService', '缓存已刷新', {
                length: this.cachedSummaries.length,
                recalledCount: recalledIds?.length ?? 0
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新缓存失败', e);
        }
    }
}


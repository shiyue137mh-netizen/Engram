/**
 * EventWatcher - 通用事件监听器
 *
 * 位于 L5 基础层，可被多个模块共用：
 * - SummarizerService (总结触发)
 * - Injector (上下文刷新)
 * - RAG (检索触发)
 *
 * 基于 tavern/TavernEvents.ts 的 EventBus 进行封装
 */

import { EventBus, TavernEventType, type Unsubscribe } from '@/integrations/tavern/events';

/** 监听回调类型 */
interface WatcherCallbacks {
    /** 收到消息时触发 (用户或 AI) */
    onMessageReceived?: () => void | Promise<void>;
    /** 聊天切换时触发 */
    onChatChanged?: () => void | Promise<void>;
    /** 生成开始时触发 */
    onGenerationStarted?: () => void | Promise<void>;
    /** 生成结束时触发 */
    onGenerationEnded?: () => void | Promise<void>;
}

/**
 * EventWatcher 类
 * 统一管理事件订阅，避免重复监听
 */
class EventWatcher {
    private static instance: EventWatcher | null = null;
    private unsubscribers: Unsubscribe[] = [];
    private callbacks: Map<string, Set<() => void | Promise<void>>> = new Map();

    private constructor() {
        // 私有构造函数，使用 getInstance() 获取实例
    }

    /**
     * 获取单例实例
     */
    static getInstance(): EventWatcher {
        if (!EventWatcher.instance) {
            EventWatcher.instance = new EventWatcher();
        }
        return EventWatcher.instance;
    }

    /**
     * 启动监听
     * 如果已启动则跳过
     */
    start(): void {
        if (this.unsubscribers.length > 0) {
            console.log('[EventWatcher] Already started.');
            return;
        }

        // 订阅核心事件
        this.unsubscribers.push(
            EventBus.on(TavernEventType.MESSAGE_RECEIVED, () => this.emit('messageReceived')),
            EventBus.on(TavernEventType.CHAT_CHANGED, () => this.emit('chatChanged')),
            EventBus.on(TavernEventType.GENERATION_STARTED, () => this.emit('generationStarted')),
            EventBus.on(TavernEventType.GENERATION_ENDED, () => this.emit('generationEnded'))
        );

        console.log('[EventWatcher] Started, listening to core events.');
    }

    /**
     * 停止监听
     */
    stop(): void {
        this.unsubscribers.forEach(unsub => unsub());
        this.unsubscribers = [];
        console.log('[EventWatcher] Stopped.');
    }

    /**
     * 注册回调
     * @param event 事件名
     * @param callback 回调函数
     * @returns 取消注册函数
     */
    on(event: keyof WatcherCallbacks, callback: () => void | Promise<void>): Unsubscribe {
        const eventKey = this.mapEventKey(event);

        if (!this.callbacks.has(eventKey)) {
            this.callbacks.set(eventKey, new Set());
        }

        this.callbacks.get(eventKey)!.add(callback);

        return () => {
            this.callbacks.get(eventKey)?.delete(callback);
        };
    }

    /**
     * 触发事件
     */
    private emit(eventKey: string): void {
        const callbacks = this.callbacks.get(eventKey);
        if (callbacks) {
            callbacks.forEach(cb => {
                try {
                    cb();
                } catch (e) {
                    console.error(`[EventWatcher] Callback error for ${eventKey}:`, e);
                }
            });
        }
    }

    /**
     * 映射回调名到内部事件键
     */
    private mapEventKey(event: keyof WatcherCallbacks): string {
        const map: Record<keyof WatcherCallbacks, string> = {
            onMessageReceived: 'messageReceived',
            onChatChanged: 'chatChanged',
            onGenerationStarted: 'generationStarted',
            onGenerationEnded: 'generationEnded'
        };
        return map[event];
    }
}

/** 默认实例 */
export const eventWatcher = EventWatcher.getInstance();

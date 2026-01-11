/**
 * EventBus - SillyTavern 事件总线封装
 *
 * 提供类型安全的事件订阅/取消订阅接口
 */

// SillyTavern 事件类型 (从 events.js 提取的关键事件)
export const TavernEventType = {
    // 消息事件
    MESSAGE_SENT: 'message_sent',
    MESSAGE_RECEIVED: 'message_received',
    MESSAGE_EDITED: 'message_edited',
    MESSAGE_DELETED: 'message_deleted',
    MESSAGE_UPDATED: 'message_updated',
    MESSAGE_SWIPED: 'message_swiped',
    USER_MESSAGE_RENDERED: 'user_message_rendered',
    CHARACTER_MESSAGE_RENDERED: 'character_message_rendered',

    // 聊天事件
    CHAT_CHANGED: 'chat_id_changed',
    CHAT_CREATED: 'chat_created',
    CHAT_DELETED: 'chat_deleted',

    // 生成事件
    GENERATION_STARTED: 'generation_started',
    GENERATION_STOPPED: 'generation_stopped',
    GENERATION_ENDED: 'generation_ended',
    GENERATION_AFTER_COMMANDS: 'GENERATION_AFTER_COMMANDS',
    STREAM_TOKEN_RECEIVED: 'stream_token_received',
    // V0.7: RAG 注入关键事件 - 在 prompt 组合之前触发，await 会等待 handler 完成
    GENERATE_BEFORE_COMBINE_PROMPTS: 'generate_before_combine_prompts',
    GENERATE_AFTER_COMBINE_PROMPTS: 'generate_after_combine_prompts',
    GENERATE_AFTER_DATA: 'generate_after_data',
    // V0.8: Chat Completion 事件 (更可靠的预处理触发点)
    CHAT_COMPLETION_PROMPT_READY: 'chat_completion_prompt_ready',
    CHAT_COMPLETION_SETTINGS_READY: 'chat_completion_settings_ready',

    // 世界书事件
    WORLDINFO_UPDATED: 'worldinfo_updated',
    WORLDINFO_SETTINGS_UPDATED: 'worldinfo_settings_updated',
    WORLDINFO_ENTRIES_LOADED: 'worldinfo_entries_loaded',
    WORLD_INFO_ACTIVATED: 'world_info_activated',

    // 应用事件
    APP_READY: 'app_ready',
    SETTINGS_LOADED: 'settings_loaded',
    SETTINGS_LOADED_AFTER: 'settings_loaded_after',
    EXTENSION_SETTINGS_LOADED: 'extension_settings_loaded',

    // 角色事件
    CHARACTER_EDITED: 'character_edited',
    CHARACTER_DELETED: 'characterDeleted',
    // 扩展事件
    ENGRAM_REQUEST_REVISION: 'engram:request_revision',
} as const;

export type TavernEventTypeKey = keyof typeof TavernEventType;
export type TavernEventTypeValue = typeof TavernEventType[TavernEventTypeKey];

/** 事件回调函数类型 */
export type EventCallback = (...args: unknown[]) => void | Promise<void>;

/** 取消订阅函数类型 */
export type Unsubscribe = () => void;

/**
 * 获取 SillyTavern 的 eventSource
 * 注意：这个函数需要在运行时调用，因为 SillyTavern 的模块是动态加载的
 */
function getEventSource(): {
    on: (event: string, callback: EventCallback) => void;
    once: (event: string, callback: EventCallback) => void;
    emit: (event: string, ...args: unknown[]) => void;
    removeListener: (event: string, callback: EventCallback) => void;
} | null {
    try {

        const SillyTavern = window.SillyTavern;
        if (SillyTavern?.getContext) {
            const context = SillyTavern.getContext();
            return context?.eventSource || null;
        }
        return null;
    } catch {
        console.warn('[Engram] EventBus: 无法获取 SillyTavern eventSource');
        return null;
    }
}

/**
 * EventBus 类
 * 封装 SillyTavern 事件系统，提供类型安全的 API
 */
export class EventBus {
    private static listeners = new Map<string, Set<EventCallback>>();

    /**
     * 订阅事件
     * @param event 事件名称
     * @param callback 回调函数
     * @returns 取消订阅函数
     */
    static on(event: TavernEventTypeValue | string, callback: EventCallback): Unsubscribe {
        const eventSource = getEventSource();

        if (eventSource) {
            eventSource.on(event, callback);
        }

        // 本地存储以便清理
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);

        // 返回取消订阅函数
        return () => {
            this.off(event, callback);
        };
    }

    /**
     * 一次性订阅事件（触发后自动取消）
     * @param event 事件名称
     * @param callback 回调函数
     */
    static once(event: TavernEventTypeValue | string, callback: EventCallback): void {
        const eventSource = getEventSource();

        if (eventSource) {
            eventSource.once(event, callback);
        } else {
            // fallback: 自己实现 once
            const wrappedCallback: EventCallback = (...args) => {
                this.off(event, wrappedCallback);
                callback(...args);
            };
            this.on(event, wrappedCallback);
        }
    }

    /**
     * 取消订阅事件
     * @param event 事件名称
     * @param callback 回调函数
     */
    static off(event: TavernEventTypeValue | string, callback: EventCallback): void {
        const eventSource = getEventSource();

        if (eventSource) {
            eventSource.removeListener(event, callback);
        }

        // 从本地存储移除
        this.listeners.get(event)?.delete(callback);
    }

    /**
     * 触发事件
     * @param event 事件名称
     * @param args 参数
     */
    static emit(event: TavernEventTypeValue | string, ...args: unknown[]): void {
        const eventSource = getEventSource();

        if (eventSource) {
            eventSource.emit(event, ...args);
        }
    }

    /**
     * 清除所有已注册的监听器
     * 在扩展卸载时调用
     */
    static clearAll(): void {
        const eventSource = getEventSource();

        for (const [event, callbacks] of this.listeners) {
            for (const callback of callbacks) {
                if (eventSource) {
                    eventSource.removeListener(event, callback);
                }
            }
        }

        this.listeners.clear();
    }

    /**
     * 检查 EventBus 是否可用
     */
    static isAvailable(): boolean {
        return getEventSource() !== null;
    }
}

export default EventBus;

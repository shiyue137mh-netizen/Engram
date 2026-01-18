/**
 * STContext - SillyTavern 上下文获取模块
 *
 * 统一的上下文获取入口，消除各模块重复定义
 */

// SillyTavern 全局类型声明
declare global {
    interface Window {
        SillyTavern?: {
            getContext?: () => STContext;
        };
    }
}

/** ST 上下文类型 */
export interface STContext {
    chat: STMessage[];
    characters: STCharacter[];
    name1: string; // 用户名
    name2: string; // 角色名
    characterId: number;
    chatId: string;
    // 事件系统
    eventSource?: {
        on: (event: string, callback: (data: any) => void) => void;
        off: (event: string, callback: (data: any) => void) => void;
        emit: (event: string, data: any) => void;
    };
    event_types?: Record<string, string>;
    // 工具函数
    getRequestHeaders?: (options?: { omitContentType?: boolean }) => Record<string, string>;
}

/** ST 消息类型 */
export interface STMessage {
    mes: string;
    is_user: boolean;
    is_system?: boolean;
    is_hidden?: boolean;
    name: string;
    send_date?: number;
    extra?: Record<string, unknown>;
}

/** ST 角色类型 */
export interface STCharacter {
    name: string;
    avatar: string;
    description: string;
}

/**
 * 获取 SillyTavern 上下文
 * @returns ST 上下文对象，或 null（如果不可用）
 */
export function getSTContext(): STContext | null {
    try {
        const ctx = window.SillyTavern?.getContext?.();
        return ctx || null;
    } catch (e) {
        console.warn('[Engram] Failed to get ST context:', e);
        return null;
    }
}

/**
 * 获取当前聊天记录
 */
export function getCurrentChat(): STMessage[] {
    const ctx = getSTContext();
    return ctx?.chat || [];
}

/**
 * 获取当前聊天记录 (别名)
 */
export function getChatMessages(): STMessage[] {
    return getCurrentChat();
}

/**
 * 获取当前聊天 ID
 */
export function getCurrentChatId(): string | null {
    const ctx = getSTContext();
    return ctx?.chatId || null;
}

/**
 * 获取当前角色信息
 */
export function getCurrentCharacter(): { name: string; id: number } | null {
    const ctx = getSTContext();
    if (!ctx) return null;
    return {
        name: ctx.name2,
        id: ctx.characterId,
    };
}

/**
 * 获取当前模型名称 (尝试从全局变量获取)
 */
export function getCurrentModel(): string | undefined {
    try {
        // @ts-expect-error - SillyTavern 全局变量
        return window.selected_model || undefined;
    } catch {
        return undefined;
    }
}



/**
 * 检查 ST 上下文是否可用
 */
export function isSTAvailable(): boolean {
    return getSTContext() !== null;
}

/**
 * 获取请求头 (包含 CSRF Token)
 */
export function getRequestHeaders(options?: { omitContentType?: boolean }): Record<string, string> {
    const ctx = getSTContext();
    if (ctx?.getRequestHeaders) {
        return ctx.getRequestHeaders(options);
    }
    // Fallback: 如果拿不到 context，至少返回 Content-Type
    return { 'Content-Type': 'application/json' };
}

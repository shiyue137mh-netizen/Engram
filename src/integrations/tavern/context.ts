/**
 * STContext - SillyTavern 上下文获取模块
 *
 * 统一的上下文获取入口，消除各模块重复定义。
 * 负责从 window.SillyTavern 对象中安全地提取状态。
 */

import { Logger } from '@/core/logger';

const MODULE = 'STContext';

// SillyTavern 全局类型声明
declare global {
    interface Window {
        SillyTavern?: {
            getContext?: () => STContext;
        };
        // 兼容一些直接挂载在 window 上的变量
        selected_model?: string;
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
        once: (event: string, callback: (data: any) => void) => void;
        off: (event: string, callback: (data: any) => void) => void;
        emit: (event: string, data: any) => void;
        removeListener: (event: string, callback: (data: any) => void) => void;
    };
    event_types?: Record<string, string>;
    // 工具函数
    getRequestHeaders?: (options?: { omitContentType?: boolean }) => Record<string, string>;
    // Token 计数
    getTokenCountAsync?: (text: string) => Promise<number>;
    // 生成控制
    stopGeneration?: () => void;

    // 宏系统
    registerMacro?: (key: string, callback: () => string | Promise<string>, description?: string) => void;
    macros?: {
        register: (name: string, options: {
            handler: (context?: any) => string | Promise<string>;
            description?: string;
            category?: string;
            returnType?: string;
            strictArgs?: boolean;
            [key: string]: any;
        }) => void;
    };

    // 聊天元数据
    chat_metadata?: Record<string, any>;
    // 扩展配置
    extensionSettings?: Record<string, any>;
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
    force_avatar?: string; // 有时用于强制显示特定头像
}

/** ST 角色类型 */
interface STCharacter {
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
        Logger.warn(MODULE, '无法获取 ST 上下文', e);
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

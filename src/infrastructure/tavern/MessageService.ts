/**
 * MessageService - SillyTavern 消息服务封装
 * 
 * 提供聊天消息获取、楼层计数等功能
 */

import { getSTContext, isSTAvailable } from '../STContext';
import type { STMessage } from '../STContext';

/** 消息角色类型 */
export type MessageRole = 'user' | 'assistant' | 'system';

/** 酒馆消息结构 */
export interface TavernMessage {
    /** 消息 ID (楼层号) */
    id: number;
    /** 发送者角色 */
    role: MessageRole;
    /** 消息内容 */
    content: string;
    /** 发送者名称 */
    name: string;
    /** 是否隐藏 */
    isHidden: boolean;
    /** 原始消息对象引用 */
    raw?: unknown;
}

/** 消息查询选项 */
export interface GetMessagesOptions {
    /** 是否包含隐藏消息 */
    includeHidden?: boolean;
    /** 角色过滤 */
    role?: MessageRole | MessageRole[];
}

/**
 * 将酒馆原始消息转换为统一格式
 */
function convertMessage(msg: STMessage, index: number): TavernMessage {
    let role: MessageRole = 'assistant';
    if (msg.is_user) {
        role = 'user';
    } else if (msg.is_system) {
        role = 'system';
    }

    return {
        id: index,
        role,
        content: msg.mes || '',
        name: msg.name || '',
        isHidden: msg.is_hidden ?? false,
        raw: msg,
    };
}

/**
 * MessageService 类
 * 提供消息获取和楼层计数功能
 */
export class MessageService {
    /**
     * 获取当前聊天的所有消息
     * @param options 查询选项
     */
    static getAllMessages(options: GetMessagesOptions = {}): TavernMessage[] {
        const context = getSTContext();
        if (!context?.chat) {
            return [];
        }

        let messages = context.chat.map((msg, index) => convertMessage(msg, index));

        // 过滤隐藏消息
        if (!options.includeHidden) {
            messages = messages.filter(m => !m.isHidden);
        }

        // 角色过滤
        if (options.role) {
            const roles = Array.isArray(options.role) ? options.role : [options.role];
            messages = messages.filter(m => roles.includes(m.role));
        }

        return messages;
    }

    /**
     * 获取最近 N 条消息
     * @param count 消息数量
     * @param options 查询选项
     */
    static getRecentMessages(count: number, options: GetMessagesOptions = {}): TavernMessage[] {
        const messages = this.getAllMessages(options);
        return messages.slice(-count);
    }

    /**
     * 获取指定范围的消息
     * @param start 起始索引（包含）
     * @param end 结束索引（不包含）
     * @param options 查询选项
     */
    static getMessages(start: number, end?: number, options: GetMessagesOptions = {}): TavernMessage[] {
        const messages = this.getAllMessages(options);
        return messages.slice(start, end);
    }

    /**
     * 获取当前楼层数（消息总数）
     * @param options 查询选项
     */
    static getFloorCount(options: GetMessagesOptions = {}): number {
        return this.getAllMessages(options).length;
    }

    /**
     * 获取最后一条消息
     * @param options 查询选项
     */
    static getLastMessage(options: GetMessagesOptions = {}): TavernMessage | null {
        const messages = this.getAllMessages(options);
        return messages.length > 0 ? messages[messages.length - 1] : null;
    }

    /**
     * 获取当前角色名称
     */
    static getCurrentCharacterName(): string | null {
        const context = getSTContext();
        if (!context?.characters || context.characterId < 0) {
            return null;
        }
        return context.characters[context.characterId]?.name || null;
    }

    /**
     * 格式化消息为纯文本（用于传给 LLM）
     * @param messages 消息数组
     * @param format 格式化模板
     */
    static formatMessagesAsText(
        messages: TavernMessage[],
        format: 'simple' | 'detailed' = 'simple'
    ): string {
        if (format === 'simple') {
            return messages
                .map(m => `${m.name}: ${m.content}`)
                .join('\n\n');
        }

        return messages
            .map(m => `[${m.role.toUpperCase()}] ${m.name}:\n${m.content}`)
            .join('\n\n---\n\n');
    }

    /**
     * 检查 MessageService 是否可用
     */
    static isAvailable(): boolean {
        return isSTAvailable();
    }
}

export default MessageService;

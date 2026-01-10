import { create } from 'zustand';
import { getDbForChat, tryGetDbForChat, type ChatDatabase } from '@/services/database/db';
import { chatManager } from '@/services/database/ChatManager';
import { WorldInfoService } from '@/tavern/api';
import { getCurrentChatId } from '@/tavern/context';
import type { EventNode, ScopeState } from '@/services/types/graph';

interface MemoryState {
    /** 当前 chatId */
    currentChatId: string | null;
    /** 上次总结的楼层 */
    lastSummarizedFloor: number;
    /** 是否正在处理 */
    isProcessing: boolean;
    /** 最近写入的事件 */
    recentEvents: EventNode[];

    // Actions
    /** 初始化/切换聊天 (返回数据库实例) */
    initChat: () => Promise<ChatDatabase | null>;
    /** 写入事件到当前聊天的 DB */
    saveEvent: (event: Omit<EventNode, 'id' | 'timestamp'>) => Promise<EventNode>;
    /** 获取当前聊天的所有事件摘要 (用于宏组装)
     * @param recalledIds 可选，RAG 召回的事件 ID 列表（绿灯事件临时显示）
     */
    getEventSummaries: (recalledIds?: string[]) => Promise<string>;
    /** 统计当前聊天的事件 Token 数 */
    countEventTokens: () => Promise<{ totalTokens: number; eventCount: number }>;
    /** 更新最后总结楼层 */
    setLastSummarizedFloor: (floor: number) => Promise<void>;
    /** 设置处理状态 */
    setProcessing: (isProcessing: boolean) => void;
    /** 重置状态 */
    reset: () => void;
    // Trim 相关
    /** 获取可合并的事件 (排除最近 N 条) */
    getEventsToMerge: (keepRecentCount?: number) => Promise<EventNode[]>;
    /** 删除指定的事件 */
    deleteEvents: (eventIds: string[]) => Promise<void>;
    /** 获取当前聊天的所有事件 */
    getAllEvents: () => Promise<EventNode[]>;
    /** 归档事件 (Trim Linkage) */
    archiveEvents: (eventIds: string[]) => Promise<void>;
    /** 标记事件为已嵌入 (Trim Linkage) */
    markEventsAsEmbedded: (eventIds: string[]) => Promise<void>;

    // V0.6 兼容层
    /** @deprecated 使用 initChat 替代 */
    resolveScope: (chatId: string, characterName?: string) => Promise<{ id: number }>;
    /** @deprecated 直接使用 chatManager.getCurrentDb() */
    currentScope: { id: number } | null;
}

/**
 * 获取当前聊天的数据库实例 (会自动创建)
 */
function getCurrentDb(): ChatDatabase | null {
    const chatId = getCurrentChatId();
    if (!chatId) return null;
    return getDbForChat(chatId);
}

/**
 * 尝试获取当前聊天的数据库实例 (不会自动创建)
 */
function tryGetCurrentDb(): ChatDatabase | null {
    const chatId = getCurrentChatId();
    if (!chatId) return null;
    return tryGetDbForChat(chatId);
}

/**
 * Memory Store
 */
export const useMemoryStore = create<MemoryState>((set, get) => ({
    currentChatId: null,
    lastSummarizedFloor: 0,
    isProcessing: false,
    recentEvents: [],

    // V0.6 兼容层
    currentScope: null,
    resolveScope: async (chatId, _characterName) => {
        // 兼容旧代码，返回一个假的 scope 对象
        set({ currentChatId: chatId, currentScope: { id: 1 } });
        const state = await chatManager.getState();
        set({ lastSummarizedFloor: state.last_summarized_floor });
        return { id: 1 };
    },

    initChat: async () => {
        const chatId = getCurrentChatId();
        if (!chatId) {
            console.warn('[MemoryStore] No chat_id available');
            return null;
        }

        if (chatId !== get().currentChatId) {
            console.debug(`[MemoryStore] Switching to chat: ${chatId}`);
            const state = await chatManager.getState();
            set({
                currentChatId: chatId,
                currentScope: { id: 1 }, // 兼容
                lastSummarizedFloor: state.last_summarized_floor,
                recentEvents: []
            });
        }

        return getDbForChat(chatId);
    },

    saveEvent: async (eventData) => {
        const db = getCurrentDb();
        if (!db) {
            throw new Error('[MemoryStore] No current chat');
        }

        const event: EventNode = {
            ...eventData,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            is_embedded: eventData.is_embedded ?? false, // V0.7: 默认未嵌入
            is_archived: eventData.is_archived ?? false, // V0.7: 默认未归档
        };

        await db.events.add(event);

        set(state => ({
            recentEvents: [...state.recentEvents, event].slice(-10)
        }));

        return event;
    },

    getEventSummaries: async (recalledIds?: string[]) => {
        // V0.6: 使用 tryGetCurrentDb 避免自动创建数据库
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const events = await db.events.toArray();

            if (events.length === 0) return '';

            // V0.7.1: 可见性过滤 (类似世界书蓝灯/绿灯)
            // - Level 1+ (大纲) → 总是显示
            // - Level 0 未归档 (蓝灯) → 总是显示
            // - Level 0 已归档 (绿灯) → 仅当被 RAG 召回时显示
            const recalledSet = recalledIds ? new Set(recalledIds) : null;
            const visibleEvents = events.filter(e =>
                e.level >= 1 ||                    // 大纲总是显示
                !e.is_archived ||                  // 蓝灯：未归档
                recalledSet?.has(e.id)             // 绿灯：被 RAG 召回
            );

            if (visibleEvents.length === 0) return '';

            // V0.7.1: 双层排序
            // 1. 主键：source_range.start_index (消息时间线)
            // 2. 次键：source_range.end_index (范围更大的排后，Level 1 大纲在细节之后)
            // 3. 兜底：timestamp (创建时间)
            visibleEvents.sort((a, b) => {
                const startA = a.source_range?.start_index ?? 0;
                const startB = b.source_range?.start_index ?? 0;
                if (startA !== startB) return startA - startB;

                const endA = a.source_range?.end_index ?? 0;
                const endB = b.source_range?.end_index ?? 0;
                if (endA !== endB) return endA - endB;

                return a.timestamp - b.timestamp;
            });

            const summaries = visibleEvents.map(e => e.summary).join('\n\n');
            return `<summary>\n${summaries}\n</summary>`;
        } catch (e) {
            console.error('[MemoryStore] Failed to get event summaries:', e);
            return '';
        }
    },

    countEventTokens: async () => {
        const db = getCurrentDb();
        if (!db) return { totalTokens: 0, eventCount: 0 };

        try {
            const events = await db.events.toArray();
            if (events.length === 0) return { totalTokens: 0, eventCount: 0 };

            const allSummaries = events.map(e => e.summary).join('\n\n');
            const totalTokens = await WorldInfoService.countTokens(allSummaries);

            return { totalTokens, eventCount: events.length };
        } catch (e) {
            console.error('[MemoryStore] Failed to count event tokens:', e);
            return { totalTokens: 0, eventCount: 0 };
        }
    },

    setLastSummarizedFloor: async (floor) => {
        await chatManager.updateState({ last_summarized_floor: floor });
        set({ lastSummarizedFloor: floor });
    },

    setProcessing: (isProcessing) => set({ isProcessing }),

    reset: () => set({
        currentChatId: null,
        currentScope: null,
        lastSummarizedFloor: 0,
        isProcessing: false,
        recentEvents: []
    }),

    // ==================== Trim 相关方法 ====================

    /**
     * 批量标记事件为已归档
     */
    archiveEvents: async (eventIds: string[]) => {
        if (eventIds.length === 0) return;
        const db = getCurrentDb();
        if (!db) return;
        try {
            await db.events.where('id').anyOf(eventIds).modify({ is_archived: true });
            console.log(`[MemoryStore] Archived ${eventIds.length} events`);
        } catch (e) {
            console.error('[MemoryStore] Failed to archive events:', e);
        }
    },

    /**
     * 批量标记事件为已嵌入
     */
    markEventsAsEmbedded: async (eventIds: string[]) => {
        if (eventIds.length === 0) return;
        const db = getCurrentDb();
        if (!db) return;
        try {
            await db.events.where('id').anyOf(eventIds).modify({ is_embedded: true });
            console.log(`[MemoryStore] Marked ${eventIds.length} events as embedded`);
        } catch (e) {
            console.error('[MemoryStore] Failed to mark events as embedded:', e);
        }
    },

    getEventsToMerge: async (keepRecentCount = 3) => {
        const db = getCurrentDb();
        if (!db) return [];

        try {
            const events = await db.events
                .orderBy('timestamp')
                .toArray();

            if (events.length <= keepRecentCount) return [];

            return events.slice(0, events.length - keepRecentCount);
        } catch (e) {
            console.error('[MemoryStore] Failed to get events to merge:', e);
            return [];
        }
    },

    deleteEvents: async (eventIds: string[]) => {
        if (eventIds.length === 0) return;

        const db = getCurrentDb();
        if (!db) return;

        try {
            await db.events.bulkDelete(eventIds);
            console.log(`[MemoryStore] Deleted ${eventIds.length} events`);
        } catch (e) {
            console.error('[MemoryStore] Failed to delete events:', e);
            throw e;
        }
    },

    getAllEvents: async () => {
        const db = getCurrentDb();
        if (!db) return [];

        try {
            return await db.events
                .orderBy('timestamp')
                .toArray();
        } catch (e) {
            console.error('[MemoryStore] Failed to get all events:', e);
            return [];
        }
    }
}));

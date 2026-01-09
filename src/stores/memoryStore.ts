/**
 * Memory Store - 记忆状态管理
 *
 * 位于 L3 状态层 (Zustand)
 * 负责：
 * - DB 读写 (EventNode, Scope)
 * - WorldBook 写入
 * - 当前进度缓存
 */

import { create } from 'zustand';
import { db } from '@/services/database/db';
import { scopeManager } from '@/services/database/ScopeManager';
import { WorldInfoService } from '@/tavern/api';
import type { EventNode, Scope } from '@/services/types/graph';

interface MemoryState {
    /** 当前 Scope */
    currentScope: Scope | null;
    /** 上次总结的楼层 */
    lastSummarizedFloor: number;
    /** 是否正在处理 */
    isProcessing: boolean;
    /** 最近写入的事件 */
    recentEvents: EventNode[];

    // Actions
    /** 解析/创建当前 Scope (V0.5: 仅用 chatId) */
    resolveScope: (chatId: string, characterName?: string) => Promise<Scope>;
    /** 写入事件到 DB */
    saveEvent: (event: Omit<EventNode, 'id' | 'timestamp'>) => Promise<EventNode>;
    /** 获取当前 Scope 的所有事件摘要 (用于宏组装) */
    getEventSummaries: () => Promise<string>;
    /** 统计当前 Scope 的事件 Token 数 */
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
    /** 获取当前 Scope 的所有事件 */
    getAllEvents: () => Promise<EventNode[]>;
}

/**
 * Memory Store
 */
export const useMemoryStore = create<MemoryState>((set, get) => ({
    currentScope: null,
    lastSummarizedFloor: 0,
    isProcessing: false,
    recentEvents: [],

    resolveScope: async (chatId, characterName) => {
        const scope = await scopeManager.resolveScope(chatId, characterName || 'Unknown');
        set({
            currentScope: scope,
            lastSummarizedFloor: scope.state.last_summarized_floor
        });
        return scope;
    },

    saveEvent: async (eventData) => {
        const scope = get().currentScope;
        if (!scope?.id) {
            throw new Error('[MemoryStore] No current scope');
        }

        const event: EventNode = {
            ...eventData,
            id: crypto.randomUUID(),
            scope_id: scope.id,
            timestamp: Date.now()
        };

        await db.events.add(event);

        set(state => ({
            recentEvents: [...state.recentEvents, event].slice(-10) // 保留最近 10 条
        }));

        return event;
    },

    /**
     * 获取当前 Scope 的所有事件摘要
     * 用于 {{engramSummaries}} 宏组装
     * 返回格式：<summary>\n事件1\n事件2...\n</summary>
     */
    getEventSummaries: async () => {
        const scope = get().currentScope;
        if (!scope?.id) {
            return '';
        }

        try {
            // 从 IndexedDB 读取当前 Scope 的所有事件，按时间排序
            const events = await db.events
                .where('scope_id')
                .equals(scope.id)
                .sortBy('timestamp');

            if (events.length === 0) {
                return '';
            }

            // 组装为 XML 包裹的摘要列表
            const summaries = events.map(e => e.summary).join('\n\n');
            return `<summary>\n${summaries}\n</summary>`;
        } catch (e) {
            console.error('[MemoryStore] Failed to get event summaries:', e);
            return '';
        }
    },

    /**
     * 统计当前 Scope 的事件 Token 数
     * 使用 WorldInfoService.countTokens() 调用 ST tokenizer
     */
    countEventTokens: async () => {
        const scope = get().currentScope;
        if (!scope?.id) {
            return { totalTokens: 0, eventCount: 0 };
        }

        try {
            const events = await db.events
                .where('scope_id')
                .equals(scope.id)
                .toArray();

            if (events.length === 0) {
                return { totalTokens: 0, eventCount: 0 };
            }

            // 合并所有 summary 计算 Token
            const allSummaries = events.map(e => e.summary).join('\n\n');
            const totalTokens = await WorldInfoService.countTokens(allSummaries);

            return { totalTokens, eventCount: events.length };
        } catch (e) {
            console.error('[MemoryStore] Failed to count event tokens:', e);
            return { totalTokens: 0, eventCount: 0 };
        }
    },

    setLastSummarizedFloor: async (floor) => {
        const scope = get().currentScope;
        if (scope?.id) {
            await scopeManager.updateState(scope.id, {
                last_summarized_floor: floor
            });
        }
        set({ lastSummarizedFloor: floor });
    },

    setProcessing: (isProcessing) => set({ isProcessing }),

    reset: () => set({
        currentScope: null,
        lastSummarizedFloor: 0,
        isProcessing: false,
        recentEvents: []
    }),

    // ==================== Trim 相关方法 ====================

    /**
     * 获取可合并的事件 (排除最近 N 条)
     * @param keepRecentCount 保留最近 N 条不合并
     */
    getEventsToMerge: async (keepRecentCount = 3) => {
        const scope = get().currentScope;
        if (!scope?.id) return [];

        try {
            const events = await db.events
                .where('scope_id')
                .equals(scope.id)
                .sortBy('timestamp');

            if (events.length <= keepRecentCount) {
                return [];
            }

            // 返回除了最后 keepRecentCount 条之外的所有事件
            return events.slice(0, events.length - keepRecentCount);
        } catch (e) {
            console.error('[MemoryStore] Failed to get events to merge:', e);
            return [];
        }
    },

    /**
     * 删除指定的事件
     * @param eventIds 要删除的事件 ID 列表
     */
    deleteEvents: async (eventIds: string[]) => {
        if (eventIds.length === 0) return;

        try {
            await db.events.bulkDelete(eventIds);
            console.log(`[MemoryStore] Deleted ${eventIds.length} events`);
        } catch (e) {
            console.error('[MemoryStore] Failed to delete events:', e);
            throw e;
        }
    },

    /**
     * 获取当前 Scope 的所有事件
     */
    getAllEvents: async () => {
        const scope = get().currentScope;
        if (!scope?.id) return [];

        try {
            return await db.events
                .where('scope_id')
                .equals(scope.id)
                .sortBy('timestamp');
        } catch (e) {
            console.error('[MemoryStore] Failed to get all events:', e);
            return [];
        }
    }
}));


import { generateUUID } from '@/core/utils';
import { chatManager } from '@/data/ChatManager';
import { deleteDatabase, getDbForChat, tryGetDbForChat, type ChatDatabase } from '@/data/db';
import type { EntityNode, EventNode } from '@/data/types/graph';
import { WorldInfoService } from '@/integrations/tavern/api';
import { getCurrentChatId } from '@/integrations/tavern/context';
import { create } from 'zustand';

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
    /** 批量写入事件 */
    saveEvents: (events: Omit<EventNode, 'id' | 'timestamp'>[]) => Promise<EventNode[]>;
    /** 获取当前聊天的所有事件摘要 (用于宏组装)
     * @param recalledIds 可选，RAG 召回的事件 ID 列表（绿灯事件临时显示）
     */
    getEventSummaries: (recalledIds?: string[]) => Promise<string>;
    /** 统计当前聊天的事件 Token 数和数量 */
    countEventTokens: () => Promise<{ totalTokens: number; eventCount: number; activeEventCount: number }>;
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
    /** 更新指定的事件 */
    updateEvent: (eventId: string, updates: Partial<EventNode>) => Promise<void>;
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

    // ==================== V0.9 实体相关 ====================
    /** 获取所有实体 */
    getAllEntities: () => Promise<EntityNode[]>;
    /** 保存实体 */
    saveEntity: (entity: Omit<EntityNode, 'id' | 'last_updated_at'>) => Promise<EntityNode>;
    /** 批量保存实体 (用于提取) */
    saveEntities: (entities: Omit<EntityNode, 'id' | 'last_updated_at'>[]) => Promise<EntityNode[]>;
    /** 更新实体 */
    updateEntity: (entityId: string, updates: Partial<EntityNode>) => Promise<void>;
    /** 删除实体 */
    deleteEntity: (entityId: string) => Promise<void>;
    /** 批量删除实体 */
    deleteEntities: (entityIds: string[]) => Promise<void>;
    /** 根据名称查找实体 (包含别名匹配) */
    findEntityByName: (name: string) => Promise<EntityNode | null>;
    /** V0.9.2: 获取归档事件摘要 (绿灯事件) */
    /** V0.9.2: 获取归档事件摘要 (绿灯事件) */
    getArchivedEventSummaries: () => Promise<string>;
    /** V1.0.0: 获取实体状态 (分类型 XML 标签包裹) */
    getEntityStates: () => Promise<string>;

    // ==================== 数据库管理 ====================
    /** 清空当前聊天数据库 (重置) */
    clearChatDatabase: () => Promise<void>;
    /** 删除当前聊天数据库 (删库) */
    deleteChatDatabase: () => Promise<void>;
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
            id: generateUUID(),
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

    saveEvents: async (eventsData) => {
        const db = getCurrentDb();
        if (!db) {
            throw new Error('[MemoryStore] No current chat');
        }
        if (eventsData.length === 0) return [];

        const events: EventNode[] = eventsData.map(data => ({
            ...data,
            id: generateUUID(),
            timestamp: Date.now(),
            is_embedded: data.is_embedded ?? false,
            is_archived: data.is_archived ?? false,
        }));

        await db.events.bulkAdd(events);

        set(state => ({
            recentEvents: [...state.recentEvents, ...events].slice(-10)
        }));

        return events;
    },

    getEventSummaries: async (recalledIds?: string[]) => {
        // V0.6: 使用 tryGetCurrentDb 避免自动创建数据库
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const events = await db.events.toArray();

            if (events.length === 0) return '';

            // V1.0.2: 可见性过滤 + 树状缩进格式
            // - Level 1+ (大纲) → 总是显示（作为父节点）
            // - Level 0 未归档 (蓝灯) → 总是显示（无缩进）
            // - Level 0 已归档 (绿灯) → 仅当被 RAG 召回时显示（作为子节点，带缩进）
            const recalledSet = recalledIds ? new Set(recalledIds) : null;

            // 分离不同类型的事件
            const level1Events = events.filter(e => e.level >= 1);
            const level0Unarchived = events.filter(e => e.level === 0 && !e.is_archived);
            const level0ArchivedRecalled = events.filter(e =>
                e.level === 0 && e.is_archived && recalledSet?.has(e.id)
            );

            // 按 source_range.start_index 排序的辅助函数
            const sortByRange = (a: EventNode, b: EventNode) => {
                const startA = a.source_range?.start_index ?? 0;
                const startB = b.source_range?.start_index ?? 0;
                if (startA !== startB) return startA - startB;
                const endA = a.source_range?.end_index ?? 0;
                const endB = b.source_range?.end_index ?? 0;
                if (endA !== endB) return endA - endB;
                return a.timestamp - b.timestamp;
            };

            level1Events.sort(sortByRange);
            level0Unarchived.sort(sortByRange);
            level0ArchivedRecalled.sort(sortByRange);

            // 构建树状结构输出
            const lines: string[] = [];

            // 辅助函数：检查 level0 事件是否在 level1 的覆盖范围内
            const isWithinRange = (child: EventNode, parent: EventNode): boolean => {
                const childStart = child.source_range?.start_index ?? 0;
                const childEnd = child.source_range?.end_index ?? 0;
                const parentStart = parent.source_range?.start_index ?? 0;
                const parentEnd = parent.source_range?.end_index ?? 0;
                return childStart >= parentStart && childEnd <= parentEnd;
            };

            // 已处理的召回事件 ID（避免重复输出）
            const processedRecalledIds = new Set<string>();

            // 1. 输出 level1 节点及其子节点
            for (const l1 of level1Events) {
                // 输出 level1 大纲（无缩进）
                lines.push(l1.summary);

                // 查找属于此 level1 范围内的已召回 level0 事件（作为子节点）
                for (const l0 of level0ArchivedRecalled) {
                    if (isWithinRange(l0, l1) && !processedRecalledIds.has(l0.id)) {
                        // 缩进 2 空格
                        lines.push(`  ${l0.summary}`);
                        processedRecalledIds.add(l0.id);
                    }
                }
            }

            // 2. 输出不属于任何 level1 范围的召回事件
            for (const l0 of level0ArchivedRecalled) {
                if (!processedRecalledIds.has(l0.id)) {
                    lines.push(l0.summary);
                    processedRecalledIds.add(l0.id);
                }
            }

            // 3. 输出未归档的 level0 事件（最新事件，无缩进）
            for (const l0 of level0Unarchived) {
                lines.push(l0.summary);
            }

            if (lines.length === 0) return '';
            return `<summary>\n${lines.join('\n\n')}\n</summary>`;
        } catch (e) {
            console.error('[MemoryStore] Failed to get event summaries:', e);
            return '';
        }
    },

    countEventTokens: async () => {
        const db = getCurrentDb();
        if (!db) return { totalTokens: 0, eventCount: 0, activeEventCount: 0 };

        try {
            const events = await db.events.toArray();
            if (events.length === 0) return { totalTokens: 0, eventCount: 0, activeEventCount: 0 };

            // V0.7.1: 统计未归档事件数 (蓝灯数)
            const activeEvents = events.filter(e => !e.is_archived);
            const allSummaries = activeEvents.map(e => e.summary).join('\n\n');
            const totalTokens = await WorldInfoService.countTokens(allSummaries);

            return {
                totalTokens,
                eventCount: events.length,
                activeEventCount: activeEvents.length  // 蓝灯数
            };
        } catch (e) {
            console.error('[MemoryStore] Failed to count event tokens:', e);
            return { totalTokens: 0, eventCount: 0, activeEventCount: 0 };
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

            // V1.0.2: 只选择 level 0 且未归档的事件进行合并
            // Level 1+ 的大纲节点不应被再次 trim
            const eligibleEvents = events.filter(e => e.level === 0 && !e.is_archived);

            if (eligibleEvents.length <= keepRecentCount) return [];

            // 保留最近 N 条，返回其余的待合并事件
            return eligibleEvents.slice(0, eligibleEvents.length - keepRecentCount);
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

    /**
     * 更新指定的事件
     */
    updateEvent: async (eventId: string, updates: Partial<EventNode>) => {
        if (!eventId) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            // 不允许修改 id 和 timestamp
            const { id: _id, timestamp: _ts, ...safeUpdates } = updates as any;
            await db.events.update(eventId, safeUpdates);
            console.log(`[MemoryStore] Updated event: ${eventId}`, safeUpdates);
        } catch (e) {
            console.error('[MemoryStore] Failed to update event:', e);
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
    },

    // ==================== V0.9 实体相关 ====================

    getAllEntities: async () => {
        const db = getCurrentDb();
        if (!db) return [];

        try {
            return await db.entities.toArray();
        } catch (e) {
            console.error('[MemoryStore] Failed to get all entities:', e);
            return [];
        }
    },

    saveEntity: async (entityData) => {
        const db = getCurrentDb();
        if (!db) {
            throw new Error('[MemoryStore] No current chat');
        }

        // V0.9.4: 确保必要字段有默认值
        const entity: EntityNode = {
            ...entityData,
            id: generateUUID(),
            last_updated_at: Date.now(),
            aliases: entityData.aliases || [],
            profile: entityData.profile || {},
        };

        await db.entities.add(entity);
        console.log(`[MemoryStore] Saved entity: ${entity.name}`);
        return entity;
    },

    saveEntities: async (entitiesData) => {
        const db = getCurrentDb();
        if (!db) {
            throw new Error('[MemoryStore] No current chat');
        }
        if (entitiesData.length === 0) return [];

        const entities: EntityNode[] = entitiesData.map(data => ({
            ...data,
            id: generateUUID(),
            last_updated_at: Date.now(),
            aliases: data.aliases || [],
            profile: data.profile || {},
        }));

        await db.entities.bulkAdd(entities);
        console.log(`[MemoryStore] Bulk saved ${entities.length} entities`);
        return entities;
    },

    updateEntity: async (entityId, updates) => {
        if (!entityId) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            const { id: _id, ...safeUpdates } = updates as any;

            // V1.2.9: Get existing entity first, then put with merged data
            const existing = await db.entities.get(entityId);
            if (!existing) {
                console.warn(`[MemoryStore] Entity not found for update: ${entityId}`);
                return;
            }

            // DEBUG: Log values
            console.log('[MemoryStore] Existing entity:', existing);
            console.log('[MemoryStore] Updates to apply:', safeUpdates);

            // Merge and put (more reliable than update())
            const merged = {
                ...existing,
                ...safeUpdates,
                last_updated_at: Date.now(),
            };

            console.log('[MemoryStore] Merged entity:', merged);

            await db.entities.put(merged);
            console.log(`[MemoryStore] Put completed for entity: ${entityId}`);
        } catch (e) {
            console.error('[MemoryStore] Failed to update entity:', e);
            throw e;
        }
    },

    deleteEntity: async (entityId) => {
        if (!entityId) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            // Force use of bulkDelete (consistent with deleteEvents/deleteEntities)
            await db.entities.bulkDelete([entityId]);
            console.log(`[MemoryStore] Deleted entity: ${entityId}`);
        } catch (e) {
            console.error('[MemoryStore] Failed to delete entity:', e);
            throw e;
        }
    },

    /**
     * 批量删除实体
     */
    deleteEntities: async (entityIds: string[]) => {
        if (entityIds.length === 0) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            await db.entities.bulkDelete(entityIds);
            console.log(`[MemoryStore] Deleted ${entityIds.length} entities`);
        } catch (e) {
            console.error('[MemoryStore] Failed to delete entities:', e);
            throw e;
        }
    },

    findEntityByName: async (name) => {
        const db = getCurrentDb();
        if (!db) return null;

        try {
            // 1. 精确名称匹配
            const exactMatch = await db.entities.where('name').equals(name).first();
            if (exactMatch) return exactMatch;

            // 2. V0.9.4: 使用 MultiEntry 索引查询别名
            const aliasMatch = await db.entities.where('aliases').equals(name).first();
            return aliasMatch || null;
        } catch (e) {
            console.error('[MemoryStore] Failed to find entity by name:', e);
            return null;
        }
    },

    /**
     * V0.9.2: 获取归档事件摘要 (绿灯事件)
     * 仅返回 is_archived=true 的事件
     */
    getArchivedEventSummaries: async () => {
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const events = await db.events.toArray();
            // 过滤出已归档的事件
            const archivedEvents = events.filter(e => e.is_archived === true);

            if (archivedEvents.length === 0) return '';

            // 按时间线排序
            archivedEvents.sort((a, b) => {
                const startA = a.source_range?.start_index ?? 0;
                const startB = b.source_range?.start_index ?? 0;
                if (startA !== startB) return startA - startB;
                return a.timestamp - b.timestamp;
            });

            const summaries = archivedEvents.map(e => e.summary).join('\n\n');
            return `<archived_summary>\n${summaries}\n</archived_summary>`;
        } catch (e) {
            console.error('[MemoryStore] Failed to get archived event summaries:', e);
            return '';
        }
    },

    /**
     * V1.0.0: 获取实体状态 (分类型 XML 标签包裹)
     * 按 EntityType 分组，使用不同的 XML 标签包裹
     */
    getEntityStates: async () => {
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const entities = await db.entities.toArray();
            if (entities.length === 0) return '';

            // 按类型分组
            const groups: Record<string, EntityNode[]> = {
                char: [],
                loc: [],
                item: [],
                concept: [],
                unknown: [],
            };

            for (const entity of entities) {
                const typeKey = entity.type || 'unknown';
                if (groups[typeKey]) {
                    groups[typeKey].push(entity);
                } else {
                    groups.unknown.push(entity);
                }
            }

            // 类型 -> XML 标签映射
            const tagMap: Record<string, string> = {
                char: 'character_state',
                loc: 'scene_state',
                item: 'item_state',
                concept: 'concept_state',
                unknown: 'entity_state',
            };

            // 组装输出
            const sections: string[] = [];
            for (const [typeKey, entityList] of Object.entries(groups)) {
                if (entityList.length === 0) continue;

                const tag = tagMap[typeKey];
                // 使用 description 字段（已是 YAML 格式），用 --- 分隔每个实体
                const contents = entityList
                    .map(e => e.description || `# ${e.name}\n(无详细信息)`)
                    .join('\n---\n');

                sections.push(`<${tag}>\n${contents}\n</${tag}>`);
            }

            return sections.join('\n\n');
        } catch (e) {
            console.error('[MemoryStore] Failed to get entity states:', e);
            return '';
        }
    },

    // ==================== 数据库管理 ====================

    clearChatDatabase: async () => {
        const db = getCurrentDb();
        if (!db) return;

        try {
            await db.transaction('rw', db.events, db.entities, db.meta, async () => {
                await db.events.clear();
                await db.entities.clear();
                await db.meta.clear();
            });
            // 重置状态
            set({
                lastSummarizedFloor: 0,
                recentEvents: []
            });
            console.info('[MemoryStore] Database cleared successfully');
        } catch (e) {
            console.error('[MemoryStore] Failed to clear database:', e);
            throw e;
        }
    },

    deleteChatDatabase: async () => {
        const chatId = get().currentChatId;
        if (!chatId) return;

        try {
            // 删除数据库文件
            await deleteDatabase(chatId);
            // 重置状态
            get().reset();
            console.info('[MemoryStore] Database deleted successfully');
        } catch (e) {
            console.error('[MemoryStore] Failed to delete database:', e);
            throw e;
        }
    }
}));

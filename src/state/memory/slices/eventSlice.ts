import { generateShortUUID } from '@/core/utils';
import type { EventNode } from '@/data/types/graph';
import { WorldInfoService } from '@/integrations/tavern';
import { StateCreator } from 'zustand';
import { getCurrentDb, tryGetCurrentDb } from './coreSlice';

export interface EventState {
    saveEvent: (event: Omit<EventNode, 'id' | 'timestamp'> & { timestamp?: number }) => Promise<EventNode>;
    saveEvents: (events: (Omit<EventNode, 'id' | 'timestamp'> & { timestamp?: number })[]) => Promise<EventNode[]>;
    importDatabase: (sourceDbName: string) => Promise<{ events: number, entities: number }>;
    getEventSummaries: (recalledIds?: string[]) => Promise<string>;
    countEventTokens: () => Promise<{ totalTokens: number; eventCount: number; activeEventCount: number }>;

    getEventsToMerge: (keepRecentCount?: number) => Promise<EventNode[]>;
    deleteEvents: (eventIds: string[]) => Promise<void>;
    updateEvent: (eventId: string, updates: Partial<EventNode>) => Promise<void>;
    updateEvents: (updates: { id: string, updates: Partial<EventNode> }[]) => Promise<void>;
    getAllEvents: () => Promise<EventNode[]>;
    archiveEvents: (eventIds: string[]) => Promise<void>;
    markEventsAsEmbedded: (eventIds: string[]) => Promise<void>;
    toggleEventLock: (eventId: string) => Promise<boolean>;
    getArchivedEventSummaries: () => Promise<string>;
    /** Agentic RAG: 构建双层 XML 目录索引 (极简 structured_kv，不含 summary) */
    getAgenticIndex: () => Promise<string>;
    /** Agentic RAG: 仅返回纯蓝灯事件的完整 summary */
    getPureActiveEvents: () => Promise<string>;
}

export const createEventSlice: StateCreator<any, [], [], EventState> = (set, get) => ({
    saveEvent: async (eventData) => {
        const db = getCurrentDb();
        if (!db) throw new Error('[MemoryStore] No current chat');

        const event: EventNode = {
            ...eventData,
            id: generateShortUUID('evt_'),
            timestamp: eventData.timestamp ?? Date.now(),
            is_embedded: eventData.is_embedded ?? false,
            is_archived: eventData.is_archived ?? false,
        };

        await db.events.add(event);

        set((state: any) => ({
            recentEvents: [...state.recentEvents, event].slice(-10)
        }));

        return event;
    },

    saveEvents: async (eventsData) => {
        const db = getCurrentDb();
        if (!db) throw new Error('[MemoryStore] No current chat');
        if (eventsData.length === 0) return [];

        const events: EventNode[] = eventsData.map(data => ({
            ...data,
            id: generateShortUUID('evt_'),
            timestamp: data.timestamp ?? Date.now(),
            is_embedded: data.is_embedded ?? false,
            is_archived: data.is_archived ?? false,
        }));

        await db.events.bulkAdd(events);

        set((state: any) => ({
            recentEvents: [...state.recentEvents, ...events].slice(-10)
        }));

        return events;
    },

    importDatabase: async (sourceDbName: string) => {
        const destDb = getCurrentDb();
        if (!destDb) throw new Error('[MemoryStore] No current chat context to import into');

        const Dexie = (await import('dexie')).default;
        const sourceDb = new Dexie(sourceDbName);
        sourceDb.version(3).stores({
            events: 'id, timestamp, level, is_archived, [source_range.start_index+source_range.end_index]',
            entities: 'id, name, last_updated_at',
            meta: 'key'
        });

        try {
            if (!(await Dexie.exists(sourceDbName))) {
                throw new Error(`Database ${sourceDbName} does not exist`);
            }
            await sourceDb.open();

            const allEvents = await sourceDb.table('events').toArray();
            const allEntities = await sourceDb.table('entities').toArray();

            if (allEvents.length > 0) await destDb.events.bulkPut(allEvents);
            if (allEntities.length > 0) await destDb.entities.bulkPut(allEntities);

            return { events: allEvents.length, entities: allEntities.length };
        } finally {
            if (sourceDb.isOpen()) sourceDb.close();
        }
    },

    getEventSummaries: async (recalledIds?: string[]) => {
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const events = await db.events.toArray();
            if (events.length === 0) return '';

            const recalledSet = recalledIds ? new Set(recalledIds) : null;
            const targetEvents = events.filter(e => {
                if (e.level >= 1) return true;
                if (!e.is_archived) return true;
                if (e.is_archived && recalledSet?.has(e.id)) return true;
                return false;
            });

            targetEvents.sort((a, b) => a.timestamp - b.timestamp);

            const lines: string[] = [];
            let hasParent = false;

            for (const node of targetEvents) {
                if (node.level >= 1) {
                    lines.push(node.summary);
                    hasParent = true;
                } else if (node.is_archived) {
                    if (hasParent) {
                        lines.push(`  ${node.summary}`);
                    } else {
                        lines.push(node.summary);
                    }
                } else {
                    lines.push(node.summary);
                }
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

            const activeEvents = events.filter(e => !e.is_archived);
            const allSummaries = activeEvents.map(e => e.summary).join('\n\n');
            const totalTokens = await WorldInfoService.countTokens(allSummaries);

            return {
                totalTokens,
                eventCount: events.length,
                activeEventCount: activeEvents.length
            };
        } catch (e) {
            console.error('[MemoryStore] Failed to count event tokens:', e);
            return { totalTokens: 0, eventCount: 0, activeEventCount: 0 };
        }
    },

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
            const events = await db.events.orderBy('timestamp').toArray();
            // V1.4.2: 增加 !e.is_locked 过滤点，锁定事件不参与精简合并
            const eligibleEvents = events.filter(e => e.level === 0 && !e.is_archived && !e.is_locked);

            if (eligibleEvents.length <= keepRecentCount) return [];
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

    updateEvent: async (eventId: string, updates: Partial<EventNode>) => {
        if (!eventId) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            const { id: _id, timestamp: _ts, ...safeUpdates } = updates as any;
            await db.events.update(eventId, safeUpdates);
            console.log(`[MemoryStore] Updated event: ${eventId}`, safeUpdates);
        } catch (e) {
            console.error('[MemoryStore] Failed to update event:', e);
            throw e;
        }
    },

    updateEvents: async (updatesList) => {
        if (updatesList.length === 0) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            await db.transaction('rw', db.events, async () => {
                for (const { id, updates } of updatesList) {
                    const { id: _id, timestamp: _ts, ...safeUpdates } = updates as any;
                    await db.events.update(id, safeUpdates);
                }
            });
            console.log(`[MemoryStore] Batch updated ${updatesList.length} events`);
        } catch (e) {
            console.error('[MemoryStore] Failed to batch update events:', e);
            throw e;
        }
    },

    toggleEventLock: async (eventId: string) => {
        if (!eventId) return false;
        const db = getCurrentDb();
        if (!db) return false;

        try {
            const existing = await db.events.get(eventId);
            if (!existing) return false;

            const newLockState = !existing.is_locked;
            await db.events.update(eventId, { is_locked: newLockState });
            console.log(`[MemoryStore] Toggled event lock: ${eventId} -> ${newLockState}`);
            return newLockState;
        } catch (e) {
            console.error('[MemoryStore] Failed to toggle event lock:', e);
            return false;
        }
    },

    getAllEvents: async () => {
        const db = getCurrentDb();
        if (!db) return [];

        try {
            return await db.events.orderBy('timestamp').toArray();
        } catch (e) {
            console.error('[MemoryStore] Failed to get all events:', e);
            return [];
        }
    },

    getArchivedEventSummaries: async () => {
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const events = await db.events.toArray();
            const archivedEvents = events.filter(e => e.is_archived === true);

            if (archivedEvents.length === 0) return '';
            archivedEvents.sort((a, b) => a.timestamp - b.timestamp);

            const summaries = archivedEvents.map(e => e.summary).join('\n\n');
            return `<archived_summary>\n${summaries}\n</archived_summary>`;
        } catch (e) {
            console.error('[MemoryStore] Failed to get archived event summaries:', e);
            return '';
        }
    },

    // ==================== Agentic RAG 数据源 ====================

    getAgenticIndex: async () => {
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const events = await db.events.toArray();
            if (events.length === 0) return '';

            // 分区：蓝灯（活跃）和 绿灯（归档）
            const activeEvents = events.filter(e => !e.is_archived && e.level === 0);
            const archivedEvents = events.filter(e => e.is_archived);

            // 按时间排序
            activeEvents.sort((a, b) => a.timestamp - b.timestamp);
            archivedEvents.sort((a, b) => a.timestamp - b.timestamp);

            // 构建极简 XML record（仅使用 structured_kv，不含 summary 长文本）
            const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            const buildRecord = (e: EventNode, extraAttrs?: string) => {
                const kv = e.structured_kv;
                const attrs = [
                    `id="${e.id}"`,
                    `event="${escapeXml(kv?.event || '')}"`,
                    kv?.role?.length ? `role="${escapeXml(kv.role.join(', '))}"` : '',
                    kv?.location?.length ? `location="${escapeXml(kv.location.join(', '))}"` : '',
                    kv?.causality ? `causality="${escapeXml(kv.causality)}"` : '',
                    extraAttrs || '',
                ].filter(Boolean).join(' ');
                return `  <record ${attrs}/>`;
            };

            const lines: string[] = ['<agentic_index>'];

            // 活跃区（蓝灯）
            if (activeEvents.length > 0) {
                lines.push('  <active_memory>');
                for (const e of activeEvents) {
                    lines.push('  ' + buildRecord(e, `score_status="${e.significance_score.toFixed(2)}"`));
                }
                lines.push('  </active_memory>');
            }

            // 归档区（绿灯）
            if (archivedEvents.length > 0) {
                lines.push('  <archived_summary>');
                for (const e of archivedEvents) {
                    lines.push('  ' + buildRecord(e));
                }
                lines.push('  </archived_summary>');
            }

            lines.push('</agentic_index>');
            return lines.join('\n');
        } catch (e) {
            console.error('[MemoryStore] Failed to build agentic index:', e);
            return '';
        }
    },

    getPureActiveEvents: async () => {
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            const events = await db.events.toArray();
            // 纯蓝灯：未归档事件（包含 Level>=1 大纲和 Level 0 详情）
            const activeEvents = events.filter(e => !e.is_archived);

            if (activeEvents.length === 0) return '';
            activeEvents.sort((a, b) => a.timestamp - b.timestamp);

            const summaries = activeEvents.map(e => e.summary).join('\n\n');
            return `<active_events>\n${summaries}\n</active_events>`;
        } catch (e) {
            console.error('[MemoryStore] Failed to get pure active events:', e);
            return '';
        }
    }
});

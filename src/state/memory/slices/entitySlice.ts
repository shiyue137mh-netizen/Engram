import { generateShortUUID } from '@/core/utils';
import type { EntityNode } from '@/data/types/graph';
import type { StateCreator } from 'zustand';
import { getCurrentDb, tryGetCurrentDb } from './coreSlice';

export interface EntityState {
    // V0.9 实体相关
    getAllEntities: () => Promise<EntityNode[]>;
    saveEntity: (entity: Omit<EntityNode, 'id' | 'last_updated_at'>) => Promise<EntityNode>;
    saveEntities: (entities: Omit<EntityNode, 'id' | 'last_updated_at'>[]) => Promise<EntityNode[]>;
    updateEntity: (entityId: string, updates: Partial<EntityNode>) => Promise<void>;
    updateEntities: (updates: { id: string, updates: Partial<EntityNode> }[]) => Promise<void>;
    deleteEntity: (entityId: string) => Promise<void>;
    deleteEntities: (entityIds: string[]) => Promise<void>;
    findEntityByName: (name: string) => Promise<EntityNode | null>;
    archiveEntities: (entityIds: string[]) => Promise<void>;
    toggleEntityLock: (entityId: string) => Promise<boolean>;
    getEntityStates: (ids?: string[]) => Promise<string>;
}

export const createEntitySlice: StateCreator<any, [], [], EntityState> = (set, get) => ({
    archiveEntities: async (entityIds: string[]) => {
        if (entityIds.length === 0) return;
        const db = getCurrentDb();
        if (!db) return;
        try {
            await db.entities.where('id').anyOf(entityIds).modify({ is_archived: true });
            console.log(`[MemoryStore] Archived ${entityIds.length} entities`);
        } catch (e) {
            console.error('[MemoryStore] Failed to archive entities:', e);
        }
    },

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

    deleteEntity: async (entityId) => {
        if (!entityId) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            await db.entities.bulkDelete([entityId]);
            console.log(`[MemoryStore] Deleted entity: ${entityId}`);
        } catch (e) {
            console.error('[MemoryStore] Failed to delete entity:', e);
            throw e;
        }
    },

    findEntityByName: async (name) => {
        const db = getCurrentDb();
        if (!db) return null;

        try {
            const exactMatch = await db.entities.where('name').equals(name).first();
            if (exactMatch) return exactMatch;

            const aliasMatch = await db.entities.where('aliases').equals(name).first();
            return aliasMatch || null;
        } catch (e) {
            console.error('[MemoryStore] Failed to find entity by name:', e);
            return null;
        }
    },

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

    getEntityStates: async (ids?: string[]) => {
        const db = tryGetCurrentDb();
        if (!db) return '';

        try {
            let fullEntities: EntityNode[] = [];
            let summaryEntities: EntityNode[] = [];

            const all = await db.entities.toArray();

            if (ids && ids.length > 0) {
                // 情况 A: 有召回 ID 列表
                // 详细展示：活跃实体 + 被召回的归档实体
                // 简略展示：未被召回的归档实体
                fullEntities = all.filter(e => !e.is_archived || ids.includes(e.id));
                summaryEntities = all.filter(e => e.is_archived && !ids.includes(e.id));
            } else {
                // 情况 B: 无召回 ID 列表
                // 详细展示：所有活跃实体
                // 简略展示：所有归档实体
                fullEntities = all.filter(e => !e.is_archived);
                summaryEntities = all.filter(e => e.is_archived);
            }

            if (fullEntities.length === 0 && summaryEntities.length === 0) return '';

            const groups: Record<string, EntityNode[]> = {
                char: [],
                loc: [],
                item: [],
                concept: [],
                unknown: [],
            };

            for (const entity of fullEntities) {
                const typeKey = entity.type || 'unknown';
                if (groups[typeKey]) {
                    groups[typeKey].push(entity);
                } else {
                    groups.unknown.push(entity);
                }
            }

            const tagMap: Record<string, string> = {
                char: 'character_state',
                loc: 'scene_state',
                item: 'item_state',
                concept: 'concept_state',
                unknown: 'entity_state',
            };

            const sections: string[] = [];

            for (const [typeKey, entityList] of Object.entries(groups)) {
                if (entityList.length === 0) continue;

                const tag = tagMap[typeKey];
                const contents = entityList
                    .map(e => e.description || `# ${e.name}\n(无详细信息)`)
                    .join('\n---\n');

                sections.push(`<${tag}>\n${contents}\n</${tag}>`);
            }

            // 补充未登场/未召回的已归档实体（仅提供极简特征作为防遗忘和防重提醒）
            if (summaryEntities.length > 0) {
                const yamlLines = ['<archived_entities>', '以下实体目前未出场，但需要你保持对其设定的认知，请勿重复创建新实体:'];
                for (const e of summaryEntities) {
                    const identity = e.profile?.identity ?? '未知身份';
                    const description = e.profile?.description ?? '无具体备注';
                    yamlLines.push(`${e.name}:`);
                    yamlLines.push(`  identity: ${identity}`);
                    yamlLines.push(`  description: ${description}`);
                }
                yamlLines.push('</archived_entities>');
                sections.push(yamlLines.join('\n'));
            }

            return sections.join('\n\n');
        } catch (e) {
            console.error('[MemoryStore] Failed to get entity states:', e);
            return '';
        }
    },

    saveEntities: async (entitiesData) => {
        const db = getCurrentDb();
        if (!db) throw new Error('[MemoryStore] No current chat');
        if (entitiesData.length === 0) return [];

        const entities: EntityNode[] = entitiesData.map(data => ({
            ...data,
            id: generateShortUUID('ent_'),
            last_updated_at: Date.now(),
            aliases: data.aliases || [],
            profile: data.profile || {},
        }));

        await db.entities.bulkAdd(entities);
        console.log(`[MemoryStore] Bulk saved ${entities.length} entities`);
        return entities;
    },

    saveEntity: async (entityData) => {
        const db = getCurrentDb();
        if (!db) throw new Error('[MemoryStore] No current chat');

        const entity: EntityNode = {
            ...entityData,
            id: generateShortUUID('ent_'),
            last_updated_at: Date.now(),
            aliases: entityData.aliases || [],
            profile: entityData.profile || {},
        };

        await db.entities.add(entity);
        console.log(`[MemoryStore] Saved entity: ${entity.name}`);
        return entity;
    },

    toggleEntityLock: async (entityId: string) => {
        if (!entityId) return false;
        const db = getCurrentDb();
        if (!db) return false;

        try {
            const existing = await db.entities.get(entityId);
            if (!existing) return false;

            const newLockState = !existing.is_locked;
            await db.entities.update(entityId, { is_locked: newLockState });
            console.log(`[MemoryStore] Toggled entity lock: ${entityId} -> ${newLockState}`);
            return newLockState;
        } catch (e) {
            console.error('[MemoryStore] Failed to toggle entity lock:', e);
            return false;
        }
    },

    updateEntities: async (updatesList) => {
        if (updatesList.length === 0) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            await db.transaction('rw', db.entities, async () => {
                const now = Date.now();
                for (const { id, updates } of updatesList) {
                    const { id: _id, ...safeUpdates } = updates as any;
                    const existing = await db.entities.get(id);
                    if (existing) {
                        await db.entities.put({
                            ...existing,
                            ...safeUpdates,
                            last_updated_at: now,
                        });
                    }
                }
            });
            console.log(`[MemoryStore] Batch updated ${updatesList.length} entities`);
        } catch (e) {
            console.error('[MemoryStore] Failed to batch update entities:', e);
            throw e;
        }
    },

    updateEntity: async (entityId, updates) => {
        if (!entityId) return;
        const db = getCurrentDb();
        if (!db) return;

        try {
            const { id: _id, ...safeUpdates } = updates as any;

            const existing = await db.entities.get(entityId);
            if (!existing) {
                console.warn(`[MemoryStore] Entity not found for update: ${entityId}`);
                return;
            }

            const merged = {
                ...existing,
                ...safeUpdates,
                last_updated_at: Date.now(),
            };

            await db.entities.put(merged);
            console.log(`[MemoryStore] Put completed for entity: ${entityId}`);
        } catch (e) {
            console.error('[MemoryStore] Failed to update entity:', e);
            throw e;
        }
    }
});

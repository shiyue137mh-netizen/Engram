/**
 * DexieDB - IndexedDB 数据库封装
 * 
 * 使用 Dexie.js 管理图谱数据存储
 * 包含实体表 (EntityNode) 和记忆事件表 (EventNode)
 */

import Dexie, { Table } from 'dexie';
import type { EntityNode, EventNode } from '../../core/types/graph';

/**
 * Engram 数据库实例
 */
export class EngramDatabase extends Dexie {
    entities!: Table<EntityNode, string>;
    events!: Table<EventNode, string>;

    constructor() {
        super('EngramDB');

        this.version(1).stores({
            // 实体表索引: id, name, type, brainId
            entities: 'id, name, type, brainId',
            // 事件表索引: id, timestamp, significance, brainId
            events: 'id, timestamp, significance, brainId, *relatedEntities',
        });
    }
}

// 单例数据库实例
export const db = new EngramDatabase();

/**
 * 数据库操作封装
 */
export const DexieDB = {
    /**
     * 添加或更新实体
     */
    async upsertEntity(entity: EntityNode): Promise<string> {
        return db.entities.put(entity);
    },

    /**
     * 添加记忆事件
     */
    async addEvent(event: EventNode): Promise<string> {
        return db.events.add(event);
    },

    /**
     * 根据 brainId 获取所有实体
     */
    async getEntitiesByBrain(brainId: string): Promise<EntityNode[]> {
        return db.entities.where('brainId').equals(brainId).toArray();
    },

    /**
     * 根据实体 ID 列表获取相关事件
     */
    async getEventsByEntities(entityIds: string[]): Promise<EventNode[]> {
        return db.events
            .filter((event) =>
                event.relatedEntities.some((id) => entityIds.includes(id))
            )
            .toArray();
    },

    /**
     * 根据 brainId 获取最近的事件
     */
    async getRecentEvents(brainId: string, limit: number = 20): Promise<EventNode[]> {
        return db.events
            .where('brainId')
            .equals(brainId)
            .reverse()
            .limit(limit)
            .toArray();
    },

    /**
     * 清空指定 brain 的所有数据
     */
    async clearBrain(brainId: string): Promise<void> {
        await db.entities.where('brainId').equals(brainId).delete();
        await db.events.where('brainId').equals(brainId).delete();
    },
};

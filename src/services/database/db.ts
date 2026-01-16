/**
 * Engram Database (Dexie.js)
 *
 * V0.6 Multi-Database Architecture
 * Each chat_id gets its own isolated IndexedDB database.
 */

import Dexie, { Table } from 'dexie';
import type { EventNode, EntityNode } from '../types/graph';

/**
 * 每个聊天的元数据存储
 */
export interface ChatMeta {
    key: string;
    value: unknown;
}

/**
 * ChatDatabase - 单个聊天的数据库类
 */
export class ChatDatabase extends Dexie {
    events!: Table<EventNode, string>;
    entities!: Table<EntityNode, string>;
    meta!: Table<ChatMeta, string>;

    constructor(chatId: string) {
        // 数据库名格式: Engram_{chatId}
        super(`Engram_${chatId}`);

        // V0.9.4: Schema 升级
        // - entities 表添加 *aliases MultiEntry 索引支持高效别名查询
        this.version(2).stores({
            // Events: 核心记忆单元
            events: 'id, timestamp, significance_score, level',
            // Entities: 图谱实体 (V0.9.4: 添加 aliases 索引)
            entities: 'id, type, name, *aliases',
            // Meta: 状态存储 (lastSummarizedFloor 等)
            meta: 'key'
        });
    }
}

// ======================== 数据库工厂 ========================

/** 数据库实例缓存 */
const dbCache = new Map<string, ChatDatabase>();

/**
 * 获取某个聊天的数据库实例（带缓存）
 */
export function getDbForChat(chatId: string): ChatDatabase {
    if (!chatId) {
        throw new Error('[Engram DB] chatId is required');
    }

    if (!dbCache.has(chatId)) {
        console.debug(`[Engram DB] Creating database for chat: ${chatId}`);
        dbCache.set(chatId, new ChatDatabase(chatId));
    }
    return dbCache.get(chatId)!;
}

/**
 * 关闭并移除缓存的数据库
 */
export function closeDb(chatId: string): void {
    const db = dbCache.get(chatId);
    if (db) {
        db.close();
        dbCache.delete(chatId);
        console.debug(`[Engram DB] Closed database for chat: ${chatId}`);
    }
}

/**
 * 检查某个聊天的数据库是否存在（不会自动创建）
 */
export function hasDbForChat(chatId: string): boolean {
    return dbCache.has(chatId);
}

/**
 * 获取数据库实例（如果存在），不自动创建
 */
export function tryGetDbForChat(chatId: string): ChatDatabase | null {
    return dbCache.get(chatId) || null;
}

/**
 * 删除整个聊天的数据库
 */
export async function deleteDatabase(chatId: string): Promise<void> {
    closeDb(chatId);
    await Dexie.delete(`Engram_${chatId}`);
    console.info(`[Engram DB] Deleted database for chat: ${chatId}`);
}

/**
 * 列出所有 Engram 数据库名称
 */
export async function listAllDatabases(): Promise<string[]> {
    const allDbs = await Dexie.getDatabaseNames();
    return allDbs.filter(name => name.startsWith('Engram_'));
}

/**
 * 获取所有 Engram 数据库的 chatId 列表
 */
export async function listAllChatIds(): Promise<string[]> {
    const dbNames = await listAllDatabases();
    return dbNames.map(name => name.replace('Engram_', ''));
}

/**
 * 删除所有 Engram 数据库 (危险操作！)
 */
export async function deleteAllDatabases(): Promise<number> {
    const dbNames = await listAllDatabases();
    for (const name of dbNames) {
        await Dexie.delete(name);
    }
    dbCache.clear();
    console.warn(`[Engram DB] Deleted ${dbNames.length} databases`);
    return dbNames.length;
}

// ======================== 兼容层 (临时) ========================

/**
 * @deprecated V0.6: 使用 getDbForChat(chatId) 替代
 * 保留此导出以便于定位需要迁移的代码
 */
export const db = {
    events: null,
    entities: null,
    scopes: null,
    logs: null,
} as unknown as ChatDatabase;

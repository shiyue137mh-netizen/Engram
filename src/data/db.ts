/**
 * Engram Database (Dexie.js)
 *
 * V0.6 Multi-Database Architecture
 * Each chat_id gets its own isolated IndexedDB database.
 */

import type { Table } from 'dexie';
import Dexie from 'dexie';
import type { EntityNode, EventNode } from './types/graph';

/**
 * 每个聊天的元数据存储
 */
export interface ChatMeta {
    key: string;
    value: unknown;
}

import { Logger } from '../core/logger';
import { syncService } from './sync/SyncService';

const MODULE = 'Database';

/**
 * ChatDatabase - 单个聊天的数据库类
 */
export class ChatDatabase extends Dexie {
    events!: Table<EventNode, string>;
    entities!: Table<EntityNode, string>;
    meta!: Table<ChatMeta, string>;

    private chatId: string;

    constructor(chatId: string) {
        // 数据库名格式: Engram_{chatId}
        super(`Engram_${chatId}`);
        this.chatId = chatId;

        // V0.9.4: Schema 升级 - entities 表添加 *aliases
        // V1.5.0: Schema 升级 - 添加 is_archived, is_embedded 索引支持 Dashboard 高效统计
        this.version(3).stores({
            // Events: 核心记忆单元
            events: 'id, timestamp, significance_score, level, is_archived, is_embedded',
            // Entities: 图谱实体 (添加 is_archived 索引)
            entities: 'id, type, name, *aliases, is_archived',
            // Meta: 状态存储 (lastSummarizedFloor 等)
            meta: 'key'
        });

        // 注册数据变动监听钩子
        const handleChange = () => this.updateLastModified();

        this.events.hook('creating', handleChange);
        this.entities.hook('updating', handleChange);
        this.events.hook('deleting', handleChange);

        this.entities.hook('creating', handleChange);
        this.entities.hook('updating', handleChange);
        this.entities.hook('deleting', handleChange);
    }

    private lastUpdateTimer: any = null;

    /**
     * 更新最后修改时间并调度上传
     * V0.9.11: 增强导入期间的保护
     * V1.4.6: 优化为防抖宏任务，避免 P0/P1 合规性问题
     */
    private updateLastModified() {
        // 检查导入锁 - 如果正在导入，完全跳过
        if (syncService.isImportingState) {
            return;
        }

        // 如果已经有一个在排队了，直接跳过 (500ms 窗口防抖)
        if (this.lastUpdateTimer) {return;}

        this.lastUpdateTimer = setTimeout(() => {
            this.lastUpdateTimer = null;
            
            // 再次检查导入状态（防止在延时期间状态变化）
            if (syncService.isImportingState) {
                return;
            }

            // 使用 ignoreTransaction 显式脱离当前潜在的 Hooks 事务
            // 防止在只读或特定表的事务中试图写入 meta 表导致 DEXIE 报错喵~
            Dexie.ignoreTransaction(async () => {
                try {
                    await this.meta.put({ key: 'lastModified', value: Date.now() });
                    // 调度同步 (SyncService 内部已有防抖)
                    syncService.scheduleUpload(this.chatId);
                } catch (error) {
                    Logger.error(MODULE, '异步更新 lastModified 失败', error);
                }
            });
        }, 500);
    }
}

// ======================== 数据库工厂 ========================

// 导出数据接口
export interface ChatDataDump {
    events: EventNode[];
    entities: EntityNode[];
    meta: Record<string, any>;
}

/**
 * 导出数据库所有数据
 */
export async function exportChatData(db: ChatDatabase): Promise<ChatDataDump> {
    const events = await db.events.toArray();
    const entities = await db.entities.toArray();
    const metaArr = await db.meta.toArray();
    const meta = metaArr.reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {});
    
    // V1.4.6 Optimization: 将 meta 放在最前面，这样 JSON.stringify 出来的字符串中，
    // 元数据会出现在文件头部。这让 SyncService 的流式正则解析能瞬间命中并切断连接，节省 99% 的带宽喵！
    return { entities, events, meta };
}

/**
 * 导入数据到数据库（覆盖）
 */
export async function importChatData(db: ChatDatabase, data: ChatDataDump): Promise<void> {
    await db.transaction('rw', db.events, db.entities, db.meta, async () => {
        // 清空
        await db.events.clear();
        await db.entities.clear();
        await db.meta.clear();

        // 批量添加
        await db.events.bulkAdd(data.events);
        await db.entities.bulkAdd(data.entities);

        // 转换 meta 因为它是一个 KV 表
        const metaEntries = Object.entries(data.meta || {}).map(([key, value]) => ({ key, value }));
        await db.meta.bulkAdd(metaEntries);
    });
}

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
        Logger.debug(MODULE, `Creating database for chat: ${chatId}`);
        dbCache.set(chatId, new ChatDatabase(chatId));
    }
    return dbCache.get(chatId)!;
}

/**
 * 关闭并移除缓存的数据库
 */
function closeDb(chatId: string): void {
    const db = dbCache.get(chatId);
    if (db) {
        db.close();
        dbCache.delete(chatId);
        Logger.debug(MODULE, `Closed database for chat: ${chatId}`);
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
    Logger.info(MODULE, `Deleted database for chat: ${chatId}`);
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
    Logger.warn(MODULE, `Deleted ${dbNames.length} databases`);
    return dbNames.length;
}

export interface DatabaseStats {
    chatId: string;
    lastUpdateTime: number;
}

/**
 * 获取单个数据库的统计信息（仅包含基础信息）
 */
export async function getDatabaseStats(chatId: string): Promise<DatabaseStats> {
    try {
        // 使用单独的实例，查询完毕后迅速关闭
        const tempDb = new ChatDatabase(chatId);
        if (!await Dexie.exists(tempDb.name)) {
             tempDb.close();
             return { chatId, lastUpdateTime: 0 };
        }
        
        // 快速读取 meta 设置
        const lastModifiedMeta = await tempDb.meta.get('lastModified');
        tempDb.close();
        
        return {
            chatId,
            lastUpdateTime: lastModifiedMeta ? Number(lastModifiedMeta.value) : 0
        };
    } catch (error) {
        Logger.error(MODULE, `Failed to get stats for chat ${chatId}`, error);
        return { chatId, lastUpdateTime: 0 };
    }
}

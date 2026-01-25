import { getEntries, findEntryByKey, createEntry, updateEntry, deleteEntry } from './crud';
import { CreateWorldInfoEntryParams } from './types';
import { STATE_ENTRY_KEY } from './constants';
import { Logger } from '@/core/logger';

export interface EngramState {
    lastSummarizedFloor: number;
    totalSummaries: number;
    totalTokens: number;
    updatedAt: number;
    /**
     * 条目黑名单
     * 结构：{ "WorldbookName": [uid1, uid2, ...] }
     * 使用 UID 作为唯一标识
     */
    disabledEntries?: Record<string, number[]>;
}

const DEFAULT_STATE: EngramState = {
    lastSummarizedFloor: 0,
    totalSummaries: 0,
    totalTokens: 0,
    updatedAt: Date.now(),
};

/**
 * @deprecated V0.5 已弃用
 * 状态现在存储在 IndexedDB (ScopeManager) 中，不再使用世界书
 * 保留此文件仅为兼容性
 *
 * WorldBookStateService
 * 负责在世界书中持久化 Engram 的状态
 */
export class WorldBookStateService {
    /**
     * 加载状态
     */
    static async loadState(worldbookName: string): Promise<EngramState> {
        try {
            const entry = await findEntryByKey(worldbookName, STATE_ENTRY_KEY);
            if (!entry) {
                return { ...DEFAULT_STATE };
            }

            // 尝试解析 JSON
            try {
                const state = JSON.parse(entry.content);
                return { ...DEFAULT_STATE, ...state };
            } catch (e) {
                Logger.warn('WorldBookStateService', '状态条目解析失败，重置状态', e);
                return { ...DEFAULT_STATE };
            }
        } catch (e) {
            Logger.error('WorldBookStateService', '加载状态失败', e);
            return { ...DEFAULT_STATE };
        }
    }

    /**
     * 保存状态
     */
    static async saveState(worldbookName: string, state: Partial<EngramState>): Promise<boolean> {
        try {
            // 1. 获取当前状态以合并
            const currentState = await this.loadState(worldbookName);
            const newState: EngramState = {
                ...currentState,
                ...state,
                updatedAt: Date.now(),
            };

            const content = JSON.stringify(newState, null, 2);

            // 2. 查找所有可能是状态条目的 entries (按 name 或 key)
            const entries = await getEntries(worldbookName);
            const stateEntries = entries.filter(e =>
                e.name === 'Engram System State' || e.keys.includes(STATE_ENTRY_KEY)
            );

            if (stateEntries.length > 0) {
                // 优先保留包含 KEY 的条目
                stateEntries.sort((a, b) => {
                    const aHasKey = a.keys.includes(STATE_ENTRY_KEY) ? 1 : 0;
                    const bHasKey = b.keys.includes(STATE_ENTRY_KEY) ? 1 : 0;
                    return bHasKey - aHasKey;
                });

                const [primaryEntry, ...duplicates] = stateEntries;

                // 删除重复项
                if (duplicates.length > 0) {
                    Logger.warn('WorldBookStateService', `发现 ${duplicates.length} 个重复的状态条目，正在清理...`);
                    for (const dup of duplicates) {
                        await deleteEntry(worldbookName, dup.uid);
                    }
                }

                // 更新保留的条目
                Logger.debug('WorldBookStateService', '更新并修复状态条目', { uid: primaryEntry.uid, state: newState });
                const updates = {
                    content,
                    name: 'Engram System State',
                    enabled: false,
                    constant: false,
                    keys: [STATE_ENTRY_KEY],
                    recursion: {
                        prevent_incoming: true,
                        prevent_outgoing: true
                    },
                    position: 'before_character_definition' as const,
                    order: 0
                };

                return await updateEntry(worldbookName, primaryEntry.uid, updates);
            } else {
                // 创建新条目
                Logger.debug('WorldBookStateService', '创建状态条目', { state: newState });
                const params: CreateWorldInfoEntryParams = {
                    name: 'Engram System State',
                    content,
                    keys: [STATE_ENTRY_KEY],
                    enabled: false,
                    constant: false,
                    position: 'before_character_definition',
                    role: 'system',
                    order: 0,
                    recursion: {
                        prevent_incoming: true,
                        prevent_outgoing: true
                    }
                };
                return await createEntry(worldbookName, params);
            }
        } catch (e) {
            Logger.error('WorldBookStateService', '保存状态失败', e);
            return false;
        }
    }
}

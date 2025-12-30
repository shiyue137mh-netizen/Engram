import { WorldInfoService, CreateWorldInfoEntryParams } from './tavern/WorldInfoService';
import { Logger } from './logger';

export interface EngramState {
    lastSummarizedFloor: number;
    totalSummaries: number;
    totalTokens: number;
    updatedAt: number;
}

const STATE_ENTRY_KEY = '__ENGRAM_STATE__';
const DEFAULT_STATE: EngramState = {
    lastSummarizedFloor: 0,
    totalSummaries: 0,
    totalTokens: 0,
    updatedAt: Date.now(),
};

/**
 * WorldBookStateService
 * 负责在世界书中持久化 Engram 的状态
 */
export class WorldBookStateService {
    /**
     * 加载状态
     */
    static async loadState(worldbookName: string): Promise<EngramState> {
        try {
            const entry = await WorldInfoService.findEntryByKey(worldbookName, STATE_ENTRY_KEY);
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

            // 2. 查找是否存在
            const entry = await WorldInfoService.findEntryByKey(worldbookName, STATE_ENTRY_KEY);

            if (entry) {
                // 更新现有条目
                Logger.debug('WorldBookStateService', '更新状态条目', { uid: entry.uid, state: newState });
                return await WorldInfoService.updateEntry(worldbookName, entry.uid, {
                    content,
                    name: 'Engram System State',
                    // 确保是禁用的
                    enabled: false,
                });
            } else {
                // 创建新条目
                Logger.debug('WorldBookStateService', '创建状态条目', { state: newState });
                const params: CreateWorldInfoEntryParams = {
                    name: 'Engram System State',
                    content,
                    keys: [STATE_ENTRY_KEY],
                    enabled: false, // 默认禁用，防止干扰上下文
                    constant: false,
                    position: 'before_character_definition',
                    role: 'system',
                    order: 0, // 置顶
                };
                return await WorldInfoService.createEntry(worldbookName, params);
            }
        } catch (e) {
            Logger.error('WorldBookStateService', '保存状态失败', e);
            return false;
        }
    }
}

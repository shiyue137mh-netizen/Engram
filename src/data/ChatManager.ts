/**
 * ChatManager - V0.6 Multi-Database Architecture
 *
 * Manages the current chat context.
 * Each chat_id has its own database, so we just need to track the current chatId.
 */

import { getDbForChat, type ChatDatabase, type ChatMeta } from './db';
import { getCurrentChatId, getCurrentCharacter } from '@/integrations/tavern/context';
import { DEFAULT_SCOPE_STATE, type ScopeState } from './types/graph';

/** Meta 表中的状态 key */
const STATE_KEY = 'scope_state';
const CHARACTER_KEY = 'character_name';

class ChatManager {
    private currentChatId: string | null = null;
    private currentDb: ChatDatabase | null = null;

    /**
     * 获取当前聊天的数据库
     * 会自动从 ST 上下文获取 chatId
     */
    getCurrentDb(): ChatDatabase | null {
        const chatId = getCurrentChatId();
        if (!chatId) {
            console.warn('[ChatManager] No chat_id available');
            return null;
        }

        // 如果 chatId 变化，切换数据库
        if (chatId !== this.currentChatId) {
            this.currentChatId = chatId;
            this.currentDb = getDbForChat(chatId);
            console.debug(`[ChatManager] Switched to database: Engram_${chatId}`);
        }

        return this.currentDb;
    }

    /**
     * 获取当前 chatId
     */
    getCurrentChatId(): string | null {
        return getCurrentChatId();
    }

    /**
     * 获取显示用的角色名
     */
    getCharacterName(): string {
        return getCurrentCharacter()?.name || 'Unknown';
    }

    /**
     * 获取当前聊天的状态
     */
    async getState(): Promise<ScopeState> {
        const db = this.getCurrentDb();
        if (!db) return DEFAULT_SCOPE_STATE;

        try {
            const meta = await db.meta.get(STATE_KEY);
            if (meta?.value) {
                return { ...DEFAULT_SCOPE_STATE, ...(meta.value as ScopeState) };
            }
            return DEFAULT_SCOPE_STATE;
        } catch (e) {
            console.error('[ChatManager] Failed to get state:', e);
            return DEFAULT_SCOPE_STATE;
        }
    }

    /**
     * 更新当前聊天的状态
     */
    async updateState(partialState: Partial<ScopeState>): Promise<void> {
        const db = this.getCurrentDb();
        if (!db) return;

        try {
            const currentState = await this.getState();
            const newState = { ...currentState, ...partialState };
            await db.meta.put({ key: STATE_KEY, value: newState });
        } catch (e) {
            console.error('[ChatManager] Failed to update state:', e);
        }
    }

    /**
     * 保存角色名到当前数据库（用于 UI 显示）
     */
    async saveCharacterName(): Promise<void> {
        const db = this.getCurrentDb();
        if (!db) return;

        const name = this.getCharacterName();
        await db.meta.put({ key: CHARACTER_KEY, value: name });
    }

    /**
     * 获取数据库中保存的角色名
     */
    async getSavedCharacterName(): Promise<string> {
        const db = this.getCurrentDb();
        if (!db) return 'Unknown';

        const meta = await db.meta.get(CHARACTER_KEY);
        return (meta?.value as string) || 'Unknown';
    }

    /**
     * 重置状态（Debug/Dev only）
     */
    async resetState(): Promise<void> {
        const db = this.getCurrentDb();
        if (!db) return;

        await db.meta.put({ key: STATE_KEY, value: DEFAULT_SCOPE_STATE });
    }
}

export const chatManager = new ChatManager();

/**
 * @deprecated V0.6: 使用 chatManager 替代
 * 保留以便定位迁移点
 */
const scopeManager = chatManager;

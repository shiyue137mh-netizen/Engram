/**
 * ScopeManager
 *
 * Manages the "Scope" of memory.
 * A Scope is a unique container for a specific Character + Chat combination.
 * It also stores the persistent execution state (like progress, token usage).
 */

import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import type { Scope } from '../types/graph';

export class ScopeManager {
    /**
     * Resolve a Scope based on Chat ID.
     * V0.5: 仅使用 chat_id 作为主键，character_name 仅用于显示
     *
     * @param chatId - 聊天记录 UUID (稳定且唯一)
     * @param characterName - 角色名称 (仅用于 UI 显示)
     */
    async resolveScope(chatId: string, characterName: string = 'Unknown'): Promise<Scope> {
        // 1. Try to find existing scope by chat_id only
        const existingScope = await db.scopes
            .where('chat_id')
            .equals(chatId)
            .first();

        if (existingScope) {
            // Update last_active_at
            await db.scopes.update(existingScope.id!, {
                last_active_at: Date.now()
            });
            return { ...existingScope, last_active_at: Date.now() };
        }

        // 2. Create new scope
        const newScope: Scope = {
            uuid: uuidv4(),
            chat_id: chatId,
            character_name: characterName,
            state: {
                // Initialize state
                last_summarized_floor: 0,
                token_usage_accumulated: 0,
                last_compressed_at: 0,
                active_summary_order: 9000, // Start order for WorldBook entries
            },
            created_at: Date.now(),
            last_active_at: Date.now(),
        };

        const id = await db.scopes.add(newScope);
        return { ...newScope, id };
    }

    /**
     * Get Scope by ID
     */
    async getScope(id: number): Promise<Scope | undefined> {
        return db.scopes.get(id);
    }

    /**
     * Update Scope State
     * Used by Pipeline to save progress.
     */
    async updateState(scopeId: number, partialState: Partial<Scope['state']>): Promise<void> {
        const scope = await db.scopes.get(scopeId);
        if (!scope) {
            console.warn(`[ScopeManager] Scope ${scopeId} not found for updateState`);
            return;
        }

        const newState = {
            ...scope.state,
            ...partialState
        };

        await db.scopes.update(scopeId, {
            state: newState
        });
    }

    /**
     * Reset Scope State (Debug/Dev only)
     */
    async resetState(scopeId: number): Promise<void> {
        const scope = await db.scopes.get(scopeId);
        if (!scope) return;

        await db.scopes.update(scopeId, {
            state: {
                last_summarized_floor: 0,
                token_usage_accumulated: 0,
                last_compressed_at: 0,
                active_summary_order: 9000,
            }
        });
    }
}

export const scopeManager = new ScopeManager();

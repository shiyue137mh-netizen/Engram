/**
 * Injector Service
 *
 * Responsible for:
 * 1. Listening to Chat Events
 * 2. Triggering Retrieval
 * 3. Updating the Dynamic Context WorldInfo Entry
 */

import { EventBus, TavernEventType } from '@/tavern/api';
import { getCurrentChatId, getCurrentCharacter } from '@/tavern/context';
import { WorldInfoService } from '@/tavern/api/WorldInfo';
import { scopeManager } from '@/services/database/ScopeManager';
import { retriever } from './Retriever';
import { Logger } from '@/lib/logger';

const DYNAMIC_ENTRY_NAME = '[Engram] Dynamic Context';
const DYNAMIC_ENTRY_KEY = '[Engram_Dynamic_Context]'; // Unlikely to be typed by user, mostly for internal ID

export class Injector {
    private isInitialized = false;

    /**
     * Initialize the Injector
     */
    public init() {
        if (this.isInitialized) return;

        // Hook into relevant events
        EventBus.on(TavernEventType.MESSAGE_RECEIVED, this.handleMessageReceived.bind(this));
        EventBus.on(TavernEventType.CHAT_CHANGED, this.refreshContext.bind(this));

        this.isInitialized = true;
        console.log('[Injector] Initialized.');
    }

    /**
     * Handle new user message
     */
    private async handleMessageReceived() {
        // When a message is received (from user), we prepare the context for the AI's response.
        await this.refreshContext();
    }

    /**
     * Refresh the Dynamic Context Entry
     */
    public async refreshContext() {
        try {
            const chatId = getCurrentChatId();
            const char = getCurrentCharacter();
            const characterName = char?.name || 'Unknown';

            if (!chatId) {
                return;
            }

            // 1. Resolve Scope (V0.5: 仅用 chatId)
            const scope = await scopeManager.resolveScope(chatId, characterName);

            // 2. Retrieve
            // TODO: Get the actual last query? For now, we use Rolling Search which mostly ignores query.
            const retrievalResult = await retriever.search('', scope);

            // 3. Format Content
            // We combine entries into a single block
            const contextText = retrievalResult.entries.length > 0
                ? `<engram_memory>\n${retrievalResult.entries.join('\n')}\n</engram_memory>`
                : ''; // Empty if no context

            // 4. Update WorldInfo
            const worldbookName = await WorldInfoService.getOrCreateWorldbook();
            if (!worldbookName) return;

            // Check if entry exists
            let entry = await WorldInfoService.findEntryByKey(worldbookName, DYNAMIC_ENTRY_KEY);

            if (entry) {
                // Update existing
                // Only update if content changed to save write ops?
                // For now, just update.
                await WorldInfoService.updateEntry(worldbookName, entry.uid, {
                    content: contextText,
                    enabled: !!contextText // Disable if empty
                });
            } else if (contextText) {
                // Create new if content exists
                await WorldInfoService.createEntry(worldbookName, {
                    name: DYNAMIC_ENTRY_NAME,
                    content: contextText,
                    keys: [DYNAMIC_ENTRY_KEY],
                    constant: true, // Always active
                    position: 'before_character_definition', // High priority
                    order: 9999, // Ensure it's near the end of high priority stuff? Or top?
                });
            }

            if (contextText) {
                console.log('[Injector] Dynamic Context Updated.', { length: contextText.length });
            }

        } catch (e) {
            console.error('[Injector] Failed to refresh context:', e);
        }
    }
}

export const injector = new Injector();

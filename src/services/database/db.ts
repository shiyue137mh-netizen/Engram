/**
 * Engram Database (Dexie.js)
 *
 * Version 3.0 Refactor - "Dual-Nature" Architecture
 * Introduces Scopes, Structured Events, and Graph Entities.
 */

import Dexie, { Table } from 'dexie';
import type { Scope, EventNode, EntityNode } from '../types/graph';
import type { LogEntry } from '@/lib/logger/types';

/**
 * Engram V3 Database Class
 */
export class EngramDatabase extends Dexie {
    scopes!: Table<Scope, number>;
    events!: Table<EventNode, string>;
    entities!: Table<EntityNode, string>;
    logs!: Table<LogEntry, string>;

    constructor() {
        super('EngramDB');

        // Version 1 & 2: Legacy (Preserved for history, but typically unused in V3 clean install)
        this.version(1).stores({
            entities: 'id, name, type, brainId',
            events: 'id, timestamp, significance, brainId, *relatedEntities',
        });

        this.version(2).stores({
            entities: 'id, name, type, brainId',
            events: 'id, timestamp, significance, brainId, *relatedEntities',
            logs: 'id, timestamp, level, module',
        });

        // Version 3: The Big Refactor
        // - Introduced 'scopes' table
        // - 'events' now uses 'scope_id' and 'level'
        // - 'entities' now uses 'scope_id'
        this.version(3).stores({
            // Scopes: Unique context container
            // V0.5: 仅使用 chat_id 索引，character_name 仅用于显示
            scopes: '++id, &uuid, &chat_id, last_active_at',

            // Events: The core memory unit
            // Indexed by scope, source range (for rollback), significance, and recursive level
            events: 'id, scope_id, [source_range.start_index+source_range.end_index], significance_score, level',

            // Entities: Graph nodes
            // Compound index [scope_id+name] ensures uniqueness within a scope
            entities: '[scope_id+name], type, last_updated_at',

            // Logs: Debugging (Unchanged)
            logs: 'id, timestamp, level, module'
        }).upgrade(trans => {
            // ⚠️ BREAKING CHANGE: Clear old data for the new architecture
            // In a production app with real users, we would write a migration script.
            // But since this is a refactor of a dev extension, we opt for a clean slate.
            return Promise.all([
                trans.table('events').clear(),
                trans.table('entities').clear(),
                // We don't clear logs as they might be useful
            ]);
        });
    }
}

// Singleton Instance
export const db = new EngramDatabase();

/**
 * Legacy Helper (Deprecated)
 * Retaining this temporarily to identify breakage points in the codebase.
 * TODO: Remove this after Phase 3.
 */
export const DexieDB = {
    // These methods will fail or need strict replacement
    // We keep the object structure to allow "Find Usages" to work,
    // but typically we should switch to `db.scopes`, `db.events` directly.
};

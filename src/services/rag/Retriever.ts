/**
 * Retriever Service
 *
 * Responsible for retrieving relevant memory Events.
 * Supports:
 * - RAG Mode: Vector Search + Rerank
 * - Basic Mode: Time-based Rollback (Recent Events + Macro Summary)
 */

import { db } from '@/services/database/db';
import type { EventNode, Scope } from '@/services/types/graph';

export interface RetrievalResult {
    entries: string[]; // Formatted entries ready for injection
    nodes: EventNode[]; // Raw nodes
}

export class Retriever {
    /**
     * Search for context
     * @param query User's current message or search query
     * @param scope Current Scope
     * @param limit Max number of entries
     */
    async search(query: string, scope: Scope, limit: number = 5): Promise<RetrievalResult> {
        // TODO: Check global config for RAG mode
        // For V0.4 Basic Mode, we rely on "Rolling Strategy"
        const enableRAG = false;

        if (enableRAG) {
            return this.vectorSearch(query, scope, limit);
        } else {
            return this.rollingSearch(scope, limit);
        }
    }

    /**
     * Basic Mode Strategy: "Infinite Context - Rolling Window"
     * Returns:
     * 1. The most recent Level 1 Summary (Overview of the past)
     * 2. The most recent N Level 0 Events (Detail of the present)
     */
    private async rollingSearch(scope: Scope, limit: number): Promise<RetrievalResult> {
        // 1. Get recent Level 0 (Details)
        const recentEvents = await db.events
            .where('scope_id').equals(scope.id!)
            .and(node => node.level === 0)
            .reverse() // Newest first
            .limit(limit)
            .toArray();

        // 2. Get latest Level 1 (Macro Context)
        const latestMacro = await db.events
            .where('scope_id').equals(scope.id!)
            .and(node => node.level === 1)
            .reverse()
            .first();

        const nodes: EventNode[] = [...recentEvents];
        if (latestMacro) {
            nodes.push(latestMacro);
        }

        // 3. Format
        // Sort by timestamp for coherence
        nodes.sort((a, b) => a.timestamp - b.timestamp);

        const entries = nodes.map(node => this.formatEntry(node));

        return { entries, nodes };
    }

    /**
     * Vectors Search Strategy
     */
    private async vectorSearch(query: string, scope: Scope, limit: number): Promise<RetrievalResult> {
        // Placeholder for future implementation
        console.warn('[Retriever] Vector search not implemented yet. Falling back to rolling.');
        return this.rollingSearch(scope, limit);
    }

    private formatEntry(node: EventNode): string {
        // Basic formatting
        // Could be enhanced with JSON-KV if needed
        return `[Mem: ${node.summary}]`;
    }
}

export const retriever = new Retriever();

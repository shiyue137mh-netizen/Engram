import type { SearchAdapter, SearchResult } from '../SearchService';
import { getCurrentChatId } from '@/integrations/tavern';
import { tryGetDbForChat } from '@/data/db';
import { Calendar, FileText } from 'lucide-react';

export class MemoryAdapter implements SearchAdapter {
    async search(query: string): Promise<SearchResult[]> {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery || lowerQuery.length < 2) {return [];}

        const chatId = getCurrentChatId();
        if (!chatId) {return [];}

        const db = tryGetDbForChat(chatId);
        if (!db) {return [];}

        try {
            // Instant search on 'summary' field using basic string inclusion
            // For a real app, we might use a proper full-text index if Dexie supports it,
            // But for < 10k items, simple filtering might be acceptable for a prototype.
            // Limit to top 5 for speed in the palette.
            // Optimize: Scan from newest to oldest (timestamp) and stop after 5 matches
            const events = await db.events
                .orderBy('timestamp')
                .toReversed()
                .filter(e => e.summary.toLowerCase().includes(lowerQuery))
                .limit(5)
                .toArray();

            return events.map(e => ({
                id: `memory-${e.id}`,
                type: 'memory',
                title: e.summary.slice(0, 50) + (e.summary.length > 50 ? '...' : ''),
                description: new Date(e.timestamp).toLocaleString(),
                icon: FileText,
                action: (nav) => nav('/memory'), // TODO: Nav to specific item?
                score: 5, // Lower score than exact commands
            }));
        } catch (error) {
            console.error('Memory search failed', error);
            return [];
        }
    }
}

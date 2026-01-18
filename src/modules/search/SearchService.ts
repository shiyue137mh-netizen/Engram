import React from 'react';

export interface SearchResult {
    id: string;
    type: 'command' | 'setting' | 'log' | 'memory' | 'navigation';
    title: string;
    description?: string;
    icon?: React.ElementType;
    action: (navigate: (path: string) => void) => void;
    score?: number;
    keywords?: string[];
}

export interface SearchAdapter {
    search(query: string): Promise<SearchResult[]>;
}

class SearchServiceImpl {
    private adapters: SearchAdapter[] = [];

    registerAdapter(adapter: SearchAdapter) {
        this.adapters.push(adapter);
    }

    async search(query: string): Promise<SearchResult[]> {
        if (!query.trim()) return [];

        const results = await Promise.all(this.adapters.map(a => a.search(query)));
        return results.flat().sort((a, b) => (b.score || 0) - (a.score || 0));
    }
}

export const searchService = new SearchServiceImpl();

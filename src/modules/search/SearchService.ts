import React from 'react';

export interface SearchResult {
    id: string;
    type: 'command' | 'setting' | 'log' | 'memory' | 'navigation' | 'doc';
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

// ... (在文件开头添加导入)
import { DocAdapter } from './adapters/DocAdapter';

export const searchService = new SearchServiceImpl();

// 注册默认适配器
import { CommandAdapter } from './adapters/CommandAdapter';
searchService.registerAdapter(new CommandAdapter());
searchService.registerAdapter(new DocAdapter());

import type { SearchAdapter, SearchResult } from '../SearchService';
import { AlertTriangle, Bug, Info, Terminal } from 'lucide-react';

export class LogAdapter implements SearchAdapter {
    async search(query: string): Promise<SearchResult[]> {
        const lowerQuery = query.toLowerCase().trim();
        const keywords = ['log', 'debug', 'error', 'warn', 'info', 'dev'];

        if (keywords.some(k => k.includes(lowerQuery)) || lowerQuery.includes('log')) {
            return this.getLogActions();
        }
        return [];
    }

    private getLogActions(): SearchResult[] {
        return [
            {
                action: (nav) => nav('devlog'),
                description: '打开开发者日志控制台',
                icon: Terminal,
                id: 'log-view-all',
                score: 9,
                title: '查看完整日志 (DevLog)',
                type: 'log'
            },
            {
                id: 'log-errors',
                type: 'log',
                title: '查看错误日志 (Errors)',
                description: '筛选显示最近的错误信息',
                icon: Bug,
                action: (nav) => nav('devlog'), // In future: nav('/dev?filter=error')
                score: 8
            }
        ];
    }
}

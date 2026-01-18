import { SearchAdapter, SearchResult } from '../SearchService';
import { Terminal, AlertTriangle, Info, Bug } from 'lucide-react';

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
                id: 'log-view-all',
                type: 'log',
                title: '查看完整日志 (DevLog)',
                description: '打开开发者日志控制台',
                icon: Terminal,
                action: (nav) => nav('devlog'),
                score: 9
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

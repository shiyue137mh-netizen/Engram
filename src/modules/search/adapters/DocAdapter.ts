/**
 * 文档搜索适配器
 * V0.9.11
 */

import { SearchAdapter, SearchResult } from '../SearchService';
import { DOCS } from '@/docs';
import { BookOpen } from 'lucide-react';

export class DocAdapter implements SearchAdapter {
    async search(query: string): Promise<SearchResult[]> {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) return [];

        return DOCS.filter(doc =>
            doc.label.toLowerCase().includes(lowerQuery) ||
            doc.keywords?.some(k => k.toLowerCase().includes(lowerQuery)) ||
            doc.description?.toLowerCase().includes(lowerQuery)
        ).map(doc => ({
            id: `doc-${doc.id}`,
            type: 'doc',
            title: doc.label,
            description: doc.description || '帮助文档',
            icon: doc.icon || BookOpen,
            // 跳转到 docs 页面，并带上 Tab 参数
            // DocsView 需要能够解析 activeTab 参数，例如 /docs:getting-started
            action: (nav) => nav(`/docs:${doc.id}`),
            score: 8,
        }));
    }
}

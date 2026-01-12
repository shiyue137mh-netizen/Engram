import { SearchAdapter, SearchResult } from '../SearchService';
import { SettingsManager } from '@/services/settings/Persistence';
import { FileText, Book } from 'lucide-react';

export class PresetAdapter implements SearchAdapter {
    async search(query: string): Promise<SearchResult[]> {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) return [];

        const results: SearchResult[] = [];

        // 1. Search Prompt Templates
        const templates = SettingsManager.get('promptTemplates') || [];
        templates.forEach(t => {
            if (t.name.toLowerCase().includes(lowerQuery)) {
                results.push({
                    id: `template-${t.id}`,
                    type: 'setting', // or 'template'
                    title: `模板: ${t.name}`,
                    description: `Prompt Template (${t.category})`,
                    icon: FileText,
                    action: (nav) => nav('presets:prompt'), // Ideally navigates to specific template
                    score: 7
                });
            }
        });

        return results;
    }
}

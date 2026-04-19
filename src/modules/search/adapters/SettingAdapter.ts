import type { SearchAdapter, SearchResult } from '../SearchService';
import { Cpu, Database, Key, MessageSquare, Settings, Sliders } from 'lucide-react';

export class SettingAdapter implements SearchAdapter {
    async search(query: string): Promise<SearchResult[]> {
        const lowerQuery = query.toLowerCase().trim();
        return this.getAllSettings().filter(s =>
            s.title.toLowerCase().includes(lowerQuery) ||
            s.keywords?.some(k => k.toLowerCase().includes(lowerQuery))
        );
    }

    private getAllSettings(): SearchResult[] {
        return [
            // API Settings
            {
                id: 'setting-api-key',
                type: 'setting',
                title: '配置 API Key',
                description: '设置 LLM 连接凭证',
                icon: Key,
                action: (nav) => nav('/api'), // Default to API page
                keywords: ['api', 'key', 'token', 'credential'],
                score: 8
            },
            {
                action: (nav) => nav('/api'),
                description: '更改当前使用的 LLM 模型',
                icon: Cpu,
                id: 'setting-model',
                keywords: ['model', 'llm', 'change', 'switch'],
                score: 8,
                title: '切换模型 (Model)',
                type: 'setting'
            },
            // Parameters
            {
                action: (nav) => nav('/api'),
                description: '控制生成的随机性',
                icon: Sliders,
                id: 'setting-temperature',
                keywords: ['temp', 'temperature', 'random', 'creativity'],
                score: 7,
                title: '调整温度 (Temperature)',
                type: 'setting'
            },
            {
                action: (nav) => nav('/api'),
                description: '核采样参数',
                icon: Sliders,
                id: 'setting-top-p',
                keywords: ['top', 'p', 'nucleus', 'sampling'],
                score: 7,
                title: '调整 Top P',
                type: 'setting'
            },
            // Vector/RAG
            {
                id: 'setting-vector',
                type: 'setting',
                title: '向量化配置 (Vectorization)',
                description: '管理向量模型和存储',
                icon: Database,
                action: (nav) => nav('/processing'), // Processing:vectorization ideally
                keywords: ['vector', 'embedding', 'db', 'store'],
                score: 7
            },
            {
                id: 'setting-recall',
                type: 'setting',
                title: '召回设置 (Recall)',
                description: '调整 RAG 召回参数和模式',
                icon: MessageSquare,
                action: (nav) => nav('/processing'), // Processing:recall
                keywords: ['recall', 'rag', 'retrieval', 'search'],
                score: 7
            }
        ];
    }
}

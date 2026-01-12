import { SearchAdapter, SearchResult } from '../SearchService';
import { Settings, Sliders, Key, Database, Cpu, MessageSquare } from 'lucide-react';

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
                id: 'setting-model',
                type: 'setting',
                title: '切换模型 (Model)',
                description: '更改当前使用的 LLM 模型',
                icon: Cpu,
                action: (nav) => nav('/api'),
                keywords: ['model', 'llm', 'change', 'switch'],
                score: 8
            },
            // Parameters
            {
                id: 'setting-temperature',
                type: 'setting',
                title: '调整温度 (Temperature)',
                description: '控制生成的随机性',
                icon: Sliders,
                action: (nav) => nav('/api'),
                keywords: ['temp', 'temperature', 'random', 'creativity'],
                score: 7
            },
            {
                id: 'setting-top-p',
                type: 'setting',
                title: '调整 Top P',
                description: '核采样参数',
                icon: Sliders,
                action: (nav) => nav('/api'),
                keywords: ['top', 'p', 'nucleus', 'sampling'],
                score: 7
            },
            // Vector/RAG
            {
                id: 'setting-vector',
                type: 'setting',
                title: '向量化配置 (Vectorization)',
                description: '管理向量模型和存储',
                icon: Database,
                action: (nav) => nav('/processing'), // processing:vectorization ideally
                keywords: ['vector', 'embedding', 'db', 'store'],
                score: 7
            },
            {
                id: 'setting-recall',
                type: 'setting',
                title: '召回设置 (Recall)',
                description: '调整 RAG 召回参数和模式',
                icon: MessageSquare,
                action: (nav) => nav('/processing'), // processing:recall
                keywords: ['recall', 'rag', 'retrieval', 'search'],
                score: 7
            }
        ];
    }
}

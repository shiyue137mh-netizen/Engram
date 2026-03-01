/**
 * ModelService - 统一的模型列表获取服务
 *
 * 支持从各类 API 端点获取可用模型列表
 */

import { Logger } from '@/core/logger';

const MODULE = 'ModelService';

/**
 * 模型信息
 */
export interface ModelInfo {
    id: string;
    name?: string;
    contextLength?: number;
    owned_by?: string;
}

/**
 * API 类型
 */
export type ModelAPIType = 'openai' | 'ollama' | 'vllm' | 'cohere' | 'jina' | 'voyage';

/**
 * 获取模型配置
 */
export interface FetchModelsConfig {
    apiUrl: string;
    apiKey?: string;
    timeout?: number;
}

export class ModelService {
    private static readonly DEFAULT_TIMEOUT = 10000; // 10秒

    /**
     * 通用入口：根据 API 类型获取模型列表
     */
    static async fetchModels(type: ModelAPIType, config: FetchModelsConfig): Promise<ModelInfo[]> {
        switch (type) {
            case 'openai':
                return this.fetchOpenAIModels(config);
            case 'ollama':
                return this.fetchOllamaModels(config);
            case 'vllm':
                return this.fetchVLLMModels(config);
            case 'cohere':
                return this.fetchCohereModels(config);
            case 'jina':
            case 'voyage':
                // 这些服务通常不提供模型列表 API，返回预设列表
                return this.getPresetModels(type);
            default:
                Logger.warn(MODULE, `Unknown API type: ${type}`);
                return [];
        }
    }

    /**
     * 获取 OpenAI 兼容 API 的模型列表
     * 适用于: OpenAI, Azure, 自定义 OpenAI 兼容服务
     */
    static async fetchOpenAIModels(config: FetchModelsConfig): Promise<ModelInfo[]> {
        const { apiUrl, apiKey, timeout = this.DEFAULT_TIMEOUT } = config;

        // V0.9.9: 移除自动填充 /v1 逻辑
        // 假设用户已提供正确的 base URL (如 http://localhost:8000/v1)
        const baseUrl = apiUrl.replace(/\/+$/, '');
        const modelsUrl = `${baseUrl}/models`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            if (apiKey) {
                headers['Authorization'] = `Bearer ${apiKey}`;
            }

            const response = await fetch(modelsUrl, {
                method: 'GET',
                headers,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const models: ModelInfo[] = (data.data || data || []).map((m: any) => ({
                id: m.id || m.model,
                name: m.name || m.id || m.model,
                owned_by: m.owned_by,
            }));

            Logger.info(MODULE, `Fetched ${models.length} models from OpenAI API`);
            return models.sort((a, b) => a.id.localeCompare(b.id));

        } catch (error: any) {
            if (error.name === 'AbortError') {
                Logger.error(MODULE, 'OpenAI API request timeout');
            } else {
                Logger.error(MODULE, `OpenAI API error: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * 获取 Ollama 模型列表
     */
    static async fetchOllamaModels(config: FetchModelsConfig): Promise<ModelInfo[]> {
        const { apiUrl, timeout = this.DEFAULT_TIMEOUT } = config;

        // 智能提取 base URL：移除末尾斜杠和可能的 /api/... 路径
        let baseUrl = apiUrl.replace(/\/+$/, '');
        baseUrl = baseUrl.replace(/\/api\/(embeddings?|tags)$/, '');
        const tagsUrl = `${baseUrl}/api/tags`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(tagsUrl, {
                method: 'GET',
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const models: ModelInfo[] = (data.models || []).map((m: any) => ({
                id: m.name || m.model,
                name: m.name || m.model,
            }));

            Logger.info(MODULE, `Fetched ${models.length} models from Ollama`);
            return models;

        } catch (error: any) {
            Logger.error(MODULE, `Ollama API error: ${error.message}`);
            throw error;
        }
    }

    /**
     * 获取 vLLM 模型列表
     * vLLM 使用 OpenAI 兼容 API
     */
    static async fetchVLLMModels(config: FetchModelsConfig): Promise<ModelInfo[]> {
        return this.fetchOpenAIModels(config);
    }

    /**
     * 获取 Cohere 模型列表
     */
    static async fetchCohereModels(config: FetchModelsConfig): Promise<ModelInfo[]> {
        const { apiKey, timeout = this.DEFAULT_TIMEOUT } = config;

        if (!apiKey) {
            Logger.warn(MODULE, 'Cohere API key required');
            return this.getPresetModels('cohere');
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch('https://api.cohere.ai/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const models: ModelInfo[] = (data.models || [])
                .filter((m: any) => m.endpoints?.includes('embed'))
                .map((m: any) => ({
                    id: m.name,
                    name: m.name,
                    contextLength: m.context_length,
                }));

            Logger.info(MODULE, `Fetched ${models.length} embed models from Cohere`);
            return models;

        } catch (error: any) {
            Logger.error(MODULE, `Cohere API error: ${error.message}`);
            return this.getPresetModels('cohere');
        }
    }

    /**
     * 获取预设模型列表（用于不支持动态获取的服务）
     */
    static getPresetModels(type: ModelAPIType): ModelInfo[] {
        const presets: Record<string, ModelInfo[]> = {
            cohere: [
                { id: 'embed-multilingual-v3.0', name: 'Embed Multilingual v3.0' },
                { id: 'embed-english-v3.0', name: 'Embed English v3.0' },
                { id: 'embed-multilingual-light-v3.0', name: 'Embed Multilingual Light v3.0' },
                { id: 'embed-english-light-v3.0', name: 'Embed English Light v3.0' },
            ],
            jina: [
                { id: 'jina-embeddings-v3', name: 'Jina Embeddings v3' },
                { id: 'jina-embeddings-v2-base-en', name: 'Jina Embeddings v2 Base EN' },
                { id: 'jina-embeddings-v2-base-zh', name: 'Jina Embeddings v2 Base ZH' },
                { id: 'jina-colbert-v2', name: 'Jina ColBERT v2' },
            ],
            voyage: [
                { id: 'voyage-3', name: 'Voyage 3' },
                { id: 'voyage-3-lite', name: 'Voyage 3 Lite' },
                { id: 'voyage-large-2', name: 'Voyage Large 2' },
                { id: 'voyage-code-2', name: 'Voyage Code 2' },
                { id: 'voyage-multilingual-2', name: 'Voyage Multilingual 2' },
            ],
            openai: [
                { id: 'text-embedding-3-large', name: 'Text Embedding 3 Large' },
                { id: 'text-embedding-3-small', name: 'Text Embedding 3 Small' },
                { id: 'text-embedding-ada-002', name: 'Text Embedding Ada 002' },
            ],
        };

        return presets[type] || [];
    }

    /**
     * 获取常用 Rerank 模型列表
     */
    static getCommonRerankModels(): ModelInfo[] {
        return [
            { id: 'BAAI/bge-reranker-v2-m3', name: 'BGE Reranker v2 m3' },
            { id: 'BAAI/bge-reranker-large', name: 'BGE Reranker Large' },
            { id: 'BAAI/bge-reranker-base', name: 'BGE Reranker Base' },
            { id: 'cross-encoder/ms-marco-MiniLM-L-12-v2', name: 'MS MARCO MiniLM L12' },
            { id: 'Xenova/ms-marco-MiniLM-L-6-v2', name: 'MS MARCO MiniLM L6 (ONNX)' },
            { id: 'jinaai/jina-reranker-v2-base-multilingual', name: 'Jina Reranker v2 Multilingual' },
        ];
    }
}

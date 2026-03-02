import type { VectorConfig, VectorSource } from '@/config/types/rag';

/**
 * 嵌入 API 响应 (OpenAI 格式)
 */
interface OpenAIEmbeddingResponse {
    data: Array<{
        embedding: number[];
        index: number;
    }>;
    model: string;
    usage?: {
        prompt_tokens: number;
        total_tokens: number;
    };
}

/**
 * Ollama 嵌入响应
 */
interface OllamaEmbeddingResponse {
    embedding: number[];
}

/**
 * 各 API 的默认端点
 */
const DEFAULT_ENDPOINTS: Partial<Record<VectorSource, string>> = {
    openai: 'https://api.openai.com/v1/embeddings',
    ollama: 'http://localhost:11434/api/embeddings',
    vllm: 'http://localhost:8000/v1/embeddings',
    cohere: 'https://api.cohere.ai/v1/embed',
    jina: 'https://api.jina.ai/v1/embeddings',
    voyage: 'https://api.voyageai.com/v1/embeddings',
};

/**
 * 嵌入客户端
 * 负责与各家向量模型 API 的底层交互
 */
export class EmbeddingClient {
    /**
     * 根据配置调用相应的嵌入 API
     */
    static async callAPI(text: string, config: VectorConfig): Promise<number[]> {
        switch (config.source) {
            case 'openai':
            case 'custom':
            case 'vllm':
            case 'jina':
            case 'voyage':
                return this.callOpenAICompatible(text, config);

            case 'ollama':
                return this.callOllama(text, config);

            case 'cohere':
                return this.callCohere(text, config);

            default:
                throw new Error(`Unsupported vector source: ${config.source}`);
        }
    }

    /**
     * OpenAI 兼容 API 调用
     */
    private static async callOpenAICompatible(text: string, config: VectorConfig): Promise<number[]> {
        let endpoint = config.apiUrl || DEFAULT_ENDPOINTS[config.source] || '';

        // 清理末尾斜杠
        if (endpoint) {
            endpoint = endpoint.replace(/\/+$/, '');
        }

        // V0.9.9: 根据 autoSuffix 配置决定是否自动添加后缀
        // 默认 autoSuffix = true，除非用户明确关闭
        // 只补 /embeddings，用户需填写带 /v1 的完整 base URL
        if (config.autoSuffix !== false && config.source !== 'ollama') {
            // 仅当 URL 不包含 /embeddings 时才添加
            if (!endpoint.includes('/embeddings')) {
                endpoint = `${endpoint}/embeddings`;
            }
        }

        if (!endpoint) {
            throw new Error('API endpoint not configured');
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        if (config.apiKey) {
            headers['Authorization'] = `Bearer ${config.apiKey}`;
        }

        const body: Record<string, any> = {
            model: config.model || 'text-embedding-3-small',
            input: text,
        };

        // 可选: 指定维度 (OpenAI text-embedding-3 支持)
        if (config.dimensions) {
            body.dimensions = config.dimensions;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorText = await response.text();
                // 增强错误信息，包含请求 URL
                throw new Error(`API error ${response.status} at ${endpoint}: ${errorText}`);
            }

            const data = await response.json() as OpenAIEmbeddingResponse;
            if (!data.data || data.data.length === 0) {
                throw new Error('No embedding data returned');
            }

            return data.data[0].embedding;
        } catch (e: any) {
            // 再次捕获以确保 URL 信息暴露
            if (!e.message.includes('at http')) {
                throw new Error(`Request to ${endpoint} failed: ${e.message}`);
            }
            throw e;
        }
    }

    /**
     * Ollama API 调用
     */
    private static async callOllama(text: string, config: VectorConfig): Promise<number[]> {
        let endpoint = config.apiUrl || DEFAULT_ENDPOINTS.ollama!;

        // 智能 URL 处理：
        // - 如果已包含 /api/embed 或 /api/embeddings 路径，直接使用
        // - 否则当作 base URL，自动拼接 /api/embeddings
        endpoint = endpoint.replace(/\/+$/, '');
        if (!endpoint.includes('/api/embed')) {
            endpoint = `${endpoint}/api/embeddings`;
        }

        // 智能判断是否为新版 API (/api/embed)
        // 新版 API 使用 "input" 字段，旧版使用 "prompt" 字段
        const isNewEndpoint = endpoint.includes('/api/embed') && !endpoint.includes('/api/embeddings');

        const requestBody: Record<string, any> = {
            model: config.model || 'nomic-embed-text',
        };

        if (isNewEndpoint) {
            requestBody.input = text;
        } else {
            requestBody.prompt = text;
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ollama error ${response.status}: ${errorText}`);
        }

        const data = await response.json() as { embedding?: number[], embeddings?: number[][] };

        // 兼容处理：
        // 1. 旧版返回 { embedding: [...] }
        // 2. 新版返回 { embeddings: [[...]] }
        if (data.embedding) {
            return data.embedding;
        }

        if (data.embeddings && data.embeddings.length > 0) {
            return data.embeddings[0];
        }

        throw new Error(`No embedding data returned in Ollama response. Keys: ${Object.keys(data).join(', ')}`);
    }

    /**
     * Cohere API 调用
     */
    private static async callCohere(text: string, config: VectorConfig): Promise<number[]> {
        const endpoint = DEFAULT_ENDPOINTS.cohere!;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
                model: config.model || 'embed-multilingual-v3.0',
                texts: [text],
                input_type: 'search_document',
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Cohere error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        if (!data.embeddings || data.embeddings.length === 0) {
            throw new Error('No embedding data returned');
        }

        return data.embeddings[0];
    }

}

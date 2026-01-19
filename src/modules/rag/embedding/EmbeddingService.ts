/**
 * EmbeddingService V0.7
 *
 * 通用向量化 Pipeline 组件
 * - 支持并发队列处理
 * - 适配多种向量 API (OpenAI, Ollama, vLLM, Cohere, Jina, Voyage)
 * - 可用于 EventNode 和 EntityNode
 */

import type { VectorConfig, VectorSource } from '@/config/types/rag';
import type { EventNode } from '@/data/types/graph';
import { getDbForChat, tryGetDbForChat } from '@/data/db';
import { getCurrentChatId } from '@/integrations/tavern/context';
import { Logger, LogModule } from '@/core/logger';

// ==================== 类型定义 ====================

/**
 * 嵌入请求
 */
export interface EmbedRequest {
    id: string;
    text: string;
}

/**
 * 嵌入结果
 */
export interface EmbedResult {
    id: string;
    embedding: number[];
    error?: string;
}

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
 * 嵌入进度回调
 */
export type EmbedProgressCallback = (current: number, total: number, errors: number) => void;

// ==================== 常量 ====================

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
 * 默认并发数
 */
const DEFAULT_CONCURRENCY = 5;

// ==================== EmbeddingService ====================

export class EmbeddingService {
    private config: VectorConfig | null = null;
    private concurrency: number = DEFAULT_CONCURRENCY;
    private stopSignal: boolean = false;

    /**
     * 设置向量配置
     */
    public setConfig(config: VectorConfig) {
        this.config = config;
    }

    /**
     * 设置并发数
     */
    public setConcurrency(n: number) {
        this.concurrency = Math.max(1, Math.min(20, n));
    }

    /**
     * 停止当前进行的嵌入任务
     */
    public stop() {
        this.stopSignal = true;
    }

    /**
     * 重置停止信号
     */
    public reset() {
        this.stopSignal = false;
    }

    // ==================== 核心嵌入方法 ====================

    /**
     * 生成单个文本的嵌入向量
     */
    public async embed(text: string): Promise<number[]> {
        if (!this.config) {
            throw new Error('EmbeddingService: config not set');
        }

        const results = await this.embedBatch([{ id: 'single', text }]);
        if (results[0].error) {
            throw new Error(results[0].error);
        }
        return results[0].embedding;
    }

    /**
     * 批量生成嵌入 (支持并发控制)
     */
    public async embedBatch(
        requests: EmbedRequest[],
        onProgress?: EmbedProgressCallback
    ): Promise<EmbedResult[]> {
        if (!this.config) {
            throw new Error('EmbeddingService: config not set');
        }

        this.stopSignal = false;
        const results: EmbedResult[] = new Array(requests.length);
        let completed = 0;
        let errors = 0;

        // 并发处理
        const worker = async (index: number) => {
            if (index >= requests.length || this.stopSignal) return;

            const req = requests[index];
            try {
                const embedding = await this.callEmbeddingAPI(req.text);
                results[index] = { id: req.id, embedding };
            } catch (e: any) {
                errors++;
                results[index] = { id: req.id, embedding: [], error: e.message };
                Logger.warn(LogModule.RAG_EMBED, `嵌入失败: ${req.id}`, { error: e.message });
            } finally {
                completed++;
                onProgress?.(completed, requests.length, errors);
            }
        };

        // 分批并发
        for (let i = 0; i < requests.length; i += this.concurrency) {
            if (this.stopSignal) break;
            const batch = Array.from(
                { length: Math.min(this.concurrency, requests.length - i) },
                (_, j) => worker(i + j)
            );
            await Promise.all(batch);
        }

        return results;
    }

    /**
     * 调用嵌入 API
     */
    private async callEmbeddingAPI(text: string): Promise<number[]> {
        const config = this.config!;

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

            case 'transformers':
                return this.callTransformers(text, config);

            default:
                throw new Error(`Unsupported vector source: ${config.source}`);
        }
    }

    /**
     * OpenAI 兼容 API 调用
     */
    private async callOpenAICompatible(text: string, config: VectorConfig): Promise<number[]> {
        let endpoint = config.apiUrl || DEFAULT_ENDPOINTS[config.source] || '';

        // V0.9.9: 移除自动填充 /v1/embeddings 逻辑，要求用户填写完整 URL
        // 只做基本清理：移除末尾斜杠
        if (endpoint) {
            endpoint = endpoint.replace(/\/+$/, '');
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
    private async callOllama(text: string, config: VectorConfig): Promise<number[]> {
        const endpoint = config.apiUrl || DEFAULT_ENDPOINTS.ollama!;

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
    private async callCohere(text: string, config: VectorConfig): Promise<number[]> {
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

    /**
     * 本地 Transformers 调用 (通过酒馆)
     */
    private async callTransformers(text: string, _config: VectorConfig): Promise<number[]> {
        // TODO: 调用酒馆的 transformers 接口
        // 需要研究酒馆是否暴露了这个接口
        throw new Error('Transformers embedding not yet implemented');
    }

    // ==================== EventNode 批量嵌入 ====================

    /**
     * 为未嵌入的 EventNode 生成嵌入
     * @param onProgress 进度回调
     * @returns 成功嵌入的数量
     */
    public async embedUnprocessedEvents(
        onProgress?: EmbedProgressCallback
    ): Promise<{ success: number; failed: number }> {
        const chatId = getCurrentChatId();
        if (!chatId) {
            throw new Error('No current chat');
        }

        const db = getDbForChat(chatId);

        // 获取未嵌入的事件
        const events = await db.events
            .filter(e => !e.is_embedded && !e.embedding)
            .toArray();

        if (events.length === 0) {
            return { success: 0, failed: 0 };
        }

        Logger.info(LogModule.RAG_EMBED, `开始嵌入 ${events.length} 个事件`);

        // 构建请求
        const requests: EmbedRequest[] = events.map(e => ({
            id: e.id,
            text: e.summary,
        }));

        // 批量嵌入
        const results = await this.embedBatch(requests, onProgress);

        // 更新数据库
        let success = 0;
        let failed = 0;

        for (const result of results) {
            if (result.error || result.embedding.length === 0) {
                failed++;
                continue;
            }

            await db.events.update(result.id, {
                embedding: result.embedding,
                is_embedded: true,
            });
            success++;
        }

        Logger.info(LogModule.RAG_EMBED, `嵌入完成: ${success} 成功, ${failed} 失败`);
        return { success, failed };
    }

    /**
     * 为指定的事件列表生成嵌入
     */
    public async embedEvents(
        events: EventNode[],
        onProgress?: EmbedProgressCallback
    ): Promise<{ success: number; failed: number }> {
        if (events.length === 0) {
            return { success: 0, failed: 0 };
        }

        const chatId = getCurrentChatId();
        if (!chatId) throw new Error('No current chat');
        const db = getDbForChat(chatId);

        // 构建请求
        const requests: EmbedRequest[] = events.map(e => ({
            id: e.id,
            text: e.summary,
        }));

        // 批量嵌入
        const results = await this.embedBatch(requests, onProgress);

        // 更新数据库
        let success = 0;
        let failed = 0;

        for (const result of results) {
            if (result.error || result.embedding.length === 0) {
                failed++;
                continue;
            }

            await db.events.update(result.id, {
                embedding: result.embedding,
                is_embedded: true,
            });
            success++;
        }

        return { success, failed };
    }

    /**
     * 为指定的 EventNode 生成嵌入
     */
    public async embedEvent(event: EventNode): Promise<number[]> {
        const embedding = await this.embed(event.summary);

        // 更新数据库
        const chatId = getCurrentChatId();
        if (chatId) {
            const db = tryGetDbForChat(chatId);
            if (db) {
                await db.events.update(event.id, {
                    embedding,
                    is_embedded: true,
                });
            }
        }

        return embedding;
    }

    /**
     * 重新嵌入所有事件 (模型切换后使用)
     */
    public async reembedAllEvents(
        onProgress?: EmbedProgressCallback
    ): Promise<{ success: number; failed: number }> {
        const chatId = getCurrentChatId();
        if (!chatId) {
            throw new Error('No current chat');
        }

        const db = getDbForChat(chatId);

        // 获取所有事件
        const events = await db.events.toArray();

        if (events.length === 0) {
            return { success: 0, failed: 0 };
        }

        Logger.info(LogModule.RAG_EMBED, `重新嵌入 ${events.length} 个事件`);

        // 清空现有嵌入标记
        for (const event of events) {
            await db.events.update(event.id, {
                embedding: undefined,
                is_embedded: false,
            });
        }

        // 重新嵌入
        return this.embedUnprocessedEvents(onProgress);
    }

    // ==================== 工具方法 ====================

    /**
     * 计算余弦相似度
     */
    public cosineSimilarity(vecA: number[], vecB: number[]): number {
        if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dot += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }

        const denom = Math.sqrt(normA) * Math.sqrt(normB);
        return denom === 0 ? 0 : dot / denom;
    }

    /**
     * 获取嵌入统计信息
     */
    public async getEmbeddingStats(): Promise<{
        total: number;
        embedded: number;
        pending: number;
    }> {
        const chatId = getCurrentChatId();
        if (!chatId) {
            return { total: 0, embedded: 0, pending: 0 };
        }

        const db = tryGetDbForChat(chatId);
        if (!db) {
            return { total: 0, embedded: 0, pending: 0 };
        }

        const events = await db.events.toArray();
        const embedded = events.filter(e => e.is_embedded).length;

        return {
            total: events.length,
            embedded,
            pending: events.length - embedded,
        };
    }
}

// 导出单例
export const embeddingService = new EmbeddingService();

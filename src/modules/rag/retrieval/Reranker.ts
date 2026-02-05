/**
 * RerankService - Rerank API 调用服务
 *
 * V0.8.5: 用于对向量检索结果进行重排序
 * 支持 OpenAI 兼容格式的 Rerank API
 */

import { SettingsManager } from '@/config/settings';
import type { RerankConfig } from '@/config/types/rag';
import { Logger, LogModule } from '@/core/logger';

// ==================== 类型定义 ====================

/**
 * Rerank 结果项
 */
interface RerankResultItem {
    /** 文档在原始列表中的索引 */
    index: number;
    /** 相关性分数 (通常 0-1) */
    relevance_score: number;
}

/**
 * Rerank API 响应格式
 */
interface RerankAPIResponse {
    results?: RerankResultItem[];
    data?: RerankResultItem[];
}

// ==================== RerankService ====================

class RerankService {
    private static instance: RerankService;

    private constructor() { }

    static getInstance(): RerankService {
        if (!RerankService.instance) {
            RerankService.instance = new RerankService();
        }
        return RerankService.instance;
    }

    /**
     * 获取 Rerank 配置
     */
    private getConfig(): RerankConfig | null {
        const apiSettings = SettingsManager.get('apiSettings');
        return apiSettings?.rerankConfig || null;
    }

    /**
     * 检查 Rerank 是否启用且配置有效
     */
    isEnabled(): boolean {
        const config = this.getConfig();
        return !!(config?.enabled && config.url && config.model);
    }

    private isReranking = false;
    private lastRequestTime = 0;

    /**
     * 调用 Rerank API 对文档进行重排序
     *
     * @param query 查询文本
     * @param documents 待排序的文档列表
     * @returns 排序后的结果，按相关性降序排列
     */
    async rerank(query: string, documents: string[]): Promise<RerankResultItem[]> {
        const config = this.getConfig();

        if (!config?.enabled) {
            Logger.debug(LogModule.RAG_RERANK, 'Rerank 未启用，返回原始顺序');
            return documents.map((_, i) => ({ index: i, relevance_score: 0 }));
        }

        if (!config.url || !config.model) {
            Logger.warn(LogModule.RAG_RERANK, 'Rerank 配置不完整', { url: config.url, model: config.model });
            return documents.map((_, i) => ({ index: i, relevance_score: 0 }));
        }

        if (documents.length === 0) {
            return [];
        }

        // V1.2.4: 并发控制 & 频率限制 (RPM 保护)
        if (this.isReranking) {
            Logger.warn(LogModule.RAG_RERANK, '已有 Rerank 任务正在进行，跳过本次请求以防止堵塞');
            return documents.map((_, i) => ({ index: i, relevance_score: 0 }));
        }

        // 简单的频率限制：距离上次请求至少间隔 100ms
        const now = Date.now();
        const waitTime = Math.max(0, 100 - (now - this.lastRequestTime));
        if (waitTime > 0) {
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.isReranking = true;
        this.lastRequestTime = Date.now();

        try {
            // 构建 API 端点
            // V0.9.9: 根据 autoSuffix 配置决定是否自动添加后缀
            let endpoint = config.url.replace(/\/+$/, '');
            if (config.autoSuffix !== false && !endpoint.endsWith('/rerank')) {
                endpoint = `${endpoint}/rerank`;
            }

            Logger.debug(LogModule.RAG_RERANK, '调用 Rerank API', {
                endpoint,
                model: config.model,
                queryLength: query.length,
                documentCount: documents.length,
            });

            const startTime = Date.now();
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(config.apiKey && {
                        'Authorization': `Bearer ${config.apiKey}`
                    })
                },
                body: JSON.stringify({
                    model: config.model,
                    query,
                    documents,
                    top_n: config.topN || 5,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Rerank API 错误 (${response.status}): ${errorText}`);
            }

            const data: RerankAPIResponse = await response.json();
            const latency = Date.now() - startTime;

            // 兼容不同 API 返回格式
            const results = data.results || data.data || [];

            // V1.2.4: 详细的分数分布分析
            const scores = results.map(r => r.relevance_score);
            const topScore = scores.length > 0 ? Math.max(...scores) : 0;
            const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            const passingCount = scores.filter(s => s >= 0.5).length; // 假设 0.5 为及格线

            Logger.info(LogModule.RAG_RERANK, 'Rerank 完成', {
                resultCount: results.length,
                topScore: topScore.toFixed(4),
                avgScore: avgScore.toFixed(4),
                passingCount,
                latency: `${latency}ms`,
            });

            // 如果最高分太低，进行警告并记录，方便调试
            if (topScore < 0.3 && results.length > 0) {
                Logger.warn(LogModule.RAG_RERANK, '警告：Rerank 最高分极低', { topScore, query: query.slice(0, 50) });
            }

            // 按相关性降序排列
            return results.sort((a, b) => b.relevance_score - a.relevance_score);

        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : '未知错误';
            Logger.error(LogModule.RAG_RERANK, 'Rerank 调用失败', { error: errorMsg });

            // 失败时返回原始顺序
            return documents.map((_, i) => ({ index: i, relevance_score: 0 }));
        } finally {
            this.isReranking = false;
        }
    }

    /**
     * 获取混合权重 (alpha)
     * 0 = 纯向量检索评分，1 = 纯 Rerank 评分
     */
    getHybridAlpha(): number {
        const config = this.getConfig();
        return config?.hybridAlpha ?? 0.5;
    }
}

/** 单例导出 */
export const rerankService = RerankService.getInstance();

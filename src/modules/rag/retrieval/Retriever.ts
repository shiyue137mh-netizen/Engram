/**
 * Retriever Service
 *
 * V0.8.5: 扩展支持向量检索 + Rerank 混合召回
 *
 * 召回模式：
 * - full: 预处理 + Embedding + Rerank
 * - standard: Embedding + Rerank
 * - light: 仅 Embedding
 * - llm_only: LLM 直接召回 (未实现，留作后续)
 */

import { tryGetDbForChat } from '@/data/db';
import { getCurrentChatId } from '@/integrations/tavern';
import { SettingsManager } from '@/config/settings';
import { embeddingService } from '../embedding/EmbeddingService';
import { rerankService } from './Reranker';
import { scoreAndSort, mergeResults, type ScoredEvent, type RecallResult } from './HybridScorer';
import { RecallLogService } from '@/core/logger/RecallLogger';

import { brainRecallCache, type RecallCandidate } from './BrainRecallCache';
import { Logger, LogModule } from '@/core/logger';
import type { EventNode } from '@/data/types/graph';
import type { RecallConfig, RerankConfig, BrainRecallConfig, VectorConfig } from '@/config/types/rag';
import { DEFAULT_RECALL_CONFIG, DEFAULT_BRAIN_RECALL_CONFIG } from '@/config/types/defaults';

// ==================== 类型定义 ====================

export interface RetrievalResult {
    entries: string[]; // Formatted entries ready for injection
    nodes: EventNode[]; // Raw nodes
}

// ==================== Retriever ====================

class Retriever {
    /**
     * 获取召回配置
     */
    private getRecallConfig(): RecallConfig {
        const apiSettings = SettingsManager.get('apiSettings');
        return apiSettings?.recallConfig || DEFAULT_RECALL_CONFIG;
    }

    /**
     * 检查是否存在已向量化的节点
     * 用于决定是否需要执行向量检索
     */
    async hasVectorizedNodes(): Promise<boolean> {
        const chatId = getCurrentChatId();
        if (!chatId) return false;

        const db = tryGetDbForChat(chatId);
        if (!db) return false;

        // 检查是否存在任何带有 embeddings 的事件
        // 使用 limit(1) 提高效率，只要找到一个就返回 true
        const count = await db.events
            .filter(e => !!e.embedding && e.embedding.length > 0)
            .limit(1)
            .count();

        return count > 0;
    }

    /**
     * 获取全局向量配置
     */
    private getVectorConfig(): VectorConfig | undefined {
        const apiSettings = SettingsManager.get('apiSettings');
        return apiSettings?.vectorConfig;
    }

    /**
     * 获取 Rerank 配置
     */
    private getRerankConfig(): RerankConfig | null {
        const apiSettings = SettingsManager.get('apiSettings');
        return apiSettings?.rerankConfig || null;
    }

    /**
     * 主入口：根据配置执行召回
     *
     * @param userInput 用户输入
     * @param unifiedQueries 预处理生成的查询词列表 (可选)
     * @returns 召回结果
     */
    async search(userInput: string, unifiedQueries?: string[]): Promise<RetrievalResult> {
        const recallConfig = this.getRecallConfig();
        const vectorConfig = this.getVectorConfig();

        // 确保 EmbeddingService 获取最新配置
        if (recallConfig.useEmbedding && vectorConfig) {
            embeddingService.setConfig(vectorConfig);
        }



        // 未启用召回，使用滚动窗口策略
        if (!recallConfig.enabled) {
            Logger.debug(LogModule.RAG_RETRIEVE, '召回未启用，使用滚动窗口策略');
            // 注意：这里原本用 config.embedding.topK，现在不能用了
            // 滚动窗口暂时给个默认值或者读取 Config，这里先默认 20
            const limit = recallConfig.embedding?.topK || 20;
            return this.rollingSearch(limit);
        }

        // 暴力召回模式 (优先)
        if (recallConfig.useBruteForce) {
            Logger.debug(LogModule.RAG_RETRIEVE, '使用暴力召回 (滚动窗口)');
            const limit = recallConfig.embedding?.topK || 20;
            return this.rollingSearch(limit);
        }

        // 向量检索 (含 Rerank)
        if (recallConfig.useEmbedding) {
            return this.hybridSearch(userInput, unifiedQueries, recallConfig);
        }

        // 默认回退
        return this.rollingSearch(recallConfig.embedding?.topK || 20);
    }

    /**
     * 混合检索：Embedding + Rerank
     */
    private async hybridSearch(
        userInput: string,
        unifiedQueries: string[] | undefined,
        config: RecallConfig
    ): Promise<RetrievalResult> {
        const startTime = Date.now();

        // 1. Embedding 检索
        const embeddingStart = Date.now();
        const embeddingCandidates = await this.doEmbeddingSearch(
            userInput,
            unifiedQueries,
            config
        );
        const embeddingTime = Date.now() - embeddingStart;

        if (embeddingCandidates.length === 0) {
            Logger.debug(LogModule.RAG_RETRIEVE, 'Embedding 无匹配结果');
            return { entries: [], nodes: [] };
        }

        // 2. Rerank 重排序 (如果启用且服务可用)
        let finalCandidates = embeddingCandidates;
        let rerankTime = 0;

        if (config.useRerank && rerankService.isEnabled()) {
            const rerankStart = Date.now();

            // 构建用于 Rerank 的查询 (优先使用预处理结果)
            const rerankQuery = unifiedQueries?.[0] || userInput;
            const documents = embeddingCandidates.map(c => c.summary);

            const rerankResults = await rerankService.rerank(rerankQuery, documents);
            rerankTime = Date.now() - rerankStart;

            // 合并 Embedding 和 Rerank 分数
            const embeddingMap = new Map(embeddingCandidates.map(c => [c.id, c]));
            const alpha = rerankService.getHybridAlpha();

            finalCandidates = mergeResults(
                embeddingMap,
                rerankResults,
                embeddingCandidates,
                alpha
            );

            Logger.info(LogModule.RAG_RETRIEVE, '混合检索完成', {
                embeddingCount: embeddingCandidates.length,
                rerankCount: rerankResults.length,
                finalCount: finalCandidates.length,
                embeddingTime,
                rerankTime,
            });
        } else {
            // 仅使用 Embedding 分数排序
            finalCandidates = scoreAndSort(embeddingCandidates, 0);
        }

        // 3. 应用记忆缓存系统
        const brainConfig: BrainRecallConfig = config.brainRecall || DEFAULT_BRAIN_RECALL_CONFIG;

        if (brainConfig.enabled) {
            // V0.9.5: 类脑召回系统
            brainRecallCache.setConfig(brainConfig);
            brainRecallCache.nextRound();

            // 转换为 RecallCandidate 格式 (V1.2)
            const candidates: RecallCandidate[] = finalCandidates.map(c => {
                // V1.3 Safety Fallback: 如果 Rerank score 缺失，使用 Embedding 但封顶 0.8
                let rerankScore = c.rerankScore;
                if (rerankScore === undefined && config.useRerank) {
                    rerankScore = Math.min(0.8, c.embeddingScore || 0);
                }

                return {
                    id: c.id,
                    // V1.3.4: 注入可读名称 (用于 Brain Recall UI)
                    label: c.node?.structured_kv?.event || c.summary.slice(0, 10),
                    embeddingScore: c.embeddingScore || 0,
                    rerankScore: rerankScore,
                    // V1.3: 传递向量用于 MMR
                    embeddingVector: c.node?.embedding,
                };
            });

            // 类脑召回处理
            const brainResults = brainRecallCache.process(candidates);

            // 重新构建 finalCandidates（保留 node 引用）
            const candidateMap = new Map(finalCandidates.map(c => [c.id, c]));
            finalCandidates = brainResults
                .filter(slot => candidateMap.has(slot.id))
                .map(slot => {
                    const original = candidateMap.get(slot.id)!;
                    return {
                        ...original,
                        hybridScore: slot.finalScore, // V1.2: 用 finalScore 替代原有分数
                    };
                });

            Logger.info(LogModule.RAG_RETRIEVE, '类脑召回已应用', {
                inputCount: candidates.length,
                outputCount: finalCandidates.length,
                round: brainRecallCache.getCurrentRound(),
            });
        }

        // 4. 记录召回日志
        const totalTime = Date.now() - startTime;

        // V1.3.1: 捕获类脑召回的上下文快照
        const brainStats = brainConfig.enabled ? {
            round: brainRecallCache.getCurrentRound(),
            snapshot: brainRecallCache.getShortTermSnapshot()
        } : undefined;

        RecallLogService.log({
            query: userInput,
            preprocessedQuery: unifiedQueries?.[0],
            mode: 'hybrid',
            results: finalCandidates.map(c => ({
                eventId: c.id,
                summary: c.summary,
                category: c.node?.structured_kv?.event || 'unknown',
                embeddingScore: c.embeddingScore || 0,
                rerankScore: c.rerankScore,
                hybridScore: c.hybridScore,
                isTopK: true,
                isReranked: c.rerankScore != null,
                sourceFloor: c.node?.source_range?.start_index,
            })),
            stats: {
                totalCandidates: embeddingCandidates.length,
                topKCount: embeddingCandidates.length,
                rerankCount: finalCandidates.length,
                latencyMs: totalTime,
            },
            brainStats, // V1.3.1: 记录类脑状态
        });

        // 5. 返回结果
        const nodes = finalCandidates
            .filter(c => c.node)
            .map(c => c.node!);

        const entries = finalCandidates.map(c => c.summary);

        Logger.info(LogModule.RAG_RETRIEVE, '召回完成', {
            useEmbedding: config.useEmbedding,
            useRerank: config.useRerank,
            totalTime,
            resultCount: nodes.length,
        });

        return { entries, nodes };
    }

    /**
     * 仅 Embedding 检索 (轻量模式)
     */
    private async embeddingOnlySearch(
        userInput: string,
        unifiedQueries: string[] | undefined,
        config: RecallConfig
    ): Promise<RetrievalResult> {
        const candidates = await this.doEmbeddingSearch(userInput, unifiedQueries, config);

        // 按 Embedding 分数排序
        const sorted = scoreAndSort(candidates, 0);

        const nodes = sorted.filter(c => c.node).map(c => c.node!);
        const entries = sorted.map(c => c.summary);

        return { entries, nodes };
    }

    /**
     * 执行 Embedding 向量检索
     */
    private async doEmbeddingSearch(
        userInput: string,
        unifiedQueries: string[] | undefined,
        config: RecallConfig
    ): Promise<ScoredEvent[]> {
        const chatId = getCurrentChatId();
        if (!chatId) {
            return [];
        }

        const db = tryGetDbForChat(chatId);
        if (!db) {
            return [];
        }

        // 获取所有已嵌入的事件
        const events = await db.events
            .filter(e => !!e.embedding && e.embedding.length > 0)
            .toArray();

        if (events.length === 0) {
            Logger.debug(LogModule.RAG_RETRIEVE, '没有已嵌入的事件');
            return [];
        }

        // 构建查询列表
        const queries = unifiedQueries && unifiedQueries.length > 0
            ? unifiedQueries
            : [userInput];

        Logger.debug(LogModule.RAG_RETRIEVE, '开始向量检索', {
            queryCount: queries.length,
            eventCount: events.length,
        });

        // 多 Query 检索 (并发执行向量化)
        const candidateMap = new Map<string, ScoredEvent>();

        // 1. 并发获取所有 Query 的向量
        const queryEmbeddings = await Promise.all(
            queries.map(async (query) => {
                try {
                    const vector = await embeddingService.embed(query);
                    // 预计算 Norm Sq 以优化内循环
                    const normSq = embeddingService.computeNorm(vector);
                    return { query, vector, normSq };
                } catch (error: any) {
                    Logger.error(LogModule.RAG_RETRIEVE, `Query 向量化失败: ${query}`, {
                        message: error?.message || error,
                    });
                    return null;
                }
            })
        );

        // 2. 执行检索循环
        for (const q of queryEmbeddings) {
            if (!q) continue;

            const { vector: queryVector, normSq: queryNormSq } = q;

            // 计算与每个事件的相似度
            for (const event of events) {
                if (!event.embedding) continue;

                // 使用预计算的 Query Norm 优化性能
                const score = embeddingService.cosineSimilarity(
                    queryVector,
                    event.embedding,
                    queryNormSq,
                    undefined // Event Norm 暂未缓存，仍需实时计算
                );

                // 过滤低于阈值的结果
                const threshold = config.embedding?.minScoreThreshold ?? 0.3;
                if (score < threshold) continue;

                const existing = candidateMap.get(event.id);
                if (!existing || score > (existing.embeddingScore || 0)) {
                    candidateMap.set(event.id, {
                        id: event.id,
                        summary: event.summary,
                        embeddingScore: score,
                        node: event,
                    });
                }
            }
        }

        const vectorConfig = this.getVectorConfig();
        // 按 Embedding 分数排序，返回 Top-K
        const candidates = Array.from(candidateMap.values())
            .sort((a, b) => (b.embeddingScore || 0) - (a.embeddingScore || 0))
            .slice(0, config?.embedding?.topK || 20);

        Logger.debug(LogModule.RAG_RETRIEVE, 'Embedding 检索完成', {
            totalMatched: candidateMap.size,
            topK: candidates.length,
            topScore: candidates[0]?.embeddingScore,
        });

        return candidates;
    }

    /**
     * 滚动窗口策略 (基础模式)
     * 返回最近的事件，不使用向量检索
     */
    private async rollingSearch(limit: number): Promise<RetrievalResult> {
        const chatId = getCurrentChatId();
        if (!chatId) {
            return { entries: [], nodes: [] };
        }

        const db = tryGetDbForChat(chatId);
        if (!db) {
            return { entries: [], nodes: [] };
        }

        // 1. Get recent Level 0 (Details)
        const recentEvents = await db.events
            .filter(node => node.level === 0)
            .reverse()
            .limit(limit)
            .toArray();

        // 2. Get latest Level 1 (Macro Context)
        const latestMacro = await db.events
            .filter(node => node.level === 1)
            .reverse()
            .first();

        const nodes: EventNode[] = [...recentEvents];
        if (latestMacro) {
            nodes.unshift(latestMacro);
        }

        // 3. Format entries
        const entries = nodes.map(node => node.summary);

        return { entries, nodes };
    }

    /**
     * @deprecated 使用 search() 替代
     */
    async vectorSearch(query: string, limit: number): Promise<RetrievalResult> {
        return this.search(query);
    }
}

export const retriever = new Retriever();

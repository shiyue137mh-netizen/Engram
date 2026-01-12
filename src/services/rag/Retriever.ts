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

import { tryGetDbForChat } from '@/services/database/db';
import { getCurrentChatId } from '@/tavern/context';
import { SettingsManager } from '@/services/settings/Persistence';
import { embeddingService } from './EmbeddingService';
import { rerankService } from './RerankService';
import { scoreAndSort, mergeResults, applySticky, type ScoredEvent, type RecallResult } from './HybridScorer';
import { RecallLogService } from './RecallLogService';
import { stickyCache, DEFAULT_STICKY_CONFIG, type StickyConfig } from './StickyCache';
import { Logger } from '@/lib/logger';
import type { EventNode } from '@/services/types/graph';
import type { RecallConfig, RerankConfig } from '@/services/api/types';
import { DEFAULT_RECALL_CONFIG } from '@/services/api/types';

// ==================== 类型定义 ====================

export interface RetrievalResult {
    entries: string[]; // Formatted entries ready for injection
    nodes: EventNode[]; // Raw nodes
}

// ==================== Retriever ====================

export class Retriever {
    /**
     * 获取召回配置
     */
    private getRecallConfig(): RecallConfig {
        const apiSettings = SettingsManager.get('apiSettings');
        return apiSettings?.recallConfig || DEFAULT_RECALL_CONFIG;
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
        const config = this.getRecallConfig();

        // 新一轮召回，更新黏性缓存轮次
        stickyCache.nextRound();

        // 未启用召回，使用滚动窗口策略
        if (!config.enabled) {
            Logger.debug('Retriever', '召回未启用，使用滚动窗口策略');
            return this.rollingSearch(config.embedding.topK);
        }

        // 根据模式分发
        switch (config.mode) {
            case 'full':
            case 'standard':
                return this.hybridSearch(userInput, unifiedQueries, config);

            case 'light':
                return this.embeddingOnlySearch(userInput, unifiedQueries, config);

            case 'llm_only':
                // 暂未实现，后续可通过宏 {{engramArchivedSummaries}} 支持
                Logger.warn('Retriever', 'LLM Only 模式暂未实现，回退到滚动窗口');
                return this.rollingSearch(config.embedding.topK);

            default:
                return this.rollingSearch(config.embedding.topK);
        }
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
            Logger.debug('Retriever', 'Embedding 无匹配结果');
            return { entries: [], nodes: [] };
        }

        // 2. Rerank 重排序 (如果启用)
        let finalCandidates = embeddingCandidates;
        let rerankTime = 0;

        if (rerankService.isEnabled()) {
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

            Logger.info('Retriever', '混合检索完成', {
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

        // 3. 应用黏性惩罚
        const stickyConfig: StickyConfig = config.sticky || DEFAULT_STICKY_CONFIG;
        if (stickyConfig.enabled) {
            finalCandidates = applySticky(finalCandidates, stickyCache, stickyConfig);
            Logger.debug('Retriever', '已应用黏性惩罚', {
                candidatesWithPenalty: finalCandidates.filter(c => (c.stickyPenalty || 0) > 0).length,
            });
        }

        // 4. 记录召回日志
        const totalTime = Date.now() - startTime;
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
        });

        // 5. 标记召回的事件（用于黏性系统）
        const recalledIds = finalCandidates.map(c => c.id);
        stickyCache.markRecalledBatch(recalledIds);

        // 定期清理过期缓存
        stickyCache.cleanup(10);

        // 6. 返回结果
        const nodes = finalCandidates
            .filter(c => c.node)
            .map(c => c.node!);

        const entries = finalCandidates.map(c => c.summary);

        Logger.info('Retriever', '召回完成', {
            mode: config.mode,
            totalTime,
            resultCount: nodes.length,
            stickyRound: stickyCache.getCurrentRound(),
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
            Logger.debug('Retriever', '没有已嵌入的事件');
            return [];
        }

        // 构建查询列表
        const queries = unifiedQueries && unifiedQueries.length > 0
            ? unifiedQueries
            : [userInput];

        Logger.debug('Retriever', '开始向量检索', {
            queryCount: queries.length,
            eventCount: events.length,
        });

        // 多 Query 检索：对每个 Query 计算相似度，取最高分
        const candidateMap = new Map<string, ScoredEvent>();

        for (const query of queries) {
            try {
                // 生成查询向量
                const queryVector = await embeddingService.embed(query);

                // 计算与每个事件的相似度
                for (const event of events) {
                    if (!event.embedding) continue;

                    const score = embeddingService.cosineSimilarity(
                        queryVector,
                        event.embedding
                    );

                    // 过滤低于阈值的结果
                    if (score < config.embedding.minScoreThreshold) continue;

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
            } catch (error) {
                Logger.error('Retriever', `Query 向量化失败: ${query}`, error);
            }
        }

        // 按 Embedding 分数排序，返回 Top-K
        const candidates = Array.from(candidateMap.values())
            .sort((a, b) => (b.embeddingScore || 0) - (a.embeddingScore || 0))
            .slice(0, config.embedding.topK);

        Logger.debug('Retriever', 'Embedding 检索完成', {
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

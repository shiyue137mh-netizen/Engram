/**
 * Retriever - 混合检索器
 * 
 * 实现 Graph RAG 的核心检索逻辑：
 * 1. Entity Anchoring - 实体锚定
 * 2. Graph Expansion - 图谱扩散
 * 3. Vector Fallback - 向量补漏
 * 4. Hybrid Reranking - 混合重排序
 */

import { DexieDB } from '../../infrastructure/storage/DexieDB';
import { EventBus } from '../../infrastructure/bus/EventBus';
import type { EventNode, EntityNode } from '../types/graph';

export interface RetrievalResult {
    event: EventNode;
    score: number;
    matchedBy: 'graph' | 'vector' | 'both';
}

/**
 * 混合检索器
 */
export class Retriever {
    private brainId: string;

    constructor(brainId: string) {
        this.brainId = brainId;
    }

    /**
     * 执行检索
     */
    async retrieve(query: string, topK: number = 10): Promise<RetrievalResult[]> {
        console.log('[Retriever] Query:', query);

        EventBus.emit({
            type: 'RETRIEVAL_START',
            payload: { query, brainId: this.brainId },
        });

        const startTime = Date.now();

        // Step 1: 实体锚定
        const entities = await this.anchorEntities(query);
        console.log('[Retriever] Anchored entities:', entities.map(e => e.name));

        // Step 2: 图谱扩散
        const graphResults = await this.expandGraph(entities);

        // Step 3: 向量补漏 (TODO: 需要实现向量搜索)
        const vectorResults: RetrievalResult[] = [];

        // Step 4: 混合重排序
        const merged = this.hybridRerank(graphResults, vectorResults, topK);

        EventBus.emit({
            type: 'RETRIEVAL_COMPLETE',
            payload: {
                query,
                resultsCount: merged.length,
                duration: Date.now() - startTime,
            },
        });

        return merged;
    }

    /**
     * 实体锚定 - 通过关键词匹配找到相关实体
     */
    private async anchorEntities(query: string): Promise<EntityNode[]> {
        const allEntities = await DexieDB.getEntitiesByBrain(this.brainId);

        // 简单的关键词匹配（后续可改为更智能的 NER）
        return allEntities.filter(entity =>
            query.includes(entity.name) ||
            entity.name.includes(query)
        );
    }

    /**
     * 图谱扩散 - 获取与实体关联的所有事件
     */
    private async expandGraph(entities: EntityNode[]): Promise<RetrievalResult[]> {
        if (entities.length === 0) return [];

        const entityIds = entities.map(e => e.id);
        const events = await DexieDB.getEventsByEntities(entityIds);

        return events.map(event => ({
            event,
            score: this.calculateGraphScore(event, entityIds),
            matchedBy: 'graph' as const,
        }));
    }

    /**
     * 计算图谱匹配分数
     */
    private calculateGraphScore(event: EventNode, entityIds: string[]): number {
        const matchCount = event.relatedEntities.filter(id => entityIds.includes(id)).length;
        const matchRatio = matchCount / Math.max(entityIds.length, 1);
        return matchRatio * 0.5 + event.significance * 0.5;
    }

    /**
     * 混合重排序
     */
    private hybridRerank(
        graphResults: RetrievalResult[],
        vectorResults: RetrievalResult[],
        topK: number
    ): RetrievalResult[] {
        // 合并结果
        const merged = new Map<string, RetrievalResult>();

        for (const result of graphResults) {
            merged.set(result.event.id, result);
        }

        for (const result of vectorResults) {
            const existing = merged.get(result.event.id);
            if (existing) {
                // 两种方式都命中，分数叠加
                existing.score = existing.score * 0.5 + result.score * 0.4 + result.event.significance * 0.1;
                existing.matchedBy = 'both';
            } else {
                merged.set(result.event.id, result);
            }
        }

        // 按分数排序，取 Top-K
        return Array.from(merged.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }
}

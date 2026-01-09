/**
 * Pipeline - 数据处理编排器
 *
 * 位于 L4 业务层 (services/pipeline/)
 * 编排数据流: Extractor → memoryStore
 *
 * V0.5 重新激活版本
 */

import { v4 as uuidv4 } from 'uuid';
import { extractor, type ExtractedEvent } from './Extractor';
import { useMemoryStore } from '@/stores/memoryStore';
import type { EventNode } from '@/services/types/graph';

export interface PipelineInput {
    /** 待处理的聊天消息 */
    messages: Array<{
        role: string;
        content: string;
        name?: string;
    }>;
    /** 上下文信息 */
    context: {
        characterId: string;
        chatId: string;
    };
    /** 消息范围 */
    sourceRange: {
        start: number;
        end: number;
    };
    /** 配置 */
    config?: {
        enableRAG?: boolean;
        writeToWorldBook?: boolean;
    };
}

export interface PipelineOutput {
    success: boolean;
    events?: EventNode[];
    error?: string;
}

/**
 * Pipeline 类
 */
export class Pipeline {
    /**
     * 执行 Pipeline
     */
    async run(input: PipelineInput): Promise<PipelineOutput> {
        const store = useMemoryStore.getState();

        try {
            console.log('[Pipeline] Starting...');
            store.setProcessing(true);

            // 1. 解析 Scope (V0.5: 仅用 chatId)
            const scope = await store.resolveScope(
                input.context.chatId,
                input.context.characterId  // 作为 characterName 用于显示
            );
            console.log(`[Pipeline] Scope resolved: ${scope.uuid}`);

            // 2. 提取事件 (LLM + JSON)
            const extractedEvents = await extractor.extract(input.messages);

            if (!extractedEvents || extractedEvents.length === 0) {
                return { success: false, error: 'No events extracted from messages' };
            }
            console.log(`[Pipeline] Extracted ${extractedEvents.length} events`);

            // 3. 转换为 EventNode 并保存到 DB
            const savedEvents: EventNode[] = [];

            for (const extracted of extractedEvents) {
                // Burn-in: 将时间锚点合并到 summary 前面
                const burnedSummary = extracted.meta.time_anchor
                    ? `(${extracted.meta.time_anchor}) ${extracted.summary}`
                    : extracted.summary;

                const eventNode = await store.saveEvent({
                    scope_id: scope.id!,
                    summary: burnedSummary,  // 烧录后的 summary
                    structured_kv: extracted.meta,
                    significance_score: extracted.significance_score,
                    level: 0,  // Raw event
                    source_range: {
                        start_index: input.sourceRange.start,
                        end_index: input.sourceRange.end
                    }
                });
                savedEvents.push(eventNode);
            }
            console.log(`[Pipeline] Saved ${savedEvents.length} events to DB`);

            // 4. 刷新宏缓存 (让 {{engramSummaries}} 立即可用)
            const { MacroService } = await import('@/tavern/MacroService');
            await MacroService.refreshCache();

            // 5. 更新进度
            await store.setLastSummarizedFloor(input.sourceRange.end);

            console.log('[Pipeline] Completed successfully');
            return { success: true, events: savedEvents };

        } catch (error) {
            console.error('[Pipeline] Failed:', error);
            return { success: false, error: String(error) };
        } finally {
            store.setProcessing(false);
        }
    }
}

/** 默认实例 */
export const pipeline = new Pipeline();

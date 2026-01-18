/**
 * Pipeline - 数据处理编排器
 *
 * V0.6: 优化性能 - 直接接收已解析的 JSON，不再调用 Extractor LLM
 */

import { v4 as uuidv4 } from 'uuid';
import { useMemoryStore } from '@/state/memoryStore';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import type { EventNode } from '@/data/types/graph';

export interface PipelineInput {
    /** JSON 格式的事件数据 (来自 SummarizerService 的 LLM 输出) */
    jsonContent: string;
    /** 消息范围 */
    sourceRange: {
        start: number;
        end: number;
    };
}

export interface PipelineOutput {
    success: boolean;
    events?: EventNode[];
    error?: string;
}

/** 从 JSON 解析的事件结构 */
interface ParsedEvent {
    summary: string;
    meta: {
        time_anchor?: string;
        role?: string[];
        location?: string;
        event?: string;
        logic?: string[];
        causality?: string;
    };
    significance_score: number;
}

interface ParsedEventsResponse {
    events: ParsedEvent[];
}

/**
 * Pipeline 类
 */
export class Pipeline {
    /**
     * 执行 Pipeline
     * V0.6: 直接解析 JSON，不再调用 Extractor LLM
     */
    async run(input: PipelineInput): Promise<PipelineOutput> {
        const store = useMemoryStore.getState();
        const startTime = Date.now();

        try {
            console.log('[Pipeline] Starting...');
            store.setProcessing(true);

            // 1. 初始化当前聊天数据库
            const db = await store.initChat();
            if (!db) {
                return { success: false, error: 'No chat context available' };
            }
            console.log(`[Pipeline] Chat database initialized (${Date.now() - startTime}ms)`);

            // 2. 解析 JSON (不再调用 LLM！)
            const parsed = RobustJsonParser.parse<ParsedEventsResponse>(input.jsonContent);

            if (!parsed || !parsed.events || parsed.events.length === 0) {
                console.warn('[Pipeline] No events found in JSON');
                return { success: false, error: 'No events in JSON content' };
            }
            console.log(`[Pipeline] Parsed ${parsed.events.length} events from JSON (${Date.now() - startTime}ms)`);

            // 3. 转换为 EventNode 并保存到 DB
            const savedEvents: EventNode[] = [];

            for (const parsedEvent of parsed.events) {
                // V0.7 完整烧录格式：
                // 标题:
                // (时间 | 地点 | 人物) summary
                // [逻辑: ...] [因果: ...]
                const meta = parsedEvent.meta;

                // 构建元数据行
                const metaParts: string[] = [];
                if (meta.time_anchor) metaParts.push(meta.time_anchor);
                if (meta.location) metaParts.push(meta.location);
                if (meta.role && meta.role.length > 0) metaParts.push(meta.role.join(', '));
                const metaLine = metaParts.length > 0 ? `(${metaParts.join(' | ')}) ` : '';

                // 构建标题行
                const titleLine = meta.event ? `${meta.event}:\n` : '';

                // 构建逻辑/因果行
                const logicParts: string[] = [];
                if (meta.logic && meta.logic.length > 0) {
                    logicParts.push(`[逻辑: ${meta.logic.join(', ')}]`);
                }
                if (meta.causality) {
                    logicParts.push(`[因果: ${meta.causality}]`);
                }
                const logicLine = logicParts.length > 0 ? `\n${logicParts.join(' ')}` : '';

                // 完整烧录文本：标题 + 元数据 + 摘要 + 逻辑因果
                let rawSummary = parsedEvent.summary;

                // 调试日志：检查解析出的 summary
                console.log(`[Pipeline] Processing event: ${meta.event || 'Unknown'}, Summary length: ${rawSummary?.length}`);

                // 兜底逻辑：防止 summary 丢失导致只显示 KV
                if (!rawSummary || rawSummary.trim() === '') {
                    console.warn('[Pipeline] Event summary is empty! Using fallback.', parsedEvent);
                    rawSummary = `[Summary Missing] ${meta.event || '无摘要内容'}`;
                }

                const burnedSummary = `${titleLine}${metaLine}${rawSummary}${logicLine}`;

                const eventNode = await store.saveEvent({
                    summary: burnedSummary,
                    structured_kv: {
                        time_anchor: meta.time_anchor || '',
                        role: meta.role || [],
                        location: meta.location || '',
                        event: meta.event || '',
                        logic: meta.logic || [],
                        causality: meta.causality || ''
                    },
                    significance_score: parsedEvent.significance_score,
                    level: 0,
                    is_embedded: false, // V0.7: 新事件默认未嵌入
                    is_archived: false, // V0.7: 新事件默认未归档
                    source_range: {
                        start_index: input.sourceRange.start,
                        end_index: input.sourceRange.end
                    }
                });
                savedEvents.push(eventNode);
            }
            console.log(`[Pipeline] Saved ${savedEvents.length} events to DB (${Date.now() - startTime}ms)`);

            // 5. 更新进度
            await store.setLastSummarizedFloor(input.sourceRange.end);

            // 4. 刷新宏缓存 (优化：只刷新 Engram DB 数据，不扫描世界书)
            const { MacroService } = await import('@/integrations/tavern/macros');
            await MacroService.refreshEngramCache();
            console.log(`[Pipeline] Macro cache refreshed (Fast) (${Date.now() - startTime}ms)`);

            // V0.9.1: 实体提取触发已移至 SummarizerService

            console.log(`[Pipeline] Completed successfully in ${Date.now() - startTime}ms`);
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

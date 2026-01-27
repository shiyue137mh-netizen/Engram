/**
 * Pipeline - 数据处理编排器 (Legacy)
 *
 * 负责接收 Summarizer 生成的 JSON 文本，进行解析、清洗并存储为 EventNode。
 * V0.6: 移除了 Extractor LLM 调用，直接解析 JSON 以提升性能。
 */

import { generateUUID } from '@/core/utils';
import { useMemoryStore } from '@/state/memoryStore';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import { Logger } from '@/core/logger';
import { regexProcessor } from '@/modules/workflow/steps';
import type { EventNode } from '@/data/types/graph';

const MODULE = 'Pipeline';

interface PipelineInput {
    /** JSON 格式的事件数据 (来自 SummarizerService 的 LLM 输出) */
    jsonContent: string;
    /** 消息范围 */
    sourceRange: {
        start: number;
        end: number;
    };
}

interface PipelineOutput {
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
class Pipeline {
    /**
     * 执行 Pipeline
     * 直接解析 JSON，并应用正则清洗
     */
    async run(input: PipelineInput): Promise<PipelineOutput> {
        const store = useMemoryStore.getState();
        const startTime = Date.now();

        try {
            Logger.debug(MODULE, '开始执行 Pipeline...');
            store.setProcessing(true);

            // 1. 初始化当前聊天数据库
            const db = await store.initChat();
            if (!db) {
                return { success: false, error: '无可用的聊天上下文 (Chat Context)' };
            }
            // Logger.debug(MODULE, `聊天数据库已初始化 (${Date.now() - startTime}ms)`);

            // 2. 预处理清洗 (移除 <think> 等标签)
            const cleanedInput = regexProcessor.process(input.jsonContent, 'output');

            // 3. 解析 JSON
            const parsed = RobustJsonParser.parse<ParsedEventsResponse>(cleanedInput);

            if (!parsed || !parsed.events || parsed.events.length === 0) {
                Logger.warn(MODULE, 'JSON 中未发现有效事件数据');
                return { success: false, error: 'JSON 内容为空或解析失败' };
            }
            Logger.info(MODULE, `成功解析 ${parsed.events.length} 个事件`, { duration: Date.now() - startTime });

            // 4. 转换为 EventNode 并保存到 DB
            const eventsToSave: Omit<EventNode, 'id' | 'timestamp'>[] = [];

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

                // 兜底逻辑：防止 summary 丢失导致只显示 KV
                if (!rawSummary || rawSummary.trim() === '') {
                    Logger.warn(MODULE, '事件摘要为空，使用兜底文本', parsedEvent);
                    rawSummary = `[Summary Missing] ${meta.event || '无摘要内容'}`;
                }

                const burnedSummary = `${titleLine}${metaLine}${rawSummary}${logicLine}`;

                eventsToSave.push({
                    summary: burnedSummary,
                    structured_kv: {
                        time_anchor: meta.time_anchor || '',
                        role: meta.role || [],
                        // V1.0.2: location 兼容 string 和 string[] 两种输入格式
                        location: Array.isArray(meta.location)
                            ? meta.location
                            : meta.location ? [meta.location] : [],
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
            }

            const savedEvents = await store.saveEvents(eventsToSave);
            Logger.info(MODULE, `已保存 ${savedEvents.length} 个事件到数据库`, { duration: Date.now() - startTime });

            // 5. 更新进度
            await store.setLastSummarizedFloor(input.sourceRange.end);

            // 6. 刷新宏缓存 (优化：只刷新 Engram DB 数据，不扫描世界书)
            const { MacroService } = await import('@/integrations/tavern/macros');
            await MacroService.refreshEngramCache();
            Logger.debug(MODULE, '宏缓存已刷新');

            Logger.success(MODULE, 'Pipeline 执行完成', { duration: Date.now() - startTime });
            return { success: true, events: savedEvents };

        } catch (error) {
            Logger.error(MODULE, 'Pipeline 执行失败', error);
            return { success: false, error: String(error) };
        } finally {
            store.setProcessing(false);
        }
    }
}

/** 默认实例 */
export const pipeline = new Pipeline();

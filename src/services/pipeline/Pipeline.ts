/**
 * Pipeline - 数据处理流水线控制器
 * 
 * 管理消息摄入的 ETL 流程：
 * 1. Summarizer - LLM 总结
 * 2. GraphBuilder - 构建图谱
 * 3. Vectorizer - 向量化
 */

import { EventBus } from '../../lib/events';
import type { EventNode, EntityNode } from '../types/graph';

export interface PipelineInput {
    messages: Array<{
        content: string;
        isUser: boolean;
        name: string;
    }>;
    brainId: string;
}

export interface PipelineOutput {
    events: EventNode[];
    entities: EntityNode[];
}

/**
 * 流水线控制器
 */
export class Pipeline {
    /**
     * 执行摄入流水线
     */
    async run(input: PipelineInput): Promise<PipelineOutput> {
        console.log('[Pipeline] Starting ingestion for brain:', input.brainId);

        EventBus.emit({
            type: 'INGESTION_START',
            payload: {
                brainId: input.brainId,
                messageRange: { start: 0, end: input.messages.length },
            },
        });

        const startTime = Date.now();

        // TODO: Step 1 - Summarizer
        // TODO: Step 2 - GraphBuilder
        // TODO: Step 3 - Vectorizer

        const result: PipelineOutput = {
            events: [],
            entities: [],
        };

        EventBus.emit({
            type: 'INGESTION_COMPLETE',
            payload: {
                brainId: input.brainId,
                eventsCreated: result.events.length,
                entitiesCreated: result.entities.length,
                duration: Date.now() - startTime,
            },
        });

        return result;
    }
}

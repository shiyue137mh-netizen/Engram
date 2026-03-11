import { SettingsManager } from '@/config/settings';
import { Logger, LogModule } from '@/core/logger';
import { generateShortUUID } from '@/core/utils';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { WorkflowEngine } from '@/modules/workflow/core/WorkflowEngine';
import { SaveEvent } from '@/modules/workflow/steps/persistence/SaveEvent';
import { ParseJson } from '@/modules/workflow/steps/processing/ParseJson';
import { BatchTask, IBatchTaskHandler } from '../types';
import { BatchUtils } from '../utils/BatchUtils';

/** 外部导入模式 */
export type ImportMode = 'fast' | 'detailed';

/** 外部导入配置 */
export interface ImportConfig {
    mode: ImportMode;
    chunkSize: number;
    overlapSize: number;
}

/**
 * 导入外部大文本的任务处理器
 * 负责分片小说/生肉、送去大模型摘要并通过 Workflow 落地
 */
export class ImportTextTask implements IBatchTaskHandler {
    readonly type = 'import';

    constructor(
        private text: string,
        private config: ImportConfig
    ) { }

    /**
     * 第一步：分片并预估需要创建的 Task 数
     */
    async estimate(): Promise<BatchTask[]> {
        const chunks = BatchUtils.chunkText(this.text, this.config.chunkSize, this.config.overlapSize);
        if (chunks.length === 0) return [];

        // 我们对于 Import 这个行为，就只构建一个宏观级的任务单元
        const mainTask: BatchTask = {
            id: generateShortUUID('imp_'),
            type: 'import',
            status: 'pending',
            name: `导入外部文本 (${chunks.length} 个片段)`,
            progress: { current: 0, total: chunks.length },
        };

        return [mainTask];
    }

    /**
     * 第二步：在 BatchEngine 的循环 tick 里逐个执行
     */
    async *execute(
        tasks: BatchTask[],
        checkStopSignal: () => boolean,
        updateContext: (taskIndex: number, progressCurrent: number) => void
    ): AsyncGenerator<void, void, unknown> {

        // ImportText 只有一个宏观任务定义在 tasks[0]
        const mainTask = tasks[0];
        const chunks = BatchUtils.chunkText(this.text, this.config.chunkSize, this.config.overlapSize);
        let success = 0;

        for (let i = 0; i < chunks.length; i++) {
            // Engine 防治机制：外部随时可能要求中断
            if (checkStopSignal()) {
                mainTask.status = 'skipped';
                // Trigger an exit loop.
                return;
            }

            let chunk = chunks[i];

            try {
                if (this.config.mode === 'detailed') {
                    // V0.9.7: 调用 LLM 生成结构化摘要
                    const llmResult = await BatchUtils.summarizeChunk(chunk, i);
                    if (checkStopSignal()) return;

                    if (llmResult) {
                        // 使用 Workflow Engine 解析 JSON 并存储
                        const savedEvents = await WorkflowEngine.run(
                            {
                                name: 'ImportFlow',
                                steps: [new ParseJson(), new SaveEvent()]
                            },
                            {
                                llmResponse: {
                                    content: llmResult,
                                    success: true,
                                    tokenUsage: 0
                                },
                                input: {
                                    // 模拟 range，用于 SaveEvent 记录 source_range
                                    range: [i, i]
                                }
                            }
                        );
                        if (checkStopSignal()) return;

                        if (Array.isArray(savedEvents) && savedEvents.length > 0) {
                            // Pipeline 已处理存储，只需嵌入
                            // V1.2.2: 联动嵌入前确保配置已加载
                            const vectorConfig = SettingsManager.get('apiSettings')?.vectorConfig;
                            if (vectorConfig) {
                                embeddingService.setConfig(vectorConfig);
                            }

                            for (const evt of savedEvents) {
                                await embeddingService.embedEvent(evt);
                            }

                            success++;
                            updateContext(0, i + 1);
                            yield; // 通知 Engine 我们可以推进进度
                            continue;  // 跳过后续的直接存储逻辑
                        }
                    }

                    // Fix P3: 降级保护：如果 LLM 返回了数据，尝试抢救 partial summary 复用
                    let fallbackSummary = chunk;
                    if (llmResult && typeof llmResult === 'string') {
                        const summaryMatch = llmResult.match(/"summary"\s*:\s*"(.*?[^\\])"/);
                        if (summaryMatch && summaryMatch[1]) {
                            fallbackSummary = summaryMatch[1];
                            Logger.info(LogModule.BATCH, `分块 ${i} 抢救提取了部分 summary 字段成功`);
                        }
                    }

                    // 降级：LLM 失败或 Pipeline 解析失败，使用原文/抢救文
                    Logger.warn(LogModule.BATCH, `分块 ${i} 回退为原文/抢救文`);
                    chunk = fallbackSummary;
                }

                // 快速模式 或 降级：直接存储原文/抢救文
                const fallbackEvents = await WorkflowEngine.run(
                    {
                        name: 'ImportFastFlow',
                        steps: [new SaveEvent()]
                    },
                    {
                        input: {
                            range: [i, i]
                        },
                        parsedData: {
                            events: [
                                {
                                    summary: chunk,
                                    type: 'chat',
                                    importance: 0,
                                }
                            ]
                        }
                    }
                );
                if (checkStopSignal()) return;

                if (Array.isArray(fallbackEvents) && fallbackEvents.length > 0) {
                    const vectorConfig = SettingsManager.get('apiSettings')?.vectorConfig;
                    if (vectorConfig) {
                        embeddingService.setConfig(vectorConfig);
                    }
                    for (const evt of fallbackEvents) {
                        await embeddingService.embedEvent(evt);
                    }
                    success++;
                }

            } catch (e: any) {
                Logger.error(LogModule.BATCH, `处理分块 ${i} 失败`, { error: e.message });
                // We keep moving even if a chunk falls through, but we update UI
            }

            // 每次循环末尾通知 Engine 并更新 UI
            updateContext(0, i + 1);
            yield;
        }

        Logger.info(LogModule.BATCH, `外部导入结束: ${success}/${chunks.length} 成功`);
    }
}

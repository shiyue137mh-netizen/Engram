/**
 * BatchProcessor - 批量处理服务
 *
 * V0.9.6: 支持历史消息批处理和外部 txt 导入
 * - 复用 SummarizerService、EntityBuilder、EventTrimmer、EmbeddingService
 * - 有序 Pipeline 队列编排
 */

import { v4 as uuidv4 } from 'uuid';
import { useMemoryStore } from '@/state/memoryStore';
import { summarizerService } from '@/modules/memory';
import { entityBuilder } from '@/modules/memory/EntityExtractor';
import { eventTrimmer } from '@/modules/memory/EventTrimmer';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { Logger, LogModule } from '@/core/logger';
import { notificationService } from '@/ui/services/NotificationService';
import { llmAdapter } from '@/integrations/llm/Adapter';
import { pipeline } from '@/modules/workflow/Pipeline';
import { getBuiltInTemplateByCategory } from '@/config/types/defaults';

// ==================== 类型定义 ====================

/** 任务类型 */
export type BatchTaskType = 'summary' | 'entity' | 'trim' | 'embed';

/** 任务状态 */
export type BatchTaskStatus = 'pending' | 'running' | 'done' | 'error' | 'skipped';

/** 单个批处理任务 */
export interface BatchTask {
    id: string;
    type: BatchTaskType;
    status: BatchTaskStatus;
    progress: { current: number; total: number };
    floorRange?: { start: number; end: number };
    error?: string;
}

/** 批处理队列 */
export interface BatchQueue {
    tasks: BatchTask[];
    isRunning: boolean;
    isPaused: boolean;
    currentTaskIndex: number;
    overallProgress: { current: number; total: number };
}

/** 历史分析结果 */
export interface HistoryAnalysis {
    currentFloor: number;
    startFloor: number;
    endFloor: number;
    summaryTasks: number;
    entityTasks: number;
    trimTasks: number;
    embedTasks: number;
    estimatedTokens: number;
}

/** 外部导入模式 */
export type ImportMode = 'fast' | 'detailed';

/** 外部导入配置 */
export interface ImportConfig {
    mode: ImportMode;
    chunkSize: number;
    overlapSize: number;
}

/** 进度回调 */
export type BatchProgressCallback = (queue: BatchQueue) => void;

// ==================== 默认配置 ====================

const DEFAULT_IMPORT_CONFIG: ImportConfig = {
    mode: 'detailed',
    chunkSize: 2000,
    overlapSize: 200,
};

// ==================== BatchProcessor ====================

export class BatchProcessor {
    private queue: BatchQueue = {
        tasks: [],
        isRunning: false,
        isPaused: false,
        currentTaskIndex: 0,
        overallProgress: { current: 0, total: 0 },
    };

    private onProgress?: BatchProgressCallback;
    private stopSignal = false;

    /** 分析历史消息，计算所需任务 */
    async analyzeHistory(startFloor = 0, endFloor?: number): Promise<HistoryAnalysis> {
        const status = summarizerService.getStatus();
        const currentFloor = status.currentFloor;
        const targetEnd = endFloor ?? currentFloor;

        const summarizerConfig = summarizerService.getConfig();
        const entityConfig = entityBuilder.getConfig();
        const trimConfig = eventTrimmer.getConfig();

        const floorRange = targetEnd - startFloor;
        const summaryInterval = summarizerConfig.floorInterval || 10;
        const entityInterval = entityConfig.floorInterval || 50;

        const summaryTasks = Math.ceil(floorRange / summaryInterval);
        const entityTasks = entityConfig.enabled ? Math.ceil(floorRange / entityInterval) : 0;
        const trimThreshold = trimConfig.countLimit || 5;
        const trimTasks = trimConfig.enabled ? Math.floor(summaryTasks / trimThreshold) : 0;
        const embedTasks = summaryTasks * 2;

        const estimatedTokens = summaryTasks * 2000 + entityTasks * 2000 + trimTasks * 2000 + embedTasks * 200;

        return {
            currentFloor,
            startFloor,
            endFloor: targetEnd,
            summaryTasks,
            entityTasks,
            trimTasks,
            embedTasks,
            estimatedTokens,
        };
    }

    /** 构建任务队列 */
    buildQueue(analysis: HistoryAnalysis): BatchTask[] {
        const tasks: BatchTask[] = [];
        const { startFloor, endFloor, summaryTasks, entityTasks, trimTasks, embedTasks } = analysis;
        const summaryInterval = summarizerService.getConfig().floorInterval || 10;
        const entityInterval = entityBuilder.getConfig().floorInterval || 50;

        for (let i = 0; i < summaryTasks; i++) {
            const taskStart = startFloor + i * summaryInterval;
            const taskEnd = Math.min(taskStart + summaryInterval, endFloor);
            tasks.push({
                id: uuidv4(),
                type: 'summary',
                status: 'pending',
                progress: { current: 0, total: 1 },
                floorRange: { start: taskStart, end: taskEnd },
            });
        }

        for (let i = 0; i < entityTasks; i++) {
            const taskStart = startFloor + i * entityInterval;
            const taskEnd = Math.min(taskStart + entityInterval, endFloor);
            tasks.push({
                id: uuidv4(),
                type: 'entity',
                status: 'pending',
                progress: { current: 0, total: 1 },
                floorRange: { start: taskStart, end: taskEnd },
            });
        }

        for (let i = 0; i < trimTasks; i++) {
            tasks.push({
                id: uuidv4(),
                type: 'trim',
                status: 'pending',
                progress: { current: 0, total: 1 },
            });
        }

        tasks.push({
            id: uuidv4(),
            type: 'embed',
            status: 'pending',
            progress: { current: 0, total: embedTasks },
        });

        return tasks;
    }

    /** 开始批处理 */
    async start(startFloor = 0, endFloor?: number, onProgress?: BatchProgressCallback): Promise<void> {
        if (this.queue.isRunning) {
            Logger.warn(LogModule.BATCH, '已在运行中');
            return;
        }

        this.onProgress = onProgress;
        this.stopSignal = false;

        const analysis = await this.analyzeHistory(startFloor, endFloor);
        this.queue.tasks = this.buildQueue(analysis);
        this.queue.isRunning = true;
        this.queue.isPaused = false;
        this.queue.currentTaskIndex = 0;
        this.queue.overallProgress = { current: 0, total: this.queue.tasks.length };

        Logger.info(LogModule.BATCH, `开始执行 ${this.queue.tasks.length} 个任务`);
        this.notifyProgress();
        await this.runQueue();
    }

    /** 执行队列 */
    private async runQueue(): Promise<void> {
        while (this.queue.currentTaskIndex < this.queue.tasks.length) {
            if (this.stopSignal) {
                Logger.info(LogModule.BATCH, '用户停止');
                break;
            }

            if (this.queue.isPaused) {
                await new Promise(resolve => setTimeout(resolve, 500));
                continue;
            }

            const task = this.queue.tasks[this.queue.currentTaskIndex];
            task.status = 'running';
            this.notifyProgress();

            try {
                await this.executeTask(task);
                task.status = 'done';
                task.progress.current = task.progress.total;
            } catch (error) {
                task.status = 'error';
                task.error = String(error);
                Logger.error(LogModule.BATCH, `任务 ${task.type} 失败`, { error: String(error) });
                // V0.9.10: 弹错误通知
                notificationService.error(`批处理任务失败: ${task.type}`, 'Engram 批处理');
            }

            this.queue.currentTaskIndex++;
            this.queue.overallProgress.current = this.queue.currentTaskIndex;
            this.notifyProgress();
        }

        this.queue.isRunning = false;
        const completedCount = this.queue.tasks.filter(t => t.status === 'done').length;
        const errorCount = this.queue.tasks.filter(t => t.status === 'error').length;
        Logger.success(LogModule.BATCH, '批处理完成');
        // V0.9.10: 弹成功通知（带统计信息）
        if (errorCount === 0) {
            notificationService.success(`批处理完成: ${completedCount} 个任务`, 'Engram', {
                action: { goto: 'processing' }
            });
        } else {
            notificationService.warning(`批处理完成: ${completedCount} 成功, ${errorCount} 失败`, 'Engram', {
                action: { goto: 'devlog' }
            });
        }
        this.notifyProgress();
    }

    /** 执行单个任务 */
    private async executeTask(task: BatchTask): Promise<void> {
        switch (task.type) {
            case 'summary':
                await this.executeSummaryTask(task);
                break;
            case 'entity':
                await this.executeEntityTask(task);
                break;
            case 'trim':
                await this.executeTrimTask(task);
                break;
            case 'embed':
                await this.executeEmbedTask(task);
                break;
        }
    }

    private async executeSummaryTask(task: BatchTask): Promise<void> {
        if (!task.floorRange) return;
        await summarizerService.setLastSummarizedFloor(task.floorRange.start);
        const result = await summarizerService.triggerSummary(true);
        if (!result) task.status = 'skipped';
    }

    private async executeEntityTask(task: BatchTask): Promise<void> {
        if (!task.floorRange) return;
        // V0.9.9: 使用 extractByRange 传入准确的任务范围
        const result = await entityBuilder.extractByRange([task.floorRange.start, task.floorRange.end], true);
        if (!result) task.status = 'skipped';
    }

    private async executeTrimTask(task: BatchTask): Promise<void> {
        const { canTrim } = await eventTrimmer.canTrim();
        if (canTrim) {
            await eventTrimmer.trim(true);
        } else {
            task.status = 'skipped';
        }
    }

    private async executeEmbedTask(task: BatchTask): Promise<void> {
        const result = await embeddingService.embedUnprocessedEvents((current: number, total: number) => {
            task.progress.current = current;
            task.progress.total = total;
            this.notifyProgress();
        });
        task.progress.current = result.success;
    }

    pause(): void {
        this.queue.isPaused = true;
        Logger.info(LogModule.BATCH, '已暂停');
        this.notifyProgress();
    }

    resume(): void {
        this.queue.isPaused = false;
        Logger.info(LogModule.BATCH, '已恢复');
        this.notifyProgress();
    }

    stop(): void {
        this.stopSignal = true;
        this.queue.isPaused = false;
        Logger.info(LogModule.BATCH, '正在停止');
    }

    reset(): void {
        this.stopSignal = true;
        this.queue = {
            tasks: [],
            isRunning: false,
            isPaused: false,
            currentTaskIndex: 0,
            overallProgress: { current: 0, total: 0 },
        };
        this.notifyProgress();
    }

    getStatus(): {
        status: BatchTaskStatus | 'idle';
        queue: BatchQueue;
        progress: number;
        currentTask: string | null;
        error: string | null;
    } {
        let status: BatchTaskStatus | 'idle' = 'idle';
        if (this.queue.isRunning) status = 'running';
        if (this.queue.isPaused) status = 'pending'; // or 'paused' if we had it
        // Check current task status
        const currentTask = this.queue.tasks[this.queue.currentTaskIndex];
        if (currentTask && currentTask.status === 'error') status = 'error';

        const progress = this.queue.overallProgress.total > 0
            ? (this.queue.overallProgress.current / this.queue.overallProgress.total) * 100
            : 0;

        return {
            status,
            queue: { ...this.queue }, // Return copy
            progress,
            currentTask: currentTask ? currentTask.type : null,
            error: currentTask?.error || null
        };
    }

    clear(): void {
        this.reset();
    }

    getQueue(): BatchQueue {
        return { ...this.queue };
    }

    private notifyProgress(): void {
        if (this.onProgress) {
            try {
                this.onProgress({ ...this.queue });
            } catch (e) {
                // Ignore UI callback errors to keep process running
                Logger.debug(LogModule.BATCH, '进度回调失败（UI 已卸载）', e);
            }
        }
    }

    // ==================== 外部 txt 导入 ====================

    chunkText(text: string, chunkSize: number, overlapSize: number): string[] {
        const chunks: string[] = [];
        let start = 0;
        while (start < text.length) {
            const end = Math.min(start + chunkSize, text.length);
            chunks.push(text.slice(start, end));
            start = end - overlapSize;
            if (start >= text.length - overlapSize) break;
        }
        return chunks;
    }

    /**
     * V0.9.7: 调用 LLM 对单个文本块生成结构化摘要
     */
    private async summarizeChunk(chunk: string, chunkIndex: number): Promise<string> {
        const template = getBuiltInTemplateByCategory('summary');
        const systemPrompt = template?.systemPrompt || '';
        const userPrompt = `请对以下外部导入的文本片段进行结构化摘要，按照系统提示的格式输出 JSON：

---
${chunk}
---`;

        try {
            const response = await llmAdapter.generate({ systemPrompt, userPrompt });
            if (response.success && response.content) {
                Logger.debug(LogModule.BATCH, `分块 ${chunkIndex} 总结完成`);
                return response.content;
            }
        } catch (error) {
            Logger.warn(LogModule.BATCH, `分块 ${chunkIndex} 总结失败`, { error });
        }
        // 降级：返回空，让调用方使用原文
        return '';
    }

    async importText(
        text: string,
        config: ImportConfig = DEFAULT_IMPORT_CONFIG,
        onProgress?: BatchProgressCallback
    ): Promise<{ success: number; failed: number }> {
        const chunks = this.chunkText(text, config.chunkSize, config.overlapSize);
        const store = useMemoryStore.getState();
        await store.initChat();

        let success = 0;
        let failed = 0;

        this.queue = {
            tasks: [{
                id: uuidv4(),
                type: 'embed',
                status: 'running',
                progress: { current: 0, total: chunks.length },
            }],
            isRunning: true,
            isPaused: false,
            currentTaskIndex: 0,
            overallProgress: { current: 0, total: chunks.length },
        };

        this.onProgress = onProgress;
        this.stopSignal = false;
        this.notifyProgress();

        for (let i = 0; i < chunks.length; i++) {
            if (this.stopSignal) break;

            const chunk = chunks[i];

            try {
                if (config.mode === 'detailed') {
                    // V0.9.7: 调用 LLM 生成结构化摘要
                    const llmResult = await this.summarizeChunk(chunk, i);

                    if (llmResult) {
                        // 尝试用 Pipeline 解析 JSON 并存储
                        const pipelineResult = await pipeline.run({
                            jsonContent: llmResult,
                            sourceRange: { start: i, end: i },
                        });

                        if (pipelineResult.success && pipelineResult.events?.length) {
                            // Pipeline 已处理存储，只需嵌入
                            for (const evt of pipelineResult.events) {
                                await embeddingService.embedEvent(evt);
                            }
                            success++;
                            this.queue.tasks[0].progress.current = i + 1;
                            this.queue.overallProgress.current = i + 1;
                            this.notifyProgress();
                            continue;  // 跳过后续的直接存储逻辑
                        }
                    }
                    // 降级：LLM 失败或 Pipeline 解析失败，使用原文
                    Logger.warn(LogModule.BATCH, `分块 ${i} 回退为原文`);
                }

                // 快速模式 或 降级：直接存储原文
                const eventNode = await store.saveEvent({
                    summary: chunk,
                    structured_kv: {
                        time_anchor: '',
                        role: [],
                        location: '',
                        event: `外部导入 #${i + 1}`,
                        logic: [],
                        causality: '',
                    },
                    significance_score: 0.5,
                    level: 0,
                    is_embedded: false,
                    is_archived: false,
                    source_range: { start_index: i, end_index: i },
                });

                await embeddingService.embedEvent(eventNode);
                success++;
            } catch (error) {
                Logger.error(LogModule.BATCH, `导入分块 ${i} 失败`, { error: String(error) });
                failed++;
            }

            this.queue.tasks[0].progress.current = i + 1;
            this.queue.overallProgress.current = i + 1;
            this.notifyProgress();
        }

        this.queue.isRunning = false;
        this.queue.tasks[0].status = 'done';
        this.notifyProgress();

        Logger.success(LogModule.BATCH, `导入完成: ${success} 成功, ${failed} 失败`);
        // V0.9.10: 弹成功通知
        if (failed === 0) {
            notificationService.success(`文本导入完成: ${success} 个分块`, 'Engram', {
                action: { goto: 'memory' }
            });
        } else {
            notificationService.warning(`文本导入: ${success} 成功, ${failed} 失败`, 'Engram', {
                action: { goto: 'devlog' }
            });
        }
        return { success, failed };
    }
}

/** 默认实例 */
export const batchProcessor = new BatchProcessor();

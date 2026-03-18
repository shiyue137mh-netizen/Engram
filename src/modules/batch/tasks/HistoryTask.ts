import { Logger, LogModule } from '@/core/logger';
import { generateShortUUID } from '@/core/utils';
import { chatManager } from '@/data/ChatManager';
import { MacroService } from '@/integrations/tavern';
import { summarizerService } from '@/modules/memory';
import { entityBuilder } from '@/modules/memory/EntityExtractor';
import { eventTrimmer } from '@/modules/memory/EventTrimmer';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { notificationService } from '@/ui/services/NotificationService';
import { BatchTask, BatchTaskType, IBatchTaskHandler } from '../types';

/**
 * 同步补全历史聊天记录的长程任务处理器
 * 执行摘要、实体抽取、归档、修剪与向量嵌入等操作
 */
export class HistoryTask implements IBatchTaskHandler {
    readonly type = 'history';

    constructor(
        private startFloor: number = 1,
        private endFloor?: number,
        private types?: BatchTaskType[]
    ) {
        // 越界保护
        this.startFloor = Math.max(1, startFloor);
    }

    /**
     * 第一步：计算历史进度的差距，推测所需补全的 Task
     */
    async estimate(): Promise<BatchTask[]> {
        const targetTypes = new Set(this.types || ['summary', 'entity', 'trim', 'embed']);

        // 我们需要重新拉取各个模块最新的状态以得到 currentFloor
        const state = await chatManager.getState();
        // @ts-ignore
        const currentFloor = state.current_floor || MacroService.getCurrentMessageCount() || 0;

        const summarizerConfig = summarizerService.getConfig();
        const entityConfig = entityBuilder.getConfig();
        const trimConfig = eventTrimmer.getConfig();

        const bufferSize = summarizerConfig.bufferSize || 0;
        const maxProcessableFloor = currentFloor - bufferSize;
        const targetEnd = this.endFloor ?? Math.max(0, maxProcessableFloor);
        const floorRange = Math.max(0, targetEnd - this.startFloor);

        const summaryInterval = summarizerConfig.floorInterval || 10;
        const entityInterval = targetTypes.has('summary') ? summaryInterval : (entityConfig.floorInterval || 50);

        const summaryTasksCount = targetTypes.has('summary') ? Math.ceil(floorRange / summaryInterval) : 0;
        const entityTasksCount = (targetTypes.has('entity') && entityConfig.enabled) ? Math.ceil(floorRange / entityInterval) : 0;
        const trimThreshold = trimConfig.countLimit || 5;
        const trimTasksCount = (targetTypes.has('trim') && trimConfig.enabled) ? Math.floor(summaryTasksCount / trimThreshold) : 0;
        // 粗略估算 embed 次数
        const embedTasksCount = targetTypes.has('embed') ? (summaryTasksCount || 1) * 2 : 0;

        let archiveTasksCount = 0;
        if (targetTypes.has('archive')) {
            const stats = await embeddingService.getEmbeddingStats(); // Fallback heuristic
            // 实际上我们要去算 Level 0 的差距，这里简化处理只出1个批次
            archiveTasksCount = stats.embedded > 0 ? 1 : 0;
        }

        const tasks: BatchTask[] = [];

        if (summaryTasksCount > 0) {
            tasks.push({
                id: generateShortUUID('sum_'),
                type: 'summary',
                status: 'pending',
                progress: { current: 0, total: summaryTasksCount },
                floorRange: { start: this.startFloor, end: targetEnd }
            });
        }
        if (entityTasksCount > 0) {
            tasks.push({
                id: generateShortUUID('ent_'),
                type: 'entity',
                status: 'pending',
                progress: { current: 0, total: entityTasksCount },
                floorRange: { start: this.startFloor, end: targetEnd }
            });
        }
        if (archiveTasksCount > 0) {
            tasks.push({
                id: generateShortUUID('arc_'),
                type: 'archive',
                status: 'pending',
                progress: { current: 0, total: 1 },
            });
        }
        if (trimTasksCount > 0) {
            tasks.push({
                id: generateShortUUID('trm_'),
                type: 'trim',
                status: 'pending',
                progress: { current: 0, total: trimTasksCount }
            });
        }
        if (embedTasksCount > 0) {
            tasks.push({
                id: generateShortUUID('emb_'),
                type: 'embed',
                status: 'pending',
                progress: { current: 0, total: embedTasksCount } // total is abstract here
            });
        }

        return tasks;
    }

    /**
     * 第二步：执行具体的子任务切片
     */
    async *execute(
        tasks: BatchTask[],
        checkStopSignal: () => boolean,
        updateContext: (taskIndex: number, progressCurrent: number) => void
    ): AsyncGenerator<void, void, unknown> {

        for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
            if (checkStopSignal()) return;

            const task = tasks[taskIndex];

            try {
                switch (task.type) {
                    case 'summary':
                        yield* this.executeSummary(task, taskIndex, checkStopSignal, updateContext);
                        break;
                    case 'entity':
                        yield* this.executeEntity(task, taskIndex, checkStopSignal, updateContext);
                        break;
                    case 'archive':
                        yield* this.executeArchive(task, taskIndex, checkStopSignal, updateContext);
                        break;
                    case 'trim':
                        yield* this.executeTrim(task, taskIndex, checkStopSignal, updateContext);
                        break;
                    case 'embed':
                        yield* this.executeEmbed(task, taskIndex, checkStopSignal, updateContext);
                        break;
                    default:
                        Logger.warn(LogModule.BATCH, `未知的任务类型: ${task.type}`);
                }
            } catch (e: any) {
                Logger.error(LogModule.BATCH, `任务 ${task.type} 执行失败`, { error: e.message });
                throw e; // 重复抛出给 Engine 捕获从而标记 Error
            }
        }
    }

    // ==================== 子模块包装执行器 ====================

    private async *executeSummary(
        task: BatchTask,
        taskIndex: number,
        checkStopSignal: () => boolean,
        updateProgress: (t: number, c: number) => void
    ) {
        if (!task.floorRange) return;

        const summaryInterval = summarizerService.getConfig().floorInterval || 10;
        let processedFloors = 0;

        const startBase = task.floorRange.start;
        const totalToProcess = task.floorRange.end - startBase;

        // 我们改为基于当前任务定义的范围进行循环，而不是全局状态
        while (processedFloors < totalToProcess) {
            if (checkStopSignal()) return;

            // 计算当前这一切片的范围
            // 考虑基准点：当前已处理 + 起始点
            const currentSliceStart = startBase + processedFloors;
            const currentSliceEnd = Math.min(task.floorRange.end, currentSliceStart + summaryInterval - 1);

            if (currentSliceStart > currentSliceEnd) break;

            try {
                // 核心修改：向 triggerSummary 传递明确的 range
                const res = await summarizerService.triggerSummary(true, [currentSliceStart, currentSliceEnd]);
                if (checkStopSignal()) return;

                // 无论成功与否，我们都推进 processedFloors，因为逻辑已外置
                processedFloors += (currentSliceEnd - currentSliceStart + 1);
            } catch (err: any) {
                Logger.error(LogModule.BATCH, `Summary Failed at range ${currentSliceStart}-${currentSliceEnd}`, { error: err.message });
                processedFloors += summaryInterval; // 跳过此分片
            }

            yield; // 释放控制权给 Engine 处理 Event loop

            updateProgress(taskIndex, Math.min(task.progress.total, Math.ceil(processedFloors / summaryInterval)));
        }
    }

    private async *executeEntity(
        task: BatchTask,
        taskIndex: number,
        checkStopSignal: () => boolean,
        updateProgress: (t: number, c: number) => void
    ) {
        if (!task.floorRange) return;

        const entityInterval = entityBuilder.getConfig().floorInterval || 50;
        let processedFloors = 0;

        while (processedFloors < task.floorRange.end - task.floorRange.start) {
            if (checkStopSignal()) return;

            const startBase = task.floorRange.start;
            const currentSliceStart = startBase + processedFloors;
            const currentSliceEnd = Math.min(task.floorRange.end, currentSliceStart + entityInterval - 1);

            if (currentSliceStart > currentSliceEnd) break;

            try {
                // 核心修改：明确传递 range，不再依赖内部 auto-delta
                const res = await entityBuilder.extractByRange([currentSliceStart, currentSliceEnd], true);
                if (res && !res.success) {
                    Logger.warn(LogModule.BATCH, `Entity extract failed for range ${currentSliceStart}-${currentSliceEnd}`, { error: res.error });
                }
            } catch (err: any) {
                Logger.error(LogModule.BATCH, `Entity extract exception for range ${currentSliceStart}-${currentSliceEnd}`, { error: err.message });
            }

            processedFloors += (currentSliceEnd - currentSliceStart + 1);
            yield; // 释放控制权
            updateProgress(taskIndex, Math.min(task.progress.total, Math.ceil(processedFloors / entityInterval)));
        }
    }

    private async *executeTrim(
        task: BatchTask,
        taskIndex: number,
        checkStopSignal: () => boolean,
        updateProgress: (t: number, c: number) => void
    ) {
        for (let i = 0; i < task.progress.total; i++) {
            if (checkStopSignal()) return;
            try {
                const res = await eventTrimmer.trim(true);
                if (res === null) {
                    Logger.warn(LogModule.BATCH, 'Trim skipped or returned null');
                }
            } catch (err: any) {
                Logger.error(LogModule.BATCH, 'Trim failed', { error: err.message });
            }
            yield; // 释放控制权
            updateProgress(taskIndex, i + 1);
        }
    }

    private async *executeEmbed(
        task: BatchTask,
        taskIndex: number,
        checkStopSignal: () => boolean,
        updateProgress: (t: number, c: number) => void
    ) {
        if (checkStopSignal()) return;
        const res = await embeddingService.embedUnprocessedEvents((current, total) => {
            // 适配 Embed 自身的回调，反演更新给批处理 Engine
            updateProgress(taskIndex, Math.min(task.progress.total, Math.ceil((current / total) * task.progress.total)));
        });

        if (res.failed > 0) {
            notificationService.warning(`有 ${res.failed} 个节点嵌入失败`, 'Engram');
        }
        yield;
        updateProgress(taskIndex, task.progress.total);
    }

    private async *executeArchive(
        task: BatchTask,
        taskIndex: number,
        checkStopSignal: () => boolean,
        updateProgress: (t: number, c: number) => void
    ) {
        if (checkStopSignal()) return;

        // V1.0 架构中 LevelManager 可能不再以类存在或需要更换方案
        // 目前暂不实现后台自动按 Level 层级归档，预留至检索张 Workflow 升级阶段
        Logger.info(LogModule.BATCH, `自动归档占位触发，当前阶段架构待实现...`);

        yield;
        updateProgress(taskIndex, task.progress.total);
    }
}

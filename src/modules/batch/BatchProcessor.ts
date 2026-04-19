/**
 * BatchProcessor - 批量长程调度服务 (Facade)
 *
 * V1.0.0 (架构升级):
 * - 作为外观模式入口，对外暴露易用的 start() API
 * - 内部由 BatchEngine 提供任务队列调度支持
 * - 具体的导入解析逻辑下发到 tasks/ 实现
 */

import { notificationService } from '@/ui/services/NotificationService';
import { BatchEngine } from './engine/BatchEngine';
import { HistoryTask } from './tasks/HistoryTask';
import type { ImportConfig} from './tasks/ImportTextTask';
import { ImportTextTask } from './tasks/ImportTextTask';
import type { BatchProgressCallback, BatchQueue, BatchTaskType } from './types';

class BatchProcessor {
    private engine: BatchEngine;

    constructor() {
        this.engine = new BatchEngine();
    }

    /** 订阅状态更新 */
    subscribe(callback: BatchProgressCallback): () => void {
        return this.engine.subscribe(callback);
    }

    /**
     * 分析并补全历史聊天记录
     * (V1.0 重构: 组装 HistoryTask 注入 Engine)
     */
    async analyzeHistory(startFloor = 0, endFloor?: number, types?: BatchTaskType[]): Promise<any> {
        try {
            const task = new HistoryTask(startFloor, endFloor, types);
            const previewTasks = await task.estimate();

            // 返回兼容旧 API 的格式给 UI
            return {
                archiveTasks: previewTasks.find(t => t.type === 'archive')?.progress.total || 0,
                embedTasks: previewTasks.find(t => t.type === 'embed')?.progress.total || 0,
                endFloor: task.endFloor,
                entityTasks: previewTasks.find(t => t.type === 'entity')?.progress.total || 0,
                startFloor: task.startFloor,
                summaryTasks: previewTasks.find(t => t.type === 'summary')?.progress.total || 0,
                trimTasks: previewTasks.find(t => t.type === 'trim')?.progress.total || 0,
            };
        } catch (error: any) {
            console.error('[BatchProcessor] 分析历史失败:', error);
            return { error: error.message };
        }
    }

    /**
     * 启动历史批量处理
     */
    async startHistory(startFloor = 0, endFloor?: number, types?: BatchTaskType[]): Promise<void> {
        notificationService.info('批量处理已启动', 'Engram Batch');
        const task = new HistoryTask(startFloor, endFloor, types);
        await this.engine.execute(task);

        // 结束检测
        const finalState = this.engine.getQueueState();
        if (finalState.tasks.some(t => t.status === 'error')) {
            notificationService.error('批量处理结束，部分任务失败，请查看控制台', 'Engram Batch');
        } else if (!finalState.isPaused && !finalState.isRunning && finalState.tasks.length > 0) {
            notificationService.success('批量处理全部完成', 'Engram Batch');
        }
    }

    /**
     * 外部文件分片批量导入
     * (V1.0 重构: 组装 ImportTextTask 注入 Engine)
     */
    async importText(text: string, config: ImportConfig): Promise<void> {
        if (!text || text.trim().length === 0) {
            notificationService.warning('导入文本为空', 'Engram Batch');
            return;
        }

        notificationService.info(`开始准备导入长文本 (共 ${text.length} 字符)`, 'Engram Batch');
        const task = new ImportTextTask(text, config);
        await this.engine.execute(task);

        // 结束检测
        const finalState = this.engine.getQueueState();
        if (finalState.tasks.some(t => t.status === 'error')) {
            notificationService.error('文本导入发生错误，请查看控制台', 'Engram Batch');
        } else if (!finalState.isPaused && !finalState.isRunning && finalState.tasks.length > 0) {
            notificationService.success('长文本导入完成并已量化落库', 'Engram Batch');
        }
    }

    /** 手动触发一次进度广播 (兼容旧 API) */
    notifyProgress(): void {
        this.engine.notifyProgress(true);
    }

    /** 获取当前队列快照 */
    get queue(): BatchQueue {
        return this.engine.getQueueState();
    }

    /** 暂停 */
    pause(): void {
        this.engine.pause();
    }

    /** 继续执行任务 */
    resume(): void {
        this.engine.resume();
    }

    /** 停止并清理 */
    stop(): void {
        this.engine.stop();
        notificationService.success('已中止批处理操作', 'Engram Batch');
    }
}

// 导出单例
export const batchProcessor = new BatchProcessor();

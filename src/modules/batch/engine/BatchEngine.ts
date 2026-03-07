import { BatchProgressCallback, BatchQueue, IBatchTaskHandler } from '../types';

/**
 * 核心调度引擎
 * 负责管理任务队列，并发锁，控制起停以及 UI 进度节流更新。
 */
export class BatchEngine {
    private queue: BatchQueue = {
        tasks: [],
        isRunning: false,
        isPaused: false,
        currentTaskIndex: 0,
        overallProgress: { current: 0, total: 0 },
    };

    private listeners: Set<BatchProgressCallback> = new Set();
    private stopSignal = false;
    private lastNotifyTime = 0;
    // 节流时间阈值 (ms)
    private readonly THROTTLE_MS = 100;

    /**
     * 订阅队列状态变化
     * @param callback 进度变更的回调函数
     * @returns unsubscribe 函数
     */
    subscribe(callback: BatchProgressCallback): () => void {
        this.listeners.add(callback);
        // 挂载时立即获取一次快照
        this.notifyProgress(true);
        return () => {
            this.listeners.delete(callback);
        };
    }

    /**
     * 手动触发通知 UI 进度
     * @param force 是否绕过节流强制触发
     */
    public notifyProgress(force = false): void {
        const now = Date.now();
        if (!force && now - this.lastNotifyTime < this.THROTTLE_MS) {
            return;
        }

        this.lastNotifyTime = now;
        // 广播不可变的队列状态副本
        for (const listener of this.listeners) {
            listener({ ...this.queue });
        }
    }

    /**
     * 暴露给任务的进度更新接口
     */
    public updateTaskProgress(taskIndex: number, currentProgress: number): void {
        if (taskIndex < 0 || taskIndex >= this.queue.tasks.length) return;

        // 同步当前的活动任务下标，以便内部抛出异常时能够正确打标
        this.queue.currentTaskIndex = taskIndex;

        this.queue.tasks[taskIndex].progress.current = currentProgress;
        this.queue.tasks[taskIndex].status = 'running';
        this.queue.overallProgress.current = this.calculateOverallProgress();
        this.notifyProgress();
    }

    private calculateOverallProgress(): number {
        return this.queue.tasks.reduce((sum, task) => sum + task.progress.current, 0);
    }

    /**
     * 获取队列的当前状态
     */
    public getQueueState(): BatchQueue {
        return { ...this.queue };
    }

    /**
     * 清空并重置队列
     */
    public clearQueue(): void {
        this.queue.tasks = [];
        this.queue.currentTaskIndex = 0;
        this.queue.overallProgress = { current: 0, total: 0 };
        this.queue.isRunning = false;
        this.queue.isPaused = false;
        this.stopSignal = false;
        this.notifyProgress(true);
    }

    /**
     * 提供一个检测停止信号的方法闭包，供上层任务切片使用
     */
    private checkStopSignal = (): boolean => {
        return this.stopSignal;
    };

    /**
     * 将预装配的 Task 投入执行列队
     * Fix P0: 消除竞态，立刻锁定 isRunning
     */
    async execute(handler: IBatchTaskHandler): Promise<void> {
        if (this.queue.isRunning) {
            console.warn('[BatchEngine] 任务仍在运行中!');
            return;
        }

        // Fix P0: Before doing any async work, immediately lock down execution.
        this.queue.isRunning = true;
        this.stopSignal = false;
        this.queue.isPaused = false;

        try {
            // 步骤1：让业务方给出此次调度的预估任务切片名细
            const tasks = await handler.estimate();
            if (tasks.length === 0) {
                // 没有要干的活
                return;
            }

            this.queue.tasks = tasks;
            this.queue.currentTaskIndex = 0;
            this.queue.overallProgress = {
                current: 0,
                total: tasks.reduce((sum, task) => sum + task.progress.total, 0)
            };
            this.notifyProgress(true);

            // 步骤2：执行生成器
            const generator = handler.execute(
                this.queue.tasks,
                this.checkStopSignal,
                // Context helper function to easily update self
                this.updateTaskProgress.bind(this)
            );

            // 消费每一个循环
            for await (const _ of generator) {
                // 等待取消暂停 (软暂停模式：挂起事件循环)
                while (this.queue.isPaused && !this.stopSignal) {
                    await new Promise(resolve => setTimeout(resolve, 300));
                }

                if (this.stopSignal) {
                    console.info('[BatchEngine] 收到中止信号，正在结束迭代');
                    break;
                }
            }

            // 执行成功收尾
            if (!this.stopSignal) {
                // 标记所有未出错的任务为 done
                this.queue.tasks.forEach(task => {
                    if (task.status !== 'error') task.status = 'done';
                });
            }
        } catch (error) {
            console.error('[BatchEngine] 执行过程发生异常:', error);
            // 将当前执行中的任务标记为 Error
            if (this.queue.tasks[this.queue.currentTaskIndex]) {
                this.queue.tasks[this.queue.currentTaskIndex].status = 'error';
                this.queue.tasks[this.queue.currentTaskIndex].error = error instanceof Error ? error.message : String(error);
            }
        } finally {
            this.queue.isRunning = false;
            this.notifyProgress(true);
        }
    }

    /**
     * 暂停任务
     */
    pause(): void {
        if (!this.queue.isRunning || this.queue.isPaused) return;
        this.queue.isPaused = true;
        this.notifyProgress(true);
    }

    /**
     * 恢复/继续任务
     */
    resume(): void {
        if (!this.queue.isRunning || !this.queue.isPaused) return;
        this.queue.isPaused = false;
        this.notifyProgress(true);
    }

    /**
     * 中止并清理任务
     */
    stop(): void {
        this.stopSignal = true;
        this.queue.isRunning = false;
        this.queue.isPaused = false;

        // Mark remaining running tasks as skipped or left as is, typically reset UI.
        this.queue.tasks.forEach(task => {
            if (task.status === 'pending' || task.status === 'running') {
                task.status = 'skipped';
            }
        });

        this.notifyProgress(true);
        // Wait a slight tick then clear (so UI sees the stop)
        setTimeout(() => this.clearQueue(), 500);
    }
}

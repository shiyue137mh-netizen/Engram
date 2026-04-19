import type { BatchProgressCallback, BatchQueue, IBatchTaskHandler } from '../types';
import { Logger } from '@/core/logger';
/**
 * 核心调度引擎
 * 负责管理任务队列，并发锁，控制起停以及 UI 进度节流更新。
 */
export class BatchEngine {
    private queue: BatchQueue = {
        currentTaskIndex: 0,
        isPaused: false,
        isRunning: false,
        overallProgress: { current: 0, total: 0 },
        tasks: [],
    };

    private listeners = new Set<BatchProgressCallback>();
    private stopSignal = false;
    private lastNotifyTime = 0;
    // 节流时间阈值 (ms)
    private readonly THROTTLE_MS = 100;

    // P2 Fix: 使用 Promise Lock 替换 setTimeout 轮询
    private pausePromise: Promise<void> | null = null;
    private pauseResolve: (() => void) | null = null;

    // P0 Fix: 执行周期 ID，用于防止 stop() 后的 setTimeout 清理误杀新任务
    private executionId = 0;

    // P2 Fix: 提取 stop 后延迟清理的常量，避免魔法数字
    private static readonly STOP_CLEAR_DELAY_MS = 500;

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
        // 广播真正不可变的队列状态副本（深层解构 tasks 和 overallProgress）
        const snapshot: BatchQueue = {
            ...this.queue,
            overallProgress: { ...this.queue.overallProgress },
            tasks: [...this.queue.tasks],
        };
        for (const listener of this.listeners) {
            listener(snapshot);
        }
    }

    /**
     * 暴露给任务的进度更新接口
     */
    public updateTaskProgress(taskIndex: number, currentProgress: number): void {
        if (taskIndex < 0 || taskIndex >= this.queue.tasks.length) {return;}

        // 同步当前的活动任务下标，以便内部抛出异常时能够正确打标
        this.queue.currentTaskIndex = taskIndex;

        // P1 Fix: 解构更新单个 task 元素
        this.queue.tasks[taskIndex] = {
            ...this.queue.tasks[taskIndex],
            progress: {
                ...this.queue.tasks[taskIndex].progress,
                current: currentProgress
            },
            status: 'running'
        };
        // P1 Fix: 更新数组引用，确保 React 能检测到变化
        this.queue.tasks = [...this.queue.tasks];

        // 不可变更新 overallProgress
        this.queue.overallProgress = {
            ...this.queue.overallProgress,
            current: this.calculateOverallProgress(),
        };
        this.notifyProgress();
    }

    private calculateOverallProgress(): number {
        return this.queue.tasks.reduce((sum, task) => sum + task.progress.current, 0);
    }

    /**
     * 获取队列的当前状态
     */
    public getQueueState(): BatchQueue {
        return {
            ...this.queue,
            overallProgress: { ...this.queue.overallProgress },
            tasks: [...this.queue.tasks],
        };
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
    private checkStopSignal = (): boolean => this.stopSignal;

    /**
     * 将预装配的 Task 投入执行列队
     * P0 Fix: isRunning 仅在 finally 中释放，引入 executionId 消除竞态
     */
    async execute(handler: IBatchTaskHandler): Promise<void> {
        if (this.queue.isRunning) {
            console.warn('[BatchEngine] 任务仍在运行中!');
            return;
        }

        // 立即锁定执行
        this.queue.isRunning = true;
        this.stopSignal = false;
        this.queue.isPaused = false;
        this.pausePromise = null;
        this.pauseResolve = null;

        // 递增执行周期 ID，标记本轮执行
        const currentExecutionId = ++this.executionId;

        try {
            // 步骤1：让业务方给出此次调度的预估任务切片名细
            const tasks = await handler.estimate();

            // P0 Fix: 中断死锁保护。如果在 estimate 期间触发了 stop，直接放弃队列覆盖
            if (this.stopSignal) {
                Logger.info('BatchEngine', '收到中止信号，正在放弃估计出的新任务');
                return;
            }

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
                // 等待取消暂停 (软暂停模式：利用 Promise Lock 挂起事件循环)
                if (this.queue.isPaused && !this.stopSignal && this.pausePromise) {
                    await this.pausePromise;
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
                    if (task.status !== 'error') {task.status = 'done';}
                });
            }
        } catch (error) {
            Logger.error('BatchEngine', '执行过程发生异常:', error);
            // 将当前执行中的任务标记为 Error
            if (this.queue.tasks[this.queue.currentTaskIndex]) {
                const currentTask = this.queue.tasks[this.queue.currentTaskIndex];
                currentTask.status = 'error';
                currentTask.error = error instanceof Error ? error.message : String(error);
                
                // 显式捕获 Error cause 附加到日志，方便 Debug 追踪深层调用链
                if (error instanceof Error) {
                    Logger.error('BatchEngine', `[${currentTask.id}] 任务失败链路追踪:`, {
                         cause: error.cause,
                         message: error.message,
                         stack: error.stack
                    });
                }
            }
        } finally {
            // P0 Fix: isRunning 仅在 finally 中释放，由正在运行的协程自己解锁
            // 但需要验证 executionId 一致，避免新一轮 execute 被旧轮的 finally 误清
            if (this.executionId === currentExecutionId) {
                this.queue.isRunning = false;
            }
            this.notifyProgress(true);
        }
    }

    /**
     * 暂停任务
     */
    pause(): void {
        if (!this.queue.isRunning || this.queue.isPaused) {return;}
        this.queue.isPaused = true;
        this.pausePromise = new Promise<void>(resolve => {
            this.pauseResolve = resolve;
        });
        this.notifyProgress(true);
    }

    /**
     * 恢复/继续任务
     */
    resume(): void {
        if (!this.queue.isRunning || !this.queue.isPaused) {return;}
        this.queue.isPaused = false;
        if (this.pauseResolve) {
            this.pauseResolve();
            this.pauseResolve = null;
            this.pausePromise = null;
        }
        this.notifyProgress(true);
    }

    /**
     * 中止并清理任务
     * P0 Fix: 不再直接设 isRunning = false，由 execute() 的 finally 块负责解锁
     */
    stop(): void {
        this.stopSignal = true;
        // P0 Fix: 不再直接设置 isRunning = false，让 execute() 的 finally 自行释放

        // 解锁暂停状态，让 execute loop 继续走到 stopSignal 检查点
        this.queue.isPaused = false;
        if (this.pauseResolve) {
            this.pauseResolve();
            this.pauseResolve = null;
            this.pausePromise = null;
        }

        // Mark remaining running tasks as skipped
        this.queue.tasks.forEach(task => {
            if (task.status === 'pending' || task.status === 'running') {
                task.status = 'skipped';
            }
        });

        this.notifyProgress(true);

        // P2 Fix: 延迟清理队列（让 UI 有时间展示 stop 状态），使用 executionId 守卫
        const stopExecutionId = this.executionId;
        setTimeout(() => {
            // 只有当 executionId 未变化（没有新任务启动）时才清理
            if (this.executionId === stopExecutionId && !this.queue.isRunning) {
                this.clearQueue();
            }
        }, BatchEngine.STOP_CLEAR_DELAY_MS);
    }
}

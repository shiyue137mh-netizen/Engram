/**
 * UseWorkflow - 批处理工作流 Hook
 */

import type { BatchQueue, BatchTaskStatus } from '@/modules/batch';
import { batchProcessor } from '@/modules/batch';
import { useCallback, useEffect, useState } from 'react';

export type WorkflowStatus = BatchTaskStatus | 'idle';

export interface UseWorkflowReturn {
    status: WorkflowStatus;
    queue: BatchQueue;
    progress: number;
    currentTask: string | null;
    error: string | null;

    start: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    clear: () => void;
}

export function useWorkflow(): UseWorkflowReturn {
    const [status, setStatus] = useState<WorkflowStatus>('idle');
    const [queue, setQueue] = useState<BatchQueue>({ currentTaskIndex: 0, isPaused: false, isRunning: false, overallProgress: { current: 0, total: 0 }, tasks: [] });
    const [progress, setProgress] = useState(0);
    const [currentTask, setCurrentTask] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 订阅 BatchProcessor 状态
    useEffect(() => {
        const updateState = (q?: BatchQueue) => {
            const currentQueue = q || batchProcessor.queue;
            setQueue(currentQueue);

            // 计算综合状态与进度
            const {isRunning} = currentQueue;
            const {isPaused} = currentQueue;
            const tCnt = currentQueue.tasks.length;

            if (tCnt === 0) {
                setStatus('idle');
                setProgress(0);
                setCurrentTask(null);
                setError(null);
                return;
            }

            if (isPaused) {setStatus('pending');}
            else if (isRunning) {setStatus('running');}
            else if (currentQueue.tasks.some(t => t.status === 'error')) {setStatus('error');}
            else {setStatus('done');}

            const total = currentQueue.overallProgress.total || 1;
            setProgress(Math.round((currentQueue.overallProgress.current / total) * 100));

            const activeTask = currentQueue.tasks[currentQueue.currentTaskIndex];
            setCurrentTask(activeTask?.name || activeTask?.type || null);
            setError(activeTask?.error || null);
        };

        // 初始拉取
        updateState();

        // 注册节流订阅
        const unsubscribe = batchProcessor.subscribe((q) => {
            updateState(q);
        });

        return () => unsubscribe();
    }, []);

    const start = useCallback(() => {
        // V1.0 架构下不再由统一的 start() 入口承接所有任务，而是通过 BatchProcessor 暴露的业务接口。
        // UI 的 start 按钮目前在设计上由业务面板自己调用（如 startHistory）
        console.warn('Generic start() is deprecated. Please use BatchProcessor.startHistory() or importText().');
    }, []);
    const pause = useCallback(() => batchProcessor.pause(), []);
    const resume = useCallback(() => batchProcessor.resume(), []);
    const stop = useCallback(() => batchProcessor.stop(), []);

    return {
        clear: stop,
        currentTask,
        error,
        pause,
        progress,
        queue,
        resume,
        start,
        status,
        stop // Map clear to stop for safety
    };
}

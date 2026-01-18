/**
 * useWorkflow - 批处理工作流 Hook
 */

import { useState, useEffect, useCallback } from 'react';
import { batchProcessor, BatchQueue, BatchTaskStatus } from '@/modules/batch';

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
    const [queue, setQueue] = useState<BatchQueue>({ tasks: [], isRunning: false, isPaused: false, currentTaskIndex: 0, overallProgress: { current: 0, total: 0 } });
    const [progress, setProgress] = useState(0);
    const [currentTask, setCurrentTask] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 订阅 BatchProcessor 状态
    useEffect(() => {
        const updateState = () => {
            const s = batchProcessor.getStatus();
            setStatus(s.status);
            setQueue(s.queue);
            setProgress(s.progress);
            setCurrentTask(s.currentTask || null);
            setError(s.error || null);
        };

        // 初始更新
        updateState();

        // 轮询更新 (或者最好 BatchProcessor 提供订阅机制，这里暂时用轮询)
        const timer = setInterval(updateState, 500);

        return () => clearInterval(timer);
    }, []);

    const start = useCallback(() => batchProcessor.start(), []);
    const pause = useCallback(() => batchProcessor.pause(), []);
    const resume = useCallback(() => batchProcessor.resume(), []);
    const stop = useCallback(() => batchProcessor.stop(), []);
    const clear = useCallback(() => batchProcessor.clear(), []);

    return {
        status,
        queue,
        progress,
        currentTask,
        error,
        start,
        pause,
        resume,
        stop,
        clear
    };
}

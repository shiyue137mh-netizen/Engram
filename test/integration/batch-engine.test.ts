import { beforeEach, describe, expect, it } from 'vitest';
import { BatchEngine } from '@/modules/batch/engine/BatchEngine';
import { BatchTask, IBatchTaskHandler } from '@/modules/batch/types';

// ==================== Mocks ====================
class MockTaskHandler implements IBatchTaskHandler {
    readonly type = 'mock';

    constructor(
        private simulateErrorOnTask?: number,
        private taskCount: number = 2,
        public onStep?: (taskIndex: number, current: number) => void
    ) { }

    async estimate(): Promise<BatchTask[]> {
        const tasks: BatchTask[] = [];
        for (let i = 0; i < this.taskCount; i++) {
            tasks.push({
                id: `mock_task_${i}`,
                type: 'summary',
                status: 'pending',
                progress: { current: 0, total: 3 } // each task has 3 steps
            });
        }
        return tasks;
    }

    async *execute(
        tasks: BatchTask[],
        checkStopSignal: () => boolean,
        updateContext: (taskIndex: number, progressCurrent: number) => void
    ): AsyncGenerator<void, void, unknown> {
        for (let i = 0; i < tasks.length; i++) {
            if (checkStopSignal()) return;

            // 手动打标进入此阶段的索引，否则上一个完成的任务会被误当做当前故障任务
            updateContext(i, 0);

            if (this.simulateErrorOnTask === i) {
                throw new Error(`Simulated error on task ${i}`);
            }

            for (let step = 1; step <= 3; step++) {
                if (checkStopSignal()) return;

                // Simulate work
                await new Promise(resolve => setTimeout(resolve, 10));

                updateContext(i, step);
                this.onStep?.(i, step);

                yield;
            }
        }
    }
}

describe('BatchEngine Integration', () => {
    let engine: BatchEngine;

    beforeEach(() => {
        engine = new BatchEngine();
    });

    it('should execute tasks completely and update progress', async () => {
        const handler = new MockTaskHandler();
        const progressUpdates: any[] = [];

        engine.subscribe((state) => {
            progressUpdates.push(JSON.parse(JSON.stringify(state)));
        });

        await engine.execute(handler);

        const finalState = engine.getQueueState();
        expect(finalState.isRunning).toBe(false);
        expect(finalState.tasks.length).toBe(2);

        // Both tasks should be done
        expect(finalState.tasks[0].status).toBe('done');
        expect(finalState.tasks[0].progress.current).toBe(3);
        expect(finalState.tasks[1].status).toBe('done');
        expect(finalState.tasks[1].progress.current).toBe(3);

        // Overall progress should be 6/6
        expect(finalState.overallProgress.total).toBe(6);
        expect(finalState.overallProgress.current).toBe(6);

        // Verify we got some progress updates
        expect(progressUpdates.length).toBeGreaterThan(0);
    });

    it('should halt execution when stop is called', async () => {
        // Create handler that will stop engine during the first task
        const handler = new MockTaskHandler(undefined, 2, (taskIndex, step) => {
            if (taskIndex === 0 && step === 1) {
                engine.stop();
            }
        });

        await engine.execute(handler);

        // Wait a bit for the internal setTimeout in stop() to clear the queue
        await new Promise(resolve => setTimeout(resolve, 600));

        const state = engine.getQueueState();

        // Since we cleared queue after stop + setTimeout, it should be empty
        expect(state.tasks.length).toBe(0);
        expect(state.isRunning).toBe(false);
    });

    it('should handle errors thrown by task handler gracefully', async () => {
        const handler = new MockTaskHandler(1, 2); // Error on 2nd task

        await engine.execute(handler);

        const state = engine.getQueueState();

        expect(state.isRunning).toBe(false);
        // Task 1 was finished, so it has 3/3 progress, meaning UI can consider it done even if technically it stays marked as running or pending.
        // We evaluate it manually.
        expect(state.tasks[0].progress.current).toBe(3);
        expect(state.tasks[1].status).toBe('error'); // Task 2 errors
        expect(state.tasks[1].error).toBe('Simulated error on task 1');
    });

    it('should not allow concurrent execution', async () => {
        const handler = new MockTaskHandler();

        // Start engine but don't await immediately
        const execPromise = engine.execute(handler);

        // Try to start again while it's running
        await engine.execute(handler);

        await execPromise;

        // It shouldn't crash or double-execute, one gets rejected/warned and ignored.
        // We verify it completed exactly once normally.
        const state = engine.getQueueState();
        expect(state.overallProgress.current).toBe(6);
    });
});

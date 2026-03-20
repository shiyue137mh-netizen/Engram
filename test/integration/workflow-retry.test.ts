import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { WorkflowEngine, WorkflowDefinition } from '@/modules/workflow/core/WorkflowEngine';
import { JobContext } from '@/modules/workflow/core/JobContext';
import { IStep, RetryConfig } from '@/modules/workflow/core/Step';

describe('WorkflowEngine Retry Mechanism', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should execute successfully on first try without delays', async () => {
        const executeMock = vi.fn().mockResolvedValue(undefined);
        const step: IStep = {
            name: 'SuccessStep',
            retry: { maxAttempts: 3, delay: 1000, backoff: 'linear' },
            execute: executeMock
        };
        const workflow: WorkflowDefinition = { name: 'W', steps: [step] };

        // 避免 timer 阻塞
        vi.useRealTimers();
        await WorkflowEngine.run(workflow, { trigger: 'manual' });
        expect(executeMock).toHaveBeenCalledTimes(1);
    });

    it('should retry on transient error and succeed eventually', async () => {
        let attempts = 0;
        const executeMock = vi.fn().mockImplementation(async () => {
            attempts++;
            if (attempts < 3) throw new Error('429 Too Many Requests');
            return undefined;
        });

        const step: IStep = {
            name: 'FlakyStep',
            retry: {
                maxAttempts: 4,
                delay: 1000,
                backoff: 'exponential',
                retryIf: (err) => err instanceof Error && err.message.includes('429')
            },
            execute: executeMock
        };
        const workflow: WorkflowDefinition = { name: 'W', steps: [step] };

        // Start workflow
        const promise = WorkflowEngine.run(workflow, { trigger: 'manual' });
        
        // Fast-forward timers
        await vi.advanceTimersByTimeAsync(1000); // 1st retry delay
        await vi.advanceTimersByTimeAsync(2000); // 2nd retry delay

        await promise;

        expect(executeMock).toHaveBeenCalledTimes(3);
    });

    it('should fail if maxAttempts is exhausted', async () => {
        const executeMock = vi.fn().mockRejectedValue(new Error('Network error'));
        
        const step: IStep = {
            name: 'FailingStep',
            retry: { maxAttempts: 2, delay: 1000, backoff: 'linear' },
            execute: executeMock
        };
        const workflow: WorkflowDefinition = { name: 'W', steps: [step] };

        const promise = WorkflowEngine.run(workflow, { trigger: 'manual' });
        promise.catch(() => {}); // prevent Unhandled Rejection
        
        await vi.advanceTimersByTimeAsync(1000); // Wait for the only retry delay

        await expect(promise).rejects.toThrow('Network error');
        expect(executeMock).toHaveBeenCalledTimes(2);
    });

    it('should ignore failure if ignoreFailure is true and retries are exhausted', async () => {
        const executeMock = vi.fn().mockRejectedValue(new Error('Service Down'));
        
        const step: IStep = {
            name: 'OptionalFailingStep',
            retry: { maxAttempts: 2, delay: 1000, backoff: 'linear' },
            ignoreFailure: true,
            execute: executeMock
        };
        const workflow: WorkflowDefinition = { name: 'W', steps: [step] };

        const promise = WorkflowEngine.run(workflow, { trigger: 'manual' });
        
        await vi.advanceTimersByTimeAsync(1000);

        const result = await promise;
        expect(result.metadata.error).toBeUndefined(); // Ignore failure absorbs the error
        expect(executeMock).toHaveBeenCalledTimes(2);
    });

    it('should bail out early if retryIf returns false', async () => {
        const executeMock = vi.fn().mockRejectedValue(new Error('Fatal Auth Error'));
        
        const step: IStep = {
            name: 'AuthStep',
            retry: { 
                maxAttempts: 5, 
                delay: 1000, 
                backoff: 'linear',
                retryIf: (err) => err instanceof Error && err.message.includes('429')
            },
            execute: executeMock
        };
        const workflow: WorkflowDefinition = { name: 'W', steps: [step] };

        const promise = WorkflowEngine.run(workflow, { trigger: 'manual' });
        promise.catch(() => {});
        
        // Error should be thrown immediately without waiting for delay
        await expect(promise).rejects.toThrow('Fatal Auth Error');
        expect(executeMock).toHaveBeenCalledTimes(1);
    });

    it('should abort retries if context.signal is cancelled during wait', async () => {
        const executeMock = vi.fn().mockRejectedValue(new Error('429 Too Many Requests'));
        
        const step: IStep = {
            name: 'CancellableStep',
            retry: { maxAttempts: 5, delay: 5000, backoff: 'linear' },
            execute: executeMock
        };
        const workflow: WorkflowDefinition = { name: 'W', steps: [step] };

        const signal = { cancelled: false, reason: '' };
        const promise = WorkflowEngine.run(workflow, { trigger: 'manual', signal });
        promise.catch(() => {});
        
        // Wait partially into the first delay
        await vi.advanceTimersByTimeAsync(2000);
        
        // Cancel the workflow
        signal.cancelled = true;
        signal.reason = 'User aborted';
        
        // Now advance the rest of the time. The next retry attempt should detect cancellation before execution.
        await vi.advanceTimersByTimeAsync(3000);
        
        await expect(promise).rejects.toThrow('429 Too Many Requests'); // Throw whatever is the last error, but crucially it should stop retrying.
        expect(executeMock).toHaveBeenCalledTimes(1);
    });

    it('should preserve context data despite a step failing and being ignored', async () => {
        const step1: IStep = {
            name: 'DataSetter',
            execute: async (ctx) => {
                ctx.data = { ...ctx.data, crucialInfo: 'kept' };
            }
        };

        const executeMock = vi.fn().mockRejectedValue(new Error('Optional Failure'));
        const step2: IStep = {
            name: 'OptionalFailingStep',
            retry: { maxAttempts: 2, delay: 1000, backoff: 'linear' },
            ignoreFailure: true,
            execute: executeMock
        };

        const step3: IStep = {
            name: 'Checker',
            execute: async (ctx) => {
                expect(ctx.data.crucialInfo).toBe('kept');
            }
        };

        const workflow: WorkflowDefinition = { name: 'W', steps: [step1, step2, step3] };

        const promise = WorkflowEngine.run(workflow, { trigger: 'manual' });
        await vi.advanceTimersByTimeAsync(1000);

        const result = await promise;
        expect(result.data.crucialInfo).toBe('kept');
        expect(executeMock).toHaveBeenCalledTimes(2);
    });
});

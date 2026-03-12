import { describe, expect, it } from 'vitest';
import { WorkflowEngine, WorkflowDefinition } from '@/modules/workflow/core/WorkflowEngine';
import { JobContext } from '@/modules/workflow/core/JobContext';
import { IStep } from '@/modules/workflow/core/Step';

describe('WorkflowEngine Loop Protection', () => {
    
    it('should break infinite loops with Max Jump Count (50)', async () => {
        // 构造一个死循环工作流: Step A -> Step B (Jump A)
        const stepA: IStep = {
            name: 'Step_A',
            execute: async (ctx) => {
                return { action: 'next' };
            }
        };

        const stepB: IStep = {
            name: 'Step_B',
            execute: async (ctx) => {
                // 无条件跳回 A
                return { action: 'jump', targetStep: 'Step_A', reason: 'Infinite loop test' };
            }
        };

        const workflow: WorkflowDefinition = {
            name: 'Infinite_Loop_Workflow',
            steps: [stepA, stepB]
        };

        // 执行工作流，预期会抛出异常
        try {
            await WorkflowEngine.run(workflow, { trigger: 'manual' });
            // 如果执行到这里说明没拦截住，测试失败
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.message).toContain('Workflow detected infinite loop');
            expect(error.message).toContain('50 times');
            console.log('Successfully intercepted loop:', error.message);
        }
    });

    it('should allow normal jumps within threshold', async () => {
        let count = 0;
        const iterativeStep: IStep = {
            name: 'Iterator',
            execute: async (ctx) => {
                count++;
                if (count < 5) {
                    return { action: 'jump', targetStep: 'Iterator', reason: 'Normal iteration' };
                }
                return { action: 'next' };
            }
        };

        const workflow: WorkflowDefinition = {
            name: 'Normal_Jump_Workflow',
            steps: [iterativeStep]
        };

        const result = await WorkflowEngine.run(workflow, { trigger: 'manual' });
        expect(result.metadata.jumpCount).toBe(4);
        expect(count).toBe(5); // 执行了 1 次初始 + 4 次跳转
    });
});

import { Logger } from '@/core/logger';
import { JobContext } from './JobContext';
import { IStep } from './Step';
import { generateUUID } from '@/core/utils';

export interface WorkflowDefinition {
    name: string;
    steps: IStep[];
}

/**
 * WorkflowEngine - 工作流引擎
 *
 * 负责顺序执行 Steps，管理 Context，处理错误。
 */
export class WorkflowEngine {
    /**
     * 执行一个工作流
     * @param workflow 工作流定义
     * @param initialContext 初始上下文 (部分)
     */
    static async run(
        workflow: WorkflowDefinition,
        initialContext: Partial<JobContext>
    ): Promise<JobContext> {
        const startTime = Date.now();

        // 1. 初始化完整 Context
        const context: JobContext = {
            id: initialContext.id || generateUUID(),
            trigger: initialContext.trigger || 'manual',
            config: initialContext.config || {},
            input: initialContext.input || {},
            metadata: {
                startTime,
                stepsExecuted: [],
                ...initialContext.metadata
            }
        };

        Logger.info('Workflow', `开始执行工作流: ${workflow.name}`, {
            jobId: context.id,
            trigger: context.trigger
        });

        try {
            // 2. 顺序执行 Steps
            // 构建 Step 索引缓存 (O(N))
            const stepIndexMap = new Map<string, number>();
            for (let i = 0; i < workflow.steps.length; i++) {
                stepIndexMap.set(workflow.steps[i].name, i);
            }

            // 2. 顺序执行 Steps (支持跳转)
            for (let i = 0; i < workflow.steps.length; i++) {
                const step = workflow.steps[i];
                Logger.debug('Workflow', `执行步骤: ${step.name}`, { jobId: context.id });

                const stepStart = Date.now();
                const result = await step.execute(context);
                const duration = Date.now() - stepStart;

                context.metadata.stepsExecuted.push(step.name);

                Logger.debug('Workflow', `步骤完成: ${step.name}`, { duration });

                // 处理控制流
                if (result) {
                    if (result.action === 'finish') {
                        Logger.info('Workflow', `工作流提前结束: ${step.name}`, { reason: 'Step requested finish' });
                        break;
                    }

                    if (result.action === 'abort') {
                        throw new Error(result.reason || 'Step requested abort');
                    }

                    if (result.action === 'jump') {
                        const targetIndex = stepIndexMap.get(result.targetStep);
                        if (targetIndex === undefined) {
                            throw new Error(`Jump target not found: ${result.targetStep}`);
                        }
                        Logger.info('Workflow', `跳转步骤: ${step.name} -> ${result.targetStep}`, { reason: result.reason });
                        i = targetIndex - 1; // 循环会自动 +1，所以这里 -1
                        continue;
                    }
                }
            }

            Logger.success('Workflow', `工作流执行成功: ${workflow.name}`, {
                jobId: context.id,
                duration: Date.now() - startTime,
                steps: context.metadata.stepsExecuted.length
            });

        } catch (error) {
            context.metadata.error = error instanceof Error ? error : new Error(String(error));
            Logger.error('Workflow', `工作流执行失败: ${workflow.name}`, {
                jobId: context.id,
                step: context.metadata.stepsExecuted[context.metadata.stepsExecuted.length - 1], // 最后一个完成的还是正在执行的？
                error: context.metadata.error.message
            });
            // 根据需求，这里可以选择抛出异常或者仅返回带 error 的 context
            // 为了让调用方处理，我们抛出
            throw context.metadata.error;
        }

        return context;
    }
}

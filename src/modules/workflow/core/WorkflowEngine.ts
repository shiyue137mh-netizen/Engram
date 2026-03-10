import { Logger, LogModule } from '@/core/logger';
import { generateShortUUID } from '@/core/utils';
import { JobContext } from './JobContext';
import { IStep } from './Step';

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
            id: initialContext.id || generateShortUUID('wf_'),
            trigger: initialContext.trigger || 'manual',
            config: initialContext.config || {},
            input: initialContext.input || {},
            signal: initialContext.signal,
            metadata: {
                startTime,
                stepsExecuted: [],
                ...initialContext.metadata
            }
        };

        Logger.info(LogModule.RAG_INJECT, `开始执行工作流: ${workflow.name}`, {
            jobId: context.id,
            trigger: context.trigger
        });

        // P0 Fix: 记录“当前正在执行的 step”，避免在 catch 中误报上一个成功 step
        let currentStepName: string | undefined;

        try {
            // 2. 顺序执行 Steps
            // 构建 Step 索引缓存 (O(N))
            const stepIndexMap = new Map<string, number>();
            for (let i = 0; i < workflow.steps.length; i++) {
                stepIndexMap.set(workflow.steps[i].name, i);
            }

            // 2. 顺序执行 Steps (支持跳转)
            for (let i = 0; i < workflow.steps.length; i++) {
                // 取消检查点：每个 Step 执行前检查信号
                if (context.signal && context.signal.cancelled) {
                    Logger.warn(LogModule.RAG_INJECT, '工作流被中途取消', { jobId: context.id });
                    break;
                }

                const step = workflow.steps[i];
                currentStepName = step.name;
                context.metadata.currentStep = currentStepName;

                Logger.debug(LogModule.RAG_INJECT, `执行步骤: ${step.name}`, { jobId: context.id });

                const stepStart = Date.now();
                try {
                    const result = await step.execute(context);
                    const duration = Date.now() - stepStart;

                    context.metadata.stepsExecuted.push(step.name);
                    Logger.debug(LogModule.RAG_INJECT, `步骤完成: ${step.name}`, { duration });

                    // 处理控制流
                    if (result) {
                        if (result.action === 'finish') {
                            Logger.debug(LogModule.RAG_INJECT, `工作流提前结束: ${step.name}`, { reason: 'Step requested finish' });
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
                            Logger.debug(LogModule.RAG_INJECT, `跳转步骤: ${step.name} -> ${result.targetStep}`, { reason: result.reason });
                            i = targetIndex - 1; // 循环会自动 +1，所以这里 -1
                            continue;
                        }
                    }
                } catch (stepError) {
                    Logger.error(LogModule.RAG_INJECT, `步骤执行崩溃: ${step.name}`, {
                        error: stepError instanceof Error ? stepError.message : String(stepError),
                        stack: stepError instanceof Error ? stepError.stack : undefined
                    });
                    throw stepError;
                }
            }

            Logger.debug(LogModule.RAG_INJECT, `工作流执行成功: ${workflow.name}`, {
                jobId: context.id,
                duration: Date.now() - startTime,
                steps: context.metadata.stepsExecuted.length
            });

        } catch (e: any) {
            context.metadata.error = e instanceof Error ? e : new Error(String(e));
            Logger.error(LogModule.RAG_INJECT, `工作流执行异常: ${workflow.name}`, {
                jobId: context.id,
                // P0 Fix: 优先记录正在执行的 step，避免误报上一个成功 step
                step: context.metadata.currentStep || currentStepName || context.metadata.stepsExecuted[context.metadata.stepsExecuted.length - 1],
                error: context.metadata.error.message
            });
            // 根据需求，这里可以选择抛出异常或者仅返回带 error 的 context
            // 为了让调用方处理，我们抛出
            throw context.metadata.error;
        }

        return context;
    }
}

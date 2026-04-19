import { LogModule, Logger } from '@/core/logger';
import { generateShortUUID, sleep } from '@/core/utils';
import type { JobContext } from './JobContext';
import type { IStep, StepResult } from './Step';

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
     * 执行带有重试机制的步骤
     */
    private static async executeWithRetry(
        step: IStep,
        context: JobContext
    ): Promise<StepResult> {
        const retryConfig = step.retry;
        
        // 如果没有配置重试，或者设定 maxAttempts <= 1，直接执行
        if (!retryConfig || retryConfig.maxAttempts <= 1) {
            return await step.execute(context);
        }

        let attempt = 1;
        let {delay} = retryConfig;

        while (true) {
            try {
                return await step.execute(context);
            } catch (error) {
                // 取消检查点：如果已被取消，则不进行重试
                if (context.signal && context.signal.cancelled) {
                    throw error;
                }

                // 判断是否值得重试
                const shouldRetry = retryConfig.retryIf ? retryConfig.retryIf(error) : true;
                
                if (!shouldRetry || attempt >= retryConfig.maxAttempts) {
                    throw error; // 不满足重试条件，或次数耗尽，向上抛出
                }

                Logger.warn(LogModule.RAG_INJECT, `[Retry] Step ${step.name} failed (${attempt}/${retryConfig.maxAttempts}), retrying in ${delay}ms...`, {
                    error: error instanceof Error ? error.message : String(error)
                });

                // 等待指定的延迟
                await sleep(delay);

                // 取消检查点：如果等待期间被取消，则终止重试并抛出上次的错误
                if (context.signal && context.signal.cancelled) {
                    throw error;
                }

                // 计算下一次退避延迟
                if (retryConfig.backoff === 'exponential') {
                    delay *= 2;
                }

                attempt++;
            }
        }
    }
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
            config: initialContext.config || {},
            id: initialContext.id || generateShortUUID('wf_'),
            input: initialContext.input || {},
            metadata: {
                startTime,
                stepsExecuted: [],
                ...initialContext.metadata
            },
            signal: initialContext.signal,
            trigger: initialContext.trigger || 'manual'
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
                    const result = await this.executeWithRetry(step, context);
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

                            // P0 Fix: 无限循环防护 (保险丝)
                            context.metadata.jumpCount = (context.metadata.jumpCount || 0) + 1;
                            if (context.metadata.jumpCount > 50) {
                                throw new Error(`Workflow detected infinite loop: jumped 50 times. Last jump: ${step.name} -> ${result.targetStep}`);
                            }

                            Logger.debug(LogModule.RAG_INJECT, `跳转步骤: ${step.name} -> ${result.targetStep}`, {
                                jumpCount: context.metadata.jumpCount,
                                reason: result.reason
                            });
                            i = targetIndex - 1; // 循环会自动 +1，所以这里 -1
                            continue;
                        }
                    }
                } catch (stepError) {
                    if (step.ignoreFailure) {
                        Logger.warn(LogModule.RAG_INJECT, `步骤执行彻底失败，但配置了忽略错误，继续流转: ${step.name}`, {
                            error: stepError instanceof Error ? stepError.message : String(stepError)
                        });
                        continue;
                    }

                    Logger.error(LogModule.RAG_INJECT, `步骤执行崩溃: ${step.name}`, {
                        error: stepError instanceof Error ? stepError.message : String(stepError),
                        stack: stepError instanceof Error ? stepError.stack : undefined
                    });
                    throw stepError;
                }
            }

            Logger.debug(LogModule.RAG_INJECT, `工作流执行成功: ${workflow.name}`, {
                duration: Date.now() - startTime,
                jobId: context.id,
                steps: context.metadata.stepsExecuted.length
            });

        } catch (error: any) {
            const isCancelled = context.signal && context.signal.cancelled;
            context.metadata.error = error instanceof Error ? error : new Error(String(error));
            
            if (isCancelled) {
                Logger.info(LogModule.RAG_INJECT, `工作流已由用户取消: ${workflow.name}`, {
                    jobId: context.id,
                    step: context.metadata.currentStep || currentStepName
                });
                // 抛出特定错误供上层识别
                const abortError = new Error('UserCancelled');
                (abortError as any).isCancellation = true;
                throw abortError;
            }

            Logger.error(LogModule.RAG_INJECT, `工作流执行异常: ${workflow.name}`, {
                jobId: context.id,
                // P0 Fix: 优先记录正在执行的 step，避免误报上一个成功 step
                step: context.metadata.currentStep || currentStepName || context.metadata.stepsExecuted.at(-1),
                error: context.metadata.error.message
            });
            // 根据需求，这里可以选择抛出异常或者仅返回带 error 的 context
            // 为了让调用方处理，我们抛出
            throw context.metadata.error;
        }

        return context;
    }
}

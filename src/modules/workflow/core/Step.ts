import { JobContext } from './JobContext';

/**
 * IStep - 步骤接口
 *
 * Workflow 中的最小执行单元。
 */
export type StepAction =
    | { action: 'next' }
    | { action: 'finish' }
    | { action: 'jump'; targetStep: string; reason?: string }
    | { action: 'abort'; reason?: string };

/**
 * StepResult - 步骤执行结果
 * 用于控制工作流的走向 (Next, Jump, Finish, Abort)
 */
export type StepResult = void | StepAction;

export interface IStep {
    /** 步骤名称 (用于日志和调试) */
    name: string;

    /**
     * 执行步骤
     * @param context 任务上下文 (可读写)
     * @returns 控制流指令 (可选)
     */
    execute(context: JobContext): Promise<StepResult>;
}

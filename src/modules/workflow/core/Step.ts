import type { JobContext } from './JobContext';

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

export interface RetryConfig {
    /** 最大尝试次数 (包括首次执行，1 表示不重试) */
    maxAttempts: number;
    /** 初始重试延迟 (ms) */
    delay: number;
    /**
     * 退避策略，默认为 exponential
     * linear: 延迟固定
     * exponential: 延迟翻倍
     */
    backoff?: 'linear' | 'exponential';
    /** 
     * 判定某个 Error 是否值得重试 
     * 如果未提供，则所有 Error 都进行重试
     */
    retryIf?: (error: any) => boolean;
}

export interface IStep {
    /** 步骤名称 (用于日志和调试) */
    name: string;

    /** 重试配置 (可选，WorkflowEngine 据此执行重试控制) */
    retry?: RetryConfig;

    /** 彻底失败后是否忽略错误继续执行工作流 (可选) */
    ignoreFailure?: boolean;

    /**
     * 执行步骤
     * @param context 任务上下文 (可读写)
     * @returns 控制流指令 (可选)
     */
    execute(context: JobContext): Promise<StepResult>;
}

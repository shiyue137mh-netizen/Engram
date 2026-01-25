import { JobContext } from './JobContext';

/**
 * IStep - 步骤接口
 *
 * Workflow 中的最小执行单元。
 */
export interface IStep {
    /** 步骤名称 (用于日志和调试) */
    name: string;

    /**
     * 执行步骤
     * @param context 任务上下文 (可读写)
     */
    execute(context: JobContext): Promise<void>;
}

/**
 * StepResult - 步骤执行结果 (可选，目前 execute 返回 void，通过修改 context 传递结果)
 * 保留用于未来扩展 (如控制流跳转)
 */
enum StepResult {
    CONTINUE = 'continue',
    STOP = 'stop',
    RETRY = 'retry'
}

/**
 * JobContext - 任务上下文
 *
 * 在 Workflow 的各个 Step 之间传递的共享状态对象。
 */
export interface JobContext {
    /** 任务 ID */
    id: string;

    /** 触发方式 */
    trigger: 'auto' | 'manual' | 'batch';

    /** 任务配置 (通常对应各模块的 Config) */
    config: Record<string, any>;

    /**
     * 初始输入数据
     * 不同类型的任务可能有不同的输入字段
     */
    input: {
        text?: string;               // 原始文本输入 (Preprocessor)
        range?: [number, number];    // 楼层范围 (Summary/Entity)
        chatHistory?: string;        // 原始聊天记录 (Entity)
        [key: string]: any;
    };

    /**
     * 中间数据 (Steps 产生的结果)
     */

    /** 构建好的 Prompt */
    prompt?: {
        system: string;
        user: string;
        templateId?: string;
    };

    /** LLM 原始响应 */
    llmResponse?: {
        content: string;
        success: boolean;
        error?: string;
        tokenUsage?: any;
    };

    /** 清洗后的内容 */
    cleanedContent?: string;

    /** 解析后的结构化数据 (JSON 对象) */
    parsedData?: any;

    /** 提取出的标签内容 (XML Tags) */
    extractedTags?: Record<string, string>;

    /**
     * 通用中间数据仓库
     * 用于 Steps 之间传递非标准字段的数据
     */
    data?: Record<string, any>;

    /**
     * 执行元数据
     */
    metadata: {
        startTime: number;
        stepsExecuted: string[];
        error?: Error;
        [key: string]: any;
    };

    /**
     * 最终输出数据 (用于 Workflow 结束时返回给调用方)
     */
    output?: any;
}

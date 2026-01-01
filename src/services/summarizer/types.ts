/**
 * Summarizer 模块类型定义
 */

/** 触发模式 */
export type TriggerMode = 'auto' | 'manual';

/** 世界书绑定模式 */
export type WorldbookBindMode = 'chat' | 'character';

/** Summarizer 配置 */
export interface SummarizerConfig {
    /** 是否启用自动总结 */
    enabled: boolean;
    /** 触发模式：自动/手动 */
    triggerMode: TriggerMode;
    /** 楼层间隔：每 N 楼触发一次 */
    floorInterval: number;
    /** 世界书绑定模式 */
    worldbookMode: WorldbookBindMode;
    /** 是否启用预览 */
    previewEnabled: boolean;
    /** 使用的提示词模板 ID */
    promptTemplateId: string | null;
    /** 使用的 LLM 预设 ID（null 表示使用默认） */
    llmPresetId: string | null;
    /** 保留末尾不处理的楼层数（缓冲） */
    bufferSize: number;
    /** 是否自动隐藏已总结的楼层 */
    autoHide: boolean;
}

/** 默认配置 */
export const DEFAULT_SUMMARIZER_CONFIG: SummarizerConfig = {
    enabled: true,
    triggerMode: 'auto',
    floorInterval: 10,
    worldbookMode: 'chat',
    previewEnabled: true,
    promptTemplateId: null, // 使用内置默认模板
    llmPresetId: null,      // 使用默认预设
    bufferSize: 3,          // 默认保留 3 楼不处理
    autoHide: false,        // 默认不自动隐藏
};

/** 总结结果 */
export interface SummaryResult {
    /** 总结内容 */
    content: string;
    /** Token 数量 */
    tokenCount: number;
    /** 来源楼层范围 [起始, 结束] */
    sourceFloors: [number, number];
    /** 生成时间戳 */
    timestamp: number;
    /** 是否已写入世界书 */
    writtenToWorldbook: boolean;
    /** 世界书条目 ID（如果已写入） */
    worldbookEntryId?: string;
}

/** Summarizer 状态 */
export interface SummarizerStatus {
    /** 是否正在运行 */
    running: boolean;
    /** 当前楼层计数 */
    currentFloor: number;
    /** 上次总结时的楼层 */
    lastSummarizedFloor: number;
    /** 待处理楼层数 */
    pendingFloors: number;
    /** 总结历史记录数 */
    historyCount: number;
    /** 是否正在执行总结 */
    isSummarizing: boolean;
}

/** 总结请求参数 */
export interface SummarizeRequest {
    /** 消息内容数组 */
    messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
        name?: string;
    }>;
    /** 楼层范围 */
    floorRange: [number, number];
    /** 使用的模板 ID */
    templateId?: string;
}

/** LLM 生成请求 */
export interface LLMRequest {
    /** 系统提示词 */
    systemPrompt: string;
    /** 用户提示词 */
    userPrompt: string;
    /** 预设 ID */
    presetId?: string;
}

/** LLM 生成响应 */
export interface LLMResponse {
    /** 生成内容 */
    content: string;
    /** 是否成功 */
    success: boolean;
    /** 错误信息 */
    error?: string;
    /** Token 使用量 */
    tokenUsage?: {
        prompt: number;
        completion: number;
        total: number;
    };
}

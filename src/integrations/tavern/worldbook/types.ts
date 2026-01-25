/**
 * WorldInfoPosition - 世界书条目位置类型
 */
export type WorldInfoPosition =
    | 'before_character_definition'
    | 'after_character_definition'
    | 'before_example_messages'
    | 'after_example_messages'
    | 'at_depth';

/**
 * WorldInfoStrategy - 世界书条目策略类型
 */
type WorldInfoStrategy = 'constant' | 'selective' | 'vectorized';

/**
 * WorldInfoRole - 世界书条目角色
 */
export type WorldInfoRole = 'system' | 'assistant' | 'user';

/**
 * CreateWorldInfoEntryParams - 创建世界书条目的参数
 */
export interface CreateWorldInfoEntryParams {
    /** 条目名称 */
    name: string;
    /** 条目内容 */
    content: string;
    /** 是否启用 */
    enabled?: boolean;
    /** 是否常亮（蓝灯） */
    constant?: boolean;
    /** 触发关键词 */
    keys?: string[];
    /** 次要关键词 */
    keysSecondary?: string[];
    /** 位置类型 */
    position?: WorldInfoPosition;
    /** 角色 */
    role?: WorldInfoRole;
    /** 深度 */
    depth?: number;
    /** 排序权重 */
    order?: number;
    /** 触发概率 */
    probability?: number;
    /** 递归设置 */
    recursion?: {
        prevent_incoming?: boolean;
        prevent_outgoing?: boolean;
    };
}

/**
 * WorldInfoEntry - 世界书条目结构
 */
export interface WorldInfoEntry {
    uid: number;
    name: string;
    content: string;
    enabled: boolean;
    constant: boolean;
    keys: string[];
    position: WorldInfoPosition;
    /** 备注 */
    comment?: string;
    /** 其他自定义字段 */
    extra?: Record<string, any>;
    depth: number;
    order: number;
    tokenCount?: number;
    recursion?: {
        prevent_incoming?: boolean;
        prevent_outgoing?: boolean;
    };
}

/**
 * WorldInfoTokenStats - 世界书 Token 统计信息
 */
export interface WorldInfoTokenStats {
    totalTokens: number;
    entryCount: number;
    entries: Array<{ name: string; tokens: number }>;
}

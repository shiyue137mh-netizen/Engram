/**
 * Core Graph Data Types for Engram V0.7
 *
 * Multi-Database Architecture:
 * Each chat_id has its own database, so scope_id is no longer needed.
 *
 * V0.7: 添加 Embedding 相关字段，移除 Scope
 */

/**
 * EventNode - The atom of memory
 * Represents a single processed event, either from raw chat or higher-level summary.
 *
 * V0.6: 移除 scope_id - 每个聊天有独立数据库，不需要分区字段
 * V0.7: 添加 embedding 相关字段
 */
export interface EventNode {
    /** UUID */
    id: string;

    /**
     * Burn-in Text (For Model)
     * High-density text ready for embedding and RAG injection.
     * 包含所有 KV 信息（时间、地点、人物、事件、逻辑、因果）
     */
    summary: string;

    /**
     * Structured Data (For Machine)
     * JSON object for graph building, filtering, and UI editing.
     * 这些数据已烧录到 summary 中，此处保留用于结构化查询
     */
    structured_kv: {
        /** 时间锚点 - 保留原文时间格式 */
        time_anchor: string;
        /** 涉及人物 */
        role: string[];
        /** 地点 */
        location: string;
        /** 事件类型/标题 */
        event: string;
        /** 叙事逻辑标签 */
        logic: string[];
        /** 因果关系 */
        causality: string;
    };

    /**
     * Semantic Vector
     * Optional because "Basic Mode" users might not have embedding models.
     */
    embedding?: number[];

    /**
     * 是否已嵌入
     * 已嵌入的事件从 {{engramSummaries}} 移除，只能通过 RAG 召回
     */
    is_embedded: boolean;

    /**
     * 是否已归档 (隐藏)
     * true: 从线性上下文移除 (但保留在库中，可被 RAG 召回)
     * false: 显示在上下文中
     */
    is_archived: boolean;

    /** Importance Score (0.0 - 1.0) */
    significance_score: number;

    /**
     * Abstraction Level
     * 0 = Raw Event (from Chat) - 细节
     * 1 = Meta Summary (Trim 压缩后的大纲)
     * ...
     */
    level: number;

    /** Optional pointer to a parent node (if this node was compressed into a level+1 node) */
    parent_id?: string;

    /** Source Message Range */
    source_range: {
        start_index: number;
        end_index: number;
    };

    timestamp: number;
}

/**
 * EntityNode - Graph Entities
 * Represents static or slowly changing entities (People, Places, Items).
 */
export interface EntityNode {
    id: string;
    name: string;
    type: string; // 'Character' | 'Location' | 'Item' | 'Concept'
    description: string;

    /** Associated Event IDs */
    related_events?: string[];

    last_updated_at: number;
}

/**
 * ScopeState - 存储在 meta 表中
 * 每个聊天的状态信息
 */
export interface ScopeState {
    last_summarized_floor: number;
    token_usage_accumulated: number;
    last_compressed_at: number;
    active_summary_order: number;
}

/**
 * 默认 ScopeState
 */
export const DEFAULT_SCOPE_STATE: ScopeState = {
    last_summarized_floor: 0,
    token_usage_accumulated: 0,
    last_compressed_at: 0,
    active_summary_order: 9000,
};

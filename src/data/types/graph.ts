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
 * EntityType - 实体类型枚举
 * V0.9: 新增
 */
export enum EntityType {
    Character = 'char',      // 角色/人物
    Location = 'loc',        // 地点
    Item = 'item',           // 物品
    Concept = 'concept',     // 概念/组织/势力
    Unknown = 'unknown'      // 未知类型
}

/**
 * 实体关系的推荐结构 (Soft Contract)
 * 存放在 profile.relations 中
 * V0.9.4: 新增
 */
export interface EntityRelation {
    /** 目标实体名称 */
    target: string;
    /** 关系类型 (friend/enemy/master/servant/ally 等) */
    type: string;
    /** 关系细节描述 */
    description?: string;
}

/**
 * EntityNode - Graph Entities
 * V0.9.4: 重构为 "无边设计 + 双重结构" 范式
 *
 * 设计理念:
 * - For Model: description 字段存储 YAML 格式的烧录文本
 * - For Machine: profile 字段存储开放式 JSON 结构
 */
export interface EntityNode {
    /** UUID */
    id: string;

    /** 索引键: 实体主名称 */
    name: string;

    /** 实体类型 */
    type: EntityType;

    /** MultiEntry索引: 别名列表 (用于消歧) */
    aliases: string[];

    /**
     * [For Model] Burn-in YAML
     * 由 profile 序列化而成的 YAML 字符串。
     * RAG 检索时直接读取此字段作为 LLM 上下文。
     */
    description: string;

    /**
     * [For Machine] Open KV Container
     * 完全开放的 JSON 对象。AI 可自由写入。
     * 约定字段:
     * - relations: EntityRelation[] (用于多跳检索)
     * - identity: string (核心身份)
     * - tags: string[] (特征标签)
     */
    profile: Record<string, unknown>;

    /** 最后更新时间 */
    last_updated_at: number;

    // ========== 图谱可视化 ==========

    /** 布局 X 坐标 (用户拖拽后持久化) */
    layout_x?: number;

    /**
     * Semantic Vector
     * (New in V0.9.8)
     */
    embedding?: number[];

    /**
     * Whether this entity is vectorized
     */
    is_embedded?: boolean;

    /** 布局 Y 坐标 */
    layout_y?: number;
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
    /** V0.9.1: 上次实体提取的楼层 */
    last_extracted_floor: number;
}

/**
 * 默认 ScopeState
 */
export const DEFAULT_SCOPE_STATE: ScopeState = {
    last_summarized_floor: 0,
    token_usage_accumulated: 0,
    last_compressed_at: 0,
    active_summary_order: 9000,
    last_extracted_floor: 0,
};

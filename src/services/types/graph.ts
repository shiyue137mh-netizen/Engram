/**
 * Core Graph Data Types for Engram V0.4.0
 *
 * Defines the unified data model for the dual-track memory system.
 */

/**
 * Scope - Memory Container
 *
 * V0.5: 简化绑定 - 仅使用 chat_id 作为主键
 * character_name 仅用于 UI 显示，不参与数据分割
 */
export interface Scope {
    /** Auto-increment ID (Dexie primary key) */
    id?: number;

    /** Unique String ID (UUID) for lookup */
    uuid: string;

    /**
     * SillyTavern Chat ID (UUID from metadata)
     * 这是镜像/绑定的主键，每个聊天记录有唯一的 chat_id
     */
    chat_id: string;

    /**
     * 角色名称 (仅用于显示)
     * 存储创建 Scope 时的角色名，不参与数据分割逻辑
     */
    character_name: string;

    /**
     * Persistent Execution State
     * Replaces WorldBook metadata for keeping track of progress.
     */
    state: {
        /** The last floor index (1-based) that was successfully summarized */
        last_summarized_floor: number;

        /** Accumulated token usage since last compression */
        token_usage_accumulated: number;

        /** Timestamp/Floor of the last compression event */
        last_compressed_at: number;

        /**
         * The active WorldBook entry order.
         * Important for "Basic Mode" (No-RAG) to implement rolling updates.
         */
        active_summary_order: number;
    };

    created_at: number;
    last_active_at: number;
}

/**
 * EventNode - The atom of memory
 * Represents a single processed event, either from raw chat or higher-level summary.
 */
export interface EventNode {
    /** UUID */
    id: string;

    /** Foreign Key -> Scope.id */
    scope_id: number;

    /**
     * Burn-in Text (For Model)
     * High-density text ready for embedding and RAG injection.
     */
    summary: string;

    /**
     * Structured Data (For Machine)
     * JSON object for graph building, filtering, and logic.
     */
    structured_kv: {
        /** 时间锚点 - 保留原文时间格式 */
        time_anchor: string;
        role: string[];
        location: string;
        event: string;
        logic: string[];
        causality: string;
    };

    /**
     * Semantic Vector
     * Optional because "Basic Mode" users might not have embedding models.
     */
    embedding?: number[];

    /** Importance Score (0.0 - 1.0) */
    significance_score: number;

    /**
     * Abstraction Level
     * 0 = Raw Event (from Chat)
     * 1 = Meta Summary (Summary of Summaries)
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

    /** Foreign Key -> Scope.id */
    scope_id: number;

    name: string;
    type: string; // 'Character' | 'Location' | 'Item' | 'Concept'
    description: string;

    /** Associated Event IDs */
    related_events?: string[];

    last_updated_at: number;
}

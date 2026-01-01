/**
 * 图谱数据类型定义
 */

/**
 * 实体节点 - 图的"桩"
 * 代表人物、地点、物品等持久化实体
 */
export interface EntityNode {
    /** 唯一标识 e.g., "ent_key_01" */
    id: string;
    /** 实体名称 e.g., "生锈的钥匙" */
    name: string;
    /** 实体类型 */
    type: 'CHAR' | 'LOC' | 'ITEM' | 'CONCEPT';
    /** 分脑隔离 ID (User + Character) */
    brainId: string;
    /** 实体描述（可选） */
    description?: string;
    /** 首次出现时间戳 */
    createdAt: number;
    /** 最后更新时间戳 */
    updatedAt: number;
    /** 额外元数据 */
    metadata?: Record<string, unknown>;
}

/**
 * 记忆事件节点 - 图的"肉"
 * 代表一个总结后的故事事件
 */
export interface EventNode {
    /** 唯一标识 e.g., "mem_evt_99" */
    id: string;
    /** 事件总结 e.g., "典狱长在玄关给了我一把钥匙" */
    summary: string;
    /** 语义向量（Embedding） */
    vector?: Float32Array;
    /** 关联的实体 ID 列表 */
    relatedEntities: string[];
    /** 重要性评分 0.0 - 1.0 */
    significance: number;
    /** 分脑隔离 ID */
    brainId: string;
    /** 现实时间戳 */
    timestamp: number;
    /** 游戏内时间（可选） */
    gameTime?: string;
    /** 原始消息 ID 范围 */
    messageRange?: {
        start: number;
        end: number;
    };
    /** 额外元数据 */
    metadata?: Record<string, unknown>;
}

/**
 * 图谱边关系类型
 */
export type EdgeType =
    | 'HAS_ENTITY'      // 事件包含实体
    | 'CAUSES'          // 因果关系
    | 'FOLLOWS'         // 时序关系
    | 'RELATED_TO';     // 一般关联

/**
 * 图谱边
 */
export interface Edge {
    id: string;
    source: string;
    target: string;
    type: EdgeType;
    weight?: number;
}

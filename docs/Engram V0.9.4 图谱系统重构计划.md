Engram V0.9.4 图谱系统重构计划

核心目标: 移除物理边表，确立 "Double-Structure"（双重结构）设计模式，打造完全面向 LLM 的图谱数据层。
版本: V0.9.4
日期: 2026-01-16

1. 核心设计理念 (Architecture Paradigm)

在 V0.9.4 中，我们摒弃传统的“节点+边”数据库范式，转而采用更符合 RAG（检索增强生成）特性的设计。

1.1 无边设计 (No-Edge Design)

现状: 维护一张独立的 Edges 表成本高昂，且难以捕捉动态剧情中关系的流动性。

变革: 移除 Edges 表。

动态关系 (Dynamic): 由 EventNode 充当“超边 (Hyper-edge)”，通过角色共现 (Co-occurrence) 隐式连接实体。

静态逻辑 (Static): 由 EntityNode 内部的 profile 字段显式定义（如“父子”、“隶属”）。

1.2 双重结构 (Double-Structure)

所有核心节点（Event/Entity）都遵循 Store as JSON, Prompt as Text 的模式：

层面

字段

格式

用途

For Model

summary / description

String (YAML/Text)

高密度信息烧录。直接注入 LLM Context，无需运行时序列化。

For Machine

structured_kv / profile

JSON Object

结构化索引。用于程序逻辑、图谱跳跃、UI 渲染和数据库查询。

2. 数据结构规范 (Data Schema)

2.1 EntityNode (实体节点) - 重构重点

实体节点现在是完全开放的容器，AI 可以写入任何维度的属性，同时保留了图计算所需的最小约定。

export enum EntityType {
    Character = 'char',      // 角色 (具有人格的主体)
    Location = 'loc',        // 地点 (空间容器)
    Item = 'item',           // 物品 (被持有的客体)
    Concept = 'concept',     // 概念 (组织、历史事件、抽象规则)
    Unknown = 'unknown'
}

/**
 * 实体关系的推荐结构 (Soft Contract)
 * 存放在 profile.relations 中
 */
export interface EntityRelation {
    target: string;       // 目标实体名称 (e.g. "Bob")
    type: string;         // 关系类型 (e.g. "friend")
    description?: string; // 细节 (e.g. "在战争中结下的生死之交")
}

export interface EntityNode {
    /** UUID */
    id: string;

    /** 索引键: 实体主名称 */
    name: string;

    /** 实体类型 */
    type: EntityType;

    /** MultiEntry索引: 别名列表 (用于消歧) */
    aliases: string[];

    /** * [For Model] Burn-in YAML 
     * 由 profile 序列化而成的 YAML 字符串。
     * RAG 检索时直接读取此字段。
     */
    description: string;

    /** * [For Machine] Open KV Container
     * 完全开放的 JSON 对象。AI 可自由写入。
     * 约定字段:
     * - relations: EntityRelation[] (用于多跳检索)
     * - identity: string (核心身份)
     * - tags: string[] (特征标签)
     */
    profile: Record<string, any>;

    /** 重要度 (0.0 - 1.0) */
    significance: number;
    
    last_updated_at: number;
    
    // 可视化布局坐标
    layout_x?: number;
    layout_y?: number;
}


2.2 EventNode (事件节点) - 保持稳定

export interface EventNode {
    id: string;

    /** * [For Model] 自然语言摘要
     * e.g. "Alice 和 Bob 在酒馆发生争执..."
     */
    summary: string;

    /** * [For Machine] 结构化元数据
     * 用于建立隐式连接
     */
    structured_kv: {
        time_anchor: string;
        role: string[];    // <--- 核心：通过此字段反查关联实体
        location: string;
        event: string;
        logic: string[];
        causality: string;
    };
    
    // ... vector, level, timestamp 等字段
}


3. 拓扑逻辑 (Topology Logic)

3.1 隐式连接 (Implicit Links)

通过 EventNode 的 structured_kv.role 字段建立。

查询: "查找 Alice 参与的所有事件"

实现: db.events.where('structured_kv.role').equals('Alice')

意义: 捕捉动态交互。如果 Alice 和 Bob 经常出现在同一个 Event 中，他们就是紧密的“一跳邻居”。

3.2 显式连接 (Explicit Links)

通过 EntityNode 的 profile.relations 字段建立。

查询: "查找 Alice 的逻辑关系网"

实现: 读取 Alice.profile.relations 数组。

意义: 捕捉静态逻辑。即使 Alice 和 "帝国皇帝" 从未同时出场，只要 Profile 里写了 relations: [{ target: "Emperor", type: "enemy" }]，就能建立连接。

4. 多跳检索策略 (Graph RAG Strategy)

GraphRetriever 服务将执行 "星型扩散 + 语义剪枝" 的检索流程。

阶段 1: 锚点识别 (Anchor Identification)

输入: User Query

操作: 关键词匹配 / NER (命名实体识别)

输出: 种子实体列表 [Seed_Entities]

阶段 2: 邻居扩展 (Neighbor Expansion) - The "Hop"

对每个种子实体进行扩展：

逻辑跳跃: 解析 profile.relations，提取 target 实体名。

共现跳跃: 查询该实体最近 N 个高权重事件，提取共现角色。

输出: 候选实体池 [Candidate_Entities]

阶段 3: 语义剪枝 (Semantic Pruning)

操作: 计算 Query Vector 与 Candidate.description (YAML) 的相似度。

逻辑: 如果用户问 "Alice 的死对头"，而扩展出了 "Bob (friend)" 和 "Carol (enemy)"，向量相似度会剔除 Bob。

输出: 目标实体列表 [Target_Entities]

阶段 4: 事件召回 (Event Retrieval)

操作: db.events.where('role').anyOf(Target_Entities)

排序: 按 significance_score 和 timestamp 混合排序。

输出: 最终注入 LLM 的 Context。

5. 数据库索引升级 (Database Migration)

src/services/database/db.ts 需要进行 Schema 升级以支持高效反查。

this.version(2).stores({
    // 事件表：为 role 和 location 建立 MultiEntry 索引 (*)
    events: 'id, timestamp, significance_score, level, *structured_kv.role, structured_kv.location',
    
    // 实体表：为 aliases 建立 MultiEntry 索引
    entities: 'id, type, name, *aliases'
});


6. Prompt 工程配合

为了配合开放的 profile 结构，prompts/entity_extraction.md 需要更新：

Output Format: 强制模型输出 JSON。

Key Guidelines:

鼓励模型根据实体类型自由发挥键名 (e.g. inventory, skills, atmosphere)。

强制约定: 关系必须写入 relations 数组，且包含 target 和 type。

7. 总结

Engram V0.9.4 的架构将实现：

写入极简: AI 提取 -> JSON 存库，无需复杂的图数据库维护。

检索强大: 结合了逻辑推理 (Explicit) 和 统计共现 (Implicit) 的双重召回能力。

完全自由: 实体属性不再受限于硬编码的 Schema，真正适应开放世界的剧情发展。

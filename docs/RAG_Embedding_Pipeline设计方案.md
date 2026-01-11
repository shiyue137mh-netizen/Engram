# RAG Embedding Pipeline 设计方案

> **创建日期**: 2026-01-10
> **版本**: V0.8
> **状态**: 基础架构已实现，注入时序已确认，预处理系统已实现

## 1. 概述

为 EventNode 添加向量嵌入，实现基于语义相似度的记忆检索。

### 核心设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 嵌入内容 | 只嵌入 `summary` | 所有 KV 已烧录进 summary |
| 存储方式 | 直接存在 EventNode | IndexedDB 不支持 JOIN，简化查询 |
| 触发时机 | Trim 时联动嵌入 | 嵌入后从宏移除，Trim 保留大纲 |
| 注入 Hook | `GENERATE_BEFORE_COMBINE_PROMPTS` | await 确保 RAG 完成后再生成 |

### 已完成 ✅

| 组件 | 改动 |
|------|------|
| `graph.ts` | 添加 `is_embedded` 字段 |
| `Pipeline.ts` | 烧录格式包含所有 KV (含 logic, causality) |
| `memoryStore.ts` | `getEventSummaries()` 过滤已嵌入事件 |
| `TavernEvents.ts` | 添加 `GENERATE_BEFORE_COMBINE_PROMPTS` 等事件 |
| `Injector.ts` | 使用新 Hook 进行 RAG 注入 |

---

## 2. ST 事件时序与 RAG 注入

### 2.1 关键发现

在 `script.js:4313` 找到完美的 Hook 点：

```javascript
// ST 会等待所有 handler 完成后再继续
await eventSource.emit(event_types.GENERATE_BEFORE_COMBINE_PROMPTS, data);
```

### 2.2 完整时序

```
用户点发送
    │
    ▼
MESSAGE_SENT ──────────────────────────────────────────►
    │
    ▼ (构建 prompt 数据)
    │
    ▼
GENERATE_BEFORE_COMBINE_PROMPTS ◄── 🎯 Engram RAG 注入
    │   1. 获取 lastUserMessage
    │   2. (可选) LLM Query 增强
    │   3. 向量检索
    │   4. 打分排序
    │   5. 更新 MacroService 缓存
    │   (await 等待完成)
    ▼
combinePrompts() ──────────────────────────────────────►
    │              ↑
    │        {{engramSummaries}} 宏展开
    │        (此时缓存已更新!)
    ▼
GENERATE_AFTER_COMBINE_PROMPTS ────────────────────────►
    │
    ▼
发送到 AI API
    │
    ▼
MESSAGE_RECEIVED ──────────────────────────────────────►
```

---

## 3. Trim + Embedding 联动架构

```
聊天消息 ─────────────────────────────────────────────►
    │
    ▼
┌───────────────────┐
│  LLM 摘要         │
│  (创建 Level 0)    │
│  is_embedded=false │
└─────────┬─────────┘
          │
          ▼
    触发 Trim 条件? ──────────────────────────────────►
    (token/条数上限)
          │
          ▼
┌───────────────────────────────────────────────────┐
│                 联动处理                          │
│                                                   │
│   1. Embedding: 为待压缩的 Level 0 生成向量       │
│      → 标记 is_embedded = true                   │
│      → 从 {{engramSummaries}} 移除               │
│      → 只能通过 RAG 召回                         │
│                                                   │
│   2. Trim: 将这些 Level 0 压缩为 Level 1         │
│      → 新 Level 1 作为大纲保留在宏中             │
│      → 原 Level 0 保持存在（可 RAG 召回）        │
│                                                   │
└───────────────────────────────────────────────────┘
```

### AI 视角

```
{{engramSummaries}} 包含 (按 source_range 时间顺序):
┌─────────────────────────────────────────┐
│ [Level 1] 第一章大纲                    │
│   ↳ [RAG] 第一章关键细节 (如召回)       │
│ [Level 1] 第二章大纲                    │
│   ↳ [RAG] 相关细节 (如召回)             │
│ [Level 0] 最近未嵌入细节1               │
│ [Level 0] 最近未嵌入细节2               │
└─────────────────────────────────────────┘
```

---

## 4. Query 预处理 (可选增强)

### 4.1 核心痛点

RP 场景下用户输入与剧情文本存在语义鸿沟：

| 维度 | 用户输入 | 剧情数据库 |
|------|----------|------------|
| 长度 | 极短动作描写 | 长文本完整叙事 |
| 语义 | 隐性意图 | 显性描述 |
| 视角 | 第一/二人称 | 第三人称 |

### 4.2 预处理 Pipeline

```
User Input → [LLM Preprocessor] → List[Unified Queries] → Vector DB
                    ↓
              {
                "unified_queries": [
                  "查找动作细节: 艾莉丝咬破玩家脖子的场景",
                  "检索设定背景: 吸血鬼契约的含义",
                  "回顾情感互动: 艾莉丝表达占有欲的时刻"
                ]
              }
```

### 4.3 指令化 Query 格式

| 策略类型 | 格式范式 | 示例 |
|----------|----------|------|
| 因果侧重 | `查询起因: <事件>` | 查询起因: 艾莉丝获得刺青的实验背景 |
| 画面侧重 | `查找描写: <视觉元素>` | 查找描写: 地窖中流泪的动作细节 |
| 实体侧重 | `检索档案: <专有名词>` | 检索档案: 圣童计划 编号032-E |
| 情感侧重 | `回顾关系: <交互性质>` | 回顾关系: 表现病娇占有欲的时刻 |

---

## 5. 数据结构

### EventNode (V0.7)

```typescript
interface EventNode {
    id: string;
    
    /** 完整烧录文本 (含所有 KV) */
    summary: string;
    
    /** 结构化数据 */
    structured_kv: {
        time_anchor: string;
        role: string[];
        location: string;
        event: string;
        logic: string[];
        causality: string;
    };
    
    /** 向量嵌入 */
    embedding?: number[];
    
    /** 是否已嵌入 (嵌入后从宏移除) */
    is_embedded: boolean;
    
    /** 重要性分数 */
    significance_score: number;
    
    /** 抽象层级: 0=细节, 1=大纲 */
    level: number;
    
    /** 消息范围 (用于排序) */
    source_range: { start_index: number; end_index: number };
    
    timestamp: number;
}
```

---

## 6. 宏过滤逻辑

```typescript
// getEventSummaries() - 宏内容
// 过滤逻辑:
// - Level 1+ (大纲) → 总是显示
// - Level 0 (细节) → 只显示 is_embedded=false 的
const visibleEvents = events.filter(e => 
    e.level >= 1 || !e.is_embedded
);

// 按 source_range.start_index 排序确保时间顺序
visibleEvents.sort((a, b) => 
    a.source_range.start_index - b.source_range.start_index
);
```

---


### Phase 4: Query 预处理 ✅ (V0.8 已实现)
- [x] Preprocessor 核心服务
- [x] OutputParser 统一解析 `<output>`, `<query>`, `<think>` 标签
- [x] GENERATION_AFTER_COMMANDS 事件阻塞式注入
- [x] 内置 Query 增强 / 剧情编排 / 描写增强模板
- [x] 配置项：是否启用预处理、自动触发、模板选择



---

## 8. 检索参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `topK` | number | 10 | 向量检索返回数量 |
| `minScoreThreshold` | number | 0.3 | 最低相似度阈值 |
| `rerankEnabled` | boolean | false | 是否启用 Rerank |
| `rerankTopN` | number | 5 | Rerank 后保留数量 |
| `queryPreprocessEnabled` | boolean | false | 是否启用 Query 预处理 |

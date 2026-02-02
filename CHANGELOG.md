# Changelog

## [1.2.4] - 2026-02-02

### - 记忆链路加固 (Linkage & Embedding Fix)
- **修复精简联动嵌入失败**: 解决 `EmbeddingService` 在精简工作流或批处理中因配置未及时初始化导致的“罢工”问题。
- **自动向量化策略优化**:
  - **LV1 摘要过滤**: 自动向量化现在只会处理原始的 LV0 详情事件，合并生成的 LV1 摘要将不再被重复向量化，保持向量库的原始细节纯净度。
  - **精简逻辑对齐**: 确认并强化了精简工作流对 LV1 节点的排除逻辑，防止二次合并导致的逻辑混乱。
- **工作流稳定性提升**:
  - 修复了 `ApplyTrim` 步骤在某些时序下无法正确读取解析数据的问题。
  - 增强了 `BatchProcessor` 的配置加载健壮性。

<br/>

## [1.2.1] - 2026-02-01

### ✨ 审查系统重构 (Review System Refactoring)
- **统一化 Review 架构**: 将分散的 `Revision` 和 `Preview` 统一为 **Review System**。
  - **`ReviewContainer`**: 全局唯一的审查容器，支持最小化挂起，防止误触关闭导致流程中断。
  - **`ReviewBridge`**: 新的事件桥接层，统一管理所有审查请求。
- **UI/UX 全面升级**:
  - **最小化功能**: 审查窗口支持最小化为浮窗，方便用户随时查阅上下文。
  - **操作逻辑优化**:
    - **填充 (Fill)**: 将生成内容直接作为 AI 回复填入对话框（原 Skip）。
    - **重抽 (Reroll)**: 不满意当前结果？一键重新生成。
    - **取消 (Cancel)**: 明确的取消操作。
- **专用视图组件**:
  - **SummaryReview**: 新增摘要审查视图，支持以列表形式快速编辑、删减摘要事件。
  - **EntityReview**: 实体提取审查视图，支持查看新增/变更实体。
  - **MessageReview**: 标准文本生成审查。
- **代码库清理**: 移除了旧版的 `RevisionModal` 和 `EntityReviewModal`，代码更轻量规范。

## [1.2.0] - 2026-01-29

### 没什么功能更新,更多是优化和修bug,更新下版本号提醒一下更新,提示词改的比较多,记得点击刷新所有默认的提示词模版



## [1.1.0] - 2026-01-24

### 🏗️ 架构优化 (Architecture Optimization)
- **UI 重构**: 统一了 Processing View 的保存逻辑与状态管理，消除了子面板的私有状态，提升了交互一致性。
- **Workflow 模块化**: 将 `EventTrimmer` 重构为模块化的 `TrimmerWorkflow`，分离了数据获取、处理与保存逻辑，便于扩展。
- **Prompt 约束增强**: 为所有内置 Prompt 增加了强制性的负面约束，防止模型在处理数据时意外续写剧情。

### ✨ 新功能 (New Features)
- **自定义知识书 (Worldbook Profiles)**: 支持为每个 Prompt 模板绑定特定的世界书/设定集，实现更精细的上下文控制。

## [1.0.2] - 2026-01-22

### 🎯 Summary 宏优化 (树状缩进格式)
- **`{{engramSummaries}}` 输出重构**: 采用类文件树的层级缩进格式
  - Level 1 大纲节点作为父节点（无缩进）
  - 被 RAG 召回的 Level 0 归档事件作为子节点（缩进 2 空格 + "当前剧情相关" 标记）
  - 未归档的 Level 0 事件直接输出（无缩进）
- **BrainRecallCache 自动绑定**: `MacroService.refreshEngramCache()` 现在自动从类脑缓存获取召回 ID

### 🔧 Trim 系统优化
- **修复 Level 1 重复精简问题**: `getEventsToMerge()` 现在只选择 `level === 0 && !is_archived` 的事件
- **Trim 提示词重写**: 简化为单事件输出，summary 字段 200-300 字，time_anchor 体现时间范围

### 📊 数据结构变更 (Breaking Change)
- **`location` 类型改为数组**: `structured_kv.location: string` → `string[]`
  - 支持多地点场景，如 `["边境公会大厅", "小镇酒馆"]`
  - UI 编辑器已适配，支持逗号分隔输入

### 🖥️ UI 改进
- **提示词模板管理**: 新增"重置为默认"按钮
  - 可一键将所有内置模板恢复为初始状态
  - 智能保留用户创建的自定义模板
- **默认配置优化**: 实体提取模板默认设为启用状态
- **UI 视觉优化**: 移除禁用模板时的删除线样式，提升可读性

---

## [1.0.1 ] - 2026-01-22

### 多端同步数据库功能

## [1.0.0] - 2026-01-21

### ✨ Entity State Injection (实体状态注入系统)
- **新增宏 `{{engramEntityStates}}`**: 将实体状态注入 LLM 上下文
  - 按实体类型分组输出 XML 标签：
    - `char` → `<character_state>`
    - `loc` → `<scene_state>`
    - `item` → `<item_state>`
    - `concept` → `<concept_state>`
  - 直接使用 `description` 字段（已由 EntityExtractor 烧录为 YAML 格式）
  - 所有实体常态触发，无归档逻辑
- **WorldBook 槽位更新**: 预制条目自动包含 `{{engramSummaries}}` 和 `{{engramEntityStates}}`

### 🛠️ API Changes
- `memoryStore` 新增 `getEntityStates()` 方法
- `MacroService` 新增 `cachedEntityStates` 缓存字段
- `refreshEngramCache()` 现在同时刷新实体状态缓存

---


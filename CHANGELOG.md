# Changelog

## [1.2.8] - 2026-02-07

### 世界书系统优化
现在可以在提示词模板里面选择绑定在该模板上的世界书作为附加知识库。
比如你可以自己写一个角色服装预处理来给角色添加更多样，更详细的服装描写。
同时把一些衣物有关的知识库与它绑定。

## [1.2.7] - 2026-02-06

### 🐛 Bug 修复 (Bug Fixes)

- **SaveEntity 路径匹配修复**: 移除 `encodeURIComponent`，修复中文实体名 JSON Patch 路径不匹配导致的 `Patch failed` 问题
- **EventTrimmer 事件计数修复**: `canTrim()` 和 `getStatus()` 现在使用 `activeEventCount`（只统计活跃事件），修复了精简后"待合并条目不减少"的问题
- **entity_extraction.yaml 示例修正**: 将旧版截断示例替换为符合 RFC 6902 JSON Patch 规范的完整示例

### ✨ 新功能 (New Features)

- **自动精简联动触发**: 在 `Summarizer.triggerSummary()` 完成后自动检查精简阈值，如果精简已启用且达到条件则联动触发精简

### 🔧 改进 (Improvements)

- **UserReview 调试日志**: 添加 `previewEnabled` 调试日志，便于排查预览窗口不弹出的问题

## [1.2.6] - 2026-02-05

### 🐛 Bug 修复 (Bug Fixes)
- **RAG 召回注入 Bug**:
  - 修复召回条目覆盖未归档蓝灯事件的问题。
  - 修复召回条目注入顺序混乱的问题，现按 `source_range` 正确排序并保持树状结构。
- **实体提取触发失败**:
  - 修复 `EntityBuilder.start()` 使用 CommonJS `require()` 导致浏览器环境报错 `ReferenceError: require is not defined` 的问题。
  - 确保 `EventWatcher` 在实体提取监听器注册前正确启动。

### ✨ 新功能 (New Features)
- **预处理 Query 编辑**: 预处理预览界面现在显示两个独立编辑区域：
  - **输出内容 (Output)**: 主要输出区域
  - **检索关键词 (Query)**: 用于 RAG 召回的 query，使用 accent 颜色视觉区分

### 🔧 架构优化 (Architecture Optimization)
- **实体提取统一 JSON Patch 格式**:
  - 移除 `entities` + `patches` 双轨制，统一使用 `patches` 数组
  - 新实体通过 `{ op: "add", path: "/entities/{name}", value: {...} }` 表示
  - 更新操作通过 `{ op: "replace", path: "/entities/{name}/profile/{key}", value: ... }` 表示
  - **向后兼容**: `SaveEntity.ts` 自动识别并支持旧格式
- **Relations 对象化**:
  - `relations` 从数组改为对象，key 为目标实体名
  - 便于 JSON Patch 精确更新单个关系 (如 `/profile/relations/User`)

### 📝 提示词优化 (Prompt Improvements)
- **摘要提示词 (`summary.yaml`)**:
  - 调整对话保留阈值从 0.7 提升到 0.9
  - 细化重要性分级 (金字塔模型) 的定义和权重范围

### 📚 文档更新 (Documentation)
- **RAG 召回指南**: 新增蓝绿灯可见性机制和树状注入格式说明

## [1.2.5] - 2026-02-03

### 🐛 实体提取触发器修复 (Entity Extraction Trigger Fix)
- **触发逻辑重构 (Delta-based Trigger)**: 将实体提取的触发机制从脆弱的“整除检查”（Modulo）更改为稳健的“增量检查”（Delta）。
  - **问题**: 旧逻辑 `floor % interval === 0` 容易因消息丢失、批量导入或编辑而完全跳过触发点。
  - **修复**: 新逻辑 `pendingFloors >= interval` 确保只要累积了足够的新内容，无论楼层号如何，都会触发提取。
- **架构解耦 (Decoupling)**: 实体提取服务现在拥有独立的事件监听器 (`EventWatcher`)，不再依赖 `Summarizer` 服务进行触发，进一步降低耦合度并提高稳定性。
- **参数传递优化**: 修复了 Summarizer 调用实体检查时未传递 `lastExtractedFloor` 的问题。

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


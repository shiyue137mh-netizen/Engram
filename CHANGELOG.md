# Changelog

## [1.2.12] - 2026-02-23

### ✨ 改进 (Improvements)

- **世界书架构重构 (Global Worldbook Refactor)**:
  - 从按角色各自创建 `[Engram] 角色名` 专属世界书，改为统一使用单一的 `[Engram] Global` 全局注入层，大幅减少世界书列表的数量和 UI 污染。
  - 插件启动时即自动创建并挂载 `[Engram] Global` 至全局世界书（`initializeEngram` 中提前初始化），不再依赖首次总结时的懒加载。
  - `WorldInfoService` 和 `WorldbookConfigForm` 的世界书列表均已过滤 `[Engram]` 前缀的系统内部书，防止用户误选导致宏注入口重入。

- **冲突防护 (Macro Collision Guard)**:
  - `WorldbookScannerService.shouldIncludeEntry` 现对所有 `[Engram]` 开头的世界书条目返回 `false`，使其不会再被拼补进通用的 `{{worldbookContext}}` 中，彻底防止与提示词模板内 `{{engramSummaries}}`、`{{engramEntityStates}}` 等宏重入。

### 🗑️ 代码移除 (Removals)

- **旧版世界书摘要机制清理**:
  - 彻底删除了旧版逐条写入摘要到世界书的相关遗留实现：`getSummaryEntries`、`getEngramSummariesContent`、`ensureSeparatorEntries`、`getNextSummaryOrder`、`parseFloorRangeFromName`。
  - 移除了废弃的 `WorldBookStateService`（`state.ts`）及其依赖的 `constants.ts`（包含旧版 `SUMMARY_ENTRY_KEY`、`STATE_ENTRY_KEY`），相关存储统一收归 `apiSettings.worldbookConfig` 全局配置（IndexedDB）。
  - 移除 `WorldbookMetricsService.countSummaryTokens`（旧版基于世界书条目遍历计算摘要 Token 的方法）。

## [1.2.11] - 2026-02-22

### 🐛 Bug 修复 (Bug Fixes)
- **UI 溢出修复**:
  - **实体预览面板**: 修复实体提取的新烧录文本过长时会向右溢出撑破容器的问题。
  - **仪表盘角色名**: 对仪表盘超长的角色名进行合理截断（超过8字显示省略号），防止破坏行内布局。
  - **快捷面板长列表**: 为快捷面板的预处理模板列表添加局部高度限制与独立滚动条，避免列表过长导致整体浮窗伸长越界。
- **样式细节优化**:
  - **滑动条圆点**: 保证滑动条（Range）的圆点在非悬浮状态下依然可见并加深颜色，避免与极简的底部分割线混淆。

### 🗑️ 代码移除 (Removals)
- **图谱视图及依赖清理**: 彻底移除了复杂交互图谱库 `ReactFlow`、负责图形节点计算布局的 `dagre` 及其 `layoutHelper.ts` 辅助代码，并清理了在记忆流界面的相应组件 `GraphView.tsx` 及其导航入口菜单，大幅精简了项目打包体积。

## [1.2.10] - 2026-02-10

### 🐛 Bug 修复 (Bug Fixes)
- **世界书过滤系统修复**:
  - **模板绑定修复**: 修复 `FetchContext` 变量名错误，导致绑定到 Prompt Template 的世界书无法被正确识别和加载的问题【CRITICAL】。
  - **强制加载逻辑**: 为绑定世界书添加 `forceInclude` 机制，确保即使全局禁用也能正确加载（同时仍遵循条目级黑名单）。
  - **过滤逻辑修正**: 修复 `crud.ts` 未填充 `world` 属性导致所有世界书过滤失效的问题。
  - **名称过滤优化**: 移除对 `---` 和 `格式` 开头世界书的硬编码过滤，避免误伤用户内容。
  - **常数检测增强**: 优化 "Constant" 条目检测逻辑，支持多种策略定义格式。
- **实体提取 UX 优化**:
  - **双重弹窗修复**: 修复配置面板 (`EntityConfigPanel`) 重复调用工作流导致出现两次预览弹窗和两次保存的问题。
  - **样式溢出修复**: 修复实体审查界面 (`EntityReview`) JSON 编辑器在内容过长时撑开页面的问题，添加横向滚动支持。
- **上下文范围优化**:
  - **提取范围调整**: 实体提取现在统一使用 `[上次总结楼层 + 1, 当前楼层]` (上限50层) 作为上下文范围，确保 LLM 获得更完整的对话语境。

## [1.2.9] - 2026-02-09

### 🐛 Bug 修复 (Bug Fixes)

- **`{{engramEntityStates}}` 宏注入修复**: 修复实体提取流程中 `{{engramEntityStates}}` 宏未被替换的问题
  - 在 `FetchContext.ts` 中添加实体状态数据获取
  - 在 `BuildPrompt.ts` 中添加宏映射，确保实体状态正确注入到提示词

### ✨ 改进 (Improvements)

- **事件摘要格式优化**: 调整 Burn 格式，更紧凑、语义化
  - 新格式: `标题(因果链 | 逻辑标签):\n(时间 | 地点 | 人物) 摘要内容`
  - 移除冗余的 `[逻辑: ...]` `[因果: ...]` 后缀标签，减少向量化噪音和 Token 消耗
- **因果链语义化**: `causality` 字段从固定枚举 `Start|Chain|End` 改为 AI 自由生成的语义化描述
  - 支持：开端、转折、高潮、收束、伏笔、承接、回响 等自然语言描述
  - 更利于嵌入式理解和 RAG 召回

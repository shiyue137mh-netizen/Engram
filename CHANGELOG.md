# Changelog

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

## [0.9.11] - 2026-01-21

### 📚 Built-in Documentation System (内置文档系统)
- **MDX 引擎集成**: 支持用 Markdown + React 组件编写交互式文档
- **全局搜索集成**: Command Palette (`/`) 支持搜索文档内容，直接跳转
- **深度链接**: 支持从外部直接导航到特定的文档 Tab
- **视觉升级**: 文档标题 (H1/H2) 自动适配主题色，优化阅读体验

### 📖 Documentation Refactoring (文档重构)
- **深度功能补全**:
  - **Preprocess**: 详解小说导入 (Fast/Detailed 模式) 与历史批处理
  - **Sticky Cache**: 解释类脑召回的惯性保持与防刷屏机制
  - **Config**: 补全 Prompt Template, Worldbook, Regex 等高级配置
- **事实修正**: 修正关于 Summarizer 触发逻辑的错误描述

### 🛠️ Fixes & Polish
- **Lint Fixes**: 修复 `Summarizer` 类型安全问题与 `EntityExtractor` 参数校验问题
- **Type Definitions**: 重构 `assets.d.ts`，修复 `*?raw` 导入类型错误
- **Visual Polish**: 修复移动端文档布局溢出问题
- **Log Export**: 修复日志导出时的版本号硬编码问题 (现在与 manifest 同步)

---

## [0.9.10] - 2026-01-21

### 运行日志系统优化
### UI小修

---

## [0.9.9] - 2026-01-18

### 🏗️ Layered Modular Architecture (分层模块化架构重构)
- **目录结构重组**: 采用 L0-L6 分层架构
  - `core/` - 核心层：基础类型、事件总线、日志系统
  - `config/` - 配置层：SettingsManager
  - `data/` - 数据层：IndexedDB (EngramDB) + ChatManager
  - `integrations/` - 集成层：SillyTavern 适配 + LLM 调用
  - `modules/` - 模块层：业务核心 (memory, rag, workflow, preprocessing)
  - `state/` - 状态层：Zustand Store
  - `ui/` - 表现层：React 视图

### ⚡ Performance (性能优化)
- **世界书扫描优化**: 从扫描全量聊天历史改为按场景智能扫描
  - Summary 场景：扫描指定楼层范围 (通过 `floorRange` 参数)
  - 预处理场景：仅扫描最近 4 条消息
  - 扫描时间从 30s~1min 降至秒级响应
- **动态 maxContext**: 根据消息数量动态调整扫描深度

### 🛠️ API Changes
- `WorldInfoService.getActivatedWorldInfo()` 新增 `options.floorRange` 参数
- `STContext` 类型新增 `getTokenCountAsync` 和 `stopGeneration` 方法声明

### 🐛 Bug Fixes
- 修复 `{{chatHistory}}` 宏在旧版本未 build 时返回空的问题
- 修复变量名冲突导致的 lint 错误

---

## [0.9.6] - 2026-01-16

### ✨ Batch Processing (批量处理)
- **历史消息批处理**: 一键处理历史聊天记录
  - 支持设置起始/结束楼层范围
  - 任务队列预分析（剧情总结 → 实体提取 → 事件精简 → 向量化）
  - 预估 Token 消耗
  - 实时进度显示，支持暂停/继续/停止
- **外部文本导入**: 导入小说、电子书等外部 txt 文件
  - **快速模式**: 分块 → 直接向量化（不调用 LLM）
  - **精细模式**: 分块 → LLM 总结 → 向量化
  - 可配置块大小和重叠字数

### 🏗️ Architecture
- 新增 `BatchProcessor` 服务 (`services/batch/BatchProcessor.ts`)
- 新增 `BatchProcessingPanel` 组件 (`views/Processing/BatchProcessingPanel.tsx`)
- Processing 视图新增「批量处理」Tab

---

## [0.9.5] - 2026-01-16

### ✨ Dashboard Redesign (仪表盘重构)
- **全新仪表盘首页**: 采用现代化 Grid 布局
  - **服务状态卡片**: 实时显示总结服务运行状态
  - **记忆统计卡片**: 展示事件/实体/向量数量及总 Token
  - **快捷入口**: 一键跳转至各功能模块
- **功能开关面板**: 集中管理所有功能的启用/禁用状态
- **系统信息卡片**: 显示当前版本、角色、聊天ID等上下文信息

### 💄 UI Improvements
- 统一使用 Lucide 图标替代 emoji
- 快速入口与侧边栏导航配置统一 (`NAV_ITEMS`)
- 所有 UI 文案改为中文

---


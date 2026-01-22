# Changelog
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




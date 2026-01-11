# Changelog


## [0.8.0] - 2026-01-11

### ✨ New Features (新功能)
- **输入预处理系统 (Input Preprocessing System):**
  - 在用户发送消息时自动进行预处理，支持多种功能模式
  - **Query 增强**: 扩展用户输入的指代词，优化 RAG 检索效果
  - **剧情编排**: 生成导演指令框架，指导 AI 进行剧情发展
  - **描写增强**: 补充细节描写和环境氛围
  - 支持自定义预处理模板，统一使用 `preprocessing` 分类
  - 阻塞式事件处理，确保预处理完成后再继续生成

### 🏗️ Architecture (架构改进)
- **Preprocessor 服务**: 新增 `services/preprocessing/Preprocessor.ts`，统一管理预处理逻辑
- **OutputParser**: 新增 `services/preprocessing/OutputParser.ts`，统一解析 `<output>`, `<query>`, `<think>` 标签
- **Injector 重构**: 使用 `GENERATION_AFTER_COMMANDS` 事件实现阻塞式预处理注入
- **模板分类简化**: 将 `query_enhance`, `plot_director`, `description` 统一为 `preprocessing` 分类

### 📄 新增文件
- `src/services/preprocessing/Preprocessor.ts` - 预处理核心服务
- `src/services/preprocessing/OutputParser.ts` - 输出解析器
- `src/services/api/prompts/query_enhance.md` - Query 增强模板
- `src/services/api/prompts/plot_director.md` - 剧情编排模板
- `src/services/api/prompts/description.md` - 描写增强模板

## [0.7.1] - 2026-01-10

### 💄 UI/UX Improvements (界面优化)
- **Header Fusion & Compact Mode**: 采用了 "Borderless Fluid" 设计理念，移除了顶部边框和多余 Padding，使界面更加紧凑流畅。
- **LayoutTabs Refactor**: 全面重构了二级导航栏，统一了样式和交互，支持标签页切换时的平滑动画。
- **Divider Visibility**: 优化了分割线的可见度逻辑，在包含子 Tab 的视图中自动隐藏冗余分割线，提升视觉整洁度。
- **Sub-tabs Opacity**: 回退了子 Tab 的透明度设置，确保在各种背景下均有良好的可读性。

### 🐛 Bug Fixes & Refactoring (修复与重构)
- **Embedding Service 404 Fix**: 
  - 修复了自定义 OpenAI 兼容接口在未提供完整路径时的 404 错误。
  - 实现了智能 URL 修正功能，自动检测并补全 `/v1/embeddings` 后缀。
  - 优化了错误日志，现在会明确打印出实际请求的完整 URL。
- **Linked Deletion for Sharded DB**:
  - 修复了联动删除功能在多库架构下的失效问题。
  - 现在删除聊天或角色时，会正确清理对应的 `Engram_{chatId}` IndexedDB 数据库文件。
  - 增加了对共享 Worldbook 的删除保护警告。

## [0.3.0] - 2026-01-02

### 🏗️ Architecture & Refactoring (架构重构)
- **文件结构优化**: 完成了核心服务 (`src/services`)、基础设施 (`src/lib`, `src/tavern`) 和视图层 (`src/views`) 的分层重构。
- **状态管理升级**: 引入 **Zustand** 替代部分 React Context (`ThemeStore`, `DevLogStore`)，提升性能并简化状态逻辑。
- **依赖治理**: 全面迁移至绝对路径导入 (`@/*`)，消除了相对路径混乱。

### ⚡ Performance (性能优化)
- **按需加载**: 对非核心视图 (Graph, Settings) 启用 `React.lazy` 懒加载，减少首屏体积。
- **资源优化**: 优化了 Google Fonts 加载策略 (Preload)，提升页面渲染速度。

### 💄 UI/UX Improvements (体验改进)
- **毛玻璃控制**: 设置中新增全局 **毛玻璃特效开关**，允许在低性能设备上关闭磨砂效果。
- **移动端适配**:
  - 侧边栏增加收折功能和版本号显示。
  - 优化 Processing 界面在移动端的布局显示。
  - 修复了设置项长文本溢出的问题。

## [0.2.1] - 2025-12-31
### 🐛 Bug Fixes
- **修复了世界书条目黑名单功能的 bug**
- **修复了 Rerank 模型动态选择的 bug**

### 📚 Documentation
- **更新了文档**


## [0.2.0] - 2025-12-31

### ✨ New Features
- **剧情总结模块 (Story Summary Module):**
  - 新增纯文本双层记忆总结系统
  - 支持将对话提炼为结构化的剧情单元并存入世界书
  - 提供预览与修订功能，确保总结内容的准确性
  - 支持多种触发模式（手动/自动）与自定义提示词模板

### 💄 UI/UX Improvements
- **UI 精修 (Refined UI):**
  - 全面优化界面视觉风格，采用更加现代化的设计语言
  - 改进交互体验，提升操作流畅度

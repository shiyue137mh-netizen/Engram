# Changelog

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

## [0.9.4] - 2026-01-16


### 🏗️ Graph System Refactoring (图谱系统重构)
- **无边设计 (No-Edge Design)**: 移除独立的 Edges 表，采用更轻量的拓扑逻辑
  - **显式关系**: 通过 `EntityNode.profile.relations` 存储静态逻辑关系
  - **隐式关系**: 通过 `EventNode.structured_kv.role` 反查建立动态共现连接
- **双重结构 (Double-Structure)**: 所有实体节点遵循 "Store as JSON, Prompt as Text" 模式
  - `description`: [For Model] YAML 烧录文本，直接注入 LLM 上下文
  - `profile`: [For Machine] 开放式 KV 容器，AI 可自由写入任何属性
- **EntityNode 重构**:
  - ✅ 新增 `profile: Record<string, unknown>` 开放容器
  - ✅ 新增 `EntityRelation` 接口 (`target`, `type`, `description`)
  - ❌ 移除 `significance` 字段 (对实体无意义)
  - ❌ 移除 `related_events` 字段 (改用 EventNode.role 反查)
  - ❌ 移除 `first_seen_event_id` 和 `ext` 字段

### 🗄️ Database (数据库升级)
- Schema 升级到 **v2**
- 为 `entities` 表添加 `*aliases` **MultiEntry 索引**，支持高效别名查询

### ✨ EntityBuilder 升级
- LLM 输出改为开放式 `profile` 结构
- 新增 `profileToYaml()` 方法将 profile 序列化为烧录文本
- 更新消歧逻辑，支持 profile.relations 合并

### 📊 GraphView 优化
- 显式边: 从 `profile.relations` 生成实体间关系连线
- 隐式边: 从 `EventNode.structured_kv.role` 反查生成实体-事件共现连线

### 📄 Documentation
- 更新 `entity_extraction.md` 提示词模板，适配开放式输出格式
- 更新 `项目文件架构.md`、`项目总体架构.md`、`项目系统流程架构.md`

---

## [0.9.0] - 2026-01-15

### ✨ Graph System (Memory Stream 图谱可视化)[未完全完成,还需要继续修复]
- **Memory Stream Visualization**: 全新引入的 **记忆流图谱视图** (`GraphView`)，基于 React Flow 打造，将线性的事件日志转化为可视化的知识图谱。
  - **LOD (Level of Detail)**: 实现了创新的 **语义缩放机制**。节点内容随缩放级别动态变化：
    - **极简模式 (LOD 0)**: 仅显示节点位置和连接，宏观把控记忆分布。
    - **摘要模式 (LOD 1)**: 显示时间锚点和关键摘要，浏览剧情脉络。
    - **详情模式 (LOD 2)**: 针对大缩放比例，展示完整摘要和参与角色，提供深层上下文。
  - **Auto Layout**: 集成 Dagre 自动布局算法，支持一键自动整理节点布局 (`Top-to-Bottom`)，解决节点重叠混乱问题。
  - **Mixed Node Types**: 同时支持 **Event (事件)** 和 **Entity (实体)** 两种节点的混合可视化，清晰展示"剧情-角色-物品"之间的关联网络。
  - **Interactive Canvas**: 支持无极缩放、节点拖拽、Minimap 导航，提供流畅的探索体验。

### 🛠️ Preprocessing & Macro (预处理与宏系统升级)
- **Injection Mode Strategies (注入模式策略)**:
  - 解决了预处理结果强制覆盖用户输入的问题。需在提示词模板中配置：
    - `Replace`: 覆盖 (Overwrite) - 适用于描写增强/改写。
    - `Append`: 追加 (Append) - 适用于 RAG Query 增强/指令添加 (默认用于 Query 增强)。
    - `Prepend`: 前置 (Prepend) - 适用于上下文前置。
- **Custom Macros (自定义宏系统)**:
  - 新增 **自定义宏** 功能。用户可以在 API 配置中定义自己的变量（如 `{{user_style}}`, `{{current_quest}}`），并在所有提示词模板中通过 Standard Mustache 语法引用。
- **Preview & Revision (预览与修订优化)**:
  - 预处理预览弹窗新增 **Re-roll (重试)** 按钮，允许在不关闭弹窗的情况下重新生成预处理结果，直到满意为止。

### 💄 UI/UX Improvements (界面重构)
- **Processing Panel Redesign**:
  - 全面重构了 **数据处理 (Processing)** 面板，废弃了旧版列表，采用更现代的 **Grid Card** 布局。
  - 状态可视化：使用不同颜色的 Badge 清晰标识 Log/Summary/Vector 状态。
  - 响应式优化：在宽屏下自动切换为多列布局。
- **API Presets Optimization**:
  - **Mobile First**: 针对移动端优化了 Master-Detail 交互，新增全屏表单编辑模式，解决小屏幕配置难的问题。
  - **Template Management**: 提示词模板列表增加了分类折叠和子 Tab 切换（模板/宏），减少视觉干扰。

### 🐛 Bug Fixes
- 修复了 `{{chatHistory}}` 宏在某些上下文中包含多余系统指令的问题。
- 修复了 Ollama Embedding 接口在特定端口配置下的连接失败问题。
- 修正了图谱视图在首次加载时可能出现的节点重叠问题 (通过 `useReactFlow` 钩子优化了初始化布局)。
- 修复了预处理注入时 `textarea` 也可以被正确回写的问题 (Strategy 2 Fallback)。

## [0.8.5] - 2026-01-12

### ✨ New Features (新功能)
- **RAG 召回系统 (RAG Retrieval System):**
  - **多模式支持**: 提供 Full (预处理+Embedding+Rerank)、Standard (Emb+Rerank)、Light (仅Emb) 多种模式，适应不同需求。
  - **混合打分**: 融合向量相似度 (Embedding) 和语义相关度 (Rerank) 的双重评分机制，提升召回精准度。
  - **黏性系统 (Sticky System)**: 引入短期记忆黏性机制，自动对连续召回的事件进行权重衰减，防止同一内容反复刷屏。
  - **Unified Query**: 在 Full 模式下利用 LLM 生成四维指令（因果/视觉/实体/情感），弥补用户简短输入的检索鸿沟。
- **召回日志 (Recall Log):**
  - DevLog 新增 Recall 标签页，提供召回全流程可视化。
  - 支持查看 Embedding/Rerank/Hybrid 双色分数条对比。
  - 采用 Master-Detail 两列布局，支持全屏查看详情，优化移动端体验。
- **通知系统优化**:
  - 预处理模块添加实时运行状态通知 (`toastr`)，支持点击取消。
  - 集成酒馆 `stopGeneration` API，实现真正的全链路中止。

### 🏗️ Architecture (架构改进)
- **HybridScorer**: 实现 `(1-α)*Emb + α*Rerank` 加权公式与黏性惩罚逻辑。
- **StickyCache**: 新增内存级黏性缓存服务 `services/rag/StickyCache.ts`。
- **Injector 升级**: 完善了 RAG 结果到 `{{engramSummaries}}` 宏的注入流程。

### 📄 Documentation (文档)
- 新增 `docs/Engram_RAG召回系统完全指南.md`
- 新增 `docs/V0.8.5_RAG召回系统设计.md`

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


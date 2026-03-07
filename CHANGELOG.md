# Changelog

## [1.4.3] - 2026-03-07

### ✨ 记忆生命周期管理与召回优化 (Memory Lifecycle & Retrieval Granularity)

- **实体与事件锁定机制 (Locking Protection)**:
  - 在「记忆流」卡片中引入了锁定功能。被锁定的实体将获得“归档金牌”，不会在自动清理时被移出；被锁定的事件则免于 Trimming（精简总结）的合并逻辑，用于永久锚定核心剧本节点。
- **实体归档管家 (Auto-Archiving logic)**:
  - 实现了基于配置的实体自动归档功能。当活跃实体总数超过上限（默认 50）时，系统会根据活跃度自动将最旧且未锁定的实体归档，极大降低了大规模对话下 RAG 扫描的计算压力。
- **召回颗粒度细化 (Retrieval Selectivity)**:
  - 关键词召回开关现在支持「检索实体」与「检索事件」的独立控制。允许在开启向量召回（Vector RAG）的同时关闭冗余的事件正则扫描，从而将本地算力精准集中于对角色/地点的高频硬命中扫描上。
- **UI 布局与健壮性提升**:
  - 全面重塑了 `EntityConfigPanel` 提取配置面板，增加了已归档数量的动态监控、手动清理入口以及更友好的配置交互逻辑。

### 🐛 缺陷修复 (Bug Fixes)

- **配置渲染崩溃修复**: 修复了由于 `autoArchive` 等可选字段未初始化导致配置面板白屏的渲染断层。
- **数据状态同步优化**: 修正了 `EntityExtractor` 在保存实体后未触发自动归档检查的逻辑缺失。
- **冗余日志清理**: 移除了实体更新过程中的高频 `debug` 日志，进一步提升控制台清洁度。


## [1.4.2] - 2026-03-06

### ✨ 全局系统遥测与成就展板 (Global Telemetry & Achievement Data)

- **仪表盘成就系统 (Achievements Panel)**:
  - 移除了 Dashboard 顶部的过时区块，全面替换为全新的“全局统计与成就”展板。
  - 支持跨会话长期记录并在仪表盘展示用户的资源消耗 (Token 消耗总计)、生产力产出 (永恒记忆/实体 生成) 以及 LLM/RAG 调用次数。
  - 构建了动态微章系统 (Badge System)，随着使用深度的增加，用户可解锁“陪伴活跃度”(百日陪伴/硬核用户)、“百万 Token”、“万卷藏书”、“神经漫游者”等专属头衔。
- **系统核心埋点 (Service Instrumentation)**:
  - 在底层 `LLMAdapter` 成功返回处实现统一的 Token 估算与总调用数拦截计数。
  - 为 `Summarizer`、`EntityExtractor` 和 `Injector` (RAG注入点) 提供遥测钩子，精准记录每次成功的记忆归档和上下文注入。

### ✨ 其他功能增强 (Other Enhancements)

- **向量化范围指定 (Vectorization Range Selection)**:
  - 在「数据处理 - 向量化」面板的新增了可选的起始与结束消息序号区间配置。
  - 底层 `EmbeddingService` 支持区间拦截，允许用户精细控制 Text Embedding 的事件边界，避免在大长篇对话中进行无差别的算力消耗。
- **系统摘要审查优化 (Summary Review Refactoring)**:
  - 重构了 `SummaryReview` 面板，增加了底层防呆解析逻辑。现在能够自动解析并提取 LLM 生成的原始 JSON 格式字符串，避免了过去将 JSON 源码逐行切分展示的问题。
  - 优化了事件卡片的 UI 表现，使得事件审核界面更加一致和清晰。
- **核心摘要提示词优化 (Prompt Optimization)**:
  - 增强了 `summary.yaml` 与 `trim.yaml` 的核心指令，引入了参照剧情编排的“反八股”原则。
  - 明确禁止在抽取人物关系时过度解读为“支配、控制、猎物”等权力化关系，保持情感互动描写的平等性。
  - 严格限制 `causality` 字段的输出，确保该字段只填入真实的逻辑因果链（如“引发了XX”、“关键伏笔”），避免混入无意义的闲聊或情绪标签。
  - 在 `summary.yaml` 的 `<example_demonstration>` 块中加入了一个反八股判定的清晰实例，以及一个示范“平实语言描述客观行动”的浪漫互动段落（希恩与伊莉雅的深渊交互）。

### 🐛 缺陷修复 (Bug Fixes)

- **设置面板删库功能修复 (Database Deletion Fix)**:
  - 修复了在全局设置界面点击“删除数据库 (删库)”按钮时静默失败的问题。先前由于 `memoryStore` 未在当前视图挂载聊天 ID，导致删除操作直接 `return` 而未抛出错误。现已补全 ID 兜底获取逻辑（回落到底层 `getCurrentChatId()`），确保能彻底清除 IndexedDB 持久化文件。
- **自定义 API 配置面板布局修复 (API Presets Layout Fix)**:
  - 修复了因为过长的解释文本导致“流式传输 (Streaming)”等具有大量说明的开关按钮（SwitchField）被挤出可见区域的 UI 排版错误。由于父级 `MasterDetailLayout` 缺少 `min-w-0` 限制，过长的子级文本会撑破 `flex-1` 容器，现已修正 flex 收缩逻辑。
- **剧情摘要修订面板 UI 修复 (Summary Review UI Fix)**:
  - 修复了生成剧情摘要后，预览弹窗中直接显示底层原始 JSON（包括 `time_anchor`, `role`, `events` 等字段）而不是卡片化事件列表的问题。先前 `SummaryWorkflow` 传递给评审模块的类型被错误地降级为默认的 `text`（文本编辑器视图），现已明确指定为 `summary` 类型，从而正确唤起 `SummaryReview` 卡片视图，支持逐条对事件进行修改或增删。
- **Dashboard 看板定时器修复 (Dashboard Data Sync Fix)**:
  - 修复了 `useDashboardData` 因闭包导致无法获取最新刷新回调，以及在组件卸载后仍然执行异步更新导致 React 内存泄漏警告的问题。现已引入 `useRef` 隔离与 `isMounted` 拦截，并消除了循环内的高频动态导入。
- **Batch 长程引擎调度修复 (Batch Engine Execution Fix)**:
  - 在底层引擎中实现了对生成器（Generator）的非阻塞状态交接，正式引入无损事件循环“挂起 (Soft Pause)”与“继续 (Resume)”机制。修复了原先暂停时历史作业无法保留运行点的问题。
  - 在 `HistoryTask` 历史总结作业中，修复了基于固定间隔死板推算进而导致进度条造假的逻辑断层，现在能够通过实时感知底部数据变化精准推导进度并隔离处理异常。
- **核心配置数据不同步问题重构 (Configuration Store Refactoring)**:
  - 彻底解决了多处挂载界面因为独立状态副本导致配置修改丢失的异常（“A面板修改了配置，但背景主页面未生效”）。使用 Zustand 仓库（`configStore.ts`）抽离并重构了所有的功能级 Config 配置，同时重写了 `useConfig.ts` 让其单纯代理状态库，完美复用兼容原本数百处陈列接口。


## [1.4.1] - 2026-03-06

### ✨ 架构重构与测试闭环 (Architecture & Testing)

- **RAG 检索流水线化 (Retrieval Pipeline)**:
  - 弃用 `Retriever.ts` 中堆砌的检索组装逻辑，成功将其解耦为由 `WorkflowEngine` 驱动的四个标准化单元 (`VectorRetrieveStep`, `RerankMergeStep`, `BrainRecallStep`, `RecordRecallLogStep`)。
  - 数据与配置上下文通过 `JobContext` 规范流通，实现高度可拔插。
- **批量任务引擎抽象 (Batch Engine)**:
  - 废除了曾经作为万能入口但日渐臃肿的 `BatchProcessor.ts` 单体。
  - 抽离出更底层的 `BatchEngine`，专职接管任务生命周期、并发锁以及 UI 进度节流通知。
  - 将庞大的“历史扫描与纯文本导入”业务下推为独立的 `TaskHandler` （如 `HistoryTask`）。
- **编译修复与全链路集成测试**:
  - 全面清扫了从老接口强转过程带来的 TypeScript 报错，实现 `npm run build` 零 Error。
  - 引入了 `retrieval-workflow.test.ts` 以及 `batch-engine.test.ts` 并在不调用实际模型的前提下确保了整条数据传输总线（Pipeline）一次通过集成模拟测试。


## [1.4.0] - 2026-03-05

### ✨ Agentic RAG 交互与批量数据处理升级 (Agentic UI & Data Batching)

- **Agentic 召回决策审阅 (Recall Decision Modal)**:
  - 引入了全新的独立弹窗组件，支持在 Agentic Dry Run 后检阅大模型（LLM）激活的事件，并展示对应的评分（Score）与理由（Reason）。
  - 下半区内置了基于 `react-virtuoso` 构建的虚拟滚动列表，支撑海量“未激活”归档事件的高性能渲染。
  - 为未激活列表配备了便捷的 `[低] [中] [高]` Ghost 按钮与自定义分值输入框，支持随手一键添加未命中事件并即时赋分。
- **Message Review 适配 Agentic RAG**:
  - 消息审核组件 (`MessageReview`) 新增 Agentic 专属展现区块，自动识别并微缩展示命中决策。
  - 增设了「查看 / 编辑」入口，允许终端用户在使用完整预处理流时，随时召出决策面版干预 LLM 对 RAG 的选用。
- **数据级归档解耦 (Data-Level Archiving)**:
  - 取消了归档操作与“对话楼层 (Floor)”的耦合绑定。在批处理面板底部新建了独立的数据级操作区 `DataBatchSection`。
  - 现在支持一键扫描全库结构，并统一把所有“已完成向量化但尚未归档”的 level 0 事件批量归入历史档案。
- **Agentic Dry Run 链路真实化**:
  - 修复了此前预处理干跑测试只执行一半的问题，现在 Dry Run 测试直接连通完整的 `agenticSearch`，不仅验证提示词，也会真实写入 Dev Log。
  - Recall 日志面板同步升级，为 Agentic 测试增加了标志性的橙色边框以及详细的「思考理由」文本展示。
- **UI 布局与 Prompt 优化**:
  - 修复了 LLM 预设配置页刷新模型按钮在桌面端被挤出视口的 Bug（已移动至字段标签旁并转为无框极简图标）。
  - 清理了 `agentic_recall.yaml` 模板中多余的 `<output>` 指令区，强制 LLM 将解析力集中于 `<recall_decision>`。


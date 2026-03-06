# Changelog

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


# Changelog

## [1.4.5] - 2026-03-10

### 🛡️ 系统稳定性与数据一致性强化 (System Robustness & Integrity)

- **实体去重与合并 (Entity De-duplication)**:
  - 核心逻辑重构：保存实体时新增同名冲突检测（忽略大小写）。
  - 实现“软合并”策略：当存在冲突时，自动将 `add` 指令转为对已有 ID 的 `merge` 操作，追加新描述并合并标签，彻底解决 RAG 库中的实体冗余问题。
- **向量检索分级裁剪 (RAG Vector Truncation)**:
  - 在 `VectorRetrieveStep` 实施输入长度限制。针对聊天历史回溯裁剪至 300 字符，针对特定查询裁剪至 500 字符。
  - 此举有效防止了 Embedding 模型因输入过长导致的语义稀释与计算过载，提升召回质量并降低 API 负荷。
- **工作流死循环防护 (Workflow Safety)**:
  - 在 `WorkflowEngine` 中引入 `jumpCount` 跳数熔断机制。
  - 严防逻辑错误导致的无限循环（熔断上限：50步），增强了异步作业链路的鲁棒性。
- **同步服务灵敏度优化 (Sync Proactivity)**:
  - 引入 `visibilitychange` 监听，实现“切回窗口即自动触发同步”，显著降低多终端数据延迟感。
  - 转码异步化：将 Base64 转码移至异步微任务流，消除了大数据量同步时的界面暂瞬卡死。

### 💄 UI 体验深度打磨 (UI & UX Polish)

- **召回日志展示优化 (Recall Log Fold)**:
  - 为长文本查询增加了 `line-clamp-3` 折叠逻辑，辅以“点击展开”交互，解决了大数据量下召回面板溢出的问题。
  - 修正了 `mode` 标签的逻辑映射 Bug，准确区分“向量”、“混合”与“Agentic”模式。
- **内存流时间轴重构 (Memory Stream Timeline)**:
  - 废弃了基于楼层的物理分组模式，改为更自然的「按日期逻辑分组」。
  - 统一种子排序：移除 level 优先权的视觉干扰，让所有事件严格按照时间轴顺序（升序/降序）平滑排列，大幅提升乱序录入时的可读性。

### ⚡ 核心性能改进 (Core Performance)

- **状态订阅断路修复**: 修复了 `useMemoryStream` 钩子由于静态获取状态导致的响应式断路问题，现在 UI 能实时跟随 store 变更。
- **全局搜索防抖**: 内存流搜索框引入 300ms 防抖处理，极致降低打字过程中的 DOM 渲染频率。
- **批量更新原子化**: 重构 `handleBatchSave` 接口，使用 Dexie 事务级批量接口替换并发单次请求，提升写入稳定性。

## [1.4.4] - 2026-03-09

### 🛡️ 实体提取链路稳定性修复 (Entity Extractor Stability)

- **自动触发范围防倒挂**:
  - 修复了自动提取链路在楼层回溯后可能生成倒置区间的问题。
  - 在 [`handleMessageReceived()`](src/modules/memory/EntityExtractor.ts:85) 内新增 `startFloor <= currentFloor` 保护，避免向底层历史拉取传入非法范围。
- **触发判定函数纯化**:
  - [`shouldTriggerOnFloor()`](src/modules/memory/EntityExtractor.ts:158) 由“判断 + 隐式写状态”重构为纯判断函数。
  - 楼层回溯时的状态对齐副作用迁移至调用方 [`handleMessageReceived()`](src/modules/memory/EntityExtractor.ts:85)，链路职责更清晰、行为更可预测。
- **可观测性增强**:
  - 为回溯短路、状态对齐成功/失败、未满足触发条件等路径补充结构化日志，便于线上定位与回归排查。

### ⚡ Memory Stream 编辑性能优化

- **摘要编辑防抖同步**:
  - 将事件编辑器摘要字段改为统一走防抖同步链路，避免每次输入都触发上层状态重算。
  - 缓解了大数据量记忆流下输入卡顿问题，提升编辑体验。

### ✅ 测试与质量保障

- **新增 `EntityExtractor` 专项测试**:
  - 新增 [`test/entity-extractor.test.ts`](test/entity-extractor.test.ts)，覆盖以下关键场景：
    - 回溯场景下 [`shouldTriggerOnFloor()`](src/modules/memory/EntityExtractor.ts:158) 仅返回 `false` 且无状态写入副作用。
    - `lastSummarized > currentFloor` 时自动触发范围被正确钳制，不会倒挂。
    - `currentFloor < lastExtracted` 时会执行 `last_extracted_floor` 对齐并跳过本轮提取。
- **测试执行通过**:
  - 已通过 [`vitest`](vitest.config.ts:4) 定向用例验证，确保修复可回归。

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



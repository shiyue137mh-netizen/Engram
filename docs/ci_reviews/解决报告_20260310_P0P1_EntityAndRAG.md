# Engram CI 严重问题解决报告（P0~P3）

- **日期**: 2026-03-10
- **范围**: 修复两份审查报告中的 P0 + P1 + P2 + P3（实体提取链路、关键词召回、类脑缓存配额、工作流错误日志）
- **报告来源**:
  - [docs/ci_reviews/review_report_1714000001.md](docs/ci_reviews/review_report_1714000001.md)
  - [docs/ci_reviews/review_report_1773095183.md](docs/ci_reviews/review_report_1773095183.md)

---

## 0. 结论摘要

已落地 5 类关键修复：

1. **实体提取 Watchdog 导致的指针卡死与自动死循环风险（P0）**：将 60s Watchdog 改为**可配置**且默认提升到 **180s**，并在 Watchdog 超时时对自动触发场景进行**防御性推进** `last_extracted_floor`，避免增量触发反复命中造成“无限重试”。
2. **手动提取 + UserReview 确认后楼层指针不更新（P0）**：实体提取完成后更新 `last_extracted_floor` 使用 `range[1]`（若存在），保证 UI 手动/审核链路推进指针。
3. **关键词召回候选爆炸（P1）**：为关键词召回新增 `keywordTopK` 配置并在关键词阶段与合并阶段**双重截断**，防止候选集突破上限进入后续重排与类脑缓存。
4. **WorkflowEngine 错误日志 step 误报（P0）**：引擎捕获异常时记录 `metadata.currentStep`/`currentStepName`，避免误用 `stepsExecuted` 的最后一个成功 step。
5. **类脑缓存实体/事件打架（P2）**：在类脑缓存工作记忆选取时引入“按类别配额”的选取逻辑（事件/实体分别 Top-K），并提供 `eventWorkingLimit` / `entityWorkingLimit` 配置项，避免实体把事件全部挤出工作记忆。
6. **关键词实体保送永远免疫衰减（P3）**：关键词命中的实体不再无条件保送；若未进入 WorkingMemory，仅给有限保底权重（clamp + floor），进入 WorkingMemory 则使用随衰减变化的 `finalScore`。

同时完成最小回归验证：`pnpm test` 全绿（58/58）。

---

## 1. P0-1：实体提取 60s Watchdog 超时导致指针卡死 / 自动死循环

### 1.1 问题描述（来自审查）

- 位置：[`EntityBuilder.extractFromChat()`](src/modules/memory/EntityExtractor.ts:198)
- 现象：使用 `Promise.race` + 60s watchdog。若本地大模型响应 >60s，会超时抛错。由于失败路径未推进 `last_extracted_floor`，自动触发的增量判断持续满足，导致**无限循环触发提取**。

### 1.2 根因

- watchdog 阈值写死（60s）对本地慢模型不友好。
- 超时错误属于“可恢复失败”，但状态指针未推进，触发条件（pendingFloors >= interval）持续成立。

### 1.3 修复策略

1. 新增实体提取配置项 `watchdogTimeoutMs`（默认 180000ms）。
2. Watchdog 触发时：
   - 设置 `signal.cancelled = true`，让 [`WorkflowEngine.run()`](src/modules/workflow/core/WorkflowEngine.ts:22) 在 step 边界尽快停止。
   - 在**自动触发** + **非 dryRun** + **存在 range** 的情况下，进行**防御性状态补偿**：`last_extracted_floor = range[1]`，避免死循环。

### 1.4 代码改动点

- 新增配置字段：[`EntityExtractConfig.watchdogTimeoutMs`](src/config/types/memory.ts:22)
- 默认值：[`DEFAULT_ENTITY_CONFIG.watchdogTimeoutMs = 180_000`](src/config/types/defaults.ts:88)
- Watchdog 逻辑与补偿：[`EntityBuilder.extractFromChat()`](src/modules/memory/EntityExtractor.ts:198)

---

## 2. P0-2：手动提取 + UserReview confirm 后指针不更新

### 2.1 问题描述（来自审查）

- 位置：[`EntityConfigPanel.handleManualExtract()`](src/ui/views/processing/EntityConfigPanel.tsx:88) 触发手动提取；
- 链路：[`createEntityWorkflow()`](src/modules/workflow/definitions/EntityWorkflow.ts:13) 中存在 `UserReview` 与双 `SaveEntity`；
- 现象：审核确认后实体落库成功，但 `last_extracted_floor` 未前进，导致后续增量提取判断异常。

### 2.2 根因

- 指针更新使用 `floor`（单点）而不是 `range[1]`（范围末尾），在以范围提取/审核的链路中可能出现“不准确推进”。

### 2.3 修复策略

- 实体提取成功后更新 `last_extracted_floor` 时，使用 `finalFloor = range?.[1] ?? floor`。

### 2.4 代码改动点

- [`EntityBuilder.extractFromChat()`](src/modules/memory/EntityExtractor.ts:198)

---

## 3. P1：关键词召回候选爆炸（未受 TopK 限制）

### 3.1 问题描述（来自审查）

- 位置：[`KeywordRetrieveStep.execute()`](src/modules/workflow/steps/rag/KeywordRetrieveStep.ts:15)
- 现象：关键词扫描命中可能非常多（尤其词条/分词异常时），导致 `keywordCandidates` 过大，并传染到 [`RerankMergeStep.execute()`](src/modules/workflow/steps/rag/RerankMergeStep.ts:13)。

### 3.2 根因

- 关键词扫描结果未做 hard-limit。
- 合并阶段未进行二次截断。

### 3.3 修复策略

1. 在召回配置中新增 `keywordTopK`：
   - `events`：关键词命中的事件数量上限
   - `entities`：关键词命中的实体数量上限
2. 在关键词阶段对 `hitEntities`/`hitEvents` 直接 `slice(0, topK)`。
3. 在合并阶段二次 hard-limit，避免后续扩散。

### 3.4 代码改动点

- 配置新增：[`RecallConfig.keywordTopK`](src/config/types/rag.ts:85)
- 默认值：[`DEFAULT_RECALL_CONFIG.keywordTopK`](src/config/types/defaults.ts:64)
- 关键词阶段截断：[`KeywordRetrieveStep.execute()`](src/modules/workflow/steps/rag/KeywordRetrieveStep.ts:15)
- 合并阶段二次截断：[`RerankMergeStep.execute()`](src/modules/workflow/steps/rag/RerankMergeStep.ts:13)

> 注：关键词阶段还对测试/Mock DB 做了兼容性防御（不强依赖 Dexie Collection 的 `limit/count` API），避免单测被实现细节卡死。

---

## 4. P0：WorkflowEngine 错误日志 step 误报

### 4.1 问题描述（来自审查）

- 位置：[`WorkflowEngine.run()`](src/modules/workflow/core/WorkflowEngine.ts:22)
- 现象：异常 catch 中记录 step 使用 `stepsExecuted[stepsExecuted.length - 1]`，该值是“最后一个成功 step”，会误导排查。

### 4.2 修复策略

- 引入 `currentStepName` + 写入 `context.metadata.currentStep`，在 catch 中优先记录“正在执行的 step”。

### 4.3 代码改动点

- [`WorkflowEngine.run()`](src/modules/workflow/core/WorkflowEngine.ts:22)

---

## 5. 验证与回归

### 5.1 单元测试

- 运行：`pnpm run test`
- 结果：**8/8 文件通过，58/58 测试通过**

为适配关键词召回引入的新依赖，更新了测试 mock：
- [test/retrieval-workflow.test.ts](test/retrieval-workflow.test.ts) 补齐 `db.entities.toArray()` 与 event 的 `structured_kv` 字段，并更新 stepsExecuted 期望包含 `KeywordRetrieveStep`。

### 5.2 手工现场验证建议（在 SillyTavern 内）

1. **本地慢模型场景**：将实体提取模型切到明显慢的本地后端（或限速），观察超过 60s 时不再触发死循环，且日志出现“Watchdog 超时：已防御性推进 last_extracted_floor”。
2. **手动提取 + 审核确认**：点击实体提取“手动提取”，在 Review 面板确认后检查状态“上次提取楼层”应前进到当前楼层（range end）。
3. **关键词爆炸**：构造包含大量常见词/别名的输入，确认 Recall DevLog 中候选数量被 `keywordTopK.events` 限制，并且合并后候选也不会突破上限。

---

## 6. 变更清单（文件级）

- [`src/modules/memory/EntityExtractor.ts`](src/modules/memory/EntityExtractor.ts)
- [`src/config/types/memory.ts`](src/config/types/memory.ts)
- [`src/config/types/defaults.ts`](src/config/types/defaults.ts)
- [`src/config/types/rag.ts`](src/config/types/rag.ts)
- [`src/modules/workflow/steps/rag/KeywordRetrieveStep.ts`](src/modules/workflow/steps/rag/KeywordRetrieveStep.ts)
- [`src/modules/workflow/steps/rag/RerankMergeStep.ts`](src/modules/workflow/steps/rag/RerankMergeStep.ts)
- [`src/modules/workflow/core/WorkflowEngine.ts`](src/modules/workflow/core/WorkflowEngine.ts)
- [`test/retrieval-workflow.test.ts`](test/retrieval-workflow.test.ts)

---

## 7. P2/P3：补充修复说明

### 7.1 P2：类脑缓存实体/事件配额拆分（避免实体挤占事件）

- 问题：类脑缓存工作记忆选取来自同一个池子，实体候选在某些场景下会把事件全部挤出。
- 修复：在 [`BrainRecallCache.selectWorkingMemory()`](src/modules/rag/retrieval/BrainRecallCache.ts:271) 中按 `category` 分配额选取：
  - `eventWorkingLimit?: number`
  - `entityWorkingLimit?: number`
  - 合并后若未达到 `workingLimit`，会从全池按分数兜底补齐，保持“填满优先”。

配置位置：[`BrainRecallConfig`](src/config/types/rag.ts:45)

### 7.2 P3：关键词命中实体保送权边界（引入衰减约束）

- 问题：关键词命中实体存在“强制保送”逻辑，导致其可长期霸榜。
- 修复：在 [`BrainRecallStep.execute()`](src/modules/workflow/steps/rag/BrainRecallStep.ts:15) 调整 `_recallWeight`：
  - 若类脑选入（`brainSlot` 存在）：使用 `brainSlot.finalScore`（随衰减变化）。
  - 若未选入：使用 `clamp(floor=0.35, max=0.9)` 的保底权重，而不是无上限保送。

### 7.3 验证

- `pnpm run test`：**58/58 全绿**（其中 `BrainRecallCache` 单测覆盖 workingLimit 语义，已验证不破坏旧行为）。

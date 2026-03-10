# Implementation Plan: Agentic RAG Macros

## 目标与背景
为了支撑 Agentic RAG 系统通过 LLM 进行精准的 ID 召回和 Decay 决策，我们需要向触发检索时的 Prompt 中注入两套数据：
1. **`{{engramIndex}}`**：全量字典索引。用于检索阶段，告诉 LLM 当前内存里都有什么（包括纯净的活跃记忆和高度压缩的绿灯归档）。
2. **`{{engramActiveEvents}}`**：纯净蓝灯阵列。用于聊天输入前处理以及触发判决，此宏**绝不包含**任何历史 RAG 召回进来的绿灯事件，防止污染判断基准。

## 核心定位：预处理流程中的“外挂判决器”
在明确改动代码前，必须先厘清 Agentic RAG 在项目中的架构地位。
它**不是**预处理本身，**而是预处理流程中的一个工具环节**。
在 `Injector.ts` 监听到的生成打断点中，其运作顺序为：
1. **触发预处理**：大模型接收包含 `{{engramIndex}}` 和 `{{engramActiveEvents}}` 的专属提示词。
2. **正确性验收与触发**：系统调用 `RobustJsonParser` 检查 AI 输出。只要预处理大模型输出的 JSON 格式正确且包含了有效的 `{"recalls": ["..."]}` 数组，即代表“裁判判决有效并打出指令”。
3. **精准打击 (RAG 执行)**：带着这批 ID，触发底层的 `Retriever.agenticSearch`，绕开传统算力海选，精准召回，最终拼接到 prompt 供聊天主模型（扮演用）消费。

通过这个定位，我们确保了预处理只负责“算”，提取有效的工具输出，然后再触发底层的“捞”。

---

## 拟修改/新增模块

### 1. 扩展 EventSlice (`src/state/memory/slices/eventSlice.ts`)

为了同时服务于这两种全新的宏，我们不再向原有函数打补丁，而是新增两个专门供给 Agentic RAG 架构使用的导出组装函数（从 Zustand 状态源直接拉取最新鲜数据）。

#### 新增函数：`getAgenticIndex()`
- **功能**：组装触发 RAG 检索时所需的双层字典目录大纲。
- **逻辑**：
  1. 获取所有 `events`，过滤出等级 >=0 的所有有效事件。
  2. 构造 `<active_memory>` 块：过滤 `is_archived === false`。仅保留 `id`, `event`, `role`, `score_status` (当前 `significance_score`) 等少量用于研判的字段。
  3. 构造 `<archived_summary>` 块：过滤 `is_archived === true`。保留 `id`, `event`, `location`, `role`, `causality` 字段。为了极客般的 Token 节约，不要输出 `summary` 长文段。
  4. 最终以 `<agentic_index>` XML 格式将其拼装在一起并返回。

#### 新增函数：`getPureActiveEvents()`
- **功能**：只组装干净的、当前未衰变的蓝灯事件。用于作为主线剧情连贯性保障的 `{{engramActiveEvents}}`。
- **逻辑**：
  1. 取得所有 `is_archived === false` 的事件。
  2. （关键）无论这些事件的 `is_embedded` 或其他标志如何，由于未被手动归档，全量按结构返回详尽摘要（包含完整的 `summary` 内容以供直接送入生成前文）。

---

### 2. 注册全新宏 (`src/integrations/tavern/prompt/macros.ts`)

在 `MacroService.init()` 中增加这两个新宏的通道，彻底打通前端的触发访问链路：

#### 注册 `{{engramIndex}}`
- **宏路径**：对接新加的缓存变量 `MacroService.cachedAgenticIndex`。
- **更新时机**：它需要在每次触发 RAG 检索之前保证被刷到最新。

#### 注册 `{{engramActiveEvents}}`
- **宏路径**：对接新加的缓存变量 `MacroService.cachedPureActiveEvents`。
- **替换策略**：在酒馆前端预处理、或是发消息请求总结时动态替换。

---

### 3. Workflow Context 适配 (`src/modules/workflow/steps/context/FetchContext.ts`)

在流程流 `FetchContext` 执行时，除了抓取原有的旧账本外：
1. 从 `MacroService` 取出新缓存 `getAgenticIndex()`，挂载到 `context.input.engramIndex`（供给接下来的 RAG 打分管道用）。
2. 取出新缓存 `getPureActiveEvents()`，挂载到 `context.input.engramActiveEvents`。

### 4. JSON 解析器链路接入 (Phase 2)
Agentic RAG 的 LLM 会输出带有特定 XML 以及 JSON 包裹块的内容，例如：
<recall_decision>
```json
{
  "recalls": [
    {
      "id": "evt_a1c3b5",
      "score": 0.80,
      "reason": "虽然换了谈话点，但依然在讨论罗兰的阴谋"
    },
    {
      "id": "evt_f9e2d1",
      "score": 0.95,
      "reason": "玩家提到了当年下水道的旧事"
    }
  ]
}
```
</recall_decision>
我们需要让后端的 `ExtractTags.ts` 和 `Preprocessor.ts` 支持此格式的捕捉：
1. 首先使用正则匹配剥离外层包裹的 XML 标签（如 `<recall_decision>`）。
2. 调用专用的 `RobustJsonParser.parse(content)` 锁定内部的 JSON 对象。
3. 将解析取得的 `recalls` 数组内容连同 `score` 和 `reason`，通过 Context 安全传递给接下来的检索阶段。

### 5. ID 直通检索与类脑处理 (Phase 3)
原有的 `Retriever.ts` 主要是对 Embedding 向量和 Rerank 模型服务，我们需要增加基于 ID 直接命中的 `agenticSearch(recalls: AgenticRecall[])` 直通管道：
1. **数据库底层提货**：根据大模型返回的 ID 数组提取事件记录。
2. **构建虚假打分交由类脑**：为命中的记录，直接套用预处理大模型给它钦定的 `score`，将它们包装为传统的 `RecallCandidate` 塞入 `BrainRecallCache.process(candidates)` 执行类脑处理和重排序！

---

## 6. 废弃原有的混乱逻辑防线
之前 `{{engramSummaries}}` 因为背负了“携带旧摘要+掺杂召回来的绿灯条目”的双重历史包袱，在 Agentic RAG 下容易造成判断基准重影。
- **新做法**：新版聊天预设卡与系统自带的提取模型将**全面改用** `{{engramActiveEvents}}` 作为短时记忆的核心参考点，把 RAG 召回（绿灯条目）剥离出来走独立的 RAG 解析通道送给底层，防止记忆交叉衰变带来的误判。

请哥哥审核此补全版的实施方案，如果没有异议，我将立刻推进 Phase 1 修改字典组装器！

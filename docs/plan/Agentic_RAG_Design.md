# Engram Agentic RAG (主动查阅式召回) 架构设计方案

> 本方案旨在打破传统基于相似度计算（Embedding）盲目匹配的历史包袱，充分利用现代大模型强大的“推理意图与精准溯源”能力。

## 1. 痛点：为什么需要 Agentic RAG？

传统的 RAG 依赖词义相似度。如果玩家说了一句“嗯，我记着呢”，由于缺乏具象词汇，无论 Embedding 还是 Rerank 都极易跑偏或罢工。
而 **Agentic RAG** 让大模型承担“图书管理员”的角色：在真正回答玩家之前，大模型会阅读一份涵盖所有历史档案的【轻量级目录】（Lightweight Index），然后以严格的指令输出它想要借阅的卷宗（ID）。系统拿到 ID 后**直通底层数据库，跳过相似度检索**，将原始档案调出呈现。

---

## 2. 数据库与目录生成 (Lightweight Index)

> **天才构想：直接收编与复用现有的旧宏**
我们完全不需要再去新发明一个宏！利用现有系统中已被闲置的 `{{engramArchivedSummaries}}` 进行大幅格式改写即可！

### 2.1 数据降维结构与宏矩阵重构 (Macro Sub-system)
为了让大语言模型拥有最完美的视阈，消除重叠并赋予裁判权限，我们将扩编/改写现有的宏阵列：

1.  **新增纯净蓝灯专线 `{{engramActiveEvents}}`**:
    -   原本的 `{{engramSummaries}}` 因为混合了蓝灯（目前正发生）和刚被召回的绿灯（历史），会导致一定的内容繁杂。
    -   我们要**直接搞一个专门的不带绿灯的纯蓝灯条目宏**。玩家可以在酒馆的主 Prompt 中使用这个新宏作为事实基石，纯净且永不重叠。

2.  **绿灯档案室双层分装 (`{{engramArchivedSummaries}}`)**:
    -   将已被归档的历史记录全部赋给极简的 XML，并**分为两层给 Agent 裁判量刑**：
    -   **顶层 `active` (活跃区)**: 映射出当前正存活在类脑缓存 (`BrainRecallCache`) 中的短期工作记忆（标识如 `A-01`）。模型看完后，如果觉得剧情依旧相关可以继续给分“保活”；如果不相关直接忽略即可淘汰。
    -   **底层 `archived` (待打捞区)**: 沉睡的无尽绿灯记录，等待被按需唤醒（标识如 `E-01`）。

    ```xml
    <agentic_index>
      <active_memory>
        <record id="evt_a1c3b5" event="与罗兰在酒馆争论" role="罗兰" score_status="0.88"/>
      </active_memory>
      <archived_summary>
        <record id="evt_f9e2d1" event="发现鸢尾花徽章" location="王都下水道" role="罗兰" causality="揭开内幕"/>
        <record id="evt_b4a8c9" event="暗杀者袭来" location="城郊森林" role="黑衣人, 主角" causality="主角负伤"/>
      </archived_summary>
    </agentic_index>
    ```


---

## 3. 高强结构化提取指令 (JSON Array)

为了获得完美的代码复用并与现存的总结指令看齐，大模型的呈现大纲 (`{{engramArchivedSummaries}}` 与 `{{engramActiveEvents}}`) 依然保持高效密集的 XML 阅读流布置，但**最终决策提取输出将被强制规范为 JSON 格式**。这将直接复用系统中异常健壮的 `RobustJsonParser.parse()`，从此告别一切脏正则清洗。

### 3.1 `agentic_recall.yaml` 提示词设计
要求大模型不仅输出目标真实短 ID，还必须附带 `reason` (提取缘由)，以激发模型的 Chain-of-Thought (思维链) 推理。同时，直接赋予模型下达 `score` 的权力。

```xml
【系统指令】
...（省略前提：要求判断要唤醒哪些 [ID]）...

【提取与淘汰法则】
对 `<active_memory>` 的条目，若它对当前剧情依然重要，请你再次提取它并给予较高 score 进行保活；若当前剧情已经大回转，请完全无视旧有条目。
对 `<archived_summary>` 的条目，调取你认为需要补充背景的卷宗。

【输出格式 - 绝对遵循】
不管你在 <think> 中进行了多少思考，你最终选择的卷宗都必须完全遵循如下 JSON 格式输出。请为你召回的条目赋予 0.0 到 1.0 的重要性打分 (score)。
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

### 3.2 管道流截获 (`ExtractTags.ts` 重制)
在 Workflow 执行完推论后：
1.  直接使用 `const data = RobustJsonParser.parse(llmOutput)`。
2.  拉取 `data.recalls` 里的 `id`（例如 `evt_f9e2d1`）和 `score`，准备直接交接给大盘，连还原表都不需要查！

---

## 4. 直通召回专线与权重并轨 (Retriever.ts)

有了真实的查验记录号以及大模型的打分后，这是将它们激活送入类脑缓存的关键步骤：
-   **直连查卷**：增加代码逻辑调用 `agenticSearch` 直通检索主程序。
-   **降维打击**：通过 ID 数组原生跳过复杂的欧式求点。
-   **伪装者的融入 (Fake Embedding/Rerank)**：这批由 LLM 高度智力挑选的“天选用卷”，将**直接挪用由 LLM 输出的那个 `<target score="0.95">`**。我们将这个分值同时填入对象的 `embeddingScore` 和 `rerankScore` 槽位中。
-   **自然淘汰的真理**：通过借壳打分，提取为 `candidates` 平顺地灌入 `BrainRecallCache.process(candidates)`！随后的岁月里，只要由于重要性不足没被后续继续召唤，这批大模型召唤的分数也会通过缓存规则自己逐轮衰退掉（decayScore），实现了哥哥期望的“优胜劣汰、越召回越细节”的目标。

## 5. 总结流程全景图 (Data Flow)
`SillyTavern Trigger`
➜ `Injector` 发起
➜ `FetchContext` (编织 evt_xxxx 目录，不再做任何多余映射记录)
➜ `BuildPrompt` (将目录送给检阅模型)
➜ `ExtractTags` (使用 JsonParser.ts 一键解析 recalls)
➜ `Retriever` (无视向量距离打分，保送直签，并过类脑触发隐性 Decay)
➜ `Prompt 结束，将战利品交回给酒馆上下文!`

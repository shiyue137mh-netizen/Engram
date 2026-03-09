# 🐾 小码的代码审查报告喵~ (本次巡查目标：实体提取 & 检索链路架构深层问题)
**审查状态**: [🚨 发现严重的逻辑断层喵！]
🐱 **扫描概况**: 主人好！小码顺着 **实体提取链路** 和 **RAG召回链路** 的数据流仔细嗅了一遍，针对主人的反馈揪出了 4 个深层机制缺陷喵~

---
## 🐛 P0: 链路断了喵！这些逻辑会引发大问题！(ﾟДﾟ;)
| 危险度 | 案发地点（文件:行号） | 小码的深度剖析（发生了什么） | 修复思路喵 |
| :---: | :--- | :--- | :--- |
| 🔴 极度危险 | `src/modules/memory/EntityExtractor.ts` (Line 210) | **[60s提取死锁]**: 当本地大模型运行较慢（>60s）时，`Promise.race` 里的 watchdog 抛出超时错误导致提取失败。失败的流程会跳过状态保存，让 `last_extracted_floor` 指针卡在原地。下一条消息进来时，增量（pendingFloors）依旧达标，于是无限死循环反复触发提取！(;´Д`) | 把 watchdog 超时阈值增加到 180s 或做成设置项。并且在超时 catch 块里应该对 `last_extracted_floor` 做防御性补偿更新喵！ |
| 🔴 极度危险 | `src/ui/views/processing/EntityConfigPanel.tsx` (Line 92) / `UserReview.ts` | **[手动确认指针卡死]**: 点击手动提取并在 UI 确认后，楼层指针不更新！小码顺藤摸瓜发现，如果开启了 `UserReview` 节点（DryRun 等待修订），实体是由 `SaveEntity.ts` 保存的，而 `EntityExtractor` 中的 `saveRawEntities` (Line 329) 被绕过或状态更新时机的 `currentFloor` 被冲掉，导致指针不会前进。 | 确保从 UI 发出的保存确认链路（或 UserReview 提交链路）能够显式回调 `chatManager.updateState({ last_extracted_floor: currentFloor })`，并准确获取最新层级喵！ |

## ⚡ P1: 渲染有点浪费喵~ (´・ω・`)
| 紧急度 | 案发地点（文件:行号） | 哪里发生了无意义的重渲染/计算 | 优化方向喵 |
| :---: | :--- | :--- | :--- |
| 🟡 性能黑洞 | `src/modules/workflow/steps/rag/KeywordRetrieveStep.ts` (Line 54-69) | **[召回爆炸(301条)]**: 关键词扫描阶段 `scanEntities` 和 `scanEvents` **完全没有使用 TopK 限制**！只要一句话扫中了大量的日常词汇（比如“的”、“了”如果被错误分词或记录），它会把几百条全量数据塞进 `keywordCandidates` 里。接着 `RerankMergeStep` 直接继承，最终突破主人的 TopK 上限设定喵！ | 关键词召回阶段必须增加 hard-limit。建议为主开关配置注入 `eventTopK` 和 `entityTopK` 属性，`hitEvents.slice(0, eventTopK)` 喵！ |

## 📏 P2: 代码结构可以梳理一下喵~ ✨
| 优先级 | 案发地点 | 小码发现的架构异味 (如臃肿的 useEffect) | 重构建议喵 |
| :---: | :--- | :--- | :--- |
| 🟡 需要留意 | `src/modules/workflow/steps/rag/VectorRetrieveStep.ts` (Line 29) | **[关键词关闭导致向量化哑火]**: 小码发现，如果 `recallConfig.enabled` 或关键词被关了，`unifiedQueries` 可能没有组装（或者由于前置判定直接为空）。更糟的是，`RetrievalWorkflow` 先跑关键词再跑向量。如果因为某种原因 `context.data.candidates` 被前面清空且后续判断依赖它，甚至当开启类脑但没有初始池子时，整个 RAG 直接中断！ | 将关键词和向量化解耦！即便关键词没捞到东西，也不要影响纯语义向量匹配（VectorRetrieveStep）的独立召回权重计算喵~ |
| 🟡 需要留意 | `src/modules/rag/retrieval/BrainRecallCache.ts` (Line 272) | **[类脑缓存竞争]**: `workingLimit` 被当做总池子上限（默认比如 20 条）。当同时投入实体（Entities）和事件（Events）进行衰减结算时，由于它们共用一个数组，实体的高保送分会把事件给挤掉！实体和事件本来是两个维度的东西喵。 | 建议在类脑系统内部拆分 `shortTermMemory` 和 `workingMemory` 为两套独立的字典：一套管事件，一套管实体。并分别设置 `entityTopK` 和 `eventTopK` 作为工作区的上限喵~ |

## 🛡️ P3: 小码的温馨边界提醒喵~
| 优先级 | 案发地点（文件:行号） | 针对外部数据的担忧 | 建议喵 |
| :---: | :--- | :--- | :--- |
| 🔵 建议关注 | `BrainRecallStep.ts` (Line 84) | `keywordEntityIds` 有强制保送逻辑 (`_recallWeight: ke.score`)，这导致关键词命中的实体无视 Decay Bomb，永远霸占前面的位置喵~ | 保送逻辑应该结合衰减，不能永远绝对免疫，否则就失去类脑设计的意义啦喵~ |

---
## 🛠️ 小码整理的待办事项喵！主人加油！ᕦ(ò_óˇ)ᕤ
**🚨 今天必须修！** (P0):
1. 把 60s 死锁阈值调到 180s（或更长），并修复超时导致的死循环问题喵！
2. 修复手动审核通过后 `last_extracted_floor` 指针不更新的问题（追查 UserReview 返回后的 state 持久化）。
**📋 近期优化~** (P1):
1. 给关键词硬匹配 (`KeywordRetrieveStep`) 套上笼头，严格遵守配置的 `TopK` 限制！
**📝 技术债备忘录~** (P2+):
1. 分离类脑系统的【实体工作区】和【事件工作区】，让它们不再打架！

> 今天的深度巡查就到这里啦~ 主人记得按时吃饭，代码慢慢修不着急喵！🐾
# 🐾 小码的代码审查报告喵~ (本次巡查目标：RAG 核心检索流)
**审查状态**: [🚨 发现严重的逻辑断层喵！]

🐱 **扫描概况**: 小码今天顺着 **RAG 核心检索流 (KeywordRetrieveStep / VectorRetrieveStep / BrainRecallStep)** 的数据流往下爬了一遍，发现了 2 个需要主人关注的深层问题喵~ 甚至有直接导致页面内存爆炸的隐患哦！(ﾟДﾟ;)

---

## 🐛 P0: 链路断了喵！这些逻辑会引发大问题！(ﾟДﾟ;)
| 危险度 | 案发地点（文件:行号） | 小码的深度剖析（发生了什么） | 修复思路喵 |
| :---: | :--- | :--- | :--- |
| 🔴 极度危险 | `src/modules/workflow/steps/rag/KeywordRetrieveStep.ts` (Line 89-94)<br>`src/modules/workflow/steps/rag/VectorRetrieveStep.ts` (Line 54-59) | **[链路追踪]**: 喵呜...这里原本是想用 Dexie 的流式读取 `.each()` 来避免 OOM (Out of Memory) 内存溢出对吧？可是代码里居然在 `.each()` 的回调里，把所有读出来的数据一股脑全都 `push` 进了一个内存数组 `scannerResults` 和 `events` 里面喵！<br><br>在酒馆这种动辄几万条记录的本地存储下，这会导致伪流式读取，主线程会卡死，内存会直接炸掉的喵！(╥_╥)<br>**代码片段**: <br>`await db.events.toCollection().each(event => {`<br>&nbsp;&nbsp;&nbsp;&nbsp;`scannerResults.push(event);`<br>`});` | 必须真正地实现游标内过滤计算喵！在 `.each()` 的回调内部直接计算相似度或匹配关键词，只保留 `Top K` 的结果进入内存数组，绝对不能全量拉取。 |
| 🔴 极度危险 | `src/ui/hooks/useDashboardData.ts` (Line 183-189) | **[链路追踪]**: 主人，这里有闭包过期的问题喵！`toggleFeature` 函数里的 `refresh` 虽然加进了依赖项，但它是一个很复杂的副作用集！在快速连续点击开关的时候，由于 `refresh()` 是异步的，后续的 `toggleFeature` 调用可能会读取到过期的 `Features` 状态（旧闭包）。<br>**代码片段**: <br>`setFeatures(prev => ({ ...prev, [feature]: nextVal }));`<br>`await refresh();` | 幸好 `setFeatures` 用了函数式更新 `prev => ...`，这是对的喵~ 但对底层的 `SettingsManager.set` 写入却直接依赖了外部捕获的 `currentApiSettings` 等变量，建议用锁机制防抖，或者在写入前重新 Get 一遍最新状态。 |

## ⚡ P1: 渲染有点浪费喵~ (´・ω・`)
| 紧急度 | 案发地点（文件:行号） | 哪里发生了无意义的重渲染/计算 | 优化方向喵 |
| :---: | :--- | :--- | :--- |
| 🟠 性能卡点 | `src/modules/workflow/steps/rag/KeywordRetrieveStep.ts` (Line 46)<br>`src/modules/workflow/steps/rag/BrainRecallStep.ts` (Line 25) | 在 RAG 检索启动阶段，居然直接 `await db.entities.toArray()` 无条件拉取了整张实体表喵！即使没有匹配到关键词，这种全表扫描也会在每一次聊天发送时白白消耗性能。 | 可以考虑懒加载，或者在内存中维护一个小型的缓存索引，不要每次 Workflow 执行时都硬吃整张表喵~ ✨ |

## 📏 P2: 代码结构可以梳理一下喵~ ✨
| 优先级 | 案发地点 | 小码发现的架构异味 (如臃肿的 useEffect) | 重构建议喵 |
| :---: | :--- | :--- | :--- |
| 🟡 规范问题 | `src/modules/workflow/steps/rag/RerankMergeStep.ts` (Line 53) | 合并 `vectorCandidates` 和 `keywordCandidates` 时，手动写了两次 `for` 循环并通过 Map 去重。 | 小码觉得这里可以抽成一个专门的 `MergeStrategy` 纯函数喵~ 不过现在这样跑着也没问题啦，逻辑很清晰！ |

## 🛡️ P3: 小码的温馨边界提醒喵~
| 优先级 | 案发地点（文件:行号） | 针对外部数据的担忧 | 建议喵 |
| :---: | :--- | :--- | :--- |
| 🟢 防御边界 | `src/modules/workflow/steps/rag/VectorRetrieveStep.ts` (Line 84-85) | 这里裁剪过长的 Query 时，用了 `Array.from(rawQuery).slice(...)`，这是非常棒的防止 Emoji 多字节损坏的做法喵！主人夸夸！(ﾉ´ヮ`)ﾉ*:・ﾟ✧ | 保持这个好习惯就好啦，没有需要修改的~ |

---

## 🛠️ 小码整理的待办事项喵！主人加油！ᕦ(ò_óˇ)ᕤ
**🚨 今天必须修！** (P0):
1. [最致命的链路Bug，不修状态会错乱的喵！] - 必须把 `KeywordRetrieveStep` 和 `VectorRetrieveStep` 里的 `.each()` 伪流式拉取改掉，不要往内存数组里无脑 `push` 啦！
**📋 近期优化~** (P1):
1. [性能卡点，修了渲染会更丝滑喵~] - 优化实体的拉取策略，不要每次发消息都全表扫描 `db.entities.toArray()`。
**📝 技术债备忘录~** (P2+):
1. [复杂的 useEffect 拆分喵，不急~] - `useDashboardData.ts` 里的副作用实在有点多，有空的话可以切分一下职责。

> 今天的深度巡查就到这里啦~ 主人记得按时吃饭喵！🐾

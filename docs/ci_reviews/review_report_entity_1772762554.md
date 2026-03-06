# 🐾 小码的代码审查报告喵~ (本次巡查目标：记忆实体提取器 EntityBuilder)
**审查状态**: 🚨 发现严重的逻辑断层喵！
🐱 **扫描概况**: 小码今天顺着 **从酒馆消息到知识图谱** 的数据流往下爬了一遍，发现了 3 个需要主人关注的深层问题喵~

---
## 🐛 P0: 链路断了喵！这些逻辑会引发大问题！(ﾟДﾟ;)
| 危险度 | 案发地点（文件:行号） | 小码的深度剖析（发生了什么） | 修复思路喵 |
| :---: | :--- | :--- | :--- |
| 🔴 极度危险 | `src/modules/memory/EntityExtractor.ts` (Line 140-155) | **[链路追踪]**: `shouldTriggerOnFloor` 是用来判断是否该启动自动提取的。这里居然写了 `pendingFloors = currentFloor - lastExtractedFloor`。如果主用户在酒馆（Tavern）里不小心删除了几条消息，导致 `currentFloor` 变小（甚至小于 `lastExtractedFloor`），这个差值就永远是负数啦！(>_<) 这意味着以后的消息全部会被静默忽略，实体图谱再也不会自动更新喵！<br>**代码片段**: `return pendingFloors >= this.config.floorInterval;` | 只要发现 `currentFloor < lastExtractedFloor`，就说明用户触发了“回溯/删除”操作，这时候必须强制更新 `lastExtractedFloor = currentFloor`，重新对齐时间线喵~ |

## ⚡ P1: 渲染有点浪费喵~ (´・ω・`)
| 紧急度 | 案发地点（文件:行号） | 哪里发生了无意义的重渲染/计算 | 优化方向喵 |
| :---: | :--- | :--- | :--- |
| 🟡 性能卡点 | `src/modules/memory/EntityExtractor.ts` (Line 101-115) | **[链路追踪]**: 在 `handleMessageReceived` 方法里，只要来一条消息（比如生成一个词），就会跑一次 `await import('@/data/ChatManager')` 和 `await import('@/integrations/tavern')`！(ﾟДﾟ;) 即使没触发提取，每次都要跑这个 Promise 的微任务。如果在批处理或者快速聊天时，这个性能开销就像漏水一样哗哗的喵~ | 动态导入虽然能防循环依赖，但最好在第一次导入后就把实例缓存在全局变量里（比如 `let _chatManager = null`），或者放到 class 属性里，以后直接拿缓存用喵~ |

## 📏 P2: 代码结构可以梳理一下喵~ ✨
| 优先级 | 案发地点 | 小码发现的架构异味 (如臃肿的 useEffect) | 重构建议喵 |
| :---: | :--- | :--- | :--- |
| 🔵 架构异味 | `src/modules/memory/EntityExtractor.ts` (Line 160-250) | **[链路追踪]**: `extractFromChat` 里面放了一个 `this.isExtracting = true` 做简单互斥锁，想法挺好，但是下面调用的 `WorkflowEngine.run()` 并没有给超时中断的机制（AbortController）。万一底层 LLM 卡住了，也没有重试机制，整个类的实例就会永远卡在 `isExtracting === true` 的状态里出不来了，变成一块“死肉”喵~ | 在这里传一个带 timeout 的 `signal` 参数下去，或者自己实现一个最长 N 秒后强行释放 `isExtracting` 的看门狗（Watchdog）喵！ |

## 🛡️ P3: 小码的温馨边界提醒喵~
| 优先级 | 案发地点（文件:行号） | 针对外部数据的担忧 | 建议喵 |
| :---: | :--- | :--- | :--- |
| 🟢 防御性编程 | `src/modules/memory/EntityExtractor.ts` (Line 250) | **[链路追踪]**: `extractFromChat` 返回 `success: false` 的时候，虽然 catch 住了，却没有恢复/重试的补偿链路喵。 | 如果是因为并发被锁住就算了，但如果是真错，建议抛个事件出去通知外部，不要只在控制台打个 log 就不管啦~ |

---
## 🛠️ 小码整理的待办事项喵！主人加油！ᕦ(ò_óˇ)ᕤ
**🚨 今天必须修！** (P0):
1. 处理因为酒馆删消息导致的负数楼层 Bug，不修图谱就不涨了喵！
**📋 近期优化~** (P1):
1. 把动态 `import` 加上缓存，微任务积少成多也是很恐怖的喵~
**📝 技术债备忘录~** (P2+):
1. 给提取锁加上超时释放机制，防卡死喵！

> 今天的深度巡查就到这里啦~ 主人记得按时吃饭喵！🐾
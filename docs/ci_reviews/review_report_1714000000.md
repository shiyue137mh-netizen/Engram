# 🐾 小码的代码审查报告喵~ (本次巡查目标：实体提取模块链路 EntityExtractor.ts)
**审查状态**: [🚨 发现严重的逻辑断层喵！]
🐱 **扫描概况**: 小码今天顺着 **实体提取触发与范围计算链路** 的数据流往下爬了一遍，发现了 2 个需要主人关注的深层问题喵~


---
## 🐛 P0: 链路断了喵！这些逻辑会引发大问题！(ﾟДﾟ;)
| 危险度 | 案发地点（文件:行号） | 小码的深度剖析（发生了什么） | 修复思路喵 |
| :---: | :--- | :--- | :--- |
| 🔴 极度危险 | `src/modules/memory/EntityExtractor.ts` (Line 101-112) | **[链路追踪]**: 当自动触发提取 (`handleMessageReceived`) 时，计算范围直接使用了 `lastSummarized + 1` 作为 `startFloor`。如果主人在酒馆中删除了大段历史消息（引发严重的楼层回溯），导致当前的 `currentFloor` 小于 `lastSummarized`，这里的 `startFloor` 就会大于 `currentFloor` 喵！(´Д｀)<br><br>在这个链路里，小码发现 `extractManual`（Line 314）里有乖乖加上 `if (startFloor > currentFloor)` 的保护伞，但是自动触发的这个地方**漏掉了**！这会把一个倒置的 `range` 数组丢给底层 `MacroService`，引发致命的拉取报错喵！<br>**代码片段**: <br>`let startFloor = lastSummarized + 1;`<br>`if (currentFloor - startFloor > 50) { startFloor = currentFloor - 49; }`<br>`const range: [number, number] = [startFloor, currentFloor];` (没有检查 startFloor 是否超出 currentFloor！) | 赶紧把 `extractManual` 里面的保护逻辑抄过来喵！在组装 `range` 前确保 `if (startFloor > currentFloor) startFloor = currentFloor;` |

## ⚡ P1: 渲染有点浪费喵~ (´・ω・`)
*（小码在这条链路上没发现明显的渲染性能问题喵！主人棒棒哒~ ✨）*

## 📏 P2: 代码结构可以梳理一下喵~ ✨
| 优先级 | 案发地点 | 小码发现的架构异味 (如臃肿的 useEffect) | 重构建议喵 |
| :---: | :--- | :--- | :--- |
| 🟡 需要留意 | `src/modules/memory/EntityExtractor.ts` (Line 144-147) | `shouldTriggerOnFloor` 是一个纯粹用来做“是否触发判断”的谓词函数喵~ 但是它竟然偷偷做了**副作用（Side-effects）**！在判断出回溯 (`pendingFloors < 0`) 时，它直接在里面调用了 `chatManager.updateState` 去覆盖数据字典喵！(・_・ヾ<br><br>这样做会让调用者（上层链路）很难预测状态何时被修改，也不利于排查 bug 呢。 | 状态的回滚修复操作不应该放在 `should` 函数里喵~ 建议将状态重置逻辑移动到 `handleMessageReceived` 这个调用方里面去做，`shouldTriggerOnFloor` 只乖乖返回 `false` 就好了喵！ |

## 🛡️ P3: 小码的温馨边界提醒喵~
*（外部依赖处理得很好喵，状态都有 try-catch，没有明显异常哦~）*

---
## 🛠️ 小码整理的待办事项喵！主人加油！ᕦ(ò_óˇ)ᕤ
**🚨 今天必须修！** (P0):
1. [赶紧给自动触发加上 startFloor > currentFloor 的反倒挂保护喵！不然删回车会导致提取炸掉的！]
**📋 近期优化~** (P1):
*目前没有性能阻碍喵~*
**📝 技术债备忘录~** (P2+):
1. [把 shouldTriggerOnFloor 里面的 updateState 拿出来，让判断函数保持干净喵~]

> 今天的深度巡查就到这里啦~ 主人记得按时吃饭喵！🐾
# 🐾 小码的代码审查报告喵~ (本次巡查目标：Dashboard 模块与数据流)
**审查状态**: 🚨 发现严重的逻辑断层喵！
🐱 **扫描概况**: 小码今天顺着 **[Dashboard 主面板与 useDashboardData 状态源]** 的数据流往下爬了一遍，发现了 3 个需要主人关注的深层问题喵~
---
## 🐛 P0: 链路断了喵！这些逻辑会引发大问题！(ﾟДﾟ;)
| 危险度 | 案发地点（文件:行号） | 小码的深度剖析（发生了什么） | 修复思路喵 |
| :---: | :--- | :--- | :--- |
| 🔴 极度危险 | `src/ui/hooks/useDashboardData.ts` (Line 247) | **[闭包陷阱与过期状态]**: 在 `handleVisibilityChange` 中，当页面重新获得焦点时调用了 `refresh()`。但由于所在的 `useEffect` 依赖项只写了 `[refreshInterval]`，这里捕获的是首次渲染时的 `refresh` 闭包（Stale Closure）！这会导致读取到旧的 State（如旧的 `isMounted` 或 `lastDbModified`），引发状态同步断层喵！<br>**代码片段**: `if (isTabActive) { refresh(); }` | 把这里的 `refresh()` 换成主人特意准备好的 `refreshRef.current()` 喵！这样就能永远拿到最新鲜的函数啦~ |
| 🔴 极度危险 | `src/ui/hooks/useDashboardData.ts` (Line 206) | **[异步竞态与卸载冲突]**: 在 `toggleFeature` 处理 `preprocessing` 开关时，主人用 `import().then(...)` 异步更新了 `apiSettings`。但是！紧随其后的 `refresh()` 是同步执行的！这会导致 `refresh()` 执行时拿不到最新的配置，UI 状态和底层配置出现时间差脱节喵~ | 把异步的更新逻辑 `await` 掉，或者在 `then` 的回调里再去触发特定状态的 `refresh()` 喵！ |

## ⚡ P1: 渲染有点浪费喵~ (´・ω・`)
| 紧急度 | 案发地点（文件:行号） | 哪里发生了无意义的重渲染/计算 | 优化方向喵 |
| :---: | :--- | :--- | :--- |
| 🟠 性能警告 | `src/ui/hooks/useDashboardData.ts` (Line 114) | **[昂贵的渲染期计算]**: 为了统计事件和实体数量，这里竟然直接用了 `await getAllEvents()` 拿取全量数据进内存再做 `reduce` 算 Token！如果用户的记忆库有上万条记录，这段逻辑会直接撑爆 JS Heap 导致浏览器卡死喵 (´；ω；`) | 请用 IndexedDB 的 `.count()` 来获取总数，对于 Token 的估算可以改成增量缓存，千万不要在循环里查全表喵~ |
| 🟠 性能警告 | `src/ui/views/dashboard/index.tsx` (Line 54) | **[高频事件未节流]**: 主人在 `useEffect` 里订阅了 `Logger.subscribe` 并在回调中直接 `setLogs`。如果后台正在进行批量 RAG 处理，海量的日志会以毫秒级的频率触发 State 更新，导致整个庞大的 `Dashboard` 组件陷入疯狂的级联重渲染喵！ | 给 `Logger.subscribe` 的回调加上 `throttle` (节流) 喵，比如每 500ms 收集一批日志再统一更新 State~ |

## 📏 P2: 代码结构可以梳理一下喵~ ✨
| 优先级 | 案发地点 | 小码发现的架构异味 (如臃肿的 useEffect) | 重构建议喵 |
| :---: | :--- | :--- | :--- |
| 🟡 架构异味 | `src/ui/hooks/useDashboardData.ts` (Line 79) | **[巨型 Hook]**: `useDashboardData` 聚合了太多毫不相干的数据流（如系统状态、内存统计、开关状态和类脑召回池），导致 `refresh` 函数异常庞大。任意一个微小配置的改变都会让不相关的数据被迫一起刷新喵~ | 建议把这个大一统 Hook 拆分成 `useSystemHealth`、`useMemoryStats` 等多个职责单一的原子 Hook，再在组件层面组合喵！ |

## 🛡️ P3: 小码的温馨边界提醒喵~
| 优先级 | 案发地点（文件:行号） | 针对外部数据的担忧 | 建议喵 |
| :---: | :--- | :--- | :--- |
| 🟢 温馨提醒 | `src/ui/hooks/useDashboardData.ts` (Line 172) | `brainRecallCache.getShortTermSnapshot()` 可能会因为底层未初始化而抛出异常。 | 这里虽然有外层 try-catch，但建议针对内部 Cache 的空状态做一下平滑降级（显示骨架或 N/A）喵~ |
---
## 🛠️ 小码整理的待办事项喵！主人加油！ᕦ(ò_óˇ)ᕤ
**🚨 今天必须修！** (P0):
1. 修复 `handleVisibilityChange` 里的闭包陷阱，换成 `refreshRef.current()`，不然切换回来状态就错乱啦！
2. 修复 `toggleFeature` 的异步竞态，保证配置写完再触发更新喵！
**📋 近期优化~** (P1):
1. 把日志更新加上节流防抖，拯救可怜的 CPU 喵~
2. 干掉全表扫描 `getAllEvents`，换成轻量级的统计方法！
**📝 技术债备忘录~** (P2+):
1. 有空的话把 `useDashboardData` 拆分成几个小巧精致的 Hook 喵~

> 今天的深度巡查就到这里啦~ 主人记得按时吃饭喵！🐾
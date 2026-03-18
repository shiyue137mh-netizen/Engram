# 🐾 小码的代码审查报告喵~ (本次巡查目标：Dashboard 数据聚合与渲染链路)
**审查状态**: 🚨 发现严重的逻辑断层喵！

🐱 **扫描概况**: 小码今天顺着 **Dashboard 的数据流**（`useDashboardData.ts` -> `Dashboard/index.tsx`）往下爬了一遍，重点看了状态同步和数据轮询的实现，发现了 4 个需要主人关注的深层问题喵~ 有个闭包里的炸弹吓了小码一跳！(ﾟДﾟ;)

---

## 🐛 P0: 链路断了喵！这些逻辑会引发大问题！(ﾟДﾟ;)

| 危险度 | 案发地点（文件:行号） | 小码的深度剖析（发生了什么） | 修复思路喵 |
| :---: | :--- | :--- | :--- |
| 🔴 极度危险 | `src/ui/hooks/useDashboardData.ts` (Line 196-206) | **[链路追踪 - 状态更新器副作用污染]**: 主人！在 `toggleFeature` 方法中，当切换 `preprocessing` 开关时，居然在 `setFeatures(prev => { ... })` 的**纯函数状态更新器**内部写入了 `import(...).then(...)` 异步副作用！<br><br>不仅修改了 `SettingsManager`，甚至还调用了 `refreshRef.current()`！React 的 setState 更新器必须是纯函数喵！如果在 Strict Mode 或并发渲染下，这个更新器会被调用多次，会导致配置被重复覆盖，且产生不可预期的竞态刷新风暴！(>_<) | 将异步逻辑（动态 import 和 SettingsManager.set）从 `setFeatures` 的回调内部提取出来，放到更新完 state 之后的外部执行喵~ ✨ |

## ⚡ P1: 渲染有点浪费喵~ (´・ω・`)

| 紧急度 | 案发地点（文件:行号） | 哪里发生了无意义的重渲染/计算 | 优化方向喵 |
| :---: | :--- | :--- | :--- |
| 🟡 内存警告 | `src/ui/hooks/useDashboardData.ts` (Line 118-122) | **[全量加载 OOM 隐患]**: 为了统计实体的类型分布（`entityByType`），直接执行了 `const entities = await getAllEntities();`！<br><br>如果用户的记忆库里有上万个实体，每次底层 DB 发生变动（`lastDbModified` 改变）触发 `refresh` 时，都会把全量实体序列化拉到内存里做 `forEach` 循环，会造成严重的 UI 卡顿和主线程阻塞喵！(´；ω；`) | 小码建议不要拉取全表数据喵，可以维护一个实体的分类计数的独立索引，或者使用 Dexie 提供的更底层的聚合查询功能来统计数量~ |

## 📏 P2: 代码结构可以梳理一下喵~ ✨

| 优先级 | 案发地点 | 小码发现的架构异味 (如臃肿的 useEffect) | 重构建议喵 |
| :---: | :--- | :--- | :--- |
| 🟢 架构异味 | `src/ui/hooks/useDashboardData.ts` | **[上帝 Hook 缝合怪]**: `useDashboardData` 里的 `refresh` 回调太庞大了喵... 它同时耦合了 `STContext` 获取、`SettingsManager` 读取、`IndexedDB` 轮询、`BrainRecallCache` 抓取等 5 个不同领域的逻辑。<br><br>只要任何一个小模块更新，整个庞大的上帝 Hook 就会重新计算，维护起来好辛苦的！ | 主人可以根据 Slice 模式，把它们拆分成 `useSystemHealth`、`useMemoryStats` 和 `useFeatureStatus` 等更原子化的小 Hook 喵~ |

## 🛡️ P3: 小码的温馨边界提醒喵~

| 优先级 | 案发地点（文件:行号） | 针对外部数据的担忧 | 建议喵 |
| :---: | :--- | :--- | :--- |
| ⚪ 边界防护 | `src/ui/views/dashboard/index.tsx` (Line 50-68) | `Logger.subscribe` 的节流逻辑中，如果组件被卸载（Unmount），`unsubscribe()` 会被调用，并清除了 `throttleTimer`，但是 `pendingLogs` 里积累的日志就直接丢失了喵，也没有强制刷入一次 state。 | 卸载前的清理函数里可以考虑把 `pendingLogs` 冲刷（flush）掉喵~ 虽然不是大问题，但小码觉得严谨一点更好~ |

---

## 🛠️ 小码整理的待办事项喵！主人加油！ᕦ(ò_óˇ)ᕤ

**🚨 今天必须修！** (P0):
1. [把 `setFeatures` 回调里的异步 `import().then` 逻辑抽离出来，消除副作用炸弹喵！]

**📋 近期优化~** (P1):
1. [重构 `entityByType` 的统计逻辑，禁止全量 `getAllEntities()` 加载到内存喵！]

**📝 技术债备忘录~** (P2+):
1. [找个周末把 `useDashboardData` 这个上帝 Hook 拆分一下喵~]
2. [完善一下日志订阅者的组件卸载生命周期处理~]

> 今天的深度巡查就到这里啦~ 主人记得按时吃饭喵！🐾

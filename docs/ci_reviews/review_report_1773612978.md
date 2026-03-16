# 🐾 小码的代码审查报告喵~ (本次巡查目标：Dashboard 数据聚合模块)
**审查状态**: [🚨 发现严重的逻辑断层喵！]

🐱 **扫描概况**: 小码今天顺着 **`src/ui/hooks/useDashboardData.ts`** 的数据流往下爬了一遍，发现了 3 个需要主人关注的深层问题喵~

---

## 🐛 P0: 链路断了喵！这些逻辑会引发大问题！(ﾟДﾟ;)
| 危险度 | 案发地点（文件:行号） | 小码的深度剖析（发生了什么） | 修复思路喵 |
| :---: | :--- | :--- | :--- |
| 🔴 极度危险 | `src/ui/hooks/useDashboardData.ts` (Line 245) | **[闭包陷阱与竞态]**: `toggleFeature` 使用了 `useCallback` 并将 `features` 设为依赖。但在高频点击时，内部根据 `!features.xxx` 计算新状态，这会导致读到旧状态从而发生覆盖。此外，其中涉及到动态 `import()` 来同步 `recallConfig`，异步期间 `features` 已陈旧。 | 建议在 `SettingsManager.set` 后通过函数式更新获取最新状态，或使用独立的 `Reducer` 处理状态流转喵~ |

## ⚡ P1: 渲染有点浪费喵~ (´・ω・`)
| 紧急度 | 案发地点（文件:行号） | 哪里发生了无意义的重渲染/计算 | 优化方向喵 |
| :---: | :--- | :--- | :--- |
| 🟡 性能卡点 | `src/ui/hooks/useDashboardData.ts` (Line 158-166) | **[主线程阻塞]**: 每次 DB 的 modified 发生变化时，这里直接调用 `getAllEvents()` 和 `getAllEntities()` 把**全量表数据**塞进内存里！如果用户的聊天记录有上万条，巨大的 Array 遍历以及 Reduce 算 Token 会导致 UI 严重卡顿喵！ | 强烈建议改用 IndexedDB 的聚合查询（如 Dexie 的 `.count()`），不要把整个表拉出来喵~ |

## 📏 P2: 代码结构可以梳理一下喵~ ✨
| 优先级 | 案发地点 | 小码发现的架构异味 (如臃肿的 useEffect) | 重构建议喵 |
| :---: | :--- | :--- | :--- |
| 🔵 架构异味 | `src/ui/hooks/useDashboardData.ts` (Line 245-316) | 巨型的 `switch(feature)`：各种不同的业务配置硬编码写在了一个超过 70 行的块里，特别是 `preprocessing` 还会联动去加载额外的默认配置，导致 UI Hook 成了“配置调度中心”喵~ | 建议把各种 Feature 的变更逻辑下沉到各自的 `FeatureService` 或统一的配置模块中，让 Hook 只负责接数据喵~ |

## 🛡️ P3: 小码的温馨边界提醒喵~
| 优先级 | 案发地点（文件:行号） | 针对外部数据的担忧 | 建议喵 |
| :---: | :--- | :--- | :--- |
| 🟢 防御编程 | `src/ui/hooks/useDashboardData.ts` (Line 191) | 提取 `brainRecallCache.getShortTermSnapshot()` 时，虽然外面包了 try/catch，但是如果底层抛错，只 `console.warn`，会导致顶层依赖 `snapshot` 的渲染数据变成 `undefined` 喵。 | 建议在 catch 块里给 `setBrainStats` 一个默认的兜底空状态，防止 Dashboard 渲染时解构报错喵~ |

---

## 🛠️ 小码整理的待办事项喵！主人加油！ᕦ(ò_óˇ)ᕤ
**🚨 今天必须修！** (P0):
1. [修复 `toggleFeature` 里的陈旧闭包陷阱，防止配置项被回滚或写坏的喵！]

**📋 近期优化~** (P1):
1. [重写 `Memory Stats` 的统计逻辑，禁止 `getAllEvents` 霸占主线程喵！]

**📝 技术债备忘录~** (P2+):
1. [找个周末把 `useDashboardData` 里面巨大的 switch 控制流拆解一下喵，现在太挤啦~]

> 今天的深度巡查就到这里啦~ 主人记得按时吃饭喵！🐾

# Changelog

## [1.3.3] - 2026-03-02

### ✨ 新特性与改进 (Features & Improvements)

- **文本层级色彩体系 (Text Hierarchy Coloring)**:
  - 引入了全新的 6 色语义文本色彩系统（`heading`, `label`, `meta`, `link`, `value`, `emphasis`）。
  - 替代了原有的 `text-green-500` 等硬编码颜色，大幅提升了浅色/深色主题的切换体验与视觉一致性。
  - 为内置的 10 套主题（Catppuccin、Nord、Everforest 等）全量适配了对应的色板色彩，确保不受毛玻璃背景降低亮度的影响。
  - Dashboard、事件卡片、实体编辑器、表单页面等核心组件已全面应用该规范。

## [1.3.2] - 2026-03-02

### 🔧 重构 (Refactoring)

- **表单布局重写与统一**:
  - 全面彻底移除 `NumberField` 内部自带滑块的耦合组件设计，现在它仅负责纯展示强数字输入职能。
  - 在 `LLMPresetForm` (API预设) 页面中使用了类似 `SummaryPanel` 的 **自然语言指引式表单样式**（例如 "模型的温度为 (输入框)"），结合独立的 `SliderField` 组合，大大增强了参数阅读引导感。
  - 移除了包含在 `EntityConfigPanel` 等页面中手工模拟的纯背景滑槽，一律换用官方的独立 `SliderField`。
- **去除冗余的 Virtuoso**:
  - `ModelLog` 和 `RecallLog` 由于展示量级属于中低频即插即用的日志等级（非持久化），彻底剥离了 `react-virtuoso` 虚拟列表。
  - 解决了由于原生 Flex 弹性布局的渲染时延导致虚拟列表偶然性计算出 0 高度所引发的页面“坍缩白屏”问题。
- **状态同步监控降频**：为了降低过度激进的 UI 热更新引发的无效重绘和风扇狂转卡顿，将快速操作控制面板 `QuickPanel.tsx` 中向远端同步状态的 `setInterval` 频率从每秒钟一次放松至每 3 秒钟一次。

### 🚀 架构优化 (Architecture Improvements)

- **Embedding 多源对接层剥离**：彻底将过度增殖至将近七百行的 `EmbeddingService.ts` 解耦。建立专职对接口 `EmbeddingClient.ts` 进入 integrations 下管理所有的诸如 OpenAI/Ollama 等的请求格式和 fetch 交互操作，使其回归单纯批次分配控制器的本源角色。
- **环境宏预载入基座拆分**：将负责向 Prompt 中填装环境背景的宏指令池 `macros.ts` 当中最消耗心智与篇幅的长篇代码抽离，分解为两项独立的职能服务：`chatHistory.ts` (历史管理、正则清理代理) 与 `ejsProcessor.ts` (接管底层 ST 内置的 EJS 渲染)，有效化解了上帝类陷阱。

### 🐛 修复 (Bug Fixes)

- **并发实体入库流量管控**：修复了在提取巨量实体节点时触发 `Promise.all` 的无差别广播查询更新，引发瞬间并发撑爆 IndexedDB 导致堵塞白屏的隐患，引入了每 50 批次为一个限流循环的发送保护策略。

- **空指针与防白错误隔离**:
  - 为 `EventEditor.tsx` 在处理记忆节点中部分历史数据异常残缺（例如缺少 `structured_kv`）造成的空指针增加可选链探测 (`?.`) 容错。
- **定时器与事件闭包泄露**:
  - 重构 `useDashboardData.ts` 引入 `useRef`，以避免长期挂机的酒馆环境在可见性 (`visibilitychange`) 多次切换时导致轮询 Timer 的旧实例驻留在内存闭包中。
- **Vite 机制重合修补**:
  - 给 `KeyboardManager.ts` 等全局实例在触发 HMR 热重载时补偿了注销流程 (`import.meta.hot.dispose`)。
  - 优化了由于连续触发载入导致的重复 DOM 事件侦听累加，彻底转正了在 `index.tsx` 和 UI 接口层中针对快速切换角色的挂载回收容错能力。

## [1.3.1] - 2026-03-01

### 🔧 重构 (Refactoring)

- **SliderField 原子组件抽离**:
  - 将散落在 `FormComponents.NumberField` 和 `SummaryPanel` 中的内联滑块实现，统一抽取为独立的 `SliderField` 原子组件 (`src/ui/components/core/SliderField.tsx`)。
  - 采用 **隐藏原生 input + 纯 div 渲染** 方案（类似 `Switch` 组件），彻底规避 SillyTavern 全局 CSS 对 `input[type=range]` 的样式覆盖问题。
  - `SummaryPanel` 四处滑块（Token 阈值、活跃事件数、层间隔、缓冲层数）及 `NumberField` 的可选滑块均已迁移至该组件。

### 🐛 修复 (Bug Fixes)

- **记忆编辑视图白屏修复**: 恢复 `MemoryStream` 根容器的 `absolute inset-0` 定位，解决因 `MainLayout` 中 `min-h-full` wrapper 无法向子级传递确定高度而导致 `react-virtuoso` 虚拟列表高度塌陷为 0 的问题。
- **移动端全屏表单透底修复**: `MobileFullscreenForm` 的 Portal 容器增加 `backdrop-blur-3xl` 与 `bg-background/95`，修复部分透明主题下底层内容透出的视觉干扰。
- **记忆编辑页面内边距**: 给 `MemoryStream` 外层容器补充 `p-4 md:p-6` 响应式内边距，与其他页面（如 API 预设、设置）保持一致的留白。

## [1.3.0] - 2026-03-01

### ✨ 新特性与改进 (Features & Improvements)

- **全局丝滑动画体验 (Framer Motion)**:
  - **动态列表反转 (FLIP)**: 所有 API 预设（提示词模板、宏、正则）以及开发日志视图均引入了 FLIP 布局动画。卡片的增删、筛选和编辑现在会平滑滑行重排，告别瞬间跳闪。
  - **空间导航交错**: 主内容区 (`MainLayout`) 面板切换和侧边栏 (`Sidebar`) 引入了基于弹簧阻尼的交错进场动画。
  - **物理反馈注入**: `Header` 按钮等交互元素增加了 `whileTap` 物理反馈，`TabPills` 标签页使用了 `layoutId` 营造弹簧追随指示器。
- **记忆流视图 (Memory Stream) 重构升级**:
  - **楼层树状分组**: 时间线事件现在按设定的处理间隔进行树状分组显示，带经典连线；组标题支持一键**批量勾选/取消**该段记忆。
  - **沉浸式双栏编辑**: 桌面端记忆流进入编辑模式时，列表会平滑挤压到左侧，右侧优雅展开记忆编辑器（Master-Detail 布局），实现边看边改。
  - **原生级移动端编辑**: 移动端表单编辑升级为了带有侧滑进出动画的全屏页面 (`MobileFullscreenForm`)。
  - **实体网格视图 (Grid)**: 在记忆流的实体浏览模式下，抛弃无趣的列表大图块，采用了更为直观的现代化多栏悬浮网格展示。
- **状态回滚支持 (Pointer Rollback)**:
  - 总结设置面板 (`SummaryPanel`) 新增了对**最后总结楼层**与**最后抽取楼层**的独立输入框指针。
  - 遇到逻辑偏差需要反悔时，用户除编辑记录外，更可直接手动修改数字让引擎重跑当前或之前的节点。

### 🎨 UI 细节与修复 (UI Fixes & Tweaks)

- 优化了记忆流编辑弹窗与顶部的背景继承逻辑，使其正确继承无框流体面板的 `backdrop-blur` 和固体 `--bg-color`，以增强各种带有透明遮罩的主题（消除因底层文字透出造成的杂乱感）。
- 移动端记忆流工具栏精简收缩，将刷新、过滤等非核心操作全部收纳进右侧的 `...` 原生下拉浮窗。
- 修复了配置列表进行动画更新时，预设卡片组标题（带有提示内容和线段的部分）未能加入 `layout` 缩放引发的闪烁问题。

## [1.2.12] - 2026-02-23

### ✨ 改进 (Improvements)

- **世界书架构重构 (Global Worldbook Refactor)**:
  - 从按角色各自创建 `[Engram] 角色名` 专属世界书，改为统一使用单一的 `[Engram] Global` 全局注入层，大幅减少世界书列表的数量和 UI 污染。
  - 插件启动时即自动创建并挂载 `[Engram] Global` 至全局世界书（`initializeEngram` 中提前初始化），不再依赖首次总结时的懒加载。
  - `WorldInfoService` 和 `WorldbookConfigForm` 的世界书列表均已过滤 `[Engram]` 前缀的系统内部书，防止用户误选导致宏注入口重入。

- **冲突防护 (Macro Collision Guard)**:
  - `WorldbookScannerService.shouldIncludeEntry` 现对所有 `[Engram]` 开头的世界书条目返回 `false`，使其不会再被拼补进通用的 `{{worldbookContext}}` 中，彻底防止与提示词模板内 `{{engramSummaries}}`、`{{engramEntityStates}}` 等宏重入。

### 🗑️ 代码移除 (Removals)

- **旧版世界书摘要机制清理**:
  - 彻底删除了旧版逐条写入摘要到世界书的相关遗留实现：`getSummaryEntries`、`getEngramSummariesContent`、`ensureSeparatorEntries`、`getNextSummaryOrder`、`parseFloorRangeFromName`。
  - 移除了废弃的 `WorldBookStateService`（`state.ts`）及其依赖的 `constants.ts`（包含旧版 `SUMMARY_ENTRY_KEY`、`STATE_ENTRY_KEY`），相关存储统一收归 `apiSettings.worldbookConfig` 全局配置（IndexedDB）。
  - 移除 `WorldbookMetricsService.countSummaryTokens`（旧版基于世界书条目遍历计算摘要 Token 的方法）。


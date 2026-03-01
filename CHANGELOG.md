# Changelog

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


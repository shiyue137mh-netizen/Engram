# 代码审查报告

**审查状态:** 🟠 需关注 (存在高危风险与改进空间)

## 🚨 安全与逻辑缺陷

### 1. 动态代码执行风险 (High Risk)
- **风险等级:** 高危
- **所在位置:**
  - `src/integrations/tavern/bridge.ts` (第 300+ 行, `hideMessageRange`, `injectMessage` 等函数)
  - `src/integrations/tavern/worldbook/scanner.ts`
- **问题成因:**
  代码中使用了 `new Function('path', 'return import(path)')` 来动态导入模块。这种模式在某些安全环境下（如 CSP 严格限制的环境）会被视为 `unsafe-eval` 而被拦截。虽然这可能是为了绕过构建工具的静态分析，但它引入了潜在的安全风险，并且使代码难以静态分析和摇树优化。
- **修复指引:**
  建议使用标准的动态 `import()` 语法，或者通过配置构建工具（Vite）的 `alias` 或 `external` 来处理外部模块的加载，避免使用 `new Function` 构造器。

### 2. 不安全的 DOM 操作 (Medium Risk)
- **风险等级:** 中危
- **所在位置:** `src/integrations/tavern/bridge.ts` (在 `createMainPanel` 函数降级逻辑中)
- **问题成因:**
  使用 `panel.innerHTML = ...` 直接插入 HTML 字符串。虽然目前用于显示静态错误信息，但如果未来包含任何动态变量，将直接暴露 XSS 攻击面。
- **修复指引:**
  建议使用 `document.createElement`, `textContent` 等 DOM API 来构建 UI，或者确保所有插入内容都经过严格的转义处理。

## ⚡ 性能与规范建议

### 1. 低效的轮询机制 (Performance)
- **优化方向:** 减少不必要的 CPU 和 I/O 消耗。
- **所在位置:**
  - `src/ui/hooks/useDashboardData.ts` (`setInterval` 刷新数据)
  - `src/ui/views/quick-panel/QuickPanel.tsx` (轮询同步配置)
  - `src/ui/hooks/useWorkflow.ts` (轮询更新状态)
- **问题描述:**
  多个组件使用 `setInterval` 进行固定频率（如 500ms, 1000ms）的轮询。这在页面不可见或无数据变化时会浪费资源。
- **修复思路:**
  - 优先使用 **事件驱动** (EventBus) 来通知状态变化。
  - 对于必须轮询的场景，建议结合 `document.visibilityState`，在页面不可见时暂停轮询。
  - 考虑使用 React Query 或 SWR 等库来管理数据获取和缓存失效。

### 2. 强制自动滚动体验问题 (UX/Logical)
- **优化方向:** 提升用户体验。
- **所在位置:** `src/ui/views/memory-stream/index.tsx`
- **问题描述:**
  `useEffect` 中监听 `events` 变化并强制执行 `scrollTop = scrollHeight`。这意味着每当有新事件（或数据刷新）时，视图都会强制跳转到底部。如果用户正在向上滚动查看历史记录，会被打断，体验极差。
- **修复思路:**
  实现智能自动滚动：在更新前检查用户当前的滚动位置。只有当用户已经处于底部（或接近底部）时，才在更新后自动滚动到底部；否则保持用户当前的滚动位置不变，并可显示“有新消息”的提示。

## 🛠️ 行动指南

**下一步建议:**

1.  **安全加固:** 优先评估 `new Function` 的必要性，尝试寻找替代方案。检查所有 `innerHTML` 使用处。
2.  **性能优化:** 重构 `useDashboardData` 等 Hook，引入事件监听机制替代死循环轮询。
3.  **体验优化:** 修复 `MemoryStream` 的滚动逻辑，尊重用户的浏览上下文。

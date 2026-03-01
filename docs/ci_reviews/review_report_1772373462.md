深度代码审查报告

审查状态: [需关注]

🤖 扫描概况: 本次深度扫描共发现 20 项潜在问题及优化点。

🛡️ 1. 安全漏洞与越权风险 (目标 5-7 项)

| 风险等级 | 所在位置 | 问题成因 | 修复指引 |
| :---: | :--- | :--- | :--- |
| 中危 | `src/integrations/tavern/ui.ts` (Line 287) | **潜在的 DOM 型 XSS**<br>直接使用 `.innerHTML = ...` 写入不受信任的原始 HTML 字符串，如果后续内容变为动态获取，则容易导致注入攻击。 | 避免使用 `innerHTML`，改用 `document.createElement()` 或引入 `DOMPurify` 进行彻底过滤。 |
| 中危 | `src/integrations/tavern/ui.ts` (Line 319) | **弹窗内容缺乏转义**<br>`callPopup` 将未经验证的 `content` 字符串直接传给全局 window 弹窗 API，SillyTavern 原生通常会将其作为 HTML 解析，引发跨站攻击。 | 在传递给 `callPopup` 前，必须对 `content` 进行 HTML 实体编码或要求该 API 支持传入 DOM Node。 |
| 低危 | `src/ui/components/feedback/UpdateNotice.tsx` | **敏感信息日志泄漏风险**<br>捕获请求头异常时通过 `console.warn` 直接打印了 `e` 对象，在生产环境中可能会泄露包含 Token 的敏感网络上下文。 | 移除 `console.warn(..., e)` 中的对象直接打印，或过滤掉敏感属性后再记录。 |
| 低危 | `package.json` | **Markdown 渲染的安全隔离缺失**<br>依赖 `react-markdown` 渲染大模型内容时，尚未配合 `rehype-sanitize` 等插件。如果模型输出恶意闭合标签可能破坏页面结构甚至注入脚本。 | 安装并配置 `rehype-sanitize`，以确保所有渲染的 Markdown 输出始终是严格安全的。 |
| 低危 | `vite.config.ts` | **缺少 CSP 与安全响应头**<br>项目当前缺乏 `Content-Security-Policy` 或 Frame 限制策略，如果部署在开放网络上存在被点击劫持 (Clickjacking) 篡改的风险。 | 在生产环境构建中增加 CSP 策略配置，或通过插件拦截响应添加 `X-Frame-Options`。 |

🐛 2. 逻辑缺陷与白屏隐患 (目标 5-7 项)

| 风险等级 | 所在位置 | 问题成因 | 修复指引 |
| :---: | :--- | :--- | :--- |
| 高危 | `src/ui/views/api-presets/worldbook/WorldbookConfigForm.tsx` (Line 54) | **Undefined 对象属性遍历导致白屏**<br>`Object.keys(worldbookStructure)` 缺失对 `worldbookStructure` 为 null 或 undefined 的安全检查，当数据未加载完毕时会造成整个 React 页面崩溃。 | 修改为 `Object.keys(worldbookStructure || {})` 进行容错。 |
| 高危 | `src/integrations/llm/ModelDiscovery.ts` (Line 97) | **JSON 意外格式导致链路中断**<br>`(data.data || data || []).map` 逻辑不严谨。若接口异常返回 `null`，`data.data` 会抛出 "Cannot read properties of null" 异常。 | 增加可选链保护：`(data?.data || data || []).map` 或前置增加严格的空值阻断。 |
| 中危 | `src/integrations/tavern/worldbook/crud.ts` (Line 21) | **强转隐患引发未捕获异常**<br>`(entries as unknown[]).map`，若 `helper.getWorldbook` 在某种异常情况下返回了 `undefined`，由于缺少强校验，强制转换并调用 `map` 将引发系统级抛错。 | 在调用 `map` 前加入 `if (!Array.isArray(entries)) return []` 进行类型防御。 |
| 中危 | `src/ui/components/overlay/CommandPalette.tsx` (Line 115) | **异步数据竞争导致状态越界**<br>`executeSelected` 强依赖 `results.length`，如果异步搜索接口被阻断，`results` 可能是 undefined 或旧状态，导致越界或空指针解构。 | 判断 `results && results.length > 0`，确保组件逻辑与实际渲染状态强一致。 |
| 低危 | `src/core/utils/JsonParser.ts` | **深层反序列化缺乏类型守卫**<br>尽管包有 `try-catch`，但核心 JSON 还原缺少对实体结构 Schema 的运行时校验。遇到残缺格式时容易污染全局状态导致后续白屏。 | 引入 `zod` 等库对反序列化的复杂多层 JSON 进行强验证 (Type Guard)。 |

⚡ 3. 性能瓶颈与 DOM 陷阱 (目标 5-7 项)

| 优先级 | 所在位置 | 性能隐患说明 | 优化方向 |
| :---: | :--- | :--- | :--- |
| 高 | `src/ui/hooks/useResponsive.ts` | **无防抖的 Resize 监听导致高频重绘**<br>`window.addEventListener('resize')` 直接挂载在 React 状态更新函数上，在拉伸窗口时会以极高的帧率反复触发整个应用树重绘，引起严重卡顿。 | 为 `handleResize` 添加 `lodash.debounce`，将触发频率降至 150-250ms。 |
| 高 | `src/ui/components/overlay/FloatingPanel.tsx` (Line 85) | **高频拖拽引发的 DOM 阻塞**<br>`mousemove` 事件回调中直接调用了 `setPosition` 去更新 React State，未结合 `requestAnimationFrame`，在大面板时拖拽会感到严重滞后。 | 拖拽相关的高频坐标计算应使用 Ref 保存并结合 `requestAnimationFrame` 控制同步，避免过度消耗主线程。 |
| 中 | `src/integrations/tavern/ui.ts` | **冗余的 DOM 轮询与监听器**<br>`initQuickPanelButton` 方法中既使用了 `setTimeout` (长达 20 次的 500ms 轮询) 又开启了全文档的 `MutationObserver`，双重挂载浪费了巨大的性能。 | 删除 `setTimeout` 轮询逻辑，保留单一的 `MutationObserver` 即可，成功挂载后立刻 disconnect。 |
| 中 | `src/ui/views/memory-stream/index.tsx` | **缺少引用缓存导致的 Context 穿透**<br>对于海量节点的列表渲染，组件顶层依赖和 Props 使用了未包裹 `useMemo` 或 `useCallback` 的字面量/函数，导致子组件的层层 `React.memo` 缓存完全失效。 | 将传递给大量子组件的复杂引用类型 Props 用 `useMemo` 或 `useCallback` 严格缓存起来。 |
| 低 | `(全局组件)` | **悬浮或挂机页面可能存在闭包泄漏**<br>由于项目中使用了大量闭包内状态维护。如果在复杂的面板（如 DevLog 轮询组件）的 `useEffect` 卸载时没有彻底清除 Interval 或请求拦截器，会导致严重的内存泄漏。 | 补充检查所有 `useEffect` 的清理函数 (cleanup function)，确保每一个 `setInterval` 和 `addEventListener` 都能被成对释放。 |

📏 4. 代码规范与架构异味 (目标 5-7 项)

| 优先级 | 所在位置 | 异味(Code Smell)说明 | 重构建议 |
| :---: | :--- | :--- | :--- |
| 高 | `src/integrations/tavern/ui.ts` (等多处) | **Any 类型泛滥破坏安全网**<br>充斥着大量对全局变量和第三方数据响应的 `@ts-ignore` 和 `any` 强制转换，使得 TypeScript 在核心扩展交互处退化为 JavaScript。 | 补充第三方 `Window` 与 `SillyTavern` 的环境类型定义 (`d.ts`)，逐步消除 `any`。 |
| 中 | `src/integrations/tavern/worldbook/scanner.ts` | **巨型上帝组件(God Object)**<br>这部分文件兼顾了状态维护、正则扫描解析、异步网络数据请求甚至部分 UI 操作，超过数百行的混合逻辑严重违背单一职责原则(SRP)。 | 根据职责将职责边界明确划分，抽离出纯粹的 Scanner 引擎层。 |
| 中 | 全局项目 | **魔法数字与硬编码字符串泛滥**<br>轮询的间隔毫秒数、重试次数上限、Z-Index 值 (如 `10000`, `11000`) 甚至弹窗字符串均直接在业务代码中内联，后续维护难以统一查找和调整。 | 在 `src/constants/` 目录下新建 `UIConstants.ts` 和 `Config.ts` 进行统一定义。 |
| 低 | `App.tsx` 等根节点 | **缺失全局的 React 错误边界 (Error Boundary)**<br>对于一个复杂的高频交互插件项目，任何深层嵌套组件的渲染崩溃目前都会蔓延至顶层，导致整个 Engram UI 面板彻底阵亡。 | 在组件树的最顶层包裹一个类组件性质的 `ErrorBoundary`，以捕获并展示降级 UI。 |
| 低 | `src/integrations/tavern/ui.ts` | **内联 CSS 样式过度侵入**<br>直接通过 `.style.cssText` 操作大量内敛样式，缺乏原子化 CSS 或者 Module 的隔离，后期易产生样式优先级 (Specificity) 污染。 | 将所有内嵌样式重构为对应的 `Tailwind` 类名，保持 UI 与样式解耦且视觉风格统一。 |

🛠️ 行动指南

高优排查:
1. `WorldbookConfigForm.tsx` (Line 54) 中的 `Object.keys(worldbookStructure)` 未检查 undefined，这是导致白屏的高危点，必须优先增加可选链或空对象 fallback。
2. `useResponsive.ts` 中针对 resize 的原生监听没有节流，会导致窗口变化时的应用级卡顿，需马上用 `lodash.debounce` 优化。

技术债记录:
1. 在未来两周迭代内，请在 `src/constants` 下建立统一的安全 Z-Index 和 Timeout 词典，清理代码中的魔法数字。
2. 将 `react-markdown` 的渲染器补齐 `rehype-sanitize` 以满足基础的内容合规与防 XSS 要求。

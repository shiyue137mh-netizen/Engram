# Engram UI 设计规范 (V2.1 - 主题化版本)

## 1. 核心设计理念 (Core Philosophy)

我们的设计语言是 **"无框流体 (Borderless Fluid)"**，同时**支持多主题系统**。

-   **"无框布局" (Borderless)**: 减少大面积边框，用空间和对齐区分层级
-   **"Header 融合" (Header Fusion)**: 顶部 Header 与二级导航栏 (`LayoutTabs`) 视觉融合，移除中间分割线
-   **"减弱卡片" (De-emphasize Cards)**: 仅在必要时使用微妙背景区分
-   **"细线分割" (Thin Dividers)**: 使用 `1px` 极细线条 (`border-border`) 分割区域，但**避免在二级 Tab 界面使用**
-   **"字体区分"**: 使用字体大小和字重体现层级
-   **"极简主义"**: 压缩顶部空间 (`Ultra-Slim Header`)，强调内容区
-   **"注重排版"**: 不要在PC端有足够宽度的情况下，使用单一的竖直筒状布局
---

## 2. 颜色系统 (使用主题变量)

> [!IMPORTANT]
> **禁止使用硬编码颜色**（如 `bg-black`、`text-zinc-*`）！所有颜色必须使用 Tailwind 主题类。

### 2.1 语义化颜色映射

| 用途 | Tailwind 类名 | 说明 |
|------|--------------|------|
| **背景** | `bg-background` | 主背景色（随主题变化） |
| **卡片/区块** | `bg-card` | 需要区分的区块背景 |
| **悬浮层** | `bg-popover` | 下拉菜单、弹窗等 |
| **静音区域** | `bg-muted` | 禁用状态、次要区域 |
| **边框** | `border-border` | 所有分割线 |
| **主文字** | `text-foreground` | 标题、正文 |
| **次要文字** | `text-muted-foreground` | 描述、标签 |
| **强调色** | `text-primary`, `bg-primary` | CTA、链接、高亮 |

### 2.2 Sidebar 专用

| 用途 | Tailwind 类名 |
|------|--------------|
| 背景 | `bg-sidebar` |
| 文字 | `text-sidebar-foreground` |
| 激活态 | `bg-sidebar-accent text-sidebar-accent-foreground` |
| 边框 | `border-sidebar-border` |

---

## 3. 字体规范 (Typography)

-   **主要字体**: `Inter`, sans-serif
-   **代码字体**: `JetBrains Mono`, monospace
-   **字重**:
    -   标题: `font-light` + `tracking-tight`
    -   正文: `font-normal`
    -   标签: `font-medium`

---

## 4. 组件规范 (Component Specs)

### 4.1 导航 (Navigation) (`src/ui/components/layout`)

```tsx
// ✅ 正确：使用主题类
<button className="text-sidebar-foreground hover:bg-sidebar-accent">

// ❌ 错误：硬编码颜色
<button className="text-zinc-500 hover:bg-zinc-800">
```

### 4.2 布局组件 (Layout Components)

#### Header & Tabs (融合设计)
- **Header**: 高度固定的极简栏 (`h-10`), 图标尺寸 `18px`。
- **LayoutTabs**: 使用 `Portal` 渲染至 Header 下方，移除顶部 padding，与 Header 共享底部边框。
- **TabPills**: 按钮 padding 压缩至 `py-1.5`，文字 `text-sm`。

#### Divider (分割线)
- **位置**: 仅在 `PageTitle` 下方使用（**例外**: 包含二级 Tab 的页面如 API Presets 不使用）。
- **样式**: `border-t border-border` (不使用透明度/30)。
- **间距**: 配合 `PageTitle` 的 `mb-2` 使用，保持紧凑。

### 4.3 按钮 (Buttons) (`src/ui/components/ui/Button.tsx`)

-   **Primary**: `bg-primary text-primary-foreground`
-   **Secondary/Ghost**: `bg-transparent border-border text-muted-foreground hover:bg-accent`
-   **Icon Button**: 无背景，hover 时 `bg-accent`

### 4.3 输入框 (Inputs) (`src/ui/components/ui/Input.tsx`)

-   **边框**: `border-input` 或 `border-border`
-   **背景**: `bg-background` 或透明
-   **Focus**: `ring-ring` (无需强 glow)

---

## 5. 交互 (Interaction)

-   **Hover**: 微妙的透明度/位移变化
-   **Transition**: `duration-200 ease-out`

---

## 6. 布局结构 (`src/ui/views`)

-   **Sidebar**: 左侧固定，使用 `border-r border-sidebar-border` 分割
-   **Panel Controls**: Z-index 最高层

---

## 7. 移动端与调试最佳实践 (Mobile & Debugging)

### 7.1 移动端高度坍塌 (Mobile Height Collapse)

在 SillyTavern 的嵌入式环境中，移动端浏览器的视口高度 (Viewport Height) 计算极易出错。
> [!WARNING]
> **不要依赖默认高度**。只要是全屏覆盖层 (Overlay/Modal)，必须显式强制设置高度和宽度：
> ```tsx
> style={{ height: '100dvh', width: '100vw' }}
> ```
> 仅使用 `h-screen` 或 `bottom-0` 往往会导致计算为 `0` 或被地址栏挤压，造成背景透明或内容截断。

### 7.2 样式调试指南 (Debugging Method)

由于 Tailwind 类可能被宿主环境 CSS 覆盖，或者 CSS 变量存在未知的透明度：
> [!TIP]
> **不要瞎猜 CSS**。遇到样式异常（如透明度问题、层级覆盖），优先使用 JS 脚本在控制台获取真实计算样式：
> 1. 打开控制台 (Console)
> 2. 使用 `window.getComputedStyle($0)` 检查元素的 `zIndex`, `opacity`, `backgroundColor` (查看 rgba alpha 值)
> 3. 编写简单的 JS 脚本批量打印层级关系，而不是反复修改 CSS 碰运气。

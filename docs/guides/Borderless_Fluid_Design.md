# 无框流体设计 (Borderless Fluid) 具体实现指南

本文档详细描述了 Engram 项目中 **"无框流体 (Borderless Fluid)"** 设计语言的具体实现细节。

核心理念：**"去容器化"** —— 能用线条不用框，能用留白不用线条。通过字体层级、间距和极细的分割线来构建界面秩序，而非传统的卡片堆叠。

---

## 1. 输入框 (Ghost Input)

输入框摒弃了传统的四面封闭矩形（Box），采用 **"幽灵线 (Ghost Line)"** 设计。

### 设计特征
- **常态**: 无背景色 (透明)，无边框，仅保留底部一条极细的分割线 (`border-bottom`)。
- **交互**:
    - `Hover`: 底部线条颜色加深。
    - `Focus`: 底部线条变为品牌主色 (`--primary`)，可附加微弱的底部发光 (`box-shadow`)。
- **排版**: 字体采用标准正文大小，为了对齐，Padding 上下对称但数值较小。

### CSS 实现参考

```css
.input-ghost {
    width: 100%;
    padding: 8px 0; /* 移除左右 Padding，紧贴文字流 */
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border-glass); /* 1px 极细边框 */
    border-radius: 0; /* 直角 */
    color: var(--text-main);
    font-family: var(--font-body);
    font-size: 0.95rem;
    transition: all 0.2s;
    outline: none;
}

/* 占位符颜色需更淡 */
.input-ghost::placeholder {
    color: var(--text-faint);
}

/* 悬停加深 */
.input-ghost:hover {
    border-bottom-color: var(--text-muted);
}

/* 聚焦高亮 */
.input-ghost:focus {
    border-bottom-color: var(--primary);
    box-shadow: 0 1px 0 0 var(--primary); /* 底部发光效果 */
}
```

---

## 2. 按钮 (Buttons)

按钮分为 **功能型 (Functional)** 和 **强调型 (Primary)**，尽量减少色块的使用。

### 设计特征
- **默认 (Secondary/Ghost)**: 透明背景，仅通过文字颜色或 Icon 表达含义。Hover 时只有图标或者文字变色。
- **主要 (Primary)**: 使用品牌色填充，带有轻微的弥散投影 (Glow)，字体反白。
- **圆角**: 统一使用中等圆角 (`--radius-md`)。

### CSS 实现参考

```css
.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--radius-md);
    background: transparent; /* 默认透明 */
    color: var(--text-muted);
    font-weight: 500;
    transition: all 0.2s;
}

/* 幽灵按钮交互 */
.btn:hover {
    background: var(--bg-hover); /* 极淡的白色/黑色叠加 */
    color: var(--text-main);
}

/* 强调按钮 */
.btn-primary {
    background: var(--primary);
    color: var(--bg-app); /* 文本反色 */
    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.25); /* 弥散投影 */
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.4);
}
```

---

## 3. 卡片与容器 (Glass Cards)

虽然是"无框"设计，但在需要强调内容块（如商品列表、角色卡）时，使用 **磨砂玻璃 (Glassmorphism)** 效果而非实色卡片。

### 设计特征
- **背景**: 低透明度的背景色 (`--bg-glass`) + 背景模糊 (`backdrop-filter: blur`).
- **边框**: 1px 的半透明边框 (`--border-glass`)，用于在深色背景上勾勒轮廓。
- **层级**: 选中状态 (`.selected`) 使用品牌色描边和更强的投影。

### CSS 实现参考

```css
.glass-panel {
    background: var(--bg-glass); /* rgba(30, 30, 46, 0.6) */
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-glass); /* rgba(255, 255, 255, 0.06) */
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 交互卡片 */
.interactive-card {
    transition: transform 0.2s, background 0.2s;
}

.interactive-card:hover {
    transform: translateY(-2px);
    background: var(--bg-hover);
    border-color: var(--text-muted);
}
```

---

## 4. 布局与分割 (Layout & Dividers)

使用 **分割线 (Divider)** 和 **网格 (Grid)** 来组织信息，避免嵌套容器。

### 设计特征
- **分割线**: 取代 `margin` 造成的隐式分割，使用明示的、极细的线条 (`opacity: 0.6`)。
- **标题**: 页面大标题使用细字重 (`font-light`) + 紧凑字间距 (`tracking-tight`)，体现现代感。
- **网格**: 表单域使用 2列或 3列 Grid 布局，标签 (`label`) 位于输入框上方。

### CSS 实现参考

```css
/* 极细分割线 */
.engram-divider {
    border: none;
    border-top: 1px solid var(--border-glass);
    margin: 24px 0;
    opacity: 0.6;
}

/* 页面大标题 */
.engram-page-title {
    font-size: 1.8rem;
    font-weight: 300; /* Light */
    letter-spacing: -0.025em; /* Tight */
    color: var(--text-main);
}

/* 网格表单布局 */
.engram-grid-2col {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px; /* 较大的间距使得布局不拥挤 */
}

/* 移动端适配 */
@media (max-width: 768px) {
    .engram-grid-2col {
        grid-template-columns: 1fr;
    }
}
```

---

## 总结

**Borderless Fluid** 的核心在于：
1.  **减法**: 去掉卡片背景，去掉粗边框。
2.  **质感**: 用 Glassmorphism 增加深度，用 Ghost Input 增加通透感。
3.  **排版**: 字重对比（Title Light vs Value Bold）构建层级。

# Engram 上下文系统完全指南 (Context System Guide)

## 1. 系统概述 (Overview)

Engram 的上下文系统是一个分层的、高度自动化的信息管理架构。它不仅负责存储和检索长期记忆（世界书），还负责动态构建发送给 LLM 的最终上下文。

整个系统由以下几个核心模块组成：
1.  **Prompt Template (提示词模板)**: 定义如何向 LLM 提问（如摘要生成、剧情分析）。
2.  **Worldbook Architecture (世界书架构)**: 管理全局与角色专属的知识库。
3.  **Activation & Retrieval (激活与检索)**: 决定哪些信息应该进入当前上下文。
4.  **Context Aggregation (上下文聚合)**: V0.8.5 引入的双重管道机制，确保兼容性。

## 2. 提示词系统 (Prompt System)

Engram 所有的后台任务（如自动摘要、精简、剧情分析）都依赖于 Prompt Template。

### 2.1 模板结构
每个模板包含：
*   **System Prompt**: 设定 LLM 的角色和任务目标。
*   **User Prompt**: 包含动态注入的变量（如聊天记录、世界书内容）。
*   **Output Format**: 期望的输出格式（JSON 或 Plain Text）。

### 2.2 内置变量 (Variables)
Engram 提供了丰富的宏变量，用于在运行时注入上下文：

| 变量名 | 说明 | 适用场景 |
| :--- | :--- | :--- |
| `{{chatHistory}}` | 最近的聊天记录文本 | 摘要生成, 剧情分析 |
| `{{worldbookContext}}` | 根据当前聊天激活的世界书内容 | 增强检索, 摘要生成 |
| `{{userInput}}` | 用户当前的输入内容 | 预处理, 描写增强 |
| `{{engramSummaries}}` | 当前角色所有的历史摘要条目 | 记忆精简 (Trim) |
| `{{char}}` | 当前角色名称 | 通用 |
| `{{user}}` | 用户名称 | 通用 |

### 2.3 EJS 支持 (V0.8.5+)
如果启用了 **EJS 兼容模式**，并在 SillyTavern 中安装了 `ST-Prompt-Template` 扩展，您可以在模板中使用高级逻辑控制：
*   `<% if (bias > 0.5) { %> ... <% } %>`
*   `/trigger` 宏命令

## 3. 世界书架构 (Worldbook Architecture)

Engram 不直接修改用户的原始世界书，而是维护一套独立的影子系统。

### 3.1 两个层级 (Tiered Storage)

1.  **全局世界书 (Global Worldbook)**:
    *   **命名**: 用户自定义
    *   **用途**: 存储跨角色的通用设定（如世界观、地理、魔法系统）。
    *   **管理**: 在 API 配置面板中手动指定。

2.  **角色世界书 (Character Worldbook)**:
    *   **存取策略**: `[Engram] {角色名}`
    *   **用途**: 存储该角色的专属记忆、摘要和状态。
    *   **自动绑定**: 当您切换角色时，Engram 会自动检测并挂载对应的 Engram 世界书。

### 3.2 条目类型 (Entry Types)

Engram 在角色世界书中维护以下几种特殊条目：

*   **剧情摘要 (Summary)**: 
    *   **命名**: `剧情摘要_{start}-{end}`
    *   **Key**: `engram总结`, `剧情摘要`
    *   **内容**: 自动生成的阶段性剧情总结。
    *   **策略**: Selective (按需激活) 或 Constant (常驻，取决于精简策略)。

*   **系统状态 (System State)**:
    *   **命名**: `Engram System State`
    *   **Key**: `__ENGRAM_STATE__`
    *   **内容**: JSON 格式的内部状态（上次总结层数、Token 统计等）。
    *   **属性**: `enabled: false` (对 LLM 不可见，仅用于持久化数据)。

*   **分隔符 (Separators)**:
    *   **内容**: `<summary>`, `</summary>`
    *   **用途**: 在发送给 LLM 的Prompt中标记摘要区域，方便 AI 识别。

## 4. 激活与检索 (Activation & Retrieval)

Engram 如何决定把哪些信息喂给 AI？

### 4.1 激活逻辑 (Activation Logic)
Engram 复用了 SillyTavern 强大的原生检索器 (`WorldInfo.js`)，支持：
*   **Constant (常驻)**: 始终包含在上下文中（如最近的摘要）。
*   **Vectorized (向量化)**: (计划中) 基于语义相似度检索。
*   **Keyword (关键词)**: 基于聊天内容匹配关键词。

### 4.2 扫描深度 (Scan Depth)
Engram 调用 `getWorldInfoPrompt` 时，配置了极高的上下文扫描深度 (`1,000,000` tokens)，确保即使是很久以前的剧情触发词也能被扫描到，从而唤醒沉睡的记忆条目。

## 5. 上下文聚合 (Context Aggregation - V0.8.5)

这是 V0.8.5 引入的核心变更，用于解决兼容性问题。

### 5.1 双重管道 (Dual Pipeline)
所有发往 LLM 的请求都会经过两道工序：

1.  **Native Pipeline (原生兼容层)**
    *   **触发**: `EventBus.emit(GENERATE_AFTER_DATA)`
    *   **作用**: 给 `ST-Prompt-Template` 和原生 Regex 脚本一个“插手”的机会。它们可以修改 Prompt，执行宏替换，或者运行正则清洗。
    *   **开关**: `API配置` -> `正则规则` -> `原生 Regex 兼容`

2.  **Engram Pipeline (内部处理层)**
    *   **组件**: `RegexProcessor` (Engram Internal)
    *   **作用**: 执行 Engram 自己的清洗逻辑（如移除 `<think>` 标签，处理 API 特有的格式）。
    *   **始终启用**: 除非在代码级禁用。

### 5.2 数据流向
```
[原始 Prompt] 
    ↓
(Native Pipeline) → ST-Prompt-Template (EJS渲染) → Native Regex
    ↓
[中间态 Prompt]
    ↓
(Engram Pipeline) → 移除内部标签 → 格式规范化
    ↓
[最终 Prompt] → LLM API
```

## 6. 配置指南 (Configuration)

### 6.1 开启 EJS 支持
*   **路径**: `API配置` -> `世界书` 面板
*   **选项**: "启用 EJS 模板 (ST-Prompt-Template)"
*   **效果**: 允许 prompt 中包含 `<% %>` 逻辑。

### 6.2 开启原生 Regex
*   **路径**: `API配置` -> `正则规则` 面板
*   **选项**: "酒馆原生 Regex 兼容"
*   **效果**: 允许酒馆左侧栏 "扩展" -> "Regex" 中的脚本生效。

### 6.3 调整激活阈值
*   目前 Engram 的激活依赖 ST 原生机制，请在酒馆的 `世界书` -> `设置` 中调整 `扫描深度` 和 `递归深度` 以获得最佳效果。

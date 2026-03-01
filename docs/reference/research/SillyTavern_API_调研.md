# SillyTavern API 调研报告

> 本文档调研 SillyTavern 的模型获取、调用机制与提示词/世界书系统，为 Engram 的 API 预设模块提供技术参考。

---

## 1. 模型系统概览

SillyTavern 支持多种模型后端，分为三类：

| 类型 | 用途 | 支持的模型源 |
|------|------|-------------|
| **LLM 模型** | 文本生成/总结 | OpenAI, Claude, Ollama, vLLM, Gemini, 本地模型等 |
| **向量化模型** | Embeddings | transformers, openai, ollama, vllm, cohere, nomicai, llamacpp 等 |
| **Rerank 模型** | 结果重排序 | 外部 API (如 SiliconFlow, Jina, Cohere) |

---

## 2. LLM 模型调用

### 2.1 酒馆助手提供的高级 API

酒馆助手 (`window.TavernHelper`) 封装了 LLM 调用，推荐使用：

```typescript
// 使用当前预设生成文本
const result = await generate({
  user_input: '用户输入',
  should_stream: true,  // 可选：流式输出
  image: 'base64或URL',  // 可选：图片输入
  overrides: {          // 可选：覆盖提示词
    char_description: '覆盖的角色描述'
  },
  injects: [{           // 可选：注入提示词
    role: 'system',
    content: '注入内容',
    position: 'in_chat',
    depth: 0,
    should_scan: true
  }],
  max_chat_history: 10  // 可选：限制历史条数
});

// 自定义 API 生成（独立于酒馆设置）
const result = await generate({
  user_input: '你好',
  custom_api: {
    apiurl: 'https://api.openai.com/v1',
    key: 'sk-xxx',
    model: 'gpt-4',
    source: 'openai',
    max_tokens: 2048,
    temperature: 0.7
  }
});
```

### 2.2 自定义提示词顺序

```typescript
// 不使用预设，自定义提示词顺序
const result = await generateRaw({
  user_input: '你好',
  ordered_prompts: [
    'char_description',        // 内置提示词
    { role: 'system', content: '系统指令' },
    'chat_history',
    'user_input'
  ],
  custom_api: { ... }
});
```

### 2.3 内置提示词类型

| 标识符 | 说明 |
|--------|------|
| `world_info_before` | 世界书 (角色描述前) |
| `persona_description` | 用户角色描述 |
| `char_description` | 角色描述 |
| `char_personality` | 角色性格 |
| `scenario` | 场景设定 |
| `world_info_after` | 世界书 (角色描述后) |
| `dialogue_examples` | 对话示例 |
| `chat_history` | 聊天历史 |
| `user_input` | 用户输入 |

---

## 3. 向量化模型调用

### 3.1 支持的向量化源

酒馆后端 (`/api/vectors/*`) 支持以下向量化源：

```javascript
const SOURCES = [
  'transformers',  // 本地 sillytavern-transformers
  'openai',        // OpenAI API (text-embedding-3-small等)
  'mistral',       // Mistral Embed
  'cohere',        // Cohere Embed
  'ollama',        // Ollama 本地模型
  'vllm',          // vLLM 服务
  'llamacpp',      // llama.cpp 服务
  'nomicai',       // Nomic AI
  'palm',          // Google MakerSuite
  'vertexai',      // Google Vertex AI
  'extras',        // SillyTavern Extras
  'webllm',        // 浏览器 WebLLM (需前端计算)
  'koboldcpp',     // KoboldCpp
];
```

### 3.2 向量 API 端点

```javascript
// 插入向量
POST /api/vectors/insert
{
  collectionId: 'chat_xxx',
  source: 'transformers',
  items: [{ hash: 123, text: '文本内容', index: 0 }],
  // source 特定参数
  model: 'text-embedding-3-small',  // openai
  apiUrl: 'http://localhost:11434', // ollama/vllm
}

// 查询向量
POST /api/vectors/query
{
  collectionId: 'chat_xxx',
  source: 'transformers',
  searchText: '查询文本',
  topK: 10,
  threshold: 0.25
}

// 多集合查询
POST /api/vectors/query-multi
{
  collectionIds: ['chat_xxx', 'file_yyy'],
  ...
}

// 删除向量
POST /api/vectors/delete
{
  collectionId: 'chat_xxx',
  hashes: [123, 456]
}

// 清空集合
POST /api/vectors/purge
{ collectionId: 'chat_xxx' }
```

### 3.3 vectors-enhanced 的封装方式

```javascript
import { getRequestHeaders } from '../../../../script.js';

// 通过酒馆 API 进行向量化
const response = await fetch('/api/vectors/insert', {
  method: 'POST',
  headers: getRequestHeaders(),
  body: JSON.stringify({
    collectionId: `${chatId}_${taskId}`,
    source: settings.source,  // 'transformers' | 'ollama' | 'vllm' 等
    items: items,
    // 根据 source 传递额外参数
    apiUrl: settings.ollama_url,
    model: settings.ollama_model,
    keep: settings.ollama_keep
  })
});
```

---

## 4. Rerank 模型调用

### 4.1 Rerank 服务架构

vectors-enhanced 使用独立的 Rerank 服务，通过外部 API 调用：

```javascript
// RerankService 配置
const rerankConfig = {
  enabled: true,
  url: 'https://api.siliconflow.cn/v1/rerank',  // API 端点
  apiKey: 'sk-xxx',
  model: 'Pro/BAAI/bge-reranker-v2-m3',
  top_n: 20,
  hybrid_alpha: 0.7,  // Rerank 分数权重
};
```

### 4.2 Rerank API 调用

```javascript
// 发送 Rerank 请求
const response = await fetch(config.url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`
  },
  body: JSON.stringify({
    query: '查询文本',
    documents: ['文档1', '文档2', ...],
    model: config.model,
    top_n: config.top_n,
    instruct: '可选的去重指令'  // 用于去重
  })
});

// 响应格式
{
  results: [
    { index: 0, relevance_score: 0.95 },
    { index: 2, relevance_score: 0.87 },
    ...
  ]
}
```

### 4.3 混合评分计算

```javascript
// 混合评分 = Rerank分数 * alpha + 原始向量分数 * (1 - alpha)
const hybridScore = rerankScore * hybridAlpha + originalScore * (1 - hybridAlpha);
```

---

## 5. 预设系统 (Presets)

### 5.1 预设结构

```typescript
type Preset = {
  settings: {
    max_context: number;          // 最大上下文 token
    max_completion_tokens: number; // 最大回复 token
    should_stream: boolean;
    temperature: number;
    frequency_penalty: number;
    presence_penalty: number;
    top_p: number;
    // ... 更多采样参数
  };
  prompts: PresetPrompt[];        // 已添加的提示词
  prompts_unused: PresetPrompt[]; // 未使用的提示词
  extensions: Record<string, any>; // 扩展数据
};
```

### 5.2 预设 API

```typescript
// 获取预设列表
const names = getPresetNames();

// 获取当前使用的预设
const current = getLoadedPresetName();

// 加载预设
loadPreset('my_preset');

// 获取预设内容
const preset = getPreset('in_use');  // 'in_use' = 当前活动预设

// 修改预设
preset.settings.temperature = 0.8;
await replacePreset('in_use', preset);

// 创建新预设
await createPreset('new_preset', preset);
```

---

## 6. 提示词注入系统

### 6.1 setExtensionPrompt (原生 API)

```javascript
import { setExtensionPrompt, extension_prompt_types, extension_prompt_roles } from '../script.js';

// 注入提示词
setExtensionPrompt(
  'MY_EXTENSION_TAG',           // 唯一标识
  '注入的提示词内容',            // 内容
  extension_prompt_types.IN_PROMPT, // 位置类型
  2,                            // 深度 (从最新消息算起)
  true,                         // 是否参与世界书扫描
  extension_prompt_roles.SYSTEM // 角色
);

// 位置类型
extension_prompt_types = {
  NONE: 0,       // 不注入
  IN_PROMPT: 1,  // 在提示词中
  IN_CHAT: 2,    // 在聊天历史中
};

// 深度角色
extension_prompt_roles = {
  SYSTEM: 0,
  USER: 1,
  ASSISTANT: 2,
};
```

### 6.2 酒馆助手的 injectPrompts

```typescript
// 更高级的注入 API
const { uninject } = injectPrompts([
  {
    id: 'my_injection',
    role: 'system',
    content: '注入内容',
    position: 'in_chat',  // 'in_chat' | 'none'
    depth: 0,
    should_scan: true,    // 参与世界书扫描
    filter: () => true    // 条件过滤
  }
], { once: false });  // once: true 则只注入一次

// 移除注入
uninject();
// 或
uninjectPrompts(['my_injection']);
```

### 6.3 vectors-enhanced 的注入方式

```javascript
// 使用 setExtensionPrompt 注入检索结果
setExtensionPrompt(
  EXTENSION_PROMPT_TAG,
  formattedResults,           // 格式化后的检索结果
  settings.position,          // IN_PROMPT
  settings.depth,             // 深度
  settings.include_wi,        // 是否包含世界书
  settings.depth_role         // SYSTEM
);
```

---

## 7. 世界书系统

### 7.1 世界书 API

```typescript
// 获取世界书列表
const worldbooks = getWorldbookNames();
const globalBooks = getGlobalWorldbookNames();
const charBooks = getCharWorldbookNames();
const chatBook = getChatWorldbookName();

// 获取世界书内容
const worldbook = await getWorldbook('my_worldbook');

// 创建世界书
await createWorldbook('new_worldbook');

// 获取/创建聊天专属世界书
const chatWorldbook = await getOrCreateChatWorldbook();
```

### 7.2 世界书条目结构

```typescript
type WorldbookEntry = {
  uid: number;
  comment: string;           // 条目名称
  enabled: boolean;
  type: 'constant' | 'selective' | 'vectorized';
  position: 'before_character_definition' | 'after_character_definition' | ...;
  depth: number | null;
  order: number;
  keys: string[];            // 触发关键词
  logic: 'and_any' | 'and_all' | 'not_all' | 'not_any';
  content: string;           // 条目内容
  group: string;
  // ... 更多字段
};
```

### 7.3 世界书条目操作

```typescript
// 创建条目
await createWorldbookEntries('my_worldbook', [
  { comment: '新条目', content: '条目内容', keys: ['关键词'] }
]);

// 更新条目
await updateWorldbookWith('my_worldbook', entries => {
  return entries.map(e => ({
    ...e,
    enabled: true
  }));
});

// 删除条目
await deleteWorldbookEntries('my_worldbook', [uid1, uid2]);
```

---

## 8. Engram 集成建议

### 8.1 LLM 调用策略

```typescript
// 推荐：使用酒馆助手的 generate/generateRaw
// 优点：自动使用用户配置，支持流式，支持自定义 API

export class LLMAdapter {
  async summarize(text: string, options: SummarizeOptions): Promise<string> {
    // 方案1: 使用酒馆当前设置
    return await window.TavernHelper.generate({
      user_input: `请总结以下内容：\n${text}`,
      should_stream: options.stream,
      max_chat_history: 0  // 不使用聊天历史
    });
    
    // 方案2: 使用独立 API 配置
    return await window.TavernHelper.generate({
      user_input: `请总结：\n${text}`,
      custom_api: this.getSummarizeApiConfig()
    });
  }
}
```

### 8.2 向量化调用策略

```typescript
// 推荐：直接调用酒馆 /api/vectors/* 端点
// 原因：酒馆已封装所有向量源的处理逻辑

export class VectorAdapter {
  async vectorize(items: VectorItem[]): Promise<void> {
    const response = await fetch('/api/vectors/insert', {
      method: 'POST',
      headers: getRequestHeaders(),
      body: JSON.stringify({
        collectionId: this.getCollectionId(),
        source: this.settings.source,  // 用户选择的向量源
        items: items,
        // 动态添加源特定参数
        ...this.getSourceSettings()
      })
    });
  }
  
  async query(text: string, topK: number): Promise<QueryResult[]> {
    const response = await fetch('/api/vectors/query', {
      method: 'POST',
      headers: getRequestHeaders(),
      body: JSON.stringify({
        collectionId: this.getCollectionId(),
        source: this.settings.source,
        searchText: text,
        topK: topK,
        threshold: this.settings.threshold
      })
    });
    return response.json();
  }
}
```

### 8.3 Rerank 调用策略

```typescript
// 推荐：独立封装 Rerank 服务
// 原因：酒馆本身不提供 Rerank API

export class RerankAdapter {
  async rerank(query: string, results: QueryResult[]): Promise<QueryResult[]> {
    if (!this.settings.enabled) return results;
    
    const response = await fetch(this.settings.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.apiKey}`
      },
      body: JSON.stringify({
        query: query,
        documents: results.map(r => r.text),
        model: this.settings.model,
        top_n: this.settings.top_n
      })
    });
    
    const data = await response.json();
    return this.mergeScores(results, data.results);
  }
}
```

### 8.4 记忆注入策略

```typescript
// 推荐：使用 setExtensionPrompt
// 时机：监听 GENERATION_AFTER_COMMANDS 事件

import { eventSource, event_types, setExtensionPrompt } from '../script.js';

export class MemoryInjector {
  register(): void {
    eventSource.on(event_types.GENERATION_AFTER_COMMANDS, 
      this.handleGeneration.bind(this));
  }
  
  async handleGeneration(type: string, params: any, dryRun: boolean): Promise<void> {
    if (dryRun) return;
    
    // 检索相关记忆
    const memories = await this.retrieveMemories();
    
    // 格式化并注入
    const formatted = this.formatMemories(memories);
    setExtensionPrompt(
      'ENGRAM_MEMORY',
      formatted,
      extension_prompt_types.IN_PROMPT,
      this.settings.depth,
      this.settings.include_wi,
      extension_prompt_roles.SYSTEM
    );
  }
}
```

---

## 9. 参考资源

- 酒馆源码: `/public/scripts/script.js`, `/public/scripts/extensions.js`
- 向量端点: `/src/endpoints/vectors.js`
- vectors-enhanced: `/public/scripts/extensions/third-party/vectors-enhanced/`
- 酒馆助手 API: `window.TavernHelper`
- 酒馆事件: `eventSource`, `event_types`

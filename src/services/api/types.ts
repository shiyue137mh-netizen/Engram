/**
 * Engram API 配置类型定义
 */

// 导入内置提示词模板 (Vite ?raw 导入)
import summaryPrompt from './prompts/summary_prompt.md?raw';
import trimPrompt from './prompts/trim.md?raw';
import queryEnhancePrompt from './prompts/query_enhance.md?raw';
import plotDirectorPrompt from './prompts/plot_director.md?raw';
import descriptionPrompt from './prompts/description.md?raw';

// ==================== LLM 预设 ====================

/**
 * LLM 预设配置
 */
export interface LLMPreset {
  /** 唯一标识 */
  id: string;
  /** 预设名称 */
  name: string;
  /** 配置源：使用酒馆当前配置、酒馆的 connection_profile 或自定义 */
  source: 'tavern' | 'tavern_profile' | 'custom';
  /** 选择的酒馆 connection_profile ID（仅当 source === 'tavern_profile' 时有效） */
  tavernProfileId?: string;
  /** 自定义 API 配置（仅当 source === 'custom' 时有效） */
  custom?: CustomAPIConfig;
  /** 模型采样参数 */
  parameters: SamplingParameters;
  /** 上下文设置 */
  context: ContextSettings;
  /** 是否为默认预设 */
  isDefault?: boolean;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}


/**
 * 自定义 API 配置
 */
export interface CustomAPIConfig {
  /** API 端点 URL */
  apiUrl: string;
  /** API Key */
  apiKey: string;
  /** 模型名称 */
  model: string;
  /** API 类型/协议 */
  apiSource: APISource;
}

/**
 * 支持的 API 类型
 */
export type APISource = 'openai' | 'anthropic' | 'ollama' | 'vllm' | 'azure' | 'custom';

/**
 * 模型采样参数
 */
export interface SamplingParameters {
  /** 温度 (0-2) */
  temperature: number;
  /** Top-P 采样 (0-1) */
  topP: number;
  /** 最大输出 tokens */
  maxTokens: number;
  /** 频率惩罚 (-2 到 2) */
  frequencyPenalty: number;
  /** 存在惩罚 (-2 到 2) */
  presencePenalty: number;
}

/**
 * 上下文设置
 */
export interface ContextSettings {
  /** 使用多少条聊天历史 (-1 表示全部) */
  maxChatHistory: number;
}

// ==================== 向量化配置 ====================

/**
 * 向量化配置
 */
export interface VectorConfig {
  /** 向量源 */
  source: VectorSource;
  /** API 端点（部分源需要） */
  apiUrl?: string;
  /** API Key（部分源需要） */
  apiKey?: string;
  /** 模型名称 */
  model?: string;
  /** 向量维度 */
  dimensions?: number;
}

/**
 * 支持的向量源
 */
export type VectorSource =
  | 'transformers'  // 本地 transformers
  | 'openai'        // OpenAI Embeddings API
  | 'ollama'        // Ollama
  | 'vllm'          // vLLM
  | 'cohere'        // Cohere
  | 'jina'          // Jina AI
  | 'voyage'        // Voyage AI
  | 'custom';       // 自定义 (OpenAI 兼容)

// ==================== Rerank 配置 ====================

/**
 * Rerank 配置
 */
export interface RerankConfig {
  /** 是否启用 */
  enabled: boolean;
  /** API 端点 */
  url: string;
  /** API Key */
  apiKey: string;
  /** 模型名称 */
  model: string;
  /** 返回的结果数量 */
  topN: number;
  /** 混合评分权重 (0-1, 0=纯向量, 1=纯Rerank) */
  hybridAlpha: number;
}

// ==================== 提示词模板 ====================

/**
 * 提示词模板分类
 */
export type PromptCategory =
  | 'summary'           // 剧情摘要 (V0.5 统一为 JSON 输出)
  | 'trim'              // 精简/修剪
  | 'preprocessing';    // 预处理 (统一分类，包含 Query 增强/剧情编排/描写增强等)

/**
 * 提示词分类选项
 */
export const PROMPT_CATEGORIES: { value: PromptCategory; label: string; description: string }[] = [
  { value: 'summary', label: '剧情摘要', description: '将对话转为结构化 JSON 事件' },
  { value: 'trim', label: '精简/修剪', description: '合并、压缩旧的事件记录' },
  { value: 'preprocessing', label: '预处理', description: '用户输入预处理（Query 增强/剧情编排/描写增强等）' },
];

/**
 * 提示词模板
 */
export interface PromptTemplate {
  /** 唯一标识 */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板分类 */
  category: PromptCategory;
  /** 是否启用（每个分类可以有多个模板，但只有一个启用的会被使用） */
  enabled: boolean;
  /** 是否为内置模板（内置模板不可删除） */
  isBuiltIn: boolean;
  /** 绑定的 LLM 预设 ID，null 表示使用默认预设 */
  boundPresetId: string | null;
  /** 系统提示词 */
  systemPrompt: string;
  /** 用户提示词模板，支持变量 {{chatHistory}}, {{context}} 等 */
  userPromptTemplate: string;
  /** 输出格式 */
  outputFormat: 'json' | 'markdown' | 'plain';
  /** 可用变量列表 */
  availableVariables: string[];
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}

/**
 * 提示词模板导出格式（单个模板）
 */
export interface PromptTemplateSingleExport {
  version: string;
  exportedAt: number;
  template: Omit<PromptTemplate, 'id' | 'isBuiltIn' | 'enabled' | 'createdAt' | 'updatedAt'>;
}

/**
 * 提示词模板导出格式（批量）
 */
export interface PromptTemplateExport {
  version: string;
  exportedAt: number;
  templates: Omit<PromptTemplate, 'id' | 'isBuiltIn' | 'enabled' | 'createdAt' | 'updatedAt'>[];
}

// ==================== 世界书配置 ====================

/**
 * 世界书配置
 */
export interface WorldbookConfig {
  /** 是否启用世界书 */
  enabled: boolean;
  /** 是否包含全局世界书（相当于全选/全不选） */
  includeGlobal: boolean;
  /** 全局世界书黑名单（被禁用的世界书名称列表） */
  disabledWorldbooks: string[];
  /** 是否启用 EJS 模板 (ST-Prompt-Template 兼容) */
  enableEJS?: boolean;
}

// ==================== 精简配置 ====================

/**
 * 精简触发器类型
 */
export type TrimTriggerType = 'token' | 'count';

/**
 * 精简配置（二层总结）
 */
export interface TrimConfig {
  /** 是否启用精简 */
  enabled: boolean;
  /** 触发器类型 */
  trigger: TrimTriggerType;
  /** Token 上限（trigger='token' 时使用） */
  tokenLimit: number;
  /** 总结次数上限（trigger='count' 时使用） */
  countLimit: number;
  /** 保留最近 N 条不合并 */
  keepRecentCount?: number;
  /** 是否保留原始条目（禁用而非删除） */
  preserveOriginal?: boolean;
  /** 是否启用预览确认 */
  previewEnabled?: boolean;
}

// ==================== 嵌入配置 ====================

/**
 * 嵌入触发器类型
 * - 'with_trim': 与 Trim 联动，Trim 时自动嵌入
 * - 'standalone': 独立触发，使用与 Trim 相同的阈值
 * - 'manual': 仅手动触发
 */
export type EmbeddingTriggerType = 'with_trim' | 'standalone' | 'manual';

/**
 * 嵌入配置
 */
export interface EmbeddingConfig {
  /** 是否启用嵌入 */
  enabled: boolean;
  /** 触发器类型 */
  trigger: EmbeddingTriggerType;
  /** 并发数 (1-20) */
  concurrency: number;
  /** 保留最近 N 条不嵌入 (与 Trim.keepRecentCount 共享) */
  keepRecentCount?: number;
}

/**
 * 全局正则配置 (V0.8)
 */
export interface GlobalRegexConfig {
  /** 是否启用酒馆原生 Regex (SillyTavern) */
  enableNativeRegex: boolean;
  /** 是否启用 Engram 内部 Regex */
  enableEngramRegex: boolean;
}

/**
 * 默认全局正则配置
 */
export const DEFAULT_REGEX_CONFIG: GlobalRegexConfig = {
  enableNativeRegex: true,
  enableEngramRegex: true,
};

// ==================== RAG 召回配置 (V0.8.5) ====================

/**
 * 召回模式
 * - full: 预处理 + Embedding + Rerank (顶配)
 * - standard: Embedding + Rerank (标准)
 * - light: 仅 Embedding (轻量)
 * - llm_only: LLM 直接召回 (暴力，无向量模型兜底)
 */
export type RecallMode = 'full' | 'standard' | 'light' | 'llm_only';

/**
 * 召回配置 (V0.8.5)
 */
export interface RecallConfig {
  /** 是否启用召回 */
  enabled: boolean;
  /** 召回模式 */
  mode: RecallMode;
  /** Embedding 设置 */
  embedding: {
    /** 初筛数量 (Top-K) */
    topK: number;
    /** 最低相似度阈值 (0-1) */
    minScoreThreshold: number;
  };
  /** 黏性系统设置 */
  sticky?: {
    /** 是否启用 */
    enabled: boolean;
    /** 衰减系数：每次连续召回增加的惩罚 (0-1) */
    decayFactor: number;
    /** 最大停留轮数：超过此轮数不再惩罚 */
    maxStickRounds: number;
  };
  // 注: Rerank 设置复用 RerankConfig，不在此重复定义
}

/**
 * 默认召回配置
 */
export const DEFAULT_RECALL_CONFIG: RecallConfig = {
  enabled: false,
  mode: 'standard',
  embedding: {
    topK: 20,
    minScoreThreshold: 0.3,
  },
  sticky: {
    enabled: true,
    decayFactor: 0.15,
    maxStickRounds: 3,
  },
};

// ==================== 完整配置 ====================

/**
 * Engram API 配置（完整）
 */
export interface EngramAPISettings {
  /** LLM 预设列表 */
  llmPresets: LLMPreset[];
  /** 当前选中的 LLM 预设 ID（作为默认预设） */
  selectedPresetId: string | null;
  /** 向量化配置 */
  vectorConfig: VectorConfig;
  /** Rerank 配置 */
  rerankConfig: RerankConfig;
  /** 提示词模板列表 */
  promptTemplates: PromptTemplate[];
  /** 世界书配置 */
  worldbookConfig: WorldbookConfig;
  /** 正则配置 (V0.8) */
  regexConfig: GlobalRegexConfig;
  /** 精简配置（可选，二层总结） */
  trimConfig?: TrimConfig;
  /** V0.7: 嵌入配置 */
  embeddingConfig?: EmbeddingConfig;
  /** V0.8.5: 召回配置 */
  recallConfig?: RecallConfig;
}

// ==================== 默认值 ====================

/**
 * 默认采样参数
 */
export const DEFAULT_SAMPLING_PARAMETERS: SamplingParameters = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

/**
 * 默认上下文设置
 */
export const DEFAULT_CONTEXT_SETTINGS: ContextSettings = {
  maxChatHistory: 10,
};

/**
 * 默认向量化配置
 */
export const DEFAULT_VECTOR_CONFIG: VectorConfig = {
  source: 'transformers',
};

/**
 * 默认 Rerank 配置
 */
export const DEFAULT_RERANK_CONFIG: RerankConfig = {
  enabled: false,
  url: '',
  apiKey: '',
  model: '',
  topN: 5,
  hybridAlpha: 0.5,
};

/**
 * V0.7: 默认嵌入配置
 */
export const DEFAULT_EMBEDDING_CONFIG: EmbeddingConfig = {
  enabled: false,
  trigger: 'with_trim',
  concurrency: 5,
  keepRecentCount: 3,
};

/**
 * 创建默认 LLM 预设
 */
export function createDefaultLLMPreset(name: string = '默认预设'): LLMPreset {
  const now = Date.now();
  return {
    id: `preset_${now}`,
    name,
    source: 'tavern',
    parameters: { ...DEFAULT_SAMPLING_PARAMETERS },
    context: { ...DEFAULT_CONTEXT_SETTINGS },
    isDefault: true,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 创建提示词模板
 */
export function createPromptTemplate(
  name: string,
  category: PromptCategory,
  options: Partial<Omit<PromptTemplate, 'id' | 'name' | 'category' | 'createdAt' | 'updatedAt'>> = {}
): PromptTemplate {
  const now = Date.now();
  return {
    id: `template_${now}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    category,
    enabled: options.enabled ?? false,
    isBuiltIn: options.isBuiltIn ?? false,
    boundPresetId: options.boundPresetId ?? null,
    systemPrompt: options.systemPrompt ?? '',
    userPromptTemplate: options.userPromptTemplate ?? '',
    outputFormat: options.outputFormat ?? 'plain',
    availableVariables: options.availableVariables ?? ['{{chatHistory}}', '{{context}}', '{{char}}', '{{user}}'],
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 内置提示词模板
 */
export function getBuiltInPromptTemplates(): PromptTemplate[] {
  return [
    createPromptTemplate('剧情摘要', 'summary', {
      enabled: true,
      isBuiltIn: true,
      systemPrompt: summaryPrompt,
      userPromptTemplate: `{{worldbookContext}}
请将以下对话内容总结为结构化事件：

{{chatHistory}}

---
请按要求输出 JSON 格式的剧情总结：`,
      outputFormat: 'json',
    }),
    createPromptTemplate('记忆精简', 'trim', {
      enabled: true,
      isBuiltIn: true,
      systemPrompt: trimPrompt,
      userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

请将以下多条剧情摘要合并精简：

{{engramSummaries}}

请输出一条精简后的综合摘要。`,
      outputFormat: 'json',
    }),
    createPromptTemplate('Query 增强', 'preprocessing', {
      enabled: true,
      isBuiltIn: true,
      systemPrompt: queryEnhancePrompt,
      userPromptTemplate: `**世界书激活内容**:
{{worldbookContext}}

**最近对话历史**:
{{chatHistory}}

**用户本轮输入**:
{{userInput}}

---
请根据以上信息，输出扩展后的检索查询词。`,
      outputFormat: 'plain',
      availableVariables: ['{{worldbookContext}}', '{{chatHistory}}', '{{userInput}}', '{{char}}', '{{user}}'],
    }),
    createPromptTemplate('剧情编排', 'preprocessing', {
      enabled: false,  // 默认不启用，用户按需开启
      isBuiltIn: true,
      systemPrompt: plotDirectorPrompt,
      userPromptTemplate: `**世界书激活内容**:
{{worldbookContext}}

**最近对话历史**:
{{chatHistory}}

**用户本轮输入**:
{{userInput}}

---
请根据以上信息，进行剧情规划并输出导演指令框架。`,
      outputFormat: 'plain',
      availableVariables: ['{{worldbookContext}}', '{{context}}', '{{chatHistory}}', '{{userInput}}', '{{char}}', '{{user}}'],
    }),
    createPromptTemplate('描写增强', 'preprocessing', {
      enabled: false,  // 默认不启用，用户按需开启
      isBuiltIn: true,
      systemPrompt: descriptionPrompt,
      userPromptTemplate: `**最近对话历史**:
{{chatHistory}}

**用户本轮输入**:
{{userInput}}

---
请根据以上信息，输出增强后的描写内容。`,
      outputFormat: 'plain',
      availableVariables: ['{{context}}', '{{chatHistory}}', '{{userInput}}', '{{char}}', '{{user}}'],
    }),
  ];
}

/**
 * 通过分类获取内置模板的默认值
 * @param category 模板分类
 * @returns 内置模板的默认值，如果不存在返回 null
 */
export function getBuiltInTemplateByCategory(category: PromptCategory): PromptTemplate | null {
  return getBuiltInPromptTemplates().find(t => t.category === category) || null;
}


/**
 * 默认世界书配置
 */
export const DEFAULT_WORLDBOOK_CONFIG: WorldbookConfig = {
  enabled: true,
  includeGlobal: true,
  disabledWorldbooks: [],
  enableEJS: true, // V0.8 默认启用 EJS
};

/**
 * 默认精简配置
 */
export const DEFAULT_TRIM_CONFIG: TrimConfig = {
  enabled: false,
  trigger: 'token',
  tokenLimit: 4096,
  countLimit: 5,
  keepRecentCount: 3,
  preserveOriginal: false,
  previewEnabled: true,
};

/**
 * 获取默认 API 设置
 */
export function getDefaultAPISettings(): EngramAPISettings {
  return {
    llmPresets: [createDefaultLLMPreset()],
    selectedPresetId: null,
    vectorConfig: { ...DEFAULT_VECTOR_CONFIG },
    rerankConfig: { ...DEFAULT_RERANK_CONFIG },
    promptTemplates: getBuiltInPromptTemplates(),
    worldbookConfig: { ...DEFAULT_WORLDBOOK_CONFIG },
    regexConfig: { ...DEFAULT_REGEX_CONFIG }, // V0.8
    recallConfig: { ...DEFAULT_RECALL_CONFIG }, // V0.8.5
  };
}


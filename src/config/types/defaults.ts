// Re-export types for convenience
export type { SamplingParameters, ContextSettings, LLMPreset } from './llm';
export type { BrainRecallConfig, RecallConfig, VectorConfig, RerankConfig, EmbeddingConfig } from './rag';
export type { EntityExtractConfig, GlobalRegexConfig, TrimConfig } from './memory';
export type { CustomMacro, PromptTemplate, WorldbookConfig, PromptCategory } from './prompt';
export { PROMPT_CATEGORIES } from './prompt';

import { DEFAULT_STICKY_CONFIG } from '@/modules/rag/retrieval/StickyCache';
import { SamplingParameters, ContextSettings, LLMPreset } from './llm';
import { BrainRecallConfig, RecallConfig, VectorConfig, RerankConfig, EmbeddingConfig } from './rag';
import { EntityExtractConfig, GlobalRegexConfig, TrimConfig } from './memory';
import { CustomMacro, PromptTemplate, WorldbookConfig, PromptCategory, PROMPT_CATEGORIES } from './prompt';

// Import prompts from original location (will be moved in Phase 7)
import summaryPrompt from '@/integrations/llm/prompts/summary_prompt.txt?raw';
import trimPrompt from '@/integrations/llm/prompts/trim.txt?raw';
import queryEnhancePrompt from '@/integrations/llm/prompts/query_enhance.txt?raw';
import plotDirectorPrompt from '@/integrations/llm/prompts/plot_director.txt?raw';
import descriptionPrompt from '@/integrations/llm/prompts/description.txt?raw';
import entityExtractionPrompt from '@/integrations/llm/prompts/entity_extraction.txt?raw';

export const DEFAULT_SAMPLING_PARAMETERS: SamplingParameters = {
    temperature: 0.7,
    topP: 0.95,
    maxTokens: 2048,
    frequencyPenalty: 0,
    presencePenalty: 0,
};

export const DEFAULT_CONTEXT_SETTINGS: ContextSettings = {
    maxChatHistory: 10,
};

export const DEFAULT_VECTOR_CONFIG: VectorConfig = {
    source: 'transformers',
};

export const DEFAULT_RERANK_CONFIG: RerankConfig = {
    enabled: false,
    url: '',
    apiKey: '',
    model: '',
    topN: 5,
    hybridAlpha: 0.5,
};

export const DEFAULT_BRAIN_RECALL_CONFIG: BrainRecallConfig = {
    enabled: false, // 默认关闭，实验性功能
    workingLimit: 10,        // 工作记忆：当前轮使用的
    shortTermLimit: 35,      // 短期记忆：缓存上限 (35 约 3-4 轮累积)
    reinforceFactor: 0.2,    // 强化系数
    decayRate: 0.08,         // 衰减速率 (稍慢，保留更多)
    evictionThreshold: 0.25, // 淘汰阈值 (降低，保留更多)
    contextSwitchThreshold: 0.4,
};

export const DEFAULT_RECALL_CONFIG: RecallConfig = {
    enabled: true,
    useEmbedding: true,
    useRerank: false,
    usePreprocessing: false,
    useBruteForce: false,
    embedding: {
        topK: 50,               // Embedding 初筛 50 条
        minScoreThreshold: 0.35, // 过滤阈值 (稍高，过滤不相关)
    },
    sticky: { ...DEFAULT_STICKY_CONFIG, enabled: false }, // 默认关闭旧版
    brainRecall: DEFAULT_BRAIN_RECALL_CONFIG,
};

export const DEFAULT_EMBEDDING_CONFIG: EmbeddingConfig = {
    enabled: false,
    trigger: 'with_trim',
    concurrency: 5,
    keepRecentCount: 3,
};

export const DEFAULT_ENTITY_CONFIG: EntityExtractConfig = {
    enabled: false,
    trigger: 'floor',
    floorInterval: 15,     // V0.9.5: 10-20 层一次
    keepRecentCount: 5,
};

export const DEFAULT_REGEX_CONFIG: GlobalRegexConfig = {
    enableNativeRegex: true,
    enableEngramRegex: true,
};

export const DEFAULT_CUSTOM_MACROS: CustomMacro[] = [
    {
        id: 'custom_user_profile',
        name: '用户画像',
        content: '',  // 空内容，用户自行填写
        enabled: true,
        createdAt: Date.now(),
    },
];

export const DEFAULT_WORLDBOOK_CONFIG: WorldbookConfig = {
    enabled: true,
    includeGlobal: true,
    disabledWorldbooks: [],
    enableEJS: true, // V0.8 默认启用 EJS
};

export const DEFAULT_TRIM_CONFIG: TrimConfig = {
    enabled: false,
    trigger: 'token',
    tokenLimit: 4096,
    countLimit: 5,
    keepRecentCount: 3,
    preserveOriginal: false,
    previewEnabled: true,
};

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
    /** V0.9: 实体提取配置 */
    entityExtractConfig?: EntityExtractConfig;
    /** V0.9.2: 自定义宏 */
    customMacros?: CustomMacro[];
}


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
    options: Partial<Omit<PromptTemplate, 'name' | 'category' | 'createdAt' | 'updatedAt'>> & { id?: string } = {}
): PromptTemplate {
    const now = Date.now();
    return {
        id: options.id || `template_${now}_${Math.random().toString(36).slice(2, 8)}`,
        name,
        category,
        enabled: options.enabled ?? false,
        isBuiltIn: options.isBuiltIn ?? false,
        boundPresetId: options.boundPresetId ?? null,
        systemPrompt: options.systemPrompt ?? '',
        userPromptTemplate: options.userPromptTemplate ?? '',
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
            id: 'builtin_summary',
            enabled: true,
            isBuiltIn: true,
            systemPrompt: summaryPrompt,
            userPromptTemplate: `**角色设定**:
{{context}}

**用户人设**:
{{userPersona}}

**世界书**:
{{worldbookContext}}

**已有剧情摘要**:
{{engramSummaries}}

---
请将以下对话内容总结为结构化事件：

{{chatHistory}}

请按要求输出 JSON 格式的剧情总结：`,
        }),
        createPromptTemplate('记忆精简', 'trim', {
            id: 'builtin_trim',
            enabled: true,
            isBuiltIn: true,
            systemPrompt: trimPrompt,
            userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

请将以下多条剧情摘要合并精简：

{{engramSummaries}}

请输出一条精简后的综合摘要。`,
        }),
        createPromptTemplate('Query 增强', 'preprocessing', {
            id: 'builtin_query_enhance',
            enabled: true,
            isBuiltIn: true,
            systemPrompt: queryEnhancePrompt,
            userPromptTemplate: `**角色设定**:
{{context}}

**用户人设**:
{{userPersona}}

**世界书激活内容**:
{{worldbookContext}}

**已有剧情摘要**:
{{engramSummaries}}

**最近对话历史**:
{{chatHistory}}

**用户本轮输入**:
{{userInput}}

---
请根据以上信息，输出扩展后的检索查询词。`,
            injectionMode: 'append', // 默认追加到用户输入后
        }),
        createPromptTemplate('剧情编排', 'preprocessing', {
            id: 'builtin_plot_director',
            enabled: false,  // 默认不启用，用户按需开启
            isBuiltIn: true,
            systemPrompt: plotDirectorPrompt,
            userPromptTemplate: `**角色设定**:
{{context}}

**用户人设**:
{{userPersona}}

**世界书激活内容**:
{{worldbookContext}}

**已有剧情摘要**:
{{engramSummaries}}

**最近对话历史**:
{{chatHistory}}

**用户本轮输入**:
{{userInput}}

---
请根据以上信息，进行剧情规划并输出导演指令框架。`,
            injectionMode: 'append', // 剧情编排通常是给 AI 的指令，追加在用户输入后
        }),
        createPromptTemplate('描写增强', 'preprocessing', {
            id: 'builtin_description_enhance',
            enabled: false,  // 默认不启用，用户按需开启
            isBuiltIn: true,
            systemPrompt: descriptionPrompt,
            userPromptTemplate: `**角色设定**:
{{context}}

**用户人设**:
{{userPersona}}

**已有剧情摘要**:
{{engramSummaries}}

**最近对话历史**:
{{chatHistory}}

**用户本轮输入**:
{{userInput}}

---
请根据以上信息，输出增强后的描写内容。`,
            injectionMode: 'replace', // 描写增强通常是完全重写用户的输入
        }),
        // V0.9: 实体提取模板
        createPromptTemplate('实体提取', 'entity_extraction', {
            id: 'builtin_entity_extraction',
            enabled: false,  // 默认不启用，用户按需开启
            isBuiltIn: true,
            systemPrompt: entityExtractionPrompt,
            userPromptTemplate: `
**世界书激活内容**:
{{worldbookContext}}

**已有剧情摘要**:
{{engramSummaries}}

以上是背景设定和剧情摘要

**已经存在的待更新的实体**:
{{engramEntityStates}}

请从以下最新的事件数据中提取和更新实体和关系：

**最近对话历史**:
{{chatHistory}}

**用户本轮输入**:
{{userInput}}

---
请按JSON patch格式对实体和关系数据进行注册和更新。`,
        }),
    ];
}

/**
 * 通过 ID 获取内置模板
 * @param id 模板 ID
 * @returns 内置模板，如果不存在返回 undefined
 */
export function getBuiltInTemplateById(id: string): PromptTemplate | undefined {
    return getBuiltInPromptTemplates().find(t => t.id === id);
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
        customMacros: [...DEFAULT_CUSTOM_MACROS], // V0.9.2
    };
}

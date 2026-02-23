// Re-export types for convenience
export type { LLMPreset } from './llm';
export type { EntityExtractConfig, GlobalRegexConfig, TrimConfig } from './memory';
export type { CustomMacro, PromptCategory, PromptTemplate, WorldbookConfig, WorldbookConfigProfile } from './prompt';
export type { EmbeddingConfig, RecallConfig, RerankConfig, VectorConfig } from './rag';
;


import { ContextSettings, LLMPreset, SamplingParameters } from './llm';
import { EntityExtractConfig, GlobalRegexConfig, TrimConfig } from './memory';
import { CustomMacro, PromptCategory, PromptTemplate, WorldbookConfig, WorldbookConfigProfile } from './prompt';
import { BrainRecallConfig, EmbeddingConfig, RecallConfig, RerankConfig, VectorConfig } from './rag';

// Import prompts from original location (will be moved in Phase 7)
// Removed: raw text imports replaced by YAML loader

const DEFAULT_SAMPLING_PARAMETERS: SamplingParameters = {
    temperature: 1.0,
    topP: 0.98,
    maxTokens: 60000,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxContext: 150000,
};

const DEFAULT_CONTEXT_SETTINGS: ContextSettings = {
    maxChatHistory: 10,
};

const DEFAULT_VECTOR_CONFIG: VectorConfig = {
    source: 'transformers',
};

const DEFAULT_RERANK_CONFIG: RerankConfig = {
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

    // V1.2 Defaults
    gateThreshold: 0.6,      // 只有 Rerank > 0.6 才强化
    maxDamping: 0.1,         // 单次最多 +0.1
    sigmoidTemperature: 0.15,// 这里 0.15 比较适中

    // V1.3 Defaults
    boredomThreshold: 5,     // 连续 5 次进 Working Memory 就开始嫌烦
    boredomPenalty: 0.1,     // 每次额外扣 0.1 (累积)
    mmrThreshold: 0.85,      // 相似度 > 0.85 视为冗余
    newcomerBoost: 0.2,      // 给新人 0.2 的红利 (临时排序加成)
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

const DEFAULT_REGEX_CONFIG: GlobalRegexConfig = {
    enableNativeRegex: true,
    enableEngramRegex: true,
};

const DEFAULT_CUSTOM_MACROS: CustomMacro[] = [
    {
        id: 'custom_user_profile',
        name: '用户画像',
        content: '',  // 空内容，用户自行填写
        enabled: true,
        createdAt: Date.now(),
    },
];

const DEFAULT_WORLDBOOK_CONFIG: WorldbookConfig = {
    enabled: true,
    includeGlobal: true,
    disabledWorldbooks: ['engram'],
    enableEJS: true, // V0.8 默认启用 EJS
};

const DEFAULT_TRIM_CONFIG: TrimConfig = {
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
    /** V1.1.0: 世界书配置方案 */
    worldbookProfiles?: WorldbookConfigProfile[];
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
        injectionMode: options.injectionMode, // Fix: Ensure injectionMode is preserved
        createdAt: now,
        updatedAt: now,
    };
}

import { PromptLoader } from '@/integrations/llm/PromptLoader';

/**
 * 内置提示词模板
 */
export function getBuiltInPromptTemplates(): PromptTemplate[] {
    // 确保已加载
    PromptLoader.init();
    return PromptLoader.getBuiltInTemplates();
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
        worldbookProfiles: [], // V1.1.0
    };
}

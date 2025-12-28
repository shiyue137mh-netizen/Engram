/**
 * Engram API 配置类型定义
 */

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
    /** 是否包含世界书设定 */
    includeWorldInfo: boolean;
    /** 世界书 token 预算 */
    worldInfoBudget: number;
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
    | 'voyage';       // Voyage AI

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
    | 'text_summary'      // 纯文本总结
    | 'vector_summary'    // 向量化总结
    | 'trim'              // 精简/修剪
    | 'query_enhance';    // 用户输入加强

/**
 * 提示词分类选项
 */
export const PROMPT_CATEGORIES: { value: PromptCategory; label: string; description: string }[] = [
    { value: 'text_summary', label: '纯文本总结', description: '将对话转为世界书条目' },
    { value: 'vector_summary', label: '向量化总结', description: '输出结构化 JSON，含实体/关系' },
    { value: 'trim', label: '精简/修剪', description: '合并、压缩旧的世界书条目' },
    { value: 'query_enhance', label: '用户输入加强', description: '扩展用户输入，解决指代问题' },
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
    /** 是否包含全局世界书（false 则只读取角色世界书） */
    includeGlobal: boolean;
}

// ==================== 精简配置 ====================

/**
 * 精简触发器类型
 */
export type TrimTriggerType = 'token' | 'floor' | 'count';

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
    /** 楼层上限（trigger='floor' 时使用） */
    floorLimit: number;
    /** 总结次数上限（trigger='count' 时使用） */
    countLimit: number;
}

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
    /** 精简配置（可选，二层总结） */
    trimConfig?: TrimConfig;
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
    includeWorldInfo: true,
    worldInfoBudget: 2048,
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
        createPromptTemplate('纯文本剧情总结', 'text_summary', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: '你是一个专业的剧情总结助手。请将对话内容总结为简洁的剧情摘要，保留关键情节和角色互动。',
            userPromptTemplate: '请总结以下对话内容：\n\n{{chatHistory}}\n\n请输出一段简洁的剧情摘要，格式如下：\n📜 剧情摘要:\n[摘要内容]',
            outputFormat: 'markdown',
        }),
        createPromptTemplate('向量化剧情总结', 'vector_summary', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: '你是一个结构化信息提取助手。请从对话中提取关键信息，包括事件摘要、涉及的实体和它们之间的关系。',
            userPromptTemplate: '请从以下对话中提取结构化信息：\n\n{{chatHistory}}\n\n请以 JSON 格式输出，包含：\n- summary: 事件摘要\n- entities: 实体列表 [{name, type}]\n- relations: 关系列表 [{subject, predicate, object}]\n- keywords: 关键词列表',
            outputFormat: 'json',
        }),
        createPromptTemplate('记忆精简', 'trim', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: '你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。',
            userPromptTemplate: '请将以下多条剧情摘要合并精简：\n\n{{context}}\n\n请输出一条精简后的综合摘要。',
            outputFormat: 'markdown',
        }),
        createPromptTemplate('查询增强', 'query_enhance', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: '你是一个查询理解助手。请分析用户的输入，识别其中的指代词（如"那件事"、"他"等），并扩展为更明确的查询词。',
            userPromptTemplate: '用户输入：{{userInput}}\n\n最近对话上下文：\n{{context}}\n\n请输出扩展后的查询关键词列表，用于检索相关记忆。',
            outputFormat: 'plain',
        }),
    ];
}

/**
 * 默认世界书配置
 */
export const DEFAULT_WORLDBOOK_CONFIG: WorldbookConfig = {
    enabled: true,
    includeGlobal: true,
};

/**
 * 默认精简配置
 */
export const DEFAULT_TRIM_CONFIG: TrimConfig = {
    enabled: false,
    trigger: 'token',
    tokenLimit: 4096,
    floorLimit: 50,
    countLimit: 5,
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
    };
}


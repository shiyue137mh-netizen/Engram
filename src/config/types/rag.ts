

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
    /** 自动添加 URL 后缀 (默认 true) */
    autoSuffix?: boolean;
}

export type VectorSource =
    | 'transformers'  // 本地 transformers
    | 'openai'        // OpenAI Embeddings API
    | 'ollama'        // Ollama
    | 'vllm'          // vLLM
    | 'cohere'        // Cohere
    | 'jina'          // Jina AI
    | 'voyage'        // Voyage AI
    | 'custom';       // 自定义 (OpenAI 兼容)

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
    /** 自动添加 URL 后缀 (默认 true) */
    autoSuffix?: boolean;
}

export interface BrainRecallConfig {
    /** 是否启用 */
    enabled: boolean;

    // 容量配置
    /** 工作记忆容量 (当前轮使用的) */
    workingLimit: number;
    /** 短期记忆容量 (近几轮召回过的) */
    shortTermLimit: number;

    // 强化/衰减参数
    /** 再次召回的强化系数 */
    reinforceFactor: number;
    /** 每轮衰减速率 */
    decayRate: number;
    /** 淘汰阈值 (低于此值移出短期记忆) */
    evictionThreshold: number;

    // 上下文感知
    /** 上下文切换阈值 (当前分/首次分 < 此值触发 softReset) */
    contextSwitchThreshold: number;
}

export interface RecallConfig {
    /** 是否启用 RAG 召回系统 (总开关) */
    enabled: boolean;

    /** 策略 1: 是否使用 Embedding 语义检索 */
    useEmbedding: boolean;

    /** 策略 2: 是否使用 Rerank 重排序 */
    useRerank: boolean;

    /** 策略 3: 是否使用 LLM 预处理 (Query 增强/剧情编排) */
    usePreprocessing: boolean;

    /** 策略 4: 是否使用暴力召回 (滚动窗口) */
    useBruteForce: boolean;

    /** Embedding 详细配置 */
    embedding?: {
        topK: number;
        minScoreThreshold: number;
    };



    /** 类脑召回配置 (V0.9.5 实验性) */
    brainRecall?: BrainRecallConfig;
}

export type EmbeddingTriggerType = 'with_trim' | 'standalone' | 'manual';

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

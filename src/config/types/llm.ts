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

export type APISource = 'openai' | 'anthropic' | 'ollama' | 'vllm' | 'azure' | 'custom';

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

export interface ContextSettings {
    /** 使用多少条聊天历史 (-1 表示全部) */
    maxChatHistory: number;
}

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

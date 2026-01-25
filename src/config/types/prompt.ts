export type PromptCategory =
    | 'summary'           // 剧情摘要 (V0.5 统一为 JSON 输出)
    | 'trim'              // 精简/修剪
    | 'preprocessing'     // 预处理 (统一分类，包含 Query 增强/剧情编排/描写增强等)
    | 'entity_extraction'; // V0.9: 实体提取

export const PROMPT_CATEGORIES: { value: PromptCategory; label: string; description: string }[] = [
    { value: 'summary', label: '剧情摘要', description: '将对话转为结构化 JSON 事件' },
    { value: 'trim', label: '精简/修剪', description: '合并、压缩旧的事件记录' },
    { value: 'preprocessing', label: '预处理', description: '用户输入预处理（Query 增强/剧情编排/描写增强等）' },
    { value: 'entity_extraction', label: '实体提取', description: '从事件中提取角色、地点、物品等实体' },
];

export interface CustomMacro {
    /** 唯一标识 */
    id: string;
    /** 宏名称（不含花括号，如 "用户画像"） */
    name: string;
    /** 宏内容 */
    content: string;
    /** 是否启用 */
    enabled: boolean;
    /** 创建时间 */
    createdAt: number;
}

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
    /** 绑定的世界书配置 ID，null 表示使用全局配置 */
    boundWorldbookProfileId?: string | null;
    /** 系统提示词 */
    systemPrompt: string;
    /** 用户提示词模板，支持变量 {{chatHistory}}, {{context}} 等 */
    userPromptTemplate: string;
    /** 注入模式: 'replace'=覆盖用户输入, 'append'=追加到用户输入之后, 'prepend'=添加到用户输入之前 */
    injectionMode?: 'replace' | 'append' | 'prepend';
    /** 创建时间 */
    createdAt: number;
    /** 更新时间 */
    updatedAt: number;
}

export interface PromptTemplateSingleExport {
    version: string;
    exportedAt: number;
    template: Omit<PromptTemplate, 'id' | 'isBuiltIn' | 'enabled' | 'createdAt' | 'updatedAt'>;
}

interface PromptTemplateExport {
    version: string;
    exportedAt: number;
    templates: Omit<PromptTemplate, 'id' | 'isBuiltIn' | 'enabled' | 'createdAt' | 'updatedAt'>[];
}

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

export interface WorldbookConfigProfile {
    id: string;
    name: string;
    description?: string; // For future LLM routing
    mode: 'inherit_global' | 'custom';
    selectedWorldbooks: string[]; // Whitelist of worldbook names
    createdAt: number;
    updatedAt: number;
}

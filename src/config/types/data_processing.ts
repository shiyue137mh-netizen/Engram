/**
 * Data Processing Configuration Types
 * 数据及其预处理相关的配置类型定义
 *
 * Moved from modules layer to config layer to prevent dependency cycles.
 */

// ==================== Regular Expression Rules ====================

/** 正则规则作用域 */
export type RegexScope = 'input' | 'output' | 'both';

/** 正则规则定义 */
export interface RegexRule {
    /** 唯一 ID */
    id: string;
    /** 规则名称 */
    name: string;
    /** 正则表达式 */
    pattern: string;
    /** 替换文本 */
    replacement: string;
    /** 是否启用 */
    enabled: boolean;
    /** 正则标志 (g, i, m, s) */
    flags: string;
    /** 作用域：input=清洗发给LLM的内容，output=清洗LLM返回的内容，both=两者都应用 */
    scope: RegexScope;
    /** 描述 */
    description?: string;
}

/** 作用域选项 (常量) */
export const REGEX_SCOPE_OPTIONS: { value: RegexScope; label: string; description: string }[] = [
    { value: 'input', label: '输入', description: '清洗发给 LLM 的聊天内容' },
    { value: 'output', label: '输出', description: '清洗 LLM 返回的内容（预览/写入前）' },
    { value: 'both', label: '两者', description: '输入和输出都应用' },
];

/** 默认正则规则 */
export const DEFAULT_REGEX_RULES: RegexRule[] = [
    {
        id: 'remove-think',
        name: '移除思维链',
        pattern: '<think(?:\\s+[^>]*)?>[\\s\\S]*?<\\/think\\s*>',
        replacement: '',
        enabled: true,
        flags: 'gi',
        scope: 'both',
        description: '移除 LLM 输出中的 <think>...</think> 思考过程',
    },
    {
        id: 'remove-headless-think',
        name: '移除无头思维链',
        pattern: '[\\s\\S]*?<\\/think\\s*>',
        replacement: '',
        enabled: true,
        flags: 'gi',
        scope: 'both',
        description: '移除无开头标签的思维链，如直接以 </think> 结尾的内容',
    },
    {
        id: 'remove-update-variable',
        name: '移除 UpdateVariable',
        pattern: '<UpdateVariable(?:\\s+[^>]*)?>[\\s\\S]*?<\\/UpdateVariable\\s*>',
        replacement: '',
        enabled: true,
        flags: 'gi',
        scope: 'both',
        description: '移除 MVU 更新变量标签，避免污染提示词',
    },
    {
        id: 'remove-status-placeholder',
        name: '移除 StatusPlaceHolder',
        pattern: '<StatusPlaceHolderImpl(?:\\s+[^>]*)?\\s*\\/>',
        replacement: '',
        enabled: true,
        flags: 'gi',
        scope: 'both',
        description: '移除变量脚本在消息末尾添加的占位符标签',
    },
];

// ==================== Preprocessing Configuration ====================

/** 预处理配置 */
export interface PreprocessingConfig {
    /** 是否启用 */
    enabled: boolean;
    /** 当前使用的提示词模板 ID */
    templateId: string;
    /** 是否自动触发 (每次发送消息) */
    autoTrigger: boolean;
    /** 是否开启预览修订 (V0.8.6+) */
    preview: boolean;
}

/** 默认预处理配置 */
export const DEFAULT_PREPROCESSING_CONFIG: PreprocessingConfig = {
    enabled: false,
    templateId: 'query_enhance',
    autoTrigger: true,
    preview: true, // 默认开启预览
};

/**
 * RegexProcessor - 正则处理器
 *
 * 提供可配置的正则规则，用于清洗聊天内容和 LLM 输出
 *
 * 通用管道组件：可被多个模块复用
 */

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

/** 作用域选项 */
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

/**
 * 正则处理器类
 */
export class RegexProcessor {
    private rules: RegexRule[] = [];

    constructor(rules?: RegexRule[]) {
        this.rules = rules || [...DEFAULT_REGEX_RULES];
    }

    /**
     * 应用所有启用的规则处理文本
     * @param text 要处理的文本
     * @param scope 可选，只应用特定作用域的规则
     */
    process(text: string, scope?: RegexScope): string {
        let result = text;

        for (const rule of this.rules) {
            if (!rule.enabled) continue;

            // 如果指定了 scope，只应用匹配的规则
            if (scope && rule.scope !== scope && rule.scope !== 'both') {
                continue;
            }

            try {
                const regex = new RegExp(rule.pattern, rule.flags);
                result = result.replace(regex, rule.replacement);
            } catch (e) {
                console.warn(`[RegexProcessor] 规则 "${rule.name}" 执行失败:`, e);
            }
        }

        return result;
    }

    /**
     * 使用指定规则处理文本（用于预览）
     */
    processWithRule(text: string, rule: RegexRule): string {
        try {
            const regex = new RegExp(rule.pattern, rule.flags);
            return text.replace(regex, rule.replacement);
        } catch (e) {
            console.warn(`[RegexProcessor] 规则执行失败:`, e);
            return text;
        }
    }

    /**
     * 验证正则表达式是否有效
     */
    validatePattern(pattern: string, flags: string): { valid: boolean; error?: string } {
        try {
            new RegExp(pattern, flags);
            return { valid: true };
        } catch (e) {
            return {
                valid: false,
                error: e instanceof Error ? e.message : '无效的正则表达式',
            };
        }
    }

    /**
     * 获取所有规则
     */
    getRules(): RegexRule[] {
        return [...this.rules];
    }

    /**
     * 设置规则
     */
    setRules(rules: RegexRule[]): void {
        this.rules = [...rules];
    }

    /**
     * 添加规则
     */
    addRule(rule: RegexRule): void {
        this.rules.push(rule);
    }

    /**
     * 更新规则
     */
    updateRule(id: string, updates: Partial<RegexRule>): void {
        const index = this.rules.findIndex(r => r.id === id);
        if (index >= 0) {
            this.rules[index] = { ...this.rules[index], ...updates };
        }
    }

    /**
     * 删除规则
     */
    deleteRule(id: string): void {
        this.rules = this.rules.filter(r => r.id !== id);
    }

    /**
     * 启用/禁用规则
     */
    toggleRule(id: string): void {
        const rule = this.rules.find(r => r.id === id);
        if (rule) {
            rule.enabled = !rule.enabled;
        }
    }

    /**
     * 重置为默认规则
     */
    resetToDefaults(): void {
        this.rules = [...DEFAULT_REGEX_RULES];
    }

    /**
     * 获取启用的规则数量
     */
    getEnabledCount(): number {
        return this.rules.filter(r => r.enabled).length;
    }

    // ========== V0.8: 标签捕获方法 ==========

    /**
     * 捕获标签内容
     * @param text 源文本
     * @param tagName 标签名 (如 'output', 'query')
     * @returns 标签内容，未找到返回 null
     */
    captureTag(text: string, tagName: string): string | null {
        try {
            // 支持属性和空格: <tag attr="..."> content </tag>
            const regex = new RegExp(`<${tagName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tagName}\\s*>`, 'i');
            const match = text.match(regex);
            return match?.[1]?.trim() || null;
        } catch (e) {
            console.warn(`[RegexProcessor] 标签捕获失败: ${tagName}`, e);
            return null;
        }
    }

    /**
     * 移除指定标签及其内容
     * @param text 源文本
     * @param tagName 标签名
     */
    removeTag(text: string, tagName: string): string {
        try {
            // 支持属性和空格
            const regex = new RegExp(`<${tagName}(?:\\s+[^>]*)?>[\\s\\S]*?<\\/${tagName}\\s*>`, 'gi');
            return text.replace(regex, '').trim();
        } catch (e) {
            console.warn(`[RegexProcessor] 标签移除失败: ${tagName}`, e);
            return text;
        }
    }

    /**
     * 捕获多个标签内容
     * @param text 源文本
     * @param tagNames 标签名数组
     * @returns 标签内容映射
     */
    captureTags(text: string, tagNames: string[]): Record<string, string | null> {
        const result: Record<string, string | null> = {};
        for (const tag of tagNames) {
            result[tag] = this.captureTag(text, tag);
        }
        return result;
    }
}

/** 默认实例 */
export const regexProcessor = new RegexProcessor();

export default RegexProcessor;

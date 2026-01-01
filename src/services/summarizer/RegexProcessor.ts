/**
 * RegexProcessor - 正则处理器
 * 
 * 提供可配置的正则规则，用于清洗聊天内容和 LLM 输出
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

/** 默认正则规则 - 只保留 think 修剪 */
export const DEFAULT_REGEX_RULES: RegexRule[] = [
    {
        id: 'remove-think',
        name: '移除思维链',
        pattern: '<think>[\\s\\S]*?</think>',
        replacement: '',
        enabled: true,
        flags: 'gi',
        scope: 'output',
        description: '移除 LLM 输出中的 <think>...</think> 思考过程',
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
}

/** 默认实例 */
export const regexProcessor = new RegexProcessor();

export default RegexProcessor;

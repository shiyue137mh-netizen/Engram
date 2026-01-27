/**
 * RegexProcessor - 正则处理器
 *
 * 提供可配置的正则规则，用于清洗聊天内容和 LLM 输出
 *
 * 通用管道组件：可被多个模块复用
 */

import { Logger } from '@/core/logger';
import {
    RegexRule,
    RegexScope,
    DEFAULT_REGEX_RULES,
    REGEX_SCOPE_OPTIONS
} from '@/config/types/data_processing';

const MODULE = 'RegexProcessor';

// 重新导出以便其他模块使用
export type { RegexRule, RegexScope };
export { REGEX_SCOPE_OPTIONS, DEFAULT_REGEX_RULES };

/**
 * 正则处理器类
 */
export class RegexProcessor {
    private rules: RegexRule[] = [];
    private ruleRegexCache: Map<string, RegExp> = new Map();
    private tagRegexCache: Map<string, RegExp> = new Map();

    constructor(rules?: RegexRule[]) {
        this.setRules(rules || [...DEFAULT_REGEX_RULES]);
    }

    /**
     * 获取缓存的正则对象 (或重新编译)
     */
    private getCachedRuleRegex(rule: RegexRule): RegExp | null {
        // 使用 id + pattern + flags 作为 key 避免更新覆盖问题
        const cacheKey = `${rule.id}|${rule.pattern}|${rule.flags}`;

        if (this.ruleRegexCache.has(cacheKey)) {
            return this.ruleRegexCache.get(cacheKey)!;
        }

        try {
            const regex = new RegExp(rule.pattern, rule.flags);
            this.ruleRegexCache.set(cacheKey, regex);
            return regex;
        } catch (e) {
            Logger.warn(MODULE, `Invalid regex pattern for rule "${rule.name}":`, e);
            return null;
        }
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

            const regex = this.getCachedRuleRegex(rule);
            if (regex) {
                try {
                    result = result.replace(regex, rule.replacement);
                } catch (e) {
                    Logger.warn(MODULE, `Rule "${rule.name}" execution failed:`, e);
                }
            }
        }

        return result;
    }

    /**
     * 使用指定规则处理文本（用于预览）
     */
    processWithRule(text: string, rule: RegexRule): string {
        const regex = this.getCachedRuleRegex(rule);
        if (regex) {
            try {
                return text.replace(regex, rule.replacement);
            } catch (e) {
                Logger.warn(MODULE, `Rule execution failed:`, e);
            }
        }
        return text;
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
     * 设置规则 (清空缓存)
     */
    setRules(rules: RegexRule[]): void {
        this.rules = [...rules];
        this.ruleRegexCache.clear();
    }

    /**
     * 添加规则
     */
    addRule(rule: RegexRule): void {
        this.rules.push(rule);
        // 无需清空整个缓存，只需新增即可 (懒加载)
    }

    /**
     * 更新规则
     */
    updateRule(id: string, updates: Partial<RegexRule>): void {
        const index = this.rules.findIndex(r => r.id === id);
        if (index >= 0) {
            this.rules[index] = { ...this.rules[index], ...updates };
            // 简单策略：清除整个缓存，或者保留 key。
            // 由于 key 包含 content，旧 key 会自动失效残留，不影响正确性但占内存。
            // 考虑到更新频率低，清除整个缓存也无妨，或者不管它（内存泄漏风险极低）。
            // 最佳实践：清除所有缓存以防万一
            this.ruleRegexCache.clear();
        }
    }

    /**
     * 删除规则
     */
    deleteRule(id: string): void {
        this.rules = this.rules.filter(r => r.id !== id);
        this.ruleRegexCache.clear();
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
        this.setRules([...DEFAULT_REGEX_RULES]);
    }

    /**
     * 获取启用的规则数量
     */
    getEnabledCount(): number {
        return this.rules.filter(r => r.enabled).length;
    }

    // ========== V0.8: 标签捕获方法 ==========

    private getCachedTagRegex(tagName: string, type: 'capture' | 'remove'): RegExp {
        const key = `${type}:${tagName}`;
        if (this.tagRegexCache.has(key)) {
            return this.tagRegexCache.get(key)!;
        }

        let regex: RegExp;
        if (type === 'capture') {
            // 支持属性和空格: <tag attr="..."> content </tag>
            regex = new RegExp(`<${tagName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tagName}\\s*>`, 'i');
        } else {
            regex = new RegExp(`<${tagName}(?:\\s+[^>]*)?>[\\s\\S]*?<\\/${tagName}\\s*>`, 'gi');
        }

        this.tagRegexCache.set(key, regex);
        return regex;
    }

    /**
     * 捕获标签内容
     * @param text 源文本
     * @param tagName 标签名 (如 'output', 'query')
     * @returns 标签内容，未找到返回 null
     */
    captureTag(text: string, tagName: string): string | null {
        try {
            const regex = this.getCachedTagRegex(tagName, 'capture');
            const match = text.match(regex);
            return match?.[1]?.trim() || null;
        } catch (e) {
            Logger.warn(MODULE, `Failed to capture tag: ${tagName}`, e);
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
            const regex = this.getCachedTagRegex(tagName, 'remove');
            return text.replace(regex, '').trim();
        } catch (e) {
            Logger.warn(MODULE, `Failed to remove tag: ${tagName}`, e);
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


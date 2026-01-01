/**
 * TextProcessor - 文本处理工具
 * 
 * 提供 LLM 输出清洗、格式化等功能
 */

/** 正则替换规则 */
interface TrimRule {
    pattern: RegExp;
    replacement: string;
    description: string;
}

/** 默认清洗规则 */
const DEFAULT_TRIM_RULES: TrimRule[] = [
    // 移除多余空行
    { pattern: /\n{3,}/g, replacement: '\n\n', description: '多余空行' },
    // 移除行首行尾空白
    { pattern: /^[ \t]+|[ \t]+$/gm, replacement: '', description: '行首尾空白' },
    // 移除 Markdown 代码块标记（保留内容）
    { pattern: /```\w*\n?/g, replacement: '', description: 'Markdown代码块' },
    // 统一中文引号
    { pattern: /[""]/g, replacement: '"', description: '中文引号' },
    { pattern: /['']/g, replacement: "'", description: '中文单引号' },
    // 移除常见的 LLM 前缀
    { pattern: /^(好的|以下是|这是|根据对话).{0,20}[:：]\s*/gm, replacement: '', description: 'LLM前缀' },
    // 移除末尾的解释性文字
    { pattern: /\n*如果.{0,50}请.{0,30}[。！]?\s*$/g, replacement: '', description: '末尾解释' },
];

/**
 * TextProcessor 类
 * 文本处理工具集
 */
export class TextProcessor {
    private rules: TrimRule[];

    constructor(customRules?: TrimRule[]) {
        this.rules = customRules || DEFAULT_TRIM_RULES;
    }

    /**
     * 清洗 LLM 输出文本
     * @param text 原始文本
     * @returns 清洗后的文本
     */
    clean(text: string): string {
        let result = text;

        for (const rule of this.rules) {
            result = result.replace(rule.pattern, rule.replacement);
        }

        return result.trim();
    }

    /**
     * 格式化为世界书条目格式
     * @param summary 总结内容
     * @param metadata 元数据
     */
    formatAsWorldEntry(
        summary: string,
        metadata: {
            floorRange: [number, number];
            timestamp: number;
            characterName?: string;
        }
    ): string {
        const date = new Date(metadata.timestamp);
        const dateStr = date.toLocaleDateString('zh-CN');
        const floorStr = `${metadata.floorRange[0]}-${metadata.floorRange[1]}`;

        // 使用简洁格式，避免浪费 Token
        let entry = `📜 剧情摘要 [楼层${floorStr}]\n`;
        entry += summary;

        return entry;
    }

    /**
     * 提取纯文本（移除所有格式标记）
     * @param text 原始文本
     */
    extractPlainText(text: string): string {
        return text
            .replace(/```[\s\S]*?```/g, '') // 移除代码块
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接
            .replace(/[*_~`#]/g, '') // 移除 Markdown 标记
            .replace(/\n{2,}/g, '\n')
            .trim();
    }

    /**
     * 截断文本到指定长度
     * @param text 文本
     * @param maxLength 最大长度
     * @param suffix 截断后缀
     */
    truncate(text: string, maxLength: number, suffix = '...'): string {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength - suffix.length) + suffix;
    }

    /**
     * 添加自定义规则
     */
    addRule(rule: TrimRule): void {
        this.rules.push(rule);
    }

    /**
     * 获取当前规则列表
     */
    getRules(): TrimRule[] {
        return [...this.rules];
    }
}

/** 默认实例 */
export const textProcessor = new TextProcessor();

export default TextProcessor;

/**
 * Robust JSON Parser - 健壮的 JSON 解析器
 *
 * 用于从 LLM 可能不规范的输出中提取并解析 JSON。
 * 采用"漏斗"策略处理数据：
 * 1. 块提取 (Block Extraction)
 * 2. 修复与解析 (Repair & Parse)
 *
 * 注意：输入前的文本清洗（如移除 <think> 标签）应由调用方处理。
 */

export class RobustJsonParser {
    /**
     * 清洗并解析字符串中的 JSON
     * @param input 来自 LLM 的原始字符串
     * @returns 解析后的对象，如果失败则返回 null
     */
    static parse<T = any>(input: string): T | null {
        // 1. 提取 JSON 块
        const jsonString = this.extractJsonBlock(input);

        if (!jsonString) {
            console.warn('[RobustJsonParser] 未找到 JSON 数据块');
            return null;
        }

        // 2. 尝试解析
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            // 首次解析失败：尝试简单的自动修复
            const repaired = this.simpleRepair(jsonString);
            try {
                return JSON.parse(repaired);
            } catch (e2) {
                console.error('[RobustJsonParser] 解析失败:', e2);
                return null;
            }
        }
    }

    /**
     * 从字符串中提取可能的 JSON 部分
     * 优先匹配 Markdown 代码块，其次查找最外层的大括号
     */
    private static extractJsonBlock(text: string): string | null {
        // 1. 尝试匹配 Markdown 代码块
        const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (codeBlockMatch && codeBlockMatch[1]) {
            return codeBlockMatch[1].trim();
        }

        // 2. 尝试查找最外层的大括号
        const firstOpen = text.indexOf('{');
        const lastClose = text.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            return text.substring(firstOpen, lastClose + 1);
        }

        return null; // 未找到有效的 JSON 结构
    }

    /**
     * 简单的 JSON 修复逻辑
     * 修正常见的 LLM JSON 格式错误：
     * - 尾部多余逗号
     */
    private static simpleRepair(text: string): string {
        let repaired = text;

        // 1. 移除对象或数组尾部多余的逗号
        // 例如: "key": "value", } -> "key": "value" }
        repaired = repaired.replace(/,\s*([}\]])/g, '$1');

        return repaired;
    }
}

/**
 * Robust JSON Parser - 健壮的 JSON 解析器
 *
 * 用于从 LLM 可能不规范的输出中提取并解析 JSON。
 * 采用"漏斗"策略处理数据：
 * 1. 块提取 (Block Extraction)
 * 2. 修复与解析 (Repair & Parse)
 *
 * 注意：输入前的文本清洗（如移除 <think> 标签）应由调用方处理。
 * 推荐在 workflow 中使用 CleanRegex 步骤进行预处理。
 */

export class RobustJsonParser {
    /**
     * 清洗并解析字符串中的 JSON
     * @param input 来自 LLM 的原始字符串
     * @returns 解析后的对象，如果失败则返回 null
     */
    static parse<T = any>(input: string): T | null {
        // 1. 提取 JSON 块
        let jsonString = this.extractJsonBlock(input);

        if (!jsonString) {
            console.warn('[RobustJsonParser] 未找到 JSON 数据块');
            return null;
        }

        // V1.0.1: 智能封装 (Array -> Object)
        // 如果提取到的是数组 [...]，自动封装为 { events: [...] } 以适配下游消费
        if (jsonString.trim().startsWith('[')) {
            console.log('[RobustJsonParser] 检测到数组格式，尝试自动封装为 { events: [] }');
            jsonString = `{ "events": ${jsonString} }`;
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

        // 2. 尝试查找最外层的大括号 (Object)
        const firstOpenBrace = text.indexOf('{');
        const lastCloseBrace = text.lastIndexOf('}');

        // 3. 尝试查找最外层的方括号 (Array) - V1.0.1
        const firstOpenBracket = text.indexOf('[');
        const lastCloseBracket = text.lastIndexOf(']');

        // 比较哪个出现得更早且有效
        let foundObject = (firstOpenBrace !== -1 && lastCloseBrace !== -1 && lastCloseBrace > firstOpenBrace);
        let foundArray = (firstOpenBracket !== -1 && lastCloseBracket !== -1 && lastCloseBracket > firstOpenBracket);

        // 如果两者都存在，取最外层的（索引更小的）
        // 实际上很少混合，通常是二选一
        if (foundObject && foundArray) {
            if (firstOpenBrace < firstOpenBracket) {
                return text.substring(firstOpenBrace, lastCloseBrace + 1);
            } else {
                return text.substring(firstOpenBracket, lastCloseBracket + 1);
            }
        }

        if (foundObject) {
            return text.substring(firstOpenBrace, lastCloseBrace + 1);
        }

        if (foundArray) {
            return text.substring(firstOpenBracket, lastCloseBracket + 1);
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

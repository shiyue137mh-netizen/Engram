/**
 * RegexProcessor.captureTags 单元测试
 *
 * 测试 XML 标签提取逻辑：
 * - 单标签提取
 * - 多标签同时提取
 * - Agentic RAG 的 recall_decision 标签
 * - 边界条件
 */
import { describe, expect, it } from 'vitest';

// RegexProcessor 是一个类实例，内部有 Logger 依赖（已在 setup.ts 中 mock）
// 直接导入 regexProcessor 单例
import { regexProcessor } from '@/modules/workflow/steps/processing/RegexProcessor';

describe('RegexProcessor.captureTags', () => {

    describe('单标签提取', () => {
        it('应提取 <output> 标签内容', () => {
            const text = `一些前导文字\n<output>这是增强后的用户输入</output>\n一些后续文字`;
            const result = regexProcessor.captureTags(text, ['output']);
            expect(result.output).toBe('这是增强后的用户输入');
        });

        it('应提取 <query> 标签内容', () => {
            const text = `<query>酒馆相遇 月下约定 艾莉丝</query>`;
            const result = regexProcessor.captureTags(text, ['query']);
            expect(result.query).toBe('酒馆相遇 月下约定 艾莉丝');
        });

        it('应处理多行标签内容', () => {
            const text = `<output>
第一行内容
第二行内容
第三行内容
</output>`;
            const result = regexProcessor.captureTags(text, ['output']);
            expect(result.output).toContain('第一行内容');
            expect(result.output).toContain('第三行内容');
        });
    });

    describe('多标签同时提取', () => {
        it('应同时提取 output 和 query', () => {
            const text = `<output>增强后的文本</output>\n<query>检索关键词</query>`;
            const result = regexProcessor.captureTags(text, ['output', 'query']);
            expect(result.output).toBe('增强后的文本');
            expect(result.query).toBe('检索关键词');
        });

        it('缺失的标签应返回 null', () => {
            const text = `<output>只有 output</output>`;
            const result = regexProcessor.captureTags(text, ['output', 'query']);
            expect(result.output).toBe('只有 output');
            expect(result.query).toBeNull();
        });

        it('应同时提取 output、query 和 recall_decision（三标签）', () => {
            const text = `
<output>增强后的用户输入</output>
<query>关键词列表</query>
<recall_decision>
{"recalls": [{"id": "evt_001", "score": 0.9, "reason": "test"}]}
</recall_decision>`;
            const result = regexProcessor.captureTags(text, ['output', 'query', 'recall_decision']);
            expect(result.output).toBe('增强后的用户输入');
            expect(result.query).toBe('关键词列表');
            expect(result.recall_decision).toContain('"recalls"');
            expect(result.recall_decision).toContain('evt_001');
        });
    });

    describe('Agentic RAG recall_decision', () => {
        it('应正确提取 recall_decision 中的 JSON', () => {
            const text = `
<think>
分析当前场景...
</think>

<recall_decision>
{"recalls": [
    {"id": "evt_a1b2c3d4", "score": 0.95, "reason": "月下立约直接相关"},
    {"id": "evt_x1y2z3w4", "score": 0.80, "reason": "同一角色互动"}
]}
</recall_decision>

<output>增强后的文本</output>`;

            const result = regexProcessor.captureTags(text, ['output', 'recall_decision']);
            expect(result.output).toBe('增强后的文本');
            expect(result.recall_decision).toBeTruthy();

            // 验证提取的 JSON 可以被解析
            const parsed = JSON.parse(result.recall_decision!);
            expect(parsed.recalls).toHaveLength(2);
            expect(parsed.recalls[0].id).toBe('evt_a1b2c3d4');
        });
    });

    describe('边界条件', () => {
        it('空文本应返回全 null', () => {
            const result = regexProcessor.captureTags('', ['output', 'query']);
            expect(result.output).toBeNull();
            expect(result.query).toBeNull();
        });

        it('无匹配标签应返回 null', () => {
            const result = regexProcessor.captureTags('没有任何标签的文本', ['output']);
            expect(result.output).toBeNull();
        });

        it('空标签应返回 null（trim 后为空）', () => {
            const result = regexProcessor.captureTags('<output>   </output>', ['output']);
            // 取决于实现：trim 后为空字符串，captureTag 应返回 null
            expect(result.output).toBeFalsy();
        });
    });
});

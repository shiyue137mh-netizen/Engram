/**
 * RobustJsonParser 单元测试
 *
 * 测试 LLM 输出的 JSON 容错解析：
 * - 标准 JSON 解析
 * - Markdown 代码块提取
 * - 数组自动封装
 * - 尾部逗号修复
 * - 边界条件处理
 */
import { RobustJsonParser } from '@/core/utils/JsonParser';
import { describe, expect, it } from 'vitest';

describe('RobustJsonParser', () => {

    describe('标准 JSON', () => {
        it('应解析干净的 JSON 对象', () => {
            const result = RobustJsonParser.parse('{"key": "value", "num": 42}');
            expect(result).toEqual({ key: 'value', num: 42 });
        });

        it('应解析嵌套对象', () => {
            const input = '{"recalls": [{"id": "evt_001", "score": 0.9}]}';
            const result = RobustJsonParser.parse(input);
            expect(result?.recalls).toHaveLength(1);
            expect(result?.recalls[0].id).toBe('evt_001');
        });
    });

    describe('LLM 典型输出', () => {
        it('应从含有前导文本的输出中提取 JSON', () => {
            const llmOutput = `好的，我来分析一下当前场景需要调阅的记忆：

{"recalls": [{"id": "evt_abc", "score": 0.85, "reason": "相关记忆"}]}

以上是我的判断。`;

            const result = RobustJsonParser.parse(llmOutput);
            expect(result?.recalls).toHaveLength(1);
            expect(result?.recalls[0].id).toBe('evt_abc');
        });

        it('应从 Markdown 代码块中提取 JSON', () => {
            const llmOutput = `分析完成，结果如下：

\`\`\`json
{"recalls": [{"id": "evt_xyz", "score": 0.9}]}
\`\`\`

希望这对你有帮助。`;

            const result = RobustJsonParser.parse(llmOutput);
            expect(result?.recalls).toHaveLength(1);
            expect(result?.recalls[0].id).toBe('evt_xyz');
        });

        it('应处理无 language 标记的代码块', () => {
            const llmOutput = `\`\`\`
{"key": "value"}
\`\`\``;

            const result = RobustJsonParser.parse(llmOutput);
            expect(result).toEqual({ key: 'value' });
        });
    });

    describe('容错修复', () => {
        it('应修复尾部多余逗号', () => {
            const broken = '{"key": "value", "num": 42, }';
            const result = RobustJsonParser.parse(broken);
            expect(result).toEqual({ key: 'value', num: 42 });
        });

        it('应修复数组尾部多余逗号', () => {
            const broken = '{"items": ["a", "b", "c", ]}';
            const result = RobustJsonParser.parse(broken);
            expect(result?.items).toEqual(['a', 'b', 'c']);
        });
    });

    describe('数组自动封装', () => {
        it('应将裸数组封装为 { events: [...] }', () => {
            const input = '[{"id": "evt_1"}, {"id": "evt_2"}]';
            const result = RobustJsonParser.parse(input);
            expect(result?.events).toHaveLength(2);
            expect(result?.events[0].id).toBe('evt_1');
        });

        it('应处理带文本的裸数组', () => {
            const input = `这是结果：
[{"id": "evt_1"}, {"id": "evt_2"}]`;
            const result = RobustJsonParser.parse(input);
            expect(result?.events).toHaveLength(2);
        });
    });

    describe('Agentic RAG recall_decision 解析', () => {
        it('应正确解析典型的 recall_decision 格式', () => {
            const recallDecision = `{"recalls": [
                {"id": "evt_a1b2c3d4", "score": 0.95, "reason": "月下立约事件与当前话题直接相关"},
                {"id": "evt_x1y2z3w4", "score": 0.80, "reason": "涉及同一角色的过往互动"}
            ]}`;

            const result = RobustJsonParser.parse(recallDecision);
            expect(result?.recalls).toHaveLength(2);
            expect(result?.recalls[0].id).toBe('evt_a1b2c3d4');
            expect(result?.recalls[0].score).toBe(0.95);
            expect(result?.recalls[1].reason).toContain('过往互动');
        });

        it('应处理 LLM 可能的格式变异', () => {
            // LLM 有时会输出多余逗号或换行
            const messyOutput = `{
  "recalls": [
    {"id": "evt_001", "score": 0.9, "reason": "test",},
    {"id": "evt_002", "score": 0.7, "reason": "test2",},
  ]
}`;

            const result = RobustJsonParser.parse(messyOutput);
            expect(result?.recalls).toHaveLength(2);
        });
    });

    describe('边界条件', () => {
        it('空字符串应返回 null', () => {
            expect(RobustJsonParser.parse('')).toBeNull();
        });

        it('纯文本（无 JSON）应返回 null', () => {
            expect(RobustJsonParser.parse('这只是一段普通文字')).toBeNull();
        });

        it('不完整的 JSON 应返回 null', () => {
            expect(RobustJsonParser.parse('{"key": ')).toBeNull();
        });
    });
});

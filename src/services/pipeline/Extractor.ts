/**
 * Extractor - LLM 调用 + JSON 解析
 *
 * 位于 L4 业务层 (services/pipeline/)
 * 职责：
 * - 构建 Prompt
 * - 调用 LLM
 * - 解析 JSON 输出
 * - 返回结构化事件数据
 */

import { llmAdapter } from '@/services/api/LLMAdapter';
import { RobustJsonParser } from '@/utils/JsonParser';
import { ModelLogger } from '@/lib/logger/ModelLogger';
import { getCurrentModel, getCurrentCharacter } from '@/tavern/context';
import { SettingsManager } from '@/services/settings/Persistence';
import { getBuiltInTemplateByCategory } from '@/services/api/types';

/**
 * LLM 输出的事件结构 (Summary Protocol)
 * 字段名与 EventNode 完全对应，零转换
 */
export interface ExtractedEvent {
    /** 高密度摘要文本 (For Model) */
    summary: string;
    /** 结构化元数据 (For Machine) */
    meta: {
        /** 时间锚点 - 保留原文时间格式 */
        time_anchor: string;
        role: string[];
        location: string;
        event: string;
        logic: string[];
        causality: string;  // "Start" | "Chain" | "End"
    };
    /** 重要性评分 0.0 - 1.0 */
    significance_score: number;
}

/**
 * LLM 响应的完整结构
 */
interface LLMEventResponse {
    events: ExtractedEvent[];
}

/**
 * Extractor 类
 */
export class Extractor {
    /**
     * 从聊天消息中提取结构化事件
     * @param messages 聊天消息数组
     * @param context 可选上下文信息 (用于 Prompt)
     * @returns 提取的事件数组，失败返回 null
     */
    async extract(
        messages: Array<{ role: string; content: string; name?: string }>,
        context?: { worldbookContext?: string; engramSummaries?: string }
    ): Promise<ExtractedEvent[] | null> {
        if (!messages || messages.length === 0) {
            console.warn('[Extractor] No messages to extract');
            return null;
        }

        // 1. 构建 Prompt
        const { systemPrompt, userPrompt } = await this.buildPrompts(messages, context);

        // 2. 调用 LLM
        const logId = ModelLogger.logSend({
            type: 'extract',
            systemPrompt,
            userPrompt,
            floorRange: [0, messages.length],
            model: getCurrentModel(),
            character: getCurrentCharacter()?.name,
        });

        const startTime = Date.now();
        const response = await llmAdapter.generate({
            systemPrompt,
            userPrompt,
        });

        ModelLogger.logReceive(logId, {
            response: response.content,
            status: response.success ? 'success' : 'error',
            error: response.error,
            duration: Date.now() - startTime,
        });

        if (!response.success || !response.content) {
            console.error('[Extractor] LLM call failed:', response.error);
            return null;
        }

        // 3. 解析 JSON
        const parsed = RobustJsonParser.parse<LLMEventResponse>(response.content);

        if (!parsed || !parsed.events) {
            console.error('[Extractor] JSON parsing failed or no events');
            return null;
        }

        // 4. 验证事件结构
        const validEvents = parsed.events.filter(event =>
            event.summary &&
            event.meta &&
            typeof event.significance_score === 'number'
        );

        if (validEvents.length === 0) {
            console.warn('[Extractor] No valid events extracted');
            return null;
        }

        console.log(`[Extractor] Extracted ${validEvents.length} events`);
        return validEvents;
    }

    /**
     * 构建 Prompt
     */
    private async buildPrompts(
        messages: Array<{ role: string; content: string; name?: string }>,
        context?: { worldbookContext?: string; engramSummaries?: string }
    ): Promise<{ systemPrompt: string; userPrompt: string }> {
        // 尝试获取自定义模板
        const template = await SettingsManager.getEnabledPromptTemplate('summary');

        // 系统提示词
        let systemPrompt = template?.systemPrompt || this.getDefaultSystemPrompt();

        // 用户提示词模板
        let userPromptTemplate = template?.userPromptTemplate || this.getDefaultUserPrompt();

        // 构建聊天历史
        const chatHistory = messages
            .map(m => `${m.name || (m.role === 'user' ? 'User' : 'Char')}: ${m.content}`)
            .join('\n\n');

        // 替换变量
        const userPrompt = userPromptTemplate
            .replace('{{chatHistory}}', chatHistory)
            .replace('{{worldbookContext}}', context?.worldbookContext || '')
            .replace('{{engramSummaries}}', context?.engramSummaries || '');

        return { systemPrompt, userPrompt };
    }

    /**
     * 默认系统提示词
     */
    private getDefaultSystemPrompt(): string {
        return `你是一个故事事件提取器。分析提供的对话，提取关键事件。

输出格式必须是严格的 JSON:
{
  "events": [
    {
      "summary": "事件的完整描述文本",
      "meta": {
        "time_anchor": "故事内时间，如: 太阳历1023年春4月4日 深夜",
        "role": ["角色A", "角色B"],
        "location": "地点",
        "event": "事件类型",
        "logic": ["标签1", "标签2"],
        "causality": "Start"
      },
      "significance_score": 0.7
    }
  ]
}

规则：
- summary: 完整的事件描述，适合嵌入和 RAG
- meta.role: 参与角色列表
- meta.location: 事件发生地点
- meta.event: 简短的事件类型标签
- meta.logic: 逻辑标签 (如: 冲突, 伏笔, 转折)
- meta.causality: "Start"=起始, "Chain"=发展, "End"=结束
- significance_score: 0.0-1.0，事件重要性

只输出 JSON，不要解释。`;
    }

    /**
     * 默认用户提示词
     */
    private getDefaultUserPrompt(): string {
        return `请分析以下对话，提取关键事件：

{{chatHistory}}

{{#if worldbookContext}}
参考上下文：
{{worldbookContext}}
{{/if}}

输出 JSON 格式的事件列表。`;
    }
}

/** 默认实例 */
export const extractor = new Extractor();

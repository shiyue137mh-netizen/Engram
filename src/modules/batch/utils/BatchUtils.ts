import { getBuiltInTemplateByCategory } from '@/config/types/defaults';
import { LogModule, Logger } from '@/core/logger';
import { llmAdapter } from '@/integrations/llm/Adapter';

export class BatchUtils {
    /**
     * 将长文本切分为带重叠区的小块
     */
    static chunkText(text: string, chunkSize: number, overlapSize: number): string[] {
        // 防御性校验：overlapSize >= chunkSize 会导致 start 指针无法前进（死循环）
        if (overlapSize >= chunkSize) {
            Logger.warn(LogModule.BATCH, `overlapSize(${overlapSize}) >= chunkSize(${chunkSize})，强制修正`, {});
            overlapSize = Math.max(0, chunkSize - 1);
        }

        const chunks: string[] = [];
        let start = 0;
        while (start < text.length) {
            const end = Math.min(start + chunkSize, text.length);
            chunks.push(text.slice(start, end));
            start = end - overlapSize;
            if (start >= text.length - overlapSize) {break;}
        }
        return chunks;
    }

    /**
     * V0.9.7: 调用 LLM 对单个文本块生成结构化摘要
     * V1.0.6: 增强宏支持 ({{chatHistory}} 等)
     */
    static async summarizeChunk(chunk: string, chunkIndex: number): Promise<string> {
        // 1. 注入当前分块到宏系统 (供 {{userInput}} 使用)
        const { MacroService } = await import('@/integrations/tavern');
        MacroService.setUserInput(chunk);
        await MacroService.refreshCache(); // 刷新其他宏 (如 chatHistory)

        // 2. 获取模板 (优先使用用户启用的 summary 模板)
        const { SettingsManager } = await import('@/config/settings');
        const { PromptLoader } = await import('@/integrations/llm/PromptLoader');

        const allTemplates = SettingsManager.get('apiSettings')?.promptTemplates || [];
        const userTemplate = allTemplates.find(t => t.category === 'summary' && t.enabled);
        const builtInTemplate = getBuiltInTemplateByCategory('summary');

        const template = userTemplate || builtInTemplate;
        let systemPrompt = template?.systemPrompt || '';
        let userPromptTemplate = template?.userPromptTemplate || `请对以下外部导入的文本片段进行结构化摘要，按照系统提示的格式输出 JSON：\n\n---\n{{userInput}}\n---`;

        // 3. 执行宏替换 (逻辑同步 BuildPrompt)
        const variables: Record<string, string> = {
            '{{chatHistory}}': MacroService.getChatHistory(),
            '{{engramSummaries}}': MacroService.getSummaries(),
            '{{userInput}}': chunk,
            '{{worldbookContext}}': MacroService.getWorldbookContext(),
        };

        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(key.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`), 'g');
            systemPrompt = systemPrompt.replace(regex, value);
            userPromptTemplate = userPromptTemplate.replace(regex, value);
        }

        // 4. 调用 LLM
        try {
            const response = await llmAdapter.generate({
                systemPrompt,
                userPrompt: userPromptTemplate
            });
            if (response.success && response.content) {
                Logger.debug(LogModule.BATCH, `分块 ${chunkIndex} 总结完成`);
                return response.content;
            }
        } catch (error) {
            Logger.warn(LogModule.BATCH, `分块 ${chunkIndex} 总结失败`, { error });
        }
        // 降级：返回空，让调用方使用原文
        return '';
    }
}

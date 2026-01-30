import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { PromptLoader } from '@/integrations/llm/PromptLoader';
import { MacroService } from '@/integrations/tavern/macros';
import { Logger } from '@/core/logger';
import { getBuiltInTemplateByCategory } from '@/config/types/defaults';

interface BuildPromptConfig {
    templateId?: string;       // 指定模板 ID
    category?: string;         // 指定分类 (用于 fallback)
    vars?: Record<string, string>; // 额外的变量
}

export class BuildPrompt implements IStep {
    name = 'BuildPrompt';

    constructor(private config: BuildPromptConfig) { }

    async execute(context: JobContext): Promise<void> {
        // 1. 确定模板
        // 优先使用 Context 中的配置，其次是 Step 构造时的配置
        const templateId = context.config.templateId || this.config.templateId;
        const category = context.config.category || this.config.category;

        // V0.9.11: Use SettingsManager as Source of Truth to include User Custom Templates
        // PromptLoader only has built-ins.
        const { SettingsManager } = await import('@/config/settings');
        const allTemplates = SettingsManager.get('apiSettings')?.promptTemplates || [];

        // Ensure built-ins are loaded and merged with user settings
        PromptLoader.init();
        const builtInTemplates = PromptLoader.getAllTemplates();

        // Create a map to merge templates by ID (User overrides Built-in)
        const templateMap = new Map<string, any>();

        // 1. Add built-ins first
        builtInTemplates.forEach(t => templateMap.set(t.id, t));

        // 2. Override with user templates
        allTemplates.forEach(t => templateMap.set(t.id, t));

        // 3. Convert back to array
        const mergedTemplates = Array.from(templateMap.values());

        let template;
        if (templateId) {
            // Priority 1: Use explicit templateId
            template = mergedTemplates.find(t => t.id === templateId);
        } else if (category) {
            // Priority 2: Use Enabled template in category
            const templates = mergedTemplates.filter(t => t.category === category && t.enabled);
            const customEnabled = templates.find(t => !t.isBuiltIn);
            if (customEnabled) {
                template = customEnabled;
            } else {
                template = templates[0];
            }

            if (template) {
                Logger.debug('BuildPrompt', `Using auto-detected enabled template: ${template.name}`);
            }
        }

        if (!template && category) {
            // Priority 3: Fallback to builtin default
            template = getBuiltInTemplateByCategory(category as any);
            Logger.debug('BuildPrompt', `Fallback to builtin template: ${template?.name}`);
        }

        if (!template) {
            throw new Error(`BuildPrompt: 未找到可用模板 (ID: ${templateId}, Category: ${category})`);
        }

        // 2. 准备变量
        // 合并 Context input 中的数据作为潜在变量
        const variables: Record<string, string> = {
            ...this.config.vars,
            // 常见的映射
            '{{userInput}}': context.input.text || '',
            '{{chatHistory}}': context.input.chatHistory || '',
            '{{previousOutput}}': context.input.previousOutput || '',
            '{{feedback}}': context.input.feedback || '',
            // ... 其他变量交由 MacroService 全局处理 (如 {{worldbookContext}})
        };

        // 3. 初始替换 (处理 input 相关的本地变量)
        let systemPrompt = template.systemPrompt;
        let userPrompt = template.userPromptTemplate;

        // V0.9.x: 动态附加反馈模板 (硬编码)
        if (context.input.feedback) {
            const feedbackTemplate = `
---
【用户反馈 - 请依据此修正上一次的生成】
上一次的生成内容:
{{previousOutput}}

用户的修改意见:
{{feedback}}
`;
            userPrompt += feedbackTemplate;
            Logger.debug('BuildPrompt', '检测到反馈，已自动附加反馈模板');
        }

        for (const [key, value] of Object.entries(variables)) {
            // 简单字符串替换 (全局)
            // 注意: key 应该包含 {{}}，或者我们在 replace 时加上
            const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            systemPrompt = systemPrompt.replace(regex, value);
            userPrompt = userPrompt.replace(regex, value);
        }

        // 4. 变量映射 (从 FetchContext 获取的数据)
        // 我们假设 FetchContext 已经把数据塞进了 context.input
        const contextData = context.input;

        // 手动映射已知宏 (覆盖 template 中的 {{key}})
        // 手动映射已知宏 (覆盖 template 中的 {{key}})
        // V1.2.1: 只映射 Context 中存在的变量，如果是空值则跳过，
        // 从而允许后续的酒馆全局宏 (substituteParams) 进行回退处理 (例如 {{engramSummaries}})
        const potentialMacros: Record<string, string | undefined> = {
            '{{chatHistory}}': contextData.chatHistory,
            '{{engramSummaries}}': contextData.engramSummaries,
            '{{targetSummaries}}': contextData.targetSummaries, // V1.2.1 New Trigger Variable
            '{{worldbookContext}}': contextData.worldbookContext,
            '{{context}}': contextData.context || contextData.worldbookContext,
            '{{userPersona}}': contextData.userPersona,
            '{{char}}': contextData.charName,
            '{{user}}': contextData.userName,
        };

        // 执行替换
        for (const [key, value] of Object.entries(potentialMacros)) {
            // 只有当 value 有值时才替换 (空字符串是否要替换？)
            // 如果我们想让 "空字符串" 覆盖全局宏，那么应该替换。
            // 但对于 engramSummaries，在 Trim 流程中，FormatTrimInput 不再设置它，
            // 所以这里是 undefined。undefined 不应该替换。
            if (value !== undefined && value !== null) {
                systemPrompt = systemPrompt.split(key).join(value);
                userPrompt = userPrompt.split(key).join(value);
            }
        }

        // 保存结果之前，调用酒馆原生宏替换 (处理 {{time}}, {{date}}, {{user}} 等标准宏)
        // 注意：我们必须先做上面的手动替换，因为 {{chatHistory}} 等变量在 Batch 模式下是特定的，不能用全局宏
        try {
            // @ts-ignore
            const stContext = window.SillyTavern?.getContext?.() as any;
            const substituteParams = stContext?.substituteParams;
            if (typeof substituteParams === 'function') {
                systemPrompt = substituteParams(systemPrompt);
                userPrompt = substituteParams(userPrompt);
            }
        } catch (e) {
            Logger.warn('BuildPrompt', '酒馆原生宏替换失败', e);
        }

        // 保存结果到 Context
        context.prompt = {
            system: systemPrompt,
            user: userPrompt,
            templateId: template.id
        };

        Logger.debug('BuildPrompt', `Prompt 构建完成 (Template: ${template.name})`, {
            systemLen: systemPrompt.length,
            userLen: userPrompt.length
        });
    }
}

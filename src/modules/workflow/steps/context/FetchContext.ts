import { Logger } from '@/core/logger';
import { MacroService, getCurrentCharacter, getCurrentChat } from '@/integrations/tavern';
import { WorldInfoService } from '@/integrations/tavern/worldbook';
import type { JobContext } from '../../core/JobContext';
import type { IStep } from '../../core/Step';

export class FetchContext implements IStep {
    name = 'FetchContext';

    async execute(context: JobContext): Promise<void> {
        Logger.debug('FetchContext', '开始获取上下文数据...');

        // 1. 获取基础实体信息 (User, Char)
        const char = getCurrentCharacter();
        if (char) {
            const charAny = char as any;
            context.input.charName = char.name;
            context.input.charPersona = charAny.personality || charAny.description || '';

        }
        // @ts-expect-error
        const stContext = window.SillyTavern?.getContext?.();
        if (stContext) {
            context.input.userName = stContext.name1 || 'User';
            // 显式注入人设描述，确保 BuildPrompt 不需要回退到宏系统
            // @ts-expect-error
            context.input.userPersona = window.power_user?.persona_description || stContext.powerUserSettings?.persona_description || '';
        }

        // 2. 获取 Chat History
        // 优先使用任务输入中传入的明确范围 (range)，常用于批处理切片执行。
        // 如果未传入 range，则回退到 MacroService 的默认逻辑（通常是获取最近的 N 条消息）。
        const range = context.input.range as [number, number] | undefined;
        Logger.debug('FetchContext', '开始获取聊天记录', {
            currentStep: context.metadata.currentStep,
            range: range ?? null,
            trigger: context.trigger,
            workflowId: context.id,
        });

        // 调用 History 助手获取格式化后的文本
        const isImport = Boolean(context.input.isImport);
        let history = '';
        
        if (isImport) {
            // V1.0.8: 如果是外部导入模式，跳过向 ST 索取聊天记录，直接使用传入的文本切片
            history = (context.input.text || context.input.chatHistory || '') as string;
            Logger.debug('FetchContext', '使用外部导入文本作为上下文', { bytes: history.length });
        } else {
            history = MacroService.getChatHistory(range);
        }

        // 关键修复：确保 context.input.chatHistory 始终有值（即使为空字符串），
        // 这样 BuildPrompt 步骤就能正确通过 split/join 逻辑替换掉 {{chatHistory}} 占位符。
        context.input.chatHistory = history || '';

        if (!history && !isImport) {
            Logger.warn('FetchContext', '未获取到任何聊天记录，这可能导致提示词中出现空上下文');
        }

        // 3. 获取 World Info (依赖 range)
        // V1.2.8: 使用 extraWorldbooks 替代 profileId
        const extraWorldbooks = (context.input.extraWorldbooks as string[] | undefined) || [];
        let wiContent = '';
        const useCustomScan = false;

        // 如果有额外世界书配置，或者为了确保过滤 [Engram]，我们使用自定义扫描
        // V1.2.9: 总是使用自定义逻辑以完全控制过滤
        const scopes = WorldInfoService.getScopes();

        // 1. 获取各个来源的世界书
        // 全局激活的 (可能包含用户手动开启的 [Engram]，需要过滤)
        const globalBooks = scopes.global || [];
        // 角色绑定的
        const charBooks = scopes.chat || [];
        // 额外绑定的 (Task Input)
        let extraBooks = (context.input.extraWorldbooks as string[] | undefined) || [];

        // V1.2.10: 尝试从当前提示词模板中获取绑定的额外世界书
        // 因为 FetchContext 在 BuildPrompt 之前运行，我们需要提前预判或查找模板
        try {
            const { SettingsManager } = await import('@/config/settings');
            const { PromptLoader } = await import('@/integrations/llm/PromptLoader');

            // 确定 templateId (逻辑同 BuildPrompt)
            let {templateId} = context.config;
            const {category} = context.config;

            if (!templateId && category) {
                // 简单查找该分类下启用的模板
                // 注意：这里只是为了获取 worldbooks，做个尽力而为的查找
                const allTemplates = SettingsManager.get('apiSettings')?.promptTemplates || [];
                const enabledTemplate = allTemplates.find(t => t.category === category && t.enabled === true);
                if (enabledTemplate) {
                    templateId = enabledTemplate.id;
                }
            }

            if (templateId) {
                // 读取完整模板配置（包含 user override）
                const userTemplates = SettingsManager.get('apiSettings')?.promptTemplates || [];
                const builtinTemplates = PromptLoader.getAllTemplates(); // 确保加载内置

                const template = userTemplates.find(t => t.id === templateId) ||
                    builtinTemplates.find(t => t.id === templateId);

                if (template && template.extraWorldbooks && template.extraWorldbooks.length > 0) {
                    Logger.debug('FetchContext', `发现模板 [${template.name}] 绑定的额外世界书`, {
                        books: template.extraWorldbooks
                    });
                    extraBooks = [...extraBooks, ...template.extraWorldbooks];
                }
            }
        } catch (error) {
            Logger.warn('FetchContext', '获取模板绑定世界书失败', error);
        }

        // 2. 合并并去重
        const allBooks = [...new Set([...globalBooks, ...charBooks, ...extraBooks])];

        // 3. 过滤掉 [Engram] 开头的世界书
        const worldbooksToScan = allBooks.filter((name: string) => !name.startsWith('[Engram]'));

        Logger.debug('FetchContext', '世界书扫描列表', {
            char: charBooks.length,
            extra: extraBooks.length,
            global: globalBooks.length,
            list: worldbooksToScan,
            totalFilter: worldbooksToScan.length
        });

        // 4. 获取扫描文本
        let scanText = '';
        if (range) {
            const chat = getCurrentChat();
            if (chat && Array.isArray(chat)) {
                // Range is 1-based
                const msgs = chat.slice(Math.max(0, range[0] - 1), range[1]);
                scanText = msgs.map((m: any) => m.mes || '').join('\n');
            }
        } else {
            scanText = context.input.text || history || '';
        }

        // 5. 扫描世界书
        const worldInfoContentParts: string[] = [];

        // Scan template-bound extra worldbooks with forceInclude: true
        for (const book of extraBooks) {
            // V1.2.10: 绑定的世界书强制生效，忽略全局禁用设置
            // Also ensure it's not an [Engram] book, as those are handled separately
            if (!book.startsWith('[Engram]')) {
                const content = await WorldInfoService.scanWorldbook(book, scanText, { forceInclude: true });
                if (content) {
                    worldInfoContentParts.push(content);
                }
            }
        }

        // Scan other worldbooks (global, char, and task-input extra books not already covered)
        // We need to ensure we don't double-scan books already processed with forceInclude.
        // The `worldbooksToScan` already contains a unique list of all non-[Engram] books.
        // We will filter out the `extraWorldbooks` (and `extraBooks`) that were already processed with `forceInclude`.
        const booksToScanNormally = worldbooksToScan.filter(book => !extraBooks.includes(book));

        if (booksToScanNormally.length > 0) {
            const results = await Promise.all(
                booksToScanNormally.map((wbName: string) =>
                    WorldInfoService.scanWorldbook(wbName, scanText)
                )
            );
            worldInfoContentParts.push(...results.filter(Boolean));
        }

        wiContent = worldInfoContentParts.filter(Boolean).join('\n\n');

        context.input.worldbookContext = wiContent;
        // 兼容旧名
        context.input.context = wiContent;

        // 4. 获取 Engram Summaries
        // V1.3.2: 统一使用 MacroService 缓存，确保包含 RAG 召回内容 (由 Injector 写入)
        const summaryContent = MacroService.getSummaries();
        context.input.engramSummaries = summaryContent;

        // 5. V1.0.0: 获取 Engram Entity States
        // 同样使用 MacroService 缓存
        const entityStatesContent = MacroService.getEntityStates();
        context.input.engramEntityStates = entityStatesContent;

        Logger.debug('FetchContext', '上下文获取完成', {
            historyLen: history?.length || 0,
            summaryLen: summaryContent.length,
            wiLen: wiContent.length
        });
    }
}

import { Logger } from '@/core/logger';
import { getCurrentCharacter, getCurrentChat } from '@/integrations/tavern/context';
import { MacroService } from '@/integrations/tavern/macros';
import { WorldInfoService } from '@/integrations/tavern/worldbook';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

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
            // 注意：酒馆内部 persona 字段可能叫 description, personality 等，需确认
            // 通常 {{char}} 是 name, {{description}} 是 description
        }

        // 获取用户 persona (酒馆通常存储在全局 user_persona 或类似)
        // 这里暂时用 MacroService 或 context helper 获取
        // 为了简单，我们先留空，或者让 BuildPrompt 里的 MacroService 兜底
        // 但为了 {{userPersona}} 宏，我们尝试获取
        // @ts-ignore
        const stContext = window.SillyTavern?.getContext?.();
        if (stContext) {
            context.input.userName = stContext.name1 || 'User';
            // 尝试获取 persona
            // ST存储在 personas.js，这里可能不好直接拿，
            // 暂定: 如果 BuildPrompt 发现变量里有 {{userPersona}}，它会去替换
        }

        // 2. 获取 Chat History
        // 优先使用传入的 range，否则 check config
        const range = context.input.range as [number, number] | undefined;
        Logger.debug('FetchContext', `获取聊天记录范围: ${range ? range.join('-') : 'Recent'}`);

        const history = MacroService.getChatHistory(range);
        if (history) {
            context.input.chatHistory = history;
        } else {
            Logger.warn('FetchContext', '未获取到聊天记录');
        }

        // 3. 获取 World Info (依赖 range)
        // V1.2.8: 使用 extraWorldbooks 替代 profileId
        const extraWorldbooks = (context.input.extraWorldbooks as string[] | undefined) || [];
        let wiContent = '';
        let useCustomScan = false;

        // 如果有额外世界书配置，或者为了确保过滤 [Engram]，我们使用自定义扫描
        // V1.2.9: 总是使用自定义逻辑以完全控制过滤
        const scopes = WorldInfoService.getScopes();

        // 1. 获取各个来源的世界书
        // 全局激活的 (可能包含用户手动开启的 [Engram]，需要过滤)
        const globalBooks = scopes.global || [];
        // 角色绑定的
        const charBooks = scopes.chat || [];
        // 额外绑定的
        const extraBooks = (context.input.extraWorldbooks as string[] | undefined) || [];

        // 2. 合并并去重
        const allBooks = [...new Set([...globalBooks, ...charBooks, ...extraBooks])];

        // 3. 过滤掉 [Engram] 开头的世界书
        const worldbooksToScan = allBooks.filter((name: string) => !name.startsWith('[Engram]'));

        Logger.debug('FetchContext', '世界书扫描列表', {
            global: globalBooks.length,
            char: charBooks.length,
            extra: extraBooks.length,
            totalFilter: worldbooksToScan.length,
            list: worldbooksToScan
        });

        // 4. 获取扫描文本
        let scanText = '';
        if (range) {
            const chat = getCurrentChat();
            if (chat && Array.isArray(chat)) {
                // range is 1-based
                const msgs = chat.slice(Math.max(0, range[0] - 1), range[1]);
                scanText = msgs.map((m: any) => m.mes || '').join('\n');
            }
        } else {
            scanText = context.input.text || history || '';
        }

        // 5. 扫描世界书
        if (worldbooksToScan.length > 0) {
            const results = await Promise.all(
                worldbooksToScan.map((wbName: string) =>
                    WorldInfoService.scanWorldbook(wbName, scanText)
                )
            );
            wiContent = results.filter(Boolean).join('\n\n');
        }
        context.input.worldbookContext = wiContent;
        // 兼容旧名
        context.input.context = wiContent;

        // 4. 获取 Engram Summaries
        const summaryContent = await WorldInfoService.getEngramSummariesContent();
        context.input.engramSummaries = summaryContent;

        // 5. V1.0.0: 获取 Engram Entity States
        const { useMemoryStore } = await import('@/state/memoryStore');
        const entityStatesContent = await useMemoryStore.getState().getEntityStates();
        context.input.engramEntityStates = entityStatesContent;

        Logger.debug('FetchContext', '上下文获取完成', {
            historyLen: history?.length || 0,
            wiLen: wiContent.length,
            summaryLen: summaryContent.length
        });
    }
}

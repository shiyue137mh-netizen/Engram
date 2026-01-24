import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { MacroService } from '@/integrations/tavern/macros';
import { WorldInfoService } from '@/integrations/tavern/api/WorldInfo';
import { SettingsManager } from '@/config/settings';
import { getCurrentChat, getCurrentCharacter } from '@/integrations/tavern/context';
import { WorldbookConfigProfile } from '@/config/types/prompt';
import { Logger } from '@/core/logger';

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
        const profileId = context.input.worldbookProfileId as string | undefined;
        let wiContent = '';
        let useProfile = false;

        if (profileId) {
            const settings = SettingsManager.getSettings();
            // @ts-ignore
            const profile = settings.apiSettings?.worldbookProfiles?.find((p: WorldbookConfigProfile) => p.id === profileId);

            if (profile && profile.mode === 'custom') {
                useProfile = true;
                Logger.debug('FetchContext', `使用世界书配置 [${profile.name}] (Custom Mode)`);

                // 获取扫描文本
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

                if (profile.selectedWorldbooks && profile.selectedWorldbooks.length > 0) {
                    const results = await Promise.all(
                        profile.selectedWorldbooks.map((wbName: string) =>
                            WorldInfoService.scanWorldbook(wbName, scanText)
                        )
                    );
                    wiContent = results.filter(Boolean).join('\n\n');
                }
            }
        }

        if (!useProfile) {
            // 原生兼容扫描
            wiContent = await WorldInfoService.getActivatedWorldInfo(undefined, {
                floorRange: range
            });
        }
        context.input.worldbookContext = wiContent;
        // 兼容旧名
        context.input.context = wiContent;

        // 4. 获取 Engram Summaries
        const summaryContent = await WorldInfoService.getEngramSummariesContent();
        context.input.engramSummaries = summaryContent;

        Logger.debug('FetchContext', '上下文获取完成', {
            historyLen: history?.length || 0,
            wiLen: wiContent.length,
            summaryLen: summaryContent.length
        });
    }
}

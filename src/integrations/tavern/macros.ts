import { useMemoryStore } from '@/state/memoryStore';
import { Logger } from '@/core/logger';
import { regexProcessor } from '@/modules/memory/extractors/RegexProcessor';
import { WorldInfoService } from '@/integrations/tavern/api';
import { SettingsManager } from '@/config/settings';
import type { SummarizerConfig } from '@/modules/memory/types';
import type { CustomMacro } from '@/config/types/prompt';

declare global {
    interface Window {
        EjsTemplate?: {
            prepareContext: () => Promise<any>;
            evalTemplate: (content: string, context: any) => Promise<string>;
        };
        Mvu?: {
            getMvuData: (params: any) => any;
        };
    }
}

/**
 * MacroService 类
 * V0.8: 支持预处理使用的宏，包括 {{engramSummaries}} 和 {{worldbookContext}}
 */
export class MacroService {
    private static isInitialized = false;

    /**
     * 初始化并注册所有 Engram 宏
     */
    static async init(): Promise<void> {
        if (this.isInitialized) return;

        try {
            // @ts-ignore - SillyTavern 全局对象
            const context = window.SillyTavern?.getContext?.();

            if (!context?.registerMacro) {
                Logger.warn('MacroService', 'SillyTavern registerMacro API 不可用');
                return;
            }

            // --- 注册宏 ---

            // {{engramSummaries}} - 从 IndexedDB 获取当前聊天的所有事件摘要
            context.registerMacro(
                'engramSummaries',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedSummaries;
                },
                'Engram: 当前聊天的所有事件摘要 (从 IndexedDB)'
            );

            // {{worldbookContext}} - 获取激活的世界书内容
            context.registerMacro(
                'worldbookContext',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedWorldbookContext;
                },
                'Engram: 当前激活的世界书内容'
            );

            // {{userInput}} - 当前用户输入（预处理专用）
            context.registerMacro(
                'userInput',
                () => {
                    return MacroService.cachedUserInput;
                },
                'Engram: 当前用户输入（预处理专用）'
            );

            // {{chatHistory}} - 最近对话历史 (从配置读取 floorInterval - bufferSize)
            context.registerMacro(
                'chatHistory',
                () => {
                    return MacroService.getChatHistory();
                },
                'Engram: 最近对话历史 (从总结配置读取数量)'
            );

            // {{context}} - 角色卡设定（同酒馆 description）
            context.registerMacro(
                'context',
                () => {
                    return MacroService.cachedCharDescription;
                },
                'Engram: 角色卡设定'
            );

            // V0.9: {{engramGraph}} - 事件和实体的结构化 JSON
            context.registerMacro(
                'engramGraph',
                () => {
                    return MacroService.cachedGraphData;
                },
                'Engram: 事件和实体的结构化 JSON (用于图谱构建)'
            );

            // V0.9.2: {{engramArchivedSummaries}} - 已归档的历史摘要 (绿灯事件)
            context.registerMacro(
                'engramArchivedSummaries',
                () => {
                    return MacroService.cachedArchivedSummaries;
                },
                'Engram: 已归档的历史摘要 (绿灯事件)'
            );

            // V0.9.2: {{userPersona}} - 用户角色设定
            context.registerMacro(
                'userPersona',
                () => {
                    return MacroService.cachedUserPersona;
                },
                'Engram: 用户角色设定 (酒馆 Persona Description)'
            );

            this.isInitialized = true;
            Logger.success('MacroService', '全局宏已注册', {
                macros: ['{{engramSummaries}}', '{{worldbookContext}}', '{{userInput}}', '{{chatHistory}}', '{{context}}', '{{engramGraph}}', '{{engramArchivedSummaries}}', '{{userPersona}}']
            });

            // 初始化缓存
            await this.refreshCache();

            // 监听聊天切换事件，刷新缓存
            // @ts-ignore
            const eventSource = context.eventSource;
            if (eventSource) {
                eventSource.on('chat_id_changed', () => {
                    this.refreshCache().catch(e => Logger.warn('MacroService', '刷新缓存失败', e));
                });
            }

        } catch (e) {
            Logger.error('MacroService', '初始化失败', e);
        }
    }

    // --- 缓存 ---
    private static cachedSummaries: string = '';
    private static cachedWorldbookContext: string = '';
    private static cachedUserInput: string = '';
    private static cachedCharDescription: string = '';
    // V0.9: 图谱数据缓存
    private static cachedGraphData: string = '';
    // V0.9.2: 新增缓存
    private static cachedArchivedSummaries: string = '';
    private static cachedUserPersona: string = '';
    // V0.9.2: 自定义宏缓存
    private static cachedCustomMacros: Map<string, string> = new Map();

    /**
     * 设置用户输入（预处理时调用）
     */
    static setUserInput(input: string): void {
        this.cachedUserInput = input;
    }

    /**
     * 刷新缓存 - 从 IndexedDB 读取事件摘要，从世界书读取激活内容
     * @param recalledIds 可选，RAG 召回的事件 ID 列表（绿灯事件临时显示）
     */
    static async refreshCache(recalledIds?: string[]): Promise<void> {
        try {
            // 刷新 Engram 摘要
            const store = useMemoryStore.getState();
            this.cachedSummaries = await store.getEventSummaries(recalledIds);

            // 刷新世界书上下文 (支持 EJS)
            try {
                const rawContext = await WorldInfoService.getActivatedWorldInfo();
                const sanitized = await this.processEJSMacros([rawContext]);
                this.cachedWorldbookContext = sanitized[0] || '';
            } catch (e) {
                Logger.debug('MacroService', '获取世界书内容失败', e);
                this.cachedWorldbookContext = '';
            }
            // 刷新角色描述
            this.refreshCharDescription();

            // V0.9.2: 刷新归档摘要
            await this.refreshArchivedSummaries();

            // V0.9.2: 刷新用户设定
            this.refreshUserPersona();

            // V0.9.2: 刷新并注册自定义宏
            this.refreshCustomMacros();

            Logger.debug('MacroService', '缓存已刷新', {
                summariesLength: this.cachedSummaries.length,
                worldbookLength: this.cachedWorldbookContext.length,
                recalledCount: recalledIds?.length ?? 0,
                customMacrosCount: this.cachedCustomMacros.size
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新缓存失败', e);
        }
    }

    /**
     * V0.9: 刷新图谱数据缓存
     * 输出结构化的 EventNode JSON（排除 embedding 等系统字段）
     */
    static async refreshGraphCache(): Promise<void> {
        try {
            const store = useMemoryStore.getState();
            const events = await store.getAllEvents();
            const entities = await store.getAllEntities();

            // 过滤掉 embedding 等系统字段
            const cleanEvents = events.map(e => ({
                id: e.id,
                summary: e.summary,
                structured_kv: e.structured_kv,
                significance_score: e.significance_score,
                level: e.level,
                source_range: e.source_range,
            }));

            const cleanEntities = entities.map(e => ({
                id: e.id,
                name: e.name,
                type: e.type,
                aliases: e.aliases || [],
                description: e.description,
            }));

            this.cachedGraphData = JSON.stringify({
                events: cleanEvents,
                existingEntities: cleanEntities,
            }, null, 2);

            Logger.debug('MacroService', '图谱缓存已刷新', {
                eventCount: events.length,
                entityCount: entities.length,
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新图谱缓存失败', e);
            this.cachedGraphData = JSON.stringify({ events: [], existingEntities: [] });
        }
    }

    /**
     * V0.8.5: 使用 RAG 召回的节点直接刷新缓存
     * 不从数据库重新读取，直接使用检索结果
     * @param nodes RAG 召回的事件节点
     */
    static async refreshCacheWithNodes(nodes: { id: string; summary: string }[]): Promise<void> {
        try {
            // 直接拼接召回节点的摘要
            this.cachedSummaries = nodes.map(n => n.summary).join('\n\n---\n\n');

            // 刷新世界书上下文 (支持 EJS)
            try {
                const rawContext = await WorldInfoService.getActivatedWorldInfo();
                const sanitized = await this.processEJSMacros([rawContext]);
                this.cachedWorldbookContext = sanitized[0] || '';
            } catch (e) {
                Logger.debug('MacroService', '获取世界书内容失败', e);
                this.cachedWorldbookContext = '';
            }

            // 刷新角色描述
            this.refreshCharDescription();

            Logger.debug('MacroService', 'RAG 召回缓存已刷新', {
                summariesLength: this.cachedSummaries.length,
                nodeCount: nodes.length,
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新 RAG 召回缓存失败', e);
        }
    }

    /**
     * 利用 ST-Prompt-Template (如果存在) 清洗 EJS 宏
     * V0.8.6: 切换为直接调用 window.EjsTemplate API (参考 test/脚本.js)
     */
    private static async processEJSMacros(entries: string[]): Promise<string[]> {
        if (entries.length === 0) return entries;

        // 检查 ST-Prompt-Template 是否可用
        if (!window.EjsTemplate || typeof window.EjsTemplate.evalTemplate !== 'function') {
            Logger.debug('MacroService', 'ST-Prompt-Template 未检测到，跳过 EJS 处理');
            return entries;
        }

        try {
            // 1. 准备上下文 (自动包含 {{user}}, {{char}} 及所有酒馆变量)
            const context = await window.EjsTemplate.prepareContext();

            // 2. 尝试获取 MVU 变量并合并 (参考脚本.js)
            if (typeof window.Mvu !== 'undefined' && window.Mvu.getMvuData) {
                try {
                    const mvuObj = window.Mvu.getMvuData({ type: 'message', message_id: 'latest' });
                    if (mvuObj && mvuObj.stat_data) {
                        context.mvu = mvuObj.stat_data;
                    }
                } catch (e) {
                    Logger.warn('MacroService', '获取 MVU 数据失败', e);
                }
            }

            // 3. 逐条渲染
            const processed = await Promise.all(entries.map(async (content) => {
                try {
                    return await window.EjsTemplate!.evalTemplate(content, context);
                } catch (err) {
                    Logger.warn('MacroService', 'EJS 渲染单条失败，保留原内容', err);
                    return content;
                }
            }));

            return processed;
        } catch (e) {
            Logger.warn('MacroService', 'EJS 预处理失败', e);
            return entries;
        }
    }

    /**
     * 获取对话历史
     * 从配置读取 floorInterval - bufferSize 作为消息数量
     */
    static getChatHistory(): string {
        try {
            // 统一从配置读取 limit
            const limit = this.getDynamicChatHistoryLimit();

            Logger.debug('MacroService', 'getChatHistory called', { limit });

            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            // @ts-ignore
            const TavernHelper = window.TavernHelper;

            if (context?.chat && Array.isArray(context.chat)) {
                // 获取最近 N 条消息
                const recentMessages = context.chat.slice(-limit);
                Logger.debug('MacroService', 'Got recent messages', { count: recentMessages.length });

                return recentMessages.map((m: any, index: number) => {
                    let content = m.mes || '';
                    const originalContent = content;

                    // 1. 酒馆原生正则清洗
                    if (TavernHelper && typeof TavernHelper.formatAsTavernRegexedString === 'function') {
                        try {
                            // usage: text, placement (2=AI Output), options
                            content = TavernHelper.formatAsTavernRegexedString(content, 'ai_output', { isPrompt: true });
                        } catch (err) {
                            Logger.warn('MacroService', '酒馆原生正则清洗失败', err);
                        }
                    }

                    // 2. Engram 内部正则清洗
                    content = regexProcessor.process(content, 'both');

                    // Log first and last message processing for debugging
                    if (index === 0 || index === recentMessages.length - 1) {
                        Logger.debug('MacroService', 'Message processed', {
                            index,
                            original: originalContent.substring(0, 50),
                            processed: content.substring(0, 50)
                        });
                    }

                    // 3. 返回纯内容 (去除角色名前缀)
                    return content;
                }).join('\n');
            }
            Logger.warn('MacroService', 'Context chat is empty or invalid');
            return '';
        } catch (e) {
            Logger.debug('MacroService', '获取对话历史失败', e);
            return '';
        }
    }

    /**
     * 刷新角色描述缓存
     */
    private static refreshCharDescription(): void {
        try {
            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            if (context?.characters && context.characterId >= 0) {
                const char = context.characters[context.characterId];
                this.cachedCharDescription = char?.description || '';
            }
        } catch (e) {
            Logger.debug('MacroService', '刷新角色描述失败', e);
        }
    }

    /**
     * V0.9.2: 获取动态计算的 chatHistory 消息条数
     * 公式: floorInterval - bufferSize
     * 无参数调用 {{chatHistory}} 时使用
     */
    static getDynamicChatHistoryLimit(): number {
        try {
            const summarizerConfig = SettingsManager.get('summarizerConfig') as SummarizerConfig | undefined;
            const floorInterval = summarizerConfig?.floorInterval ?? 20;
            const bufferSize = summarizerConfig?.bufferSize ?? 3;
            const limit = Math.max(1, floorInterval - bufferSize);
            Logger.debug('MacroService', '动态计算 chatHistory limit', { floorInterval, bufferSize, limit });
            return limit;
        } catch (e) {
            Logger.warn('MacroService', '动态计算 limit 失败，使用默认值 17', e);
            return 17; // 默认 20 - 3 = 17
        }
    }

    /**
     * V0.9.2: 刷新归档摘要缓存
     * 仅返回 is_archived=true 的事件摘要
     */
    private static async refreshArchivedSummaries(): Promise<void> {
        try {
            const store = useMemoryStore.getState();
            this.cachedArchivedSummaries = await store.getArchivedEventSummaries();
            Logger.debug('MacroService', '归档摘要缓存已刷新', {
                length: this.cachedArchivedSummaries.length
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新归档摘要失败', e);
            this.cachedArchivedSummaries = '';
        }
    }

    /**
     * V0.9.2: 刷新用户设定缓存
     * 从酒馆 power_user.persona_description 读取
     */
    private static refreshUserPersona(): void {
        try {
            // @ts-ignore - 酒馆全局变量
            const powerUser = window.power_user;
            this.cachedUserPersona = powerUser?.persona_description || '';
            Logger.debug('MacroService', '用户设定缓存已刷新', {
                length: this.cachedUserPersona.length
            });
        } catch (e) {
            Logger.debug('MacroService', '刷新用户设定失败', e);
            this.cachedUserPersona = '';
        }
    }

    /**
     * V0.9.2: 刷新并注册自定义宏
     * 从 apiSettings.customMacros 读取用户定义的宏
     */
    private static refreshCustomMacros(): void {
        try {
            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            if (!context?.registerMacro) {
                Logger.debug('MacroService', '酒馆 registerMacro 不可用，跳过自定义宏注册');
                return;
            }

            // 从 apiSettings 读取自定义宏
            const apiSettings = SettingsManager.get('apiSettings');
            const customMacros: CustomMacro[] = apiSettings?.customMacros || [];

            // 清空之前的缓存
            this.cachedCustomMacros.clear();

            // 注册每个启用的自定义宏
            for (const macro of customMacros) {
                if (!macro.enabled || !macro.name) continue;

                // 缓存内容
                this.cachedCustomMacros.set(macro.name, macro.content);

                // 动态注册到酒馆（使用闭包捕获宏名）
                const macroName = macro.name;
                context.registerMacro(
                    macroName,
                    () => this.cachedCustomMacros.get(macroName) ?? '',
                    `Engram 自定义宏: {{${macroName}}}`
                );
            }

            Logger.debug('MacroService', '自定义宏已刷新', {
                count: this.cachedCustomMacros.size,
                names: Array.from(this.cachedCustomMacros.keys())
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新自定义宏失败', e);
        }
    }
}


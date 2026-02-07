import { SettingsManager } from '@/config/settings';
import type { CustomMacro } from '@/config/types/prompt';
import { Logger } from '@/core/logger';
import { WorldInfoService } from '@/integrations/tavern/api';
import type { SummarizerConfig } from '@/modules/memory/types';
import { regexProcessor } from "@/modules/workflow/steps";
import { useMemoryStore } from '@/state/memoryStore';

declare global {
    interface Window {
        EjsTemplate?: {
            prepareContext: () => Promise<any>;
            evalTemplate: (content: string, context: any) => Promise<string>;
        };
        Mvu?: {
            getMvuData: (params: any) => any;
        };
        // V1.2.8: 新版宏系统定义
        macros?: {
            register: (name: string, options: any) => any;
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

            if (!context?.registerMacro && !context?.macros) {
                Logger.warn('MacroService', 'SillyTavern registerMacro API 不可用');
                return;
            }

            // --- 注册宏 ---

            // --- 注册宏 ---

            // {{engramSummaries}} - 从 IndexedDB 获取当前聊天的所有事件摘要
            MacroService.registerMacro(
                'engramSummaries',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedSummaries;
                },
                'Engram: 当前聊天的所有事件摘要 (从 IndexedDB)'
            );

            // {{worldbookContext}} - 获取激活的世界书内容
            MacroService.registerMacro(
                'worldbookContext',
                () => {
                    // 宏替换是同步的，使用缓存值
                    return MacroService.cachedWorldbookContext;
                },
                'Engram: 当前激活的世界书内容'
            );

            // {{userInput}} - 当前用户输入（预处理专用）
            MacroService.registerMacro(
                'userInput',
                () => {
                    return MacroService.cachedUserInput;
                },
                'Engram: 当前用户输入（预处理专用）'
            );

            // {{chatHistory}} - 最近对话历史 (从配置读取 floorInterval - bufferSize)
            MacroService.registerMacro(
                'chatHistory',
                () => {
                    return MacroService.getChatHistory();
                },
                'Engram: 最近对话历史 (从总结配置读取数量)'
            );

            // {{context}} - 角色卡设定（同酒馆 description）
            MacroService.registerMacro(
                'context',
                () => {
                    return MacroService.cachedCharDescription;
                },
                'Engram: 角色卡设定'
            );

            // V0.9: {{engramGraph}} - 事件和实体的结构化 JSON
            MacroService.registerMacro(
                'engramGraph',
                () => {
                    return MacroService.cachedGraphData;
                },
                'Engram: 事件和实体的结构化 JSON (用于图谱构建)'
            );

            // V0.9.2: {{engramArchivedSummaries}} - 已归档的历史摘要 (绿灯事件)
            MacroService.registerMacro(
                'engramArchivedSummaries',
                () => {
                    return MacroService.cachedArchivedSummaries;
                },
                'Engram: 已归档的历史摘要 (绿灯事件)'
            );

            // V0.9.2: {{userPersona}} - 用户角色设定
            MacroService.registerMacro(
                'userPersona',
                () => {
                    return MacroService.cachedUserPersona;
                },
                'Engram: 用户角色设定 (酒馆 Persona Description)'
            );

            // V1.0.0: {{engramEntityStates}} - 实体状态
            MacroService.registerMacro(
                'engramEntityStates',
                () => {
                    return MacroService.cachedEntityStates;
                },
                'Engram: 实体状态 (角色/场景/物品)'
            );

            this.isInitialized = true;
            Logger.success('MacroService', '全局宏已注册', {
                macros: ['{{engramSummaries}}', '{{worldbookContext}}', '{{userInput}}', '{{chatHistory}}', '{{context}}', '{{engramGraph}}', '{{engramArchivedSummaries}}', '{{userPersona}}', '{{engramEntityStates}}']
            });

            // 初始化缓存
            await this.refreshCache();


            // 监听聊天切换事件，刷新缓存
            // @ts-ignore
            const eventSource = context.eventSource;
            if (eventSource) {
                eventSource.on('chat_id_changed', () => {
                    Logger.info('MacroService', '聊天切换，清理旧缓存');
                    this.clearCache();
                    this.refreshCache().catch(e => Logger.warn('MacroService', '刷新缓存失败', e));
                });
            }

        } catch (e) {
            Logger.error('MacroService', '初始化失败', e);
        }
    }

    /**
     * 清理所有缓存 (防止跨角色/对话泄露)
     */
    static clearCache(): void {
        this.cachedSummaries = '';
        this.cachedWorldbookContext = '';
        this.cachedUserInput = '';
        this.cachedCharDescription = '';
        this.cachedGraphData = '';
        this.cachedArchivedSummaries = '';
        this.cachedUserPersona = '';
        this.cachedCustomMacros.clear();
        this.cachedEntityStates = '';
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
    // V1.0.0: 实体状态缓存
    private static cachedEntityStates: string = '';

    /**
     * 获取缓存的事件摘要
     */
    static getSummaries(): string {
        return this.cachedSummaries;
    }

    /**
     * 获取缓存的实体状态
     */
    static getEntityStates(): string {
        return this.cachedEntityStates;
    }

    /**
     * 获取缓存的世界书上下文
     */
    static getWorldbookContext(): string {
        return this.cachedWorldbookContext;
    }

    /**
     * 设置用户输入（预处理时调用）
     */
    static setUserInput(input: string): void {
        this.cachedUserInput = input;
    }

    /**
     * 刷新所有缓存 (包括耗时的世界书扫描)
     * @param recalledIds 可选，RAG 召回的事件 ID 列表
     */
    static async refreshCache(recalledIds?: string[]): Promise<void> {
        await Promise.all([
            this.refreshEngramCache(recalledIds),
            this.refreshWorldbookCache()
        ]);

        // 刷新用户设定 (轻量)
        this.refreshUserPersona();
        // 刷新自定义宏 (轻量)
        this.refreshCustomMacros();
    }

    /**
     * 仅刷新 Engram 相关的 DB 缓存 (快速)
     * 用于 Pipeline 结束后的快速更新，避免触发全量世界书扫描
     *
     * V1.0.2: 当未显式传入 recalledIds 时，自动从 BrainRecallCache 获取当前短期记忆
     * 这样所有使用 {{engramSummaries}} 的地方都能自动获得召回上下文
     */
    static async refreshEngramCache(recalledIds?: string[]): Promise<void> {
        try {
            const store = useMemoryStore.getState();

            // V1.0.2: 自动绑定 BrainRecallCache
            // 如果没有显式传入 recalledIds，则从 BrainRecallCache 获取当前短期记忆
            let effectiveRecalledIds = recalledIds;
            if (!effectiveRecalledIds) {
                try {
                    // 动态导入避免循环依赖
                    const { brainRecallCache } = await import('@/modules/rag/retrieval/BrainRecallCache');
                    const snapshot = brainRecallCache.getShortTermSnapshot();
                    if (snapshot.length > 0) {
                        effectiveRecalledIds = snapshot.map(slot => slot.id);
                        Logger.debug('MacroService', '从 BrainRecallCache 获取召回 ID', {
                            count: effectiveRecalledIds.length
                        });
                    }
                } catch (e) {
                    Logger.debug('MacroService', 'BrainRecallCache 获取失败，跳过', e);
                }
            }

            // 1. 刷新事件摘要（带召回 ID）
            this.cachedSummaries = await store.getEventSummaries(effectiveRecalledIds);

            // 2. 刷新归档摘要
            await this.refreshArchivedSummaries();

            // 3. V1.0.0: 刷新实体状态
            this.cachedEntityStates = await store.getEntityStates();

            // 4. 刷新图谱数据 (可选，视性能而定)
            // await this.refreshGraphCache();

            Logger.debug('MacroService', 'Engram DB 缓存已刷新', {
                summariesLength: this.cachedSummaries.length,
                recalledCount: effectiveRecalledIds?.length ?? 0
            });
        } catch (e) {
            Logger.warn('MacroService', '刷新 Engram DB 缓存失败', e);
        }
    }

    /**
     * 仅刷新世界书上下文 (耗时操作)
     * 涉及全量历史扫描，仅在初始化或明确需要时调用
     */
    static async refreshWorldbookCache(): Promise<void> {
        try {
            // 刷新世界书上下文 (支持 EJS)
            const rawContext = await WorldInfoService.getActivatedWorldInfo();
            const sanitized = await this.processEJSMacros([rawContext]);
            this.cachedWorldbookContext = sanitized[0] || '';

            // 刷新角色描述
            this.refreshCharDescription();

            Logger.debug('MacroService', '世界书上下文已刷新', {
                worldbookLength: this.cachedWorldbookContext.length
            });
        } catch (e) {
            Logger.debug('MacroService', '获取世界书内容失败', e);
            this.cachedWorldbookContext = '';
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
     * V0.8.5: 使用 RAG 召回的节点刷新缓存
     * V1.0.3 Fix: 复用 getEventSummaries 逻辑，修复召回条目覆盖蓝灯事件和乱序问题
     * @param nodes RAG 召回的事件节点
     */
    static async refreshCacheWithNodes(nodes: { id: string; summary: string }[]): Promise<void> {
        try {
            // V1.0.3: 提取召回节点的 ID，让 getEventSummaries 处理：
            // 1. 合并蓝灯事件（未归档的 level0）
            // 2. 按 source_range 排序
            // 3. 构建树状结构
            const recalledIds = nodes.map(n => n.id);
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

            Logger.debug('MacroService', 'RAG 召回缓存已刷新', {
                summariesLength: this.cachedSummaries.length,
                recalledCount: recalledIds.length,
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
     * @param floorRange 可选：指定楼层范围 [start, end] (1-based, inclusive)
     * 如果未指定，则从配置读取 limit 获取最近消息
     */
    static getChatHistory(floorRange?: [number, number]): string {
        try {
            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            // @ts-ignore
            const TavernHelper = window.TavernHelper;

            if (context?.chat && Array.isArray(context.chat)) {
                let messages: any[] = [];

                if (floorRange) {
                    // 指定范围模式 (Summarizer 用)
                    const [start, end] = floorRange;
                    // slice(start, end) end 是不包含的 (exclusive)，但我们需要包含 end 楼层。
                    // floor 1 对应 index 0。
                    // 例子: startFloor 21 -> index 20. endFloor 40 -> index 39.
                    // slice(20, 40) -> 返回 indices 20..39 (长度 20). 正确。
                    const sliceStart = start - 1;
                    const sliceEnd = end;
                    messages = context.chat.slice(sliceStart, sliceEnd);
                    Logger.info('MacroService', 'getChatHistory 调试信息', {
                        inputRange: floorRange,
                        calcSlice: [sliceStart, sliceEnd],
                        chatLen: context.chat.length,
                        firstMsgSummary: messages[0]?.mes?.substring(0, 20) || 'undefined',
                        firstMsgIndex: context.chat.indexOf(messages[0])
                    });
                } else {
                    // 默认模式：最近 N 条
                    const limit = this.getDynamicChatHistoryLimit();
                    messages = context.chat.slice(-limit);
                    Logger.debug('MacroService', 'getChatHistory (Recent)', { limit, count: messages.length });
                }

                if (messages.length === 0) return '';

                return messages.map((m: any, index: number) => {
                    // 鲁棒的 content 获取
                    let content = m.mes || m.content || m.message || '';
                    const originalContent = content;

                    // 1. 酒馆原生正则清洗
                    // V0.9.9: 增加详细调试日志
                    const hasTavernHelper = !!TavernHelper;
                    const hasFormatFunc = typeof TavernHelper?.formatAsTavernRegexedString === 'function';

                    // 只在第一条消息输出一次诊断信息
                    if (index === 0) {
                        Logger.debug('MacroService', 'TavernHelper 诊断', {
                            hasTavernHelper,
                            hasFormatFunc,
                            availableMethods: TavernHelper ? Object.keys(TavernHelper).slice(0, 10) : []
                        });
                    }

                    if (hasTavernHelper && hasFormatFunc) {
                        try {
                            // usage: text, placement (2=AI Output), options
                            // WARN: 强行退回 Object 传参并 cast as any，因为传 'prompt' 字符串导致了清空 bug
                            const prev = content;
                            content = TavernHelper.formatAsTavernRegexedString(content, 'ai_output', { isPrompt: true } as any);

                            // 检查正则是否有实际效果
                            const didChange = prev !== content;
                            if (index === 0) {
                                Logger.debug('MacroService', 'TavernHelper 正则结果', {
                                    didChange,
                                    prevLength: prev.length,
                                    afterLength: content.length
                                });
                            }

                            if (!content && prev) {
                                Logger.warn('MacroService', 'TavernHelper stripped content empty!', { prev, content });
                                content = prev; // 兜底恢复
                            }
                        } catch (err) {
                            Logger.warn('MacroService', '酒馆原生正则清洗失败', err);
                        }
                    } else if (index === 0) {
                        Logger.warn('MacroService', 'TavernHelper.formatAsTavernRegexedString 不可用', {
                            hasTavernHelper,
                            hasFormatFunc
                        });
                    }

                    const preRegex = content;
                    // 2. Engram 内部正则清洗 (关键：逐条清洗)
                    content = regexProcessor.process(content, 'both');

                    if (!content && preRegex) {
                        Logger.warn('MacroService', 'RegexProcessor 清洗后内容为空!', { preRegex, content });
                    }

                    // 仅记录第一条和最后一条消息的处理情况以供调试
                    if (index === 0 || index === messages.length - 1) {
                        Logger.debug('MacroService', '消息处理详情', {
                            index,
                            original: originalContent.substring(0, 50),
                            step1_tavern: preRegex.substring(0, 50),
                            step2_regex: content.substring(0, 50)
                        });
                    }

                    // 3. 返回纯内容 (去除角色名前缀)
                    return content;
                }).join('\n\n'); // 使用双换行分隔，更清晰
            }
            Logger.warn('MacroService', 'Context chat is empty or invalid');
            return '';
        } catch (e) {
            Logger.debug('MacroService', '获取对话历史失败', e);
            return '';
        }
    }

    /**
     * V0.9.9: 获取当前对话消息总数 (用于精确日志记录)
     */
    static getCurrentMessageCount(): number {
        try {
            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            if (context?.chat && Array.isArray(context.chat)) {
                return context.chat.length;
            }
            return 0;
        } catch (e) {
            return 0;
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
     * 直接使用 bufferSize,从而和{{engramsummaries}}进行衔接
     * 无参数调用 {{chatHistory}} 时使用
     */
    static getDynamicChatHistoryLimit(): number {
        try {
            const summarizerConfig = SettingsManager.get('summarizerConfig') as SummarizerConfig | undefined;
            const floorInterval = summarizerConfig?.floorInterval ?? 20;
            const bufferSize = summarizerConfig?.bufferSize ?? 10;
            // V1.2.7: 修正：使用 floorInterval 而非 bufferSize
            // 原因：间隔 20，缓冲 10 时，第 11~20 层可能还没被总结但也不在缓冲区内
            // 使用 floorInterval 确保完整覆盖可能出现在上下文中的内容
            const limit = Math.max(1, floorInterval);
            Logger.debug('MacroService', '动态计算 chatHistory limit (FloorInterval)', { floorInterval, bufferSize, limit });
            return limit;
        } catch (e) {
            Logger.warn('MacroService', '动态计算 limit 失败，使用默认值 20', e);
            return 20; // 默认 floorInterval
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
                MacroService.registerMacro(
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

    /**
     * V1.2.8: 统一宏注册接口，兼容新旧 API
     * @param name 宏名称
     * @param handler 宏处理函数
     * @param description 宏描述
     */
    private static registerMacro(name: string, handler: () => string, description: string) {
        // @ts-ignore
        const context = window.SillyTavern?.getContext?.();

        // 1. 尝试使用新版 API (macros.register)
        if (context?.macros?.register) {
            try {
                context.macros.register(name, {
                    handler: handler,
                    description: description,
                    category: 'extension', // 将所有 Engram 宏归类为扩展
                    returnType: 'string',
                    strictArgs: false
                });
                return;
            } catch (e) {
                Logger.warn('MacroService', `新版 API 注册宏 ${name} 失败，尝试回退`, e);
            }
        }

        // 2. 回退到旧版 API (registerMacro)
        if (context?.registerMacro) {
            context.registerMacro(name, handler, description);
        } else {
            Logger.warn('MacroService', `无法注册宏 ${name}: 没有可用的注册 API`);
        }
    }
}


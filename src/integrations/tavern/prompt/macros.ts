import { SettingsManager } from '@/config/settings';
import type { CustomMacro } from '@/config/types/prompt';
import { Logger } from '@/core/logger';
import { WorldInfoService } from '@/integrations/tavern';
import { useMemoryStore } from '@/state/memoryStore';
import { ChatHistoryHelper } from '../chat/chatHistory';
import { EjsProcessor } from './ejsProcessor';

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
            const sanitized = await EjsProcessor.processEJSMacros([rawContext]);
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
                const sanitized = await EjsProcessor.processEJSMacros([rawContext]);
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
     * 获取对话历史的代理
     */
    static getChatHistory(floorRange?: [number, number]): string {
        return ChatHistoryHelper.getChatHistory(floorRange);
    }

    /**
     * 获取当前对话消息总数
     */
    static getCurrentMessageCount(): number {
        return ChatHistoryHelper.getCurrentMessageCount();
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
     * V0.9.2: 获取动态计算的 chatHistory 消息条数的代理
     */
    static getDynamicChatHistoryLimit(): number {
        return ChatHistoryHelper.getDynamicChatHistoryLimit();
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

        // 兼容性修复: 强制使用旧版 registerMacro API
        // 新版 context.macros.register API 在某些 ST 版本中可能存在参数兼容问题导致 filter undefined 错误
        if (context?.registerMacro) {
            context.registerMacro(name, handler);
        } else {
            Logger.warn('MacroService', `无法注册宏 ${name}: 没有可用的 registerMacro API`);
        }
    }
}


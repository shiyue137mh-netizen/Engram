/**
 * WorldInfoService - SillyTavern 世界书服务封装
 * 
 * 提供世界书操作和 Token 计数功能
 */

/** 世界书条目位置类型 */
export type WorldInfoPosition =
    | 'before_character_definition'
    | 'after_character_definition'
    | 'before_example_messages'
    | 'after_example_messages'
    | 'at_depth';

/** 世界书条目策略类型 */
export type WorldInfoStrategy = 'constant' | 'selective' | 'vectorized';

/** 世界书条目角色 */
export type WorldInfoRole = 'system' | 'assistant' | 'user';

/** 创建世界书条目的参数 */
export interface CreateWorldInfoEntryParams {
    /** 条目名称 */
    name: string;
    /** 条目内容 */
    content: string;
    /** 是否启用 */
    enabled?: boolean;
    /** 是否常亮（蓝灯） */
    constant?: boolean;
    /** 触发关键词 */
    keys?: string[];
    /** 次要关键词 */
    keysSecondary?: string[];
    /** 位置类型 */
    position?: WorldInfoPosition;
    /** 角色 */
    role?: WorldInfoRole;
    /** 深度 */
    depth?: number;
    /** 排序权重 */
    order?: number;
    /** 触发概率 */
    probability?: number;
    /** 递归设置 */
    recursion?: {
        prevent_incoming?: boolean;
        prevent_outgoing?: boolean;
    };
}

/** 世界书条目 */
export interface WorldInfoEntry {
    uid: number;
    name: string;
    content: string;
    enabled: boolean;
    constant: boolean;
    keys: string[];
    position: WorldInfoPosition;
    depth: number;
    order: number;
    tokenCount?: number;
    recursion?: {
        prevent_incoming?: boolean;
        prevent_outgoing?: boolean;
    };
}

/** 世界书 Token 统计 */
export interface WorldInfoTokenStats {
    totalTokens: number;
    entryCount: number;
    entries: Array<{ name: string; tokens: number }>;
}

/**
 * 获取 SillyTavern 的 tokenizers 模块
 */
async function getTokenCountAsync(text: string): Promise<number> {
    try {
        // @ts-expect-error - SillyTavern 全局对象
        const SillyTavern = window.SillyTavern;
        if (SillyTavern?.getContext) {
            const context = SillyTavern.getContext();
            if (context?.getTokenCountAsync) {
                return await context.getTokenCountAsync(text);
            }
        }

        // fallback: 字符估算 (约 4 字符 = 1 token)
        return Math.ceil(text.length / 4);
    } catch {
        console.warn('[Engram] WorldInfoService: 无法使用酒馆 Token 计数，使用估算');
        return Math.ceil(text.length / 4);
    }
}

/**
 * 获取 TavernHelper API (如果可用)
 * 类型基于 the_world 插件验证过的 API
 */
function getTavernHelper(): {
    // 世界书操作
    createWorldbook?: (name: string) => Promise<void>;
    getWorldbook?: (name: string) => Promise<unknown[]>;
    createWorldbookEntries?: (name: string, entries: unknown[]) => Promise<void>;
    updateWorldbookWith?: (name: string, updater: (entries: unknown[]) => unknown[]) => Promise<void>;
    deleteWorldbookEntries?: (name: string, filter: (entry: unknown) => boolean) => Promise<void>;
    getWorldbookNames?: () => string[];
    deleteWorldbook?: (name: string) => Promise<boolean>;
    // 角色世界书绑定
    getCharWorldbookNames?: (mode: 'current' | 'all') => { primary?: string; additional: string[] } | null;
    rebindCharWorldbooks?: (mode: 'current', books: { primary?: string; additional: string[] }) => Promise<void>;
} | null {
    try {
        // @ts-expect-error - TavernHelper 全局对象
        return window.TavernHelper || null;
    } catch {
        return null;
    }
}

/** 总结条目关键词 - 用于筛选 Engram 创建的摘要条目 */
export const SUMMARY_ENTRY_KEY = 'engram总结';

/**
 * WorldInfoService 类
 * 提供世界书操作和 Token 计数功能
 */
export class WorldInfoService {
    /**
     * 计算文本的 Token 数量
     * @param text 文本内容
     */
    static async countTokens(text: string): Promise<number> {
        return getTokenCountAsync(text);
    }

    /**
     * 计算特定世界书中所有 Engram 总结条目的 Token 总和
     * 仅计算已启用的条目，使用关键词筛选
     * @param worldbookName 世界书名称
     */
    static async countSummaryTokens(worldbookName: string): Promise<number> {
        const entries = await this.getEntries(worldbookName);
        // 使用关键词筛选 Engram 总结条目
        const summaryEntries = entries.filter(e =>
            e.enabled && e.keys.includes(SUMMARY_ENTRY_KEY)
        );

        if (summaryEntries.length === 0) return 0;

        const contents = summaryEntries.map(e => e.content);
        const tokens = await Promise.all(contents.map(c => this.countTokens(c)));
        return tokens.reduce((sum, t) => sum + t, 0);
    }

    /**
     * 获取当前角色的所有 Engram 摘要内容（用于 {{engramSummaries}} 宏）
     * 返回格式化后的摘要文本，供精简功能使用
     */
    static async getEngramSummariesContent(): Promise<string> {
        const worldbookName = this.findExistingWorldbook();
        if (!worldbookName) {
            return '';
        }

        const entries = await this.getEntries(worldbookName);
        // 使用关键词筛选 Engram 总结条目
        const summaryEntries = entries.filter(e => e.keys.includes(SUMMARY_ENTRY_KEY));

        if (summaryEntries.length === 0) {
            return '';
        }

        // 按 order 排序（确保按时间顺序）
        summaryEntries.sort((a, b) => a.order - b.order);

        // 格式化输出：移除元数据注释，只保留摘要内容
        const formattedSummaries = summaryEntries.map(entry => {
            // 移除 {{// ... }} 元数据注释
            const content = entry.content.replace(/\{\{\/\/.*?\}\}/gs, '').trim();
            return `【${entry.name}】\n${content}`;
        });

        return formattedSummaries.join('\n\n---\n\n');
    }

    /**
     * 批量计算多段文本的 Token 数量
     * @param texts 文本数组
     */
    static async countTokensBatch(texts: string[]): Promise<number[]> {
        return Promise.all(texts.map(t => getTokenCountAsync(t)));
    }

    /**
     * 查找已绑定的 Engram 世界书（不创建）
     * 用于面板显示等只读场景
     */
    static findExistingWorldbook(): string | null {
        try {
            const helper = getTavernHelper();
            if (!helper?.getCharWorldbookNames) {
                return null;
            }

            const charBooks = helper.getCharWorldbookNames('current');
            if (charBooks) {
                const allBooks = [...(charBooks.additional || []), charBooks.primary].filter(Boolean);
                const existingBook = allBooks.find(name => name?.startsWith('[Engram]'));
                return existingBook || null;
            }
            return null;
        } catch {
            return null;
        }
    }

    /**
     * 获取或创建当前角色的 Engram 世界书
     * 如果不存在则创建并绑定到角色
     * **仅在需要写入时调用**
     * 
     * 学习自 the_world 插件的成功实现：
     * 1. TavernHelper.createWorldbook() 创建世界书
     * 2. TavernHelper.getCharWorldbookNames() 获取角色世界书配置
     * 3. TavernHelper.rebindCharWorldbooks() 绑定到角色
     */
    static async getOrCreateWorldbook(): Promise<string | null> {
        try {
            // 先检查是否已存在
            const existing = this.findExistingWorldbook();
            if (existing) {
                console.debug('[Engram] WorldInfoService: 使用已绑定的世界书', existing);
                return existing;
            }

            const helper = getTavernHelper();
            if (!helper) {
                console.warn('[Engram] WorldInfoService: TavernHelper 不可用');
                return null;
            }

            // @ts-expect-error - SillyTavern 全局对象
            const context = window.SillyTavern?.getContext?.();
            if (!context?.name2 || context.name2 === 'SillyTavern System') {
                console.warn('[Engram] WorldInfoService: 无效的角色上下文');
                return null;
            }

            const charName = context.name2;
            const worldbookName = `[Engram] ${charName}`;

            console.debug('[Engram] WorldInfoService: 创建新世界书', worldbookName);

            // 创建新世界书
            if (helper.createWorldbook) {
                await helper.createWorldbook(worldbookName);
            } else {
                console.error('[Engram] WorldInfoService: TavernHelper.createWorldbook 不可用');
                return null;
            }

            // 绑定到角色
            if (helper.getCharWorldbookNames && helper.rebindCharWorldbooks) {
                const currentBooks = helper.getCharWorldbookNames('current');
                if (currentBooks) {
                    currentBooks.additional.push(worldbookName);
                    await helper.rebindCharWorldbooks('current', currentBooks);
                    console.info('[Engram] WorldInfoService: 世界书已绑定到角色', {
                        character: charName,
                        worldbook: worldbookName
                    });
                }
            }

            return worldbookName;
        } catch (e) {
            console.error('[Engram] WorldInfoService: 获取/创建世界书失败', e);
            return null;
        }
    }

    /**
     * @deprecated 使用 getOrCreateWorldbook() 替代
     */
    static async getChatWorldbook(): Promise<string | null> {
        return this.getOrCreateWorldbook();
    }

    /**
     * 获取世界书的所有条目
     * @param worldbookName 世界书名称
     */
    static async getEntries(worldbookName: string): Promise<WorldInfoEntry[]> {
        const helper = getTavernHelper();
        if (!helper?.getWorldbook) {
            console.warn('[Engram] WorldInfoService: TavernHelper 不可用');
            return [];
        }

        try {
            const entries = await helper.getWorldbook(worldbookName);
            // 转换 TavernHelper 的 WorldbookEntry 结构
            return (entries as unknown[]).map((e: unknown) => {
                const entry = e as Record<string, unknown>;
                const strategy = entry.strategy as Record<string, unknown> | undefined;
                const position = entry.position as Record<string, unknown> | undefined;
                const recursion = entry.recursion as Record<string, boolean> | undefined;

                // 从 strategy.keys 提取关键词（可能是字符串或正则）
                const keys: string[] = [];
                if (strategy?.keys && Array.isArray(strategy.keys)) {
                    for (const k of strategy.keys) {
                        if (typeof k === 'string') {
                            keys.push(k);
                        } else if (k && typeof k === 'object' && 'source' in k) {
                            // RegExp 对象
                            keys.push((k as RegExp).source);
                        }
                    }
                }

                return {
                    uid: entry.uid as number || 0,
                    name: entry.name as string || '',
                    content: entry.content as string || '',
                    enabled: entry.enabled as boolean ?? true,
                    constant: strategy?.type === 'constant',
                    keys,
                    position: (position?.type as WorldInfoPosition) || 'before_character_definition',
                    depth: position?.depth as number || 0,
                    order: position?.order as number || 100,
                    recursion: recursion ? {
                        prevent_incoming: recursion.prevent_incoming,
                        prevent_outgoing: recursion.prevent_outgoing
                    } : undefined
                };
            });
        } catch (e) {
            console.error('[Engram] WorldInfoService: 获取世界书条目失败', e);
            return [];
        }
    }

    /**
     * 获取所有世界书名称
     */
    static async getWorldbookNames(): Promise<string[]> {
        const helper = getTavernHelper();
        try {
            if (helper?.getWorldbookNames) {
                return helper.getWorldbookNames();
            }
            return [];
        } catch (e) {
            console.error('[Engram] WorldInfoService: 获取世界书列表失败', e);
            return [];
        }
    }

    /**
     * 删除世界书
     * @param worldbookName 世界书名称
     */
    static async deleteWorldbook(worldbookName: string): Promise<boolean> {
        const helper = getTavernHelper();
        if (!helper?.deleteWorldbook) {
            console.warn('[Engram] WorldInfoService: TavernHelper.deleteWorldbook 不可用');
            return false;
        }

        try {
            const success = await helper.deleteWorldbook(worldbookName);
            if (success) {
                console.info('[Engram] WorldInfoService: 已删除世界书', worldbookName);
            }
            return success;
        } catch (e) {
            console.error('[Engram] WorldInfoService: 删除世界书失败', e);
            return false;
        }
    }

    /**
     * 创建新的世界书条目
     * 使用 TavernHelper API（与 the_world 插件保持一致）
     * @param worldbookName 世界书名称
     * @param params 条目参数
     */
    static async createEntry(worldbookName: string, params: CreateWorldInfoEntryParams): Promise<boolean> {
        try {
            const helper = getTavernHelper();
            if (!helper?.createWorldbookEntries) {
                console.error('[Engram] WorldInfoService: TavernHelper.createWorldbookEntries 不可用');
                return false;
            }

            // 构建条目数据，格式与 the_world 插件一致
            const entryData = {
                name: params.name,
                content: params.content,
                comment: params.name,  // 用作备注
                disable: !(params.enabled ?? true),  // TavernHelper 使用 disable 字段
                strategy: {
                    type: params.constant ? 'constant' : 'selective',
                    keys: params.keys || [],
                },
                position: {
                    type: params.position || 'before_character_definition',
                    order: params.order ?? 100,
                    depth: params.depth ?? 4,
                },
                recursion: params.recursion,
            };

            console.debug('[Engram] WorldInfoService: 创建条目', {
                worldbook: worldbookName,
                name: params.name,
                contentLength: params.content.length
            });

            await helper.createWorldbookEntries(worldbookName, [entryData]);

            console.info('[Engram] WorldInfoService: 条目已保存到世界书', worldbookName);
            return true;
        } catch (e) {
            console.error('[Engram] WorldInfoService: 创建世界书条目失败', e);
            return false;
        }
    }

    /**
     * 更新世界书条目
     * @param worldbookName 世界书名称
     * @param uid 条目 UID
     * @param updates 更新内容
     */
    /**
     * 更新世界书条目
     * 使用 updateWorldbookWith 进行原地更新，避免创建重复条目
     * @param worldbookName 世界书名称
     * @param uid 条目 UID
     * @param updates 更新内容
     */
    static async updateEntry(worldbookName: string, uid: number, updates: Partial<WorldInfoEntry>): Promise<boolean> {
        const helper = getTavernHelper();
        if (!helper?.updateWorldbookWith) {
            console.warn('[Engram] WorldInfoService: TavernHelper.updateWorldbookWith 不可用');
            return false;
        }

        try {
            await helper.updateWorldbookWith(worldbookName, (entries: any[]) => {
                const index = entries.findIndex(e => e.uid === uid);
                if (index !== -1) {
                    const existing = entries[index];

                    // 1. 本地合并逻辑 (处理 WorldInfoEntry 类型的 updates)
                    // 注意：这里的 merged 是中间状态，最终要转换为 Tavern 的存储格式

                    // 处理 enabled -> disable
                    let disable = existing.disable;
                    if ('enabled' in updates) {
                        disable = !updates.enabled;
                    }

                    // 处理 strategy
                    let strategy = existing.strategy || { type: 'selective', keys: [] };
                    if ('constant' in updates || 'keys' in updates) {
                        const isConstant = updates.constant !== undefined ? updates.constant : (strategy.type === 'constant');
                        const keys = updates.keys !== undefined ? updates.keys : (strategy.keys || []);
                        strategy = {
                            ...strategy,
                            type: isConstant ? 'constant' : 'selective',
                            keys: keys
                        };
                    }

                    // 处理 position
                    let position = existing.position || { type: 'before_character_definition', order: 0, depth: 0 };
                    if (updates.position || typeof updates.order === 'number' || typeof updates.depth === 'number') {
                        position = {
                            ...position,
                            type: (typeof updates.position === 'string' ? updates.position : (updates.position as any)?.type) || position.type,
                            order: updates.order ?? position.order,
                            depth: updates.depth ?? position.depth,
                        };
                    }

                    // 处理 recursion
                    let recursion = existing.recursion;
                    if (updates.recursion) {
                        recursion = updates.recursion;
                    }

                    // 2. 应用更新到条目
                    entries[index] = {
                        ...existing,
                        name: updates.name ?? existing.name,
                        content: updates.content ?? existing.content,
                        comment: updates.name ?? existing.comment, // 同步更新备注
                        disable,
                        strategy,
                        position,
                        recursion
                    };

                    console.debug('[Engram] WorldInfoService: 条目已更新 (In-Place)', { uid, name: entries[index].name });
                } else {
                    console.warn('[Engram] WorldInfoService: updateEntry 未找到条目', uid);
                }
                return entries;
            });
            return true;
        } catch (e) {
            console.error('[Engram] WorldInfoService: 更新世界书条目失败', e);
            return false;
        }
    }

    /**
     * 删除指定的世界书条目
     * @param worldbookName 世界书名称
     * @param uid 条目 UID
     */
    static async deleteEntry(worldbookName: string, uid: number): Promise<boolean> {
        const helper = getTavernHelper();
        if (!helper?.deleteWorldbookEntries) {
            console.warn('[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用');
            return false;
        }

        try {
            await helper.deleteWorldbookEntries(worldbookName, (entry: any) => entry.uid === uid);
            console.debug('[Engram] WorldInfoService: 已删除条目', { worldbook: worldbookName, uid });
            return true;
        } catch (e) {
            console.error('[Engram] WorldInfoService: 删除世界书条目失败', e);
            return false;
        }
    }

    /**
     * 批量删除世界书条目
     * @param worldbookName 世界书名称
     * @param uids 条目 UID 数组
     */
    static async deleteEntries(worldbookName: string, uids: number[]): Promise<boolean> {
        const helper = getTavernHelper();
        if (!helper?.deleteWorldbookEntries) {
            console.warn('[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用');
            return false;
        }

        try {
            const uidSet = new Set(uids);
            await helper.deleteWorldbookEntries(worldbookName, (entry: any) => uidSet.has(entry.uid));
            console.debug('[Engram] WorldInfoService: 已批量删除条目', { worldbook: worldbookName, count: uids.length });
            return true;
        } catch (e) {
            console.error('[Engram] WorldInfoService: 批量删除世界书条目失败', e);
            return false;
        }
    }

    /**
     * 获取所有 Engram 摘要条目（按 order 排序）
     * 使用关键词筛选，用于精简模块选取待合并的条目
     * @param worldbookName 世界书名称
     */
    static async getSummaryEntries(worldbookName: string): Promise<WorldInfoEntry[]> {
        const entries = await this.getEntries(worldbookName);
        // 使用关键词筛选 Engram 总结条目
        const summaryEntries = entries.filter(e => e.keys.includes(SUMMARY_ENTRY_KEY));
        // 按 order 升序排序
        summaryEntries.sort((a, b) => a.order - b.order);
        return summaryEntries;
    }

    /**
     * 从条目名称解析楼层范围
     * @param entryName 条目名称，如 "剧情摘要_1-10"
     * @returns [startFloor, endFloor] 或 null
     */
    static parseFloorRangeFromName(entryName: string): [number, number] | null {
        const match = entryName.match(/剧情摘要_(\d+)-(\d+)/);
        if (match) {
            return [parseInt(match[1], 10), parseInt(match[2], 10)];
        }
        return null;
    }

    /**
     * 确保分隔条目存在
     * 8999: 总结开始 <summary>
     * 10000: 总结结束 </summary>
     */
    static async ensureSeparatorEntries(worldbookName: string): Promise<void> {
        // Start Separator (8999)
        const startEntry = await this.findEntryByKey(worldbookName, '总结开始');
        if (!startEntry) {
            await this.createEntry(worldbookName, {
                name: '总结开始',
                content: '<summary>',
                keys: ['总结开始'],
                constant: true,
                order: 8999,
                enabled: true,
                position: 'before_character_definition'
            });
        }

        // End Separator (10000)
        const endEntry = await this.findEntryByKey(worldbookName, '总结结束');
        if (!endEntry) {
            await this.createEntry(worldbookName, {
                name: '总结结束',
                content: '</summary>',
                keys: ['总结结束'],
                constant: true,
                order: 10000,
                enabled: true,
                position: 'before_character_definition'
            });
        }
    }

    /**
     * 获取下一个可用的总结条目顺序号
     * 起始 9000，递增
     */
    static async getNextSummaryOrder(worldbookName: string): Promise<number> {
        const entries = await this.getEntries(worldbookName);
        // 筛选出 9000-9999 之间的条目
        const summaryOrders = entries
            .map(e => e.order)
            .filter(o => o >= 9000 && o < 10000);

        if (summaryOrders.length === 0) {
            return 9000;
        }

        const maxOrder = Math.max(...summaryOrders);
        return maxOrder + 1;
    }

    /**
     * 根据 Key 或名称查找条目
     * @param worldbookName 世界书名称
     * @param key 关键词
     */
    static async findEntryByKey(worldbookName: string, key: string): Promise<WorldInfoEntry | null> {
        const entries = await this.getEntries(worldbookName);
        // 先按 keys 数组查找
        let found = entries.find(e => e.keys.includes(key));
        // 如果没找到，尝试按名称查找（Engram System State 条目可能 keys 为空）
        // 兼容分隔条目按名字查找
        if (!found) {
            found = entries.find(e => e.name === key || (key === '__ENGRAM_STATE__' && e.name === 'Engram System State'));
        }
        return found || null;
    }

    /**
     * 获取世界书的 Token 统计
     * @param worldbookName 世界书名称
     */
    static async getWorldbookTokenStats(worldbookName: string): Promise<WorldInfoTokenStats> {
        const entries = await this.getEntries(worldbookName);

        const entriesWithTokens = await Promise.all(
            entries.map(async (e) => ({
                name: e.name,
                tokens: await this.countTokens(e.content),
            }))
        );

        const totalTokens = entriesWithTokens.reduce((sum, e) => sum + e.tokens, 0);

        return {
            totalTokens,
            entryCount: entries.length,
            entries: entriesWithTokens,
        };
    }

    /**
     * 检查 WorldInfoService 是否可用
     */
    static isAvailable(): boolean {
        return getTavernHelper() !== null;
    }

    /**
     * 检查 Token 计数是否使用酒馆原生 API
     */
    static async isNativeTokenCountAvailable(): Promise<boolean> {
        try {
            // @ts-expect-error - SillyTavern 全局对象
            const SillyTavern = window.SillyTavern;
            if (SillyTavern?.getContext) {
                const context = SillyTavern.getContext();
                return typeof context?.getTokenCountAsync === 'function';
            }
            return false;
        } catch {
            return false;
        }
    }

    /**
     * 获取所有激活的世界书条目内容（用于总结）
     * 使用酒馆原生 getWorldInfoPrompt 进行扫描，获取所有激活的条目
     * 支持：蓝灯（常驻）+ 绿灯（关键词触发）
     * 
     * @param chatMessages 可选，用于关键词扫描的聊天消息
     * @returns 格式化后的世界书内容字符串
     */
    static async getActivatedWorldInfo(chatMessages?: string[]): Promise<string> {
        try {
            // 使用运行时动态导入绕过 Rollup 的静态分析
            const importPath = '/scripts/world-info.js';
            // @ts-expect-error - 动态导入酒馆模块
            const worldInfoModule = await (new Function('path', 'return import(path)'))(importPath);
            const getWorldInfoPrompt = worldInfoModule?.getWorldInfoPrompt;

            if (typeof getWorldInfoPrompt !== 'function') {
                console.warn('[Engram] WorldInfoService: getWorldInfoPrompt 不可用，回退到常驻条目');
                return this.getConstantWorldInfo();
            }

            // 获取聊天消息用于关键词扫描
            let messages = chatMessages;
            if (!messages || messages.length === 0) {
                // 从酒馆上下文获取聊天记录
                // @ts-expect-error - 酒馆全局对象
                const context = window.SillyTavern?.getContext?.();
                if (context?.chat && Array.isArray(context.chat)) {
                    messages = context.chat.map((m: { mes?: string }) => m.mes || '').reverse();
                }
            }

            if (!messages || messages.length === 0) {
                console.warn('[Engram] WorldInfoService: 无聊天消息，回退到常驻条目');
                return this.getConstantWorldInfo();
            }

            // 调用世界书扫描（isDryRun=true 不触发额外事件）
            const maxContext = 8192; // 默认上下文大小
            const result = await getWorldInfoPrompt(messages, maxContext, true, {
                trigger: 'normal'
            });

            // 合并 before 和 after 位置的世界书内容
            const worldInfo = [
                result?.worldInfoBefore || '',
                result?.worldInfoAfter || ''
            ].filter(Boolean).join('\n\n').trim();

            if (worldInfo) {
                console.debug(`[Engram] WorldInfoService: 获取到激活的世界书内容 (${worldInfo.length} 字符)`);
            }

            return worldInfo;
        } catch (e) {
            console.warn('[Engram] WorldInfoService: 获取世界书失败，回退到常驻条目', e);
            return this.getConstantWorldInfo();
        }
    }

    /**
     * 获取常驻激活的世界书条目（蓝灯）
     * 作为 getActivatedWorldInfo 的回退方案
     */
    private static async getConstantWorldInfo(): Promise<string> {
        try {
            const importPath = '/scripts/world-info.js';
            // @ts-expect-error - 动态导入酒馆模块
            const worldInfoModule = await (new Function('path', 'return import(path)'))(importPath);
            const getSortedEntries = worldInfoModule?.getSortedEntries;

            if (typeof getSortedEntries !== 'function') {
                return '';
            }

            const entries = await getSortedEntries();
            if (!entries || !Array.isArray(entries)) {
                return '';
            }

            const constantEntries = entries.filter((e: {
                constant?: boolean;
                disable?: boolean;
                content?: string;
            }) => e.constant === true && e.disable !== true && e.content);

            if (constantEntries.length === 0) {
                return '';
            }

            console.debug(`[Engram] WorldInfoService: 回退获取 ${constantEntries.length} 个常驻条目`);
            return constantEntries.map((e: { content: string }) => e.content).join('\n\n');
        } catch {
            return '';
        }
    }
}

export default WorldInfoService;

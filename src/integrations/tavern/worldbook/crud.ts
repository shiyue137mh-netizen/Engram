import { Logger } from '@/core/logger';
import { getTavernHelper } from './adapter';
import { CreateWorldInfoEntryParams, WorldInfoEntry, WorldInfoPosition } from './types';

const MODULE = 'Worldbook';

/**
 * 获取世界书的所有条目
 * @param worldbookName 世界书名称
 */
export async function getEntries(worldbookName: string): Promise<WorldInfoEntry[]> {
    const helper = getTavernHelper();
    if (!helper?.getWorldbook) {
        Logger.warn(MODULE, 'TavernHelper 不可用');
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
                world: worldbookName, // Inject worldbook name for filtering context
                content: entry.content as string || '',
                enabled: typeof entry.enabled === 'boolean' ? entry.enabled : (entry.disable !== true),
                constant: strategy?.type === 'constant' || (entry.constant as boolean) === true,
                keys,
                position: (position?.type as WorldInfoPosition) || 'before_character_definition',
                depth: position?.depth as number || 0,
                order: position?.order as number || 100,
                recursion: recursion ? {
                    prevent_incoming: recursion.prevent_incoming,
                    prevent_outgoing: recursion.prevent_outgoing
                } : undefined,
                comment: entry.comment as string || '',
                extra: entry.extra as Record<string, any> || undefined
            };
        });
    } catch (e) {
        Logger.error(MODULE, '获取世界书条目失败', e);
        return [];
    }
}

/**
 * 获取所有世界书名称
 */
export async function getWorldbookNames(): Promise<string[]> {
    const helper = getTavernHelper();
    try {
        if (helper?.getWorldbookNames) {
            return helper.getWorldbookNames();
        }
        return [];
    } catch (e) {
        Logger.error(MODULE, '获取世界书列表失败', e);
        return [];
    }
}

/**
 * 删除世界书
 * @param worldbookName 世界书名称
 */
export async function deleteWorldbook(worldbookName: string): Promise<boolean> {
    const helper = getTavernHelper();
    if (!helper?.deleteWorldbook) {
        Logger.warn(MODULE, 'TavernHelper.deleteWorldbook 不可用');
        return false;
    }

    try {
        const success = await helper.deleteWorldbook(worldbookName);
        if (success) {
            Logger.info(MODULE, '已删除世界书', worldbookName);
        }
        return success;
    } catch (e) {
        Logger.error(MODULE, '删除世界书失败', e);
        return false;
    }
}

/**
 * 创建新的世界书条目
 * @param worldbookName 世界书名称
 * @param params 条目参数
 */
export async function createEntry(worldbookName: string, params: CreateWorldInfoEntryParams): Promise<boolean> {
    try {
        const helper = getTavernHelper();
        if (!helper?.createWorldbookEntries) {
            Logger.error(MODULE, 'TavernHelper.createWorldbookEntries 不可用');
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
            // 添加 Engram 身份标识
            extra: {
                engram: true
            }
        };

        Logger.debug(MODULE, '创建条目', {
            worldbook: worldbookName,
            name: params.name,
            contentLength: params.content.length
        });

        await helper.createWorldbookEntries(worldbookName, [entryData]);

        Logger.info(MODULE, '条目已保存到世界书', worldbookName);
        return true;
    } catch (e) {
        Logger.error(MODULE, '创建世界书条目失败', e);
        return false;
    }
}

/**
 * 更新世界书条目
 * @param worldbookName 世界书名称
 * @param uid 条目 UID
 * @param updates 更新内容
 */
export async function updateEntry(worldbookName: string, uid: number, updates: Partial<WorldInfoEntry>): Promise<boolean> {
    const helper = getTavernHelper();
    if (!helper?.updateWorldbookWith) {
        Logger.warn(MODULE, 'TavernHelper.updateWorldbookWith 不可用');
        return false;
    }

    try {
        await helper.updateWorldbookWith(worldbookName, (entries: any[]) => {
            const index = entries.findIndex(e => e.uid === uid);
            if (index !== -1) {
                const existing = entries[index];

                // 1. 本地合并逻辑 (处理 WorldInfoEntry 类型的 updates)

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

                Logger.debug(MODULE, '条目已更新 (In-Place)', { uid, name: entries[index].name });
            } else {
                Logger.warn(MODULE, 'updateEntry 未找到条目', uid);
            }
            return entries;
        });
        return true;
    } catch (e) {
        Logger.error(MODULE, '更新世界书条目失败', e);
        return false;
    }
}

/**
 * 删除指定的世界书条目
 * @param worldbookName 世界书名称
 * @param uid 条目 UID
 */
export async function deleteEntry(worldbookName: string, uid: number): Promise<boolean> {
    const helper = getTavernHelper();
    if (!helper?.deleteWorldbookEntries) {
        Logger.warn(MODULE, 'TavernHelper.deleteWorldbookEntries 不可用');
        return false;
    }

    try {
        await helper.deleteWorldbookEntries(worldbookName, (entry: any) => entry.uid === uid);
        Logger.debug(MODULE, '已删除条目', { worldbook: worldbookName, uid });
        return true;
    } catch (e) {
        Logger.error(MODULE, '删除世界书条目失败', e);
        return false;
    }
}

/**
 * 批量删除世界书条目
 * @param worldbookName 世界书名称
 * @param uids 条目 UID 数组
 */
export async function deleteEntries(worldbookName: string, uids: number[]): Promise<boolean> {
    const helper = getTavernHelper();
    if (!helper?.deleteWorldbookEntries) {
        Logger.warn(MODULE, 'TavernHelper.deleteWorldbookEntries 不可用');
        return false;
    }

    try {
        const uidSet = new Set(uids);
        await helper.deleteWorldbookEntries(worldbookName, (entry: any) => uidSet.has(entry.uid));
        Logger.debug(MODULE, '已批量删除条目', { worldbook: worldbookName, count: uids.length });
        return true;
    } catch (e) {
        Logger.error(MODULE, '批量删除世界书条目失败', e);
        return false;
    }
}

/**
 * 根据 Key 或名称查找条目
 * @param worldbookName 世界书名称
 * @param key 关键词
 */
export async function findEntryByKey(worldbookName: string, key: string): Promise<WorldInfoEntry | null> {
    const entries = await getEntries(worldbookName);
    // 先按 keys 数组查找
    let found = entries.find(e => e.keys.includes(key));
    // 如果没找到，尝试按名称查找（兼容旧逻辑）
    if (!found) {
        found = entries.find(e => e.name === key || (key === '__ENGRAM_STATE__' && e.name === 'Engram System State'));
    }
    return found || null;
}

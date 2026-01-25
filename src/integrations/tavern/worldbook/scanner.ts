import { WorldInfoEntry } from './types';
import { getEntries } from './crud';
import { getTavernHelper } from './adapter';
import { Logger } from '@/core/logger';

// 动态加载 world-info.js 中模块的类型定义 (近似)
interface WorldInfoModule {
    checkWorldInfo: (
        chat: string[],
        maxContext: number,
        isConnected: boolean,
        options: { trigger: string }
    ) => Promise<{ allActivatedEntries: Set<any> }>;
    getWorldInfoPrompt: (message: string) => Promise<string>;
    getSortedEntries: () => Promise<any[]>;
}

/**
 * 获取常驻激活的世界书条目（蓝灯）
 * fallback
 */
async function getConstantWorldInfo(): Promise<string> {
    try {
        const importPath = '/scripts/world-info.js';
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

        console.debug(`[Engram] WorldbookScanner: 回退获取 ${constantEntries.length} 个常驻条目`);
        return constantEntries.map((e: { content: string }) => e.content).join('\n\n');
    } catch {
        return '';
    }
}

/**
 * 加载过滤所需的所有状态配置
 * @private
 */
async function loadFilteringState() {
    const helper = getTavernHelper();
    const globalWorldbooks = helper?.getGlobalWorldbookNames?.() || [];

    const { SettingsManager } = await import('@/config/settings');
    const settings = SettingsManager.getSettings();
    const config = settings.apiSettings?.worldbookConfig;
    const disabledGlobalBooks = config?.disabledWorldbooks || [];

    // 加载角色特定状态 (用于条目黑名单)
    const { WorldBookStateService } = await import('./state');
    const charBooks = helper?.getCharWorldbookNames?.('current');
    let disabledEntries: Record<string, number[]> = {};

    if (charBooks?.primary) {
        const state = await WorldBookStateService.loadState(charBooks.primary);
        disabledEntries = state.disabledEntries || {};
    }

    return {
        globalWorldbooks,
        disabledGlobalBooks,
        disabledEntries,
        config
    };
}

/**
 * 判断单个条目是否应该被包含
 * @private
 */
function shouldIncludeEntry(
    entry: any,
    globalWorldbooks: string[],
    disabledGlobalBooks: string[],
    disabledEntries: Record<string, number[]>,
    config: any
): boolean {
    // (1) Engram 自身条目：始终保留
    if (entry.extra?.engram === true) return true;
    if (entry.world?.startsWith('[Engram]')) return true;

    // (1.5) 显式禁用检查：如果在 Engram 全局禁用列表中，直接排除
    if (entry.world && disabledGlobalBooks.includes(entry.world)) {
        return false;
    }

    // (2) 全局世界书逻辑：根据 includeGlobal 过滤
    if (entry.world && globalWorldbooks.includes(entry.world)) {
        // 如果未启用全局世界书，直接排除
        if (config?.includeGlobal === false) return false;
    }

    // (3) 条目级黑名单：如果 uid 在禁用列表中，排除
    if (entry.world && entry.uid) {
        const bookDisabledList = disabledEntries[entry.world];
        if (bookDisabledList && bookDisabledList.includes(entry.uid)) {
            return false;
        }
    }

    // (4) 额外保险：排除常见全局规则世界书命名前缀 (硬编码规则)
    if (entry.world?.startsWith('格式')) return false;
    if (entry.world?.startsWith('---')) return false;

    // (5) 其他条目：保留
    return true;
}

/**
 * WorldbookScannerService - 负责世界书的扫描与过滤逻辑
 */
export class WorldbookScannerService {
    /**
     * V1.1.0: 扫描指定世界书（白名单模式）
     * @param worldbookName 世界书名称
     * @param contextText 扫描上下文
     */
    static async scanWorldbook(worldbookName: string, contextText: string): Promise<string> {
        const entries = await getEntries(worldbookName);
        if (entries.length === 0) return '';

        const activeEntries: WorldInfoEntry[] = [];
        const lowerContext = contextText.toLowerCase();

        for (const entry of entries) {
            // 1. 必须启用
            if (!entry.enabled) continue;

            // 2. 常驻条目直接激活
            if (entry.constant) {
                activeEntries.push(entry);
                continue;
            }

            // 3. 关键词匹配
            if (entry.keys && entry.keys.length > 0) {
                // ST 逻辑: OR 关系 (只要命中一个 key)
                let matched = false;
                for (const key of entry.keys) {
                    if (!key) continue;
                    // 简单包含检查 (忽略大小写)
                    if (lowerContext.includes(key.toLowerCase())) {
                        matched = true;
                        break;
                    }
                }
                if (matched) {
                    activeEntries.push(entry);
                }
            }
        }

        if (activeEntries.length > 0) {
            Logger.debug('WorldbookScanner', `扫描白名单世界书 [${worldbookName}]`, {
                total: entries.length,
                matched: activeEntries.length
            });
            // 按 order 排序
            activeEntries.sort((a, b) => a.order - b.order);
            return activeEntries.map(e => e.content).join('\n\n');
        }

        return '';
    }

    /**
     * 获取所有激活的世界书条目内容（用于总结）
     * 使用酒馆原生 getWorldInfoPrompt 进行扫描，获取所有激活的条目
     */
    static async getActivatedWorldInfo(
        chatMessages?: string[],
        options?: { floorRange?: [number, number] }
    ): Promise<string> {
        try {
            // 使用运行时动态导入
            const importPath = '/scripts/world-info.js';
            const worldInfoModule = await (new Function('path', 'return import(path)'))(importPath);
            const getWorldInfoPrompt = worldInfoModule?.getWorldInfoPrompt;
            const getSortedEntries = worldInfoModule?.getSortedEntries;

            // 诊断信息
            if (typeof getSortedEntries === 'function') {
                const allEntries = await getSortedEntries();
                // 简单log一下
                if (allEntries && allEntries.length > 0) {
                    //
                }
            }

            if (typeof getWorldInfoPrompt !== 'function') {
                Logger.warn('WorldbookScanner', 'getWorldInfoPrompt 不可用，回退到常驻条目');
                return getConstantWorldInfo();
            }

            const DEFAULT_SCAN_LIMIT = 4;
            let messages = chatMessages;

            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();

            if (options?.floorRange) {
                const [startFloor, endFloor] = options.floorRange;
                if (context?.chat && Array.isArray(context.chat)) {
                    const rangeChat = context.chat.slice(startFloor - 1, endFloor);
                    messages = rangeChat.map((m: { mes?: string }) => m.mes || '').reverse();
                    Logger.debug('WorldbookScanner', '使用楼层范围扫描', {
                        floorRange: options.floorRange,
                        messageCount: messages.length
                    });
                }
            } else if (!messages || messages.length === 0) {
                if (context?.chat && Array.isArray(context.chat)) {
                    const recentChat = context.chat.slice(-DEFAULT_SCAN_LIMIT);
                    messages = recentChat.map((m: { mes?: string }) => m.mes || '').reverse();
                    Logger.debug('WorldbookScanner', '使用默认最近消息扫描', {
                        scanLimit: DEFAULT_SCAN_LIMIT,
                        messageCount: messages.length
                    });
                }
            }

            if (!messages || messages.length === 0) {
                Logger.warn('WorldbookScanner', '无聊天消息，回退到常驻条目');
                return getConstantWorldInfo();
            }

            // 调用扫描逻辑
            const avgTokensPerMessage = 500;
            const maxContextScan = Math.max(10000, messages.length * avgTokensPerMessage);
            const checkWorldInfo = worldInfoModule?.checkWorldInfo;

            if (typeof checkWorldInfo !== 'function') {
                Logger.error('WorldbookScanner', 'checkWorldInfo 不可用');
                return getConstantWorldInfo();
            }

            const result = await checkWorldInfo(messages, maxContextScan, true, {
                trigger: 'normal'
            });

            // 获取结果并过滤
            // @ts-ignore
            const allEntriesSet: Set<any> = result?.allActivatedEntries;
            const entries = allEntriesSet ? Array.from(allEntriesSet.values()) : [];

            Logger.info('WorldbookScanner', `扫描完成，共激活 ${entries.length} 个条目`);

            const filterState = await loadFilteringState();
            const { disabledGlobalBooks, disabledEntries, globalWorldbooks, config } = filterState;

            const filteredEntries = entries.filter((entry) =>
                shouldIncludeEntry(entry, globalWorldbooks, disabledGlobalBooks, disabledEntries, config)
            );

            Logger.info('WorldbookScanner', '筛选结果', {
                total: entries.length,
                kept: filteredEntries.length,
                filteredOut: entries.length - filteredEntries.length
            });

            filteredEntries.sort((a, b) => (a.order || 0) - (b.order || 0));

            return filteredEntries
                .map(e => e.content)
                .filter(Boolean)
                .join('\n\n');

        } catch (e) {
            Logger.error('WorldbookScanner', '获取激活世界书失败', e);
            return getConstantWorldInfo();
        }
    }
}

import { WorldInfoEntry } from './types';
import { getEntries, createEntry, findEntryByKey, getWorldbookNames } from './crud';
import { getTavernHelper } from './adapter';
import { SUMMARY_ENTRY_KEY } from './constants';
import { Logger } from '@/core/logger';

const MODULE = 'Worldbook';

/**
 * WorldbookEngramService - Engram 特定的业务逻辑
 * (绑定、摘要获取、分隔符等)
 */
export class WorldbookEngramService {

    /**
     * 查找已绑定的 Engram 世界书（不创建）
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
     */
    static async getOrCreateWorldbook(): Promise<string | null> {
        try {
            const existing = this.findExistingWorldbook();
            if (existing) {
                return existing;
            }

            const helper = getTavernHelper();
            if (!helper) {
                Logger.warn(MODULE, 'TavernHelper 不可用');
                return null;
            }

            // @ts-ignore
            const context = window.SillyTavern?.getContext?.();
            if (!context?.name2 || context.name2 === 'SillyTavern System') {
                Logger.warn(MODULE, '无效的角色上下文');
                return null;
            }

            const charName = context.name2;
            const worldbookName = `[Engram] ${charName}`;

            Logger.debug(MODULE, '创建新世界书', worldbookName);

            if (helper.createWorldbook) {
                await helper.createWorldbook(worldbookName);
            } else {
                return null;
            }

            if (helper.getCharWorldbookNames && helper.rebindCharWorldbooks) {
                const currentBooks = helper.getCharWorldbookNames('current');
                if (currentBooks) {
                    currentBooks.additional.push(worldbookName);
                    await helper.rebindCharWorldbooks('current', currentBooks);
                    Logger.info(MODULE, '世界书已绑定到角色', {
                        character: charName,
                        worldbook: worldbookName
                    });
                }
            }

            return worldbookName;
        } catch (e) {
            Logger.error(MODULE, '获取/创建世界书失败', e);
            return null;
        }
    }

    /**
     * 获取所有 Engram 摘要条目（按 order 排序）
     */
    static async getSummaryEntries(worldbookName: string): Promise<WorldInfoEntry[]> {
        const entries = await getEntries(worldbookName);
        const summaryEntries = entries.filter(e => e.keys.includes(SUMMARY_ENTRY_KEY));
        summaryEntries.sort((a, b) => a.order - b.order);
        return summaryEntries;
    }

    /**
     * 获取当前角色的所有 Engram 摘要内容（用于 {{engramSummaries}} 宏）
     */
    static async getEngramSummariesContent(): Promise<string> {
        const worldbookName = this.findExistingWorldbook();
        if (!worldbookName) {
            return '';
        }

        const summaryEntries = await this.getSummaryEntries(worldbookName);

        if (summaryEntries.length === 0) {
            return '';
        }

        const formattedSummaries = summaryEntries.map(entry => {
            const content = entry.content.replace(/\{\{\/\/.*?\}\}/gs, '').trim();
            return `【${entry.name}】\n${content}`;
        });

        return formattedSummaries.join('\n\n---\n\n');
    }

    /**
     * 确保分隔条目存在
     */
    static async ensureSeparatorEntries(worldbookName: string): Promise<void> {
        const startEntry = await findEntryByKey(worldbookName, '总结开始');
        if (!startEntry) {
            await createEntry(worldbookName, {
                name: '总结开始',
                content: '<summary>',
                keys: ['总结开始'],
                constant: true,
                order: 8999,
                enabled: true,
                position: 'before_character_definition'
            });
        }

        const endEntry = await findEntryByKey(worldbookName, '总结结束');
        if (!endEntry) {
            await createEntry(worldbookName, {
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
     */
    static async getNextSummaryOrder(worldbookName: string): Promise<number> {
        const entries = await getEntries(worldbookName);
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
     * 从条目名称解析楼层范围
     */
    static parseFloorRangeFromName(entryName: string): [number, number] | null {
        const match = entryName.match(/剧情摘要_(\d+)-(\d+)/);
        if (match) {
            return [parseInt(match[1], 10), parseInt(match[2], 10)];
        }
        return null;
    }

    /**
     * 获取世界书的作用域分类 (全局/角色/所有)
     */
    static getScopes(): { global: string[]; chat: string[]; installed: string[] } {
        const helper = getTavernHelper();
        const global = helper?.getGlobalWorldbookNames?.() || [];
        const installed = helper?.getWorldbookNames?.() || [];

        let chat: string[] = [];
        if (helper?.getCharWorldbookNames) {
            const charBooks = helper.getCharWorldbookNames('current');
            if (charBooks) {
                chat = [...(charBooks.additional || []), charBooks.primary].filter(Boolean) as string[];
            }
        }

        return { global, chat, installed };
    }
}

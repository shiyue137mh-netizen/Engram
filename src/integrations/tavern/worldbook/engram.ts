import { Logger } from '@/core/logger';
import { getTavernHelper } from './adapter';

const MODULE = 'Worldbook';

/**
 * WorldbookEngramService - Engram 特定的业务逻辑
 * (绑定、摘要获取、分隔符等)
 */
export class WorldbookEngramService {

    static findExistingWorldbook(): string | null {
        try {
            const helper = getTavernHelper();
            if (!helper?.getGlobalWorldbookNames) {
                return null;
            }

            const globalBooks = helper.getGlobalWorldbookNames();
            if (globalBooks.includes('[Engram] Global')) {
                return '[Engram] Global';
            }
            return null;
        } catch {
            return null;
        }
    }

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

            const worldbookName = `[Engram] Global`;

            // 先检查是否已经存在该名字的实体世界书
            const allInstalled = helper.getWorldbookNames?.() || [];
            if (!allInstalled.includes(worldbookName)) {
                Logger.debug(MODULE, '创建新全局世界书', worldbookName);
                if (helper.createWorldbook) {
                    await helper.createWorldbook(worldbookName);
                } else {
                    return null;
                }
            }

            // 绑定到全局
            if (helper.getGlobalWorldbookNames && helper.rebindGlobalWorldbooks) {
                const currentGlobal = helper.getGlobalWorldbookNames();
                if (!currentGlobal.includes(worldbookName)) {
                    currentGlobal.push(worldbookName);
                    await helper.rebindGlobalWorldbooks(currentGlobal);
                    Logger.info(MODULE, '世界书已绑定到全局配置', {
                        worldbook: worldbookName
                    });
                }
            }

            return worldbookName;
        } catch (e) {
            Logger.error(MODULE, '获取/创建全局世界书失败', e);
            return null;
        }
    }

    /**
     * 获取所有 Engram 摘要条目（按 order 排序）
     */




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

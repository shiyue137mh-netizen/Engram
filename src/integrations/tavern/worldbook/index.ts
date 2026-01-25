export * from './types';
export * from './constants';
export * from './adapter';
export * from './crud';
export * from './metrics';
export * from './scanner';
export * from './engram';
export * from './state';
export * from './slot';

// Facade Implementation moved here
import {
    WorldInfoEntry,
    CreateWorldInfoEntryParams,
    WorldInfoTokenStats,
} from './types';
import { getTavernHelper } from './adapter';
import {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    deleteEntries,
    findEntryByKey,
    getWorldbookNames,
    deleteWorldbook
} from './crud';
import { WorldbookMetricsService } from './metrics';
import { WorldbookScannerService } from './scanner';
import { WorldbookEngramService } from './engram';

/**
 * WorldInfoService (Facade)
 *
 * 聚合各个分散模块的功能，提供统一的静态方法访问接口
 * 保持与旧版 WorldInfoService 兼容
 */
export class WorldInfoService {

    // =========================================================================
    // Metrics 代理 (metrics.ts)
    // =========================================================================

    static async countTokens(text: string): Promise<number> {
        return WorldbookMetricsService.countTokens(text);
    }

    static async countTokensBatch(texts: string[]): Promise<number[]> {
        return WorldbookMetricsService.countTokensBatch(texts);
    }

    static async countSummaryTokens(worldbookName: string): Promise<number> {
        return WorldbookMetricsService.countSummaryTokens(worldbookName);
    }

    static async getWorldbookTokenStats(worldbookName: string): Promise<WorldInfoTokenStats> {
        return WorldbookMetricsService.getWorldbookTokenStats(worldbookName);
    }

    static isAvailable(): boolean {
        return getTavernHelper() !== null;
    }

    static async isNativeTokenCountAvailable(): Promise<boolean> {
        return WorldbookMetricsService.isNativeTokenCountAvailable();
    }


    // =========================================================================
    // CRUD 代理 (crud.ts)
    // =========================================================================

    static async getEntries(worldbookName: string): Promise<WorldInfoEntry[]> {
        return getEntries(worldbookName);
    }

    static async getWorldbookNames(): Promise<string[]> {
        return getWorldbookNames();
    }

    static async deleteWorldbook(worldbookName: string): Promise<boolean> {
        return deleteWorldbook(worldbookName);
    }

    static async createEntry(worldbookName: string, params: CreateWorldInfoEntryParams): Promise<boolean> {
        return createEntry(worldbookName, params);
    }

    static async updateEntry(worldbookName: string, uid: number, updates: Partial<WorldInfoEntry>): Promise<boolean> {
        return updateEntry(worldbookName, uid, updates);
    }

    static async deleteEntry(worldbookName: string, uid: number): Promise<boolean> {
        return deleteEntry(worldbookName, uid);
    }

    static async deleteEntries(worldbookName: string, uids: number[]): Promise<boolean> {
        return deleteEntries(worldbookName, uids);
    }

    static async findEntryByKey(worldbookName: string, key: string): Promise<WorldInfoEntry | null> {
        return findEntryByKey(worldbookName, key);
    }


    // =========================================================================
    // Scanner 代理 (scanner.ts)
    // =========================================================================

    static async getActivatedWorldInfo(
        chatMessages?: string[],
        options?: { floorRange?: [number, number] }
    ): Promise<string> {
        return WorldbookScannerService.getActivatedWorldInfo(chatMessages, options);
    }

    static async scanWorldbook(worldbookName: string, contextText: string): Promise<string> {
        return WorldbookScannerService.scanWorldbook(worldbookName, contextText);
    }

    static getScopes() {
        return WorldbookEngramService.getScopes();
    }

    /**
     * 聚合世界书结构（用于 UI 展示等）
     */
    static async getWorldbookStructure() {
        const helper = getTavernHelper();
        if (!helper) return {};

        const allWorldbooks = helper.getWorldbookNames?.() || [];
        let charWorldbooks: string[] = [];
        if (helper.getCharWorldbookNames) {
            const charBooks = helper.getCharWorldbookNames('current');
            if (charBooks) {
                charWorldbooks = [...(charBooks.additional || []), charBooks.primary].filter(Boolean) as string[];
            }
        }
        const targetBooks = Array.from(new Set([...allWorldbooks, ...charWorldbooks])).sort();

        const structure: Record<string, any[]> = {};

        for (const book of targetBooks) {
            try {
                const entries = await getEntries(book);
                structure[book] = entries.map(e => ({
                    uid: e.uid,
                    name: e.name,
                    keys: e.keys,
                    constant: e.constant,
                    comment: e.comment || '',
                    content: e.content?.substring(0, 50) + '...'
                }));
            } catch (e) {
                structure[book] = [];
            }
        }
        return structure;
    }


    // =========================================================================
    // Engram 业务逻辑代理 (engram.ts)
    // =========================================================================

    static findExistingWorldbook(): string | null {
        return WorldbookEngramService.findExistingWorldbook();
    }

    static async getOrCreateWorldbook(): Promise<string | null> {
        return WorldbookEngramService.getOrCreateWorldbook();
    }

    static async getChatWorldbook(): Promise<string | null> {
        return WorldbookEngramService.getOrCreateWorldbook();
    }

    static async getEngramSummariesContent(): Promise<string> {
        return WorldbookEngramService.getEngramSummariesContent();
    }

    static async getSummaryEntries(worldbookName: string): Promise<WorldInfoEntry[]> {
        return WorldbookEngramService.getSummaryEntries(worldbookName);
    }

    static async ensureSeparatorEntries(worldbookName: string): Promise<void> {
        return WorldbookEngramService.ensureSeparatorEntries(worldbookName);
    }

    static async getNextSummaryOrder(worldbookName: string): Promise<number> {
        return WorldbookEngramService.getNextSummaryOrder(worldbookName);
    }

    static parseFloorRangeFromName(entryName: string): [number, number] | null {
        return WorldbookEngramService.parseFloorRangeFromName(entryName);
    }
}

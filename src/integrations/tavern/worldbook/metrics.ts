import { WorldInfoTokenStats, WorldInfoEntry } from './types';
import { getEntries } from '@/integrations/tavern/worldbook/crud';
import { SUMMARY_ENTRY_KEY } from './constants';

/**
 * 获取 SillyTavern 的 tokenizers 模块
 */
async function getTokenCountAsync(text: string): Promise<number> {
    try {
        // @ts-ignore - SillyTavern 全局对象
        const SillyTavern = window.SillyTavern;
        if (SillyTavern?.getContext) {
            const context = SillyTavern.getContext() as any;
            if (context?.getTokenCountAsync) {
                return await context.getTokenCountAsync(text);
            }
        }

        // fallback: 字符估算 (约 4 字符 = 1 token)
        return Math.ceil(text.length / 4);
    } catch {
        console.warn('[Engram] MetricsService: 无法使用酒馆 Token 计数，使用估算');
        return Math.ceil(text.length / 4);
    }
}

/**
 * WorldbookMetricsService - 负责 Token 计数相关逻辑
 */
export class WorldbookMetricsService {
    /**
     * 计算文本的 Token 数量
     * @param text 文本内容
     */
    static async countTokens(text: string): Promise<number> {
        return getTokenCountAsync(text);
    }

    /**
     * 批量计算多段文本的 Token 数量
     * @param texts 文本数组
     */
    static async countTokensBatch(texts: string[]): Promise<number[]> {
        return Promise.all(texts.map(t => getTokenCountAsync(t)));
    }

    /**
     * 计算特定世界书中所有 Engram 总结条目的 Token 总和
     * 仅计算已启用的条目，使用关键词筛选
     * @param worldbookName 世界书名称
     */
    static async countSummaryTokens(worldbookName: string): Promise<number> {
        const entries = await getEntries(worldbookName);
        // 使用关键词筛选 Engram 总结条目
        const summaryEntries = entries.filter((e: WorldInfoEntry) =>
            e.enabled && e.keys.includes(SUMMARY_ENTRY_KEY)
        );

        if (summaryEntries.length === 0) return 0;

        const contents = summaryEntries.map((e: WorldInfoEntry) => e.content);
        const tokens = await Promise.all(contents.map((c: string) => this.countTokens(c)));
        return tokens.reduce((sum: number, t: number) => sum + t, 0);
    }

    /**
     * 获取世界书的 Token 统计
     * @param worldbookName 世界书名称
     */
    static async getWorldbookTokenStats(worldbookName: string): Promise<WorldInfoTokenStats> {
        const entries = await getEntries(worldbookName);

        const entriesWithTokens = await Promise.all(
            entries.map(async (e: WorldInfoEntry) => ({
                name: e.name,
                tokens: await this.countTokens(e.content),
            }))
        );

        const totalTokens = entriesWithTokens.reduce((sum: number, e: { tokens: number }) => sum + e.tokens, 0);

        return {
            totalTokens,
            entryCount: entries.length,
            entries: entriesWithTokens,
        };
    }

    /**
     * 检查 Token 计数是否使用酒馆原生 API
     */
    static async isNativeTokenCountAvailable(): Promise<boolean> {
        try {
            // @ts-ignore
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
}

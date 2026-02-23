/**
 * TavernHelper Adapter
 * 封装对 window.TavernHelper 的访问
 */

/**
 * 获取 TavernHelper API (如果可用)
 * 类型基于 the_world 插件验证过的 API
 */
export function getTavernHelper(): {
    // 世界书操作
    createWorldbook?: (name: string) => Promise<void>;
    getWorldbook?: (name: string) => Promise<unknown[]>;
    createWorldbookEntries?: (name: string, entries: unknown[]) => Promise<void>;
    updateWorldbookWith?: (name: string, updater: (entries: unknown[]) => unknown[]) => Promise<void>;
    deleteWorldbookEntries?: (name: string, filter: (entry: unknown) => boolean) => Promise<void>;
    getWorldbookNames?: () => string[];
    getGlobalWorldbookNames?: () => string[];
    rebindGlobalWorldbooks?: (worldbook_names: string[]) => Promise<void>;
    deleteWorldbook?: (name: string) => Promise<boolean>;
    // 角色世界书绑定
    getCharWorldbookNames?: (mode: 'current' | 'all') => { primary?: string; additional: string[] } | null;
    rebindCharWorldbooks?: (mode: 'current', books: { primary?: string; additional: string[] }) => Promise<void>;
} | null {
    try {
        // @ts-ignore - TavernHelper 全局对象
        return window.TavernHelper || null;
    } catch {
        return null;
    }
}

/**
 * 检查 WorldInfo 功能是否可用
 */
function isWorldInfoAvailable(): boolean {
    return getTavernHelper() !== null;
}

/**
 * 全局类型声明
 *
 * 扩展 Window 接口，为 SillyTavern 全局 API 提供类型提示
 */

// 导入 ST 类型定义
/// <reference path="./st-types/index.d.ts" />

declare global {
    interface Window {
        /**
         * SillyTavern 核心 API
         */
        SillyTavern?: {
            getContext(): {
                chat: unknown[];
                chatId: string;
                characterId: number;
                characters: unknown[];
                groups: unknown[];
                name1: string;
                name2: string;
                onlineStatus: string;
                maxContext: number;
                // 更多字段可按需从 st-types 中扩展
            };
        };

        /**
         * jQuery (由 SillyTavern 提供)
         */
        jQuery: JQuery;
        $: JQuery;

        /**
         * SillyTavern 事件源
         */
        eventSource: EventTarget;

        /**
         * TavernHelper API (酒馆助手扩展提供)
         */
        TavernHelper?: {
            createWorldbook?: (name: string) => Promise<void>;
            getWorldbook?: (name: string) => Promise<unknown[]>;
            saveWorldbook?: (name: string) => Promise<void>;
            getCharWorldbookNames?: (mode: 'current' | 'all') => {
                primary?: string;
                additional: string[];
            } | null;
            rebindCharWorldbooks?: (
                mode: 'current',
                books: { primary?: string; additional: string[] }
            ) => Promise<void>;
            formatAsTavernRegexedString?: (
                text: string,
                placement: string, // 'ai_output' | 'user_input' etc
                options?: { isPrompt: boolean }
            ) => string;
        };
    }
}

// 确保这是一个模块
export { };

// Vite ?raw 导入声明
declare module '*.md?raw' {
    const content: string;
    export default content;
}

declare module '*.txt?raw' {
    const content: string;
    export default content;
}

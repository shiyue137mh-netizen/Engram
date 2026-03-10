/**
 * Vitest 全局 setup
 * Mock 掉浏览器相关依赖，让纯算法模块可以在 Node 里运行
 */
import { vi } from 'vitest';

// Mock Logger — BrainRecallCache 的唯一外部副作用依赖
vi.mock('@/core/logger', () => ({
    Logger: {
        debug: vi.fn((m, msg, data) => console.log(`[DEBUG][${m}] ${msg}`, data || '')),
        info: vi.fn((m, msg, data) => console.log(`[INFO][${m}] ${msg}`, data || '')),
        warn: vi.fn((m, msg, data) => console.warn(`[WARN][${m}] ${msg}`, data || '')),
        error: vi.fn((m, msg, data) => console.error(`[ERROR][${m}] ${msg}`, data || '')),
        success: vi.fn((m, msg, data) => console.log(`[SUCCESS][${m}] ${msg}`, data || '')),
        init: vi.fn().mockResolvedValue(undefined),
    },
    LogModule: {
        RAG_CACHE: 'RAG_CACHE',
        RAG_RETRIEVE: 'RAG_RETRIEVE',
        PREPROCESS: 'PREPROCESS',
        DATABASE: 'DATABASE',
        RAG_INJECT: 'RAG_INJECT',
    },
}));

// Mock IndexedDB using fake-indexeddb
import 'fake-indexeddb/auto';

// Mock global SillyTavern environment
(global as any).window = {
    $: vi.fn(() => ({
        on: vi.fn(),
        trigger: vi.fn(),
    })),
    SillyTavern: {
        getContext: vi.fn(() => ({
            characters: [],
            chat: [],
            characterId: 'test_char',
            chatId: 'test_chat'
        })),
    },
    TavernHelper: {
        getSettings: vi.fn(() => ({})),
    }
};

(global as any).$ = (global as any).window.$;

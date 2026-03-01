/**
 * DevLog Store - 使用 Zustand 管理开发日志状态
 *
 * 替换原有的 useDevLog hook 中的状态管理部分
 */

import { LogEntry, LogLevel } from '@/core/logger';
import { create } from 'zustand';

// 模块列表（用于过滤）
export const LOG_MODULES = [
    'ALL',
    'Logger',
    'EventBus',
    'Summarizer',
    'CORE/Pipeline',
    'CORE/RAG',
    'CORE/Memory',
    'UI/GraphView',
    'UI/MemoryStream',
] as const;

interface DevLogState {
    /** 所有日志 */
    logs: LogEntry[];
    /** 搜索关键词 */
    searchQuery: string;
    /** 日志级别过滤 (-1 表示全部) */
    levelFilter: LogLevel | -1;
    /** 模块过滤 */
    moduleFilter: string;
    /** 自动滚动 */
    autoScroll: boolean;

    // Actions
    /** 添加日志 */
    addLog: (entry: LogEntry) => void;
    /** 设置所有日志 */
    setLogs: (logs: LogEntry[]) => void;
    /** 清空日志 */
    clearLogs: () => void;
    /** 设置搜索关键词 */
    setSearchQuery: (query: string) => void;
    /** 设置级别过滤 */
    setLevelFilter: (level: LogLevel | -1) => void;
    /** 设置模块过滤 */
    setModuleFilter: (module: string) => void;
    /** 切换自动滚动 */
    toggleAutoScroll: () => void;
}

/**
 * 开发日志状态 Store
 */
export const useDevLogStore = create<DevLogState>((set) => ({
    logs: [],
    searchQuery: '',
    levelFilter: -1,
    moduleFilter: 'ALL',
    autoScroll: true,

    addLog: (entry) => set((state) => ({
        logs: [...state.logs, entry].slice(-500) // Phase 2: FIFO (保留最新 500 条)
    })),

    setLogs: (logs) => set({ logs: logs.slice(-500) }), // Phase 2: FIFO

    clearLogs: () => set({ logs: [] }),

    setSearchQuery: (searchQuery) => set({ searchQuery }),

    setLevelFilter: (levelFilter) => set({ levelFilter }),

    setModuleFilter: (moduleFilter) => set({ moduleFilter }),

    toggleAutoScroll: () => set((state) => ({
        autoScroll: !state.autoScroll
    })),
}));

/**
 * 计算过滤后的日志 (派生状态，使用选择器)
 */
export const selectFilteredLogs = (state: Pick<DevLogState, 'logs' | 'searchQuery' | 'levelFilter' | 'moduleFilter'>): LogEntry[] => {
    let result = state.logs;

    // 按级别过滤
    if (state.levelFilter !== -1) {
        result = result.filter((log) => log.level >= state.levelFilter);
    }

    // 按模块过滤
    if (state.moduleFilter !== 'ALL') {
        result = result.filter((log) => log.module.startsWith(state.moduleFilter));
    }

    // 按关键词搜索
    if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(
            (log) =>
                log.message.toLowerCase().includes(query) ||
                log.module.toLowerCase().includes(query)
        );
    }

    return result;
};

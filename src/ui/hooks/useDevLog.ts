/**
 * useDevLog - 开发日志管理 Hook
 * 
 * 内部使用 Zustand store，保持原有 API 向后兼容
 * 推荐直接使用 useDevLogStore 以获得更好的性能
 */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { Logger, LogEntry, LogLevel } from "@/core/logger";
import { useDevLogStore, selectFilteredLogs } from '@/state/devLogStore';

// 重新导出模块列表
export { LOG_MODULES } from '@/state/devLogStore';

export interface UseDevLogReturn {
    // 状态
    logs: LogEntry[];
    filteredLogs: LogEntry[];
    searchQuery: string;
    levelFilter: LogLevel | -1;
    moduleFilter: string;
    autoScroll: boolean;

    // Refs
    terminalRef: React.RefObject<HTMLDivElement | null>;
    bottomRef: React.RefObject<HTMLDivElement | null>;

    // 操作
    setSearchQuery: (query: string) => void;
    setLevelFilter: (level: LogLevel | -1) => void;
    setModuleFilter: (module: string) => void;
    toggleAutoScroll: () => void;
    clearLogs: () => Promise<void>;
    exportLogs: () => void;
}

export function useDevLog(): UseDevLogReturn {
    // 使用 Zustand store
    const logs = useDevLogStore(state => state.logs);
    const searchQuery = useDevLogStore(state => state.searchQuery);
    const levelFilter = useDevLogStore(state => state.levelFilter);
    const moduleFilter = useDevLogStore(state => state.moduleFilter);
    const autoScroll = useDevLogStore(state => state.autoScroll);

    const addLog = useDevLogStore(state => state.addLog);
    const setLogs = useDevLogStore(state => state.setLogs);
    const clearLogsStore = useDevLogStore(state => state.clearLogs);
    const setSearchQuery = useDevLogStore(state => state.setSearchQuery);
    const setLevelFilter = useDevLogStore(state => state.setLevelFilter);
    const setModuleFilter = useDevLogStore(state => state.setModuleFilter);
    const toggleAutoScroll = useDevLogStore(state => state.toggleAutoScroll);

    // 计算过滤后的日志
    const filteredLogs = useMemo(() =>
        selectFilteredLogs({ logs, searchQuery, levelFilter, moduleFilter }),
        [logs, searchQuery, levelFilter, moduleFilter]
    );

    const terminalRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // 初始化和订阅日志
    useEffect(() => {
        setLogs(Logger.getLogs());
        const unsubscribe = Logger.subscribe((entry) => {
            addLog(entry);
        });
        return () => unsubscribe();
    }, [setLogs, addLog]);

    // 自动滚动到底部
    useEffect(() => {
        if (autoScroll && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [filteredLogs, autoScroll]);

    // 清空日志
    const clearLogs = useCallback(async () => {
        await Logger.clear();
        clearLogsStore();
    }, [clearLogsStore]);

    // 导出日志
    const exportLogs = useCallback(() => {
        const markdown = Logger.exportToMarkdown();
        const filename = Logger.getExportFilename();

        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, []);

    return {
        logs,
        filteredLogs,
        searchQuery,
        levelFilter,
        moduleFilter,
        autoScroll,
        terminalRef,
        bottomRef,
        setSearchQuery,
        setLevelFilter,
        setModuleFilter,
        toggleAutoScroll,
        clearLogs,
        exportLogs,
    };
}


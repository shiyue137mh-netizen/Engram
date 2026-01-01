/**
 * useDevLog - 开发日志管理 Hook
 * 
 * 将 DevLog 视图中的状态管理逻辑抽离出来。
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Logger, LogEntry, LogLevel } from "@/lib/logger";

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
];

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
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<LogLevel | -1>(-1);
    const [moduleFilter, setModuleFilter] = useState('ALL');
    const [autoScroll, setAutoScroll] = useState(true);

    const terminalRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // 初始化和订阅日志
    useEffect(() => {
        setLogs(Logger.getLogs());
        const unsubscribe = Logger.subscribe((entry) => {
            setLogs((prev) => [...prev, entry]);
        });
        return () => unsubscribe();
    }, []);

    // 过滤日志
    useEffect(() => {
        let result = logs;

        // 按级别过滤
        if (levelFilter !== -1) {
            result = result.filter((log) => log.level >= levelFilter);
        }

        // 按模块过滤
        if (moduleFilter !== 'ALL') {
            result = result.filter((log) => log.module.startsWith(moduleFilter));
        }

        // 按关键词搜索
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (log) =>
                    log.message.toLowerCase().includes(query) ||
                    log.module.toLowerCase().includes(query)
            );
        }

        setFilteredLogs(result);
    }, [logs, levelFilter, moduleFilter, searchQuery]);

    // 自动滚动到底部
    useEffect(() => {
        if (autoScroll && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [filteredLogs, autoScroll]);

    // 清空日志
    const clearLogs = useCallback(async () => {
        await Logger.clear();
        setLogs([]);
    }, []);

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

    // 切换自动滚动
    const toggleAutoScroll = useCallback(() => {
        setAutoScroll((prev) => !prev);
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

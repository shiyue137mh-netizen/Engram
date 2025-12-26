/**
 * DevLog - 开发日志视图
 *
 * 终端风格的日志查看器，支持过滤、搜索、清空和导出
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Terminal,
    Trash2,
    Download,
    Search,
    Filter,
    ArrowDownToLine,
} from 'lucide-react';
import { Logger, LogEntry, LogLevel, LogLevelConfig } from '../../infrastructure/logger';
import { LogEntryItem } from './LogEntryItem';

// 模块列表（用于过滤）
const MODULES = [
    'ALL',
    'Logger',
    'EventBus',
    'CORE/Pipeline',
    'CORE/RAG',
    'CORE/Memory',
    'UI/GraphView',
    'UI/MemoryStream',
];

export const DevLog: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<LogLevel | -1>(-1); // -1 表示全部
    const [moduleFilter, setModuleFilter] = useState('ALL');
    const [autoScroll, setAutoScroll] = useState(true);
    const [showLevelDropdown, setShowLevelDropdown] = useState(false);
    const [showModuleDropdown, setShowModuleDropdown] = useState(false);

    const terminalRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // 初始化和订阅日志
    useEffect(() => {
        // 加载现有日志
        setLogs(Logger.getLogs());

        // 订阅新日志
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
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [filteredLogs, autoScroll]);

    // 清空日志
    const handleClear = useCallback(async () => {
        await Logger.clear();
        setLogs([]);
    }, []);

    // 导出日志
    const handleExport = useCallback(() => {
        const markdown = Logger.exportToMarkdown();
        const filename = Logger.getExportFilename();

        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);

        Logger.success('DevLog', `日志已导出: ${filename}`);
    }, []);

    return (
        <div className="engram-dev-log">
            {/* 页面标题 */}
            <div className="engram-page-header">
                <Terminal size={24} />
                <h2>开发日志</h2>
            </div>

            {/* 工具栏 */}
            <div className="engram-log-toolbar">
                {/* 级别过滤 */}
                <div className="engram-dropdown">
                    <button
                        className="engram-btn engram-btn-ghost"
                        onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                    >
                        <Filter size={14} />
                        {levelFilter === -1 ? '全部级别' : LogLevelConfig[levelFilter].label}
                    </button>
                    {showLevelDropdown && (
                        <div className="engram-dropdown-menu">
                            <button
                                onClick={() => {
                                    setLevelFilter(-1);
                                    setShowLevelDropdown(false);
                                }}
                            >
                                全部级别
                            </button>
                            {Object.entries(LogLevelConfig).map(([level, config]) => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setLevelFilter(Number(level) as LogLevel);
                                        setShowLevelDropdown(false);
                                    }}
                                >
                                    {config.icon} {config.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 模块过滤 */}
                <div className="engram-dropdown">
                    <button
                        className="engram-btn engram-btn-ghost"
                        onClick={() => setShowModuleDropdown(!showModuleDropdown)}
                    >
                        <Filter size={14} />
                        {moduleFilter}
                    </button>
                    {showModuleDropdown && (
                        <div className="engram-dropdown-menu">
                            {MODULES.map((mod) => (
                                <button
                                    key={mod}
                                    onClick={() => {
                                        setModuleFilter(mod);
                                        setShowModuleDropdown(false);
                                    }}
                                >
                                    {mod}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 搜索框 */}
                <div className="engram-search-box">
                    <Search size={14} />
                    <input
                        type="text"
                        placeholder="搜索日志..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* 右侧按钮组 */}
                <div className="engram-toolbar-right">
                    {/* 自动滚动 */}
                    <button
                        className={`engram-btn engram-btn-ghost ${autoScroll ? 'active' : ''}`}
                        onClick={() => setAutoScroll(!autoScroll)}
                        title="自动滚动到最新"
                    >
                        <ArrowDownToLine size={14} />
                    </button>

                    {/* 清空 */}
                    <button
                        className="engram-btn engram-btn-ghost"
                        onClick={handleClear}
                        title="清空日志"
                    >
                        <Trash2 size={14} />
                    </button>

                    {/* 导出 */}
                    <button
                        className="engram-btn engram-btn-primary"
                        onClick={handleExport}
                        title="导出日志"
                    >
                        <Download size={14} />
                        导出
                    </button>
                </div>
            </div>

            {/* 终端区域 */}
            <div className="engram-terminal" ref={terminalRef}>
                {filteredLogs.length === 0 ? (
                    <div className="engram-terminal-empty">
                        <Terminal size={48} strokeWidth={1} />
                        <p>暂无日志记录</p>
                    </div>
                ) : (
                    <>
                        {filteredLogs.map((entry) => (
                            <LogEntryItem key={entry.id} entry={entry} />
                        ))}
                        <div ref={bottomRef} />
                    </>
                )}
            </div>

            {/* 状态栏 */}
            <div className="engram-log-statusbar">
                <span>共 {logs.length} 条日志</span>
                {filteredLogs.length !== logs.length && (
                    <span>（显示 {filteredLogs.length} 条）</span>
                )}
            </div>
        </div>
    );
};

export default DevLog;

/**
 * DevLog - 开发日志视图
 *
 * 包含两个 Tab：
 * 1. 运行日志 - 终端风格的日志查看器
 * 2. 模型日志 - 伪聊天式 LLM 调用记录
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Terminal,
    Trash2,
    Download,
    Search,
    Filter,
    ArrowDownToLine,
    Zap,
} from 'lucide-react';
import { Logger, LogEntry, LogLevel, LogLevelConfig } from '../../infrastructure/logger';
import { LogEntryItem } from './LogEntryItem';
import { ModelLog } from './ModelLog';

// Tab 类型
type TabType = 'runtime' | 'model';

// Tab 配置
const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'runtime', label: '运行日志', icon: Terminal },
    { id: 'model', label: '模型日志', icon: Zap },
];

// 模块列表（用于过滤）
const MODULES = [
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

export const DevLog: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('runtime');
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
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
        <div className="flex flex-col h-full gap-3">
            {/* 页面标题 + Tab 切换 */}
            <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2">
                    <Terminal size={24} className="text-foreground" />
                    <h2 className="text-lg font-medium text-foreground">开发日志</h2>
                </div>

                {/* Tab 切换 */}
                <div className="flex gap-1 ml-4">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${activeTab === tab.id
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ========== 运行日志 Tab ========== */}
            {activeTab === 'runtime' && (
                <>
                    {/* 工具栏 */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                        {/* 级别过滤 */}
                        <div className="relative">
                            <button
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-transparent border border-border text-muted-foreground hover:bg-accent transition-colors"
                                onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                            >
                                <Filter size={14} />
                                {levelFilter === -1 ? '全部级别' : LogLevelConfig[levelFilter].label}
                            </button>
                            {showLevelDropdown && (
                                <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[120px]">
                                    <button
                                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors"
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
                                            className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors"
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
                        <div className="relative">
                            <button
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-transparent border border-border text-muted-foreground hover:bg-accent transition-colors"
                                onClick={() => setShowModuleDropdown(!showModuleDropdown)}
                            >
                                <Filter size={14} />
                                {moduleFilter}
                            </button>
                            {showModuleDropdown && (
                                <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[120px]">
                                    {MODULES.map((mod) => (
                                        <button
                                            key={mod}
                                            className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors"
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
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md">
                            <Search size={14} className="text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="搜索日志..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* 右侧按钮组 */}
                        <div className="flex items-center gap-1 ml-auto">
                            {/* 自动滚动 */}
                            <button
                                className={`p-1.5 rounded-md transition-colors ${autoScroll ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}
                                onClick={() => setAutoScroll(!autoScroll)}
                                title="自动滚动到最新"
                            >
                                <ArrowDownToLine size={14} />
                            </button>

                            {/* 清空 */}
                            <button
                                className="p-1.5 rounded-md text-muted-foreground hover:bg-accent transition-colors"
                                onClick={handleClear}
                                title="清空日志"
                            >
                                <Trash2 size={14} />
                            </button>

                            {/* 导出 */}
                            <button
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                                onClick={handleExport}
                                title="导出日志"
                            >
                                <Download size={14} />
                                导出
                            </button>
                        </div>
                    </div>

                    {/* 终端区域 */}
                    <div className="flex-1 p-3 bg-card border border-border rounded-lg overflow-y-auto font-mono text-sm leading-relaxed" ref={terminalRef}>
                        {filteredLogs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
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
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground shrink-0">
                        <span>共 {logs.length} 条日志</span>
                        {filteredLogs.length !== logs.length && (
                            <span>（显示 {filteredLogs.length} 条）</span>
                        )}
                    </div>
                </>
            )}

            {/* ========== 模型日志 Tab ========== */}
            {activeTab === 'model' && (
                <div className="flex-1 overflow-hidden">
                    <ModelLog />
                </div>
            )}
        </div>
    );
};

export default DevLog;

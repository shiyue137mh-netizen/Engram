/**
 * DevLog - 开发日志视图
 * 
 * 应用「无框流体」设计语言：
 * - 减少卡片边框，使用细线分割
 * - 工具栏 sticky 固定
 * - 极简主义布局
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Terminal,
    Trash2,
    Download,
    Search,
    ChevronDown,
    ArrowDownToLine,
    Zap,
} from 'lucide-react';
import { Logger, LogEntry, LogLevel, LogLevelConfig } from '../../infrastructure/logger';
import { LogEntryItem } from './LogEntryItem';
import { ModelLog } from './ModelLog';
import { TabPills, Tab } from '../components/TabPills';

// Tab 类型
type TabType = 'runtime' | 'model';

// Tab 配置
const TABS: Tab[] = [
    { id: 'runtime', label: '运行日志', icon: <Terminal size={14} /> },
    { id: 'model', label: '模型日志', icon: <Zap size={14} /> },
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

interface DevLogProps {
    initialTab?: TabType;
}

export const DevLog: React.FC<DevLogProps> = ({ initialTab }) => {
    const [activeTab, setActiveTab] = useState<TabType>(initialTab || 'runtime');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<LogLevel | -1>(-1);
    const [moduleFilter, setModuleFilter] = useState('ALL');
    const [autoScroll, setAutoScroll] = useState(true);
    const [showLevelDropdown, setShowLevelDropdown] = useState(false);
    const [showModuleDropdown, setShowModuleDropdown] = useState(false);

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
        if (levelFilter !== -1) {
            result = result.filter((log) => log.level >= levelFilter);
        }
        if (moduleFilter !== 'ALL') {
            result = result.filter((log) => log.module.startsWith(moduleFilter));
        }
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

    // 自动滚动
    useEffect(() => {
        if (autoScroll && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [filteredLogs, autoScroll]);

    const handleClear = useCallback(async () => {
        await Logger.clear();
        setLogs([]);
    }, []);

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
        <div className="flex flex-col h-full">
            {/* 页面标题 - 统一样式 */}
            <div className="mb-6">
                <h1 className="text-2xl font-light text-foreground tracking-tight mb-2">开发日志</h1>
                <p className="text-sm text-muted-foreground">运行时日志和模型调用记录</p>
            </div>

            {/* Tab 切换 - sticky */}
            <TabPills
                tabs={TABS}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as TabType)}
                sticky={true} // 恢复吸顶
            />

            {/* ========== 运行日志 Tab ========== */}
            {activeTab === 'runtime' && (
                <div className="flex flex-col flex-1 min-h-0">
                    {/* 工具栏 - sticky (Level 2, offset by TabPills height approx 52px) */}
                    <div className="sticky top-[52px] z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 border-b border-border">
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* 级别过滤 */}
                            <div className="relative">
                                <button
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                                >
                                    {levelFilter === -1 ? '全部级别' : LogLevelConfig[levelFilter].label}
                                    <ChevronDown size={12} />
                                </button>
                                {showLevelDropdown && (
                                    <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1 flex flex-col">
                                        <button
                                            className="block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                                            onClick={() => { setLevelFilter(-1); setShowLevelDropdown(false); }}
                                        >
                                            全部级别
                                        </button>
                                        {Object.entries(LogLevelConfig).map(([level, config]) => (
                                            <button
                                                key={level}
                                                className="block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                                                onClick={() => { setLevelFilter(Number(level) as LogLevel); setShowLevelDropdown(false); }}
                                            >
                                                {config.icon} {config.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 分隔线 */}
                            <div className="w-px h-4 bg-border" />

                            {/* 模块过滤 */}
                            <div className="relative">
                                <button
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setShowModuleDropdown(!showModuleDropdown)}
                                >
                                    {moduleFilter}
                                    <ChevronDown size={12} />
                                </button>
                                {showModuleDropdown && (
                                    <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto flex flex-col">
                                        {MODULES.map((mod) => (
                                            <button
                                                key={mod}
                                                className="block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                                                onClick={() => { setModuleFilter(mod); setShowModuleDropdown(false); }}
                                            >
                                                {mod}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 分隔线 */}
                            <div className="w-px h-4 bg-border" />

                            {/* 搜索框 */}
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Search size={12} />
                                <input
                                    type="text"
                                    placeholder="搜索日志..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
                                />
                            </div>

                            {/* 右侧操作 */}
                            <div className="flex items-center gap-1 ml-auto">
                                <button
                                    className={`p-1.5 rounded transition-colors ${autoScroll ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => setAutoScroll(!autoScroll)}
                                    title="自动滚动"
                                >
                                    <ArrowDownToLine size={14} />
                                </button>
                                <button
                                    className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={handleClear}
                                    title="清空"
                                >
                                    <Trash2 size={14} />
                                </button>
                                <button
                                    className="inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={handleExport}
                                >
                                    <Download size={12} />
                                    导出
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 日志内容区 - 无边框 */}
                    <div className="flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2">
                        {filteredLogs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                                <Terminal size={32} strokeWidth={1} className="opacity-30" />
                                <p className="text-sm font-light">暂无日志记录</p>
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

                    {/* 状态栏 - 简化 */}
                    <div className="text-[10px] text-muted-foreground py-2 border-t border-border">
                        {logs.length} 条日志
                        {filteredLogs.length !== logs.length && ` · ${filteredLogs.length} 条匹配`}
                    </div>
                </div>
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

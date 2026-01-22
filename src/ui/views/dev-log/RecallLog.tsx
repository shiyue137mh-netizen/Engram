/**
 * RecallLog - 召回日志可视化组件
 *
 * 采用 Master-Detail 布局（参考 MemoryStream）：
 * - 左侧：召回日志列表
 * - 右侧：详情面板（召回结果、分数、过滤）
 * - 移动端：全屏详情
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
    Target,
    Clock,
    Trash2,
    Search,
    Zap,
    Database,
    RefreshCw,
    ArrowLeft,
    Filter,
    ChevronRight,
} from 'lucide-react';
import type { RecallLogEntry, RecallResultItem } from './types';
import { RecallLogService } from '@/core/logger/RecallLogger';

// 响应式断点
const DESKTOP_BREAKPOINT = 768;

/** 格式化时间 */
const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

/** 格式化耗时 */
const formatDuration = (ms?: number): string => {
    if (ms === undefined) return '-';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
};

// ==================== 列表项组件 ====================

interface LogListItemProps {
    entry: RecallLogEntry;
    isSelected: boolean;
    onSelect: () => void;
}

const LogListItem: React.FC<LogListItemProps> = ({ entry, isSelected, onSelect }) => {
    return (
        <div
            className={`
                px-3 py-2 cursor-pointer border-b border-border/30 transition-colors
                ${isSelected ? 'bg-primary/10 border-l-2 border-l-primary' : 'hover:bg-muted/30'}
            `}
            onClick={onSelect}
        >
            {/* 头部：标签 + 时间 */}
            <div className="flex items-center gap-2 mb-1">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${entry.mode === 'hybrid'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-blue-500/20 text-blue-400'
                    }`}>
                    {entry.mode === 'hybrid' ? '混合' : 'Embed'}
                </span>
                <span className="text-[10px] text-muted-foreground">
                    {entry.stats.rerankCount}/{entry.stats.topKCount} 条
                </span>
                <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1">
                    <Clock size={10} />
                    {formatTime(entry.timestamp)}
                </span>
            </div>

            {/* 查询预览 */}
            <p className="text-sm text-foreground line-clamp-2">
                {entry.query}
            </p>

            {/* 耗时 */}
            <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                <Zap size={10} />
                {formatDuration(entry.stats.latencyMs)}
            </div>
        </div>
    );
};

// ==================== 详情面板组件 ====================

// 视图模式
type ViewMode = 'all' | 'topK' | 'reranked';

// 排序模式
type SortMode = 'embedding' | 'rerank' | 'hybrid';

/** 分数条组件 */
const ScoreBar: React.FC<{
    label: string;
    score: number;
    color: string;
}> = ({ label, score, color }) => {
    const percentage = Math.min(100, score * 100);
    return (
        <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground w-16 shrink-0">{label}</span>
            <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-muted-foreground w-14 text-right font-mono shrink-0">
                {score.toFixed(3)}
            </span>
        </div>
    );
};

/** 单条结果项 */
const ResultItem: React.FC<{ item: RecallResultItem }> = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={`
                border-b border-border/30 py-3 px-4 cursor-pointer
                hover:bg-muted/10 transition-colors
                ${item.isReranked ? 'bg-purple-500/5' : item.isTopK ? 'bg-blue-500/5' : ''}
            `}
            onClick={() => setExpanded(!expanded)}
        >
            {/* 徽章 */}
            <div className="flex items-center gap-2 mb-1.5">
                {item.isReranked && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-purple-500/20 text-purple-400 rounded">
                        Rerank
                    </span>
                )}
                {item.isTopK && !item.isReranked && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/20 text-blue-400 rounded">
                        TopK
                    </span>
                )}
                <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                    {item.category}
                </span>
                {item.sourceFloor && (
                    <span className="text-[10px] text-muted-foreground">
                        楼层 #{item.sourceFloor}
                    </span>
                )}
                <ChevronRight size={12} className={`ml-auto text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </div>

            {/* 摘要 */}
            <p className={`text-sm text-foreground ${expanded ? '' : 'line-clamp-2'}`}>
                {item.summary}
            </p>

            {/* 分数（展开时显示） */}
            {expanded && (
                <div className="mt-3 space-y-1.5 pt-2 border-t border-border/20">
                    <ScoreBar label="Embedding" score={item.embeddingScore} color="bg-blue-500" />
                    {item.rerankScore != null && (
                        <ScoreBar label="Rerank" score={item.rerankScore} color="bg-orange-500" />
                    )}
                    {item.hybridScore != null && (
                        <ScoreBar label="Hybrid" score={item.hybridScore} color="bg-purple-500" />
                    )}
                </div>
            )}
        </div>
    );
};

interface DetailPanelProps {
    entry: RecallLogEntry | null;
    isFullScreen?: boolean;
    onClose?: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ entry, isFullScreen, onClose }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('all');
    const [sortMode, setSortMode] = useState<SortMode>('hybrid');
    const [searchQuery, setSearchQuery] = useState('');

    // 过滤和排序结果
    const displayedResults = useMemo(() => {
        if (!entry) return [];

        let results = [...entry.results];

        // 搜索过滤
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            results = results.filter(r => r.summary.toLowerCase().includes(q));
        }

        // 按视图模式过滤
        if (viewMode === 'topK') {
            results = results.filter(r => r.isTopK);
        } else if (viewMode === 'reranked') {
            results = results.filter(r => r.isReranked);
        }

        // 按分数排序
        results.sort((a, b) => {
            const getScore = (item: RecallResultItem) => {
                switch (sortMode) {
                    case 'embedding': return item.embeddingScore;
                    case 'rerank': return item.rerankScore ?? 0;
                    case 'hybrid':
                        return item.hybridScore ?? (
                            item.rerankScore != null
                                ? (item.embeddingScore + item.rerankScore) / 2
                                : item.embeddingScore
                        );
                }
            };
            return getScore(b) - getScore(a);
        });

        return results;
    }, [entry, viewMode, sortMode, searchQuery]);

    if (!entry) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                <Target size={32} className="opacity-30" />
                <p className="text-sm font-light">选择一条召回日志查看详情</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full ${isFullScreen ? 'p-4' : ''}`}>
            {/* 移动端返回按钮 */}
            {isFullScreen && onClose && (
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft size={16} />
                    返回列表
                </button>
            )}

            {/* 头部信息 */}
            <div className="mb-4 pb-4 border-b border-border shrink-0">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${entry.mode === 'hybrid'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                        }`}>
                        {entry.mode === 'hybrid' ? '混合召回' : '向量召回'}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatTime(entry.timestamp)}</span>
                </div>

                <p className="text-sm text-foreground mb-2">{entry.query}</p>

                {entry.preprocessedQuery && entry.preprocessedQuery !== entry.query && (
                    <p className="text-xs text-muted-foreground">
                        → 预处理: {entry.preprocessedQuery}
                    </p>
                )}

                {/* 统计 */}
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>候选: {entry.stats.totalCandidates}</span>
                    <span>TopK: {entry.stats.topKCount}</span>
                    <span>Rerank: {entry.stats.rerankCount}</span>
                    <span className="flex items-center gap-1">
                        <Zap size={10} />
                        {formatDuration(entry.stats.latencyMs)}
                    </span>
                </div>
            </div>

            {/* 过滤和排序工具栏 */}
            <div className="flex items-center gap-3 flex-wrap mb-3 shrink-0">
                {/* 视图模式 */}
                <div className="flex items-center gap-1 text-xs">
                    <Filter size={12} className="text-muted-foreground" />
                    {(['all', 'topK', 'reranked'] as ViewMode[]).map(mode => (
                        <button
                            key={mode}
                            className={`px-2 py-1 rounded transition-colors ${viewMode === mode
                                ? 'bg-primary/20 text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            onClick={() => setViewMode(mode)}
                        >
                            {mode === 'all' ? '全部' : mode === 'topK' ? 'TopK' : 'Reranked'}
                        </button>
                    ))}
                </div>

                <div className="w-px h-4 bg-border" />

                {/* 排序模式 */}
                <div className="flex items-center gap-1 text-xs">
                    {(['embedding', 'rerank', 'hybrid'] as SortMode[]).map(mode => (
                        <button
                            key={mode}
                            className={`px-2 py-1 rounded transition-colors ${sortMode === mode
                                ? 'bg-primary/20 text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            onClick={() => setSortMode(mode)}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="w-px h-4 bg-border" />

                {/* 搜索 */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Search size={12} />
                    <input
                        type="text"
                        placeholder="搜索结果..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24"
                    />
                </div>
            </div>

            {/* 结果列表 */}
            <div className="flex-1 overflow-y-auto -mx-4 md:mx-0">
                {displayedResults.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground text-sm">
                        无匹配结果
                    </div>
                ) : (
                    displayedResults.map((item, idx) => (
                        <ResultItem key={idx} item={item} />
                    ))
                )}
            </div>

            {/* 状态栏 */}
            <div className="text-[10px] text-muted-foreground py-2 border-t border-border mt-2 shrink-0">
                显示 {displayedResults.length} / {entry.results.length} 条结果
            </div>
        </div>
    );
};

// ==================== RecallLog 主组件 ====================

export const RecallLog: React.FC = () => {
    const [logs, setLogs] = useState<RecallLogEntry[]>(RecallLogService.getLogs());
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < DESKTOP_BREAKPOINT);
    const [showDetail, setShowDetail] = useState(false);

    // 响应式检测
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < DESKTOP_BREAKPOINT);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 订阅日志更新
    useEffect(() => {
        const unsubscribe = RecallLogService.subscribe((newLogs) => {
            setLogs(newLogs);
        });
        return unsubscribe;
    }, []);

    // 选中的日志
    const selectedEntry = useMemo(() => {
        return logs.find(l => l.id === selectedId) || null;
    }, [logs, selectedId]);

    // 选择日志
    const handleSelect = (id: string) => {
        setSelectedId(id);
        if (isMobile) {
            setShowDetail(true);
        }
    };

    // 关闭详情
    const handleCloseDetail = () => {
        setShowDetail(false);
        if (isMobile) {
            setSelectedId(null);
        }
    };

    // 移动端全屏详情
    if (isMobile && showDetail && selectedEntry) {
        return (
            <DetailPanel
                entry={selectedEntry}
                isFullScreen={true}
                onClose={handleCloseDetail}
            />
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* 头部 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <div className="flex items-center gap-2">
                    <Target size={16} className="text-primary" />
                    <span className="font-medium text-foreground">召回日志</span>
                    <span className="text-xs text-muted-foreground">({logs.length})</span>
                </div>
                <button
                    className="p-1.5 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => RecallLogService.clear()}
                    title="清除日志"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            {/* 主内容区 - Master-Detail 布局 */}
            <div className="flex-1 flex min-h-0">
                {/* 左侧：日志列表 */}
                <div className={`
                    ${isMobile ? 'w-full' : 'w-[30%] min-w-[240px]'}
                    overflow-y-auto
                    ${!isMobile ? 'border-r border-border/50' : ''}
                `}>
                    {logs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 p-4">
                            <Database size={32} className="opacity-30" />
                            <p className="text-sm font-light">暂无召回记录</p>
                            <p className="text-xs opacity-70">触发 RAG 召回后显示</p>
                        </div>
                    ) : (
                        logs.map((entry) => (
                            <LogListItem
                                key={entry.id}
                                entry={entry}
                                isSelected={entry.id === selectedId}
                                onSelect={() => handleSelect(entry.id)}
                            />
                        ))
                    )}
                </div>

                {/* 右侧：详情面板 */}
                {!isMobile && (
                    <div className="flex-1 overflow-y-auto p-4">
                        <DetailPanel entry={selectedEntry} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecallLog;

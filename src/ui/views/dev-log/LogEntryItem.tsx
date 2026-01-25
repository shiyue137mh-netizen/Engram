/**
 * LogEntryItem - 单条日志渲染组件
 *
 * V0.9.12: 支持分组模式（Docker 风格）
 * - 连续相同模块的日志合并显示
 * - 支持默认展开/折叠
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
    ChevronRight,
    ChevronDown,
    Layers,
    Terminal,
    Link,
    Brain,
    Search,
    Settings,
    Palette,
    FileCode,
    Database,
    Server,
    Cpu,
    Zap,
    CloudCog,
    type LucideIcon,
} from 'lucide-react';
import { LogEntry, LogLevel, LogLevelConfig } from "@/core/logger";

interface LogEntryItemProps {
    entry: LogEntry;
    /** 外部控制是否展开数据详情 */
    defaultExpanded?: boolean;
}

interface LogGroupProps {
    entries: LogEntry[];
    /** 默认是否展开分组 */
    defaultExpanded?: boolean;
    /** 默认是否展开数据详情 */
    defaultDataExpanded?: boolean;
}

/**
 * 格式化时间为 HH:MM:SS
 */
function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toTimeString().slice(0, 8);
}

// 级别样式映射 - 简洁配色（加深 DEBUG 颜色）
const LEVEL_STYLES: Record<LogLevel, { text: string; bg: string }> = {
    [LogLevel.DEBUG]: { text: 'text-zinc-400', bg: 'bg-zinc-500/15' },
    [LogLevel.INFO]: { text: 'text-blue-400', bg: 'bg-blue-500/10' },
    [LogLevel.SUCCESS]: { text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    [LogLevel.WARN]: { text: 'text-amber-400', bg: 'bg-amber-500/10' },
    [LogLevel.ERROR]: { text: 'text-red-400', bg: 'bg-red-500/10' },
};

/**
 * 模块图标映射
 * 根据模块名前缀匹配对应的图标
 */
const MODULE_ICONS: Record<string, LucideIcon> = {
    // 系统核心
    'System': Terminal,
    // 集成层
    'STBridge': Link,
    'TavernAPI': Server,
    'Tavern': Server,
    // 记忆管理
    'Summarizer': Brain,
    'Memory': Brain,
    // RAG 系统
    'RAG': Search,
    // 设置与配置
    'SettingsManager': Settings,
    'ThemeManager': Palette,
    // 宏处理
    'MacroService': FileCode,
    // 数据层
    'Data': Database,
    // 预处理
    'Preprocess': Cpu,
    // 批处理
    'Batch': Zap,
    // LLM
    'LLM': CloudCog,
};

/**
 * 根据模块名获取对应图标
 */
function getModuleIcon(module: string): LucideIcon {
    // 精确匹配
    if (MODULE_ICONS[module]) {
        return MODULE_ICONS[module];
    }
    // 前缀匹配（例如 RAG/Inject -> RAG）
    const prefix = module.split('/')[0];
    if (MODULE_ICONS[prefix]) {
        return MODULE_ICONS[prefix];
    }
    // 默认图标
    return Layers;
}

/**
 * 单条日志项
 */
export const LogEntryItem: React.FC<LogEntryItemProps> = ({ entry, defaultExpanded = false }) => {
    // 自动展开错误和警告
    const autoExpand = entry.level === LogLevel.WARN || entry.level === LogLevel.ERROR;
    const [expanded, setExpanded] = useState(defaultExpanded || autoExpand);
    const hasData = entry.data !== undefined;
    const levelConfig = LogLevelConfig[entry.level];
    const levelStyle = LEVEL_STYLES[entry.level];

    // 响应外部默认展开状态变化
    useEffect(() => {
        if (hasData) {
            setExpanded(defaultExpanded || autoExpand);
        }
    }, [defaultExpanded, autoExpand, hasData]);

    return (
        <div className="group">
            <div
                className={`
                    flex items-start gap-3 px-2 py-1 rounded-sm transition-colors
                    hover:bg-white/[0.02]
                    ${hasData ? 'cursor-pointer' : ''}
                `}
                onClick={() => hasData && setExpanded(!expanded)}
            >
                {/* 展开箭头 */}
                <span className="flex items-center text-zinc-600 shrink-0 mt-0.5 w-3">
                    {hasData ? (
                        expanded ? (
                            <ChevronDown size={12} />
                        ) : (
                            <ChevronRight size={12} />
                        )
                    ) : null}
                </span>

                {/* 时间戳 - 加深颜色 */}
                <span className="text-zinc-500 shrink-0 tabular-nums text-[11px]">
                    {formatTime(entry.timestamp)}
                </span>

                {/* 级别标签 - 紧凑样式 */}
                <span className={`
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${levelStyle.text} ${levelStyle.bg}
                `}>
                    {levelConfig.label}
                </span>

                {/* 模块标签 - 加深颜色 */}
                <span className="text-zinc-400 shrink-0 text-[11px]">
                    {entry.module}
                </span>

                {/* 消息内容 */}
                <span className="text-zinc-300 text-[11px] break-words flex-1 leading-relaxed">
                    {entry.message}
                </span>
            </div>

            {/* 展开的数据详情 */}
            {expanded && hasData && (
                <div className="ml-10 mr-2 mb-1 px-3 py-2 bg-zinc-900/50 border-l-2 border-zinc-700 rounded-r text-[10px]">
                    <pre className="m-0 text-zinc-400 whitespace-pre-wrap break-words font-mono">
                        {JSON.stringify(entry.data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

/**
 * 日志分组组件（Docker 风格）
 * 将连续相同模块的日志合并在一起显示
 */
export const LogGroup: React.FC<LogGroupProps> = ({
    entries,
    defaultExpanded = true,
    defaultDataExpanded = false,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    // 响应外部默认展开状态变化
    useEffect(() => {
        setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    // 分组信息
    const groupModule = entries[0]?.module || 'Unknown';
    const entryCount = entries.length;
    const firstEntry = entries[0];
    const lastEntry = entries[entries.length - 1];

    // 获取最高级别（用于显示颜色）
    const highestLevel = useMemo(() => {
        return entries.reduce((max, e) => Math.max(max, e.level), LogLevel.DEBUG) as LogLevel;
    }, [entries]);
    const levelStyle = LEVEL_STYLES[highestLevel];

    // 时间范围
    const timeRange = firstEntry && lastEntry
        ? `${formatTime(firstEntry.timestamp)} - ${formatTime(lastEntry.timestamp)}`
        : '';

    // 单条日志不需要分组头
    if (entryCount === 1) {
        return <LogEntryItem entry={entries[0]} defaultExpanded={defaultDataExpanded} />;
    }

    return (
        <div className="border-l-2 border-transparent hover:border-zinc-700 transition-colors">
            {/* 分组头 */}
            <div
                className="flex items-center gap-2 px-2 py-1.5 cursor-pointer text-[11px] hover:bg-white/[0.02] rounded-sm transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                {/* 展开箭头 */}
                <span className="text-zinc-500 shrink-0">
                    {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </span>

                {/* 分组图标 - 根据模块显示对应图标 */}
                {React.createElement(getModuleIcon(groupModule), {
                    size: 13,
                    className: `shrink-0 ${levelStyle.text}`,
                })}

                {/* 模块名 */}
                <span className={`font-medium ${levelStyle.text}`}>
                    {groupModule}
                </span>

                {/* 计数标签 */}
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${levelStyle.bg} ${levelStyle.text}`}>
                    {entryCount} 条
                </span>

                {/* 时间范围 - 加深颜色 */}
                <span className="text-zinc-500 ml-auto tabular-nums">
                    {timeRange}
                </span>
            </div>

            {/* 展开的日志列表 */}
            {expanded && (
                <div className="ml-4 border-l border-zinc-800 pl-2">
                    {entries.map((entry) => (
                        <LogEntryItem
                            key={entry.id}
                            entry={entry}
                            defaultExpanded={defaultDataExpanded}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * 将日志列表按模块分组
 * 连续相同模块的日志会被合并到一个组里
 */
export function groupLogsByModule(logs: LogEntry[]): LogEntry[][] {
    if (logs.length === 0) return [];

    const groups: LogEntry[][] = [];
    let currentGroup: LogEntry[] = [];
    let currentModule: string | null = null;

    for (const log of logs) {
        if (log.module === currentModule) {
            // 同一模块，加入当前组
            currentGroup.push(log);
        } else {
            // 不同模块，保存当前组并开始新组
            if (currentGroup.length > 0) {
                groups.push(currentGroup);
            }
            currentGroup = [log];
            currentModule = log.module;
        }
    }

    // 保存最后一组
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
}


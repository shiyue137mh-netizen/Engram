/**
 * LogEntryItem - 单条日志渲染组件
 *
 * 简洁深色设计，无 emoji
 */

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { LogEntry, LogLevel, LogLevelConfig } from "@/core/logger";

interface LogEntryItemProps {
    entry: LogEntry;
}

/**
 * 格式化时间为 HH:MM:SS
 */
function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toTimeString().slice(0, 8);
}

// 级别样式映射 - 简洁配色
const LEVEL_STYLES: Record<LogLevel, { text: string; bg: string }> = {
    [LogLevel.DEBUG]: { text: 'text-zinc-500', bg: 'bg-zinc-500/10' },
    [LogLevel.INFO]: { text: 'text-blue-400', bg: 'bg-blue-500/10' },
    [LogLevel.SUCCESS]: { text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    [LogLevel.WARN]: { text: 'text-amber-400', bg: 'bg-amber-500/10' },
    [LogLevel.ERROR]: { text: 'text-red-400', bg: 'bg-red-500/10' },
};

export const LogEntryItem: React.FC<LogEntryItemProps> = ({ entry }) => {
    const [expanded, setExpanded] = useState(false);
    const hasData = entry.data !== undefined;
    const levelConfig = LogLevelConfig[entry.level];
    const levelStyle = LEVEL_STYLES[entry.level];

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

                {/* 时间戳 */}
                <span className="text-zinc-600 shrink-0 tabular-nums text-[11px]">
                    {formatTime(entry.timestamp)}
                </span>

                {/* 级别标签 - 紧凑样式 */}
                <span className={`
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${levelStyle.text} ${levelStyle.bg}
                `}>
                    {levelConfig.label}
                </span>

                {/* 模块标签 */}
                <span className="text-zinc-500 shrink-0 text-[11px]">
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

export default LogEntryItem;

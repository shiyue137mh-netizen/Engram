/**
 * LogEntryItem - 单条日志渲染组件
 *
 * 支持展开/折叠查看附加数据
 */

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { LogEntry, LogLevel, LogLevelConfig } from '../../infrastructure/logger';

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

export const LogEntryItem: React.FC<LogEntryItemProps> = ({ entry }) => {
    const [expanded, setExpanded] = useState(false);
    const hasData = entry.data !== undefined;
    const levelConfig = LogLevelConfig[entry.level];

    // 获取 CSS 类名
    const levelClass = `log-level-${LogLevel[entry.level].toLowerCase()}`;

    return (
        <div className="engram-log-entry">
            <div
                className={`engram-log-line ${hasData ? 'has-data' : ''}`}
                onClick={() => hasData && setExpanded(!expanded)}
            >
                {/* 展开箭头 */}
                <span className="engram-log-expand">
                    {hasData ? (
                        expanded ? (
                            <ChevronDown size={12} />
                        ) : (
                            <ChevronRight size={12} />
                        )
                    ) : (
                        <span style={{ width: 12, display: 'inline-block' }} />
                    )}
                </span>

                {/* 时间戳 */}
                <span className="engram-log-time">[{formatTime(entry.timestamp)}]</span>

                {/* 模块标签 */}
                <span className="engram-log-module">[{entry.module.padEnd(16)}]</span>

                {/* 级别图标和标签 */}
                <span className={`engram-log-level ${levelClass}`}>
                    {levelConfig.icon} {levelConfig.label.padEnd(7)}
                </span>

                {/* 消息内容 */}
                <span className="engram-log-message">{entry.message}</span>
            </div>

            {/* 展开的数据详情 */}
            {expanded && hasData && (
                <div className="engram-log-data">
                    <pre>{JSON.stringify(entry.data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default LogEntryItem;

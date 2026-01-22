/**
 * EventCard - 事件卡片组件
 *
 * 显示单个 EventNode 的摘要信息
 * 遵循「无框流体」设计：边框高亮而非填充背景
 */
import React from 'react';
import type { EventNode } from '@/data/types/graph';
import { ChevronRight, Zap } from 'lucide-react';

interface EventCardProps {
    event: EventNode;
    isSelected?: boolean;
    isCompact?: boolean;
    onSelect?: () => void;
    onCheck?: (checked: boolean) => void;
    checked?: boolean;
    /** 是否有未保存的修改 */
    hasChanges?: boolean;
}

/**
 * 格式化重要性分数为可视化点
 */
function ScoreDots({ score }: { score: number }) {
    const filled = Math.round(score * 5);
    return (
        <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map(i => (
                <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i < filled ? 'bg-primary' : 'bg-muted'
                        }`}
                />
            ))}
        </div>
    );
}

/**
 * 嵌入状态指示器
 */
function EmbeddingBadge({ isEmbedded }: { isEmbedded: boolean }) {
    if (!isEmbedded) return null;

    return (
        <span
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-medium"
            title="已向量化"
        >
            <Zap size={10} />
            <span>已嵌入</span>
        </span>
    );
}

/**
 * 提取元数据行
 */
function MetaLine({ event }: { event: EventNode }) {
    const kv = event.structured_kv;
    const parts: string[] = [];

    if (kv.time_anchor) parts.push(kv.time_anchor);
    // V1.0.2: location 兼容 string 和 string[] 两种旧版本格式
    if (kv.location) {
        const locStr = Array.isArray(kv.location) ? kv.location.join(', ') : String(kv.location);
        if (locStr) parts.push(locStr);
    }
    if (kv.role && kv.role.length > 0) parts.push(kv.role.join(', '));

    if (parts.length === 0) return null;

    return (
        <p className="text-xs text-muted-foreground truncate">
            ({parts.join(' | ')})
        </p>
    );
}

export const EventCard: React.FC<EventCardProps> = ({
    event,
    isSelected = false,
    isCompact = false,
    onSelect,
    onCheck,
    checked = false,
    hasChanges = false,
}) => {
    const kv = event.structured_kv;

    // 从 summary 中提取纯文本（去掉标题行）
    const summaryLines = event.summary.split('\n');
    const eventTitle = kv.event || summaryLines[0]?.replace(/:\s*$/, '') || '未知事件';
    const summaryText = summaryLines.length > 1
        ? summaryLines.slice(1).join(' ').trim()
        : event.summary;

    // 紧凑模式（移动端）
    if (isCompact) {
        return (
            <div
                className={`
                    flex items-center gap-3 p-3 cursor-pointer
                    border-b border-border
                    transition-colors duration-150
                    ${isSelected ? 'border-l-2 border-l-primary bg-transparent' : 'hover:border-border'}
                `}
                onClick={onSelect}
            >
                {/* 复选框 */}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        e.stopPropagation();
                        onCheck?.(e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-border accent-primary"
                />

                {/* 主内容 */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">
                            {eventTitle}
                        </span>
                        {event.is_embedded && (
                            <Zap size={10} className="text-primary" />
                        )}
                        <span className="text-xs text-muted-foreground">
                            {event.significance_score.toFixed(1)}
                        </span>
                    </div>
                    <p className="text-sm text-foreground truncate mt-1">
                        {summaryText.substring(0, 50)}...
                    </p>
                </div>

                {/* 箭头 */}
                <ChevronRight size={16} className="text-muted-foreground" />
            </div>
        );
    }

    // 桌面模式 - 边框高亮而非填充背景
    return (
        <div
            className={`
                p-4 cursor-pointer rounded-lg
                transition-all duration-150
                ${isSelected
                    ? 'border border-primary bg-transparent'
                    : 'border border-transparent hover:border-border/50'
                }
            `}
            onClick={onSelect}
        >
            {/* 头部：复选框 + 标签 + 嵌入状态 + 分数 */}
            <div className="flex items-center gap-3 mb-2">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        e.stopPropagation();
                        onCheck?.(e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-border accent-primary"
                />
                <span className="text-xs font-medium text-primary">
                    {eventTitle}
                </span>
                <EmbeddingBadge isEmbedded={event.is_embedded} />
                {hasChanges && (
                    <span className="w-2 h-2 rounded-full bg-yellow-500" title="有未保存的修改" />
                )}
                <div className="flex-1" />
                <ScoreDots score={event.significance_score} />
            </div>

            {/* 元数据行 */}
            <MetaLine event={event} />

            {/* 摘要文本 */}
            {/* 摘要文本 */}
            <p className="text-sm text-foreground mt-1 line-clamp-2">
                {summaryText}
            </p>

            {/* 底部信息 */}
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>Level {event.level}</span>
                {event.source_range && (
                    <>
                        <span>•</span>
                        <span>来源: {event.source_range.start_index}-{event.source_range.end_index}楼</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventCard;


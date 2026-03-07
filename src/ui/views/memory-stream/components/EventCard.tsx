/**
 * EventCard - 事件卡片组件
 *
 * 显示单个 EventNode 的摘要信息
 * 遵循「无框流体」设计：边框高亮而非填充背景
 * 文本层级：heading(标题) → foreground(正文) → meta(元数据)
 */
import type { EventNode } from '@/data/types/graph';
import { ChevronRight, Lock, LockOpen, Zap } from 'lucide-react';
import React from 'react';

interface EventCardProps {
    event: EventNode;
    isSelected?: boolean;
    isCompact?: boolean;
    onSelect?: () => void;
    onCheck?: (checked: boolean) => void;
    checked?: boolean;
    /** 是否有未保存的修改 */
    hasChanges?: boolean;
    /** 是否处于召回激活状态 */
    isActive?: boolean;
    onToggleLock?: (isLocked: boolean) => void;
    className?: string;
}

/**
 * 格式化重要性分数为可视化点
 */
function ScoreDots({ score }: { score: number }) {
    const filled = Math.round(score * 5);

    // 动态决定颜色层级
    const activeColor = score >= 0.8 ? 'bg-emphasis'
        : score >= 0.5 ? 'bg-value'
            : 'bg-label';

    return (
        <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map(i => (
                <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i < filled ? activeColor : 'bg-muted'}`}
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
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 text-label rounded text-[10px] font-medium"
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
    // 不再合并为一个字符串，而是保留语义信息单独渲染
    const hasData = kv.time_anchor || kv.location || (kv.role && kv.role.length > 0);
    if (!hasData) return null;

    const locStr = Array.isArray(kv.location) ? kv.location.join(', ') : String(kv.location || '');

    return (
        <div className="flex flex-wrap items-center gap-1.5 text-xs truncate">
            {kv.time_anchor && (
                <span className="text-value">({kv.time_anchor})</span>
            )}
            {locStr && (
                <span className="text-value">@{locStr}</span>
            )}
            {kv.role && kv.role.length > 0 && (
                <span className="text-emphasis">[{kv.role.join(', ')}]</span>
            )}
        </div>
    );
}

export const EventCard: React.FC<EventCardProps> = ({
    event,
    isSelected = false,
    isActive = false,
    isCompact = false,
    onSelect,
    onCheck,
    onToggleLock,
    checked = false,
    hasChanges = false,
    className = '',
}) => {
    const isLocked = event.is_locked;
    const kv = event.structured_kv;

    // 提取纯文本（去掉标题行）
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
                    ${isSelected ? 'border-l-4 border-l-primary bg-transparent' : ''}
                    ${isActive ? 'border-l-4 border-l-value bg-value/5' : ''}
                    ${!isSelected && !isActive ? 'hover:border-border' : ''}
                    ${className}
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
                        <span className="text-xs font-medium text-heading">
                            {eventTitle}
                        </span>
                        {event.is_embedded && (
                            <Zap size={10} className="text-label" />
                        )}
                        <span className={`text-xs ${event.significance_score >= 0.8 ? 'text-emphasis' : event.significance_score >= 0.5 ? 'text-value' : 'text-label'}`}>
                            {event.significance_score.toFixed(1)}
                        </span>
                    </div>
                    <p className="text-sm text-foreground truncate mt-1">
                        {summaryText.substring(0, 50)}...
                    </p>
                </div>

                {/* 锁定按钮 (紧凑模式) */}
                <button
                    className={`p-1 transition-colors ${isLocked ? 'text-emphasis' : 'text-meta opacity-40 hover:opacity-100'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleLock?.(!isLocked);
                    }}
                    title={isLocked ? '解锁' : '锁定以防止被精简或归档'}
                >
                    {isLocked ? <Lock size={12} /> : <LockOpen size={12} />}
                </button>

                {/* 箭头 */}
                <ChevronRight size={16} className="text-meta" />
            </div>
        );
    }

    // 桌面模式 - 边框高亮而非填充背景
    return (
        <div
            className={`
                p-4 cursor-pointer rounded-lg
                transition-all duration-150 relative
                ${isSelected
                    ? 'border border-primary bg-transparent'
                    : isActive
                        ? 'border border-value/50 bg-value/5 hover:border-value'
                        : 'border border-transparent hover:border-border/50'
                }
                ${className}
            `}
            onClick={onSelect}
        >
            {/* Active Label */}
            {isActive && (
                <div className="absolute top-2 right-2 text-[10px] text-value font-medium px-1.5 py-0.5 bg-value/10 rounded">
                    Active
                </div>
            )}

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
                <span className="text-xs font-medium text-heading">
                    {eventTitle}
                </span>
                <EmbeddingBadge isEmbedded={event.is_embedded} />
                {hasChanges && (
                    <span className="w-2 h-2 rounded-full bg-yellow-500" title="有未保存的修改" />
                )}
                <div className="flex-1" />
                <ScoreDots score={event.significance_score} />

                {/* 锁定按钮 (桌面模式) */}
                <button
                    className={`
                        ml-2 p-1.5 rounded-md transition-all
                        ${isLocked
                            ? 'text-emphasis bg-emphasis/10 hover:bg-emphasis/20'
                            : 'text-muted-foreground hover:bg-muted/50 opacity-0 group-hover:opacity-100'
                        }
                    `}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleLock?.(!isLocked);
                    }}
                    title={isLocked ? '点击解锁' : '通过锁定记忆，可防止其在精简或清理时被自动处理'}
                >
                    {isLocked ? <Lock size={14} /> : <LockOpen size={14} />}
                </button>
            </div>

            {/* 元数据行 */}
            <MetaLine event={event} />

            {/* 摘要文本 */}
            <p className="text-sm text-foreground mt-1 line-clamp-2">
                {summaryText}
            </p>

            {/* 底部信息 */}
            <div className="flex items-center gap-2 mt-2 text-xs text-meta">
                <span>Level <span className="text-value font-medium">{event.level}</span></span>
                {event.source_range && (
                    <>
                        <span>•</span>
                        <span>来源: <span className="text-value">{event.source_range.start_index}-{event.source_range.end_index}楼</span></span>
                    </>
                )}
            </div>
        </div>
    );
};

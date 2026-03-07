/**
 * EntityCard - 实体卡片组件
 *
 * 显示单个 EntityNode 的摘要信息
 * 遵循「无框流体」设计
 * 文本层级：heading(名称) → label(类型) → foreground(描述) → meta(别名)
 */
import type { EntityNode } from '@/data/types/graph';
import { Archive, ArchiveRestore, ChevronRight, Lock, LockOpen } from 'lucide-react';
import React from 'react';

/**
 * 根据实体类型获取对应的主题颜色类名
 */
function getEntityTypeColor(type: string): string {
    switch (type.toLowerCase()) {
        case 'char':
        case 'character':
            return 'text-emphasis bg-emphasis/10 border-emphasis/20';
        case 'loc':
        case 'location':
            return 'text-value bg-value/10 border-value/20';
        case 'item':
            return 'text-label bg-label/10 border-label/20';
        case 'concept':
            return 'text-heading bg-heading/10 border-heading/20';
        default:
            return 'text-meta bg-muted/10 border-border';
    }
}

interface EntityCardProps {
    entity: EntityNode;
    isSelected?: boolean;
    isCompact?: boolean;
    onSelect?: () => void;
    onCheck?: (checked: boolean) => void;
    onArchive?: (isArchived: boolean) => void;
    onToggleLock?: (isLocked: boolean) => void;
    checked?: boolean;
}

export const EntityCard: React.FC<EntityCardProps> = ({
    entity,
    isSelected = false,
    isCompact = false,
    onSelect,
    onCheck,
    onArchive,
    onToggleLock,
    checked = false,
}) => {
    const isArchived = entity.is_archived;
    const isLocked = entity.is_locked;
    // 紧凑模式（移动端）
    if (isCompact) {
        return (
            <div
                className={`
                    flex items-center gap-3 p-3 cursor-pointer
                    border-b border-border
                    transition-colors duration-150
                    ${isSelected ? 'border-l-2 border-l-primary bg-transparent' : 'hover:border-border'}
                    ${isArchived ? 'opacity-50 grayscale-[0.5]' : ''}
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
                            {entity.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border uppercase ${getEntityTypeColor(entity.type)}`}>
                            {entity.type}
                        </span>
                    </div>
                    <p className="text-xs text-meta truncate mt-1">
                        {entity.description}
                    </p>
                </div>

                {/* 锁定按钮 (紧凑模式) */}
                <button
                    className={`p-1 transition-colors ${isLocked ? 'text-emphasis' : 'text-meta opacity-40 hover:opacity-100'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleLock?.(!isLocked);
                    }}
                    title={isLocked ? '解锁' : '锁定以防止自动归档'}
                >
                    {isLocked ? <Lock size={12} /> : <LockOpen size={12} />}
                </button>

                {/* 归档按钮 (紧凑模式) */}
                <button
                    className="p-1 px-2 hover:bg-muted/50 rounded transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onArchive?.(!isArchived);
                    }}
                    title={isArchived ? '取消归档' : '归档实体'}
                >
                    {isArchived ? <ArchiveRestore size={14} /> : <Archive size={14} className="opacity-40 hover:opacity-100" />}
                </button>

                {/* 箭头 */}
                <ChevronRight size={16} className="text-meta" />
            </div>
        );
    }

    // 桌面模式
    return (
        <div
            className={`
                group p-4 cursor-pointer rounded-lg h-full flex flex-col
                transition-all duration-150
                ${isSelected
                    ? 'border border-primary bg-transparent shadow-sm'
                    : 'border border-transparent hover:border-border/50 bg-secondary/5'
                }
                ${isArchived ? 'opacity-60 grayscale-[0.3]' : ''}
            `}
            onClick={onSelect}
        >
            {/* 头部：复选框 + 名称 + 类型 */}
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
                <span className="text-sm font-medium text-heading">
                    {entity.name}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border uppercase ${getEntityTypeColor(entity.type)}`}>
                    {entity.type}
                </span>

                {/* 锁定按钮 (桌面模式) */}
                <button
                    className={`
                        ml-auto p-1.5 rounded-md transition-all
                        ${isLocked
                            ? 'text-emphasis bg-emphasis/10 hover:bg-emphasis/20'
                            : 'text-muted-foreground hover:bg-muted/50 opacity-0 group-hover:opacity-100'
                        }
                    `}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleLock?.(!isLocked);
                    }}
                    title={isLocked ? '点击解锁' : '通过锁定记忆，可防止其在清理旧记忆时被自动归档'}
                >
                    {isLocked ? <Lock size={14} /> : <LockOpen size={14} />}
                </button>

                {/* 归档按钮 (桌面模式) */}
                <button
                    className={`
                        p-1.5 rounded-md transition-all
                        ${isArchived
                            ? 'text-primary bg-primary/10 hover:bg-primary/20'
                            : 'text-muted-foreground hover:bg-muted/50 opacity-0 group-hover:opacity-100'
                        }
                    `}
                    onClick={(e) => {
                        e.stopPropagation();
                        onArchive?.(!isArchived);
                    }}
                    title={isArchived ? '取消归档' : '将实体归档 (不再参与扫描召回)'}
                >
                    {isArchived ? <ArchiveRestore size={14} /> : <Archive size={14} />}
                </button>
            </div>

            {/* 描述文本 */}
            <p className="text-xs text-meta line-clamp-2 leading-relaxed">
                {entity.description}
            </p>

            {/* 触发关键词 (原别名) */}
            {entity.aliases && entity.aliases.length > 0 && (
                <div className="mt-auto pt-3 text-[10px] text-meta italic flex items-center gap-1 opacity-80">
                    <span className="shrink-0 font-medium">触发关键词:</span>
                    <span className="truncate">{entity.aliases.join(', ')}</span>
                </div>
            )}
        </div>
    );
};

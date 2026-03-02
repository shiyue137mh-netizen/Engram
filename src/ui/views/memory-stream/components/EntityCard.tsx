/**
 * EntityCard - 实体卡片组件
 *
 * 显示单个 EntityNode 的摘要信息
 * 遵循「无框流体」设计
 * 文本层级：heading(名称) → label(类型) → foreground(描述) → meta(别名)
 */
import type { EntityNode } from '@/data/types/graph';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface EntityCardProps {
    entity: EntityNode;
    isSelected?: boolean;
    isCompact?: boolean;
    onSelect?: () => void;
    onCheck?: (checked: boolean) => void;
    checked?: boolean;
}

export const EntityCard: React.FC<EntityCardProps> = ({
    entity,
    isSelected = false,
    isCompact = false,
    onSelect,
    onCheck,
    checked = false,
}) => {
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
                        <span className="text-xs font-medium text-heading">
                            {entity.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-label border border-primary/20 uppercase">
                            {entity.type}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                        {entity.description}
                    </p>
                </div>

                {/* 箭头 */}
                <ChevronRight size={16} className="text-muted-foreground" />
            </div>
        );
    }

    // 桌面模式
    return (
        <div
            className={`
                p-4 cursor-pointer rounded-lg h-full flex flex-col
                transition-all duration-150
                ${isSelected
                    ? 'border border-primary bg-transparent'
                    : 'border border-transparent hover:border-border/50'
                }
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
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-label border border-primary/20 uppercase">
                    {entity.type}
                </span>
            </div>

            {/* 描述文本 */}
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {entity.description}
            </p>

            {/* 别名 (如果有) */}
            {entity.aliases && entity.aliases.length > 0 && (
                <div className="mt-2 text-[10px] text-meta truncate">
                    别名: {entity.aliases.join(', ')}
                </div>
            )}
        </div>
    );
};

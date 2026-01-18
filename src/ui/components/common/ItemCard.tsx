/**
 * ItemCard - 通用列表项卡片组件
 * 
 * 应用「无框流体」设计语言 - 弱卡片化：
 * - 默认无边框，hover 时显示微妙分隔
 * - 选中态使用轻背景而非边框
 * - 用空间和层级区分区域
 */
import React from 'react';
import { Check, Power } from 'lucide-react';

// 操作按钮配置
interface ItemAction {
    icon: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    title?: string;
    danger?: boolean;
    hidden?: boolean;
}

// 标签配置
interface ItemBadge {
    text: string;
    color?: 'default' | 'primary' | 'blue' | 'purple' | 'orange' | 'emerald';
}

interface ItemCardProps {
    // 内容
    icon?: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    meta?: React.ReactNode;
    badges?: ItemBadge[];

    // 状态
    selected?: boolean;
    disabled?: boolean;

    // 开关（可选）
    toggle?: {
        checked: boolean;
        onChange: (checked: boolean) => void;
    };

    // 操作
    onClick?: () => void;
    actions?: ItemAction[];

    // 样式
    className?: string;
    compact?: boolean;
}

// 标签颜色映射
const BADGE_COLORS: Record<NonNullable<ItemBadge['color']>, string> = {
    default: 'text-muted-foreground bg-muted/50',
    primary: 'text-primary bg-primary/10',
    blue: 'text-blue-500 bg-blue-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
    orange: 'text-orange-500 bg-orange-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
};

export const ItemCard: React.FC<ItemCardProps> = ({
    icon,
    title,
    subtitle,
    meta,
    badges = [],
    selected = false,
    disabled = false,
    toggle,
    onClick,
    actions = [],
    className = '',
    compact = false,
}) => {
    const visibleActions = actions.filter(a => !a.hidden);
    const hasToggle = !!toggle;

    return (
        <div
            className={`
                group relative flex items-center gap-3 
                ${compact ? 'py-2 px-2' : 'py-3 px-3'}
                rounded-lg cursor-pointer transition-all duration-150
                ${selected
                    ? 'bg-accent/60'
                    : 'hover:bg-muted/40'
                }
                ${disabled ? 'opacity-50 pointer-events-none' : ''}
                ${className}
            `}
            onClick={onClick}
        >
            {/* 左侧：图标或开关 */}
            {(icon || hasToggle) && (
                <div className="flex-shrink-0">
                    {hasToggle ? (
                        <button
                            className={`
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${toggle.checked
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggle.onChange(!toggle.checked);
                            }}
                        >
                            <Power size={14} />
                        </button>
                    ) : (
                        <div className={`
                            w-7 h-7 flex items-center justify-center rounded-md transition-colors
                            ${selected
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-foreground'
                            }
                        `}>
                            {icon}
                        </div>
                    )}
                </div>
            )}

            {/* 中间：内容区 */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    {/* 标题 */}
                    <span className={`
                        text-sm font-medium truncate transition-colors
                        ${selected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                        ${toggle && !toggle.checked ? 'line-through opacity-60' : ''}
                    `}>
                        {title}
                    </span>

                    {/* 标签 */}
                    {badges.map((badge, i) => (
                        <span
                            key={i}
                            className={`
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${BADGE_COLORS[badge.color || 'default']}
                            `}
                        >
                            {badge.text}
                        </span>
                    ))}
                </div>

                {/* 副标题/元信息 */}
                {(subtitle || meta) && (
                    <div className="flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70">
                        {subtitle && <span className="truncate">{subtitle}</span>}
                        {meta && <span className="flex-shrink-0 font-mono">{meta}</span>}
                    </div>
                )}
            </div>

            {/* 右侧：选中指示器 */}
            {selected && !visibleActions.length && (
                <Check size={14} className="text-primary flex-shrink-0" />
            )}

            {/* 右侧：操作按钮 */}
            {visibleActions.length > 0 && (
                <div className={`
                    flex items-center gap-0.5 flex-shrink-0
                    ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    transition-opacity
                `}>
                    {visibleActions.map((action, i) => (
                        <button
                            key={i}
                            className={`
                                p-1.5 rounded transition-colors
                                ${action.danger
                                    ? 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(e);
                            }}
                            title={action.title}
                        >
                            {action.icon}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemCard;

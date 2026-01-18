import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
    /** 显示的图标组件 */
    icon?: LucideIcon | React.ElementType;
    /** 主标标题 */
    title: string;
    /** 描述文本 */
    description?: string;
    /** 可选的操作按钮或内容 */
    action?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
}

/**
 * EmptyState - 统一的空状态占位组件
 *
 * 用于列表为空、未选择详情等场景
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon = PackageOpen,
    title,
    description,
    action,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center justify-center p-8 text-muted-foreground gap-4 h-full min-h-[200px] animate-in fade-in duration-300 ${className}`}>
            <div className="p-4 bg-muted/30 rounded-full">
                <Icon size={48} className="opacity-20 text-foreground" />
            </div>
            <div className="text-center space-y-1 max-w-[280px]">
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
                {description && (
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
};

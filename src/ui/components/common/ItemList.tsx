/**
 * ItemList - 通用列表容器组件
 * 
 * 提供统一的列表布局：标题栏 + 添加按钮 + 列表项 + 空状态
 * 支持分组展示
 */
import React from 'react';
import { Plus } from 'lucide-react';

// 分组配置
interface ItemGroup<T> {
    key: string;
    label: string;
    items: T[];
}

interface ItemListProps<T> {
    // 标题
    title: string;

    // 数据
    items?: T[];
    groups?: ItemGroup<T>[];

    // 渲染
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor: (item: T) => string;

    // 操作
    onAdd?: () => void;
    addLabel?: string;

    // 空状态
    emptyIcon?: React.ReactNode;
    emptyText?: string;

    // 额外操作
    headerActions?: React.ReactNode;

    // 样式
    className?: string;
}

export function ItemList<T>({
    title,
    items,
    groups,
    renderItem,
    keyExtractor,
    onAdd,
    addLabel,
    emptyIcon,
    emptyText = '暂无数据',
    headerActions,
    className = '',
}: ItemListProps<T>) {
    // 判断是否有数据
    const hasData = groups
        ? groups.some(g => g.items.length > 0)
        : (items?.length || 0) > 0;

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {/* 标题栏 */}
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    {headerActions}
                    {onAdd && (
                        <button
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                            onClick={onAdd}
                            title={addLabel || '添加'}
                        >
                            <Plus size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* 列表内容 */}
            <div className="flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar">
                {/* 分组模式 */}
                {groups && groups.map((group) => (
                    group.items.length > 0 && (
                        <div key={group.key} className="flex flex-col gap-1 mb-4">
                            {/* 分组标题 */}
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70 font-medium px-1 uppercase tracking-wider mb-1">
                                <span>{group.label}</span>
                                <div className="h-px bg-border/50 flex-1" />
                            </div>
                            {/* 分组项目 */}
                            {group.items.map((item, index) => (
                                <React.Fragment key={keyExtractor(item)}>
                                    {renderItem(item, index)}
                                </React.Fragment>
                            ))}
                        </div>
                    )
                ))}

                {/* 普通模式 */}
                {!groups && items?.map((item, index) => (
                    <React.Fragment key={keyExtractor(item)}>
                        {renderItem(item, index)}
                    </React.Fragment>
                ))}

                {/* 空状态 */}
                {!hasData && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                        {emptyIcon && (
                            <div className="opacity-30">
                                {emptyIcon}
                            </div>
                        )}
                        <p className="text-xs">{emptyText}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemList;

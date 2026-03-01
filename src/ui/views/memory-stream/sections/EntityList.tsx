import type { EntityNode } from '@/data/types/graph';
import { EmptyState } from '@/ui/components/feedback/EmptyState';
import { RefreshCw, Search, Users } from 'lucide-react';
import React from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { EntityCard } from '../components/EntityCard';
import type { ViewMode } from '../hooks/useMemoryStream';

interface EntityListProps {
    viewMode: ViewMode;
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    filteredEntities: EntityNode[];
    checkedIds: Set<string>;
    selectedId: string | null;

    // Callbacks
    onSelect: (id: string) => void;
    onCheck: (id: string, checked: boolean) => void;
}

export const EntityList: React.FC<EntityListProps> = ({
    viewMode,
    isLoading,
    searchQuery,
    setSearchQuery,
    filteredEntities,
    checkedIds,
    selectedId,
    onSelect,
    onCheck,
}) => {
    return (
        <div className="flex flex-col min-h-0 h-full w-full">
            {/* 搜索框 */}
            {viewMode === 'browse' && (
                <div className="relative mb-4 shrink-0 px-1">
                    <Search size={14} className="absolute left-1 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索实体..."
                        style={{
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid var(--border)',
                            borderRadius: 0,
                            outline: 'none',
                            padding: '8px 0 8px 24px',
                            fontSize: '14px',
                            width: '100%',
                            color: 'var(--foreground)',
                        }}
                        className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                    />
                </div>
            )}

            {/* List View */}
            <div className="flex-1 min-h-0 pb-4 pr-1 flex flex-col">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                        <RefreshCw size={24} className="animate-spin" />
                        <p className="text-sm font-light">加载中...</p>
                    </div>
                ) : filteredEntities.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title={searchQuery ? '没有找到匹配的实体' : '暂无实体'}
                        description={!searchQuery ? "请先执行实体提取" : undefined}
                    />
                ) : (
                    <>
                        {viewMode === 'browse' ? (
                            <VirtuosoGrid
                                data={filteredEntities}
                                className="flex-1 min-h-0"
                                style={{ height: '100%' }}
                                listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 items-start"
                                itemClassName="h-full flex flex-col"
                                itemContent={(index: number, entity: EntityNode) => (
                                    <div className="flex-1 flex flex-col h-full">
                                        <EntityCard
                                            entity={entity}
                                            isSelected={false}
                                            isCompact={false} // 编辑模式下紧凑，浏览模式下完整(网格)
                                            checked={checkedIds.has(entity.id)}
                                            onSelect={() => onSelect(entity.id)}
                                            onCheck={(checked) => onCheck(entity.id, checked)}
                                        />
                                    </div>
                                )}
                            />
                        ) : (
                            <Virtuoso
                                data={filteredEntities}
                                className="flex-1 min-h-0 flex flex-col gap-4 pb-4"
                                style={{ height: '100%' }}
                                itemContent={(index: number, entity: EntityNode) => (
                                    <div className="flex-1 flex flex-col h-full">
                                        <EntityCard
                                            entity={entity}
                                            isSelected={viewMode === 'edit' && selectedId === entity.id}
                                            isCompact={viewMode === 'edit'} // 编辑模式下紧凑，浏览模式下完整(网格)
                                            checked={checkedIds.has(entity.id)}
                                            onSelect={() => onSelect(entity.id)}
                                            onCheck={(checked) => onCheck(entity.id, checked)}
                                        />
                                    </div>
                                )}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

import type { EventNode } from '@/data/types/graph';
import { ErrorBoundary } from '@/ui/components/core/ErrorBoundary';
import { EmptyState } from '@/ui/components/feedback/EmptyState';
import { Brain, RefreshCw, Search } from 'lucide-react';
import React from 'react';
import { GroupedVirtuoso } from 'react-virtuoso';
import { EventCard } from '../components/EventCard';
import type { GroupedEvent, ViewMode } from '../hooks/useMemoryStream';

interface EventListProps {
    viewMode: ViewMode;
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    filteredEvents: EventNode[];
    groupedEvents: GroupedEvent[];
    groupStartIndices: number[];
    checkedIds: Set<string>;
    activeIds: Set<string>;
    selectedId: string | null;
    pendingChanges: Map<string, Partial<EventNode>>;

    // Callbacks
    onSelect: (id: string) => void;
    onCheck: (id: string, checked: boolean) => void;
    onGroupCheck: (group: GroupedEvent, checked: boolean) => void;
}

export const EventList: React.FC<EventListProps> = ({
    viewMode,
    isLoading,
    searchQuery,
    setSearchQuery,
    filteredEvents,
    groupedEvents,
    groupStartIndices,
    checkedIds,
    activeIds,
    selectedId,
    pendingChanges,
    onSelect,
    onCheck,
    onGroupCheck,
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
                        placeholder="搜索事件..."
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
                ) : filteredEvents.length === 0 ? (
                    <EmptyState
                        icon={Brain}
                        title={searchQuery ? '没有找到匹配的事件' : '暂无记忆事件'}
                        description={!searchQuery ? "开始聊天后将自动记录" : undefined}
                    />
                ) : (
                    <GroupedVirtuoso
                        className="flex-1 min-h-0"
                        style={{ height: '100%' }}
                        groupCounts={groupedEvents.map(g => g.events.length)}
                        groupContent={(index) => {
                            const group = groupedEvents[index];
                            const allChecked = group.events.length > 0 && group.events.every(e => checkedIds.has(e.id));
                            const someChecked = group.events.some(e => checkedIds.has(e.id));

                            return (
                                <div className="flex items-center gap-3 mb-4 sticky top-0 z-10 py-2 bg-background/80 backdrop-blur-sm">
                                    <input
                                        type="checkbox"
                                        checked={allChecked}
                                        ref={input => {
                                            if (input) {
                                                input.indeterminate = !allChecked && someChecked;
                                            }
                                        }}
                                        onChange={(e) => onGroupCheck(group, e.target.checked)}
                                        className="w-4 h-4 rounded border-border accent-primary shrink-0"
                                    />
                                    <div
                                        className="text-xs font-medium text-foreground px-3 py-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-md"
                                        style={{ backgroundColor: 'var(--SmartThemeChatColor, var(--bg-color, var(--background, #1e1e1e)))' }}
                                    >
                                        {group.title}
                                    </div>
                                    <div className="h-[1px] flex-1 bg-border/50" />
                                    <span className="text-[10px] text-muted-foreground mr-2">{group.events.length} 项</span>
                                </div>
                            );
                        }}
                        itemContent={(index, groupIndex) => {
                            const group = groupedEvents[groupIndex];
                            // O(1) 读取预计算的分组起始索引
                            const itemIndex = index - (groupStartIndices[groupIndex] || 0);

                            const event = group.events[itemIndex];
                            if (!event) return null; // 预防通过索引访问失败引发 TypeError Cannot read properties of undefined (reading 'id')
                            const isLast = itemIndex === group.events.length - 1;

                            return (
                                <div className="relative pl-6 pt-1 pb-3 group/card">
                                    {/* 垂直主干线 */}
                                    <div
                                        className="absolute left-3 top-[-10px] w-[2px] bg-foreground transition-colors opacity-20 group-hover/card:bg-primary group-hover/card:opacity-50 z-0"
                                        style={{ height: isLast ? 'calc(50% + 10px - 6px)' : 'calc(100% + 10px)' }}
                                    />
                                    {/* 横向分支线 */}
                                    <div className="absolute left-3 top-[calc(50%-6px)] w-3 h-[2px] bg-foreground transition-colors opacity-20 group-hover/card:bg-primary group-hover/card:opacity-50 z-0" />

                                    {/* 圆点指示器 */}
                                    <div className="absolute left-[9px] top-[calc(50%-8px)] w-[6px] h-[6px] rounded-full bg-foreground opacity-30 transition-colors group-hover/card:bg-primary z-10" />

                                    <div className="relative z-10 w-full pl-3">
                                        <ErrorBoundary>
                                            <EventCard
                                                event={event}
                                                isSelected={viewMode === 'edit' && selectedId === event.id}
                                                isCompact={viewMode === 'edit'} // 在分栏时使用紧凑模式
                                                isActive={activeIds.has(event.id)}
                                                checked={checkedIds.has(event.id)}
                                                hasChanges={pendingChanges.has(event.id)}
                                                onSelect={() => onSelect(event.id)}
                                                onCheck={(checked) => onCheck(event.id, checked)}
                                                className={event.level > 0 ? 'bg-primary/5 border-primary/20 shadow-sm transition-all' : 'transition-all'} // 重点高亮总结
                                            />
                                        </ErrorBoundary>
                                    </div>
                                </div>
                            );
                        }}
                    />
                )}
            </div>
        </div>
    );
};

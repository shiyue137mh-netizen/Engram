import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { PageTitle } from "@/ui/components/display/PageTitle";
import { Divider } from "@/ui/components/layout/Divider";
import { Tab } from "@/ui/components/layout/TabPills";
import { LayoutTabs } from "@/ui/components/layout/LayoutTabs";
import { useMemoryStore } from '@/state/memoryStore';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { SettingsManager } from '@/config/settings';
import type { EventNode, EntityNode } from '@/data/types/graph';
import { EventCard } from './components/EventCard';
import { EntityCard } from './components/EntityCard'; // Import EntityCard
import { EventEditor, type EventEditorHandle } from './components/EventEditor';
import { GraphView } from './GraphView';
import { Search, Trash2, RefreshCw, Brain, List, GitBranch, Save, Sparkles, Users } from 'lucide-react';
import { MasterDetailLayout } from '@/ui/components/layout/MasterDetailLayout';
import { EmptyState } from '@/ui/components/feedback/EmptyState';

// 响应式断点
const DESKTOP_BREAKPOINT = 768;

// Tab 配置
const VIEW_TABS: Tab[] = [
    { id: 'list', label: '列表', icon: <List size={14} /> },
    { id: 'entities', label: '实体', icon: <Users size={14} /> }, // Add Entity Tab
    { id: 'graph', label: '图谱', icon: <GitBranch size={14} /> },
];

type ViewTab = 'list' | 'graph' | 'entities';

export const MemoryStream: React.FC = () => {
    // 状态
    const [events, setEvents] = useState<EventNode[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < DESKTOP_BREAKPOINT);
    const [showEditor, setShowEditor] = useState(false);
    const [viewTab, setViewTab] = useState<ViewTab>('list');
    // V0.9: 实体数据
    const [entities, setEntities] = useState<EntityNode[]>([]);

    // 批量修改状态
    const [pendingChanges, setPendingChanges] = useState<Map<string, Partial<EventNode>>>(new Map());
    const hasChanges = pendingChanges.size > 0;

    // 重嵌状态
    const [isReembedding, setIsReembedding] = useState(false);

    // Store
    const store = useMemoryStore.getState();

    // Editor ref
    const editorRef = useRef<EventEditorHandle>(null);

    // 响应式检测
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < DESKTOP_BREAKPOINT);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 加载事件
    const loadEvents = async () => {
        setIsLoading(true);
        try {
            const allEvents = await store.getAllEvents();
            setEvents(allEvents.sort((a, b) => b.timestamp - a.timestamp));
        } catch (e) {
            console.error('[MemoryStream] Failed to load events:', e);
        } finally {
            setIsLoading(false);
        }
    };

    // V0.9: 加载实体
    const loadEntities = async () => {
        try {
            const allEntities = await store.getAllEntities();
            setEntities(allEntities);
        } catch (e) {
            console.error('[MemoryStream] Failed to load entities:', e);
        }
    };

    useEffect(() => {
        loadEvents();
        loadEntities();
    }, []);

    // 过滤事件
    const filteredEvents = useMemo(() => {
        if (!searchQuery.trim()) return events;
        const q = searchQuery.toLowerCase();
        return events.filter(e =>
            e.summary.toLowerCase().includes(q) ||
            e.structured_kv.event?.toLowerCase().includes(q) ||
            e.structured_kv.role?.some(r => r.toLowerCase().includes(q))
        );
    }, [events, searchQuery]);

    // 过滤实体
    const filteredEntities = useMemo(() => {
        if (!searchQuery.trim()) return entities;
        const q = searchQuery.toLowerCase();
        return entities.filter(e =>
            e.name.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            e.aliases?.some(a => a.toLowerCase().includes(q))
        );
    }, [entities, searchQuery]);

    // 选中的事件（合并待保存的修改）
    const selectedEvent = useMemo(() => {
        const event = events.find(e => e.id === selectedId);
        if (!event) return null;
        const pending = pendingChanges.get(event.id);
        if (pending) {
            return { ...event, ...pending } as EventNode;
        }
        return event;
    }, [events, selectedId, pendingChanges]);

    // 选中的实体
    const selectedEntity = useMemo(() => {
        return entities.find(e => e.id === selectedId) || null;
    }, [entities, selectedId]);

    // 选择事件/实体
    const handleSelect = (id: string) => {
        setSelectedId(id);
        if (isMobile) {
            setShowEditor(true);
        }
    };

    // 勾选事件/实体
    const handleCheck = (id: string, checked: boolean) => {
        const newSet = new Set(checkedIds);
        if (checked) {
            newSet.add(id);
        } else {
            newSet.delete(id);
        }
        setCheckedIds(newSet);
    };

    // 单个事件修改（暂存，不立即保存）
    const handleEventChange = useCallback((id: string, updates: Partial<EventNode>) => {
        setPendingChanges(prev => {
            const newMap = new Map(prev);
            const existing = newMap.get(id) || {};
            newMap.set(id, { ...existing, ...updates });
            return newMap;
        });

        // 同步更新本地显示
        setEvents(prev => prev.map(e =>
            e.id === id ? { ...e, ...updates } as EventNode : e
        ));
    }, []);

    // 批量保存所有修改
    const handleBatchSave = async () => {
        if (pendingChanges.size === 0) return;

        try {
            const promises = Array.from(pendingChanges.entries()).map(
                ([id, updates]) => store.updateEvent(id, updates)
            );
            await Promise.all(promises);

            console.log(`[MemoryStream] Batch saved ${pendingChanges.size} events`);
            setPendingChanges(new Map());
        } catch (e) {
            console.error('[MemoryStream] Batch save failed:', e);
        }
    };

    // 重嵌所有事件
    const handleReembedAll = async () => {
        const apiSettings = SettingsManager.get('apiSettings');
        const vectorConfig = apiSettings?.vectorConfig;

        if (!vectorConfig) {
            alert('请先在 API 配置中配置向量化服务');
            return;
        }

        if (!confirm('确定要重新嵌入所有事件吗？这将清除现有嵌入并重新生成。')) {
            return;
        }

        setIsReembedding(true);
        try {
            embeddingService.setConfig(vectorConfig);
            const config = apiSettings?.embeddingConfig;
            if (config?.concurrency) {
                embeddingService.setConcurrency(config.concurrency);
            }

            await embeddingService.reembedAllEvents((current, total, errors) => {
                console.log(`[MemoryStream] Reembedding: ${current}/${total}, errors: ${errors}`);
            });

            // 刷新列表
            await loadEvents();
            alert('重嵌完成！');
        } catch (e: any) {
            console.error('[MemoryStream] Reembed failed:', e);
            alert('重嵌失败: ' + (e.message || '未知错误'));
        } finally {
            setIsReembedding(false);
        }
    };

    // 删除事件/实体
    const handleDelete = async (id: string) => {
        if (viewTab === 'entities') {
            await store.deleteEntity(id);
            setEntities(prev => prev.filter(e => e.id !== id));
        } else {
            await store.deleteEvents([id]);
            setEvents(prev => prev.filter(e => e.id !== id));
            // 移除待保存的修改
            setPendingChanges(prev => {
                const newMap = new Map(prev);
                newMap.delete(id);
                return newMap;
            });
        }
        setSelectedId(null);
        setShowEditor(false);
    };

    // 批量删除
    const handleBatchDelete = async () => {
        if (checkedIds.size === 0) return;
        if (!confirm(`确定删除选中的 ${checkedIds.size} 个项目吗？`)) return;

        if (viewTab === 'entities') {
            const ids = Array.from(checkedIds);
            // Assuming store has batch delete for entities, or loop
            // store.deleteEntity only takes string, need loop or update store
            // For now, loop
            await Promise.all(ids.map(id => store.deleteEntity(id)));
            setEntities(prev => prev.filter(e => !checkedIds.has(e.id)));
        } else {
            await store.deleteEvents(Array.from(checkedIds));
            setEvents(prev => prev.filter(e => !checkedIds.has(e.id)));
            // 移除待保存的修改
            setPendingChanges(prev => {
                const newMap = new Map(prev);
                checkedIds.forEach(id => newMap.delete(id));
                return newMap;
            });
        }

        setCheckedIds(new Set());
    };

    // 关闭编辑器
    const handleCloseEditor = () => {
        setShowEditor(false);
        if (isMobile) {
            setSelectedId(null);
        }
    };

    // 移动端全屏编辑器 (Entities not supported for full editor yet, just simple view)
    if (isMobile && showEditor && selectedEvent && viewTab === 'list') {
        return (
            <EventEditor
                ref={editorRef}
                event={selectedEvent}
                isFullScreen={true}
                onSave={handleEventChange}
                onDelete={handleDelete}
                onClose={handleCloseEditor}
            />
        );
    }
    // Mobile Entity View could be added here similar to EventEditor

    const TAB_INFO: Record<ViewTab, { title: string; subtitle: string }> = {
        list: { title: '列表视图', subtitle: '查看和管理记忆事件' },
        entities: { title: '实体列表', subtitle: '查看和管理提取的实体' },
        graph: { title: '图谱视图', subtitle: '记忆事件的可视化关联' },
    };
    const currentInfo = TAB_INFO[viewTab];

    return (
        <div className="flex flex-col h-full animate-in fade-in overflow-hidden">
            <PageTitle
                breadcrumbs={['记忆编辑']}
                title={currentInfo.title}
                subtitle={currentInfo.subtitle}
            />
            <Divider className="mb-6" />

            {/* Tab 导航 */}
            <LayoutTabs
                tabs={VIEW_TABS}
                activeTab={viewTab}
                onChange={(id: string) => {
                    setViewTab(id as ViewTab);
                    setSelectedId(null);
                    setCheckedIds(new Set());
                }}
                actions={
                    <div className="flex items-center gap-2">
                        {/* 保存按钮 - 有修改时显示 (Only for events for now) */}
                        {viewTab === 'list' && hasChanges && (
                            <button
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors"
                                onClick={handleBatchSave}
                            >
                                <Save size={12} />
                                保存 ({pendingChanges.size})
                            </button>
                        )}

                        {/* 重嵌按钮 (Events only) */}
                        {viewTab === 'list' && (
                            <button
                                onClick={handleReembedAll}
                                disabled={isReembedding}
                                className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50"
                                title="重新嵌入所有事件"
                            >
                                <Sparkles size={12} className={isReembedding ? 'animate-pulse' : ''} />
                                {isReembedding ? '嵌入中...' : '重嵌'}
                            </button>
                        )}

                        {/* 刷新按钮 */}
                        <button
                            onClick={() => {
                                loadEvents();
                                loadEntities();
                            }}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                            title="刷新"
                        >
                            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                        </button>

                        {/* 批量删除 */}
                        {checkedIds.size > 0 && (
                            <button
                                onClick={handleBatchDelete}
                                className="flex items-center gap-1 px-2 py-1 text-xs text-destructive hover:bg-destructive/10 rounded-md"
                            >
                                <Trash2 size={12} />
                                删除 ({checkedIds.size})
                            </button>
                        )}
                    </div>
                }
            />

            {/* List View */}
            {viewTab === 'list' && (
                <div
                    className="flex flex-col overflow-hidden"
                    style={{
                        height: 'calc(100vh - 100px)',
                        minHeight: '300px',
                    }}
                >
                    <MasterDetailLayout
                        mobileDetailOpen={false} // Handled by separate MobileFullscreenForm return above
                        mobileDetailTitle="编辑事件"
                        header={
                            <div className="relative mb-4 shrink-0">
                                <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
                        }
                        list={isLoading ? (
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
                            <div className={isMobile ? '' : 'space-y-1 pb-4'}>
                                {filteredEvents.map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        isSelected={event.id === selectedId}
                                        isCompact={isMobile}
                                        checked={checkedIds.has(event.id)}
                                        hasChanges={pendingChanges.has(event.id)}
                                        onSelect={() => handleSelect(event.id)}
                                        onCheck={(checked) => handleCheck(event.id, checked)}
                                    />
                                ))}
                            </div>
                        )}
                        detail={
                            <EventEditor
                                ref={editorRef}
                                event={selectedEvent}
                                isFullScreen={false}
                                onSave={handleEventChange}
                                onDelete={handleDelete}
                                onClose={() => setSelectedId(null)}
                            />
                        }
                    />
                </div>
            )}

            {/* Entities View */}
            {viewTab === 'entities' && (
                <div
                    className="flex flex-col overflow-hidden"
                    style={{
                        height: 'calc(100vh - 100px)',
                        minHeight: '300px',
                    }}
                >
                    <MasterDetailLayout
                        mobileDetailOpen={false}
                        mobileDetailTitle="查看实体"
                        header={
                            <div className="relative mb-4 shrink-0">
                                <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
                        }
                        list={isLoading ? (
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
                            <div className={isMobile ? '' : 'space-y-1 pb-4'}>
                                {filteredEntities.map(entity => (
                                    <EntityCard
                                        key={entity.id}
                                        entity={entity}
                                        isSelected={entity.id === selectedId}
                                        isCompact={isMobile}
                                        checked={checkedIds.has(entity.id)}
                                        onSelect={() => handleSelect(entity.id)}
                                        onCheck={(checked) => handleCheck(entity.id, checked)}
                                    />
                                ))}
                            </div>
                        )}
                        detail={
                            selectedEntity ? (
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-medium text-foreground">{selectedEntity.name}</h3>
                                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20 uppercase">
                                                {selectedEntity.type}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(selectedEntity.id)}
                                            className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                                            title="删除实体"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">描述</h4>
                                        <div className="p-4 bg-muted/50 rounded-lg border border-border text-sm leading-relaxed whitespace-pre-wrap">
                                            {selectedEntity.description}
                                        </div>
                                    </div>

                                    {selectedEntity.aliases && selectedEntity.aliases.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">别名</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedEntity.aliases.map((alias, i) => (
                                                    <span key={i} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                                                        {alias}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedEntity.profile && Object.keys(selectedEntity.profile).length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">元数据 (Profile)</h4>
                                            <pre className="p-4 bg-muted rounded-lg border border-border text-xs font-mono overflow-auto">
                                                {JSON.stringify(selectedEntity.profile, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <p className="text-sm">选择一个实体查看详情</p>
                                </div>
                            )
                        }
                    />
                </div>
            )}

            {/* 图谱视图 - V0.9.2: 修复高度问题，React Flow 需要明确高度 */}
            {viewTab === 'graph' && (
                <div
                    className="flex-1 min-h-0"
                    style={{
                        // 与列表视图相同的计算高度
                        height: 'calc(100vh - 100px)',
                        minHeight: '400px',
                    }}
                >
                    <GraphView events={events} entities={entities} />
                </div>
            )}
        </div>
    );
};

export default MemoryStream;

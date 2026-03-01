import { SettingsManager } from '@/config/settings';
import type { EntityNode, EventNode } from '@/data/types/graph';
import { MacroService } from '@/integrations/tavern/macros';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { brainRecallCache } from '@/modules/rag/retrieval/BrainRecallCache';
import { useMemoryStore } from '@/state/memoryStore';
import { PageTitle } from "@/ui/components/display/PageTitle";
import { EmptyState } from '@/ui/components/feedback/EmptyState';
import { Divider } from "@/ui/components/layout/Divider";
import { LayoutTabs } from "@/ui/components/layout/LayoutTabs";
import { Tab } from "@/ui/components/layout/TabPills";
import { ArrowDownUp, Brain, Database, FileText, Filter, List, RefreshCw, Save, Search, Sparkles, Trash2, Users } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EntityCard } from './components/EntityCard'; // Import EntityCard
import { EntityEditor } from './components/EntityEditor';
import { EventCard } from './components/EventCard';
import { EventEditor, type EventEditorHandle } from './components/EventEditor';

// 响应式断点
const DESKTOP_BREAKPOINT = 768;

// Tab 配置
const VIEW_TABS: Tab[] = [
    { id: 'list', label: '列表', icon: <List size={14} /> },
    { id: 'entities', label: '实体', icon: <Users size={14} /> }, // Add Entity Tab
];

type ViewTab = 'list' | 'entities';

export const MemoryStream: React.FC = () => {
    // 状态
    const [events, setEvents] = useState<EventNode[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    // Feature Restoration States
    const [showActiveOnly, setShowActiveOnly] = useState(false);
    const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default: Old -> New
    const [showPreview, setShowPreview] = useState(false);
    const [previewContent, setPreviewContent] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'browse' | 'edit'>('browse'); // New viewMode state
    const [viewTab, setViewTab] = useState<ViewTab>('list');
    // V0.9: 实体数据
    const [isMobile, setIsMobile] = useState(window.innerWidth < DESKTOP_BREAKPOINT);
    const [entities, setEntities] = useState<EntityNode[]>([]);

    // 批量修改状态
    const [pendingChanges, setPendingChanges] = useState<Map<string, Partial<EventNode>>>(new Map());
    const [pendingEntityChanges, setPendingEntityChanges] = useState<Map<string, Partial<EntityNode>>>(new Map()); // Added for Entities
    const hasChanges = pendingChanges.size > 0 || pendingEntityChanges.size > 0;

    // 重嵌状态
    const [isReembedding, setIsReembedding] = useState(false);

    // V1.5 导入功能状态
    const [showImportModal, setShowImportModal] = useState(false);
    const [availableDbs, setAvailableDbs] = useState<string[]>([]);
    const [selectedDbToImport, setSelectedDbToImport] = useState<string>('');

    // Store
    const store = useMemoryStore.getState();

    // Editor ref
    const editorRef = useRef<EventEditorHandle>(null);
    // List container ref (for auto-scroll)
    const listRef = useRef<HTMLDivElement>(null);

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
            // Default Sort: Timeline Order (Old -> New)
            setEvents(allEvents.sort((a, b) => a.timestamp - b.timestamp));

            // Restoration: Load Active IDs
            const snapshot = brainRecallCache.getShortTermSnapshot();
            setActiveIds(new Set(snapshot.map(s => s.id)));
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

    // Auto-scroll to bottom when events invoke (initial load or refresh)
    useEffect(() => {
        if (listRef.current && events.length > 0) {
            // Scroll to bottom to show latest events (Stream view)
            requestAnimationFrame(() => {
                if (listRef.current) {
                    listRef.current.scrollTop = listRef.current.scrollHeight;
                }
            });
        }
    }, [events]);

    // 过滤事件
    const filteredEvents = useMemo(() => {
        let result = events;

        // 1. Search Filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.summary.toLowerCase().includes(q) ||
                e.structured_kv.event?.toLowerCase().includes(q) ||
                e.structured_kv.role?.some(r => r.toLowerCase().includes(q))
            );
        }

        // 2. Active Filter
        if (showActiveOnly) {
            result = result.filter(e => activeIds.has(e.id));
        }

        // 3. Sorting
        return [...result].sort((a, b) => {
            return sortOrder === 'asc'
                ? a.timestamp - b.timestamp
                : b.timestamp - a.timestamp;
        });
    }, [events, searchQuery, showActiveOnly, activeIds, sortOrder]);

    // 分组事件 (基于楼层区间)
    const groupedEvents = useMemo(() => {
        const interval = SettingsManager.get('summarizerConfig')?.floorInterval || 10;
        const groups = new Map<number, { title: string, events: EventNode[] }>();

        filteredEvents.forEach(event => {
            // V1.0.6: start_index as baseline
            const startIndex = event.source_range?.start_index || 0;
            const groupKey = Math.floor(startIndex / interval) * interval;

            if (!groups.has(groupKey)) {
                // Formatting display e.g., 0 -> 1-10, 10 -> 11-20
                const displayStart = groupKey === 0 ? 1 : groupKey + 1;
                const displayEnd = groupKey + interval;
                groups.set(groupKey, {
                    title: `第 ${displayStart} - ${displayEnd} 楼`,
                    events: []
                });
            }
            groups.get(groupKey)!.events.push(event);
        });

        // 排序组
        const sortedKeys = Array.from(groups.keys()).sort((a, b) => sortOrder === 'asc' ? a - b : b - a);

        return sortedKeys.map(key => {
            const group = groups.get(key)!;
            // 组内排序: 总结层级 (level > 0) 优先，其次按时间
            group.events.sort((a, b) => {
                if (a.level !== b.level) {
                    return b.level - a.level; // higher level first
                }
                return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
            });
            return {
                key,
                title: group.title,
                events: group.events
            };
        });
    }, [filteredEvents, sortOrder]);

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

    // 选中的实体 (合并待保存的修改)
    const selectedEntity = useMemo(() => {
        const entity = entities.find(e => e.id === selectedId);
        if (!entity) return null;
        const pending = pendingEntityChanges.get(entity.id);
        if (pending) {
            return { ...entity, ...pending } as EntityNode;
        }
        return entity;
    }, [entities, selectedId, pendingEntityChanges]);

    // 选择事件/实体
    const handleSelect = (id: string) => {
        setSelectedId(id);
        setViewMode('edit');
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



    // 实体修改回调 (暂存，不立即保存)
    const handleEntityChange = useCallback((id: string, updates: Partial<EntityNode>) => {
        setPendingEntityChanges(prev => {
            const newMap = new Map(prev);
            const existing = newMap.get(id) || {};
            newMap.set(id, { ...existing, ...updates });
            return newMap;
        });

        // 同步更新本地显示
        setEntities(prev => prev.map(e =>
            e.id === id ? { ...e, ...updates } as EntityNode : e
        ));
    }, []);

    // 批量保存所有修改 (Events & Entities)
    const handleBatchSave = async () => {
        if (pendingChanges.size === 0 && pendingEntityChanges.size === 0) return;

        try {
            const promises: Promise<any>[] = [];

            // Save Events
            if (pendingChanges.size > 0) {
                promises.push(...Array.from(pendingChanges.entries()).map(
                    ([id, updates]) => store.updateEvent(id, updates)
                ));
            }

            // Save Entities
            if (pendingEntityChanges.size > 0) {
                promises.push(...Array.from(pendingEntityChanges.entries()).map(
                    ([id, updates]) => store.updateEntity(id, updates)
                ));
            }

            await Promise.all(promises);

            console.log(`[MemoryStream] Batch saved: Events=${pendingChanges.size}, Entities=${pendingEntityChanges.size}`);
            setPendingChanges(new Map());
            setPendingEntityChanges(new Map());

            // Optional: Show feedback
            // alert('Saved!');
        } catch (e) {
            console.error('[MemoryStream] Batch save failed:', e);
            alert('部分保存失败，请检查控制台');
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

    // 执行导入
    const handleOpenImportModal = async () => {
        try {
            const Dexie = (await import('dexie')).default;
            const names = await Dexie.getDatabaseNames();
            // 过滤出 Engram_ 开头的，排除当前的
            // @ts-ignore
            const currentDbName = store.getCurrentDb?.()?.name || '';
            const engramDbs = names.filter(n => n.startsWith('Engram_') && n !== currentDbName);
            setAvailableDbs(engramDbs);
            if (engramDbs.length > 0) {
                setSelectedDbToImport(engramDbs[0]);
            }
            setShowImportModal(true);
        } catch (e) {
            console.error('[MemoryStream] Failed to get database names:', e);
            alert('获取历史数据库列表失败');
        }
    };

    const handleImportExecute = async () => {
        if (!selectedDbToImport) {
            alert('请选择要导入的数据库');
            return;
        }
        if (!confirm(`确定要将 [${selectedDbToImport}] 的数据合并到当前聊天吗？这不会影响被合并的源数据库。`)) {
            return;
        }

        try {
            setIsLoading(true);
            setShowImportModal(false);
            const res = await store.importDatabase(selectedDbToImport);
            alert(`导入成功！共导入及合并记录: 事件 ${res.events} 条, 实体 ${res.entities} 条。`);
            await loadEvents();
            await loadEntities();
        } catch (e: any) {
            console.error('[MemoryStream] Import failed:', e);
            alert('导入失败: ' + (e.message || '未知错误'));
        } finally {
            setIsLoading(false);
        }
    };

    // 删除事件/实体
    const handleDelete = async (id: string) => {
        if (viewTab === 'entities') {
            await store.deleteEntity(id);
            setEntities(prev => prev.filter(e => e.id !== id));
            // 移除实体待保存的修改
            setPendingEntityChanges(prev => {
                const newMap = new Map(prev);
                newMap.delete(id);
                return newMap;
            });
        } else {
            await store.deleteEvents([id]);
            setEvents(prev => prev.filter(e => e.id !== id));
            setPendingChanges(prev => {
                const newMap = new Map(prev);
                newMap.delete(id);
                return newMap;
            });
        }
        setSelectedId(null);
        setViewMode('browse');
    };

    // 批量删除
    const handleBatchDelete = async () => {
        if (checkedIds.size === 0) return;
        if (!confirm(`确定删除选中的 ${checkedIds.size} 个项目吗？`)) return;

        if (viewTab === 'entities') {
            const ids = Array.from(checkedIds);
            await store.deleteEntities(ids);
            setEntities(prev => prev.filter(e => !checkedIds.has(e.id)));
            // 移除实体待保存的修改
            setPendingEntityChanges(prev => {
                const newMap = new Map(prev);
                checkedIds.forEach(id => newMap.delete(id));
                return newMap;
            });
        } else {
            await store.deleteEvents(Array.from(checkedIds));
            setEvents(prev => prev.filter(e => !checkedIds.has(e.id)));
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
        setViewMode('browse');
        setSelectedId(null);
    };

    const TAB_INFO: Record<ViewTab, { title: string; subtitle: string }> = {
        list: { title: '列表视图', subtitle: '查看和管理记忆事件' },
        entities: { title: '实体列表', subtitle: '查看和管理提取的实体' },
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

                        {/* 保存按钮 - 有修改时显示 (Shared for Events and Entities) */}
                        {hasChanges && (
                            <button
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors"
                                onClick={handleBatchSave}
                            >
                                <Save size={12} />
                                保存 ({pendingChanges.size + pendingEntityChanges.size})
                            </button>
                        )}

                        {/* 导入外部/历史数据库按钮 */}
                        <button
                            onClick={handleOpenImportModal}
                            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors"
                            title="导入历史分卷/外部库"
                        >
                            <Database size={12} />
                            合并导入
                        </button>

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

                        {/* Divider */}
                        <div className="w-[1px] h-4 bg-border mx-1" />

                        {/* 排序切换 */}
                        {viewTab === 'list' && (
                            <button
                                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                                title={sortOrder === 'asc' ? '当前: 旧 -> 新' : '当前: 新 -> 旧'}
                            >
                                <ArrowDownUp size={14} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
                            </button>
                        )}

                        {/* 激活筛选 */}
                        {viewTab === 'list' && (
                            <button
                                onClick={() => setShowActiveOnly(prev => !prev)}
                                className={`p-1.5 rounded-md transition-colors ${showActiveOnly ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                                title={showActiveOnly ? '显示全部' : '只看激活 (Recall)'}
                            >
                                <Filter size={14} />
                            </button>
                        )}

                        {/* 宏预览 */}
                        <button
                            onClick={() => {
                                const summaries = MacroService.getSummaries() || '(无剧情摘要)';
                                const entities = MacroService.getEntityStates() || '(无实体状态)';
                                setPreviewContent(`--- [Engram Summaries] ---\n${summaries}\n\n--- [Engram Entity States] ---\n${entities}`);
                                setShowPreview(true);
                            }}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                            title="查看当前注入内容"
                        >
                            <FileText size={14} />
                        </button>
                    </div>
                }
            />

            {/* View Area */}
            <div
                className="flex flex-col overflow-hidden relative"
                style={{
                    height: 'calc(100vh - 100px)',
                    minHeight: '300px',
                }}
            >
                {/* 搜索框 (Both Lists) */}
                {viewMode === 'browse' && (
                    <div className="relative mb-4 shrink-0 px-1">
                        <Search size={14} className="absolute left-1 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={viewTab === 'list' ? "搜索事件..." : "搜索实体..."}
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
                {viewTab === 'list' && viewMode === 'browse' && (
                    <div className="flex-1 overflow-y-auto no-scrollbar" ref={listRef}>
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
                            <div className="space-y-6 pb-4 px-2">
                                {groupedEvents.map(group => {
                                    // 检查组内是否全部被选中
                                    const allChecked = group.events.length > 0 && group.events.every(e => checkedIds.has(e.id));
                                    const someChecked = group.events.some(e => checkedIds.has(e.id));

                                    return (
                                        <div key={group.key} className="relative">
                                            {/* 分组头部：使用半透明背景标识 */}
                                            <div className="flex items-center gap-3 mb-4 sticky top-0 z-10 bg-background/95 backdrop-blur py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={allChecked}
                                                    ref={input => {
                                                        if (input) {
                                                            input.indeterminate = !allChecked && someChecked;
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        const newSet = new Set(checkedIds);
                                                        group.events.forEach(ev => {
                                                            if (checked) newSet.add(ev.id);
                                                            else newSet.delete(ev.id);
                                                        });
                                                        setCheckedIds(newSet);
                                                    }}
                                                    className="w-4 h-4 rounded border-border accent-primary shrink-0"
                                                />
                                                <div className="text-xs font-medium text-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                                                    {group.title}
                                                </div>
                                                <div className="h-[1px] flex-1 bg-border/50" />
                                                <span className="text-[10px] text-muted-foreground mr-2">{group.events.length} 项</span>
                                            </div>

                                            {/* 组内容树状结构 */}
                                            <div className="relative pl-6 space-y-3">
                                                {/* 垂直主干线 */}
                                                <div className="absolute left-[11px] top-4 bottom-6 w-[1px] bg-border transition-colors group-hover:bg-primary/30" />

                                                {group.events.map((event, index) => (
                                                    <div key={event.id} className="relative group/card">
                                                        {/* 横向分支线 */}
                                                        <div className="absolute -left-6 top-1/2 w-[20px] h-[1px] bg-border transition-colors group-hover/card:bg-primary/50" />

                                                        {/* 分支节点小圆点 */}
                                                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 -translate-x-[2px] w-1.5 h-1.5 rounded-full bg-border transition-colors group-hover/card:bg-primary/50" />

                                                        <EventCard
                                                            event={event}
                                                            isSelected={false} // list only
                                                            isCompact={false} // Use full card view
                                                            isActive={activeIds.has(event.id)}
                                                            checked={checkedIds.has(event.id)}
                                                            hasChanges={pendingChanges.has(event.id)}
                                                            onSelect={() => handleSelect(event.id)}
                                                            onCheck={(checked) => handleCheck(event.id, checked)}
                                                            className={event.level > 0 ? 'bg-primary/5 border-primary/20 shadow-sm' : ''} // 重点高亮总结
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Entities View */}
                {viewTab === 'entities' && viewMode === 'browse' && (
                    <div className="flex-1 overflow-y-auto no-scrollbar">
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
                            <div className="space-y-4 pb-4">
                                {filteredEntities.map(entity => (
                                    <EntityCard
                                        key={entity.id}
                                        entity={entity}
                                        isSelected={false}
                                        isCompact={false}
                                        checked={checkedIds.has(entity.id)}
                                        onSelect={() => handleSelect(entity.id)}
                                        onCheck={(checked) => handleCheck(entity.id, checked)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Editor Overlays in Edit Mode (in place, taking full height of container) */}
                {viewMode === 'edit' && viewTab === 'list' && selectedEvent && (
                    <div className="absolute inset-0 bg-background z-10 flex flex-col">
                        <EventEditor
                            ref={editorRef}
                            event={selectedEvent}
                            isFullScreen={true}
                            onSave={handleEventChange}
                            onDelete={handleDelete}
                            onClose={handleCloseEditor}
                        />
                    </div>
                )}

                {viewMode === 'edit' && viewTab === 'entities' && selectedEntity && (
                    <div className="absolute inset-0 bg-background z-10 flex flex-col">
                        <EntityEditor
                            entity={selectedEntity}
                            isFullScreen={true}
                            onSave={handleEntityChange}
                            onDelete={handleDelete}
                            onClose={handleCloseEditor}
                        />
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl bg-background border border-border rounded-lg shadow-xl flex flex-col max-h-[80vh]">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <FileText size={16} className="text-primary" />
                                宏注入预览 (Active Injection)
                            </h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                关闭
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                            <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded border border-border/50">
                                {previewContent}
                            </pre>
                        </div>
                        <div className="px-4 py-2 border-t border-border bg-muted/20 text-[10px] text-muted-foreground">
                            *此内容为 {'{{engramSummaries}}'} 和 {'{{engramEntityStates}}'} 宏在当前上下文中的实际输出值
                        </div>
                    </div>
                </div>
            )}

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-background border border-border rounded-lg shadow-xl flex flex-col">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <Database size={16} className="text-primary" />
                                合并历史数据库
                            </h3>
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                关闭
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                基于全新的绝对时间单库对齐架构，您可以无缝、极速地将旧存档（或其他聊天）的底层知识与历史事迹全盘并入当前聊天中！
                            </p>

                            {availableDbs.length === 0 ? (
                                <div className="p-4 border border-dashed rounded text-center text-sm text-muted-foreground">
                                    未找到其他 Engram 历史数据库
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-xs font-medium">选择要合并提取的底层库源：</label>
                                    <select
                                        value={selectedDbToImport}
                                        onChange={(e) => setSelectedDbToImport(e.target.value)}
                                        className="w-full p-2 text-sm bg-background border rounded focus:ring-1 focus:ring-primary outline-none"
                                    >
                                        {availableDbs.map(name => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="px-4 py-3 border-t border-border flex justify-end gap-2 bg-muted/20">
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleImportExecute}
                                disabled={availableDbs.length === 0}
                                className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
                            >
                                执行穿梭合并
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


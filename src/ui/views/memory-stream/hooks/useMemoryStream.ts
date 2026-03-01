import { SettingsManager } from '@/config/settings';
import type { EntityNode, EventNode } from '@/data/types/graph';
import { embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { brainRecallCache } from '@/modules/rag/retrieval/BrainRecallCache';
import { useMemoryStore } from '@/state/memoryStore';
import { notificationService } from '@/ui/services/NotificationService';
import { useCallback, useEffect, useMemo, useState } from 'react';

const DESKTOP_BREAKPOINT = 768;

export type ViewTab = 'list' | 'entities';
export type ViewMode = 'browse' | 'edit';
export type SortOrder = 'asc' | 'desc';

export interface GroupedEvent {
    key: number;
    title: string;
    events: EventNode[];
    startIndex: number;
}

export function useMemoryStream() {
    // === 1. 基础状态 ===
    const [events, setEvents] = useState<EventNode[]>([]);
    const [entities, setEntities] = useState<EntityNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < DESKTOP_BREAKPOINT);

    // === 2. UI 交互状态 ===
    const [viewMode, setViewMode] = useState<ViewMode>('browse');
    const [viewTab, setViewTab] = useState<ViewTab>('list');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

    // === 3. 过滤与排序状态 ===
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [showActiveOnly, setShowActiveOnly] = useState(false);
    const [activeIds, setActiveIds] = useState<Set<string>>(new Set());

    // === 4. 编辑与修改状态 ===
    const [pendingChanges, setPendingChanges] = useState<Map<string, Partial<EventNode>>>(new Map());
    const [pendingEntityChanges, setPendingEntityChanges] = useState<Map<string, Partial<EntityNode>>>(new Map());
    const hasChanges = pendingChanges.size > 0 || pendingEntityChanges.size > 0;

    // === 5. 异步操作状态 ===
    const [isReembedding, setIsReembedding] = useState(false);

    // 弹窗状态 (下放到需要的地方管理，或者作为返回值导出，这里暂不包含在 hook 内部处理)
    // 但为了完全替代原组件，包含它们：
    const [showPreview, setShowPreview] = useState(false);
    const [previewContent, setPreviewContent] = useState('');
    const [showImportModal, setShowImportModal] = useState(false);
    const [availableDbs, setAvailableDbs] = useState<string[]>([]);
    const [selectedDbToImport, setSelectedDbToImport] = useState<string>('');
    const [showMobileActions, setShowMobileActions] = useState(false);

    const store = useMemoryStore.getState();

    // ==========================================
    // 生命周期与副作用
    // ==========================================

    // 响应式检测
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < DESKTOP_BREAKPOINT);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 加载事件流
    const loadEvents = useCallback(async () => {
        setIsLoading(true);
        try {
            const allEvents = await store.getAllEvents();
            setEvents(allEvents.sort((a, b) => a.timestamp - b.timestamp));

            const snapshot = brainRecallCache.getShortTermSnapshot();
            setActiveIds(new Set(snapshot.map(s => s.id)));
        } catch (e) {
            console.error('[MemoryStream] Failed to load events:', e);
        } finally {
            setIsLoading(false);
        }
    }, [store]);

    // 加载实体流
    const loadEntities = useCallback(async () => {
        try {
            const allEntities = await store.getAllEntities();
            setEntities(allEntities);
        } catch (e) {
            console.error('[MemoryStream] Failed to load entities:', e);
        }
    }, [store]);

    useEffect(() => {
        loadEvents();
        loadEntities();
    }, [loadEvents, loadEntities]);


    // ==========================================
    // 派生状态 (Derived State)
    // ==========================================

    const filteredEvents = useMemo(() => {
        let result = events;

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.summary.toLowerCase().includes(q) ||
                e.structured_kv.event?.toLowerCase().includes(q) ||
                e.structured_kv.role?.some(r => r.toLowerCase().includes(q))
            );
        }

        if (showActiveOnly) {
            result = result.filter(e => activeIds.has(e.id));
        }

        return [...result].sort((a, b) => sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp);
    }, [events, searchQuery, showActiveOnly, activeIds, sortOrder]);

    const groupedEvents = useMemo(() => {
        const interval = SettingsManager.get('summarizerConfig')?.floorInterval || 10;
        const groups = new Map<number, { title: string, events: EventNode[] }>();

        filteredEvents.forEach(event => {
            const startIndex = event.source_range?.start_index || 0;
            const groupKey = Math.floor(startIndex / interval) * interval;

            if (!groups.has(groupKey)) {
                const displayStart = groupKey === 0 ? 1 : groupKey + 1;
                const displayEnd = groupKey + interval;
                groups.set(groupKey, {
                    title: `第 ${displayStart} - ${displayEnd} 楼`,
                    events: []
                });
            }
            groups.get(groupKey)!.events.push(event);
        });

        const sortedKeys = Array.from(groups.keys()).sort((a, b) => sortOrder === 'asc' ? a - b : b - a);

        return sortedKeys.map((key) => {
            const group = groups.get(key)!;
            group.events.sort((a, b) => {
                if (a.level !== b.level) {
                    return b.level - a.level;
                }
                return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
            });
            return {
                key,
                title: group.title,
                events: group.events,
                startIndex: 0,
            };
        });
    }, [filteredEvents, sortOrder]);

    const groupStartIndices = useMemo(() => {
        const indices: number[] = [];
        let cumulative = 0;
        for (const group of groupedEvents) {
            indices.push(cumulative);
            cumulative += group.events.length;
        }
        return indices;
    }, [groupedEvents]);

    const filteredEntities = useMemo(() => {
        if (!searchQuery.trim()) return entities;
        const q = searchQuery.toLowerCase();
        return entities.filter(e =>
            e.name.toLowerCase().includes(q) ||
            e.aliases?.some((a: string) => a.toLowerCase().includes(q)) ||
            e.description?.toLowerCase().includes(q)
        );
    }, [entities, searchQuery]);

    const selectedEvent = useMemo(() => {
        const event = events.find(e => e.id === selectedId);
        if (!event) return null;
        const pending = pendingChanges.get(event.id);
        if (pending) {
            return { ...event, ...pending } as EventNode;
        }
        return event;
    }, [events, selectedId, pendingChanges]);

    const selectedEntity = useMemo(() => {
        const entity = entities.find(e => e.id === selectedId);
        if (!entity) return null;
        const pending = pendingEntityChanges.get(entity.id);
        if (pending) {
            return { ...entity, ...pending } as EntityNode;
        }
        return entity;
    }, [entities, selectedId, pendingEntityChanges]);


    // ==========================================
    // 交互回调
    // ==========================================

    const handleSelect = useCallback((id: string) => {
        setSelectedId(id);
        setViewMode('edit');
    }, []);

    const handleCheck = useCallback((id: string, checked: boolean) => {
        setCheckedIds(prev => {
            const newSet = new Set(prev);
            if (checked) newSet.add(id);
            else newSet.delete(id);
            return newSet;
        });
    }, []);

    const handleCloseEditor = useCallback(() => {
        setViewMode('browse');
        setSelectedId(null);
    }, []);

    const handleTabChange = useCallback((id: string) => {
        setViewTab(id as ViewTab);
        setSelectedId(null);
        setCheckedIds(new Set());
    }, []);


    // ==========================================
    // CRUD 与数据修改
    // ==========================================

    const handleEventChange = useCallback((id: string, updates: Partial<EventNode>) => {
        setPendingChanges(prev => {
            const newMap = new Map(prev);
            const existing = newMap.get(id) || {};
            newMap.set(id, { ...existing, ...updates });
            return newMap;
        });
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } as EventNode : e));
    }, []);

    const handleEntityChange = useCallback((id: string, updates: Partial<EntityNode>) => {
        setPendingEntityChanges(prev => {
            const newMap = new Map(prev);
            const existing = newMap.get(id) || {};
            newMap.set(id, { ...existing, ...updates });
            return newMap;
        });
        setEntities(prev => prev.map(e => e.id === id ? { ...e, ...updates } as EntityNode : e));
    }, []);

    const handleBatchSave = useCallback(async () => {
        if (pendingChanges.size === 0 && pendingEntityChanges.size === 0) return;

        try {
            const promises: Promise<any>[] = [];

            if (pendingChanges.size > 0) {
                promises.push(...Array.from(pendingChanges.entries()).map(
                    ([id, updates]) => store.updateEvent(id, updates)
                ));
            }

            if (pendingEntityChanges.size > 0) {
                promises.push(...Array.from(pendingEntityChanges.entries()).map(
                    ([id, updates]) => store.updateEntity(id, updates)
                ));
            }

            await Promise.all(promises);

            notificationService.success(`保存成功，共 ${pendingChanges.size + pendingEntityChanges.size} 条记录`, 'MemoryStream');
            setPendingChanges(new Map());
            setPendingEntityChanges(new Map());
        } catch (e) {
            console.error('[MemoryStream] Batch save failed:', e);
            notificationService.error('部分保存失败，请检查控制台', 'MemoryStream');
        }
    }, [pendingChanges, pendingEntityChanges, store]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            if (viewTab === 'entities') {
                await store.deleteEntity(id);
                setEntities(prev => prev.filter(e => e.id !== id));
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
            notificationService.success('删除成功', 'MemoryStream');
        } catch (e: any) {
            notificationService.error('删除失败: ' + (e.message || '未知错误'), 'MemoryStream');
        }
    }, [viewTab, store]);

    const handleBatchDelete = useCallback(async () => {
        if (checkedIds.size === 0) return;
        if (!confirm(`确定删除选中的 ${checkedIds.size} 个项目吗？`)) return;

        try {
            if (viewTab === 'entities') {
                const ids = Array.from(checkedIds);
                await store.deleteEntities(ids);
                setEntities(prev => prev.filter(e => !checkedIds.has(e.id)));
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
            notificationService.success(`成功删除 ${checkedIds.size} 条记录`, 'MemoryStream');
        } catch (e: any) {
            notificationService.error('批量删除失败: ' + (e.message || '未知错误'), 'MemoryStream');
        }
    }, [checkedIds, viewTab, store]);

    const handleReembedAll = useCallback(async () => {
        const apiSettings = SettingsManager.get('apiSettings');
        const vectorConfig = apiSettings?.vectorConfig;

        if (!vectorConfig) {
            notificationService.error('请先在 API 配置中配置向量化服务', 'MemoryStream');
            return;
        }

        if (!confirm('确定要重新嵌入所有事件吗？这将清除现有嵌入并重新生成。')) return;

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

            await loadEvents();
            notificationService.success('重嵌完工！', 'MemoryStream');
        } catch (e: any) {
            console.error('[MemoryStream] Reembed failed:', e);
            notificationService.error('重嵌失败: ' + (e.message || '未知错误'), 'MemoryStream');
        } finally {
            setIsReembedding(false);
        }
    }, [loadEvents]);


    const handleOpenImportModal = useCallback(async () => {
        try {
            const Dexie = (await import('dexie')).default;
            const names = await Dexie.getDatabaseNames();
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
            notificationService.error('获取历史数据库列表失败', 'MemoryStream');
        }
    }, [store]);

    const handleImportExecute = useCallback(async () => {
        if (!selectedDbToImport) {
            notificationService.warning('请选择要导入的数据库', 'MemoryStream');
            return;
        }
        if (!confirm(`确定要将 [${selectedDbToImport}] 的数据合并到当前聊天吗？这不会影响被合并的源数据库。`)) return;

        try {
            setIsLoading(true);
            setShowImportModal(false);
            const res = await store.importDatabase(selectedDbToImport);
            notificationService.success(`导入成功！事件 ${res.events} 条, 实体 ${res.entities} 条。`, 'MemoryStream');
            await loadEvents();
            await loadEntities();
        } catch (e: any) {
            console.error('[MemoryStream] Import failed:', e);
            notificationService.error('导入失败: ' + (e.message || '未知错误'), 'MemoryStream');
        } finally {
            setIsLoading(false);
        }
    }, [selectedDbToImport, store, loadEvents, loadEntities]);


    return {
        // State
        events, entities, isLoading, isMobile,
        viewMode, viewTab, selectedId, checkedIds,
        searchQuery, sortOrder, showActiveOnly, activeIds,
        hasChanges, isReembedding, pendingChanges, pendingEntityChanges,
        showPreview, previewContent,
        showImportModal, availableDbs, selectedDbToImport,
        showMobileActions,

        // Derived State
        filteredEvents, filteredEntities, groupedEvents, groupStartIndices,
        selectedEvent, selectedEntity,

        // Setters
        setSearchQuery, setSortOrder, setShowActiveOnly,
        setShowPreview, setPreviewContent,
        setShowImportModal, setSelectedDbToImport,
        setShowMobileActions, setCheckedIds,

        // Callbacks
        handleSelect, handleCheck, handleCloseEditor, handleTabChange,
        handleEventChange, handleEntityChange,
        handleBatchSave, handleDelete, handleBatchDelete,
        handleReembedAll, handleOpenImportModal, handleImportExecute,
        loadEvents, loadEntities,
    };
}

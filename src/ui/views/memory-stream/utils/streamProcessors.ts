import { SettingsManager } from '@/config/settings';
import type { EntityNode, EventNode } from '@/data/types/graph';
import type { EntityGroupMode, EntitySortMode, GroupedEvent, SortOrder } from '../hooks/useMemoryStream';

/**
 * 过滤事件列表
 */
export function filterEvents(
    events: EventNode[],
    pendingChanges: Map<string, Partial<EventNode>>,
    searchQuery: string,
    showActiveOnly: boolean,
    activeIds: Set<string>,
    sortOrder: SortOrder
): EventNode[] {
    let result = events.map(e => {
        const pending = pendingChanges.get(e.id);
        return pending ? { ...e, ...pending } as EventNode : e;
    });

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

    return result.toSorted((a, b) =>
        sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
    );
}

/**
 * 将事件按时间线分组
 * 默认每 24 小时为一个逻辑分组，或者在 browse 模式下提供平稳的时间轴
 */
export function groupEvents(
    filteredEvents: EventNode[],
    sortOrder: SortOrder
): GroupedEvent[] {
    const groups = new Map<string, { title: string, events: EventNode[] }>();
    const isAsc = sortOrder === 'asc';

    filteredEvents.forEach(event => {
        // 使用日期作为分组标准，让时间线更直观
        const date = new Date(event.timestamp);
        const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const title = date.toLocaleDateString('zh-CN', { day: 'numeric', month: 'long', year: 'numeric' });

        if (!groups.has(dateKey)) {
            groups.set(dateKey, { events: [], title });
        }
        groups.get(dateKey)!.events.push(event);
    });

    // 默认按日期排序
    const sortedKeys = [...groups.keys()].toSorted((a, b) => {
        const timeA = new Date(a).getTime();
        const timeB = new Date(b).getTime();
        return isAsc ? timeA - timeB : timeB - timeA;
    });

    return sortedKeys.map((key, idx) => {
        const group = groups.get(key)!;
        // 组内严格按时间戳排序
        group.events.sort((a, b) => isAsc ? a.timestamp - b.timestamp : b.timestamp - a.timestamp);
        
        return {
            events: group.events,
            key: idx,
            startIndex: 0,
            title: group.title,
        };
    });
}

export interface EntitySubgroup {
    key: string;
    title: string;
    entities: EntityNode[];
}

export interface EntityGroup {
    key: string;
    title: string;
    count: number;
    children: EntitySubgroup[];
}

/**
 * 过滤实体列表
 */
export function filterEntities(
    entities: EntityNode[],
    pendingChanges: Map<string, Partial<EntityNode>>,
    searchQuery: string
): EntityNode[] {
    const result = entities.map(e => {
        const pending = pendingChanges.get(e.id);
        return pending ? { ...e, ...pending } as EntityNode : e;
    });

    if (!searchQuery.trim()) {return result;}

    const q = searchQuery.toLowerCase();
    return result.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.aliases?.some((a: string) => a.toLowerCase().includes(q)) ||
        e.description?.toLowerCase().includes(q)
    );
}

function getTypeLabel(type: string): string {
    switch ((type || 'unknown').toLowerCase()) {
        case 'char': { return '角色';
        }
        case 'loc': { return '地点';
        }
        case 'item': { return '物品';
        }
        case 'concept': { return '概念';
        }
        default: { return '其他';
        }
    }
}

function sortEntities(entities: EntityNode[], sortMode: EntitySortMode): EntityNode[] {
    return [...entities].toSorted((a, b) => {
        const ta = a.last_updated_at || 0;
        const tb = b.last_updated_at || 0;

        switch (sortMode) {
            case 'updated_asc': {
                return ta - tb;
            }
            case 'name_asc': {
                return a.name.localeCompare(b.name, 'zh-CN');
            }
            case 'updated_desc':
            default: {
                return tb - ta;
            }
        }
    });
}

/**
 * 实体分组：支持无分组、按类型、按归档
 */
export function groupEntities(
    entities: EntityNode[],
    sortMode: EntitySortMode,
    groupMode: EntityGroupMode
): EntityGroup[] {
    const sorted = sortEntities(entities, sortMode);

    if (groupMode === 'none') {
        return [{
            children: [{ key: 'all-items', title: '全部', entities: sorted }],
            count: sorted.length,
            key: 'all',
            title: '全部实体',
        }];
    }

    if (groupMode === 'archive') {
        const active = sorted.filter(e => !e.is_archived);
        const archived = sorted.filter(e => Boolean(e.is_archived));

        return [
            {
                children: [{ key: 'active-items', title: '活跃', entities: active }],
                count: active.length,
                key: 'active',
                title: '活跃实体',
            },
            {
                children: [{ key: 'archived-items', title: '归档', entities: archived }],
                count: archived.length,
                key: 'archived',
                title: '已归档实体',
            },
        ];
    }

    const typeOrder = ['char', 'loc', 'item', 'concept', 'unknown'];
    return typeOrder
        .map(type => {
            const byType = sorted.filter(e => (e.type || 'unknown') === type);
            const active = byType.filter(e => !e.is_archived);
            const archived = byType.filter(e => Boolean(e.is_archived));

            return {
                children: [
                    { key: `type-${type}-active`, title: '活跃', entities: active },
                    { key: `type-${type}-archived`, title: '归档', entities: archived },
                ],
                count: byType.length,
                key: `type-${type}`,
                title: `${getTypeLabel(type)} (${type})`,
            } as EntityGroup;
        })
        .filter(g => g.count > 0);
}

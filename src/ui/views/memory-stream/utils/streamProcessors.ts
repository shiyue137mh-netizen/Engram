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

    return result.sort((a, b) =>
        sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
    );
}

/**
 * 将事件按楼层分组
 */
export function groupEvents(
    filteredEvents: EventNode[],
    sortOrder: SortOrder
): GroupedEvent[] {
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

    const sortedKeys = Array.from(groups.keys()).sort((a, b) =>
        sortOrder === 'asc' ? a - b : b - a
    );

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
    let result = entities.map(e => {
        const pending = pendingChanges.get(e.id);
        return pending ? { ...e, ...pending } as EntityNode : e;
    });

    if (!searchQuery.trim()) return result;

    const q = searchQuery.toLowerCase();
    return result.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.aliases?.some((a: string) => a.toLowerCase().includes(q)) ||
        e.description?.toLowerCase().includes(q)
    );
}

function getTypeLabel(type: string): string {
    switch ((type || 'unknown').toLowerCase()) {
        case 'char': return '角色';
        case 'loc': return '地点';
        case 'item': return '物品';
        case 'concept': return '概念';
        default: return '其他';
    }
}

function sortEntities(entities: EntityNode[], sortMode: EntitySortMode): EntityNode[] {
    return [...entities].sort((a, b) => {
        const ta = a.last_updated_at || 0;
        const tb = b.last_updated_at || 0;

        switch (sortMode) {
            case 'updated_asc':
                return ta - tb;
            case 'name_asc':
                return a.name.localeCompare(b.name, 'zh-CN');
            case 'updated_desc':
            default:
                return tb - ta;
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
            key: 'all',
            title: '全部实体',
            count: sorted.length,
            children: [{ key: 'all-items', title: '全部', entities: sorted }],
        }];
    }

    if (groupMode === 'archive') {
        const active = sorted.filter(e => !e.is_archived);
        const archived = sorted.filter(e => !!e.is_archived);

        return [
            {
                key: 'active',
                title: '活跃实体',
                count: active.length,
                children: [{ key: 'active-items', title: '活跃', entities: active }],
            },
            {
                key: 'archived',
                title: '已归档实体',
                count: archived.length,
                children: [{ key: 'archived-items', title: '归档', entities: archived }],
            },
        ];
    }

    const typeOrder = ['char', 'loc', 'item', 'concept', 'unknown'];
    return typeOrder
        .map(type => {
            const byType = sorted.filter(e => (e.type || 'unknown') === type);
            const active = byType.filter(e => !e.is_archived);
            const archived = byType.filter(e => !!e.is_archived);

            return {
                key: `type-${type}`,
                title: `${getTypeLabel(type)} (${type})`,
                count: byType.length,
                children: [
                    { key: `type-${type}-active`, title: '活跃', entities: active },
                    { key: `type-${type}-archived`, title: '归档', entities: archived },
                ],
            } as EntityGroup;
        })
        .filter(g => g.count > 0);
}

import { Logger } from '@/core/logger';
import type { EventNode } from '@/data/types/graph';
import { useMemoryStore } from '@/state/memoryStore';
import type { JobContext } from '../../core/JobContext';
import type { IStep } from '../../core/Step';

export class FetchEventsToTrim implements IStep {
    name = 'FetchEventsToTrim';

    async execute(context: JobContext): Promise<void> {
        const config = context.config || {};
        const keepRecentCount = config.keepRecentCount || 3;
        const selectedEventIds = Array.isArray(context.input.selectedEventIds)
            ? (context.input.selectedEventIds as string[])
            : [];

        const store = useMemoryStore.getState();
        const eventsToMerge = selectedEventIds.length > 0
            ? await this.getSelectedEventsToMerge(selectedEventIds, store.getAllEvents)
            : await store.getEventsToMerge(keepRecentCount);

        if (eventsToMerge.length < 2) {
            if (context.trigger === 'manual') {
                if (selectedEventIds.length > 0) {
                    throw new Error('Selected events must include at least 2 unlocked, unarchived level-0 events.');
                }
                throw new Error('Not enough events to trim (requires at least 2).');
            }

            Logger.debug('FetchEventsToTrim', 'Skip trimming due to insufficient events.');
            context.data = context.data || {};
            context.data.skipTrimming = true;
        }

        context.input.eventsToMerge = eventsToMerge;
        context.data = context.data || {};
        context.data.sourceEventIds = eventsToMerge.map((e: EventNode) => e.id);

        Logger.debug('FetchEventsToTrim', `Prepared ${eventsToMerge.length} events for trimming`, {
            manualSelection: selectedEventIds.length > 0,
            selectedCount: selectedEventIds.length,
        });
    }

    private async getSelectedEventsToMerge(
        selectedEventIds: string[],
        getAllEvents: () => Promise<EventNode[]>
    ): Promise<EventNode[]> {
        const selectedSet = new Set(selectedEventIds);
        const allEvents = await getAllEvents();

        return allEvents
            .filter(e => selectedSet.has(e.id))
            .filter(e => e.level === 0 && !e.is_archived && !e.is_locked)
            .toSorted((a, b) => a.timestamp - b.timestamp);
    }
}

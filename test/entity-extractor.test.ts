import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/core/logger', () => ({
    Logger: {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        success: vi.fn(),
    },
    LogModule: {
        MEMORY_ENTITY: 'MEMORY_ENTITY',
    },
}));

vi.mock('@/core/events', () => ({
    EventBus: {
        emit: vi.fn(),
    },
}));

vi.mock('@/core/events/EventWatcher', () => ({
    eventWatcher: {
        start: vi.fn(),
        on: vi.fn(),
    },
}));

vi.mock('@/config/settings', () => ({
    SettingsManager: {
        get: vi.fn((key: string) => {
            if (key === 'apiSettings') {
                return {
                    entityExtractConfig: {
                        enabled: true,
                        trigger: 'floor',
                        floorInterval: 5,
                    }
                };
            }
            return undefined;
        }),
        incrementStatistic: vi.fn(),
    },
}));

vi.mock('@/data/ChatManager', () => ({
    chatManager: {
        getState: vi.fn(),
        updateState: vi.fn(),
    },
}));

vi.mock('@/integrations/tavern', () => ({
    MacroService: {
        getCurrentMessageCount: vi.fn(),
        getChatHistory: vi.fn(() => 'mock history'),
    },
}));

vi.mock('@/state/memoryStore', () => ({
    useMemoryStore: {
        getState: vi.fn(() => ({})),
    },
}));

vi.mock('@/ui/services/NotificationService', () => ({
    notificationService: {
        info: vi.fn(),
        success: vi.fn(),
        warning: vi.fn(),
        error: vi.fn(),
    },
}));

import { chatManager } from '../src/data/ChatManager';
import { MacroService } from '../src/integrations/tavern';
import { EntityBuilder } from '../src/modules/memory/EntityExtractor';


describe('EntityBuilder trigger/range guards', () => {
    let builder: EntityBuilder;

    beforeEach(() => {
        vi.clearAllMocks();
        builder = new EntityBuilder();
    });

    it('should return false on rollback in shouldTriggerOnFloor without side-effects', () => {
        const shouldTrigger = builder.shouldTriggerOnFloor(10, 20);

        expect(shouldTrigger).toBe(false);
        expect(chatManager.updateState).not.toHaveBeenCalled();
    });

    it('should clamp auto trigger range to avoid inverted range when lastSummarized > currentFloor', async () => {
        vi.mocked(MacroService.getCurrentMessageCount).mockReturnValue(10);
        vi.mocked(chatManager.getState).mockResolvedValue({
            last_extracted_floor: 0,
            last_summarized_floor: 30,
        } as any);

        const extractByRangeSpy = vi
            .spyOn(builder as any, 'extractByRange')
            .mockResolvedValue(null);

        await (builder as any).handleMessageReceived();

        expect(extractByRangeSpy).toHaveBeenCalledTimes(1);
        expect(extractByRangeSpy).toHaveBeenCalledWith([10, 10], false);
        expect(chatManager.updateState).not.toHaveBeenCalled();
    });

    it('should align last_extracted_floor and skip extraction when rollback is detected in auto trigger', async () => {
        vi.mocked(MacroService.getCurrentMessageCount).mockReturnValue(5);
        vi.mocked(chatManager.getState).mockResolvedValue({
            last_extracted_floor: 12,
            last_summarized_floor: 2,
        } as any);

        const extractByRangeSpy = vi
            .spyOn(builder as any, 'extractByRange')
            .mockResolvedValue(null);

        await (builder as any).handleMessageReceived();

        expect(chatManager.updateState).toHaveBeenCalledTimes(1);
        expect(chatManager.updateState).toHaveBeenCalledWith({ last_extracted_floor: 5 });
        expect(extractByRangeSpy).not.toHaveBeenCalled();
    });
});

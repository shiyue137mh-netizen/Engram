/**
 * 酒馆接口层 - 统一导出
 * 
 * 提供 SillyTavern 事件、消息、世界书等功能的封装
 */

export { EventBus, TavernEventType } from '../../tavern/TavernEvents';
export type { TavernEventTypeValue, EventCallback, Unsubscribe } from '../../tavern/TavernEvents';

export { MessageService } from './Message';
export type { TavernMessage, MessageRole, GetMessagesOptions } from './Message';

export { WorldInfoService } from './WorldInfo';
export type {
    WorldInfoEntry,
    WorldInfoPosition,
    WorldInfoStrategy,
    WorldInfoRole,
    WorldInfoTokenStats,
    CreateWorldInfoEntryParams,
} from './WorldInfo';

/**
 * 检查酒馆接口对接状态
 * 输出 JSON 格式的状态报告到 DevLog
 */
export async function checkTavernIntegration(): Promise<{
    eventBus: boolean;
    messageService: boolean;
    worldInfoService: boolean;
    nativeTokenCount: boolean;
    floorCount: number | null;
    characterName: string | null;
}> {
    const { EventBus } = await import('../../tavern/TavernEvents');
    const { MessageService } = await import('./Message');
    const { WorldInfoService } = await import('./WorldInfo');

    const status = {
        eventBus: EventBus.isAvailable(),
        messageService: MessageService.isAvailable(),
        worldInfoService: WorldInfoService.isAvailable(),
        nativeTokenCount: await WorldInfoService.isNativeTokenCountAvailable(),
        floorCount: MessageService.isAvailable() ? MessageService.getFloorCount() : null,
        characterName: MessageService.isAvailable() ? MessageService.getCurrentCharacterName() : null,
    };

    return status;
}

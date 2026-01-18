/**
 * 系统事件类型定义
 */

/**
 * 聊天变更事件
 */
export interface ChatChangedEvent {
    chatId: string;
    characterName: string;
    messageCount: number;
}

/**
 * 消息接收事件
 */
export interface MessageReceivedEvent {
    messageId: number;
    content: string;
    isUser: boolean;
    senderName: string;
}

/**
 * 摄入开始事件
 */
export interface IngestionStartEvent {
    brainId: string;
    messageRange: {
        start: number;
        end: number;
    };
}

/**
 * 摄入完成事件
 */
export interface IngestionCompleteEvent {
    brainId: string;
    eventsCreated: number;
    entitiesCreated: number;
    duration: number;
}

/**
 * 实体创建事件
 */
export interface EntityCreatedEvent {
    entityId: string;
    name: string;
    type: string;
}

/**
 * 检索开始事件
 */
export interface RetrievalStartEvent {
    query: string;
    brainId: string;
}

/**
 * 检索完成事件
 */
export interface RetrievalCompleteEvent {
    query: string;
    resultsCount: number;
    duration: number;
}

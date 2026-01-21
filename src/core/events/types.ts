/**
 * EventBus - 事件总线
 *
 * 基于 RxJS Subject 实现的发布/订阅模式
 * 用于模块间的松耦合通信
 */

import { Subject, Observable, filter } from 'rxjs';

// 事件类型定义
export type EngramEventType =
    | 'CHAT_CHANGED'
    | 'MESSAGE_RECEIVED'
    | 'INGESTION_START'
    | 'INGESTION_COMPLETE'
    | 'ENTITY_CREATED'
    | 'MEMORY_STORED'
    | 'RETRIEVAL_START'
    | 'RETRIEVAL_COMPLETE'
    | 'UI_NAVIGATE_REQUEST';  // V0.9.10: 通知系统触发 UI 跳转

export interface EngramEvent<T = unknown> {
    type: EngramEventType;
    payload: T;
    timestamp?: number;
}

// 全局事件流
const eventSubject = new Subject<EngramEvent>();

/**
 * 事件总线
 */
export const EventBus = {
    /**
     * 发布事件
     */
    emit<T>(event: EngramEvent<T>): void {
        eventSubject.next({
            ...event,
            timestamp: Date.now(),
        });
    },

    /**
     * 订阅所有事件
     */
    subscribe(callback: (event: EngramEvent) => void): { unsubscribe: () => void } {
        const subscription = eventSubject.subscribe(callback);
        return {
            unsubscribe: () => subscription.unsubscribe(),
        };
    },

    /**
     * 订阅特定类型的事件
     */
    on<T>(type: EngramEventType, callback: (payload: T) => void): { unsubscribe: () => void } {
        const subscription = eventSubject
            .pipe(filter((e) => e.type === type))
            .subscribe((e) => callback(e.payload as T));
        return {
            unsubscribe: () => subscription.unsubscribe(),
        };
    },

    /**
     * 获取事件流（用于 RxJS 操作符）
     */
    asObservable(): Observable<EngramEvent> {
        return eventSubject.asObservable();
    },
};

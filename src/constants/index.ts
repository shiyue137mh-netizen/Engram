// Engram 常量配置
export * from './navigation';

/** 插件名称 */
export const PLUGIN_NAME = 'Engram';

import manifest from '../../manifest.json';

/** 版本号 */
export const VERSION = manifest.version;

/** 存储相关 */
export const STORAGE = {
    DB_NAME: 'engram-db',
    DB_VERSION: 1,
} as const;

/** 事件类型 */
export const EVENTS = {
    MEMORY_CREATED: 'engram:memory:created',
    MEMORY_UPDATED: 'engram:memory:updated',
    MEMORY_DELETED: 'engram:memory:deleted',
    PANEL_TOGGLE: 'engram:panel:toggle',
} as const;

/** UI 相关 */
export const UI = {
    ANIMATION_DURATION: 200,
    MAX_VISIBLE_MEMORIES: 50,
    SIDEBAR_WIDTH: 48,
    HEADER_HEIGHT: 48,
} as const;

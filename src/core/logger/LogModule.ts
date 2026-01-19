/**
 * LogModule - 日志模块枚举
 *
 * V0.9.10: 统一模块命名，按业务域划分
 * 格式: `域/功能` 或 `域`
 */

export enum LogModule {
    // ===== 系统核心 =====
    SYSTEM = 'System',
    EVENTS = 'System/Events',

    // ===== 记忆管理 =====
    MEMORY_SUMMARY = 'Memory/Summary',
    MEMORY_ENTITY = 'Memory/Entity',
    MEMORY_TRIM = 'Memory/Trim',

    // ===== RAG 系统 =====
    RAG_EMBED = 'RAG/Embed',
    RAG_RETRIEVE = 'RAG/Retrieve',
    RAG_RERANK = 'RAG/Rerank',
    RAG_INJECT = 'RAG/Inject',
    RAG_CACHE = 'RAG/Cache',

    // ===== 预处理 =====
    PREPROCESS = 'Preprocess',

    // ===== 批处理 =====
    BATCH = 'Batch',

    // ===== 数据层 =====
    DATA_SYNC = 'Data/Sync',
    DATA_CLEANUP = 'Data/Cleanup',
    DATA_DB = 'Data/DB',

    // ===== 集成层 =====
    TAVERN = 'Tavern',
    LLM = 'LLM',
}

/**
 * 获取所有模块名（供 UI 过滤器使用）
 */
export const ALL_MODULES = Object.values(LogModule);

/**
 * 按域分组（供 UI 分组下拉菜单使用）
 */
export const MODULE_GROUPS: Record<string, LogModule[]> = {
    'System': [LogModule.SYSTEM, LogModule.EVENTS],
    'Memory': [LogModule.MEMORY_SUMMARY, LogModule.MEMORY_ENTITY, LogModule.MEMORY_TRIM],
    'RAG': [LogModule.RAG_EMBED, LogModule.RAG_RETRIEVE, LogModule.RAG_RERANK, LogModule.RAG_INJECT, LogModule.RAG_CACHE],
    'Preprocess': [LogModule.PREPROCESS],
    'Batch': [LogModule.BATCH],
    'Data': [LogModule.DATA_SYNC, LogModule.DATA_CLEANUP, LogModule.DATA_DB],
    'Integration': [LogModule.TAVERN, LogModule.LLM],
};

/**
 * 获取模块所属的域
 */
export function getModuleDomain(module: LogModule): string {
    const value = module as string;
    return value.includes('/') ? value.split('/')[0] : value;
}

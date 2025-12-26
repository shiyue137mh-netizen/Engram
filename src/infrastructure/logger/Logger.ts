/**
 * Logger - 日志核心服务
 *
 * 提供统一的日志记录、持久化存储和 EventBus 集成
 */

import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';
import { EventBus, EngramEvent } from '../bus/EventBus';
import { LogLevel, LogEntry, LoggerConfig, DEFAULT_LOGGER_CONFIG } from './types';

// 日志流 Subject
const logSubject = new Subject<LogEntry>();

// 内存中的日志缓存（用于快速访问）
let logCache: LogEntry[] = [];

// 配置
let config: LoggerConfig = { ...DEFAULT_LOGGER_CONFIG };

// 数据库引用（延迟初始化，避免循环依赖）
let dbInstance: typeof import('../storage/DexieDB').db | null = null;

/**
 * 获取数据库实例
 */
async function getDB() {
    if (!dbInstance) {
        const { db } = await import('../storage/DexieDB');
        dbInstance = db;
    }
    return dbInstance;
}

/**
 * 格式化时间为 HH:MM:SS
 */
function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toTimeString().slice(0, 8);
}

/**
 * 写入日志条目
 */
async function writeLog(level: LogLevel, module: string, message: string, data?: unknown): Promise<void> {
    if (level < config.minLevel) return;

    const entry: LogEntry = {
        id: uuidv4(),
        timestamp: Date.now(),
        level,
        module,
        message,
        data,
    };

    // 添加到缓存
    logCache.push(entry);

    // 发送到订阅者
    logSubject.next(entry);

    // 持久化到数据库
    try {
        const db = await getDB();
        await db.logs.add(entry);

        // 检查是否需要清理旧日志
        const count = await db.logs.count();
        if (count > config.maxEntries) {
            await pruneOldLogs(count - config.maxEntries);
        }
    } catch (err) {
        console.error('[Engram/Logger] 日志持久化失败:', err);
    }
}

/**
 * 清理旧日志
 */
async function pruneOldLogs(deleteCount: number): Promise<void> {
    try {
        const db = await getDB();
        const oldLogs = await db.logs.orderBy('timestamp').limit(deleteCount).toArray();
        const idsToDelete = oldLogs.map((log) => log.id);
        await db.logs.bulkDelete(idsToDelete);

        // 同步清理缓存
        logCache = logCache.slice(-config.maxEntries);
    } catch (err) {
        console.error('[Engram/Logger] 清理旧日志失败:', err);
    }
}

/**
 * 设置 EventBus 监听
 */
function setupEventBusListener(): void {
    EventBus.subscribe((event: EngramEvent) => {
        // 将 EventBus 事件转换为日志
        const levelMap: Record<string, LogLevel> = {
            INGESTION_START: LogLevel.INFO,
            INGESTION_COMPLETE: LogLevel.SUCCESS,
            ENTITY_CREATED: LogLevel.INFO,
            MEMORY_STORED: LogLevel.SUCCESS,
            RETRIEVAL_START: LogLevel.DEBUG,
            RETRIEVAL_COMPLETE: LogLevel.SUCCESS,
            CHAT_CHANGED: LogLevel.INFO,
            MESSAGE_RECEIVED: LogLevel.DEBUG,
        };

        const level = levelMap[event.type] ?? LogLevel.DEBUG;
        writeLog(level, 'EventBus', `${event.type}`, event.payload);
    });
}

/**
 * Logger 公共 API
 */
export const Logger = {
    /**
     * 初始化 Logger
     */
    async init(userConfig?: Partial<LoggerConfig>): Promise<void> {
        if (userConfig) {
            config = { ...config, ...userConfig };
        }

        // 从数据库加载历史日志到缓存
        try {
            const db = await getDB();
            logCache = await db.logs.orderBy('timestamp').reverse().limit(config.maxEntries).toArray();
            logCache.reverse(); // 恢复时间顺序
        } catch (err) {
            console.error('[Engram/Logger] 加载历史日志失败:', err);
            logCache = [];
        }

        // 设置 EventBus 监听
        setupEventBusListener();

        Logger.info('Logger', 'Logger 初始化完成', { maxEntries: config.maxEntries });
    },

    /**
     * DEBUG 级别日志
     */
    debug(module: string, message: string, data?: unknown): void {
        writeLog(LogLevel.DEBUG, module, message, data);
    },

    /**
     * INFO 级别日志
     */
    info(module: string, message: string, data?: unknown): void {
        writeLog(LogLevel.INFO, module, message, data);
    },

    /**
     * SUCCESS 级别日志
     */
    success(module: string, message: string, data?: unknown): void {
        writeLog(LogLevel.SUCCESS, module, message, data);
    },

    /**
     * WARN 级别日志
     */
    warn(module: string, message: string, data?: unknown): void {
        writeLog(LogLevel.WARN, module, message, data);
    },

    /**
     * ERROR 级别日志
     */
    error(module: string, message: string, data?: unknown): void {
        writeLog(LogLevel.ERROR, module, message, data);
    },

    /**
     * 获取所有缓存日志
     */
    getLogs(): LogEntry[] {
        return [...logCache];
    },

    /**
     * 订阅新日志
     */
    subscribe(callback: (entry: LogEntry) => void): () => void {
        const subscription = logSubject.subscribe(callback);
        return () => subscription.unsubscribe();
    },

    /**
     * 清空所有日志
     */
    async clear(): Promise<void> {
        try {
            const db = await getDB();
            await db.logs.clear();
            logCache = [];
            Logger.info('Logger', '日志已清空');
        } catch (err) {
            console.error('[Engram/Logger] 清空日志失败:', err);
        }
    },

    /**
     * 导出日志为 Markdown 格式
     */
    exportToMarkdown(): string {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');

        const levelLabels: Record<LogLevel, string> = {
            [LogLevel.DEBUG]: 'DEBUG',
            [LogLevel.INFO]: 'INFO',
            [LogLevel.SUCCESS]: 'SUCCESS',
            [LogLevel.WARN]: 'WARN',
            [LogLevel.ERROR]: 'ERROR',
        };

        let md = `# Engram Debug Log\n\n`;
        md += `- **导出时间**: ${now.toLocaleString('zh-CN')}\n`;
        md += `- **版本**: 0.1.0\n`;
        md += `- **日志条数**: ${logCache.length}\n\n`;
        md += `---\n\n`;
        md += `## 日志记录\n\n`;
        md += '```\n';

        for (const entry of logCache) {
            const time = formatTime(entry.timestamp);
            const level = levelLabels[entry.level].padEnd(7);
            const module = entry.module.padEnd(16);
            md += `[${time}] [${module}] ${level} ${entry.message}\n`;

            if (entry.data !== undefined) {
                const dataStr = JSON.stringify(entry.data, null, 2)
                    .split('\n')
                    .map((line) => `    ${line}`)
                    .join('\n');
                md += `${dataStr}\n`;
            }
        }

        md += '```\n';

        return md;
    },

    /**
     * 获取导出文件名
     */
    getExportFilename(): string {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
        return `engram_log_${dateStr}_${timeStr}.md`;
    },
};

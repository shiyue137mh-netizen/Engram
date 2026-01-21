/**
 * Logger - 日志核心服务
 *
 * 提供统一的日志记录、持久化存储和 EventBus 集成
 */

import manifest from '../../../manifest.json';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';
import { EventBus, EngramEvent } from '../events';
import { LogLevel, LogEntry, LoggerConfig, DEFAULT_LOGGER_CONFIG } from './types';
import type { LogModule } from './LogModule';

// 日志流 Subject
const logSubject = new Subject<LogEntry>();

// 内存中的日志缓存（用于快速访问）
// 注意：模块级变量在 HMR 时可能被保留，但完整页面刷新会重置
let logCache: LogEntry[] = [];

// 配置
let config: LoggerConfig = { ...DEFAULT_LOGGER_CONFIG };

// 标记是否已初始化（防止重复订阅 EventBus）
let isInitialized = false;

/**
 * 格式化时间为 HH:MM:SS
 */
function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toTimeString().slice(0, 8);
}

/**
 * 写入日志条目（仅内存，不持久化）
 */
function writeLog(level: LogLevel, module: string, message: string, data?: unknown): void {
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

    // 限制最大条数
    if (logCache.length > config.maxEntries) {
        logCache = logCache.slice(-config.maxEntries);
    }

    // 发送到订阅者
    logSubject.next(entry);
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
 *
 * V0.9.10: 支持 LogModule 枚举和 string 两种模块类型（向后兼容）
 */
export const Logger = {
    /**
     * 初始化 Logger（纯内存模式）
     * 注意：每次调用都会清空日志缓存
     */
    init(userConfig?: Partial<LoggerConfig>): void {
        // 始终清空缓存（支持硬刷新时重置）
        logCache = [];

        if (userConfig) {
            config = { ...config, ...userConfig };
        }

        // 防止重复订阅 EventBus
        if (!isInitialized) {
            setupEventBusListener();
            isInitialized = true;
        }

        Logger.info('System', 'Logger 初始化完成');
    },

    /**
     * DEBUG 级别日志
     * @param module 模块名（推荐使用 LogModule 枚举）
     */
    debug(module: LogModule | string, message: string, data?: unknown): void {
        writeLog(LogLevel.DEBUG, module as string, message, data);
    },

    /**
     * INFO 级别日志
     * @param module 模块名（推荐使用 LogModule 枚举）
     */
    info(module: LogModule | string, message: string, data?: unknown): void {
        writeLog(LogLevel.INFO, module as string, message, data);
    },

    /**
     * SUCCESS 级别日志
     * @param module 模块名（推荐使用 LogModule 枚举）
     */
    success(module: LogModule | string, message: string, data?: unknown): void {
        writeLog(LogLevel.SUCCESS, module as string, message, data);
    },

    /**
     * WARN 级别日志
     * @param module 模块名（推荐使用 LogModule 枚举）
     */
    warn(module: LogModule | string, message: string, data?: unknown): void {
        writeLog(LogLevel.WARN, module as string, message, data);
    },

    /**
     * ERROR 级别日志
     * @param module 模块名（推荐使用 LogModule 枚举）
     */
    error(module: LogModule | string, message: string, data?: unknown): void {
        writeLog(LogLevel.ERROR, module as string, message, data);
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
     * 清空所有日志（仅内存）
     */
    clear(): void {
        logCache = [];
        Logger.info('Logger', '日志已清空');
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
        md += `- **版本**: ${manifest.version}\n`;
        md += `- **日志条数**: ${logCache.length}\n\n`;
        md += `---\n\n`;
        md += `## 日志记录\n\n`;
        md += '```m\n';

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

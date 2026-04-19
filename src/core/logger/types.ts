/**
 * Logger 类型定义
 */

/**
 * 日志级别枚举
 */
export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    SUCCESS = 2,
    WARN = 3,
    ERROR = 4,
}

/**
 * 日志级别显示配置
 */
export const LogLevelConfig: Record<LogLevel, { label: string; icon: string; color: string }> = {
    [LogLevel.DEBUG]: { color: '#6c757d', icon: '●', label: 'DEBUG' },
    [LogLevel.INFO]: { color: '#17a2b8', icon: '●', label: 'INFO' },
    [LogLevel.SUCCESS]: { color: '#28a745', icon: '●', label: 'OK' },
    [LogLevel.WARN]: { color: '#ffc107', icon: '▲', label: 'WARN' },
    [LogLevel.ERROR]: { color: '#dc3545', icon: '✕', label: 'ERROR' },
};

/**
 * 日志条目接口
 */
export interface LogEntry {
    id: string;
    timestamp: number;
    level: LogLevel;
    module: string; // 如 'CORE/Pipeline', 'UI/GraphView'
    message: string;
    data?: unknown; // 可选的附加数据（展开查看）
}

/**
 * 日志配置接口
 */
export interface LoggerConfig {
    maxEntries: number; // 最大存储条数
    minLevel: LogLevel; // 最低显示级别
}

/**
 * 默认配置
 */
export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
    maxEntries: 5000,
    minLevel: LogLevel.DEBUG,
};

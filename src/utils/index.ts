// 通用工具函数

/**
 * 格式化时间戳
 */
export function formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleString('zh-CN');
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

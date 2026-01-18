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
 * 生成唯一 ID (简单版)
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * 生成 UUID v4
 * 优先使用 crypto.randomUUID，不可用时回退到手动生成
 */
export function generateUUID(): string {
    // 优先使用原生 API
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    // 回退方案：手动生成 UUID v4 格式
    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


/**
 * RecallLogService - 召回日志服务
 *
 * 集中管理召回日志，供 DevLog 组件使用
 */

import type { RecallLogEntry, RecallResultItem, RecallStats } from '@/views/DevLog/types';
import { Logger } from '@/lib/logger';

type RecallLogSubscriber = (logs: RecallLogEntry[]) => void;

class RecallLogServiceClass {
    private logs: RecallLogEntry[] = [];
    private maxLogs = 50;
    private subscribers: Set<RecallLogSubscriber> = new Set();

    /**
     * 记录一次召回
     */
    log(entry: Omit<RecallLogEntry, 'id' | 'timestamp'>): void {
        const newEntry: RecallLogEntry = {
            id: `recall-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: Date.now(),
            ...entry,
        };

        this.logs.unshift(newEntry);

        // 限制日志数量
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(0, this.maxLogs);
        }

        Logger.debug('RecallLogService', '记录召回日志', {
            query: entry.query.substring(0, 50),
            resultCount: entry.results.length,
        });

        this.notifySubscribers();
    }

    /**
     * 获取所有日志
     */
    getLogs(): RecallLogEntry[] {
        return [...this.logs];
    }

    /**
     * 清空日志
     */
    clear(): void {
        this.logs = [];
        this.notifySubscribers();
    }

    /**
     * 订阅日志变更
     */
    subscribe(callback: RecallLogSubscriber): () => void {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    /**
     * 通知订阅者
     */
    private notifySubscribers(): void {
        const logs = this.getLogs();
        this.subscribers.forEach(cb => cb(logs));
    }

    /**
     * 导出日志为 JSON 文件
     */
    exportLogs(): void {
        const { VERSION } = require('@/constants');
        const exportData = {
            version: VERSION,
            exportedAt: Date.now(),
            logs: this.getLogs(),
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `engram_debug_log_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export const RecallLogService = new RecallLogServiceClass();
export default RecallLogService;

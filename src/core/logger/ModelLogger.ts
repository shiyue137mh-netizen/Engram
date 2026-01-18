/**
 * ModelLogger - 模型调用日志
 *
 * 记录所有 LLM 调用的发送和接收信息
 * 仅内存存储，不导出，不持久化
 */

/** 模型日志条目 */
export interface ModelLogEntry {
    /** 唯一 ID */
    id: string;
    /** 时间戳 */
    timestamp: number;
    /** 调用类型 */
    type: 'summarize' | 'trim' | 'vectorize' | 'query' | 'entity_extraction' | 'other';
    /** 方向：发送/接收 */
    direction: 'sent' | 'received';

    // 发送信息
    /** 系统提示词 */
    systemPrompt?: string;
    /** 用户提示词 */
    userPrompt?: string;
    /** 发送的 token 数（估算） */
    tokensSent?: number;

    // 接收信息
    /** 响应内容 */
    response?: string;
    /** 接收的 token 数（估算） */
    tokensReceived?: number;

    // 状态
    /** 状态 */
    status: 'pending' | 'success' | 'error';
    /** 错误信息 */
    error?: string;
    /** 耗时 (ms) */
    duration?: number;

    // 元数据
    /** 模型名称 */
    model?: string;
    /** 角色名称 */
    character?: string;
    /** 楼层范围（如适用） */
    floorRange?: [number, number];
}

/** 最大日志条目数 */
const MAX_ENTRIES = 100;

/**
 * ModelLogger 类
 * 管理模型调用日志
 */
class ModelLoggerClass {
    private entries: ModelLogEntry[] = [];
    private listeners: Set<() => void> = new Set();

    /**
     * 创建新的日志条目（发送阶段）
     */
    logSend(data: {
        type: ModelLogEntry['type'];
        systemPrompt?: string;
        userPrompt?: string;
        tokensSent?: number;
        model?: string;
        character?: string;
        floorRange?: [number, number];
    }): string {
        const id = `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        const entry: ModelLogEntry = {
            id,
            timestamp: Date.now(),
            type: data.type,
            direction: 'sent',
            systemPrompt: data.systemPrompt,
            userPrompt: data.userPrompt,
            tokensSent: data.tokensSent,
            model: data.model,
            character: data.character,
            floorRange: data.floorRange,
            status: 'pending',
        };

        this.entries.unshift(entry);
        this.trimEntries();
        this.notifyListeners();

        return id;
    }

    /**
     * 更新日志条目（接收阶段）
     */
    logReceive(id: string, data: {
        response?: string;
        tokensReceived?: number;
        status: 'success' | 'error';
        error?: string;
        duration?: number;
    }): void {
        const entry = this.entries.find(e => e.id === id);
        if (!entry) return;

        // 添加接收条目
        const receiveEntry: ModelLogEntry = {
            id: `${id}_recv`,
            timestamp: Date.now(),
            type: entry.type,
            direction: 'received',
            response: data.response,
            tokensReceived: data.tokensReceived,
            status: data.status,
            error: data.error,
            duration: data.duration,
            model: entry.model,
            character: entry.character,
            floorRange: entry.floorRange,
        };

        // 更新原条目状态
        entry.status = data.status;
        entry.duration = data.duration;

        // 在发送条目后插入接收条目
        const index = this.entries.findIndex(e => e.id === id);
        if (index >= 0) {
            this.entries.splice(index, 0, receiveEntry);
        } else {
            this.entries.unshift(receiveEntry);
        }

        this.trimEntries();
        this.notifyListeners();
    }

    /**
     * 快捷方法：记录完整的调用过程
     */
    async logCall<T>(
        data: {
            type: ModelLogEntry['type'];
            systemPrompt?: string;
            userPrompt?: string;
            tokensSent?: number;
            model?: string;
            character?: string;
            floorRange?: [number, number];
        },
        action: () => Promise<T>
    ): Promise<T> {
        const id = this.logSend(data);
        const startTime = Date.now();

        try {
            const result = await action();
            this.logReceive(id, {
                response: typeof result === 'string' ? result : JSON.stringify(result),
                status: 'success',
                duration: Date.now() - startTime,
            });
            return result;
        } catch (e) {
            this.logReceive(id, {
                status: 'error',
                error: e instanceof Error ? e.message : String(e),
                duration: Date.now() - startTime,
            });
            throw e;
        }
    }

    /**
     * 获取所有日志
     */
    getAll(): ModelLogEntry[] {
        return [...this.entries];
    }

    /**
     * 获取配对的日志（发送+接收）
     */
    getPaired(): { sent: ModelLogEntry; received?: ModelLogEntry }[] {
        const result: { sent: ModelLogEntry; received?: ModelLogEntry }[] = [];
        const sentEntries = this.entries.filter(e => e.direction === 'sent');

        for (const sent of sentEntries) {
            const received = this.entries.find(
                e => e.id === `${sent.id}_recv` && e.direction === 'received'
            );
            result.push({ sent, received });
        }

        return result;
    }

    /**
     * 清除所有日志
     */
    clear(): void {
        this.entries = [];
        this.notifyListeners();
    }

    /**
     * 订阅日志变化
     */
    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /**
     * 获取日志数量
     */
    getCount(): number {
        return this.entries.filter(e => e.direction === 'sent').length;
    }

    /**
     * 裁剪条目
     */
    private trimEntries(): void {
        if (this.entries.length > MAX_ENTRIES * 2) {
            this.entries = this.entries.slice(0, MAX_ENTRIES * 2);
        }
    }

    /**
     * 通知监听器
     */
    private notifyListeners(): void {
        for (const listener of this.listeners) {
            listener();
        }
    }
}

/** 单例实例 */
export const ModelLogger = new ModelLoggerClass();

export default ModelLogger;

/**
 * SummarizerService - 剧情总结核心服务
 */

import { EventBus, TavernEventType } from "@/integrations/tavern/api";
import { eventWatcher } from '@/core/events/EventWatcher';
import { useMemoryStore } from '@/state/memoryStore'; // Used for setLastSummarizedFloor
import { notificationService } from '@/ui/services/NotificationService';
import { SettingsManager } from "@/config/settings";
import type {
    SummarizerConfig,
    SummarizerStatus,
    SummaryResult,
} from './types';
import { DEFAULT_SUMMARIZER_CONFIG } from './types';

/** 元数据 key */
const METADATA_KEY = 'engram';



/**
 * 获取 chat_metadata
 */
function getChatMetadata(): Record<string, unknown> | null {
    try {
        // 优先从 context 获取
        const context = window.SillyTavern?.getContext?.();
        if (context?.chat_metadata) {
            return context.chat_metadata;
        }
        // 备用：直接访问全局变量
        // @ts-expect-error - SillyTavern 全局变量
        return window.chat_metadata || null;
    } catch {
        return null;
    }
}

/**
 * 保存聊天（防抖）
 */
function saveChatDebounced(): void {
    try {
        // @ts-expect-error - SillyTavern 全局函数
        window.saveChatDebounced?.();
    } catch {
        console.warn('[Engram] saveChatDebounced 不可用');
    }
}

/**
 * SummarizerService 类
 * 核心总结服务
 */
export class SummarizerService {
    private config: SummarizerConfig;

    private currentChatId: string | null = null;
    private isRunning = false;
    private isSummarizing = false;
    private cancelRequested = false; // 用户请求取消总结
    private unsubscribeMessage: (() => void) | null = null;
    private unsubscribeChat: (() => void) | null = null;
    private summaryHistory: SummaryResult[] = [];

    // 缓存最后总结的楼层，用于同步读取
    private _lastSummarizedFloor: number = 0;

    constructor(
        config?: Partial<SummarizerConfig>
    ) {
        // 优先使用传入配置，其次加载持久化配置，最后使用默认配置
        const savedConfig = SettingsManager.get('summarizerConfig') as Partial<SummarizerConfig>;
        this.config = { ...DEFAULT_SUMMARIZER_CONFIG, ...savedConfig, ...config };
    }

    // ==================== 元数据操作 ====================
    // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
    // 但主要逻辑已迁移至 WorldBookStateService。

    /**
     * 从当前聊天元数据获取值
     */
    private getFromChatMetadata(key: string): unknown {
        const metadata = getChatMetadata();
        if (!metadata) {
            return undefined;
        }
        if (!metadata.extensions) metadata.extensions = {};
        // @ts-expect-error - 动态访问
        if (!metadata.extensions[METADATA_KEY]) metadata.extensions[METADATA_KEY] = {};
        // @ts-expect-error - 动态访问
        return metadata.extensions[METADATA_KEY][key];
    }

    /**
     * 保存值到当前聊天元数据
     */
    private saveToChatMetadata(key: string, value: unknown): void {
        const metadata = getChatMetadata();
        if (!metadata) return;

        if (!metadata.extensions) metadata.extensions = {};
        // @ts-expect-error - 动态访问
        if (!metadata.extensions[METADATA_KEY]) metadata.extensions[METADATA_KEY] = {};

        // @ts-expect-error - 动态访问
        metadata.extensions[METADATA_KEY][key] = value;

        this.log('debug', `已保存到 chat_metadata: ${key} = ${value}`);
        saveChatDebounced();
    }

    /**
     * 获取上次总结的楼层
     * V0.5: 优先从 memoryStore 读取
     * V0.8: 修复时序问题，直接从 chatManager.getState() 读取确保获取最新值
     */
    private async getLastSummarizedFloor(): Promise<number> {
        // 如果缓存有值且不是刚被清零，直接返回
        if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;

        // 直接从 IndexedDB 读取，避免 memoryStore 缓存未初始化的问题
        try {
            const { chatManager } = await import('@/data/ChatManager');
            const state = await chatManager.getState();
            this._lastSummarizedFloor = state.last_summarized_floor;
            this.log('debug', '从 DB 读取 lastSummarizedFloor', { value: this._lastSummarizedFloor });
            return this._lastSummarizedFloor;
        } catch (e) {
            this.log('warn', '读取 lastSummarizedFloor 失败，使用默认值 0', e);
            return 0;
        }
    }

    /**
     * 设置上次总结的楼层
     * V0.5: 保存到 memoryStore (IndexedDB)
     */
    public async setLastSummarizedFloor(floor: number): Promise<void> {
        this._lastSummarizedFloor = floor;

        // 保存到 memoryStore
        const store = useMemoryStore.getState();
        await store.setLastSummarizedFloor(floor);
    }


    // ==================== 楼层计算 ====================

    /**
     * 获取当前真实楼层数
     */
    private getCurrentFloor(): number {
        // @ts-ignore
        const context = window.SillyTavern?.getContext?.();
        if (!context?.chat) {
            return 0;
        }
        // 楼层从0开始计数，所以 length - 1 是最后一楼的索引
        return context.chat.length;
    }

    /**
     * 获取当前聊天 ID
     */
    private getCurrentChatId(): string | null {
        // @ts-ignore
        const context = window.SillyTavern?.getContext?.();
        return context?.chatId || null;
    }

    // ==================== 生命周期 ====================

    /**
     * 启动服务，开始监听事件
     * V0.5: 使用 EventWatcher 统一监听
     */
    start(): void {
        if (this.isRunning) {
            this.log('warn', '服务已在运行');
            return;
        }

        // 初始化当前聊天状态
        this.initializeForCurrentChat();

        // 启动 EventWatcher (如果尚未启动)
        eventWatcher.start();

        // 注册回调
        if (this.config.triggerMode === 'auto') {
            this.unsubscribeMessage = eventWatcher.on(
                'onMessageReceived',
                this.handleMessageReceived.bind(this)
            );
            this.log('debug', '已通过 EventWatcher 订阅消息事件');
        }

        this.unsubscribeChat = eventWatcher.on(
            'onChatChanged',
            this.handleChatChanged.bind(this)
        );
        this.log('debug', '已通过 EventWatcher 订阅聊天切换事件');

        this.isRunning = true;

        const status = this.getStatus();
        this.log('info', '服务已启动', status);
    }

    /**
     * 重置进度 (设置为 0)
     */
    public async resetProgress(): Promise<void> {
        await this.setLastSummarizedFloor(0);
        this.log('info', '进度已重置');
    }

    /**
     * 停止服务
     */
    stop(): void {
        if (this.unsubscribeMessage) {
            this.unsubscribeMessage();
            this.unsubscribeMessage = null;
        }
        if (this.unsubscribeChat) {
            this.unsubscribeChat();
            this.unsubscribeChat = null;
        }
        this.isRunning = false;
        this.log('info', '服务已停止');
    }

    /**
     * 为当前聊天初始化状态
     */
    public async initializeForCurrentChat(): Promise<void> {
        const chatId = this.getCurrentChatId();
        const currentFloor = this.getCurrentFloor();

        // 重置/加载缓存
        this.currentChatId = chatId;
        this.summaryHistory = [];
        this._lastSummarizedFloor = 0; // 先清空，迫使 reload

        const lastSummarized = await this.getLastSummarizedFloor(); // 这会更新 _lastSummarizedFloor

        this.log('info', '初始化当前聊天状态', {
            chatId,
            currentFloor,
            lastSummarizedFloor: lastSummarized,
            pendingFloors: currentFloor - lastSummarized,
        });

        // 如果从未总结过（lastSummarized=0），不要自动跳过，保持为 0，等待用户触发
        // if (lastSummarized === 0 && currentFloor > 0) {
        //     this.log('info', '首次初始化，设置基准为当前楼层', { currentFloor });
        //     await this.setLastSummarizedFloor(currentFloor);
        // }    }
    }

    // ==================== 事件处理 ====================

    /**
     * 处理消息接收事件
     * V0.9.1: 同时检查实体提取和 Summary 的触发条件
     */
    private async handleMessageReceived(): Promise<void> {
        const currentFloor = this.getCurrentFloor();
        const lastSummarized = await this.getLastSummarizedFloor();
        const pendingFloors = currentFloor - lastSummarized;

        this.log('debug', '收到新消息', {
            currentFloor,
            lastSummarized,
            pendingFloors,
            triggerAt: this.config.floorInterval,
        });

        // V0.9.1: 检查实体提取触发
        await this.checkEntityExtraction(currentFloor);

        // 检查是否达到 Summary 触发条件
        if (pendingFloors >= this.config.floorInterval) {
            this.log('info', '达到触发条件，准备总结', {
                pendingFloors,
                interval: this.config.floorInterval,
            });
            await this.triggerSummary();
        }
    }

    /**
     * V0.9.1: 检查并触发实体提取
     * 实体提取与 Summary 并行，各自有独立的楼层间隔
     */
    private async checkEntityExtraction(currentFloor: number): Promise<void> {
        try {
            const { entityBuilder } = await import('@/modules/memory/EntityExtractor');
            // 动态导入 ChatManager 以避免循环依赖
            const { chatManager } = await import('@/data/ChatManager');

            if (entityBuilder.shouldTriggerOnFloor(currentFloor)) {
                this.log('info', '触发实体提取', { floor: currentFloor });

                // 计算范围：上次提取楼层+1 到 当前楼层
                const state = await chatManager.getState();
                const lastExtracted = state.last_extracted_floor || 0;
                const startFloor = lastExtracted + 1;
                const range: [number, number] = [startFloor, currentFloor];

                this.log('debug', '实体提取范围', { range });

                // 异步执行，不阻塞 Summary
                entityBuilder.extractByRange(range, false).catch(e => {
                    this.log('warn', '实体提取失败', { error: e });
                });
            }
        } catch (e) {
            this.log('warn', '实体提取检查失败', { error: e });
        }
    }

    /**
     * 处理聊天切换事件
     */
    private handleChatChanged(): void {
        const newChatId = this.getCurrentChatId();

        this.log('info', '聊天已切换', {
            from: this.currentChatId,
            to: newChatId,
        });

        // 重新初始化
        this.initializeForCurrentChat();
    }

    // ==================== 总结逻辑 ====================

    /**
     * 手动/自动触发总结
     */
    async triggerSummary(manual = false): Promise<SummaryResult | null> {
        if (this.isSummarizing) {
            this.log('warn', '正在执行总结，跳过本次触发');
            return null;
        }

        if (!this.config.enabled && !manual) {
            this.log('debug', '自动总结已禁用');
            return null;
        }

        const currentFloor = this.getCurrentFloor();
        const lastSummarized = await this.getLastSummarizedFloor();

        this.isSummarizing = true;
        this.cancelRequested = false; // 重置取消标志

        // 显示运行中通知
        const runningToast = notificationService.running('总结运行中...', 'Engram', () => {
            this.cancelRequested = true;
            this.log('info', '用户请求取消总结');
            // TODO: Propagate cancel signal to Workflow
            notificationService.warning('正在取消总结...', 'Engram');
        });

        try {
            // 1. Calculate Range
            const startFloor = this._lastSummarizedFloor + 1;
            const buffer = this.config.bufferSize || 0;
            const maxProcessableFloor = currentFloor - buffer;

            if (startFloor > maxProcessableFloor) {
                if (manual) {
                    notificationService.info('暂无足够的新内容需要总结 (缓冲期内)', 'Engram');
                }
                return null;
            }

            const interval = this.config.floorInterval || 10;
            const proposedEndFloor = startFloor + interval - 1;
            const endFloor = Math.min(maxProcessableFloor, proposedEndFloor);

            if (startFloor > endFloor) return null;

            const range: [number, number] = [startFloor, endFloor];
            this.log('info', '准备总结', { range });

            // 2. Run Workflow
            const { WorkflowEngine } = await import('@/modules/workflow/core/WorkflowEngine');
            const { createSummaryWorkflow } = await import('@/modules/workflow/definitions/SummaryWorkflow');
            const { WorldBookSlotService } = await import('@/integrations/tavern/worldbook');
            await WorldBookSlotService.init();

            const context = await WorkflowEngine.run(createSummaryWorkflow(), {
                trigger: manual ? 'manual' : 'auto',
                config: {
                    previewEnabled: this.config.previewEnabled,
                    autoHide: this.config.autoHide,
                    templateId: this.config.promptTemplateId,
                    logType: 'summarize'
                },
                input: {
                    range: range
                }
            });

            // 3. Construct Result (Backward Compatibility)
            const savedEvents = context.output; // From SaveEvent (Array of EventNodes)

            // If SaveEvent returns array of events, we construct a SummaryResult-like object
            // or just return the list. Original method returned SummaryResult (single object).
            // But now we have multiple events potentially.
            // Let's verify `SummaryResult` type in `types.d.ts` or similar.
            // It seems SummaryResult expects `content` string.

            // If we have parsed multiple events, the "content" might be the raw cleaned content
            const result: SummaryResult = {
                id: Date.now().toString(),
                content: context.cleanedContent || '', // The raw text
                sourceFloors: range,
                timestamp: Date.now(),
                tokenCount: 0, // TODO: Get from context or re-measure
                writtenToWorldbook: true
            };

            // Update local state (redundant if SaveEvent updated store, but safe)
            this._lastSummarizedFloor = endFloor;
            this.summaryHistory.push(result);

            return result;

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);

            if (errorMsg === 'UserCancelled') {
                this.log('info', '总结已被用户取消');
                return null;
            }

            this.log('error', '总结执行异常', { error: errorMsg });
            notificationService.error(`总结异常: ${errorMsg}`, 'Engram 错误');
            return null;
        } finally {
            notificationService.remove(runningToast);
            this.isSummarizing = false;
        }
    }

    // ==================== 状态查询 ====================

    /**
     * 获取当前状态
     */
    getStatus(): SummarizerStatus {
        const currentFloor = this.getCurrentFloor();
        // 使用同步缓存值
        const lastSummarized = this._lastSummarizedFloor;

        return {
            running: this.isRunning,
            currentFloor,
            lastSummarizedFloor: lastSummarized,
            pendingFloors: Math.max(0, currentFloor - lastSummarized),
            historyCount: this.summaryHistory.length,
            isSummarizing: this.isSummarizing,
        };
    }

    /**
     * 刷新状态（强制重新读取）
     */
    refreshStatus(): SummarizerStatus {
        // 触发异步刷新，但返回当前缓存
        this.initializeForCurrentChat();
        return this.getStatus();
    }

    /**
     * 获取配置
     */
    getConfig(): SummarizerConfig {
        return { ...this.config };
    }

    /**
     * 更新配置
     */
    updateConfig(config: Partial<SummarizerConfig>): void {
        this.config = { ...this.config, ...config };
        // 持久化保存
        SettingsManager.set('summarizerConfig', this.config);
        this.log('debug', '配置已更新并保存', this.config);
    }

    /**
     * 获取总结历史
     */
    getHistory(): SummaryResult[] {
        return [...this.summaryHistory];
    }

    /**
     * 重置基准楼层为当前楼层
     */
    async resetBaseFloor(): Promise<void> {
        const currentFloor = this.getCurrentFloor();
        await this.setLastSummarizedFloor(currentFloor);
        this.log('info', '已重置基准楼层', { currentFloor });
    }

    // ==================== 工具方法 ====================

    /**
     * 记录日志
     */
    private async log(
        level: 'debug' | 'info' | 'success' | 'warn' | 'error',
        message: string,
        data?: unknown
    ): Promise<void> {
        try {
            const { Logger } = await import('@/core/logger');
            Logger[level]('Summarizer', message, data);
        } catch {
            console.log(`[Summarizer] ${level}: ${message}`, data);
        }
    }
}

/** 默认实例 */
export const summarizerService = new SummarizerService();

export default SummarizerService;

/**
 * EntityBuilder - 实体构建服务
 *
 * V0.9.1: 与 SummarizerService 并行，从原始 chatHistory 提取
 * - 楼层触发器 (floorInterval)
 * - 输入从原始对话提取，而非 Summary
 */

import { SettingsManager } from '@/config/settings';
import { DEFAULT_ENTITY_CONFIG } from '@/config/types/defaults';
import type { EntityExtractConfig } from '@/config/types/memory';
import { EventBus } from '@/core/events';
import { eventWatcher } from '@/core/events/EventWatcher';
import { Logger, LogModule } from '@/core/logger';
import { chatManager } from '@/data/ChatManager';
import type { EntityNode } from '@/data/types/graph';
import { MacroService } from '@/integrations/tavern';
import { useMemoryStore } from '@/state/memoryStore';
import { notificationService } from '@/ui/services/NotificationService';

/**
 * 实体构建结果
 */
export interface EntityBuildResult {
    success: boolean;
    newEntities: EntityNode[];
    updatedEntities: EntityNode[];
    error?: string;
}

/**
 * EntityBuilder 类
 * V0.9.1: 与 SummarizerService 并行触发
 */
export class EntityBuilder {
    private config: EntityExtractConfig;
    private isExtracting = false;
    // V0.9.11: UI State Persistence (fix for component unmount issues)
    public pendingReviewResult: EntityBuildResult | null = null;

    constructor(config?: Partial<EntityExtractConfig>) {
        // V0.9.10: Fix - 优先从 SettingsManager 加载持久化配置
        const savedConfig = SettingsManager.get('apiSettings')?.entityExtractConfig;
        this.config = { ...DEFAULT_ENTITY_CONFIG, ...savedConfig, ...config };
    }

    /** Clear pending review state */
    clearPendingReview() {
        this.pendingReviewResult = null;
    }

    /**
     * 更新配置
     */
    updateConfig(config: Partial<EntityExtractConfig>): void {
        this.config = { ...this.config, ...config };
    }

    /**
     * 获取配置
     */
    getConfig(): EntityExtractConfig {
        return { ...this.config };
    }

    // ==================== Event Listening (V0.9.14) ====================

    /**
     * Start the Entity Extraction service
     * V1.0.3 Fix: 使用顶层 import 替代 require，修复浏览器环境报错
     */
    start(): void {
        // V1.0.3: 确保 EventWatcher 已启动
        eventWatcher.start();

        // Listen to message received events
        eventWatcher.on('onMessageReceived', this.handleMessageReceived.bind(this));

        Logger.info(LogModule.MEMORY_ENTITY, 'EntityBuilder service started');
    }

    /**
     * Handle message received event
     */
    private async handleMessageReceived(): Promise<void> {
        // Fix P1: 移除无意义的 await import 微任务，直接使用顶部已导入的单例
        const currentFloor = MacroService.getCurrentMessageCount();
        const state = await chatManager.getState();
        const lastExtracted = state.last_extracted_floor || 0;

        // Use the robust delta check
        if (this.shouldTriggerOnFloor(currentFloor, lastExtracted)) {
            Logger.info(LogModule.MEMORY_ENTITY, 'Triggering Entity Extraction (Auto)', {
                currentFloor,
                lastExtracted
            });

            // V1.0.6: 自动提取也统一使用 "上次总结" 到现在的范围
            // 确保上下文连贯，并在 extracting 阶段更新已有实体状态
            const lastSummarized = state.last_summarized_floor || 0;
            let startFloor = lastSummarized + 1;

            // 同样应用 50 层上限保护
            if (currentFloor - startFloor > 50) {
                startFloor = currentFloor - 49;
            }

            const range: [number, number] = [startFloor, currentFloor];

            // Trigger extraction (non-blocking)
            this.extractByRange(range, false).catch(err => {
                Logger.error(LogModule.MEMORY_ENTITY, 'Auto-extraction failed', { error: err });
            });
        }
    }

    /**
     * 检查是否应该在指定楼层触发实体提取
     * V0.9.1: 使用楼层触发器，与 SummarizerService 一致
     */
    shouldTriggerOnFloor(currentFloor: number, lastExtractedFloor: number): boolean {
        // V0.9.12: Fix - 每次检查触发器时刷新配置，避免初始化时的 stale config
        const savedConfig = SettingsManager.get('apiSettings')?.entityExtractConfig;
        if (savedConfig) {
            this.config = { ...this.config, ...savedConfig };
        }

        if (!this.config.enabled) {
            return false;
        }

        if (this.config.trigger !== 'floor') {
            return false;
        }

        // V0.9.13: 使用增量触发 (Delta) 而非整除触发 (Modulo)
        const pendingFloors = currentFloor - lastExtractedFloor;

        // Fix P0: 楼层回溯 Bug 保护
        // 如果 pendingFloors < 0，说明用户在酒馆进行了删回车操作，导致 currentFloor 变小
        if (pendingFloors < 0) {
            Logger.warn(LogModule.MEMORY_ENTITY, '检测到楼层回溯，重置 last_extracted_floor', { currentFloor, lastExtractedFloor });
            // 同步将状态向后重置对齐，避免永久不触发
            chatManager.updateState({ last_extracted_floor: currentFloor }).catch(e => {
                Logger.error(LogModule.MEMORY_ENTITY, '回溯重置状态失败', { error: e });
            });
            return false;
        }

        // 只要未提取的楼层数超过间隔，就触发
        return pendingFloors >= this.config.floorInterval;
    }

    /**
     * 从原始聊天历史提取实体
     * V0.9.1: 输入从 chatHistory 而非 engramGraph
     *
     * @param chatHistory 原始聊天历史文本
     * @param floor 当前楼层
     * @param manual 是否手动触发
     */
    async extractFromChat(
        chatHistory: string, // Kept for signature compatibility, but workflow fetches it again or receives it
        floor: number,
        manual = false,
        dryRun = false,
        range?: [number, number] // V1.0.7: Allow passing explicit range
    ): Promise<EntityBuildResult | null> {
        if (this.isExtracting) {
            Logger.warn(LogModule.MEMORY_ENTITY, '正在执行提取，跳过本次触发');
            return null;
        }

        this.isExtracting = true;
        const startTime = Date.now();
        Logger.info(LogModule.MEMORY_ENTITY, `开始实体提取 (Workflow) (楼层 ${floor}, DryRun: ${dryRun})`);

        if (manual) {
            notificationService.info('正在进行实体提取...', 'Engram');
        }

        try {
            // Lazy import to avoid circular dep
            const { WorkflowEngine } = await import('@/modules/workflow/core/WorkflowEngine');
            const { createEntityWorkflow } = await import('@/modules/workflow/definitions/EntityWorkflow');

            // V1.0.4: 使用全局 "启用修订模式" 开关 (复用 summarizerConfig)
            const globalSettings = SettingsManager.get('summarizerConfig');
            const previewEnabled = manual || (globalSettings?.previewEnabled ?? true);

            const contextPromise = WorkflowEngine.run(createEntityWorkflow(), {
                trigger: manual ? 'manual' : 'auto',
                config: {
                    dryRun,
                    previewEnabled,
                    logType: 'entity_extraction', // For LlmRequest logging
                    templateId: this.config.promptTemplateId, // V0.9.10: Support custom prompt
                    category: 'entity_extraction', // V1.0.8: Explicitly pass category for FetchContext to find default template
                },
                input: {
                    // Pass range if possible, otherwise FetchChatHistory logic needs to handle single floor or raw string
                    // Ideally pass range: [floor, floor] or the actual range
                    range: range || [floor, floor], // Use passed range or default to single floor
                    chatHistory // Pass raw string as optimization
                }
            });

            // Fix P2: 死锁保镖，增加 60 秒超时机制，防底层 LLM/Workflow 死锁
            const timeoutPromise = new Promise<any>((_, reject) => {
                setTimeout(() => reject(new Error('实体提取超时 (60s Watchdog)')), 60000);
            });

            const context = await Promise.race([contextPromise, timeoutPromise]);

            const result = context.output; // From SaveEntity

            if (!dryRun) {
                // Update state logic likely needs to stay here or move to a separate PostProcess Step
                const { chatManager } = await import('@/data/ChatManager');
                await chatManager.updateState({ last_extracted_floor: floor });

                Logger.success(LogModule.MEMORY_ENTITY, '实体提取完成', {
                    floor,
                    newCount: result?.newEntities?.length || 0,
                    updatedCount: result?.updatedEntities?.length || 0,
                    duration: Date.now() - startTime,
                });

                if (manual) {
                    notificationService.success(
                        `实体提取完成: 新增 ${result?.newEntities?.length || 0}, 更新 ${result?.updatedEntities?.length || 0}`,
                        'Engram'
                    );
                }
            } else {
                Logger.info(LogModule.MEMORY_ENTITY, '实体提取预览完成', {
                    newCount: result?.newEntities?.length || 0,
                    updatedCount: result?.updatedEntities?.length || 0
                });
                // V0.9.11: Persist for UI
                this.pendingReviewResult = {
                    success: true,
                    newEntities: result?.newEntities || [],
                    updatedEntities: result?.updatedEntities || []
                };

                // Add notification for Preview
                notificationService.success(
                    `实体预览就绪: 发现 ${result?.newEntities?.length || 0} 个新实体`,
                    'Engram'
                );
            }

            return {
                success: true,
                newEntities: result?.newEntities || [],
                updatedEntities: result?.updatedEntities || []
            };

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            Logger.error(LogModule.MEMORY_ENTITY, '实体提取异常', { error: errorMsg });
            if (manual) {
                notificationService.error(`实体提取异常: ${errorMsg}`, 'Engram 错误');
            }
            // Fix P3: 抛出事件以供其他模块感知和处理
            EventBus.emit({
                type: 'WORKFLOW_FAILED',
                payload: { workflowName: 'EntityWorkflow', error: e }
            });
            return { success: false, newEntities: [], updatedEntities: [], error: errorMsg };
        } finally {
            this.isExtracting = false;
        }
    }

    /**
     * 按楼层范围提取实体
     * V0.9.9: 统一调用 MacroService 获取指定范围的历史
     */
    async extractByRange(range: [number, number], manual = false): Promise<EntityBuildResult | null> {
        // 同步获取清洗后的历史记录
        const chatHistory = MacroService.getChatHistory(range);

        if (!chatHistory) {
            Logger.warn(LogModule.MEMORY_ENTITY, '指定范围的历史记录为空', { range });
            return null;
        }

        // 调用核心提取逻辑 (floor 参数传入结束楼层)
        return this.extractFromChat(chatHistory, range[1], manual, false, range);
    }

    /**
     * 手动提取（从当前聊天历史）
     */
    async extractManual(dryRun = false): Promise<EntityBuildResult | null> {
        // 获取当前聊天历史 (不传参使用默认 recent)
        // V1.0.5: 手动提取应该基于 "上次总结" 到现在的范围，
        // 这样给 LLM 提供的上下文才是完整的 (避免 "他说了什么" 这种指代不明)
        // 用户反馈: "上次提取" 会导致中间一段丢失上下文
        const state = await chatManager.getState();
        const lastSummarized = state.last_summarized_floor || 0;
        const currentFloor = MacroService.getCurrentMessageCount();

        // 计算范围: (lastSummarized + 1) -> current
        // 如果 lastSummarized 离现在太远 (>50)，则只取最近 50 层
        let startFloor = lastSummarized + 1;
        if (currentFloor - startFloor > 50) {
            startFloor = currentFloor - 49; // 包含当前层共 50 层
        }

        // 确保 start <= current
        if (startFloor > currentFloor) {
            startFloor = currentFloor;
        }

        const range: [number, number] = [startFloor, currentFloor];
        Logger.info(LogModule.MEMORY_ENTITY, '手动触发实体提取', { range });

        // 复用 extractByRange 逻辑，它会正确调用 FetchContext 并传入 range
        return this.extractByRange(range, true);
    }

    /**
     * 直接保存实体列表 (用于预览通过后的保存)
     */
    async saveRawEntities(newEntities: EntityNode[], updatedEntities: EntityNode[]): Promise<void> {
        const store = useMemoryStore.getState();
        const currentFloor = MacroService.getCurrentMessageCount();

        Logger.info(LogModule.MEMORY_ENTITY, '开始保存实体 (saveRawEntities)', {
            newCount: newEntities.length,
            updatedCount: updatedEntities.length
        });

        try {
            // 批量保存新增实体
            if (newEntities.length > 0) {
                const entitiesToSave = newEntities.map(entity => ({
                    name: entity.name,
                    type: entity.type,
                    description: entity.description,
                    aliases: entity.aliases || [],
                    profile: (entity.profile || {}) as Record<string, unknown>,
                }));
                await store.saveEntities(entitiesToSave);
                SettingsManager.incrementStatistic('totalEntities', newEntities.length);
            }

            // 批量保存更新实体 (并行，但引入分批处理以限制并发)
            if (updatedEntities.length > 0) {
                const chunkSize = 50; // 每批最大并发更新量
                for (let i = 0; i < updatedEntities.length; i += chunkSize) {
                    const chunk = updatedEntities.slice(i, i + chunkSize);
                    await Promise.all(chunk.map(entity => {
                        return store.updateEntity(entity.id, {
                            profile: entity.profile,
                            aliases: entity.aliases,
                            description: entity.description,
                            name: entity.name,
                            type: entity.type
                        });
                    }));
                }
            }

            // 更新状态
            await chatManager.updateState({ last_extracted_floor: currentFloor });

            notificationService.success(
                `已保存 ${newEntities.length} 个新实体，更新 ${updatedEntities.length} 个实体`,
                'Engram'
            );
            Logger.success(LogModule.MEMORY_ENTITY, '实体保存完成');

            // V1.4.2: 成功保存后触发自动归档检查
            if (this.config.autoArchive) {
                await this.checkAndArchiveEntities();
            }
        } catch (error) {
            Logger.error(LogModule.MEMORY_ENTITY, '实体保存失败', { error });
            throw error; // Re-throw for UI to catch
        }
    }

    /**
     * 检查并执行实体自动归档
     * 根据 archiveLimit 归档多出的、未锁定的最旧实体
     */
    async checkAndArchiveEntities(): Promise<void> {
        try {
            const store = useMemoryStore.getState();
            const allEntities = await store.getAllEntities();

            // 仅统计未归档的实体
            const activeEntities = allEntities.filter(e => !e.is_archived);
            const limit = this.config.archiveLimit || 50;

            if (activeEntities.length <= limit) {
                return;
            }

            // 过滤掉已锁定的实体 (锁定的实体获得“免死金牌”)
            const candidates = activeEntities
                .filter(e => !e.is_locked)
                .sort((a, b) => (a.last_updated_at || 0) - (b.last_updated_at || 0));

            const overLimit = activeEntities.length - limit;
            const toArchive = candidates.slice(0, overLimit);

            if (toArchive.length > 0) {
                const ids = toArchive.map(e => e.id);
                Logger.info(LogModule.MEMORY_ENTITY, `由于超过上限(${limit})，自动归档 ${ids.length} 个旧实体`, {
                    names: toArchive.map(e => e.name)
                });
                await store.archiveEntities(ids);
            }
        } catch (error) {
            Logger.error(LogModule.MEMORY_ENTITY, '执行实体自动归档失败', { error });
        }
    }

    /**
     * 实体消歧：检查新实体是否与已有实体重复
     * 已迁移至 SaveEntity Step
     */
    // private resolveEntity(...) {}

    /**
     * 获取状态 (UI 适配)
     * V0.9.1: 改为楼层相关状态
     */

    /**
     * 获取状态 (UI 适配)
     * V0.9.1: 改为楼层相关状态
     */
    async getStatus() {
        const store = useMemoryStore.getState();
        const entities = await store.getAllEntities();
        const state = await chatManager.getState();
        const archivedCount = entities.filter(e => e.is_archived).length;

        return {
            enabled: this.config.enabled,
            trigger: this.config.trigger,
            floorInterval: this.config.floorInterval,
            lastExtractedFloor: state.last_extracted_floor,
            entityCount: entities.length,
            archivedCount,
            isExtracting: this.isExtracting,
        };
    }
}

/** 默认实例 */
export const entityBuilder = new EntityBuilder();

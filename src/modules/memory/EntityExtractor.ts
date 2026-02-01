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
import { Logger, LogModule } from '@/core/logger';
import { chatManager } from '@/data/ChatManager';
import type { EntityNode } from '@/data/types/graph';
import { MacroService } from '@/integrations/tavern/macros';
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

    /**
     * 检查是否应该在指定楼层触发实体提取
     * V0.9.1: 使用楼层触发器，与 SummarizerService 一致
     */
    shouldTriggerOnFloor(currentFloor: number): boolean {
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

        // 检查楼层间隔
        return currentFloor > 0 && currentFloor % this.config.floorInterval === 0;
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
        dryRun = false
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

            const context = await WorkflowEngine.run(createEntityWorkflow(), {
                trigger: manual ? 'manual' : 'auto',
                config: {
                    dryRun,
                    logType: 'entity_extraction', // For LlmRequest logging
                    templateId: this.config.promptTemplateId // V0.9.10: Support custom prompt
                },
                input: {
                    // Pass range if possible, otherwise FetchChatHistory logic needs to handle single floor or raw string
                    // Ideally pass range: [floor, floor] or the actual range
                    range: [floor, floor], // Placeholder range
                    chatHistory // Pass raw string as optimization
                }
            });

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
        return this.extractFromChat(chatHistory, range[1], manual);
    }

    /**
     * 手动提取（从当前聊天历史）
     */
    async extractManual(dryRun = false): Promise<EntityBuildResult | null> {
        // 获取当前聊天历史 (不传参使用默认 recent)
        const chatHistory = MacroService.getChatHistory();

        // 使用真实楼层作为标记
        const currentFloor = MacroService.getCurrentMessageCount();

        // 如果是从 recent 提取，floor 标记应该大概是当前最新楼层
        return this.extractFromChat(chatHistory, currentFloor, true, dryRun);
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
            }

            // 批量保存更新实体 (并行)
            if (updatedEntities.length > 0) {
                await Promise.all(updatedEntities.map(entity => {
                    Logger.debug(LogModule.MEMORY_ENTITY, 'Updating entity', { id: entity.id, name: entity.name });
                    return store.updateEntity(entity.id, {
                        profile: entity.profile,
                        aliases: entity.aliases,
                        description: entity.description,
                        name: entity.name,
                        type: entity.type
                    });
                }));
            }

            // 更新状态
            await chatManager.updateState({ last_extracted_floor: currentFloor });

            notificationService.success(
                `已保存 ${newEntities.length} 个新实体，更新 ${updatedEntities.length} 个实体`,
                'Engram'
            );
            Logger.success(LogModule.MEMORY_ENTITY, '实体保存完成');
        } catch (error) {
            Logger.error(LogModule.MEMORY_ENTITY, '实体保存失败', { error });
            throw error; // Re-throw for UI to catch
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

        return {
            enabled: this.config.enabled,
            trigger: this.config.trigger,
            floorInterval: this.config.floorInterval,
            lastExtractedFloor: state.last_extracted_floor,
            entityCount: entities.length,
            isExtracting: this.isExtracting,
        };
    }
}

/** 默认实例 */
export const entityBuilder = new EntityBuilder();

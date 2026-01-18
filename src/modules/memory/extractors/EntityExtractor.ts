/**
 * EntityBuilder - 实体构建服务
 *
 * V0.9.1: 与 SummarizerService 并行，从原始 chatHistory 提取
 * - 楼层触发器 (floorInterval)
 * - 输入从原始对话提取，而非 Summary
 */

import { useMemoryStore } from '@/state/memoryStore';
import { chatManager } from '@/data/ChatManager';
import { MacroService } from '@/integrations/tavern/macros';
import { Logger } from '@/core/logger';
import { ModelLogger } from "@/core/logger/ModelLogger";
import { getCurrentCharacter, getCurrentModel } from '@/integrations/tavern/context';
import { notificationService } from '@/ui/services/NotificationService';
import { llmAdapter } from '@/integrations/llm';
import { SettingsManager } from '@/config/settings';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import type { EntityNode } from '@/data/types/graph';
import { EntityType } from '@/data/types/graph';
import type { EntityExtractConfig } from '@/config/types/memory';
import { DEFAULT_ENTITY_CONFIG } from '@/config/types/defaults';

// 导入提示词模板
import entityExtractionPrompt from '@/integrations/llm/prompts/entity_extraction.md?raw';

/**
 * V0.9.4: 实体提取 LLM 响应格式（开放结构）
 */
interface EntityExtractionResponse {
    entities: Array<{
        name: string;
        type: 'char' | 'loc' | 'item' | 'concept' | 'unknown';
        aliases: string[];
        /** 开放式属性容器，AI 自由写入 */
        profile: Record<string, unknown>;
    }>;
}

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

    constructor(config?: Partial<EntityExtractConfig>) {
        this.config = { ...DEFAULT_ENTITY_CONFIG, ...config };
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
        chatHistory: string,
        floor: number,
        manual = false
    ): Promise<EntityBuildResult | null> {
        if (this.isExtracting) {
            Logger.warn('EntityBuilder', '正在执行提取，跳过本次触发');
            return null;
        }

        this.isExtracting = true;
        const startTime = Date.now();
        Logger.info('EntityBuilder', `开始实体提取 (楼层 ${floor})`);

        try {
            const store = useMemoryStore.getState();

            // 1. 获取已有实体（用于消歧）
            const existingEntities = await store.getAllEntities();
            const existingEntityInfo = existingEntities.map(e => ({
                name: e.name,
                type: e.type,
                aliases: e.aliases || [],
            }));

            // 2. 获取提示词模板
            const templates = SettingsManager.get('apiSettings')?.promptTemplates || [];
            const template = templates.find(t => t.category === 'entity_extraction' && t.enabled);

            const systemPrompt = template?.systemPrompt || entityExtractionPrompt;
            const userPrompt = template?.userPromptTemplate || `请从以下对话历史中提取实体和关系：

**对话历史**:
{{chatHistory}}

**已有实体**:
{{existingEntities}}

---
请按要求输出 JSON 格式的实体和关系数据。`;

            // 3. 替换宏变量
            const finalUserPrompt = userPrompt
                .replace('{{chatHistory}}', chatHistory)
                .replace('{{existingEntities}}', JSON.stringify(existingEntityInfo, null, 2))
                .replace('{{worldbookContext}}', MacroService['cachedWorldbookContext'] || '');

            // 4. 调用 LLM (接入 Model Logging)
            const logId = ModelLogger.logSend({
                type: 'entity_extraction',
                systemPrompt,
                userPrompt: finalUserPrompt,
                floorRange: [floor, floor], // 暂时只标记触发楼层
                model: getCurrentModel(),
                character: getCurrentCharacter()?.name,
            });

            const startTime = Date.now();
            const response = await llmAdapter.generate({
                systemPrompt,
                userPrompt: finalUserPrompt,
            });

            ModelLogger.logReceive(logId, {
                response: response.content,
                status: response.success ? 'success' : 'error',
                error: response.error,
                duration: Date.now() - startTime,
            });

            if (!response.success || !response.content) {
                Logger.error('EntityBuilder', 'LLM 调用失败', { error: response.error });
                if (manual) {
                    notificationService.error('实体提取失败：LLM 调用失败', 'Engram');
                }
                return { success: false, newEntities: [], updatedEntities: [], error: response.error };
            }

            // 5. 解析 JSON (V0.9.4: 使用新的 entities 字段)
            const parsed = RobustJsonParser.parse<EntityExtractionResponse>(response.content);
            if (!parsed || !parsed.entities) {
                Logger.error('EntityBuilder', 'JSON 解析失败');
                if (manual) {
                    notificationService.error('实体提取失败：无法解析结果', 'Engram');
                }
                return { success: false, newEntities: [], updatedEntities: [], error: 'JSON parse failed' };
            }

            // 6. 保存实体
            const result = await this.saveEntities(parsed, existingEntities);

            // 7. 更新 last_extracted_floor
            await chatManager.updateState({ last_extracted_floor: floor });

            Logger.success('EntityBuilder', '实体提取完成', {
                floor,
                newCount: result.newEntities.length,
                updatedCount: result.updatedEntities.length,
                duration: Date.now() - startTime,
            });

            if (manual) {
                notificationService.success(
                    `提取了 ${result.newEntities.length} 个新实体`,
                    'Engram'
                );
            }

            return result;

        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            Logger.error('EntityBuilder', '实体提取异常', { error: errorMsg });
            if (manual) {
                notificationService.error(`实体提取异常: ${errorMsg}`, 'Engram 错误');
            }
            return { success: false, newEntities: [], updatedEntities: [], error: errorMsg };
        } finally {
            this.isExtracting = false;
        }
    }

    /**
     * 手动提取（从当前聊天历史）
     */
    async extractManual(): Promise<EntityBuildResult | null> {
        // 获取当前聊天历史
        const chatHistory = await MacroService.getChatHistory();
        const state = await chatManager.getState();
        return this.extractFromChat(chatHistory, state.last_summarized_floor, true);
    }

    /**
     * 保存实体到数据库
     * V0.9.4: 适配开放式 profile 结构
     */
    private async saveEntities(
        data: EntityExtractionResponse,
        existingEntities: EntityNode[]
    ): Promise<EntityBuildResult> {
        const store = useMemoryStore.getState();

        const newEntities: EntityNode[] = [];
        const updatedEntities: EntityNode[] = [];

        for (const extracted of data.entities) {
            // 1. 检查是否已存在
            const existing = this.resolveEntity(extracted.name, extracted.aliases, existingEntities);

            // 2. 从 profile 生成 YAML 格式的 description (For Model)
            const description = this.profileToYaml(extracted.name, extracted.type, extracted.profile);

            if (existing) {
                // 更新现有实体: 合并 profile
                const mergedProfile = {
                    ...existing.profile,
                    ...extracted.profile,
                };
                // 合并 relations 数组
                if (Array.isArray(extracted.profile?.relations)) {
                    const existingRelations = (existing.profile?.relations as Array<{ target: string }>) || [];
                    const newRelations = extracted.profile.relations as Array<{ target: string }>;
                    const relationMap = new Map(existingRelations.map(r => [r.target, r]));
                    for (const rel of newRelations) {
                        relationMap.set(rel.target, rel);
                    }
                    mergedProfile.relations = Array.from(relationMap.values());
                }

                const updates: Partial<EntityNode> = {
                    description: this.profileToYaml(existing.name, existing.type, mergedProfile),
                    profile: mergedProfile,
                };

                // 合并别名
                const allAliases = new Set([...(existing.aliases || []), ...extracted.aliases]);
                updates.aliases = Array.from(allAliases);

                await store.updateEntity(existing.id, updates);
                updatedEntities.push({ ...existing, ...updates });
            } else {
                // 创建新实体
                const typeMap: Record<string, EntityType> = {
                    'char': EntityType.Character,
                    'loc': EntityType.Location,
                    'item': EntityType.Item,
                    'concept': EntityType.Concept,
                    'unknown': EntityType.Unknown,
                };

                const entity = await store.saveEntity({
                    name: extracted.name,
                    type: typeMap[extracted.type] || EntityType.Unknown,
                    description,
                    aliases: extracted.aliases || [],
                    profile: extracted.profile || {},
                });
                newEntities.push(entity);
            }
        }

        return {
            success: true,
            newEntities,
            updatedEntities,
        };
    }

    /**
     * 将 profile 转换为 YAML 格式的描述文本 (For Model)
     * V0.9.4: 新增
     */
    private profileToYaml(name: string, type: string, profile: Record<string, unknown>): string {
        const lines: string[] = [`${name} (${type})`];

        for (const [key, value] of Object.entries(profile)) {
            if (key === 'relations' && Array.isArray(value)) {
                lines.push(`关系:`);
                for (const rel of value as Array<{ target: string; type: string; description?: string }>) {
                    const desc = rel.description ? ` - ${rel.description}` : '';
                    lines.push(`  - ${rel.target}: ${rel.type}${desc}`);
                }
            } else if (typeof value === 'string') {
                lines.push(`${key}: ${value}`);
            } else if (Array.isArray(value)) {
                lines.push(`${key}: ${value.join(', ')}`);
            }
        }

        return lines.join('\n');
    }

    /**
     * 实体消歧：检查新实体是否与已有实体重复
     */
    private resolveEntity(
        name: string,
        aliases: string[],
        existing: EntityNode[]
    ): EntityNode | null {
        // 1. 精确名称匹配
        const exactMatch = existing.find(e => e.name === name);
        if (exactMatch) return exactMatch;

        // 2. 检查是否新名称是某个已有实体的别名
        const aliasMatch = existing.find(e => e.aliases?.includes(name));
        if (aliasMatch) return aliasMatch;

        // 3. 检查新别名是否匹配已有实体名称或别名
        for (const alias of aliases) {
            const match = existing.find(e =>
                e.name === alias ||
                e.aliases?.includes(alias)
            );
            if (match) return match;
        }

        return null;
    }

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

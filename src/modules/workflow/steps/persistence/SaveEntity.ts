import { Logger } from '@/core/logger';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import { EntityNode, EntityType } from '@/data/types/graph';
import { useMemoryStore } from '@/state/memoryStore';
import * as jsonpatch from 'fast-json-patch';
import { z } from 'zod';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

// V1.3: 统一 JSON Patch 格式
// 新实体: { op: "add", path: "/entities/{name}", value: {...} }
// 更新:   { op: "replace/add/remove", path: "/entities/{name}/profile/{key}", value: ... }

const PatchOpSchema = z.object({
    op: z.enum(['add', 'replace', 'remove', 'copy', 'move', 'test']),
    path: z.string(),
    value: z.any().optional(),
    from: z.string().optional()
});

const UnifiedPatchSchema = z.object({
    patches: z.array(PatchOpSchema)
});

// 向后兼容的 Legacy Schema
const LegacyEntitySchema = z.object({
    name: z.string(),
    type: z.string(),
    aliases: z.array(z.string()).optional(),
    profile: z.record(z.string(), z.unknown()).optional(),
});

const LegacyPatchSchema = z.object({
    name: z.string(),
    ops: z.array(z.any())
});

const LegacySchema = z.object({
    entities: z.array(LegacyEntitySchema).optional(),
    patches: z.array(LegacyPatchSchema).optional()
});

export class SaveEntity implements IStep {
    name = 'SaveEntity';

    async execute(context: JobContext): Promise<void> {
        const store = useMemoryStore.getState();
        const existingEntities = (context.input._rawExistingEntities as EntityNode[]) || await store.getAllEntities();

        let sourceContent = context.parsedData;

        // Handle UserReview modifications
        if (typeof context.output === 'string') {
            sourceContent = RobustJsonParser.parse(context.output);
            if (!sourceContent) {
                throw new Error(`SaveEntity: Failed to re-parse user modified content - JSON 解析失败，请检查格式`);
            }
        } else if (context.output && typeof context.output === 'object') {
            sourceContent = context.output;
        }

        if (!sourceContent) return;

        const newEntities: EntityNode[] = [];
        const updatedEntities: EntityNode[] = [];
        const isDryRun = context.config.dryRun === true;

        // 尝试解析为统一 Patch 格式
        const unifiedResult = UnifiedPatchSchema.safeParse(sourceContent);

        if (unifiedResult.success && this.isUnifiedFormat(unifiedResult.data.patches)) {
            // V1.3 统一格式
            await this.processUnifiedPatches(
                unifiedResult.data.patches,
                existingEntities,
                store,
                isDryRun,
                newEntities,
                updatedEntities
            );
        } else {
            // 向后兼容 Legacy 格式
            const legacyResult = LegacySchema.safeParse(sourceContent);
            if (legacyResult.success) {
                await this.processLegacyFormat(
                    legacyResult.data,
                    existingEntities,
                    store,
                    isDryRun,
                    newEntities,
                    updatedEntities
                );
            } else {
                throw new Error(`SaveEntity: Zod Validation Failed - 无法解析为统一或旧版格式`);
            }
        }

        context.output = { newEntities, updatedEntities };
        Logger.info('SaveEntity', `完成: 新增 ${newEntities.length}, 更新 ${updatedEntities.length} (DryRun: ${isDryRun})`);
    }

    /** 检测是否为统一格式 (patches 数组包含 path 字段) */
    private isUnifiedFormat(patches: any[]): boolean {
        return patches.length > 0 && patches.every(p =>
            typeof p.path === 'string' && p.path.startsWith('/entities/')
        );
    }

    /** V1.3: 处理统一 JSON Patch 格式 */
    private async processUnifiedPatches(
        patches: z.infer<typeof PatchOpSchema>[],
        existingEntities: EntityNode[],
        store: ReturnType<typeof useMemoryStore.getState>,
        isDryRun: boolean,
        newEntities: EntityNode[],
        updatedEntities: EntityNode[]
    ): Promise<void> {
        // 按实体名分组
        const patchesByEntity = new Map<string, z.infer<typeof PatchOpSchema>[]>();

        for (const patch of patches) {
            // path 格式: /entities/{name} 或 /entities/{name}/profile/xxx
            const match = patch.path.match(/^\/entities\/([^/]+)/);
            if (!match) continue;

            const entityName = decodeURIComponent(match[1]);
            if (!patchesByEntity.has(entityName)) {
                patchesByEntity.set(entityName, []);
            }
            patchesByEntity.get(entityName)!.push(patch);
        }

        for (const [entityName, entityPatches] of patchesByEntity) {
            const existing = existingEntities.find(e =>
                e.name === entityName || e.aliases?.includes(entityName)
            );

            // 检查是否有 add 到 /entities/{name} 的操作 (新实体)
            // V1.0.5: 移除 encodeURIComponent，因为 LLM 输出的路径不进行 URL 编码
            const addRootPatch = entityPatches.find(p =>
                p.op === 'add' && p.path === `/entities/${entityName}`
            );

            if (addRootPatch && !existing) {
                // 新实体
                const value = addRootPatch.value as any;
                const entity: any = {
                    name: entityName,
                    type: (value?.type as EntityType) || EntityType.Unknown,
                    aliases: value?.aliases || [],
                    profile: value?.profile || {},
                    description: this.profileToYaml(entityName, value?.type || 'unknown', value?.profile || {})
                };

                if (!isDryRun) {
                    const saved = await store.saveEntity(entity);
                    newEntities.push(saved);
                } else {
                    entity.id = `temp-${Date.now()}`;
                    newEntities.push(entity);
                }
            } else if (existing) {
                // 更新已有实体
                try {
                    const targetDoc = JSON.parse(JSON.stringify(existing));

                    // 将路径转换为相对于实体的路径
                    // V1.0.5: 移除 encodeURIComponent，因为 LLM 输出的路径不进行 URL 编码
                    const relativeOps = entityPatches
                        .filter(p => p.path !== `/entities/${entityName}`) // 排除 add root
                        .map(p => ({
                            ...p,
                            path: p.path.replace(`/entities/${entityName}`, '')
                        }));

                    if (relativeOps.length > 0) {
                        jsonpatch.applyPatch(targetDoc, relativeOps as jsonpatch.Operation[]);

                        if (!isDryRun) {
                            const description = this.profileToYaml(targetDoc.name, targetDoc.type, targetDoc.profile || {});
                            await store.updateEntity(existing.id, {
                                profile: targetDoc.profile,
                                aliases: targetDoc.aliases,
                                description,
                                name: targetDoc.name,
                                type: targetDoc.type
                            });
                        }
                        updatedEntities.push(targetDoc);
                    }
                } catch (e) {
                    Logger.warn('SaveEntity', `Patch failed for ${entityName}`, e);
                }
            }
        }
    }

    /** 向后兼容: 处理旧版 entities + patches 格式 */
    private async processLegacyFormat(
        data: z.infer<typeof LegacySchema>,
        existingEntities: EntityNode[],
        store: ReturnType<typeof useMemoryStore.getState>,
        isDryRun: boolean,
        newEntities: EntityNode[],
        updatedEntities: EntityNode[]
    ): Promise<void> {
        // 1. Process New Entities
        if (data.entities) {
            for (const extracted of data.entities) {
                const exists = existingEntities.find(e => e.name === extracted.name || e.aliases?.includes(extracted.name));
                if (exists) continue;

                const entity: any = {
                    name: extracted.name,
                    type: (extracted.type as EntityType) || EntityType.Unknown,
                    aliases: extracted.aliases || [],
                    profile: extracted.profile || {},
                    description: this.profileToYaml(extracted.name, extracted.type, extracted.profile || {})
                };

                if (!isDryRun) {
                    const saved = await store.saveEntity(entity);
                    newEntities.push(saved);
                } else {
                    entity.id = `temp-${Date.now()}`;
                    newEntities.push(entity);
                }
            }
        }

        // 2. Process Patches
        if (data.patches) {
            for (const patch of data.patches) {
                const target = existingEntities.find(e => e.name === patch.name || e.id === patch.name);
                if (!target) continue;

                try {
                    const targetDoc = JSON.parse(JSON.stringify(target));
                    jsonpatch.applyPatch(targetDoc, patch.ops);

                    if (!isDryRun) {
                        const description = this.profileToYaml(targetDoc.name, targetDoc.type, targetDoc.profile || {});
                        await store.updateEntity(target.id, {
                            profile: targetDoc.profile,
                            aliases: targetDoc.aliases,
                            description,
                            name: targetDoc.name,
                            type: targetDoc.type
                        });
                        updatedEntities.push(targetDoc);
                    } else {
                        updatedEntities.push(targetDoc);
                    }
                } catch (e) {
                    Logger.warn('SaveEntity', `Patch failed for ${patch.name}`, e);
                }
            }
        }
    }

    private profileToYaml(name: string, type: string, profile: any): string {
        return `${name} (${type})\n${JSON.stringify(profile, null, 2)}`;
    }
}


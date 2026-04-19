import { Logger } from '@/core/logger';
import { RobustJsonParser } from '@/core/utils/JsonParser';
import type { EntityNode} from '@/data/types/graph';
import { EntityType } from '@/data/types/graph';
import { useMemoryStore } from '@/state/memoryStore';
import * as jsonpatch from 'fast-json-patch';
import * as yaml from 'js-yaml';
import { z } from 'zod';
import type { JobContext } from '../../core/JobContext';
import type { IStep } from '../../core/Step';

// V1.3: 统一 JSON Patch 格式
// 新实体: { op: "add", path: "/entities/{name}", value: {...} }
// 更新:   { op: "replace/add/remove", path: "/entities/{name}/profile/{key}", value: ... }

const PatchOpSchema = z.object({
    from: z.string().optional(),
    op: z.enum(['add', 'replace', 'remove', 'copy', 'move', 'test']),
    path: z.string(),
    value: z.any().optional()
});

const UnifiedPatchSchema = z.object({
    patches: z.array(PatchOpSchema)
});

// 向后兼容的 Legacy Schema
const LegacyEntitySchema = z.object({
    aliases: z.array(z.string()).optional(),
    name: z.string(),
    profile: z.record(z.string(), z.unknown()).optional(),
    type: z.string(),
});

const LegacyPatchSchema = z.object({
    name: z.string(),
    ops: z.array(z.any())
});

const LegacySchema = z.object({
    entities: z.array(LegacyEntitySchema).optional(),
    patches: z.array(LegacyPatchSchema).optional()
});

const ProcessedResultSchema = z.object({
    newEntities: z.array(z.any()).optional(),
    updatedEntities: z.array(z.any()).optional()
});

export class SaveEntity implements IStep {
    name = 'SaveEntity';
    private config: { dryRun?: boolean };

    // V1.2.7: 支持构造函数配置 dryRun，用于预览模式
    constructor(config?: { dryRun?: boolean }) {
        this.config = config || {};
    }

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

        if (!sourceContent) {return;}

        const newEntities: EntityNode[] = [];
        const updatedEntities: EntityNode[] = [];
        // V1.2.7: 优先使用构造函数配置，其次是 context.config
        const isDryRun = this.config.dryRun ?? context.config.dryRun === true;

        // V1.3.1: 检查是否为已处理的数据 (来自 DryRun + UserReview)
        const processedResult = ProcessedResultSchema.safeParse(sourceContent);
        const hasProcessedData = processedResult.success &&
            ((processedResult.data.newEntities?.length ?? 0) > 0 || (processedResult.data.updatedEntities?.length ?? 0) > 0);

        if (hasProcessedData) {
            Logger.debug('SaveEntity', 'Detected processed data structure, bypassing extraction logic');
            await this.saveProcessedEntities(
                processedResult.data,
                store,
                isDryRun,
                newEntities,
                updatedEntities
            );
        } else {
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
                    // 如果既不是 Processed，也不是 Patch，也不是 Legacy，那可能是个空对象或者格式错乱
                    // 但如果是空对象 (UserReview return empty entities)，legacyResult.success 会是 true (fields optional)
                    // 所以只有完全无法解析的才会到这里
                    throw new Error(`SaveEntity: Zod Validation Failed - 无法解析为统一或旧版格式`);
                }
            }
        }

        context.output = { newEntities, updatedEntities };
        Logger.info('SaveEntity', `完成: 新增 ${newEntities.length}, 更新 ${updatedEntities.length} (DryRun: ${isDryRun})`);
    }

    /** V1.3.1: 直接保存已处理的实体 (来自 UserReview) */
    private async saveProcessedEntities(
        data: z.infer<typeof ProcessedResultSchema>,
        store: ReturnType<typeof useMemoryStore.getState>,
        isDryRun: boolean,
        outNewEntities: EntityNode[],
        outUpdatedEntities: EntityNode[]
    ): Promise<void> {
        // 保存新实体
        if (data.newEntities) {
            for (const entity of data.newEntities) {
                if (!isDryRun) {
                    // 如果有 ID 且不是临时 ID，可能是误传，但通常 newEntities 在 dryRun 时会有 temp ID
                    // SaveEntity 会生成新 ID 或者是覆盖？ store.saveEntity 通常负责创建
                    // 为了安全，重新构建对象，去除临时 ID
                    const { id, ...entityData } = entity;
                    const saved = await store.saveEntity(entityData);
                    outNewEntities.push(saved);
                } else {
                    outNewEntities.push(entity);
                }
            }
        }

        // 保存更新实体
        if (data.updatedEntities) {
            for (const entity of data.updatedEntities) {
                if (!isDryRun) {
                    if (entity.id && !entity.id.startsWith('temp-')) {
                        const description = this.profileToYaml(entity.name, entity.type || 'unknown', entity.profile || {});
                        await store.updateEntity(entity.id, {
                            aliases: entity.aliases,
                            description,
                            name: entity.name,
                            profile: entity.profile,
                            type: entity.type
                        });
                        outUpdatedEntities.push(entity);
                    } else {
                        Logger.warn('SaveEntity', 'Skipping update for entity without valid ID', entity);
                    }
                } else {
                    outUpdatedEntities.push(entity);
                }
            }
        }
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
        const patchesByEntity = new Map<string, z.infer<typeof PatchOpSchema>[]>();

        for (const patch of patches) {
            const match = patch.path.match(/^\/entities\/([^/]+)/);
            if (!match) {continue;}

            const entityName = decodeURIComponent(match[1]);
            if (!patchesByEntity.has(entityName)) {
                patchesByEntity.set(entityName, []);
            }
            patchesByEntity.get(entityName)!.push(patch);
        }

        for (const [entityName, entityPatches] of patchesByEntity) {
            let existing = this.resolveEntityIdentity(entityName, existingEntities);

            const addRootPatch = entityPatches.find(p => p.op === 'add' && p.path === `/entities/${entityName}`);

            if (addRootPatch) {
                // 如果发现新实体声明，但名字发生冲突
                const conflict = existingEntities.find(e =>
                    e.name.toLowerCase() === entityName.toLowerCase() || 
                    e.aliases?.some(a => a.toLowerCase() === entityName.toLowerCase())
                );

                if (!conflict) {
                    await this.createNewEntity(entityName, addRootPatch.value, store, isDryRun, newEntities);
                    continue; 
                } else {
                    existing = conflict;
                    Logger.debug('SaveEntity', `🔭 Duplicate entity detected for "${entityName}", redirecting to merge mode.`);
                    this.convertRootAddToPatches(entityName, addRootPatch.value, entityPatches);
                }
            }

            if (existing) {
                await this.applyMergePatches(entityName, existing, entityPatches, store, isDryRun, updatedEntities);
            }
        }
    }

    /** 消除别名歧义匹配 */
    private resolveEntityIdentity(entityName: string, existingEntities: EntityNode[]): EntityNode | undefined {
        // 1. 精确匹配名称优先
        const exactMatch = existingEntities.find(e => e.name === entityName);
        if (exactMatch) {return exactMatch;}

        // 2. 别名匹配（可能冲突）
        const aliasMatches = existingEntities.filter(e => e.aliases?.includes(entityName));
        if (aliasMatches.length === 1) {
            return aliasMatches[0];
        } else if (aliasMatches.length > 1) {
            Logger.warn('SaveEntity', `⚠️ Alias conflict detected for "${entityName}". Multiple entities share this alias. Falling back to first match to avoid crash, but data overwrite may occur.`, { matches: aliasMatches.map(e => e.name) });
            return aliasMatches[0];
        }
        return undefined;
    }

    private async createNewEntity(entityName: string, value: any, store: ReturnType<typeof useMemoryStore.getState>, isDryRun: boolean, newEntities: EntityNode[]) {
        const entity: any = {
            aliases: value?.aliases || [],
            description: this.profileToYaml(entityName, value?.type || 'unknown', value?.profile || {}),
            name: entityName,
            profile: value?.profile || {},
            type: (value?.type as EntityType) || EntityType.Unknown
        };

        if (!isDryRun) {
            const saved = await store.saveEntity(entity);
            newEntities.push(saved);
        } else {
            entity.id = `temp-${Date.now()}`;
            newEntities.push(entity);
        }
    }

    private convertRootAddToPatches(entityName: string, value: any, entityPatches: any[]) {
        if (value && typeof value === 'object') {
            if (value.profile) {entityPatches.push({ op: 'add', path: `/entities/${entityName}/profile`, value: value.profile });}
            if (value.type) {entityPatches.push({ op: 'replace', path: `/entities/${entityName}/type`, value: value.type });}
            if (value.aliases) {entityPatches.push({ op: 'add', path: `/entities/${entityName}/aliases`, value: value.aliases });}
        }
    }

    private async applyMergePatches(
        entityName: string, 
        existing: EntityNode, 
        entityPatches: any[], 
        store: ReturnType<typeof useMemoryStore.getState>, 
        isDryRun: boolean, 
        updatedEntities: EntityNode[]
    ) {
        try {
            // P1 Fix: 使用 structuredClone 替代昂贵的 JSON 序列化
            const targetDoc = structuredClone(existing) as any;
            targetDoc._original = structuredClone(existing);

            const relativeOps = this.buildRelativePatches(entityName, entityPatches, targetDoc);

            if (relativeOps.length > 0) {
                Logger.debug('SaveEntity', `Applying ${relativeOps.length} patches to ${entityName}`, { ops: relativeOps });
                jsonpatch.applyPatch(targetDoc, relativeOps as jsonpatch.Operation[]);

                if (!isDryRun) {
                    const description = this.profileToYaml(targetDoc.name, targetDoc.type, targetDoc.profile || {});
                    await store.updateEntity(existing.id, {
                        aliases: targetDoc.aliases,
                        description,
                        name: targetDoc.name,
                        profile: targetDoc.profile,
                        type: targetDoc.type
                    });
                    updatedEntities.push(targetDoc);
                } else {
                    const diffs = relativeOps.map(op => {
                        let oldValue;
                        try {
                            if (op.op === 'replace' || op.op === 'remove') {oldValue = jsonpatch.getValueByPointer(existing, op.path);}
                        } catch { /* Ignore */ }
                        return { ...op, oldValue };
                    });
                    targetDoc.description = this.profileToYaml(targetDoc.name, targetDoc.type, targetDoc.profile || {});
                    targetDoc._diff = diffs;
                    updatedEntities.push(targetDoc);
                }
            }
        } catch (error) {
            Logger.warn('SaveEntity', `Patch failed for ${entityName}`, error);
        }
    }

    private buildRelativePatches(entityName: string, entityPatches: any[], targetDoc: any): any[] {
        const relativeOps = [];
        for (const p of entityPatches) {
            const isRoot = p.path === `/entities/${entityName}`;
            if (isRoot && p.op === 'add') {continue;} 

            if (isRoot && (p.op === 'replace' || p.op === 'test')) {
                if (p.value && typeof p.value === 'object') {
                    const val = p.value as any;
                    if (val.profile) {relativeOps.push({ op: p.op, path: '/profile', value: val.profile });}
                    if (val.type) {relativeOps.push({ op: p.op, path: '/type', value: val.type });}
                    if (val.aliases) {relativeOps.push({ op: p.op, path: '/aliases', value: val.aliases });}
                }
                continue;
            }

            if (!isRoot) {
                let relPath = p.path.replace(`/entities/${entityName}`, '');
                const parts = relPath.split('/').filter(Boolean);
                const GENERIC_KEYS = new Set(['profile', 'type', 'description', 'desc', 'value', 'name', 'id', 'status', 'features', 'traits']);
                
                let anchorKey = '';
                let anchorIndex = -1;
                for (let i = parts.length - 1; i >= 0; i--) {
                    if (!GENERIC_KEYS.has(parts[i])) {
                        anchorKey = parts[i];
                        anchorIndex = i;
                        break;
                    }
                }

                if (anchorKey) {
                    const searchRoot = targetDoc.profile || {};
                    const foundPaths = this.findUniquePath(searchRoot, anchorKey, '/profile');
                    if (foundPaths.length === 1) {
                        const realAnchorPath = foundPaths[0];
                        const suffix = parts.slice(anchorIndex + 1).join('/');
                        const newPath = suffix ? `${realAnchorPath}/${suffix}` : realAnchorPath;
                        if (newPath !== relPath) {
                            Logger.debug('SaveEntity', `🔭 Smart Pointer Redirect: ${relPath} -> ${newPath}`);
                            relPath = newPath;
                        }
                    }
                }
                relativeOps.push({ ...p, path: relPath });
            }
        }
        return relativeOps;
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
                if (exists) {continue;}

                const entity: any = {
                    aliases: extracted.aliases || [],
                    description: this.profileToYaml(extracted.name, extracted.type, extracted.profile || {}),
                    name: extracted.name,
                    profile: extracted.profile || {},
                    type: (extracted.type as EntityType) || EntityType.Unknown
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
                if (!patch.name) {
                    Logger.warn('SaveEntity', 'Skipping legacy patch due to missing name field', { patch });
                    continue;
                }
                const target = existingEntities.find(e => e.name === patch.name || e.id === patch.name);
                if (!target) {continue;}

                try {
                    const targetDoc = JSON.parse(JSON.stringify(target));
                    jsonpatch.applyPatch(targetDoc, patch.ops);

                    if (!isDryRun) {
                        const description = this.profileToYaml(targetDoc.name, targetDoc.type, targetDoc.profile || {});
                        await store.updateEntity(target.id, {
                            aliases: targetDoc.aliases,
                            description,
                            name: targetDoc.name,
                            profile: targetDoc.profile,
                            type: targetDoc.type
                        });
                        updatedEntities.push(targetDoc);
                    } else {
                        // DryRun: Attach diffs with old/new values
                        const diffs = patch.ops.map(op => {
                            let oldValue;
                            try {
                                if (op.op === 'replace' || op.op === 'remove') {
                                    oldValue = jsonpatch.getValueByPointer(target, op.path); // Note: use 'target' (original) here
                                }
                            } catch { /* Ignore */ }
                            return { ...op, oldValue };
                        });
                        (targetDoc as any)._diff = diffs;
                        updatedEntities.push(targetDoc);
                    }
                } catch (error) {
                    Logger.warn('SaveEntity', `Patch failed for ${patch.name}`, error);
                }
            }
        }
    }

    private profileToYaml(name: string, type: string, profile: any): string {
        try {
            const entityObj = { profile };
            const yamlContent = yaml.dump(entityObj, {
                indent: 2,
                lineWidth: -1,
                noRefs: true,
                sortKeys: false,
            });
            return `${name}\n${yamlContent.trim()}`;
        } catch (error) {
            Logger.warn('SaveEntity', 'YAML Dump failed', error);
            return `${name} (${type})\n${JSON.stringify(profile, null, 2)}`;
        }
    }

    /**
     * V1.6: Universal Smart Pointer (Deep Search)
     * Recursively search for a key in the object structure.
     * Returns the relative path (slash-separated) to the key if found uniquely.
     */
    private findUniquePath(obj: any, targetKey: string, currentPath: string = ''): string[] {
        let results: string[] = [];

        if (!obj || typeof obj !== 'object') {return [];}

        for (const key of Object.keys(obj)) {
            const newPath = currentPath ? `${currentPath}/${key}` : key;

            if (key === targetKey) {
                results.push(newPath);
            }

            // Recurse (avoid arrays for now? or search inside arrays too? Entity structure is mostly objects)
            // But strict recursion on objects only
            if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                results = results.concat(this.findUniquePath(obj[key], targetKey, newPath));
            }
        }

        return results;
    }
}


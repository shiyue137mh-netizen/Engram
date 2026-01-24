import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { useMemoryStore } from '@/state/memoryStore';
import { EntityNode, EntityType } from '@/data/types/graph';
import { Logger } from '@/core/logger';
import * as jsonpatch from 'fast-json-patch';
import { z } from 'zod';

// Reuse Zod schemas from original EntityExtractor (simplified here)
const EntitySchema = z.object({
    name: z.string(),
    type: z.string(), // z.enum(['char', 'loc', ...]) but permissive for now
    aliases: z.array(z.string()).optional(),
    profile: z.record(z.string(), z.unknown()).optional(),
});

const ExtractionSchema = z.object({
    entities: z.array(EntitySchema).optional(),
    patches: z.array(z.object({
        name: z.string(),
        ops: z.array(z.any())
    })).optional()
});

export class SaveEntity implements IStep {
    name = 'SaveEntity';

    async execute(context: JobContext): Promise<void> {
        if (!context.parsedData) return;

        const store = useMemoryStore.getState();
        // Retrieve raw entities saved by FetchExistingEntities
        const existingEntities = (context.input._rawExistingEntities as EntityNode[]) || await store.getAllEntities();

        let data;
        try {
            data = ExtractionSchema.parse(context.parsedData);
        } catch (e) {
            throw new Error(`SaveEntity: Zod Validation Failed - ${e}`);
        }

        const newEntities: EntityNode[] = [];
        const updatedEntities: EntityNode[] = [];
        const isDryRun = context.config.dryRun === true;

        // 1. Process New Entities
        if (data.entities) {
            for (const extracted of data.entities) {
                // Check duplicates (Simplified logic)
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

        // Store result in context output for caller to see
        context.output = {
            newEntities,
            updatedEntities
        };

        Logger.info('SaveEntity', `完成: 新增 ${newEntities.length}, 更新 ${updatedEntities.length} (DryRun: ${isDryRun})`);
    }

    // Helper: Profile to YAML (Simplified version)
    private profileToYaml(name: string, type: string, profile: any): string {
        return `${name} (${type})\n${JSON.stringify(profile, null, 2)}`;
    }
}

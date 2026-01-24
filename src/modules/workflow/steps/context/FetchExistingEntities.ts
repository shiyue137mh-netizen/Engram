import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
import { useMemoryStore } from '@/state/memoryStore';
import { Logger } from '@/core/logger';

export class FetchExistingEntities implements IStep {
    name = 'FetchExistingEntities';

    async execute(context: JobContext): Promise<void> {
        const store = useMemoryStore.getState();
        const entities = await store.getAllEntities();

        // 简化实体信息，用于 Prompt 上下文
        const simplified = entities.map(e => ({
            name: e.name,
            type: e.type,
            aliases: e.aliases || []
        }));

        // 存入 Input 供 BuildPrompt 使用
        // 注意：BuildPrompt 需要配置变量映射，或者我们在这里直接替换？
        // 更好的方式是存入 config 或 input，然后 BuildPrompt 有逻辑去处理它
        // 这里我们约定存入 context.input.existingEntities
        context.input.existingEntities = JSON.stringify(simplified, null, 2);

        // 同时存入完整对象供 SaveEntity 使用 (消歧用)
        context.input._rawExistingEntities = entities;

        Logger.debug('FetchExistingEntities', `获取了 ${entities.length} 个现有实体`);
    }
}

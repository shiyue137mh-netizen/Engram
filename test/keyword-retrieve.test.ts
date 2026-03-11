import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KeywordRetrieveStep } from '../src/modules/workflow/steps/rag/KeywordRetrieveStep';
import { JobContext } from '../src/modules/workflow/core/JobContext';
import { useMemoryStore } from '../src/state/memoryStore';
import { SettingsManager } from '../src/config/settings';

// Mock tavern
vi.mock('@/integrations/tavern', () => ({
    getCurrentChatId: vi.fn(() => 'test_keyword_chat'),
}));

describe('KeywordRetrieveStep Integration', () => {
    let step: KeywordRetrieveStep;
    const TEST_CHAT_ID = 'test_keyword_chat';

    beforeEach(async () => {
        step = new KeywordRetrieveStep();
        
        // 初始化 Store 和 DB
        await useMemoryStore.getState().initChat();
        await useMemoryStore.getState().clearChatDatabase();

        // 默认配置
        vi.spyOn(SettingsManager, 'get').mockReturnValue({
            recallConfig: {
                useKeywordRecall: true,
                enableEntityKeyword: true,
                enableEventKeyword: true,
                keywordTopK: { entities: 10, events: 10 }
            }
        });
    });

    it('should retrieve entities even when there are no archived events (P0 Fix)', async () => {
        const store = useMemoryStore.getState();
        
        // 1. 准备数据：只有实体，没有归档事件
        await store.saveEntity({ name: '秋青子', type: 'char', description: '一位蛇娘秘书' });
        
        const context: JobContext = {
            id: 'test_wf',
            trigger: 'manual',
            config: {},
            input: { query: '秋青子是谁？' },
            metadata: { startTime: Date.now(), stepsExecuted: [] },
            data: {}
        };

        // 2. 执行步骤
        await step.execute(context);

        // 3. 验证结果
        expect(context.data.keywordEntityIds).toBeDefined();
        expect(context.data.keywordEntityIds.length).toBeGreaterThan(0);
        // 应该命中了“秋青子”
        const hit = context.data.keywordEntityIds.find((e: any) => e.score > 0.8);
        expect(hit).toBeDefined();
        
        expect(context.data.keywordCandidates.length).toBe(0); // 事件库为空，应该没有事件候选
    });

    it('should accurately match entities using lightweight index (P1 Fix)', async () => {
        const store = useMemoryStore.getState();
        
        // 准备两个实体，一个命中一个不命中
        await store.saveEntity({ name: '苹果', type: 'object', aliases: ['Apple'] });
        await store.saveEntity({ name: '香蕉', type: 'object' });
        
        const context: JobContext = {
            id: 'test_wf',
            trigger: 'manual',
            config: {},
            input: { query: '我想要一个 Apple' },
            metadata: { startTime: Date.now(), stepsExecuted: [] },
            data: {}
        };

        await step.execute(context);

        const entityNames = (context.data.keywordEntityIds as any[]).map(e => e.id); // 实际上存储的是 ID，这里简化验证存在性
        expect(context.data.keywordEntityIds.length).toBe(1);
    });
});

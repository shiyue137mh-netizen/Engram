import { describe, it, expect, vi, beforeEach } from 'vitest';
import { retriever } from '@/modules/rag/retrieval/Retriever';
import { getDbForChat } from '@/data/db';
import { useMemoryStore } from '@/state/memoryStore';
import { EmbeddingService, embeddingService } from '@/modules/rag/embedding/EmbeddingService';
import { SettingsManager } from '@/config/settings';
import { brainRecallCache } from '@/modules/rag/retrieval/BrainRecallCache';

// Mock Dependencies - 在 beforeEach 中定义监听器
let embedSpy: any;
let similaritySpy: any;
let setConfigSpy: any;

describe('Retrieval Lifecycle Integration', () => {
    const chatId = 'test_chat_retrieval';

    beforeEach(async () => {
        console.error('DEBUG: beforeEach started');
        
        // 重新初始化监听器以防止 vi.clearAllMocks() 洗掉计数值
        embedSpy = vi.spyOn(EmbeddingService.prototype, 'embed');
        similaritySpy = vi.spyOn(EmbeddingService.prototype, 'cosineSimilarity');
        setConfigSpy = vi.spyOn(EmbeddingService.prototype, 'setConfig');
        console.error('DEBUG: beforeEach spies initialized');

        vi.clearAllMocks();

        // 核心：模拟 window.SillyTavern.getContext
        window.SillyTavern = {
            getContext: vi.fn().mockReturnValue({
                chat: [],
                characters: [],
                characterId: 1,
                chatId: chatId
            })
        } as any;

        // Mock Settings
        vi.spyOn(SettingsManager, 'get').mockImplementation((key: string) => {
            console.log(`SettingsManager.get called for: ${key}`);
            if (key === 'apiSettings') {
                return {
                    recallConfig: {
                        enabled: true,
                        useEmbedding: true,
                        useRerank: true,
                        useKeywordRecall: true,
                        enableEntityKeyword: true,
                        enableEventKeyword: true,
                        embedding: {
                            topK: 5,
                            minScoreThreshold: 0.5
                        },
                        brainRecall: {
                            enabled: true,
                            workingLimit: 10,
                            shortTermLimit: 50,
                            contextSwitchThreshold: 0.3,
                            sigmoidTemperature: 0.25,
                            decayRate: 0.08,
                            reinforceFactor: 0.2,
                            maxDamping: 0.1
                        }
                    }
                };
            }
            return null;
        });

        // 初始化 Store
        const store = useMemoryStore.getState();
        await store.initChat();
        console.log('beforeEach: Store initialized');

        // 清理数据库
        const db = getDbForChat(chatId);
        await db.events.clear();
        await db.meta.clear();
        console.log('beforeEach: DB cleared');
        
        // 重置 BrainRecallCache
        brainRecallCache.hardReset();
        console.log('beforeEach: Finished');
    });

    it('should retrieve events via vector search and apply brain recall decay', async () => {
        console.error('DEBUG: it[retrieve events] started');
        const db = getDbForChat(chatId);

        // 1. 准备测试数据：保存两个事件
        try {
            await db.events.add({
                id: 'evt_A',
                summary: '艾莉丝在森林里慢跑。',
                embedding: [1, 0, 0],
                is_embedded: true,
                level: 0,
                significance_score: 0.5,
                structured_kv: { event: '运动', role: ['艾莉丝'], location: ['森林'], time_anchor: '', logic: [], causality: '' },
                source_range: { start_index: 1, end_index: 2 },
                is_archived: false
            } as any);

            await db.events.add({
                id: 'evt_B',
                summary: '由于天气太冷，艾莉丝回家喝热可可。',
                embedding: null,
                is_embedded: false,
                level: 0,
                significance_score: 0.3,
                structured_kv: { event: '休息', role: ['艾莉丝'], location: ['家'], time_anchor: '', logic: [], causality: '' },
                source_range: { start_index: 3, end_index: 4 },
                is_archived: true
            } as any);
            console.error('DEBUG: it[retrieve events] data seeded');
        } catch (e) {
            console.error('DEBUG: it[retrieve events] seeding FAILED', e);
            throw e;
        }

        // 2. 模拟 Embedding 行为
        embedSpy.mockResolvedValue([1, 0, 0]);
        // 模拟余弦相似度计算 (简单的点积模拟)
        similaritySpy.mockImplementation((a: number[], b: number[]) => {
            if (!a || !b) return 0;
            return a.reduce((sum, val, i) => sum + val * (b[i] || 0), 0);
        });

        // 3. 执行第一次检索
        console.error(`DEBUG: it[retrieve events] starting with retriever_ID=[${(retriever as any).instanceId}] embeddingService_ID=[${(embeddingService as any).instanceId}]`);
        console.error('DEBUG: it[retrieve events] calling retriever.search...');
        const result1 = await retriever.search('我在找关于跑步的事情');
        console.error('DEBUG: it[retrieve events] search finished', { count: result1.nodes.length });
        
        // 关键验证：setConfig 是否被正确调用
        expect(setConfigSpy).toHaveBeenCalled();
        
        expect(result1.nodes).toHaveLength(1);
        expect(result1.nodes[0].id).toBe('evt_A');
        
        const snapshot1 = brainRecallCache.getShortTermSnapshot();
        const slotA1 = snapshot1.find(s => s.id === 'evt_A');
        expect(slotA1).toBeDefined();
        const initialRerankStrength = slotA1!.rerankStrength;

        // 4. 执行第二次检索 (命中 B，导致 A 衰减)
        (embeddingService.embed as any).mockResolvedValue([0, 1, 0]);
         await retriever.search('聊聊喝可可');

        // 此时 evt_A 应该经历了 decaySlot 或 decayBomb
        const snapshot2 = brainRecallCache.getShortTermSnapshot();
        const slotA2 = snapshot2.find(s => s.id === 'evt_A');
        expect(slotA2).toBeDefined();
        // 直接验证强度值，避开 sigmoid 饱和后的精度残留问题
        expect(slotA2!.rerankStrength).toBeLessThan(initialRerankStrength);
    });

    it('should skip retrieval if no vectorized nodes exist (Cold Start protection)', async () => {
        // 数据库为空时
        const result = await retriever.search('任何查询');
        expect(result.skippedReason).toContain('跳过召回流程');
    });
});

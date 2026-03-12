import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useMemoryStore } from '@/state/memoryStore';
import { getCurrentDb } from '@/state/memory/slices/coreSlice';

// Mock tavern integration to return our test chat id
vi.mock('@/integrations/tavern', async () => {
    const actual = await vi.importActual('@/integrations/tavern') as any;
    return {
        ...actual,
        getCurrentChatId: vi.fn(() => 'test_batch_chat'),
    };
});

describe('MemoryStore Batch Operations', () => {
    const TEST_CHAT_ID = 'test_batch_chat';

    beforeEach(async () => {
        // 1. 初始化 Store 状态，模拟进入一个聊天会话
        await useMemoryStore.getState().initChat();
        
        // 2. 清理数据库
        await useMemoryStore.getState().clearChatDatabase();
    });

    // 移除 afterEach 中的 db.delete()，避免 DatabaseClosedError

    describe('Event Batch Updates', () => {
        it('should update multiple events in a single transaction', async () => {
            const store = useMemoryStore.getState();
            
            // 准备初始数据
            const event1 = await store.saveEvent({ summary: 'Old Event 1', level: 0, significance_score: 0.5 });
            const event2 = await store.saveEvent({ summary: 'Old Event 2', level: 0, significance_score: 0.6 });
            
            const updates = [
                { id: event1.id, updates: { summary: 'Updated Event 1', significance_score: 0.9 } },
                { id: event2.id, updates: { summary: 'Updated Event 2', significance_score: 0.1 } }
            ];
            
            // 执行批量更新
            await store.updateEvents(updates);
            
            // 验证结果
            const allEvents = await store.getAllEvents();
            const updated1 = allEvents.find(e => e.id === event1.id);
            const updated2 = allEvents.find(e => e.id === event2.id);
            
            expect(updated1?.summary).toBe('Updated Event 1');
            expect(updated1?.significance_score).toBe(0.9);
            expect(updated2?.summary).toBe('Updated Event 2');
            expect(updated2?.significance_score).toBe(0.1);
        });

        it('should handle empty update list gracefully', async () => {
            const store = useMemoryStore.getState();
            await expect(store.updateEvents([])).resolves.not.toThrow();
        });
    });

    describe('Entity Batch Updates', () => {
        it('should update multiple entities and refresh last_updated_at', async () => {
            const store = useMemoryStore.getState();
            
            // 准备初始数据
            const ent1 = await store.saveEntity({ name: 'Role A', type: 'char', description: 'Old Desc A' });
            const ent2 = await store.saveEntity({ name: 'Loc B', type: 'loc', description: 'Old Desc B' });
            
            const oldTime1 = ent1.last_updated_at;
            const oldTime2 = ent2.last_updated_at;
            
            // 稍等下确保时间戳会有变化
            await new Promise(resolve => setTimeout(resolve, 10));
            
            const updates = [
                { id: ent1.id, updates: { description: 'New Desc A' } },
                { id: ent2.id, updates: { description: 'New Desc B' } }
            ];
            
            // 执行批量更新
            await store.updateEntities(updates);
            
            // 验证结果
            const allEntities = await store.getAllEntities();
            const updated1 = allEntities.find(e => e.id === ent1.id);
            const updated2 = allEntities.find(e => e.id === ent2.id);
            
            expect(updated1?.description).toBe('New Desc A');
            expect(updated1!.last_updated_at).toBeGreaterThan(oldTime1);
            expect(updated2?.description).toBe('New Desc B');
            expect(updated2!.last_updated_at).toBeGreaterThan(oldTime2);
        });
    });
});

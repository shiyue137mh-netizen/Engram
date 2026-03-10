import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkflowEngine } from '@/modules/workflow/core/WorkflowEngine';
import { createSummaryWorkflow } from '@/modules/workflow/definitions/SummaryWorkflow';
import { getDbForChat } from '@/data/db';
import { useMemoryStore } from '@/state/memoryStore';

// Mock TavernHelper
const mockGenerate = vi.fn();
(global as any).window.TavernHelper = {
    generate: mockGenerate,
    generateRaw: mockGenerate,
};

describe('Memory Lifecycle Integration', () => {
    const chatId = 'test_chat_lifecycle';

    beforeEach(async () => {
        vi.clearAllMocks();

        // 核心：让 getCurrentChatId() 返回我们测试用的 chatId
        (window.SillyTavern.getContext as any).mockReturnValue({
            chat: [],
            characters: [],
            characterId: 1,
            chatId: chatId
        });

        // 初始化 Store
        const store = useMemoryStore.getState();
        await store.initChat();

        // 清理数据库
        const db = getDbForChat(chatId);
        await db.events.clear();
        await db.meta.clear();
    });

    it('should complete a full summary-to-persistence flow', async () => {
        // 1. 模拟 LLM 返回的 JSON
        const mockLlmResponse = JSON.stringify({
            events: [
                {
                    summary: '艾莉丝在集市发现了一块神秘的怀表。',
                    significance_score: 0.8,
                    meta: {
                        time_anchor: '上午',
                        role: ['艾莉丝'],
                        location: ['集市'],
                        event: '发现物品',
                        logic: ['剧情伏笔'],
                        causality: '获得关键道具'
                    }
                }
            ]
        });

        mockGenerate.mockResolvedValue(mockLlmResponse);

        // 2. 执行工作流
        const range: [number, number] = [1, 10];
        const workflow = createSummaryWorkflow();
        
        // 禁用 UserReview 以便全自动化运行
        const context = await WorkflowEngine.run(workflow, {
            input: { range },
            config: {
                previewEnabled: false, // 关键：跳过修订弹窗
                autoHide: false
            }
        });

        // 3. 验证执行路径
        expect(context.metadata.stepsExecuted).toContain('LlmRequest');
        expect(context.metadata.stepsExecuted).toContain('SaveEvent');

        // 4. 验证数据库持久化结果
        const db = getDbForChat(chatId);
        const events = await db.events.toArray();
        
        expect(events).toHaveLength(1);
        const savedEvent = events[0];
        
        expect(savedEvent.significance_score).toBe(0.8);
        expect(savedEvent.structured_kv.event).toBe('发现物品');
        expect(savedEvent.structured_kv.role).toContain('艾莉丝');
        
        // 验证 "Burned Summary" 格式 (在 SaveEvent.ts 中定义的格式)
        // 格式: 发现物品 (获得关键道具 | 剧情伏笔):
        // (上午 | 集市 | 艾莉丝) 艾莉丝在集市发现了一块神秘的怀表。
        expect(savedEvent.summary).toContain('发现物品');
        expect(savedEvent.summary).toContain('剧情伏笔');
        expect(savedEvent.summary).toContain('神秘的怀表');

        // 5. 验证元数据更新 (ChatManager 会将 ScopeState 整体存入 'scope_state' 键)
        const stateEntry = await db.meta.get('scope_state');
        expect(stateEntry?.value.last_summarized_floor).toBe(10);
    });

    it('should throw error if LLM returns invalid JSON', async () => {
        mockGenerate.mockResolvedValue('Invalid JSON Content');

        const range: [number, number] = [11, 20];
        const workflow = createSummaryWorkflow();

        await expect(WorkflowEngine.run(workflow, {
            input: { range },
            config: { previewEnabled: false }
        })).rejects.toThrow();
    });
});

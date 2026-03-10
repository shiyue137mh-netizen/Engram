import { describe, it, expect, vi, beforeEach } from 'vitest';
import { summarizerService } from '@/modules/memory/Summarizer';
import { getDbForChat } from '@/data/db';
import { useMemoryStore } from '@/state/memoryStore';
import { SettingsManager } from '@/config/settings';
import { reviewService } from '@/core/events/ReviewBridge';
import { llmAdapter } from '@/integrations/llm/Adapter';
import { WorkflowEngine } from '@/modules/workflow/core/WorkflowEngine';

// Mock Dependencies
vi.mock('@/integrations/llm/Adapter', () => ({
    llmAdapter: {
        generate: vi.fn(),
        generateRaw: vi.fn()
    }
}));

vi.mock('@/core/events/ReviewBridge', () => ({
    reviewService: {
        requestReview: vi.fn()
    }
}));

describe('Workflow Precision & Edge Cases', () => {
    const chatId = 'test_chat_precision';

    beforeEach(async () => {
        vi.clearAllMocks();

        // 核心：设置 ST Context
        (window.SillyTavern.getContext as any).mockReturnValue({
            chat: new Array(20).fill({ mes: 'hello' }), // 模拟 20 楼
            characters: [],
            characterId: 1,
            chatId: chatId
        });

        // Mock Settings
        vi.spyOn(SettingsManager, 'get').mockImplementation((key: string) => {
            if (key === 'summarizerConfig') {
                return {
                    enabled: true,
                    floorInterval: 10,
                    previewEnabled: true,
                    bufferSize: 0
                };
            }
            if (key === 'apiSettings') {
                return {
                    recallConfig: { enabled: true }
                };
            }
            return null;
        });

        // 初始化 Store 和 Service
        const store = useMemoryStore.getState();
        await store.initChat();
        await summarizerService.initializeForCurrentChat();

        // 清理数据库
        const db = getDbForChat(chatId);
        await db.events.clear();
        await db.meta.clear();
    });

    /**
     * Case 1: 模拟楼层触发逻辑
     */
    it('should trigger summary when floor interval is reached', async () => {
        // 确保配置同步
        summarizerService.updateConfig({
            enabled: true,
            floorInterval: 10
        });

        // 模拟 LLM 响应
        (llmAdapter.generate as any).mockResolvedValue({
            success: true,
            content: '{"events": [{"summary": "自动触发的事件", "meta": {"event": "测试"}}]}'
        });

        const triggerSpy = vi.spyOn(summarizerService, 'triggerSummary');
        
        await (summarizerService as any).handleMessageReceived();
        
        expect(triggerSpy).toHaveBeenCalled();
    });

    /**
     * Case 2: 模拟楼层回滚 (用户删消息)
     */
    it('should handle floor rollback (current < last)', async () => {
        const db = getDbForChat(chatId);
        await db.meta.put({ key: 'scope_state', value: { last_summarized_floor: 50 } });
        
        await summarizerService.initializeForCurrentChat();
        const status = summarizerService.getStatus();
        
        // current (20) < last (50)
        expect(status.pendingFloors).toBe(0);
        
        // 触发消息接收，不应触发总结
        const triggerSpy = vi.spyOn(summarizerService, 'triggerSummary');
        await (summarizerService as any).handleMessageReceived();
        expect(triggerSpy).not.toHaveBeenCalled();
    });

    /**
     * Case 3: 模拟 UserReview - 各种动作
     */
    it('should handle UserReview actions: Reroll and Reject', async () => {
        // 模拟 LLM 响应
        (llmAdapter.generate as any).mockResolvedValue({
            success: true,
            content: '{"events": [{"summary": "测试事件", "meta": {"event": "测试事件"}}]}'
        });
        
        // 1. 测试 Reroll (重抽)
        (reviewService.requestReview as any).mockResolvedValueOnce({
            action: 'reroll',
            content: '旧内容'
        });

        // 模拟第二次 LLM 响应 (重抽后)
        (llmAdapter.generate as any).mockResolvedValueOnce({
            success: true,
            content: '{"events": [{"summary": "重抽后的事件", "meta": {"event": "重抽后的事件"}}]}'
        });
        // 第二次 review 模拟 confirm
        (reviewService.requestReview as any).mockResolvedValueOnce({
            action: 'confirm',
            content: '{"events": [{"summary": "重抽后的事件", "meta": {"event": "重抽后的事件"}}]}'
        });

        const result = await summarizerService.triggerSummary(true, [1, 5]);
        
        // 验证流程：触发了两次 generate (初始 + 重抽)
        expect(llmAdapter.generate).toHaveBeenCalledTimes(2);
        // 验证最后保存的数据
        const db = getDbForChat(chatId);
        const events = await db.events.toArray();
        expect(events[0].summary).toContain('重抽后的事件');

        // 2. 测试 Reject (打回带反馈)
        await db.events.clear();
        vi.clearAllMocks();
        (llmAdapter.generate as any).mockResolvedValue({
            success: true,
            content: '{"events": [{"summary": "初始内容", "meta": {"event": "初始内容"}}]}'
        });
        
        (reviewService.requestReview as any).mockResolvedValueOnce({
            action: 'reject',
            content: '初始内容',
            feedback: '写得太简单了，加点细节'
        });
        
        (reviewService.requestReview as any).mockResolvedValueOnce({
            action: 'confirm',
            content: '{"events": [{"summary": "有细节的内容", "meta": {"event": "有细节的内容"}}]}'
        });

        await summarizerService.triggerSummary(true, [6, 10]);

        // 验证反馈是否传递到了 Prompt 构建 (检查产生第二次调用的 context.input.feedback)
        // 这里我们很难直接查 context，但可以验证 LLM 被调用了两次
        expect(llmAdapter.generate).toHaveBeenCalledTimes(2);
        const eventsAfterReject = await db.events.toArray();
        expect(eventsAfterReject[0].summary).toContain('有细节的内容');
    });

    /**
     * Case 4: 模拟取消信号 (Cancel Signal)
     */
    it('should abort workflow when cancel signal is received', async () => {
        // 模拟一个很慢的步骤或者直接在执行中途修改信号
        // 我们利用 UserReview 抛出 UserCancelled 的特性
        (llmAdapter.generate as any).mockResolvedValue({
            success: true,
            content: '{}'
        });
        (reviewService.requestReview as any).mockResolvedValue({
            action: 'cancel'
        });

        const result = await summarizerService.triggerSummary(true, [1, 5]);
        
        expect(result).toBeNull(); // 应该返回 null
        // 数据库不应有新数据
        const db = getDbForChat(chatId);
        const events = await db.events.toArray();
        expect(events).toHaveLength(0);
    });

    /**
     * Case 5: 模拟内容为空的边缘情况
     */
    it('should handle empty LLM response gracefully', async () => {
        (llmAdapter.generate as any).mockResolvedValue({
            content: '',
            success: true
        }); // 返回空内容
        
        const result = await summarizerService.triggerSummary(true, [1, 5]);
        
        expect(result).toBeNull();
        // 验证是否报错（捕获了 Error 并在 Summarizer 里处理了）
        // 可以通过检查通知或者日志，但在集成测试中我们主要看返回值和副作用
    });
});

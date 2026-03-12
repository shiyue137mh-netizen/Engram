import { describe, expect, it, vi, beforeEach } from 'vitest';
import { VectorRetrieveStep } from '@/modules/workflow/steps/rag/VectorRetrieveStep';

// 1. 定义 Mock 函数 (Vite requires vi.hoisted if referenced in factory)
const { embedMock } = vi.hoisted(() => ({
    embedMock: vi.fn().mockResolvedValue([0.1, 0.2, 0.3])
}));

// 2. 模拟依赖项
vi.mock('@/modules/rag/embedding/EmbeddingService', () => ({
    embeddingService: {
        embed: embedMock,
        setConfig: vi.fn(),
        cosineSimilarity: vi.fn()
    }
}));

vi.mock('@/data/db', () => ({
    tryGetDbForChat: vi.fn().mockReturnValue({
        events: {
            filter: () => ({
                toArray: () => Promise.resolve([
                    { id: 'ev1', embedding: [1, 2, 3], summary: 'test' }
                ])
            })
        }
    })
}));

vi.mock('@/integrations/tavern', () => ({
    getCurrentChatId: () => 'test-chat'
}));

// 模拟 SettingsManager 以绕过配置检查
vi.mock('@/config/settings', () => ({
    SettingsManager: {
        get: (key: string) => {
            if (key === 'apiSettings') return {
                vectorConfig: { model: 'test' }
            };
            return {};
        }
    }
}));

describe('VectorRetrieveStep: Truncation logic', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should truncate fallback query from chat history to 300 chars', async () => {
        const step = new VectorRetrieveStep();
        const longText = 'A'.repeat(500);
        const context: any = {
            input: { query: longText },
            data: {
                recallConfig: { 
                    enabled: true, 
                    embedding: { topK: 5 } // 关键配置
                }
            },
            metadata: {}
        };

        await step.execute(context);
        
        expect(embedMock).toHaveBeenCalled();
        const calledArg = embedMock.mock.calls[0][0];
        expect(calledArg.length).toBe(303);
        expect(calledArg.endsWith('...')).toBe(true);
    });

    it('should truncate extracted unified query to 500 chars', async () => {
        const step = new VectorRetrieveStep();
        const longText = 'B'.repeat(1000);
        const context: any = {
            input: { query: 'irrelevant', unifiedQueries: [longText] },
            data: {
                recallConfig: { 
                    enabled: true, 
                    embedding: { topK: 5 }
                }
            },
            metadata: {}
        };

        await step.execute(context);
        
        expect(embedMock).toHaveBeenCalled();
        const calledArg = embedMock.mock.calls[0][0];
        expect(calledArg.length).toBe(503);
        expect(calledArg.endsWith('...')).toBe(true);
    });
});

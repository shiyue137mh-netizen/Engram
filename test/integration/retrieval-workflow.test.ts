import { describe, expect, it, vi } from 'vitest';
import { WorkflowEngine } from '@/modules/workflow/core/WorkflowEngine';
import { createRetrievalWorkflow } from '@/modules/workflow/definitions/RetrievalWorkflow';

// Mocks
vi.mock('@/integrations/tavern', () => ({
    getCurrentChatId: () => 'test-chat-id'
}));

vi.mock('@/data/db', () => {
    const mockEvents = [
        {
            id: 'evt_1',
            summary: 'test event 1',
            embedding: [0.1, 0.2],
            structured_kv: { role: [], location: [], event: 'evt_1' },
            is_archived: 1
        },
        {
            id: 'evt_2',
            summary: 'test event 2',
            embedding: [0.3, 0.4],
            structured_kv: { role: [], location: [], event: 'evt_2' },
            is_archived: 1
        }
    ];

    const createMockTable = (data: any[]) => ({
        filter: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue(data),
        toCollection: vi.fn().mockReturnThis(),
        each: vi.fn().mockImplementation(async (callback) => {
            for (const item of data) {
                await callback(item);
            }
        }),
        where: vi.fn().mockReturnThis(),
        equals: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        count: vi.fn().mockResolvedValue(data.length)
    });

    return {
        tryGetDbForChat: () => ({
            events: createMockTable(mockEvents),
            entities: createMockTable([])
        })
    };
});

vi.mock('@/modules/rag/embedding/EmbeddingService', () => ({
    embeddingService: {
        embed: vi.fn().mockResolvedValue([0.1, 0.2]),
        setConfig: vi.fn(),
        computeNorm: vi.fn().mockReturnValue(1),
        cosineSimilarity: vi.fn().mockImplementation((a, b) => {
            if (b[0] === 0.1) return 0.9;
            return 0.5;
        })
    }
}));

vi.mock('@/modules/rag/retrieval/Reranker', () => ({
    rerankService: {
        rerank: vi.fn().mockResolvedValue([
            { id: 'evt_1', score: 0.95 },
            { id: 'evt_2', score: 0.85 }
        ]),
        isEnabled: vi.fn().mockReturnValue(true),
        isReady: vi.fn().mockResolvedValue(true)
    }
}));

vi.mock('@/core/logger/RecallLogger', () => ({
    RecallLogService: {
        log: vi.fn()
    }
}));

vi.mock('@/config/settings', () => ({
    SettingsManager: {
        get: vi.fn().mockImplementation((key) => {
            if (key === 'apiSettings') return {
                recallConfig: {
                    enabled: true,
                    useEmbedding: true,
                    useRerank: true,
                    embedding: { topK: 5, minScoreThreshold: 0.1 },
                    rerank: { topK: 3, minScoreThreshold: 0.1 },
                    brainRecall: { enabled: true, workingLimit: 5, shortTermLimit: 15 }
                },
                vectorConfig: { enabled: true }
            };
            return undefined;
        })
    }
}));

describe('RetrievalWorkflow Data Flow Integration POC', () => {
    it('should complete the RAG workflow pipeline successfully (Vector -> Rerank -> Brain -> Log)', async () => {
        const workflow = createRetrievalWorkflow();

        // Mock default RAG config
        const recallConfig = {
            enabled: true,
            useEmbedding: true,
            useRerank: true,
            embedding: { topK: 5, minScoreThreshold: 0.1 },
            rerank: { topK: 3, minScoreThreshold: 0.1 },
            brainRecall: { enabled: true, workingLimit: 5, shortTermLimit: 15 }
        };

        const context = await WorkflowEngine.run(workflow, {
            id: 'test_job_1',
            trigger: 'auto',
            config: {},
            metadata: { startTime: Date.now(), stepsExecuted: [] },
            input: {
                query: 'test query content',
                unifiedQueries: ['test query'],
                mode: 'hybrid'
            },
            data: {
                recallConfig,
                vectorRetrieveStartTime: Date.now()
            }
        });

        // Verify Data Pipeline
        expect(context.metadata.stepsExecuted.length).toBe(5);
        expect(context.metadata.stepsExecuted).toEqual([
            'KeywordRetrieveStep',
            'VectorRetrieveStep',
            'RerankMergeStep',
            'BrainRecallStep',
            'RecordRecallLogStep'
        ]);

        // Output format matched Retriever implementation
        expect(context.output).toBeDefined();
        expect(Array.isArray(context.output.entries)).toBe(true);
        expect(Array.isArray(context.output.nodes)).toBe(true);
        expect(Array.isArray(context.output.candidates)).toBe(true);

        // Expect evt_1 to be retrieved and favored by mocked scores
        expect(context.output.candidates.length).toBeGreaterThan(0);
        expect(context.output.candidates[0].id).toBe('evt_1');
    });
});

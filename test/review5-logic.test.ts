import { describe, expect, it, vi, beforeEach } from 'vitest';
import { SaveEntity } from '../src/modules/workflow/steps/persistence/SaveEntity';

// 直接定义 Mock 函数以便在外部引用
const saveEntityMock = vi.fn().mockImplementation(e => Promise.resolve({ ...e, id: 'new-id' }));
const updateEntityMock = vi.fn().mockResolvedValue(undefined);

vi.mock('@/state/memoryStore', () => ({
    useMemoryStore: {
        getState: () => ({
            getAllEntities: async () => [
                { id: '1', name: 'Alina', aliases: [], profile: { age: 18 }, type: 'char' }
            ],
            saveEntity: saveEntityMock,
            updateEntity: updateEntityMock,
            updateEvents: vi.fn(),
            updateEntities: vi.fn()
        })
    }
}));

describe('CI Review 5: Logic Fixes', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should merge instead of creating duplicate entity (SaveEntity P0)', async () => {
        const step = new SaveEntity();
        const context: any = {
            input: {},
            parsedData: {
                patches: [
                    { op: 'add', path: '/entities/Alina', value: { type: 'char', profile: { mood: 'happy' } } }
                ]
            },
            config: { dryRun: false }
        };

        await step.execute(context);

        // 验证没有调用 saveEntity (创建)
        expect(saveEntityMock).not.toHaveBeenCalled();
        
        // 验证调用了 updateEntity (合并)
        // 注意：由于 profile 是合并的，所以断言需要匹配合并后的结果
        expect(updateEntityMock).toHaveBeenCalledWith('1', expect.objectContaining({
            name: 'Alina',
            profile: expect.objectContaining({ mood: 'happy' })
        }));
    });

    it('should handle case-insensitive duplication (SaveEntity P0)', async () => {
        const step = new SaveEntity();
        const context: any = {
            input: {},
            parsedData: {
                patches: [
                    { op: 'add', path: '/entities/alina', value: { type: 'char' } }
                ]
            },
            config: { dryRun: false }
        };

        await step.execute(context);

        expect(saveEntityMock).not.toHaveBeenCalled();
        expect(updateEntityMock).toHaveBeenCalled();
    });
});

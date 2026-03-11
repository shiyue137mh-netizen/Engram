import { beforeEach, describe, expect, it, vi } from 'vitest';
import { syncService } from '../src/data/sync/SyncService';

// Mock Tavern
vi.mock('@/integrations/tavern', () => ({
    getSTContext: vi.fn(() => ({ chatId: 'test_sync' })),
    getRequestHeaders: vi.fn(() => ({})),
    TavernEventType: { CHAT_CHANGED: 'chat_changed' },
    EventBus: { on: vi.fn() }
}));

// 手动 Mock DOM 核心对象 (Node 环境兼容)
if (typeof global.document === 'undefined') {
    (global as any).document = {
        addEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        visibilityState: 'visible'
    };
    (global as any).Event = class { type: string; constructor(type: string) { this.type = type; } };
}

// Mock FileReader
class MockFileReader {
    result: any;
    onload: any;
    readAsDataURL(blob: Blob) {
        setTimeout(() => {
            this.result = 'data:application/json;base64,VEVTVF9CQVNFNjQ=';
            this.onload();
        }, 10);
    }
}
(global as any).FileReader = MockFileReader;
(global as any).Blob = class { content: any[]; constructor(content: any[]) { this.content = content; } };

describe('SyncService Performance & Sensitivity', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        (global as any).fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ meta: { lastModified: Date.now() }, events: [], entities: [] }),
            text: async () => 'ok'
        });
    });

    it('should use non-blocking FileReader for upload (P0 Fix)', async () => {
        const uploadPromise = syncService.upload('test_chat');
        expect(uploadPromise).toBeInstanceOf(Promise);
        
        const result = await uploadPromise;
        expect(result).toBe(true);
        expect(global.fetch).toHaveBeenCalled();
        
        const call = (global.fetch as any).mock.calls[0];
        const body = JSON.parse(call[1].body);
        expect(body.data).toBe('VEVTVF9CQVNFNjQ=');
    });

    it('should register visibilitychange listener (P1 Fix)', async () => {
        // 验证 initEventListeners 是否调用了 addEventListener
        expect(document.addEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    });
});

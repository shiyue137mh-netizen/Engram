import { EventBus, TavernEventType } from '../../infrastructure/tavern';

export interface RevisionRequest {
    title: string;
    description: string;
    content: string;
    onConfirm: (newContent: string) => void;
    onCancel: () => void;
}

/**
 * RevisionService - 负责处理内容修订请求
 * 
 * 解耦 UI (Modal) 和 业务逻辑 (Summarizer)
 */
export class RevisionService {
    /**
     * 请求用户修订内容
     * @returns Promise<string> 用户确认后的新内容
     * @throws Error 如果用户取消
     */
    public async requestRevision(title: string, description: string, content: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            EventBus.emit(TavernEventType.ENGRAM_REQUEST_REVISION, {
                title,
                description,
                content,
                onConfirm: (newContent: string) => resolve(newContent),
                onCancel: () => reject(new Error('User cancelled revision')),
            } as RevisionRequest);
        });
    }
}

export const revisionService = new RevisionService();

import { EventBus, TavernEventType } from "@/integrations/tavern/api";


export type RevisionAction = 'confirm' | 'skip' | 'reject';

interface RevisionRequest {
    title: string;
    description: string;
    content: string;
    actions?: RevisionAction[]; // 允许的动作列表，默认 ['confirm', 'cancel'] -> 现在扩展为 ['confirm', 'skip', 'reject']
    onResult: (result: { action: RevisionAction; content: string; feedback?: string }) => void;
}

/**
 * RevisionService - 负责处理内容修订请求
 *
 * 解耦 UI (Modal) 和 业务逻辑 (Summarizer)
 */
class RevisionService {
    /**
     * 请求用户修订内容
     * @returns Promise
     */
    public async requestRevision(
        title: string,
        description: string,
        content: string,
        actions: RevisionAction[] = ['confirm']
    ): Promise<{ action: RevisionAction; content: string; feedback?: string }> {
        return new Promise((resolve) => {
            EventBus.emit(TavernEventType.ENGRAM_REQUEST_REVISION, {
                title,
                description,
                content,
                actions,
                onResult: (result) => resolve(result),
            } as RevisionRequest);
        });
    }
}

export const revisionService = new RevisionService();

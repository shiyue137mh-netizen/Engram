import { EventBus, TavernEventType } from "@/integrations/tavern";


export type ReviewAction = 'confirm' | 'fill' | 'reject' | 'reroll' | 'cancel';

export interface ReviewRequest {
    id: string; // V1.3.1: Unique ID for multi-tab support
    title: string;
    description: string;
    content: string; // Fallback text
    type?: 'text' | 'json' | 'entity' | 'summary'; // V1.2
    data?: any; // Structured data for specialized views
    actions?: ReviewAction[];
    onResult: (result: { action: ReviewAction; content: string; feedback?: string; data?: any }) => void;
}

/**
 * ReviewService - 负责处理内容审查请求
 *
 * 解耦 UI (Modal) 和 业务逻辑 (Summarizer)
 */
class ReviewService {
    /**
     * 请求用户审查内容
     * @returns Promise
     */
    public async requestReview(
        title: string,
        description: string,
        content: string,
        actions: ReviewAction[] = ['confirm'],
        type: 'text' | 'json' | 'entity' | 'summary' = 'text',
        data?: any
    ): Promise<{ action: ReviewAction; content: string; feedback?: string; data?: any }> {
        return new Promise((resolve) => {
            const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
            EventBus.emit(TavernEventType.ENGRAM_REQUEST_REVIEW, {
                actions,
                content,
                data,
                description,
                id,
                onResult: (result) => resolve(result),
                title,
                type,
            } as ReviewRequest);
        });
    }
}

export const reviewService = new ReviewService();

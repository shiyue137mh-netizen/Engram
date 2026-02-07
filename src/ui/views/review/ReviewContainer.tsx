import { ReviewAction, ReviewRequest } from '@/core/events/ReviewBridge';
import { EventBus } from '@/integrations/tavern/api'; // EventBus is from events.ts, tavern/api exports it
import { TavernEventType } from '@/integrations/tavern/events';
import { ModernButton as Button } from '@/ui/components/core/Button';
import { AlertTriangle, ArrowDownToLine, Check, Layers, Minus, RefreshCw, RotateCcw, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { EntityReview } from './EntityReview';
import { MessageReview } from './MessageReview';
import { SummaryReview } from './SummaryReview'; // V1.2

// --- Sub-component: ReviewSession ---
// Encapsulates state and logic for a SINGLE review request
interface ReviewSessionProps {
    request: ReviewRequest;
    isActive: boolean;
    onFinish: (requestId: string) => void;
}

const ReviewSession: React.FC<ReviewSessionProps> = ({ request, isActive, onFinish }) => {
    // Independent state for this session
    const [content, setContent] = useState(request.content);
    const [data, setData] = useState<any>(request.data);
    const [query, setQuery] = useState<string | undefined>(request.data?.query);

    // Reject Feedback State
    const [feedback, setFeedback] = useState('');
    const [showFeedbackInput, setShowFeedbackInput] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAction = (action: ReviewAction) => {
        if (action === 'reject' && !showFeedbackInput) {
            setShowFeedbackInput(true);
            return;
        }

        setIsProcessing(true);

        const resultData = query !== undefined ? { ...data, query } : data;
        request.onResult({
            action,
            content,
            data: resultData,
            feedback: action === 'reject' ? feedback : undefined
        });

        // Notify parent to remove this session
        onFinish(request.id);
    };

    // Keep mounted but hidden if not active to preserve state
    const displayStyle = isActive ? { display: 'flex' } : { display: 'none' };

    return (
        <div className="flex flex-col h-full w-full" style={displayStyle}>
            {/* Header (Session Info) - Optional, can be merged into Tab bar or kept here */}
            {request.description && (
                <div className="px-5 py-2 border-b border-border bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
                    <span>{request.description}</span>
                    <span className="uppercase border border-border px-1 rounded bg-background">{request.type}</span>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-background/50 custom-scrollbar">
                {showFeedbackInput ? (
                    <div className="flex flex-col h-full gap-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-3">
                            <AlertTriangle className="text-destructive shrink-0" />
                            <div>
                                <h4 className="font-medium text-destructive">准备打回重写</h4>
                                <p className="text-xs text-destructive/80">请输入修改意见，AI 将根据您的反馈重新生成。</p>
                            </div>
                        </div>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="flex-1 w-full min-h-[150px] p-4 bg-muted border border-border rounded-md focus:ring-2 focus:ring-destructive resize-none"
                            placeholder="例如：请不要引入新人物..."
                            autoFocus
                        />
                    </div>
                ) : (
                    request.type === 'entity' ? (
                        <EntityReview
                            data={data || { newEntities: [], updatedEntities: [] }}
                            onChange={(newData) => setData(newData)}
                        />
                    ) : request.type === 'summary' ? (
                        <SummaryReview
                            content={content}
                            data={data}
                            onChange={(newContent, newData) => { setContent(newContent); setData(newData); }}
                        />
                    ) : (
                        <MessageReview
                            content={content}
                            onChange={(newContent) => setContent(newContent)}
                            query={query}
                            onQueryChange={query !== undefined ? setQuery : undefined}
                        />
                    )
                )}
            </div>

            {/* Footer / Action Bar */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-4 py-4 sm:px-5 border-t border-border bg-muted/30 gap-4 sm:gap-0">
                <div className="flex gap-2 w-full sm:w-auto">
                    {showFeedbackInput ? (
                        <Button label="返回" onClick={() => setShowFeedbackInput(false)} className="w-full sm:w-auto" />
                    ) : (
                        request.actions?.includes('fill') && (
                            <Button label="填充" icon={ArrowDownToLine} onClick={() => handleAction('fill')} className="text-muted-foreground hover:text-foreground w-full sm:w-auto" />
                        )
                    )}
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    {showFeedbackInput ? (
                        <Button label="提交打回" icon={RotateCcw} onClick={() => handleAction('reject')} disabled={!feedback.trim()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto" />
                    ) : (
                        <>
                            {request.actions?.includes('reject') && <Button label="打回" icon={RotateCcw} onClick={() => handleAction('reject')} className="text-destructive hover:bg-destructive/10 border-destructive/30 flex-1 sm:flex-none" />}
                            {request.actions?.includes('reroll') && <Button label="重抽" icon={RefreshCw} onClick={() => handleAction('reroll')} className="flex-1 sm:flex-none" />}
                            {request.actions?.includes('confirm') && <Button label="确认" icon={Check} primary onClick={() => handleAction('confirm')} className="min-w-[100px] flex-1 sm:flex-none" />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Container ---
export const ReviewContainer: React.FC = () => {
    const [requests, setRequests] = useState<ReviewRequest[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const unsubscribe = EventBus.on(
            TavernEventType.ENGRAM_REQUEST_REVIEW,
            (payload: unknown) => {
                const req = payload as ReviewRequest;
                // Ensure ID exists (fallback for old callers though we updated Bridge)
                if (!req.id) req.id = Date.now().toString();

                setRequests(prev => {
                    const exists = prev.find(r => r.id === req.id);
                    if (exists) return prev;
                    return [...prev, req];
                });

                // If it's the first one, activate it
                setActiveId(current => current || req.id);
                setIsMinimized(false);
            }
        );
        return () => { unsubscribe(); };
    }, []);

    const handleSessionFinish = (finishedId: string) => {
        setRequests(prev => {
            const next = prev.filter(r => r.id !== finishedId);
            // If we removed the active one, switch to another if available
            if (activeId === finishedId) {
                const nextActive = next.length > 0 ? next[0].id : null;
                setActiveId(nextActive);
            }
            return next;
        });
    };

    const handleRestore = () => setIsMinimized(false);

    // Render Logic
    if (requests.length === 0) return null;

    // Minimized Badge
    if (isMinimized) {
        return ReactDOM.createPortal(
            <div className="engram-app-root" style={{ display: 'contents' }}>
                <div className="fixed bottom-4 right-4 z-[9999] animate-in zoom-in slide-in-from-bottom-4 pointer-events-auto">
                    <button
                        onClick={handleRestore}
                        className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground shadow-lg rounded-full hover:scale-105 transition-transform font-medium border-2 border-primary-foreground/20"
                    >
                        <Layers size={18} className="animate-pulse" />
                        <span>待处理 ({requests.length})</span>
                    </button>
                </div>
            </div>,
            document.body
        );
    }

    return ReactDOM.createPortal(
        <div className="engram-app-root" style={{ display: 'contents' }}>
            <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 pointer-events-auto">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" />

                <div className="relative w-full max-w-4xl bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[90vh] min-h-[500px] animate-in zoom-in-95 border-t-4 border-t-primary">

                    {/* Top Bar: Tabs & Window Controls */}
                    <div className="flex items-center justify-between px-2 pt-2 border-b border-border bg-muted/40">
                        {/* Tabs Scroll Area */}
                        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 pr-4">
                            {requests.map(req => {
                                const isActive = req.id === activeId;
                                return (
                                    <button
                                        key={req.id}
                                        onClick={() => setActiveId(req.id)}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-md transition-colors border-t border-x mb-[-1px]
                                            ${isActive
                                                ? 'bg-popover border-border text-foreground border-b-transparent z-10'
                                                : 'bg-muted/50 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/80'}
                                        `}
                                    >
                                        <span className="truncate max-w-[120px]">{req.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Window Controls */}
                        <div className="flex items-center gap-1 mb-1 px-2">
                            <button onClick={() => setIsMinimized(true)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors" title="最小化">
                                <Minus size={16} />
                            </button>
                            <button
                                onClick={() => {
                                    if (activeId) {
                                        // Cancel active request
                                        const req = requests.find(r => r.id === activeId);
                                        if (req) {
                                            req.onResult({ action: 'cancel', content: '', data: req.data });
                                            handleSessionFinish(activeId);
                                        }
                                    }
                                }}
                                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                title="关闭/取消当前"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Sessions Area */}
                    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
                        {requests.map(req => (
                            <ReviewSession
                                key={req.id}
                                request={req}
                                isActive={req.id === activeId}
                                onFinish={handleSessionFinish}
                            />
                        ))}
                        {/* Empty State (Shouldn't happen if logic is correct) */}
                        {requests.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                <Check size={48} className="mb-2 opacity-20" />
                                <p>所有任务已完成</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

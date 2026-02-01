import { ReviewAction, ReviewRequest } from '@/core/events/ReviewBridge';
import { EventBus } from '@/integrations/tavern/api'; // EventBus is from events.ts, tavern/api exports it
import { TavernEventType } from '@/integrations/tavern/events';
import { ModernButton as Button } from '@/ui/components/core/Button';
import { AlertTriangle, ArrowDownToLine, Check, Minus, RefreshCw, RotateCcw, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { EntityReview } from './EntityReview';
import { MessageReview } from './MessageReview';
import { SummaryReview } from './SummaryReview'; // V1.2

export const ReviewContainer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [request, setRequest] = useState<ReviewRequest | null>(null);

    // State for edited content/data
    const [content, setContent] = useState('');
    const [data, setData] = useState<any>(undefined);

    // State for Reject Feedback
    const [feedback, setFeedback] = useState('');
    const [showFeedbackInput, setShowFeedbackInput] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // Subscribe to review requests
        const unsubscribe = EventBus.on(
            TavernEventType.ENGRAM_REQUEST_REVIEW,
            (payload: unknown) => {
                const req = payload as ReviewRequest;
                setRequest(req);
                setContent(req.content);
                setData(req.data);

                // Reset states
                setFeedback('');
                setShowFeedbackInput(false);
                setIsMinimized(false);
                setIsOpen(true);
                setIsProcessing(false);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const handleAction = (action: ReviewAction) => {
        if (!request) return;

        // "Reject" needs feedback input locally first
        if (action === 'reject' && !showFeedbackInput) {
            setShowFeedbackInput(true);
            return;
        }

        setIsProcessing(true); // Disable buttons

        // Construct result
        request.onResult({
            action,
            content: content,
            data: data,
            feedback: action === 'reject' ? feedback : undefined
        });

        // Close UI
        setIsOpen(false);
        setRequest(null);
    };

    // "Minimize" - hide window but keep request pending
    const handleMinimize = () => {
        setIsMinimized(true);
    };

    // "Restore" - show window
    const handleRestore = () => {
        setIsMinimized(false);
    };

    if (!isOpen || !request) return null;

    // Render Minimized Badge (Floating Action Button style)
    if (isMinimized) {
        return ReactDOM.createPortal(
            <div className="engram-app-root" style={{ display: 'contents' }}>
                <div className="fixed bottom-4 right-4 z-[9999] pointer-events-auto animate-in zoom-in slide-in-from-bottom-4">
                    <button
                        onClick={handleRestore}
                        className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground shadow-lg rounded-full hover:scale-105 transition-transform font-medium border-2 border-primary-foreground/20"
                    >
                        <AlertTriangle size={18} className="animate-pulse" />
                        <span>待处理审查 ({request.title})</span>
                    </button>
                </div>
            </div>,
            document.body
        );
    }

    // Render Full Modal
    return ReactDOM.createPortal(
        <div className="engram-app-root" style={{ display: 'contents' }}>
            <div
                className="fixed inset-0 z-[11000] flex items-center justify-center p-4"
                style={{ height: '100dvh', width: '100vw', pointerEvents: 'auto' }} // Ensure clicks work
            >
                {/* Backdrop - Click does NOT close anymore (safety) */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" />

                {/* Main Window */}
                <div className="relative w-full max-w-4xl bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 border-t-4 border-t-primary">

                    {/* Header */}
                    <div className="flex items-start justify-between p-5 border-b border-border bg-muted/10">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                                {request.title}
                                <span className="text-[10px] font-normal px-1.5 py-0.5 rounded border border-border bg-background text-muted-foreground uppercase">
                                    {request.type}
                                </span>
                            </h3>
                            {request.description && (
                                <p className="text-sm text-muted-foreground">
                                    {request.description}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-1 -mr-2">
                            {/* Minimize Button */}
                            <button
                                onClick={handleMinimize}
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                                title="最小化 (稍后处理)"
                            >
                                <Minus size={18} />
                            </button>
                            {/* Close (Cancel) Button */}
                            {request.actions?.includes('cancel') && (
                                <button
                                    onClick={() => handleAction('cancel')}
                                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                    title="取消"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-5 overflow-y-auto bg-background/50">
                        {showFeedbackInput ? (
                            <div className="flex flex-col h-full gap-4 animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-3">
                                    <AlertTriangle className="text-destructive shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-destructive">准备打回重写</h4>
                                        <p className="text-xs text-destructive/80">请提供具体的修改建议，以便 AI 更好地修正。</p>
                                    </div>
                                </div>
                                <label className="text-sm font-medium">修改意见：</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="flex-1 w-full min-h-[150px] p-4 bg-muted border border-border rounded-md font-sans text-sm focus:outline-none focus:ring-2 focus:ring-destructive resize-none"
                                    placeholder="例如：请不要引入新人物，专注于描写环境..."
                                    autoFocus
                                />
                            </div>
                        ) : (
                            // Determine View based on Type
                            request.type === 'entity' ? (
                                <EntityReview
                                    data={data || { newEntities: [], updatedEntities: [] }}
                                    onChange={(newData) => setData(newData)}
                                />
                            ) : request.type === 'summary' ? (
                                <SummaryReview
                                    content={content}
                                    data={data}
                                    onChange={(newContent, newData) => {
                                        setContent(newContent);
                                        setData(newData);
                                    }}
                                />
                            ) : (
                                <MessageReview
                                    content={content}
                                    onChange={(newContent) => setContent(newContent)}
                                />
                            )
                        )}
                    </div>

                    {/* Footer / Action Bar */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-4 py-4 sm:px-5 border-t border-border bg-muted/30 gap-4 sm:gap-0">
                        {/* Left Group */}
                        <div className="flex gap-2 w-full sm:w-auto justify-start">
                            {showFeedbackInput ? (
                                <Button label="返回" onClick={() => setShowFeedbackInput(false)} className="w-full sm:w-auto" />
                            ) : (
                                <>
                                    {/* Fill Action (formerly Skip) */}
                                    {request.actions?.includes('fill') && (
                                        <Button
                                            label="填充"
                                            icon={ArrowDownToLine}
                                            onClick={() => handleAction('fill')}
                                            className="border-transparent text-muted-foreground hover:text-foreground hover:bg-muted w-full sm:w-auto"
                                            title="将内容直接作为 AI 回复填充"
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        {/* Right Group */}
                        <div className="flex gap-3 w-full sm:w-auto sm:justify-end">
                            {showFeedbackInput ? (
                                <Button
                                    label="提交打回"
                                    icon={RotateCcw}
                                    onClick={() => handleAction('reject')}
                                    disabled={!feedback.trim()}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent hover:shadow-[0_0_15px_var(--destructive)] w-full sm:w-auto"
                                />
                            ) : (
                                <>
                                    {/* Reject / Reroll */}
                                    {request.actions?.includes('reject') && (
                                        <Button
                                            label="打回修改"
                                            icon={RotateCcw}
                                            onClick={() => handleAction('reject')} // Opens feedback input
                                            title="提供意见并重新生成"
                                            className="text-destructive hover:bg-destructive/10 border-destructive/30 hover:border-destructive flex-1 sm:flex-none"
                                        />
                                    )}

                                    {request.actions?.includes('reroll') && (
                                        <Button
                                            label="重抽"
                                            icon={RefreshCw}
                                            onClick={() => handleAction('reroll')}
                                            title="不满意，直接重新生成"
                                            className="flex-1 sm:flex-none"
                                        />
                                    )}

                                    {/* Confirm (Primary) */}
                                    {request.actions?.includes('confirm') && (
                                        <Button
                                            label="确认通过"
                                            icon={Check}
                                            primary
                                            onClick={() => handleAction('confirm')}
                                            className="min-w-[120px] flex-1 sm:flex-none"
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

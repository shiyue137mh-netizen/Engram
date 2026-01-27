import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { EventBus, TavernEventType } from "@/integrations/tavern/api";
import { X, Check, AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';

import { RevisionAction } from '@/core/events/RevisionBridge';

interface RevisionRequest {
    title: string;
    content: string;
    description?: string;
    actions: RevisionAction[];
    onResult: (result: { action: RevisionAction; content: string; feedback?: string }) => void;
    // Legacy support if needed, but we are moving to onResult
    onCancel?: () => void;
}

export const RevisionModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [request, setRequest] = useState<RevisionRequest | null>(null);
    const [content, setContent] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showFeedbackInput, setShowFeedbackInput] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // 订阅修订请求事件
        const unsubscribe = EventBus.on(
            TavernEventType.ENGRAM_REQUEST_REVISION,
            (data: unknown) => {
                const req = data as RevisionRequest;
                setRequest(req);
                setContent(req.content);
                setFeedback('');
                setShowFeedbackInput(false);
                setIsOpen(true);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const handleAction = (action: RevisionAction) => {
        if (!request) return;

        // Special handling for reject: show feedback input first
        if (action === 'reject' && !showFeedbackInput) {
            setShowFeedbackInput(true);
            return;
        }

        request.onResult({
            action,
            content,
            feedback: action === 'reject' ? feedback : undefined
        });
        setIsOpen(false);
        setRequest(null);
    };

    const handleCancel = () => {
        if (request && request.onCancel) {
            request.onCancel();
        }
        // 对于仅有关闭操作的情况，视为取消
        setIsOpen(false);
        setRequest(null);
    };

    if (!isOpen) return null;

    // Helper to get button label/icon
    const getActionConfig = (action: RevisionAction) => {
        switch (action) {
            case 'confirm': return { label: '确认', icon: Check, variant: 'primary' };
            case 'skip': return { label: '跳过(作为ai消息注入))', icon: RefreshCw, variant: 'secondary' }; // Icon?
            case 'reject': return { label: '打回重写(附意见)', icon: AlertTriangle, variant: 'destructive' };
            default: return { label: action, icon: Check, variant: 'secondary' };
        }
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[11000] flex items-center justify-center p-4"
            style={{ height: '100dvh', width: '100vw' }}
        >
            {/* 背景遮罩 */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={handleCancel}
            />

            {/* 弹窗主体 */}
            <div className="relative w-full max-w-2xl bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
                {/* 标题栏 */}
                <div className="flex items-start justify-between p-5 border-b border-border">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-medium text-foreground tracking-tight">
                            {request?.title || '内容修订'}
                        </h3>
                        {request?.description && (
                            <p className="text-sm text-muted-foreground">
                                {request.description}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleCancel}
                        className="p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-[var(--duration-fast)] hover:rotate-90"
                        aria-label="关闭"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* 内容区域 */}
                <div className="flex-1 p-5 overflow-hidden flex flex-col gap-4">
                    {/* 警告提示 */}
                    <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md">
                        <AlertTriangle size={16} className="text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            请仔细检查内容的格式、关键信息和一致性。
                        </p>
                    </div>

                    {/* 文本编辑区 */}
                    {(!showFeedbackInput) ? (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 w-full min-h-[200px] p-4 bg-muted border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            spellCheck={false}
                            placeholder="在此编辑内容..."
                        />
                    ) : (
                        <div className="flex flex-col flex-1 gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <label className="text-sm font-medium text-destructive">
                                请输入打回修改意见：
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="flex-1 w-full min-h-[100px] p-4 bg-muted border border-border rounded-md font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-destructive resize-none"
                                placeholder="例如：请不要引入新人物，专注于描写环境..."
                                autoFocus
                            />
                        </div>
                    )}

                    {/* 字符计数 */}
                    {!showFeedbackInput && (
                        <div className="text-xs text-muted-foreground text-right font-mono">
                            {content.length} 字符
                        </div>
                    )}
                </div>

                {/* 底部操作栏 */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-muted/30">
                    {showFeedbackInput ? (
                        <>
                            <button
                                onClick={() => setShowFeedbackInput(false)}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                                返回
                            </button>
                            <button
                                onClick={() => handleAction('reject')}
                                disabled={!feedback.trim()}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all shadow-sm"
                            >
                                <RefreshCw size={16} />
                                确认重写
                            </button>
                        </>
                    ) : (
                        request?.actions?.map(action => {
                            const config = getActionConfig(action);
                            const Icon = config.icon;
                            let btnClass = "inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all shadow-sm ";

                            if (config.variant === 'primary') btnClass += "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_var(--primary)]";
                            else if (config.variant === 'destructive') btnClass += "bg-destructive text-destructive-foreground hover:bg-destructive/90";
                            else btnClass += "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border";

                            return (
                                <button
                                    key={action}
                                    onClick={() => handleAction(action)} // Note: 'reject' triggers input view first inside handleAction
                                    disabled={isProcessing}
                                    className={`${btnClass} hover:scale-[1.02] active:scale-95`}
                                >
                                    <Icon size={16} />
                                    {config.label}
                                </button>
                            )
                        })
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

// ========== 通用 Modal 组件 ==========

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    size = 'md',
    children
}) => {
    if (!isOpen) return null;

    console.log('[Engram Modal] Rendering Modal with Open=true', { title, zIndex: 2147483647 });

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 pointer-events-auto"
            style={{ height: '100dvh', width: '100vw' }}
        >
            {/* 背景遮罩 */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* 弹窗主体 */}
            <div className={`relative w-full ${sizeClasses[size]} bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200`}>
                {/* 标题栏 */}
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h3 className="text-base font-medium text-foreground">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-[var(--duration-fast)] hover:rotate-90"
                            aria-label="关闭"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* 内容区域 */}
                <div className="flex-1 p-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};


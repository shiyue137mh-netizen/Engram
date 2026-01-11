import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { EventBus, TavernEventType } from "@/tavern/api";
import { X, Check, AlertTriangle } from 'lucide-react';

interface RevisionRequest {
    title: string;
    content: string;
    description?: string;
    onConfirm: (newContent: string) => void;
    onCancel: () => void;
}

export const RevisionModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [request, setRequest] = useState<RevisionRequest | null>(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        // 订阅修订请求事件
        const unsubscribe = EventBus.on(
            TavernEventType.ENGRAM_REQUEST_REVISION,
            (data: unknown) => {
                const req = data as RevisionRequest;
                setRequest(req);
                setContent(req.content);
                setIsOpen(true);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const handleConfirm = () => {
        if (!request) return;
        request.onConfirm(content);
        setIsOpen(false);
        setRequest(null);
    };

    const handleCancel = () => {
        if (request) {
            request.onCancel();
        }
        setIsOpen(false);
        setRequest(null);
    };

    if (!isOpen) return null;

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
                        className="p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
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
                            请仔细检查内容的格式、关键信息和一致性。这是写入长期记忆前的最后确认。
                        </p>
                    </div>

                    {/* 文本编辑区 */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex-1 w-full min-h-[200px] p-4 bg-muted border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        spellCheck={false}
                        placeholder="在此编辑内容..."
                    />

                    {/* 字符计数 */}
                    <div className="text-xs text-muted-foreground text-right font-mono">
                        {content.length} 字符
                    </div>
                </div>

                {/* 底部操作栏 */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-muted/30">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                        取消
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)] hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <Check size={16} />
                        确认写入
                    </button>
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

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[11000] flex items-center justify-center p-4"
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
                            className="p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
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


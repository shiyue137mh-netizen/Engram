import { X } from 'lucide-react';
import React from 'react';

interface SimpleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string | React.ReactNode;
    icon?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: string; // e.g., 'max-w-md', 'max-w-2xl'
}

/**
 * 通用简易模态框组件 (SimpleModal)
 * 提供标准的居中弹窗, 半透明遮罩, 标题栏和关闭按钮
 */
export const SimpleModal: React.FC<SimpleModalProps> = ({
    isOpen,
    onClose,
    title,
    icon,
    children,
    footer,
    maxWidth = 'max-w-md'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className={`w-full ${maxWidth} bg-background border border-border rounded-lg shadow-xl flex flex-col max-h-[90vh]`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-foreground">
                        {icon && <span className="text-primary">{icon}</span>}
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        title="关闭"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>

                {/* Footer (Optional) */}
                {footer && (
                    <div className="px-4 py-3 border-t border-border bg-muted/20 shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

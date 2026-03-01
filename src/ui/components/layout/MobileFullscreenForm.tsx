import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface MobileFullscreenFormProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export const MobileFullscreenForm: React.FC<MobileFullscreenFormProps> = ({
    title,
    onClose,
    children,
    actions,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // 组件卸载时可能需要锁定背景滚动，但为了不干涉全局先保持简单
        return () => setMounted(false);
    }, []);

    const content = (
        <div className="engram-app-root" style={{ display: 'contents' }}>
            <div
                className="fixed inset-0 z-[99999] flex flex-col animate-in slide-in-from-right-4 duration-200 bg-background/95 backdrop-blur-3xl text-foreground"
                style={{ width: '100vw', height: '100dvh' }}
            >
                {/* 头部 */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-accent rounded"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg font-light flex-1">{title}</h2>
                    {actions}
                </div>

                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );

    // 为了完全覆盖所有 SillyTavern UI（包括 header 和其他 fixed 元素），将全屏表单直接渲染到 document.body
    if (!mounted) return null;
    return ReactDOM.createPortal(content, document.body);
};


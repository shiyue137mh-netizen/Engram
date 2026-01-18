/**
 * MobileFullscreenForm - 移动端全屏表单包装器
 *
 * 用于 Master-Detail 布局的移动端全屏编辑模式
 */
import React from 'react';
import { ArrowLeft } from 'lucide-react';

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
    return (
        <div
            className="fixed inset-0 bg-background z-50 flex flex-col animate-in slide-in-from-right-4 duration-200"
            style={{ height: '100dvh', width: '100vw' }}
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
    );
};

export default MobileFullscreenForm;

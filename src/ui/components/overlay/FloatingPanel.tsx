/**
 * FloatingPanel - V0.8 可拖拽可调整大小悬浮面板
 *
 * 特点：
 * - 可拖拽移动
 * - 可调整大小
 * - 无背景虚化遮罩
 * - 独立于 Modal 组件
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, GripVertical } from 'lucide-react';

interface FloatingPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    /** 初始位置 */
    initialPosition?: { x: number; y: number };
    /** 初始宽度 */
    width?: number;
    /** 最小宽度 */
    minWidth?: number;
    /** 最大宽度 */
    maxWidth?: number;
    /** 最小高度 */
    minHeight?: number;
    /** 是否可调整大小 */
    resizable?: boolean;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
    isOpen,
    onClose,
    title,
    children,
    initialPosition,
    width: initialWidth = 320,
    minWidth = 280,
    maxWidth = 600,
    minHeight = 150,
    resizable = true,
}) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
    const [size, setSize] = useState({ width: initialWidth, height: 'auto' as number | 'auto' });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 });

    // 初始化位置到屏幕中央偏下
    useEffect(() => {
        if (isOpen && !initialPosition) {
            setPosition({
                x: Math.max(50, (window.innerWidth - initialWidth) / 2),
                y: Math.max(50, window.innerHeight - 450),
            });
        }
    }, [isOpen, initialPosition, initialWidth]);

    // 拖拽处理
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!panelRef.current) return;

        const rect = panelRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const newX = Math.max(0, Math.min(window.innerWidth - (typeof size.width === 'number' ? size.width : 300), e.clientX - dragOffset.current.x));
            const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.current.y));
            setPosition({ x: newX, y: newY });
        } else if (isResizing && panelRef.current) {
            const deltaX = e.clientX - resizeStart.current.x;
            const deltaY = e.clientY - resizeStart.current.y;
            const newWidth = Math.max(minWidth, Math.min(maxWidth, resizeStart.current.width + deltaX));
            const newHeight = Math.max(minHeight, resizeStart.current.height + deltaY);
            setSize({ width: newWidth, height: newHeight });
        }
    }, [isDragging, isResizing, size.width, minWidth, maxWidth, minHeight]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
    }, []);

    // 调整大小处理
    const handleResizeStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!panelRef.current) return;

        const rect = panelRef.current.getBoundingClientRect();
        resizeStart.current = {
            width: rect.width,
            height: rect.height,
            x: e.clientX,
            y: e.clientY,
        };
        setIsResizing(true);
    }, []);

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="engram-app-root" style={{ display: 'contents' }}>
            <div
                ref={panelRef}
                className="fixed z-[11000] flex flex-col rounded-lg shadow-2xl border border-border overflow-hidden engram-animate-scale-in"
                style={{
                    left: position.x,
                    top: position.y,
                    width: size.width,
                    height: size.height === 'auto' ? 'auto' : size.height,
                    minHeight: minHeight,
                    backgroundColor: 'var(--popover, #1a1a2e)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                {/* 标题栏 - 可拖拽 */}
                <div
                    className="flex items-center justify-between px-3 py-2 border-b border-border select-none"
                    onMouseDown={handleMouseDown}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        backgroundColor: 'var(--surface, rgba(255,255,255,0.05))',
                    }}
                >
                    <div className="flex items-center gap-2">
                        <GripVertical size={14} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{title}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-muted-foreground hover:text-foreground rounded transition-all duration-[var(--duration-fast)] hover:rotate-90 hover:bg-accent"
                        style={{ backgroundColor: 'transparent' }}
                        aria-label="关闭"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* 内容区域 */}
                <div className="flex-1 overflow-auto p-3">
                    {children}
                </div>

                {/* 调整大小手柄 */}
                {resizable && (
                    <div
                        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                        onMouseDown={handleResizeStart}
                        style={{
                            background: 'linear-gradient(135deg, transparent 50%, var(--border, #333) 50%)',
                        }}
                    />
                )}
            </div>
        </div>,
        document.body
    );
};


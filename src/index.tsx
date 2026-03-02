/**
 * Engram - Graph RAG 记忆操作系统
 * 入口文件
 */

import { initializeEngram, setGlobalRenderer, setReactRenderer } from '@/integrations/tavern/bridge';
import { setQuickPanelCallback } from '@/integrations/tavern/ui';
import { QuickPanel } from '@/ui/views/quick-panel';
import { ReviewContainer } from '@/ui/views/review/ReviewContainer';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './ui/styles/main.css';

// 全局 QuickPanel 状态
let quickPanelOpen = false;
let setQuickPanelOpenCallback: ((open: boolean) => void) | null = null;

// 全局 CommandPalette 控制
let openCommandPaletteCallback: (() => void) | null = null;

/**
 * 切换快捷面板（供键盘快捷键调用）
 */
export function toggleQuickPanel(): void {
    if (setQuickPanelOpenCallback) {
        quickPanelOpen = !quickPanelOpen;
        setQuickPanelOpenCallback(quickPanelOpen);
    }
}

/**
 * 打开命令面板（供键盘快捷键调用）
 */
export function openCommandPalette(): void {
    if (openCommandPaletteCallback) {
        openCommandPaletteCallback();
    }
}

/**
 * 设置 CommandPalette 打开回调
 */
export function setCommandPaletteCallback(callback: () => void): void {
    openCommandPaletteCallback = callback;
}

// 设置 React 渲染器
setReactRenderer((container: HTMLElement, onClose: () => void) => {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(App, { onClose }));
    return root;
});

// QuickPanel 包装组件
function GlobalOverlayContent() {
    const [quickPanelVisible, setQuickPanelVisible] = useState(quickPanelOpen);

    useEffect(() => {
        // 设置回调供外部调用
        setQuickPanelOpenCallback = setQuickPanelVisible;
        return () => {
            setQuickPanelOpenCallback = null;
        };
    }, []);

    return (
        <div className="pointer-events-auto">
            <ReviewContainer />
            <QuickPanel
                isOpen={quickPanelVisible}
                onClose={() => setQuickPanelVisible(false)}
            />
        </div>
    );
}

// 设置全局渲染器 (RevisionModal + QuickPanel)
setGlobalRenderer((container: HTMLElement) => {
    const root = ReactDOM.createRoot(container);
    root.render(<GlobalOverlayContent />);
    return root;
});

// 设置 QuickPanel 按钮回调
setQuickPanelCallback(() => {
    if (setQuickPanelOpenCallback) {
        setQuickPanelOpenCallback(true);
    }
});

// 等待 DOM 加载完成后初始化
const initEngramOnLoad = () => {
    initializeEngram();
    document.removeEventListener('DOMContentLoaded', initEngramOnLoad);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngramOnLoad);
} else {
    initializeEngram();
}

// Engram initialization handled in STBridge



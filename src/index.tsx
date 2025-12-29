/**
 * Engram - Graph RAG 记忆操作系统
 * 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './App';
import { initializeEngram, setReactRenderer, setGlobalRenderer } from './infrastructure/STBridge';
import { ThemeProvider } from './contexts/ThemeContext';
import { RevisionModal } from './views/components/RevisionModal';

// 设置 React 渲染器
setReactRenderer((container: HTMLElement, onClose: () => void) => {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(App, { onClose }));
    return root;
});

// 设置全局渲染器 (RevisionModal etc)
setGlobalRenderer((container: HTMLElement) => {
    const root = ReactDOM.createRoot(container);
    root.render(
        <ThemeProvider>
            <div className="pointer-events-auto">
                <RevisionModal />
            </div>
        </ThemeProvider>
    );
    return root;
});

// 等待 DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEngram);
} else {
    initializeEngram();
}

// Engram initialization handled in STBridge


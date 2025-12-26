// Engram 根组件
import React, { useState, useEffect } from 'react';
import Layout from './views/Layout';
import MemoryStream from './views/MemoryStream';
import GraphView from './views/GraphView';
import BrainView from './views/Brain';
import APIPresets from './views/APIPresets';
import DevLog from './views/DevLog';
import Settings from './views/Settings';

// 简单路由映射
const ROUTES: Record<string, React.FC> = {
    '/memory': MemoryStream,
    '/graph': GraphView,
    '/brain': BrainView,
    '/brain/summarize': BrainView,
    '/brain/vectorize': BrainView,
    '/brain/batch': BrainView,
    '/api': APIPresets,
    '/dev': DevLog,
    '/settings': Settings,
};

interface AppProps {
    onClose?: () => void;
}

const App: React.FC<AppProps> = ({ onClose }) => {
    const [currentPath, setCurrentPath] = useState('/memory');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // 检测移动端
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.innerWidth < 768
    );

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 移动端默认全屏
    useEffect(() => {
        if (isMobile) {
            setIsFullscreen(true);
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    // 获取当前路由对应的组件
    const CurrentView = ROUTES[currentPath] || MemoryStream;

    return (
        <Layout
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onCloseSidebar={() => setIsSidebarOpen(false)}
            isMobile={isMobile}
            onClose={onClose}
        >
            <CurrentView />
        </Layout>
    );
};

export default App;

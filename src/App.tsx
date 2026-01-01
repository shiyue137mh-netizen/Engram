import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WelcomeAnimation } from '@/components/visual/WelcomeAnimation';
import { SettingsManager } from '@/services/settings/Persistence';

// 首屏视图同步导入
import { Dashboard } from '@/views/Dashboard';

// 非首屏视图懒加载 - 减少首屏 bundle 大小
const GraphView = lazy(() => import('@/views/Graph').then(m => ({ default: m.GraphView })));
const DevLog = lazy(() => import('@/views/DevLog').then(m => ({ default: m.DevLog })));
const APIPresets = lazy(() => import('@/views/APIPresets/APIPresetsView').then(m => ({ default: m.APIPresets })));
const Settings = lazy(() => import('@/views/Settings').then(m => ({ default: m.Settings })));
const MemoryStream = lazy(() => import('@/views/MemoryStream').then(m => ({ default: m.MemoryStream })));
const ProcessingView = lazy(() => import('@/views/Processing/ProcessingView').then(m => ({ default: m.ProcessingView })));

// 懒加载 Loading 占位符
const LoadingFallback = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
);



interface AppProps {
    onClose: () => void;
}

export const App: React.FC<AppProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showWelcome, setShowWelcome] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // 检查是否首次安装 - 延迟读取确保 ST 设置已加载
    useEffect(() => {
        // 延迟检查，等待 ST 完全加载
        const timer = setTimeout(() => {
            const hasSeenWelcome = SettingsManager.get('hasSeenWelcome');
            console.debug('[Engram] hasSeenWelcome:', hasSeenWelcome);
            if (!hasSeenWelcome) {
                setShowWelcome(true);
            }
            setIsInitialized(true);
        }, 1000); // 延迟 1 秒确保 ST 加载完成

        return () => clearTimeout(timer);
    }, []);

    // 欢迎动画完成回调
    const handleWelcomeComplete = () => {
        SettingsManager.set('hasSeenWelcome', true);
        console.debug('[Engram] hasSeenWelcome saved');
        setShowWelcome(false);
    };

    // 等待初始化完成
    if (!isInitialized) {
        return null;
    }

    const renderContent = () => {
        // 解析路径，支持 page:subtab 格式（如 devlog:model, presets:prompt）
        const [page, subtab] = activeTab.split(':');

        switch (page) {
            case 'dashboard':
                return <Dashboard onNavigate={setActiveTab} />;
            case 'presets':
                return <APIPresets initialTab={subtab as 'model' | 'prompt' | 'regex' | 'worldbook'} />;
            case 'graph':
                return <GraphView />;
            case 'devlog':
                return <DevLog initialTab={subtab as 'runtime' | 'model'} />;
            case 'settings':
                return <Settings />;
            case 'memory':
                return <MemoryStream />;
            case 'processing':
                return <ProcessingView onNavigate={setActiveTab} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        /* 首次安装欢迎动画 */
        <>
            {showWelcome && (
                <WelcomeAnimation onComplete={handleWelcomeComplete} />
            )}

            <MainLayout activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose}>
                <Suspense fallback={<LoadingFallback />}>
                    {renderContent()}
                </Suspense>
            </MainLayout>
        </>
    );
};

export default App;

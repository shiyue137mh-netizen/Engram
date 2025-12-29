import React, { useState, useEffect } from 'react';
import { MainLayout } from './views/Layout/MainLayout';
// Import Views
import { Dashboard } from './views/Dashboard';
import { GraphView } from './views/Graph';
import { DevLog } from './views/DevLog';
import { APIPresets } from './views/APIPresets/APIPresetsView';
import { Settings } from './views/Settings';
import { MemoryStream } from './views/MemoryStream';
import { ProcessingView } from './views/Processing/ProcessingView';
import { ThemeProvider } from './contexts/ThemeContext';
import { WelcomeAnimation } from './views/components/WelcomeAnimation';
import { SettingsManager } from './infrastructure/SettingsManager';



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
        <ThemeProvider>
            {/* 首次安装欢迎动画 */}
            {showWelcome && (
                <WelcomeAnimation onComplete={handleWelcomeComplete} />
            )}

            <MainLayout activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose}>
                {renderContent()}
            </MainLayout>
        </ThemeProvider>
    );
};

export default App;

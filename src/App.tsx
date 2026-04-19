import React, { Suspense, lazy, useEffect, useState } from 'react';
import { MainLayout } from '@/ui/components/layout/MainLayout';
import { WelcomeAnimation } from '@/ui/components/visual/WelcomeAnimation';
import { SettingsManager } from '@/config/settings';
import { EventBus } from '@/core/events/types';
import { UpdateService } from '@/core/updater/Updater';
import { notificationService } from '@/ui/services/NotificationService';

// 首屏视图同步导入
import { Dashboard } from '@/ui/views/dashboard';

// 非首屏视图懒加载 - 减少首屏 bundle 大小
const DevLog = lazy(() => import('@/ui/views/dev-log').then(m => ({ default: m.DevLog })));
const APIPresets = lazy(() => import('@/ui/views/api-presets/APIPresetsView').then(m => ({ default: m.APIPresets })));
const Settings = lazy(() => import('@/ui/views/settings').then(m => ({ default: m.Settings })));
const MemoryStream = lazy(() => import('@/ui/views/memory-stream').then(m => ({ default: m.MemoryStream })));
const ProcessingView = lazy(() => import('@/ui/views/processing/ProcessingView').then(m => ({ default: m.ProcessingView })));
const DocsView = lazy(() => import('@/ui/views/docs').then(m => ({ default: m.DocsView })));  // V0.9.11

// 懒加载 Loading 占位符
const LoadingFallback = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
);



interface AppProps {
    onClose: () => void;
}

const App: React.FC<AppProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState(() => SettingsManager.get('lastOpenedTab') || 'dashboard');
    const [showWelcome, setShowWelcome] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Deep Link Navigation Handler
    const handleNavigate = (path: string) => {
        const cleanPath = path.replace(/^\//, '') || 'dashboard';
        console.debug('[Engram] Navigating to:', cleanPath);
        setActiveTab(cleanPath);
        SettingsManager.set('lastOpenedTab', cleanPath);
    };

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

    // V0.9.10: 监听通知系统的导航请求
    useEffect(() => {
        const subscription = EventBus.on<string>('UI_NAVIGATE_REQUEST', (path) => {
            console.debug('[Engram] 收到导航请求:', path);
            handleNavigate(path);
        });

        const handleWindowNavigate = (event: Event) => {
            const path = (event as CustomEvent<string>).detail;
            console.debug('[Engram] 收到窗口导航请求:', path);
            if (path) {
                handleNavigate(path);
            }
        };

        window.addEventListener('engram:navigate', handleWindowNavigate as EventListener);
        return () => {
            subscription.unsubscribe();
            window.removeEventListener('engram:navigate', handleWindowNavigate as EventListener);
        };
    }, []);

    // V0.9.10: 启动时检测更新，弹 toastr 提示
    useEffect(() => {
        const checkUpdate = async () => {
            try {
                const hasUnread = await UpdateService.hasUnreadUpdate();
                if (hasUnread) {
                    const latestVersion = await UpdateService.getLatestVersion();
                    notificationService.info(
                        `发现新版本 v${latestVersion}，点击查看更新`,
                        'Engram 更新',
                        { action: { goto: 'settings' } }  // 跳转设置页，可以打开更新面板
                    );
                }
            } catch (error) {
                console.debug('[Engram] 更新检测失败', error);
            }
        };
        // 延迟执行，避免影响首屏加载
        const timer = setTimeout(checkUpdate, 3000);
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
        // 解析路径，支持 page:subtab[:detail] 格式（如 devlog:model, presets:prompt:macros）
        const [page, ...subtabParts] = activeTab.split(':');
        const subtab = subtabParts.join(':') || undefined;

        switch (page) {
            case 'dashboard': {
                return <Dashboard onNavigate={handleNavigate} />;
            }
            case 'presets': {
                return (
                    <APIPresets
                        onNavigate={handleNavigate}
                        initialTab={subtabParts[0] as 'model' | 'prompt' | 'regex' | 'worldbook' | undefined}
                        initialTabPath={subtab}
                    />
                );
            }
            case 'devlog': {
                return <DevLog initialTab={subtab as 'runtime' | 'model'} />;
            }
            case 'settings': {
                return <Settings />;
            }
            case 'memory': {
                return <MemoryStream initialTab={subtab as 'list' | 'entities' | undefined} />;
            }
            case 'processing': {
                return <ProcessingView onNavigate={handleNavigate} initialTab={subtab as 'summary' | 'vectorization' | 'recall' | 'entity' | 'batch' | undefined} />;
            }
            case 'docs': {
                return <DocsView initialTab={subtab} />;
            }  // V0.9.11
            default: {
                return <Dashboard onNavigate={handleNavigate} />;
            }
        }
    };

    return (
        /* 首次安装欢迎动画 */
        <>
            {showWelcome && (
                <WelcomeAnimation onComplete={handleWelcomeComplete} />
            )}

            <MainLayout activeTab={activeTab} setActiveTab={handleNavigate} onClose={onClose}>
                <Suspense fallback={<LoadingFallback />}>
                    {renderContent()}
                </Suspense>
            </MainLayout>
        </>
    );
};

export default App;


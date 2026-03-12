import { UpdateService } from '@/core/updater/Updater';
import { UpdateNotice } from "@/ui/components/feedback/UpdateNotice";
import Header from '@/ui/components/layout/Header';
import { Sidebar } from '@/ui/components/layout/Sidebar';
import { CurtainOverlay } from '@/ui/components/visual/CurtainOverlay';
import { GlobalStyles } from '@/ui/styles/GlobalStyles';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState, useRef, useCallback } from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onClose: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab, setActiveTab, onClose }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUpdateNotice, setShowUpdateNotice] = useState(false);
    const [hasUnreadUpdate, setHasUnreadUpdate] = useState(false);
    
    // 核心生命周期控制
    const [isCurtainActive, setIsCurtainActive] = useState(true);
    const [curtainMode, setCurtainMode] = useState<'entrance' | 'exit'>('entrance');
    // V10: 极致稳定性 - 初始化即决定生命周期内的随机方位，彻底断绝因状态变更导致的重复播放
    const [animationDir] = useState<'left' | 'top'>(() => {
        const dirs: ('left' | 'top')[] = ['left', 'top'];
        return dirs[Math.floor(Math.random() * dirs.length)];
    });
    const [isReadyToRender, setIsReadyToRender] = useState(false); // 控制组件重绘
    const [isContentVisible, setIsContentVisible] = useState(false); // 控制透明度
    
    // 内容引用，用于 GSAP 直接驱动同步平移
    const contentRef = useRef<HTMLDivElement>(null);

    // 检测是否有未读更新
    useEffect(() => {
        const checkUpdate = async () => {
            try {
                const unread = await UpdateService.hasUnreadUpdate();
                setHasUnreadUpdate(unread);
            } catch (e) {
                console.debug('[Engram] 检查更新失败', e);
            }
        };
        checkUpdate();
    }, []);

    const handleShowUpdateNotice = () => {
        setShowUpdateNotice(true);
    };

    const handleCloseUpdateNotice = () => {
        setShowUpdateNotice(false);
        setHasUnreadUpdate(false);
    };

    // 拦截关闭请求，执行闭幕动画
    const handleInterceptClose = useCallback(() => {
        setCurtainMode('exit');
        setIsCurtainActive(true);
    }, []);

    // 揭开内容的触发器 (V8: 移入 MainLayout 以确保 Ref 稳定性)
    const handleCurtainReveal = useCallback(() => {
        setIsContentVisible(true);
        
        if (contentRef.current) {
            const axis = animationDir === 'left' ? 'x' : 'y';
            const travelDistance = '200%';
            
            // 完美同步：内容入场动画
            gsap.fromTo(contentRef.current, 
                { [axis]: travelDistance, opacity: 0 },
                { [axis]: '0%', opacity: 1, duration: 1.3, ease: 'expo.out' }
            );
        }
    }, [animationDir]);

    // 动画环节回调 - 记忆化以防止子组件二次触发
    const handleCurtainCovered = useCallback(() => {
        if (curtainMode === 'entrance') {
            setIsReadyToRender(true); // 此时大幕已拉上，开始静默渲染组件
        } else {
            // 闭幕遮挡完成，此时隐藏掉内容渲染，但保留外壳让遮罩继续滑完 Slide Out
            setIsReadyToRender(false);
        }
    }, [curtainMode]);

    // 动画结束后的清理逻辑
    const handleCurtainComplete = useCallback(() => {
        if (curtainMode === 'entrance') {
            setIsCurtainActive(false); // 入场结束，销毁遮罩释放资源
        } else {
            // 闭幕全程结束（已滑离全屏），此时真正通过外部通知销毁 Extension UI
            onClose();
        }
    }, [curtainMode, onClose]);

    // 获取宿主酒馆环境的基色 (用于色彩桥接渐变)
    const [hostColor, setHostColor] = useState('rgba(0,0,0,0)');
    useEffect(() => {
        // 尝试抓取酒馆侧边栏或背景作为起始色
        const tavernBg = window.getComputedStyle(document.body).getPropertyValue('--sidebar') || 
                         window.getComputedStyle(document.body).backgroundColor || 
                         '#000';
        setHostColor(tavernBg.trim());
    }, []);

    return (
        <div className="flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary" id="engram-layout-root">
            <GlobalStyles />

            {/* Curtain Animation Controller - V6 Lifecycle Guard & Color Bridge */}
            {isCurtainActive && (
                <CurtainOverlay 
                    mode={curtainMode}
                    direction={animationDir}
                    hostColor={hostColor}
                    onCovered={handleCurtainCovered}
                    onReveal={handleCurtainReveal}
                    onComplete={handleCurtainComplete} 
                />
            )}


            {/* Main Content Area - Only rendered when curtain covers the screen */}
            {isReadyToRender && (
                <div 
                    ref={contentRef}
                    className="flex w-full h-full"
                    style={{ 
                        opacity: isContentVisible ? 1 : 0,
                        pointerEvents: isCurtainActive ? 'none' : 'auto'
                    }}
                >
                    {/* Update Notice Modal */}
                    <UpdateNotice
                        isOpen={showUpdateNotice}
                        onClose={handleCloseUpdateNotice}
                    />

                    {/* PC 端侧边栏 */}
                    <Sidebar
                        activeTab={activeTab}
                        onNavigate={setActiveTab}
                        isMobile={false}
                        onShowUpdateNotice={handleShowUpdateNotice}
                        hasUnreadUpdate={hasUnreadUpdate}
                    />

                    {/* 移动端侧边栏（抽屉） */}
                    <Sidebar
                        activeTab={activeTab}
                        onNavigate={setActiveTab}
                        isMobile={true}
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                        onShowUpdateNotice={handleShowUpdateNotice}
                        hasUnreadUpdate={hasUnreadUpdate}
                    />

                    {/* Right Content Area (Header + Main) */}
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <div className="flex flex-col flex-shrink-0 border-b border-border bg-sidebar/95 backdrop-blur z-50 transition-all duration-300">
                            <Header
                                onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                isMobile={false}
                                onClose={handleInterceptClose} 
                                onNavigate={(path) => setActiveTab(path.replace('/', ''))}
                            />

                            {/* Header Extension Slot (Portal Target) */}
                            <div id="engram-header-extension" className="z-40 flex-shrink-0 bg-transparent transition-all empty:hidden" />
                        </div>

                        {/* Main Content Area - Page Transition on Tab Change */}
                        <main className="flex-1 flex flex-col relative w-full overflow-hidden bg-background">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 md:px-8 lg:px-12 scroll-smooth w-full h-full pb-8 md:pb-12 lg:pb-16"
                                >
                                    <div className="max-w-6xl mx-auto min-h-full pb-20">
                                        {children}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </main>
                    </div>  {/* End Right Content Area */}
                </div>
            )}
        </div>
    );
};


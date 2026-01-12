/**
 * Sidebar - 统一侧边栏组件
 *
 * 支持 PC 端和移动端两种模式，复用导航配置和底部功能区
 */
import React from 'react';
import { X, Bell, Github } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/navigation';
import { EngramTextLogo } from '@/assets/icons/EngramTextLogo';
import manifest from '../../../manifest.json';

interface SidebarProps {
    /** 当前激活的标签 ID */
    activeTab: string;
    /** 导航回调 */
    onNavigate: (tabId: string) => void;
    /** 是否为移动端模式 */
    isMobile: boolean;
    /** 移动端：是否打开 */
    isOpen?: boolean;
    /** 移动端：关闭回调 */
    onClose?: () => void;
    /** 显示更新通知 */
    onShowUpdateNotice: () => void;
    /** 是否有未读更新 */
    hasUnreadUpdate: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    activeTab,
    onNavigate,
    isMobile,
    isOpen = false,
    onClose,
    onShowUpdateNotice,
    hasUnreadUpdate,
}) => {
    const handleNavClick = (tabId: string) => {
        onNavigate(tabId);
        if (isMobile && onClose) onClose();
    };

    // 统一的底部区域组件（三行布局）
    const BottomArea = () => (
        <div className="pt-4 border-t border-border/30 mt-2 space-y-2">
            {/* 第一行：更新通知 */}
            <button
                onClick={onShowUpdateNotice}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10 text-left"
            >
                <div className="relative">
                    <Bell size={16} strokeWidth={1.5} />
                    {hasUnreadUpdate && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                </div>
                <span className="text-xs">更新通知</span>
                {hasUnreadUpdate && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full">
                        NEW
                    </span>
                )}
            </button>

            {/* 第二行：GitHub */}
            <a
                href="https://github.com/shiyue137mh-netizen/Engram"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10"
                title="点个星⭐支持一下"
            >
                <Github size={16} strokeWidth={1.5} className="group-hover:text-primary transition-colors" />
                <span className="text-xs">GitHub</span>
                <span className="ml-auto text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Star ⭐
                </span>
            </a>

            {/* 第三行：Logo + 版本号 */}
            <div className="flex items-center gap-2 px-2 py-1 opacity-50">
                <EngramTextLogo height={12} />
                <span className="text-[10px] text-muted-foreground font-mono">v{manifest.version}</span>
            </div>
        </div>
    );

    // 移动端未打开时不渲染
    if (isMobile && !isOpen) return null;

    // PC 端侧边栏
    if (!isMobile) {
        return (
            <aside className="[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50 animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                <nav className="flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'}
                                `}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="flex-shrink-0" />
                                <span className={`text-xs ${isActive ? 'font-medium' : 'font-normal'}`}>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* 底部区域 */}
                <div className="pb-3">
                    <BottomArea />
                </div>
            </aside>
        );
    }

    // 移动端抽屉
    return (
        <div
            className="fixed inset-0 z-[60] flex justify-start"
            style={{ height: '100dvh', width: '100vw' }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div
                id="mobile-menu-drawer"
                className="relative w-64 max-w-[80vw] h-full bg-sidebar border-r border-border shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300"
                style={{ height: '100dvh' }}
            >
                <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-semibold text-sidebar-foreground/80">导航</span>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-md hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="space-y-2 flex-1 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`
                                    w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                    ${isActive
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'}
                                `}
                            >
                                <Icon size={22} className={isActive ? 'text-primary' : 'text-muted-foreground/70'} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* 底部区域 - 复用统一组件 */}
                <div className="mt-auto">
                    <BottomArea />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

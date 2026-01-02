import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    BrainCircuit,
    Network,
    Settings2,
    Database,
    Terminal,
    ArrowUpRight,
    X,
    Bell,
    Github
} from 'lucide-react';
import { GlobalStyles } from '@/styles/GlobalStyles';
import Header from '@/components/layout/Header';
import { EngramIcon } from '@/assets/icons/EngramIcon';
import { EngramTextLogo } from '@/assets/icons/EngramTextLogo';
import { UpdateService } from '@/services/updater';
import { UpdateNotice } from "@/components/common/UpdateNotice";
import manifest from '../../../manifest.json';

// Navigation Items Configuration
const NAV_ITEMS = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'memory', label: '记忆流', icon: BrainCircuit },
    { id: 'graph', label: '神经图谱', icon: Network },
    { id: 'processing', label: '数据处理', icon: ArrowUpRight },
    { id: 'presets', label: 'API 预设', icon: Database },
    { id: 'devlog', label: '开发日志', icon: Terminal },
    { id: 'settings', label: '系统设置', icon: Settings2 },
];

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

    return (
        <div className="flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary animate-in fade-in duration-300" id="engram-layout-root">
            <GlobalStyles />

            {/* Update Notice Modal */}
            <UpdateNotice
                isOpen={showUpdateNotice}
                onClose={() => {
                    setShowUpdateNotice(false);
                    setHasUnreadUpdate(false);
                }}
            />

            {/* Sidebar (Desktop Only) - 紧凑布局 - Staged Animation Step 2 (Delay 100ms) */}
            <aside className="[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50 animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                <nav className="flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
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

                {/* Bottom Area - 更新通知 + Logo */}
                <div className="pb-3 pt-2 border-t border-border/30 mt-2 space-y-2">
                    {/* 更新通知入口 */}
                    <button
                        onClick={() => setShowUpdateNotice(true)}
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

                    {/* Logo + GitHub - 左对齐 */}
                    <div className="flex items-center gap-2 px-2">
                        <a
                            href="https://github.com/shiyue137mh-netizen/Engram"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-40 hover:opacity-80 text-muted-foreground transition-opacity"
                            title="GitHub"
                        >
                            <Github size={14} />
                        </a>
                        <div className="opacity-40 text-muted-foreground">
                            <EngramTextLogo height={12} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Right Content Area (Header + Main) */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Unified Header (Responsive) */}
                <Header
                    onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    isMobile={false}
                    onClose={onClose}
                    onNavigate={(path) => setActiveTab(path.replace('/', ''))}
                />

                {/* Mobile Menu Overlay (Drawer Style) */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-50 flex justify-start"
                        style={{ height: '100dvh', width: '100vw' }} // Prevent height collapse on mobile
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
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
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 -mr-2 rounded-md hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="space-y-4 flex-1 overflow-y-auto">
                                {NAV_ITEMS.map((item) => {
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                                            className={`
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                                ${isActive
                                                    ? 'bg-primary/10 text-primary font-medium'
                                                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'}
                                            `}
                                        >
                                            <item.icon size={22} className={isActive ? 'text-primary' : 'text-muted-foreground/70'} />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>

                            <div className="mt-auto pt-6 border-t border-border/20">
                                <div className="flex items-center gap-3 px-2 text-xs text-muted-foreground/50">
                                    <a
                                        href="https://github.com/shiyue137mh-netizen/Engram"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-60 hover:opacity-100 transition-opacity"
                                        title="GitHub"
                                    >
                                        <Github size={16} />
                                    </a>
                                    <EngramIcon size={14} />
                                    <span>Engram v{manifest.version}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area - Staged Animation Step 3 (Delay 200ms) with Blur */}
                <main className="flex-1 flex flex-col relative w-full overflow-hidden bg-background">
                    <div className="flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 scroll-smooth animate-blur-in fill-mode-both" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                        <div className="max-w-6xl mx-auto min-h-full pb-20">
                            {children}
                        </div>
                    </div>
                </main>
            </div>  {/* End Right Content Area */}
        </div>
    );
};

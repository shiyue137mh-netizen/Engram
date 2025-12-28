import React, { useState } from 'react';
import {
    LayoutDashboard,
    BrainCircuit,
    Network,
    Settings2,
    Database,
    Terminal,
    Menu,
    ArrowUpRight,
    MoreVertical
} from 'lucide-react';
import { GlobalStyles } from './GlobalStyles';
import { CommandPalette } from './CommandPalette';

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

    return (
        <div className="flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary" id="engram-layout-root">
            <GlobalStyles />

            {/* Window Controls (Absolute Top Right) - Always visible */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <button
                    onClick={onClose}
                    className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
                    title="Close Engram"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>

            {/* Sidebar (Desktop) */}
            <aside className="w-64 flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col z-40">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 text-foreground mb-6">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <BrainCircuit size={18} className="text-white" />
                        </div>
                        <span className="text-lg font-medium tracking-tight">Engram</span>
                    </div>

                    {/* Command Palette Trigger (Mock) */}
                    <button
                        className="w-full flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted border border-border rounded-md text-muted-foreground text-xs transition-colors group"
                        onClick={() => { /* TODO: Trigger Search */ }}
                    >
                        <Menu size={14} className="group-hover:text-foreground" />
                        <span>Search...</span>
                        <span className="ml-auto text-[10px] border border-border px-1 rounded bg-muted">⌘K</span>
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-all duration-200 group
                                    ${isActive
                                        ? 'text-foreground bg-sidebar-accent font-medium'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 font-light'}
                                `}
                            >
                                <Icon size={18} strokeWidth={1.5} className={isActive ? 'text-primary' : 'group-hover:text-muted-foreground'} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-sidebar-border">
                    <div className="bg-muted/30 rounded-lg p-3 flex items-center gap-3 border border-border/50 hover:border-border transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium border border-border">SH</div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-foreground truncate">Shiyue Netizen</div>
                            <div className="text-[10px] text-muted-foreground truncate">Pro Workspace</div>
                        </div>
                        <MoreVertical size={14} className="text-muted-foreground" />
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur border-b border-border flex items-center justify-between px-4 z-40">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                        <BrainCircuit size={14} className="text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Engram</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-muted-foreground">
                    <Menu size={20} />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-background/95 flex flex-col p-6 animate-in slide-in-from-top-4 md:hidden">
                    <div className="flex justify-end mb-8">
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                    <nav className="space-y-4">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                                className={`text-2xl font-light block w-full text-left ${activeTab === item.id ? 'text-foreground' : 'text-muted-foreground'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative w-full overflow-hidden">
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 scroll-smooth pt-20 md:pt-12">
                    <div className="max-w-6xl mx-auto min-h-full pb-20">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

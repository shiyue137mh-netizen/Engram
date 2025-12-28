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
    Search,
    X
} from 'lucide-react';
import { GlobalStyles } from './GlobalStyles';
import Header from './Header'; // Ensure Header imports CommandPalette internally
import { EngramIcon } from './EngramIcon';
import { EngramTextLogo } from './EngramTextLogo';

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
        <div className="flex flex-col absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary" id="engram-layout-root">
            <GlobalStyles />

            {/* Unified Header */}
            <Header
                onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                isMobile={false} // Responsive handling via CSS mostly, but passing false for now as logic is simplified
                onClose={onClose}
                onNavigate={(path) => setActiveTab(path.replace('/', ''))}
            />

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar (Desktop Only) - VSCode Style (Slimmer) */}
                <aside className="flex w-12 flex-shrink-0 bg-sidebar flex-col z-40 items-center pt-3 border-r border-border/50">
                    {/* Navigation - Icon Only - Compact */}
                    <nav className="flex-1 w-full flex flex-col items-center gap-2 overflow-y-auto no-scrollbar">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    title={item.label}
                                    className={`
                                        w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 group
                                        ${isActive
                                            ? 'text-primary bg-primary/10' // Active state with subtle background
                                            : 'text-muted-foreground/70 hover:text-foreground hover:bg-muted/20'}
                                    `}
                                >
                                    <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                                </button>
                            );
                        })}
                    </nav>

                    {/* Bottom Logo or Action */}
                    <div className="p-3 mb-2 flex justify-center opacity-50 hover:opacity-100 transition-opacity">
                        <EngramIcon size={16} className="text-muted-foreground" />
                    </div>
                </aside>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 bg-background flex flex-col p-6 animate-in slide-in-from-top-4 md:hidden">
                        <div className="flex justify-end mb-8">
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={24} className="text-muted-foreground" />
                            </button>
                        </div>
                        <nav className="space-y-6">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                                    className={`text-2xl font-light block w-full text-left transition-colors ${activeTab === item.id ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <item.icon size={20} />
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col relative w-full overflow-hidden bg-background/50">
                    <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 lg:px-12 pb-20 pt-0 scroll-smooth">
                        <div className="max-w-6xl mx-auto min-h-full fade-in pt-6">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

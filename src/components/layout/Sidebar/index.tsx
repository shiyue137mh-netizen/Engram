// 侧边栏组件 - 仅一级导航
import React from 'react';
import { X } from 'lucide-react';
import { NAV_ITEMS, type NavItem } from '@/constants/navigation';
import manifest from '../../../../manifest.json';

interface SidebarProps {
    currentPath: string;
    onNavigate: (path: string) => void;
    isOpen: boolean;
    onClose: () => void;
    isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
    currentPath,
    onNavigate,
    isOpen,
    onClose,
    isMobile,
}) => {
    const handleNavClick = (item: NavItem) => {
        // 直接导航到该页面（包含子标签的页面会在页面内显示标签）
        onNavigate(item.path);
        if (isMobile) onClose();
    };

    const isActive = (path: string) => currentPath.startsWith(path);

    // 移动端遮罩层
    if (isMobile && !isOpen) return null;

    return (
        <>
            {/* 移动端遮罩 */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-background-80 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* 一级导航 */}
            <nav className={`
                flex flex-col
                ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs border-r shadow-lg transform transition-transform duration-300 ease-in-out' : 'w-16 border-r'}
                ${isMobile && !isOpen ? '-translate-x-full' : ''}
                bg-sidebar text-sidebar-foreground border-sidebar-border
            `}>
                {/* 移动端关闭按钮 */}
                {isMobile && (
                    <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                        <span className="font-semibold text-lg">导航</span>
                        <button
                            className="p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                            onClick={onClose}
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                <ul className="flex flex-col gap-4 p-2 mt-4 items-center w-full">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id} className="w-full flex justify-center">
                            <button
                                className={`
                                    flex items-center justify-center p-3 rounded-xl transition-all duration-300 group relative
                                    ${isActive(item.path)
                                        ? 'bg-primary-20 text-primary shadow-[0_0_15px_rgba(0,0,0,0.2)]'
                                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                    }
                                    ${!isMobile ? 'w-10 h-10' : 'w-full gap-3 px-4'}
                                `}
                                onClick={() => handleNavClick(item)}
                                title={item.label}
                            >
                                <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                                {isMobile && <span className="font-medium text-sm">{item.label}</span>}

                                {/* Active Indicator Dot */}
                                {isActive(item.path) && !isMobile && (
                                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-l-full shadow-[0_0_8px_var(--primary)]" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* 版本号 */}
                <div className={`mt-auto mb-4 text-[10px] text-muted-foreground/50 text-center font-mono ${isMobile ? 'hidden' : ''}`}>
                    v{manifest.version}
                </div>
            </nav>
        </>
    );
};

export default Sidebar;

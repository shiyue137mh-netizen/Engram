// 侧边栏组件 - 仅一级导航
import React from 'react';
import { X } from 'lucide-react';
import { NAV_ITEMS, type NavItem } from '../../../constants/navigation';

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
                <div className="engram-sidebar-overlay" onClick={onClose} />
            )}

            {/* 一级导航 */}
            <nav className={`engram-sidebar ${isOpen ? 'open' : ''}`}>
                {/* 移动端关闭按钮 */}
                {isMobile && (
                    <div className="engram-sidebar-header">
                        <span>导航</span>
                        <button className="engram-icon-btn" onClick={onClose}>
                            <X size={18} />
                        </button>
                    </div>
                )}

                <ul className="engram-nav-list">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id} className="engram-nav-item">
                            <button
                                className={`engram-nav-btn ${isActive(item.path) ? 'active' : ''}`}
                                onClick={() => handleNavClick(item)}
                                title={item.label}
                            >
                                <item.icon size={20} />
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;

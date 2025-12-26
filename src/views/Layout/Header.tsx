// 头部组件
import React from 'react';
import { Maximize2, Minimize2, Menu, X } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

interface HeaderProps {
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
    onToggleSidebar: () => void;
    isMobile: boolean;
    onClose?: () => void;
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    isFullscreen,
    onToggleFullscreen,
    onToggleSidebar,
    isMobile,
    onClose,
    onNavigate,
}) => {
    return (
        <header className="engram-header">
            <div className="engram-header-left">
                {isMobile && (
                    <button
                        className="engram-icon-btn"
                        onClick={onToggleSidebar}
                        title="菜单"
                    >
                        <Menu size={20} />
                    </button>
                )}
                <span className="engram-logo-text">Engram</span>
            </div>

            {/* Command Palette (居中) */}
            <div className="engram-header-center">
                <CommandPalette onNavigate={onNavigate} />
            </div>

            <div className="engram-header-right">
                <button
                    className="engram-icon-btn"
                    onClick={onToggleFullscreen}
                    title={isFullscreen ? '退出全屏' : '全屏'}
                >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>

                <button
                    className="engram-icon-btn engram-close-btn"
                    onClick={onClose}
                    title="关闭"
                >
                    <X size={18} />
                </button>
            </div>
        </header>
    );
};

export default Header;

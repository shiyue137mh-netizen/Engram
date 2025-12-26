// 主布局容器
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar/index';
import SearchBar from './SearchBar';

interface LayoutProps {
    children: React.ReactNode;
    currentPath: string;
    onNavigate: (path: string) => void;
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
    onCloseSidebar: () => void;
    isMobile: boolean;
    onClose?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    currentPath,
    onNavigate,
    isFullscreen,
    onToggleFullscreen,
    isSidebarOpen,
    onToggleSidebar,
    onCloseSidebar,
    isMobile,
    onClose,
}) => {
    return (
        <div className={`engram-layout ${isFullscreen ? 'eg-fullscreen' : ''}`}>
            <Header
                isFullscreen={isFullscreen}
                onToggleFullscreen={onToggleFullscreen}
                onToggleSidebar={onToggleSidebar}
                isMobile={isMobile}
                onClose={onClose}
            />

            <div className="engram-body">
                <Sidebar
                    currentPath={currentPath}
                    onNavigate={onNavigate}
                    isOpen={isSidebarOpen}
                    onClose={onCloseSidebar}
                    isMobile={isMobile}
                />

                <main className="engram-content">
                    {children}
                </main>
            </div>

            <SearchBar />
        </div>
    );
};

export default Layout;

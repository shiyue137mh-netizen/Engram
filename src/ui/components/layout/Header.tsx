import React from 'react';
import { Menu, X } from 'lucide-react';
import { CommandPalette } from '@/ui/components/ui/CommandPalette';
import { EngramIcon } from '@/ui/assets/icons/EngramIcon';
import { EngramTextLogo } from '@/ui/assets/icons/EngramTextLogo';

interface HeaderProps {
    onToggleSidebar: () => void;
    isMobile: boolean;
    onClose?: () => void;
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    onToggleSidebar,
    isMobile, // Deprecated prop, handled by CSS
    onClose,
    onNavigate,
}) => {
    return (
        <header className="h-10 flex items-center justify-between px-4 bg-transparent z-50 transition-all duration-300 w-full flex-shrink-0">
            {/* Left: Logo & Mobile Toggle */}
            <div className="flex items-center gap-3 w-16 md:w-64">
                {/* Mobile Menu Toggle */}
                <button
                    className="p-2 -ml-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden"
                    onClick={onToggleSidebar}
                    title="菜单"
                >
                    <Menu size={18} />
                </button>

                {/* Logo - PC 端显示图形+文字 */}
                <div className="hidden md:flex items-center gap-2">
                    <EngramIcon size={18} className="text-primary" />
                    <span className="font-semibold text-sidebar-foreground tracking-tight">Engram</span>
                </div>
            </div>

            {/* Center: Spacer */}
            <div className="flex-1" />

            {/* Right: Window Controls */}
            <div className="flex items-center gap-1 md:gap-2">
                <CommandPalette onNavigate={onNavigate} />
                <div className="h-4 w-[1px] bg-border mx-1" />
                <button
                    className="p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground"
                    onClick={onClose}
                    title="关闭扩展"
                >
                    <X size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;

/**
 * QuickLinks - 快速跳转链接组件
 *
 * 用于页面右上角的快速导航跳转，统一的小图标 + 文字样式
 * 支持自定义图标和跳转目标
 */
import React from 'react';
import { ExternalLink, type LucideIcon } from 'lucide-react';

export interface QuickLink {
    id: string;
    label: string;
    icon?: LucideIcon;  // 可选自定义图标，默认使用 ExternalLink
    linkTo: string;     // 跳转目标路径
}

interface QuickLinksProps {
    links: QuickLink[];
    onNavigate: (path: string) => void;
    className?: string;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ links, onNavigate, className = '' }) => {
    if (links.length === 0) return null;

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {links.map((link) => {
                const Icon = link.icon || ExternalLink;
                return (
                    <button
                        key={link.id}
                        className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                        onClick={() => onNavigate(link.linkTo)}
                        title={link.label}
                    >
                        <Icon size={12} className="transition-transform duration-[var(--duration-fast)] group-hover:scale-110" />
                        <span>{link.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default QuickLinks;

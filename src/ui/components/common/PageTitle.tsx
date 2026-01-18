import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PageTitleProps {
    title: string;
    breadcrumbs?: string[];
    subtitle?: string;
    actions?: React.ReactNode;
    className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumbs = [], subtitle, actions, className = '' }) => (
    <div className={`mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500 ${className}`}>
        <div>
            <h1 className="text-3xl font-light tracking-tight text-foreground flex items-center gap-2">
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <span className="text-muted-foreground/60 hover:text-foreground/80 transition-colors text-xl">{crumb}</span>
                        <ChevronRight size={20} className="text-muted-foreground/30 px-0.5" />
                    </React.Fragment>
                ))}
                <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] text-foreground">{title}</span>
            </h1>
            {subtitle && <p className="mt-2 text-muted-foreground text-sm font-light">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
    </div>
);

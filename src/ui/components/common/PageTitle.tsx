import React from 'react';

interface PageTitleProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, actions, className = '' }) => (
    <div className={`mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500 ${className}`}>
        <div>
            <h1 className="text-3xl font-light tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="mt-2 text-muted-foreground text-sm font-light">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
    </div>
);

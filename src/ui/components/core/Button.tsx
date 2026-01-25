import React from 'react';

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ElementType;
    label: string;
    primary?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const ModernButton: React.FC<ModernButtonProps> = ({
    icon: Icon,
    label,
    primary = false,
    size = 'md',
    className = '',
    ...props
}) => (
    <button
        className={`
            flex items-center gap-2 rounded-full font-medium
            transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]
            hover:scale-[1.02] active:scale-95
            ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'}
            ${primary
                ? 'bg-primary text-primary-foreground hover:opacity-90 hover:shadow-[0_0_20px_var(--primary)] border border-transparent'
                : 'bg-transparent text-muted-foreground hover:text-foreground border border-border hover:border-input hover:bg-accent/50'
            }
            ${className}
        `}
        {...props}
    >
        {Icon && <Icon size={size === 'sm' ? 14 : 16} className="transition-transform duration-[var(--duration-fast)] group-hover:scale-110" />}
        {label}
    </button>
);

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
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'}
            ${primary
                ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent'
                : 'text-muted-foreground hover:text-foreground border border-border hover:border-input'
            }
            ${className}
        `}
        {...props}
    >
        {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
        {label}
    </button>
);

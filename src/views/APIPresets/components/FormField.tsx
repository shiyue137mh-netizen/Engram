import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, description, children, className = '' }) => (
    <div className={`mb-8 ${className}`}>
        <div className="mb-4">
            <h3 className="text-sm font-medium text-primary">{title}</h3>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

interface BaseFieldProps {
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    className?: string;
}

interface TextFieldProps extends BaseFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'url';
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
}

/**
 * 极简文本输入框 - 无背景，只有底部衬线
 * 使用内联 style 覆盖酒馆全局 CSS
 */
export const TextField: React.FC<TextFieldProps> = ({
    label,
    description,
    error,
    required,
    className = '',
    value,
    onChange,
    placeholder,
    type = 'text',
    disabled,
    multiline,
    rows = 3,
}) => {
    // 内联样式强制覆盖酒馆 CSS
    const inputStyle: React.CSSProperties = {
        background: 'transparent',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        borderRadius: 0,
        boxShadow: 'none',
        outline: 'none',
        padding: '8px 0',
        fontSize: '14px',
        width: '100%',
        color: 'var(--foreground, inherit)',
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-xs text-muted-foreground flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows}
                    style={inputStyle}
                    className="font-mono resize-y min-h-[80px] placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={inputStyle}
                    className="placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
                />
            )}
            {description && <p className="text-[10px] text-muted-foreground/70">{description}</p>}
            {error && <p className="text-[10px] text-destructive">{error}</p>}
        </div>
    );
};

interface NumberFieldProps extends BaseFieldProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    showSlider?: boolean;
    suffix?: string;
}

/**
 * 极简数字输入 - 细线滑块 + 底部衬线输入框
 * 完全使用 div 模拟滑块外观，input opacity=0 负责交互
 */
export const NumberField: React.FC<NumberFieldProps> = ({
    label,
    description,
    error,
    required,
    className = '',
    value,
    onChange,
    min,
    max,
    step = 1,
    showSlider = true,
    suffix,
}) => {
    // 内联样式强制覆盖
    const numberInputStyle: React.CSSProperties = {
        background: 'transparent',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        borderRadius: 0,
        boxShadow: 'none',
        outline: 'none',
        padding: '4px 0',
        fontSize: '12px',
        width: '64px',
        textAlign: 'right' as const,
        fontFamily: 'monospace',
        color: 'var(--foreground, inherit)',
    };

    // 计算百分比
    const percentage = min !== undefined && max !== undefined
        ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
        : 0;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex justify-between items-center">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                    {label}
                    {required && <span className="text-destructive">*</span>}
                </label>
            </div>

            <div className="flex items-center gap-3">
                {showSlider && min !== undefined && max !== undefined && (
                    <div className="flex-1 relative h-4 flex items-center group cursor-pointer">
                        {/* 极简滑块轨道 - 1px 细线 - 与 UI 分割线一致 */}
                        {/* 极简滑块轨道 - 1px 细线 - 与 UI 分割线一致 */}
                        <div
                            className="absolute inset-x-0 h-[1px]"
                            style={{ backgroundColor: 'var(--border)' }}
                        />

                        {/* 移除已填充部分，保持单色极简 */}
                        {/* <div className="absolute left-0 h-[1px] bg-primary/80" style={{ width: `${percentage}%` }} /> */}

                        {/* 自定义 Thumb (圆点) - 使用低调的中性色 */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground"
                            style={{ left: `${percentage}%`, transform: `translate(-50%, -50%)` }}
                        />

                        {/* 交互层 - 透明 input */}
                        <input
                            type="range"
                            min={min}
                            max={max}
                            step={step}
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                            style={{ appearance: 'none', WebkitAppearance: 'none' }}
                        />
                    </div>
                )}
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={numberInputStyle}
                    className="focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
            {description && <p className="text-[10px] text-muted-foreground/70">{description}</p>}
            {error && <p className="text-[10px] text-destructive">{error}</p>}
        </div>
    );
};

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps extends BaseFieldProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
}

/**
 * 极简下拉框 - 无背景，只有底部衬线
 * 使用内联 style 覆盖酒馆全局 CSS
 */
export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    description,
    error,
    required,
    className = '',
    value,
    onChange,
    options,
    placeholder = '请选择...',
    disabled,
}) => {
    // 内联样式强制覆盖
    const selectStyle: React.CSSProperties = {
        background: 'transparent',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        borderRadius: 0,
        boxShadow: 'none',
        outline: 'none',
        padding: '8px 24px 8px 0',
        fontSize: '14px',
        width: '100%',
        cursor: 'pointer',
        color: 'var(--foreground, inherit)',
        appearance: 'none' as const,
        WebkitAppearance: 'none' as const,
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-xs text-muted-foreground flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    style={selectStyle}
                    className="disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors"
                >
                    <option value="" disabled className="bg-popover text-muted-foreground">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-popover text-foreground">
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" />
            </div>
            {description && <p className="text-[10px] text-muted-foreground/70">{description}</p>}
            {error && <p className="text-[10px] text-destructive">{error}</p>}
        </div>
    );
};

interface SwitchFieldProps extends Omit<BaseFieldProps, 'required'> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

/**
 * 极简开关 - 1px 细线轨道 + 小圆点
 */
export const SwitchField: React.FC<SwitchFieldProps> = ({
    label,
    description,
    error,
    className = '',
    checked,
    onChange,
    disabled,
}) => {
    return (
        <div className={`flex items-start justify-between gap-4 py-1 ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {label && ( // 只有当 label 存在时才渲染左侧区域，避免只有开关时占用过多空间
                <div className="flex-1">
                    <label
                        className="text-xs text-foreground cursor-pointer"
                        onClick={() => !disabled && onChange(!checked)}
                    >
                        {label}
                    </label>
                    {description && <p className="text-[10px] text-muted-foreground/70 mt-0.5">{description}</p>}
                    {error && <p className="text-[10px] text-destructive mt-0.5">{error}</p>}
                </div>
            )}

            {/* 极简开关按钮 */}
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => !disabled && onChange(!checked)}
                disabled={disabled}
                className="relative inline-flex h-4 w-8 shrink-0 items-center justify-center cursor-pointer focus:outline-none group"
            >
                {/* 1px 细线轨道 - 始终保持边框色 */}
                <span
                    className="absolute left-0 w-full h-[1px]"
                    style={{ backgroundColor: 'var(--border)' }}
                />

                {/* 悬浮圆点 - 选中变白/亮，未选中变灰 */}
                <span
                    className={`
                        absolute block h-2.5 w-2.5 rounded-full shadow-sm transition-all duration-200 group-hover:scale-110
                        ${checked ? 'left-full -translate-x-full bg-foreground' : 'left-0 bg-muted-foreground'}
                    `}
                    style={{ top: '50%', transform: checked ? 'translate(-100%, -50%)' : 'translate(0, -50%)' }}
                />
            </button>
        </div>
    );
};

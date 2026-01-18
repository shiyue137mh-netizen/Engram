import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Switch } from '@/ui/components/ui/Switch';

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
            {description && <p className="text-xs text-muted-foreground mt-1 break-words">{description}</p>}
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
    readOnly?: boolean;
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
    readOnly,
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
                    readOnly={readOnly}
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
                    readOnly={readOnly}
                    style={inputStyle}
                    className="placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
                />
            )}
            {description && <p className="text-[10px] text-muted-foreground/70 break-words">{description}</p>}
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
        borderRadius: 0,
        boxShadow: 'none',
        outline: 'none',
        padding: '0',
        fontSize: '12px',
        width: 'auto',
        minWidth: '40px',
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
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={numberInputStyle}
                    className="focus:text-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>

            <div className="flex items-center gap-3 pt-1">
                {showSlider && min !== undefined && max !== undefined && (
                    <div className="flex-1 relative h-4 flex items-center group cursor-pointer">
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
            </div>
            {description && <p className="text-[10px] text-muted-foreground/70 break-words">{description}</p>}
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
            {description && <p className="text-[10px] text-muted-foreground/70 break-words">{description}</p>}
            {error && <p className="text-[10px] text-destructive">{error}</p>}
        </div>
    );
};

interface SwitchFieldProps extends Omit<BaseFieldProps, 'required'> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    compact?: boolean;
}

/**
 * 极简开关 - 胶囊形轨道 + 圆点
 * 优化可视性，遵循无框流体设计
 */
export const SwitchField: React.FC<SwitchFieldProps> = ({
    label,
    description,
    error,
    className = '',
    checked,
    onChange,
    disabled,
    compact,
}) => {
    return (
        <div className={`flex items-start justify-between gap-4 ${compact ? 'py-0' : 'py-1'} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {label && (
                <div className="flex-1 min-w-0">
                    <label
                        className="text-xs text-foreground cursor-pointer block truncate"
                        onClick={() => !disabled && onChange(!checked)}
                    >
                        {label}
                    </label>
                    {description && <p className="text-[10px] text-muted-foreground/70 mt-0.5 break-words">{description}</p>}
                    {error && <p className="text-[10px] text-destructive mt-0.5">{error}</p>}
                </div>
            )}

            {/* 开关按钮 - 使用共享组件 */}
            <Switch
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

/**
 * 可搜索下拉框 - 用于大量选项的模型选择
 * 点击展开下拉，支持输入搜索过滤
 */
interface SearchableSelectFieldProps extends BaseFieldProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    emptyText?: string;
}

export const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
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
    emptyText = '无可用选项',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 过滤选项
    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase()) ||
        opt.value.toLowerCase().includes(search.toLowerCase())
    );

    // 当前选中的 label
    const selectedLabel = options.find(opt => opt.value === value)?.label || value || placeholder;

    // 点击外部关闭
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 打开时聚焦搜索框
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (optValue: string) => {
        onChange(optValue);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`} ref={containerRef}>
            <label className="text-xs text-muted-foreground flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
            </label>

            {/* 触发按钮 */}
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className="relative w-full text-left py-2 pr-6 border-0 border-b border-border bg-transparent text-sm text-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors"
            >
                <span className={value ? '' : 'text-muted-foreground'}>{selectedLabel}</span>
                <ChevronDown
                    size={14}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* 下拉面板 - 使用 glass-panel 实现正确的模糊效果 */}
            {isOpen && (
                <div className="glass-panel absolute z-50 mt-1 w-full max-h-64 border border-border rounded-lg shadow-xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-1 duration-150"
                    style={{ top: '100%', left: 0, right: 0 }}
                >
                    {/* 搜索框 */}
                    <div className="p-2 border-b border-border flex items-center gap-2">
                        <Search size={14} className="text-muted-foreground flex-shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="搜索模型..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                className="p-0.5 hover:bg-muted rounded"
                            >
                                <X size={12} className="text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {/* 选项列表 */}
                    <div className="overflow-y-auto max-h-48">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => handleSelect(opt.value)}
                                    className={`px-3 py-2 cursor-pointer text-sm truncate transition-colors ${opt.value === value
                                        ? 'bg-primary/15 text-primary'
                                        : 'hover:bg-muted text-foreground'
                                        }`}
                                    title={opt.label}
                                >
                                    {opt.label}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                                {search ? '无匹配结果' : emptyText}
                            </div>
                        )}
                    </div>

                    {/* 选项计数 */}
                    {options.length > 10 && (
                        <div className="px-3 py-1 border-t border-border text-xs text-muted-foreground/70">
                            {filteredOptions.length} / {options.length} 个模型
                        </div>
                    )}
                </div>
            )}

            {description && <p className="text-[10px] text-muted-foreground/70 break-words">{description}</p>}
            {error && <p className="text-[10px] text-destructive">{error}</p>}
        </div>
    );
};

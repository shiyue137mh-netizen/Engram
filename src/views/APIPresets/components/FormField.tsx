import React from 'react';
import { HelpCircle, ChevronDown, Check } from 'lucide-react';

interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, description, children, className = '' }) => (
    <div className={`mb-8 ${className}`}>
        <div className="mb-4">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
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
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
            </label>
            <div className="relative group">
                {multiline ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={rows}
                        className={`
                            engram-input w-full bg-transparent text-foreground text-sm px-3 py-2 border border-input rounded-md
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`
                            engram-input w-full bg-transparent text-foreground text-sm px-3 py-2 border border-input rounded-md
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    />
                )}
            </div>
            {description && <p className="text-[10px] text-muted-foreground/80">{description}</p>}
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
}

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
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    {label}
                    {required && <span className="text-destructive">*</span>}
                </label>
                <div className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 rounded">
                    {value}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {showSlider && min !== undefined && max !== undefined && (
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80"
                    />
                )}
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={`
                        bg-transparent border border-input rounded-md text-foreground text-xs px-2 py-1 font-mono text-center
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-20
                        [appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
                    `}
                />
            </div>
            {description && <p className="text-[10px] text-muted-foreground/80">{description}</p>}
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

export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    description,
    error,
    required,
    className = '',
    value,
    onChange,
    options,
    placeholder = 'Select...',
    disabled,
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className={`
                        engram-select w-full bg-transparent text-foreground text-sm pl-3 pr-8 py-2 border border-input rounded-md
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                >
                    <option value="" disabled className="bg-popover text-muted-foreground">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-popover text-foreground">
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            {description && <p className="text-[10px] text-muted-foreground/80">{description}</p>}
            {error && <p className="text-[10px] text-destructive">{error}</p>}
        </div>
    );
};

interface SwitchFieldProps extends Omit<BaseFieldProps, 'required'> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

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
            <div className="flex-1">
                <label className="text-xs font-medium text-foreground cursor-pointer" onClick={() => !disabled && onChange(!checked)}>
                    {label}
                </label>
                {description && <p className="text-[10px] text-muted-foreground/80 mt-0.5">{description}</p>}
                {error && <p className="text-[10px] text-destructive mt-0.5">{error}</p>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => !disabled && onChange(!checked)}
                disabled={disabled}
                className={`
                    relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                    ${checked ? 'bg-primary' : 'bg-input'}
                `}
            >
                <span
                    className={`
                        pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${checked ? 'translate-x-4' : 'translate-x-0'}
                    `}
                />
            </button>
        </div>
    );
};

import React from 'react';

interface SliderFieldProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
}

/**
 * 极简滑块 (Atomic)
 * 纯 div 绘制轨道与 Thumb，隐藏原生 input 仅保留交互
 */
export const SliderField: React.FC<SliderFieldProps> = ({
    min,
    max,
    step = 1,
    value,
    onChange,
    className = ''
}) => {
    const range = max - min;
    const percentage = range === 0 ? 0 : Math.min(100, Math.max(0, ((value - min) / range) * 100));

    return (
        <div className={`relative h-5 flex items-center cursor-pointer group ${className}`}>
            {/* 轨道底 */}
            <div className="absolute inset-x-0 top-1/2 h-1 rounded-full bg-border"
                style={{ transform: 'translateY(-50%)' }}
            />

            {/* 轨道填充 */}
            <div className="absolute left-0 top-1/2 h-1 rounded-full bg-primary"
                style={{ width: `${percentage}%`, transform: 'translateY(-50%)' }}
            />

            {/* Thumb - 纯 div 渲染 */}
            <div
                className="absolute top-1/2 w-3 h-3 rounded-full bg-primary shadow-sm pointer-events-none transition-transform duration-100 ease-out group-hover:scale-125"
                style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
            />

            {/* 交互层 - 隐藏原生 input */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 10,
                    margin: 0,
                    padding: 0,
                }}
            />
        </div>
    );
};

export type { SliderFieldProps };

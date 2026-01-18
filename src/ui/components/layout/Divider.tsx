/**
 * Divider - 统一分割线组件
 *
 * 支持水平和垂直方向，可配置长度百分比
 * 遵循「无框流体」设计语言
 */
import React from 'react';

interface DividerProps {
    /** 分割线方向 */
    orientation?: 'horizontal' | 'vertical';
    /** 长度百分比 (1-100，默认 100) */
    length?: number;
    /** 自定义 className */
    className?: string;
    /** 响应式：移动端水平，桌面端垂直 */
    responsive?: boolean;
    /** 上下间距 (用于水平分割线) */
    spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const spacingClasses = {
    none: '',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
};

/**
 * 分割线组件
 * 使用 border 方式实现，与原有样式保持一致
 *
 * @example
 * // 水平分割线，30% 长度
 * <Divider orientation="horizontal" length={30} />
 *
 * // 垂直分割线，50% 长度
 * <Divider orientation="vertical" length={50} />
 *
 * // 响应式：移动端水平，桌面端垂直
 * <Divider responsive length={30} />
 */
export const Divider: React.FC<DividerProps> = ({
    orientation = 'horizontal',
    length = 100,
    className = '',
    responsive = false,
    spacing = 'none',
}) => {
    const spacingClass = spacingClasses[spacing];

    // 响应式模式：返回两个分割线，移动端显示水平，桌面端显示垂直
    if (responsive) {
        return (
            <>
                {/* 桌面端垂直分割线 - 使用 border-l */}
                <div
                    className={`hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 border-l border-border ${className}`}
                    style={{ height: `${length}%` }}
                />
                {/* 移动端水平分割线 - 使用 border-t */}
                <div
                    className={`lg:hidden border-t border-border/30 mx-auto ${spacingClass} ${className}`}
                    style={{ width: `${length}%` }}
                />
            </>
        );
    }

    // 非响应式模式 - 垂直分割线
    if (orientation === 'vertical') {
        return (
            <div
                className={`border-l border-border/30 mx-auto ${className}`}
                style={{ height: `${length}%` }}
            />
        );
    }

    // 水平分割线 - 使用 border-t
    return (
        <div
            className={`border-t border-border/30 ${spacingClass} ${className}`}
            style={{ width: `${length}%` }}
        />
    );
};

export default Divider;

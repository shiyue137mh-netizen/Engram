import { useResponsive } from '@/ui/hooks/useResponsive';
import React from 'react';
import { MobileFullscreenForm } from './MobileFullscreenForm';

interface MasterDetailLayoutProps {
    /** 列表区域内容 */
    list: React.ReactNode;
    /** 详情区域内容 */
    detail: React.ReactNode;
    /** 顶部工具栏/搜索栏 (可选) */
    header?: React.ReactNode;
    /** PC端列表宽度，默认 '30%'，最小 '240px' */
    listWidth?: string;
    /** 列表区域 Ref (用于控制滚动) */
    listRef?: React.RefObject<HTMLDivElement | null>;

    // --- 移动端相关配置 ---

    /** 移动端详情页是否打开 */
    mobileDetailOpen?: boolean;
    /** 移动端关闭详情页回调 */
    onMobileDetailClose?: () => void;
    /** 移动端详情页标题 */
    mobileDetailTitle?: string;
    /** 移动端详情页顶部操作按钮 */
    mobileDetailActions?: React.ReactNode;

    /** 容器类名 */
    className?: string;
    /** 内联样式 */
    style?: React.CSSProperties;
}

/**
 * MasterDetailLayout - 响应式双栏布局组件
 *
 * 特性：
 * - PC端：左列表右详情，双列独立滚动，高度自适应
 * - 移动端：列表展示，通过 mobileDetailOpen 控制全屏详情页
 * - 统一的滚动条隐藏样式
 */
export const MasterDetailLayout: React.FC<MasterDetailLayoutProps> = ({
    list,
    detail,
    header,
    listRef,
    listWidth = '30%',
    mobileDetailOpen = false,
    onMobileDetailClose,
    mobileDetailTitle = '详情',
    mobileDetailActions,
    className = '',
    style,
}) => {
    const { isMobile } = useResponsive();

    // 移动端全屏详情页
    if (isMobile && mobileDetailOpen) {
        return (
            <MobileFullscreenForm
                title={mobileDetailTitle}
                onClose={onMobileDetailClose || (() => { })}
                actions={mobileDetailActions}
            >
                {detail}
            </MobileFullscreenForm>
        );
    }

    return (
        <div className={`flex flex-col h-full overflow-hidden ${className}`} style={style}>
            {/* 顶部工具栏 (搜索框等) */}
            {header && (
                <div className="shrink-0 mb-4 px-1">
                    {header}
                </div>
            )}

            {/* 主内容区 - 双栏布局 */}
            <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
                {/* 左侧：列表区域 - 独立滚动 */}
                <div
                    className={`
                        flex flex-col overflow-y-auto no-scrollbar
                        ${isMobile ? 'w-full' : 'border-r border-border/50 pr-4'}
                    `}
                    style={{
                        width: isMobile ? '100%' : listWidth,
                        minWidth: isMobile ? 'auto' : '240px'
                    }}
                    ref={listRef}
                >
                    {list}
                </div>

                {/* 右侧：详情区域 - 独立滚动 (仅 PC) */}
                {!isMobile && (
                    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
                        {detail}
                    </div>
                )}
            </div>
        </div >
    );
};

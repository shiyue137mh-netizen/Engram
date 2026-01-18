import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TabPills, TabPillsProps } from '../ui/TabPills';

/**
 * LayoutTabs - 布局级标签导航组件
 *
 * 此组件会自动将 TabPills 渲染到 MainLayout 的 Header 扩展区域 (Portal)。
 * 使用此组件替代标准 TabPills 时，标签栏将固定在页面顶部 Header 下方。
 *
 * 用法: 直接在 View 中渲染，就像普通组件一样。
 */
export const LayoutTabs: React.FC<TabPillsProps> = (props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const container = document.getElementById('engram-header-extension');

    // 如果未挂载或找不到容器，暂不渲染 (或可选择渲染在原位作为 fallback)
    if (!mounted || !container) {
        return null;
    }

    // 在 HeaderExtension 中渲染时，重写样式以适应 Header 上下文
    // 1. 移除 sticky (因为它在 fixed/flex header 中)
    // 2. 移除默认边距 (mb-6) 和边框 (HeaderExtension 已有边框)
    // 3. 移除背景 (HeaderExtension 已有玻璃背景)
    // 4. 增加水平内边距以匹配 Layout 内容区布局 (px-4 md:px-8...)
    const headerProps = {
        ...props,
        sticky: false,
        className: `!mb-0 !border-0 !bg-transparent px-4 md:px-8 lg:px-12 ${props.className || ''}`
    };

    return createPortal(
        <TabPills {...headerProps} />,
        container
    );
};

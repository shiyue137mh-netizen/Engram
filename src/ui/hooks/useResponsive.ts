import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = 768;

interface ResponsiveState {
    isMobile: boolean;
    isDesktop: boolean;
    windowWidth: number;
}

/**
 * useResponsive Hook
 *
 * 统一管理响应式断点状态
 * 使用 window.matchMedia 监听媒体查询变化
 */
export function useResponsive(): ResponsiveState {
    // 初始状态
    const [state, setState] = useState<ResponsiveState>({
        isMobile: window.innerWidth < DESKTOP_BREAKPOINT,
        isDesktop: window.innerWidth >= DESKTOP_BREAKPOINT,
        windowWidth: window.innerWidth,
    });

    useEffect(() => {
        // 更新函数
        const handleResize = () => {
            const width = window.innerWidth;
            const mobile = width < DESKTOP_BREAKPOINT;

            setState({
                isMobile: mobile,
                isDesktop: !mobile,
                windowWidth: width,
            });
        };

        // 防抖包装，避免高频 resize 导致不必要的重绘
        let debounceTimer: ReturnType<typeof setTimeout>;
        const debouncedResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(handleResize, 150);
        };

        // 监听 resize
        window.addEventListener('resize', debouncedResize);

        // 初始检测（立即执行，不走防抖）
        handleResize();

        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(debounceTimer);
        };
    }, []);

    return state;
}

// 导出常量供 CSS-in-JS 或其他地方使用
const BREAKPOINTS = {
    DESKTOP: DESKTOP_BREAKPOINT,
};

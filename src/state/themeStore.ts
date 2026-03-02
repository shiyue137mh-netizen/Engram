/**
 * Theme Store - 使用 Zustand 管理主题状态
 *
 * 替换原有的 ThemeContext，提供更简洁的状态管理
 */

import { ThemeManager } from '@/ui/services/ThemeManager';
import { ThemeName } from '@/ui/styles/themes';
import { create } from 'zustand';

interface ThemeState {
    /** 当前主题名称 */
    theme: ThemeName;
    /** 是否为暗色模式 */
    isDarkMode: boolean;
    /** 设置主题 */
    setTheme: (theme: ThemeName) => void;
}

/**
 * 主题状态 Store
 *
 * 用法：
 * ```tsx
 * import { useThemeStore } from '@/stores/themeStore';
 *
 * function Component() {
 *     const { theme, setTheme, isDarkMode } = useThemeStore();
 *     // 或者选择性订阅
 *     const theme = useThemeStore(state => state.theme);
 * }
 * ```
 */
export const useThemeStore = create<ThemeState>((set) => ({
    theme: ThemeManager.getTheme(),
    isDarkMode: !['tokyoLight', 'catppuccinLatte'].includes(ThemeManager.getTheme()),

    setTheme: (theme) => {
        ThemeManager.setTheme(theme);
        set({
            theme,
            isDarkMode: !['tokyoLight', 'catppuccinLatte'].includes(theme)
        });
    },
}));

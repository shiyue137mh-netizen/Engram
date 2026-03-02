import { SettingsManager } from '@/config/settings';
import { Logger } from '@/core/logger';
import { ThemeName, themes } from '../styles/themes';

/**
 * ThemeManager - 全局主题管理器
 * 负责在 React 生命周期之外管理 CSS 变量和样式表
 */
export class ThemeManager {
    private static STORAGE_KEY = 'engram-theme';
    private static currentTheme: ThemeName = 'claudeDark';

    /**
     * 初始化主题系统
     */
    public static init() {
        // 1. 注入 CSS 文件
        this.injectStyles();

        // 2. 加载并应用已保存的主题
        // 优先使用 extension_settings，如果没有则回退到 localStorage (顺便尝试迁移)
        const settings = SettingsManager.loadSettings();
        let saved = settings.theme as ThemeName;

        if (!saved) {
            saved = localStorage.getItem(this.STORAGE_KEY) as ThemeName;
            if (saved) {
                // Migrate to SettingsManager
                SettingsManager.set('theme', saved);
            }
        }

        const themeToLoad = themes[saved] ? saved : 'claudeDark'; // Default to Claude Dark
        this.setTheme(themeToLoad);

        Logger.info('ThemeManager', `主题系统初始化完成: ${themeToLoad}`);
    }

    /**
     * 切换主题
     */
    public static setTheme(themeName: ThemeName) {
        if (!themes[themeName]) {
            Logger.warn('ThemeManager', `未知主题: ${themeName}, 回退到 claudeDark`);
            themeName = 'claudeDark';
        }

        this.currentTheme = themeName;
        // Save to SettingsManager (ST persistence)
        SettingsManager.set('theme', themeName);
        // Also keep localStorage for redundancy/boot speed if ST isn't ready immediately
        localStorage.setItem(this.STORAGE_KEY, themeName);

        this.applyThemeVariables(themeName);
    }

    /**
     * 获取当前主题
     */
    public static getTheme(): ThemeName {
        return this.currentTheme;
    }

    /**
     * 注入样式表 (dist/style.css)
     */
    private static injectStyles() {
        const cssId = 'engram-styles';
        if (document.getElementById(cssId)) return;

        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        // 注意：这里假设 dist/style.css 路径是相对于 index.html 的
        // 添加时间戳防止缓存
        link.href = `scripts/extensions/Engram_project/dist/style.css?v=${Date.now()}`;
        document.head.appendChild(link);
    }

    /**
     * 应用 CSS 变量到根元素
     */
    private static applyThemeVariables(themeName: ThemeName) {
        const themeConfig = themes[themeName];
        if (!themeConfig) return;

        const root = document.documentElement;

        // Helper to set variable
        const setVar = (key: string, value: string) => {
            root.style.setProperty(key, value);
        };

        // 1. Colors
        // Universal Transparency Logic
        const settings = SettingsManager.getSettings();
        const glassEnabled = settings.glassSettings?.enabled ?? true;

        // 如果禁用了毛玻璃，强制不透明度为 1 (不透明)
        const opacity = glassEnabled ? (settings.glassSettings?.opacity ?? 1) : 1;

        const isGlassTheme = themeName === 'glass';
        // Only apply mix if not glass theme (glass handles it internally) and opacity < 1
        // 注意：如果是 glass 主题，通常由主题自己定义透明度，但这里我们允许通过 opacity 覆盖
        const shouldApplyTransparency = !isGlassTheme && opacity < 1;
        // Calculate transparency percentage for color-mix (e.g., opacity 0.8 -> 20% transparent)
        const transparencyPercent = Math.round((1 - opacity) * 100);

        // Keys that should be transparentized (backgrounds/borders only, NOT text colors)
        const transparentKeys = [
            'background', 'card', 'popover', 'sidebar',
            'secondary', 'muted', 'input', 'border', 'sidebarBorder'
        ];

        Object.entries(themeConfig.colors).forEach(([key, value]) => {
            // camelCase -> kebab-case (e.g., cardForeground -> --card-foreground)
            let cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            // Handle numbers (chart1 -> --chart-1)
            cssVar = cssVar.replace(/(\d+)/, '-$1');

            let finalValue = value;

            if (shouldApplyTransparency && transparentKeys.includes(key)) {
                // Use color-mix to inject transparency dynamically

                // Border Resistance Logic:
                // Borders should fade much slower than backgrounds to maintain structure
                // If is border, reduce transparency mix by 60% (keep 40% of the fade effect)
                const isBorder = key.toLowerCase().includes('border');
                const effectiveTransparency = isBorder
                    ? Math.round(transparencyPercent * 0.1)
                    : transparencyPercent;

                // Syntax: color-mix(in srgb, OriginalColor, transparent Percentage%)
                finalValue = `color-mix(in srgb, ${value}, transparent ${effectiveTransparency}%)`;
            }

            setVar(cssVar, finalValue);
        });

        // 2. Variables (radius, etc)
        Object.entries(themeConfig.variables).forEach(([key, value]) => {
            setVar(`--${key}`, value);
        });

        // 3. Toggle dark mode class
        const isDark = !['tokyoLight', 'catppuccinLatte'].includes(themeName);
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // 4. Inject Glass Settings
        const glassSettings = SettingsManager.getSettings().glassSettings;
        if (glassSettings && glassSettings.enabled) {
            setVar('--glass-opacity', glassSettings.opacity.toString());
            setVar('--glass-blur', `${glassSettings.blur}px`);

            // 只要设置了 blur，就应用到所有主题 (不仅仅是 glass)
            if (glassSettings.blur > 0) {
                setVar('--glass-backdrop-filter', `blur(${glassSettings.blur}px)`);
            } else {
                setVar('--glass-backdrop-filter', 'none');
            }
        } else {
            // Fallback / Disabled
            setVar('--glass-opacity', '1');
            setVar('--glass-blur', '0px');
            setVar('--glass-backdrop-filter', 'none');
        }
    }
}

/**
 * Theme 类型定义和主题配置
 */

export interface Theme {
    name: string;
    colors: {
        background: string;
        foreground: string;
        card: string;
        cardForeground: string;
        popover: string;
        popoverForeground: string;
        primary: string;
        primaryForeground: string;
        secondary: string;
        secondaryForeground: string;
        muted: string;
        mutedForeground: string;
        accent: string;
        accentForeground: string;
        destructive: string;
        destructiveForeground: string;
        border: string;
        input: string;
        ring: string;
        chart1: string;
        chart2: string;
        chart3: string;
        chart4: string;
        chart5: string;
        sidebar: string;
        sidebarForeground: string;
        sidebarPrimary: string;
        sidebarPrimaryForeground: string;
        sidebarAccent: string;
        sidebarAccentForeground: string;
        sidebarBorder: string;
        sidebarRing: string;
    };
    variables: {
        radius: string;
    }
}

// ----------------------------------------------------------------------
// 1. Paper Light (Twitter) - Based on User Provided CSS Variables
// ----------------------------------------------------------------------
export const paperLightTheme: Theme = {
    name: 'Paper (Light)',
    colors: {
        background: 'oklch(1.0000 0 0)',
        foreground: 'oklch(0.1884 0.0128 248.5103)',
        card: 'oklch(0.9784 0.0011 197.1387)',
        cardForeground: 'oklch(0.1884 0.0128 248.5103)',
        popover: 'oklch(1.0000 0 0)',
        popoverForeground: 'oklch(0.1884 0.0128 248.5103)',
        primary: 'oklch(0.6723 0.1606 244.9955)',
        primaryForeground: 'oklch(1.0000 0 0)',
        secondary: 'oklch(0.1884 0.0128 248.5103)',
        secondaryForeground: 'oklch(1.0000 0 0)',
        muted: 'oklch(0.9222 0.0013 286.3737)',
        mutedForeground: 'oklch(0.1884 0.0128 248.5103)',
        accent: 'oklch(0.9392 0.0166 250.8453)',
        accentForeground: 'oklch(0.6723 0.1606 244.9955)',
        destructive: 'oklch(0.6188 0.2376 25.7658)',
        destructiveForeground: 'oklch(1.0000 0 0)',
        border: 'oklch(0.1884 0.0128 248.5103 / 0.15)', // Darker (Foreground based) as requested
        input: 'oklch(0.9809 0.0025 228.7836)',
        ring: 'oklch(0.6818 0.1584 243.3540)',
        chart1: 'oklch(0.6723 0.1606 244.9955)',
        chart2: 'oklch(0.6907 0.1554 160.3454)',
        chart3: 'oklch(0.8214 0.1600 82.5337)',
        chart4: 'oklch(0.7064 0.1822 151.7125)',
        chart5: 'oklch(0.5919 0.2186 10.5826)',

        sidebar: 'oklch(0.9784 0.0011 197.1387)',
        sidebarForeground: 'oklch(0.1884 0.0128 248.5103)',
        sidebarPrimary: 'oklch(0.6723 0.1606 244.9955)',
        sidebarPrimaryForeground: 'oklch(1.0000 0 0)',
        sidebarAccent: 'oklch(0.9392 0.0166 250.8453)',
        sidebarAccentForeground: 'oklch(0.6723 0.1606 244.9955)',
        sidebarBorder: 'oklch(0.1884 0.0128 248.5103 / 0.1)', // Darker (Foreground based)
        sidebarRing: 'oklch(0.6818 0.1584 243.3540)',
    },
    variables: {
        radius: '1.3rem',
    }
};

// ----------------------------------------------------------------------
// 2. Claude Dark (formerly Paper Dark)
// ----------------------------------------------------------------------
export const claudeDarkTheme: Theme = {
    name: 'Claude (Dark)',
    colors: {
        background: 'oklch(0.2679 0.0036 106.6427)',
        foreground: 'oklch(0.8074 0.0142 93.0137)',
        card: 'oklch(0.2679 0.0036 106.6427)',
        cardForeground: 'oklch(0.8074 0.0142 93.0137)',
        popover: 'oklch(0.2357 0.0024 67.7077)',
        popoverForeground: 'oklch(0.8074 0.0142 93.0137)',
        primary: 'oklch(0.6724 0.1308 38.7559)',
        primaryForeground: 'oklch(1.0000 0 0)',
        secondary: 'oklch(0.2213 0.0038 106.7070)',
        secondaryForeground: 'oklch(0.8074 0.0142 93.0137)',
        muted: 'oklch(0.2357 0.0024 67.7077)',
        mutedForeground: 'oklch(0.7713 0.0169 99.0657)',
        accent: 'oklch(0.6724 0.1308 38.7559)',
        accentForeground: 'oklch(1.0000 0 0)',
        destructive: 'oklch(0.6368 0.2078 25.3313)',
        destructiveForeground: 'oklch(1.0000 0 0)',
        border: 'oklch(0.8074 0.0142 93.0137 / 0.15)', // Foreground / 0.15
        input: 'oklch(0.4336 0.0113 100.2195)',
        ring: 'oklch(0.6724 0.1308 38.7559)',
        chart1: 'oklch(0.6724 0.1308 38.7559)',
        chart2: 'oklch(0.6898 0.1581 290.4107)',
        chart3: 'oklch(0.8816 0.0276 93.1280)',
        chart4: 'oklch(0.3074 0.0516 289.3230)',
        chart5: 'oklch(0.6368 0.2078 25.3313)',
        sidebar: 'oklch(0.2357 0.0024 67.7077)',
        sidebarForeground: 'oklch(0.7713 0.0169 99.0657)',
        sidebarPrimary: 'oklch(0.6724 0.1308 38.7559)',
        sidebarPrimaryForeground: 'oklch(1.0000 0 0)',
        sidebarAccent: 'oklch(0.2213 0.0038 106.7070)',
        sidebarAccentForeground: 'oklch(0.8074 0.0142 93.0137)',
        sidebarBorder: 'oklch(0.7713 0.0169 99.0657 / 0.15)', // SidebarForeground / 0.15
        sidebarRing: 'oklch(0.6724 0.1308 38.7559)',
    },
    variables: {
        radius: '0.4rem',
    }
};

// ----------------------------------------------------------------------
// 3. Twitter Dark (Black/Blue) - New
// ----------------------------------------------------------------------
export const twitterDarkTheme: Theme = {
    name: 'Twitter (Dark)',
    colors: {
        background: 'oklch(0 0 0)',
        foreground: 'oklch(0.9328 0.0025 228.7857)',
        card: 'oklch(0 0 0)', // Matching background for seamless look, or slightly lighter
        cardForeground: 'oklch(0.9328 0.0025 228.7857)',
        popover: 'oklch(0 0 0)',
        popoverForeground: 'oklch(0.9328 0.0025 228.7857)',
        primary: 'oklch(0.6692 0.1607 245.0110)',
        primaryForeground: 'oklch(1.0000 0 0)',
        secondary: 'oklch(0.2097 0.0080 274.5332)', // Using card color from ref as secondary
        secondaryForeground: 'oklch(0.8853 0 0)',
        muted: 'oklch(0.2090 0 0)',
        mutedForeground: 'oklch(0.5637 0.0078 247.9662)',
        accent: 'oklch(0.1928 0.0331 242.5459)',
        accentForeground: 'oklch(0.6692 0.1607 245.0110)',
        destructive: 'oklch(0.6188 0.2376 25.7658)',
        destructiveForeground: 'oklch(1.0000 0 0)',
        border: 'oklch(0.9328 0.0025 228.7857 / 0.15)', // Foreground / 0.15
        input: 'oklch(0.3020 0.0288 244.8244)',
        ring: 'oklch(0.6818 0.1584 243.3540)',
        chart1: 'oklch(0.6723 0.1606 244.9955)',
        chart2: 'oklch(0.6907 0.1554 160.3454)',
        chart3: 'oklch(0.8214 0.1600 82.5337)',
        chart4: 'oklch(0.7064 0.1822 151.7125)',
        chart5: 'oklch(0.5919 0.2186 10.5826)',

        sidebar: 'oklch(0 0 0)',
        sidebarForeground: 'oklch(0.9328 0.0025 228.7857)',
        sidebarPrimary: 'oklch(0.6692 0.1607 245.0110)',
        sidebarPrimaryForeground: 'oklch(1.0000 0 0)',
        sidebarAccent: 'oklch(0.1928 0.0331 242.5459)',
        sidebarAccentForeground: 'oklch(0.6692 0.1607 245.0110)',
        sidebarBorder: 'oklch(0.9328 0.0025 228.7857 / 0.15)', // SidebarForeground / 0.15
        sidebarRing: 'oklch(0.6818 0.1584 243.3540)',
    },
    variables: {
        radius: '1.3rem',
    }
};

// ----------------------------------------------------------------------
// 4. Discord Dark
// ----------------------------------------------------------------------
export const discordTheme: Theme = {
    name: 'Discord (Dark)',
    colors: {
        background: '#313338',
        foreground: '#f2f3f5',
        card: '#2b2d31',
        cardForeground: '#f2f3f5',
        popover: '#313338',
        popoverForeground: '#f2f3f5',
        primary: '#5865f2',
        primaryForeground: '#ffffff',
        secondary: '#2b2d31',
        secondaryForeground: '#f2f3f5',
        muted: '#1e1f22',
        mutedForeground: '#949ba4',
        accent: '#3f4147',
        accentForeground: '#f2f3f5',
        destructive: '#fa777c',
        destructiveForeground: '#313338',
        border: '#f2f3f526', // Foreground #f2f3f5 with ~15% alpha
        input: '#1e1f22',
        ring: '#5865f2',
        chart1: '#5865f2',
        chart2: '#23a559',
        chart3: '#f0b232',
        chart4: '#00a8fc',
        chart5: '#eb459e',
        sidebar: '#1e1f22',
        sidebarForeground: '#949ba4',
        sidebarPrimary: '#5865f2',
        sidebarPrimaryForeground: '#ffffff',
        sidebarAccent: '#3f4147',
        sidebarAccentForeground: '#f2f3f5',
        sidebarBorder: '#949ba426', // SidebarForeground #949ba4 with ~15% alpha
        sidebarRing: '#5865f2',
    },
    variables: {
        radius: '0.25rem',
    }
};

// ----------------------------------------------------------------------
// 5. Catppuccin Mocha - Modified (Mauve Text)
// ----------------------------------------------------------------------
export const catppuccinTheme: Theme = {
    name: 'Catppuccin Mocha',
    colors: {
        background: '#1e1e2e',
        // foreground: '#cdd6f4', // Old Text
        foreground: '#cba6f7',    // Modified: Mauve as requested

        card: '#313244',
        cardForeground: '#cba6f7', // Also match text

        popover: '#1e1e2e',
        popoverForeground: '#cba6f7',

        primary: '#89b4fa',
        primaryForeground: '#1e1e2e',

        secondary: '#45475a',
        secondaryForeground: '#cba6f7',

        muted: '#313244',
        mutedForeground: '#a6adc8',

        accent: '#45475a',
        accentForeground: '#cba6f7',

        destructive: '#f38ba8',
        destructiveForeground: '#1e1e2e',

        border: '#cba6f726', // Mauve with ~15% alpha
        input: '#313244',
        ring: '#89b4fa',

        chart1: '#89b4fa',
        chart2: '#a6e3a1',
        chart3: '#f9e2af',
        chart4: '#fab387',
        chart5: '#cba6f7',

        sidebar: '#181825',
        sidebarForeground: '#cba6f7', // Mauve
        sidebarPrimary: '#89b4fa',
        sidebarPrimaryForeground: '#1e1e2e',
        sidebarAccent: '#313244',
        sidebarAccentForeground: '#cba6f7',
        sidebarBorder: '#cba6f726', // Mauve with ~15% alpha
        sidebarRing: '#89b4fa',
    },
    variables: {
        radius: '0.5rem',
    }
};

// ----------------------------------------------------------------------
// 6. SillyTavern Inherited Theme - 继承酒馆主题
// ----------------------------------------------------------------------
export const sillyTavernTheme: Theme = {
    name: 'SillyTavern (继承)',
    colors: {
        background: 'var(--SmartThemeBlurTintColor)',
        foreground: 'var(--SmartThemeBodyColor)',
        card: 'var(--SmartThemeBlurTintColor)',
        cardForeground: 'var(--SmartThemeBodyColor)',
        popover: 'var(--SmartThemeBlurTintColor)',
        popoverForeground: 'var(--SmartThemeBodyColor)',
        primary: 'var(--SmartThemeQuoteColor)',
        primaryForeground: 'var(--SmartThemeBodyColor)',
        secondary: 'var(--SmartThemeBorderColor)',
        secondaryForeground: 'var(--SmartThemeBodyColor)',
        muted: 'rgba(0,0,0,0.2)',
        mutedForeground: 'rgba(255,255,255,0.5)',
        accent: 'var(--SmartThemeQuoteColor)',
        accentForeground: 'var(--SmartThemeBodyColor)',
        destructive: 'var(--SmartThemeBorderColor)',
        destructiveForeground: 'var(--SmartThemeBodyColor)',
        border: 'var(--SmartThemeBorderColor)',
        input: 'var(--SmartThemeBorderColor)',
        ring: 'var(--SmartThemeQuoteColor)',
        chart1: 'var(--SmartThemeQuoteColor)',
        chart2: 'var(--SmartThemeQuoteColor)',
        chart3: 'var(--SmartThemeQuoteColor)',
        chart4: 'var(--SmartThemeQuoteColor)',
        chart5: 'var(--SmartThemeQuoteColor)',
        sidebar: 'var(--SmartThemeBlurTintColor)',
        sidebarForeground: 'var(--SmartThemeBodyColor)',
        sidebarPrimary: 'var(--SmartThemeQuoteColor)',
        sidebarPrimaryForeground: 'var(--SmartThemeBodyColor)',
        sidebarAccent: 'var(--SmartThemeBorderColor)',
        sidebarAccentForeground: 'var(--SmartThemeBodyColor)',
        sidebarBorder: 'var(--SmartThemeBorderColor)',
        sidebarRing: 'var(--SmartThemeQuoteColor)',
    },
    variables: {
        radius: '0.4rem',
    }
};

// ----------------------------------------------------------------------
// 7. Glass (Frosted) - 毛玻璃主题
// ----------------------------------------------------------------------
export const glassTheme: Theme = {
    name: 'Glass (Frosted)',
    colors: {
        // 背景完全透明，但跟随透明度变化
        background: 'rgba(255, 255, 255, var(--glass-opacity, 0.1))',
        foreground: '#0f172a', // 深色文字 (Slate-900) 以适应白色磨砂背景

        // 卡片使用动态透明度 - 改为白色基底
        card: 'rgba(255, 255, 255, var(--glass-opacity, 0.25))',
        cardForeground: '#0f172a',

        popover: 'rgba(255, 255, 255, var(--glass-opacity, 0.4))',
        popoverForeground: '#0f172a',

        primary: 'rgba(15, 23, 42, 0.8)', // 深色主色
        primaryForeground: '#ffffff',

        secondary: 'rgba(255, 255, 255, 0.3)',
        secondaryForeground: '#0f172a',

        muted: 'rgba(255, 255, 255, 0.3)',
        mutedForeground: 'rgba(15, 23, 42, 0.6)',

        accent: 'rgba(255, 255, 255, 0.4)',
        accentForeground: '#0f172a',

        destructive: 'rgba(239, 68, 68, 0.8)',
        destructiveForeground: '#ffffff',

        border: 'rgba(15, 23, 42, 0.15)', // Lighter base (will be resistant to fade)
        input: 'rgba(255, 255, 255, 0.4)',
        ring: 'rgba(15, 23, 42, 0.4)',

        chart1: '#0f172a',
        chart2: 'rgba(15, 23, 42, 0.8)',
        chart3: 'rgba(15, 23, 42, 0.6)',
        chart4: 'rgba(15, 23, 42, 0.4)',
        chart5: 'rgba(15, 23, 42, 0.2)',

        sidebar: 'rgba(255, 255, 255, var(--glass-opacity, 0.15))',
        sidebarForeground: '#0f172a',
        sidebarPrimary: 'rgba(15, 23, 42, 0.8)',
        sidebarPrimaryForeground: '#ffffff',
        sidebarAccent: 'rgba(255, 255, 255, 0.3)',
        sidebarAccentForeground: '#0f172a',
        sidebarBorder: 'rgba(15, 23, 42, 0.1)', // Lighter base
        sidebarRing: 'rgba(15, 23, 42, 0.4)',
    },
    variables: {
        radius: '1rem',
    }
};

// ----------------------------------------------------------------------
// Exports
// ----------------------------------------------------------------------

export const themes = {
    sillytavern: sillyTavernTheme,  // SillyTavern 继承主题
    paperLight: paperLightTheme,
    twitterDark: twitterDarkTheme,
    claudeDark: claudeDarkTheme,
    catppuccin: catppuccinTheme,
    discord: discordTheme,
    glass: glassTheme,
};

export type ThemeName = keyof typeof themes;

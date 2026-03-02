/**
 * Theme 类型定义和主题配置
 */

interface Theme {
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
        // 文本层级色彩系统 (Text Hierarchy)
        heading: string;   // 标题/名称 - 最醒目
        label: string;     // 标签/分类 - 次醒目
        meta: string;      // 元数据/时间 - 信息性
        link: string;      // 可交互文本 - 吸引点击
        value: string;     // 数据值/量化 - 绿色系
        emphasis: string;  // 强调/重要标记 - 红/橙系
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
// 1. Nord (Dark)
// ----------------------------------------------------------------------
const nordTheme: Theme = {
    name: 'Nord',
    colors: {
        background: '#2e3440',
        foreground: '#d8dee9',
        card: '#3b4252',
        cardForeground: '#e5e9f0',
        popover: '#2e3440',
        popoverForeground: '#d8dee9',
        primary: '#88c0d0',
        primaryForeground: '#2e3440',
        secondary: '#434c5e',
        secondaryForeground: '#eceff4',
        muted: '#4c566a',
        mutedForeground: '#d8dee9',
        accent: '#434c5e',
        accentForeground: '#d8dee9', // Fixed from primary blue
        destructive: '#bf616a',
        destructiveForeground: '#eceff4',
        border: '#4c566a',
        input: '#3b4252',
        ring: '#88c0d0',
        // 文本层级
        heading: '#88c0d0', // Frost - 标题
        label: '#81a1c1',   // Frost darker - 标签
        meta: '#4c566a',    // Polar Night 3 - 元数据
        link: '#ebcb8b',    // Aurora Yellow - 链接
        value: '#a3be8c',   // Aurora Green - 数据值
        emphasis: '#d08770', // Aurora Orange - 强调
        sidebar: '#242933',
        sidebarForeground: '#d8dee9',
        sidebarPrimary: '#88c0d0',
        sidebarPrimaryForeground: '#2e3440',
        sidebarAccent: '#3b4252',
        sidebarAccentForeground: '#d8dee9', // Fixed from primary blue
        sidebarBorder: '#3b4252',
        sidebarRing: '#88c0d0',
    },
    variables: {
        radius: '0.3rem',
    }
};

// ----------------------------------------------------------------------
// 2. Claude Dark (formerly Paper Dark)
// ----------------------------------------------------------------------
const claudeDarkTheme: Theme = {
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
        // 文本层级
        heading: 'oklch(0.6724 0.1308 38.7559)', // Accent Orange - 标题
        label: 'oklch(0.6898 0.1581 290.4107)',   // Purple - 标签
        meta: 'oklch(0.4336 0.0113 100.2195)',     // Muted - 元数据
        link: 'oklch(0.8816 0.0276 93.1280)',      // Cream - 链接
        value: 'oklch(0.6907 0.1554 160.3454)',     // Spring Green (Teal) - 数据值
        emphasis: 'oklch(0.7066 0.1500 48.0000)',     // Orange - 强调
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
const twitterDarkTheme: Theme = {
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
        // 文本层级
        heading: 'oklch(0.6723 0.1606 244.9955)', // Twitter Blue - 标题
        label: 'oklch(0.6907 0.1554 160.3454)',    // Teal - 标签
        meta: 'oklch(0.3020 0.0288 244.8244)',     // Dark - 元数据
        link: 'oklch(0.8214 0.1600 82.5337)',      // Yellow - 链接
        value: 'oklch(0.7200 0.1400 160.0000)',     // Teal/Spring - 数据值
        emphasis: 'oklch(0.5919 0.2186 10.5826)',   // Red - 强调

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
// 4. Tokyo Night (Dark)
// ----------------------------------------------------------------------
const tokyoNightTheme: Theme = {
    name: 'Tokyo Night',
    colors: {
        background: '#1a1b26',
        foreground: '#a9b1d6',
        card: '#24283b',
        cardForeground: '#a9b1d6',
        popover: '#1a1b26',
        popoverForeground: '#a9b1d6',
        primary: '#7aa2f7',
        primaryForeground: '#1a1b26',
        secondary: '#414868',
        secondaryForeground: '#c0caf5',
        muted: '#24283b',
        mutedForeground: '#565f89',
        accent: '#414868',
        accentForeground: '#a9b1d6', // fixed
        destructive: '#f7768e',
        destructiveForeground: '#1a1b26',
        border: '#414868',
        input: '#24283b',
        ring: '#7aa2f7',
        // 文本层级
        heading: '#bb9af7', // Purple - 标题 (Control Keywords)
        label: '#7dcfff',   // Cyan - 标签 (Object properties)
        meta: '#565f89',    // Comments - 元数据
        link: '#e0af68',    // Yellow - 链接
        value: '#9ece6a',   // Green - 数据值
        emphasis: '#f7768e', // Red - 强调
        sidebar: '#16161e',
        sidebarForeground: '#a9b1d6',
        sidebarPrimary: '#7aa2f7',
        sidebarPrimaryForeground: '#1a1b26',
        sidebarAccent: '#24283b',
        sidebarAccentForeground: '#a9b1d6', // fixed
        sidebarBorder: '#414868',
        sidebarRing: '#7aa2f7',
    },
    variables: {
        radius: '0.4rem',
    }
};

// ----------------------------------------------------------------------
// 4.5 Tokyo Light
// ----------------------------------------------------------------------
const tokyoLightTheme: Theme = {
    name: 'Tokyo Light',
    colors: {
        background: '#e6e7ed',
        foreground: '#343b58',
        card: '#ffffff',
        cardForeground: '#343b58',
        popover: '#e6e7ed',
        popoverForeground: '#343b58',
        primary: '#2959aa',
        primaryForeground: '#ffffff',
        secondary: '#d5d6db',
        secondaryForeground: '#343b58',
        muted: '#cbccd1',
        mutedForeground: '#6c6e75',
        accent: '#d5d6db',
        accentForeground: '#343b58', // fixed
        destructive: '#8c4351',
        destructiveForeground: '#ffffff',
        border: '#cbccd1',
        input: '#ffffff',
        ring: '#2959aa',
        // 文本层级
        heading: '#5a3e8e', // Magenta - 标题
        label: '#0f4b6e',   // Cyan - 标签
        meta: '#6c6e75',    // Comments - 元数据
        link: '#8f5e15',    // Yellow - 链接
        value: '#385f0d',   // Green - 数据值
        emphasis: '#8c4351', // Red - 强调
        sidebar: '#d5d6db',
        sidebarForeground: '#343b58',
        sidebarPrimary: '#2959aa',
        sidebarPrimaryForeground: '#ffffff',
        sidebarAccent: '#cbccd1',
        sidebarAccentForeground: '#343b58', // fixed
        sidebarBorder: '#a3a5b2',
        sidebarRing: '#2959aa',
    },
    variables: {
        radius: '0.4rem',
    }
};

// ----------------------------------------------------------------------
// 5. Catppuccin Mocha - Modified (Mauve Text)
// ----------------------------------------------------------------------
const catppuccinTheme: Theme = {
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

        // 文本层级
        heading: '#cba6f7', // Mauve - 标题
        label: '#89b4fa',   // Blue - 标签
        meta: '#6c7086',    // Overlay0 - 元数据
        link: '#f9e2af',    // Yellow - 链接
        value: '#a6e3a1',   // Green - 数据值
        emphasis: '#fab387', // Peach - 强调

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
// 5.5 Catppuccin Latte
// ----------------------------------------------------------------------
const catppuccinLatteTheme: Theme = {
    name: 'Catppuccin Latte',
    colors: {
        background: '#eff1f5',
        foreground: '#4c4f69',
        card: '#e6e9ef',
        cardForeground: '#4c4f69',
        popover: '#eff1f5',
        popoverForeground: '#4c4f69',
        primary: '#8839ef', // Mauve
        primaryForeground: '#eff1f5',
        secondary: '#ccd0da',
        secondaryForeground: '#4c4f69',
        muted: '#dce0e8',
        mutedForeground: '#6c6f85',
        accent: '#ccd0da',
        accentForeground: '#4c4f69', // Fixed from primary blue
        destructive: '#d20f39',
        destructiveForeground: '#eff1f5',
        border: '#bcc0cc',
        input: '#e6e9ef',
        ring: '#8839ef',
        // 文本层级
        heading: '#8839ef', // Mauve - 标题
        label: '#209fb5',   // Sapphire - 标签
        meta: '#6c6f85',    // Subtext 0 - 元数据
        link: '#df8e1d',    // Yellow - 链接
        value: '#40a02b',   // Green - 数据值
        emphasis: '#fe640b', // Peach - 强调
        sidebar: '#dce0e8',
        sidebarForeground: '#4c4f69',
        sidebarPrimary: '#8839ef',
        sidebarPrimaryForeground: '#eff1f5',
        sidebarAccent: '#ccd0da',
        sidebarAccentForeground: '#4c4f69', // Fixed from primary blue
        sidebarBorder: '#bcc0cc',
        sidebarRing: '#8839ef',
    },
    variables: {
        radius: '0.5rem',
    }
};

// ----------------------------------------------------------------------
// 5.8 Everforest (Dark)
// ----------------------------------------------------------------------
const everforestTheme: Theme = {
    name: 'Everforest',
    colors: {
        background: '#2d353b',
        foreground: '#d3c6aa',
        card: '#343f44',
        cardForeground: '#d3c6aa',
        popover: '#2d353b',
        popoverForeground: '#d3c6aa',
        primary: '#a7c080',
        primaryForeground: '#2d353b',
        secondary: '#3d484d',
        secondaryForeground: '#d3c6aa',
        muted: '#475258',
        mutedForeground: '#859289',
        accent: '#475258',
        accentForeground: '#d3c6aa',
        destructive: '#e67e80',
        destructiveForeground: '#2d353b',
        border: '#4f585e',
        input: '#343f44',
        ring: '#a7c080',
        // 文本层级
        heading: '#a7c080', // Green - 标题
        label: '#7fbbb3',   // Aqua - 标签
        meta: '#859289',    // Grey1 - 元数据
        link: '#dbbc7f',    // Yellow - 链接
        value: '#83c092',   // Aqua - 数据值 (区分于 heading 的 A7C080 Green)
        emphasis: '#e69875', // Orange - 强调 (Everforest Operator Orange)
        sidebar: '#232a2e',
        sidebarForeground: '#d3c6aa',
        sidebarPrimary: '#a7c080',
        sidebarPrimaryForeground: '#2d353b',
        sidebarAccent: '#3d484d',
        sidebarAccentForeground: '#d3c6aa',
        sidebarBorder: '#4f585e',
        sidebarRing: '#a7c080',
    },
    variables: {
        radius: '0.4rem',
    }
};

// ----------------------------------------------------------------------
// 6. SillyTavern Inherited Theme - 继承酒馆主题
// ----------------------------------------------------------------------
const sillyTavernTheme: Theme = {
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
        // 文本层级
        heading: 'var(--SmartThemeQuoteColor)',
        label: 'var(--SmartThemeQuoteColor)',
        meta: 'var(--SmartThemeBorderColor)',
        link: 'var(--SmartThemeQuoteColor)',
        value: 'var(--SmartThemeQuoteColor)',
        emphasis: 'var(--SmartThemeQuoteColor)',
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
const glassTheme: Theme = {
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

        // 文本层级
        heading: 'rgba(15, 23, 42, 0.9)',  // 标题
        label: 'rgba(15, 23, 42, 0.7)',    // 标签
        meta: 'rgba(15, 23, 42, 0.4)',     // 元数据
        link: 'rgba(15, 23, 42, 0.8)',     // 链接
        value: '#16a34a',    // 数据值 - 绿色
        emphasis: '#ea580c',  // 强调 - 橙色

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
    nord: nordTheme,
    twitterDark: twitterDarkTheme,
    claudeDark: claudeDarkTheme,
    tokyoNight: tokyoNightTheme,
    tokyoLight: tokyoLightTheme,
    catppuccin: catppuccinTheme,
    catppuccinLatte: catppuccinLatteTheme,
    everforest: everforestTheme,
    glass: glassTheme,
};

export type ThemeName = keyof typeof themes;

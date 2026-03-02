/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Semantic Theme Colors - Simplified to direct CSS variables
                border: "var(--border)",
                input: "var(--input)",
                ring: {
                    DEFAULT: "var(--ring)",
                    50: "color-mix(in srgb, var(--ring) 50%, transparent)",
                },
                // background handled in object below
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                    5: "color-mix(in srgb, var(--primary) 5%, transparent)",
                    10: "color-mix(in srgb, var(--primary) 10%, transparent)",
                    20: "color-mix(in srgb, var(--primary) 20%, transparent)",
                    30: "color-mix(in srgb, var(--primary) 30%, transparent)",
                    50: "color-mix(in srgb, var(--primary) 50%, transparent)", // Used for borders
                    90: "color-mix(in srgb, var(--primary) 90%, transparent)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                    80: "color-mix(in srgb, var(--secondary) 80%, transparent)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                    20: "color-mix(in srgb, var(--muted) 20%, transparent)",
                    30: "color-mix(in srgb, var(--muted) 30%, transparent)",
                    50: "color-mix(in srgb, var(--muted) 50%, transparent)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                    10: "color-mix(in srgb, var(--accent) 10%, transparent)", // Just in case
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                    95: "color-mix(in srgb, var(--popover) 95%, transparent)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                background: {
                    DEFAULT: "var(--background)",
                    80: "color-mix(in srgb, var(--background) 80%, transparent)",
                },
                sidebar: {
                    DEFAULT: 'var(--sidebar)',
                    foreground: 'var(--sidebar-foreground)',
                    primary: 'var(--sidebar-primary)',
                    'primary-foreground': 'var(--sidebar-primary-foreground)',
                    accent: 'var(--sidebar-accent)',
                    'accent-foreground': 'var(--sidebar-accent-foreground)',
                    border: 'var(--sidebar-border)',
                    ring: 'var(--sidebar-ring)',
                },
                // 文本层级色彩系统 (Text Hierarchy)
                heading: "var(--heading)",     // 标题/名称
                label: "var(--label)",         // 标签/分类
                meta: "var(--meta)",           // 元数据
                link: "var(--link)",           // 可交互文本
                value: "var(--value)",         // 数据值/量化
                emphasis: "var(--emphasis)",   // 强调/重要标记
                // 状态色
                success: "var(--engram-success)",
                warning: "var(--engram-warning)",
                error: "var(--engram-error)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],
    // Scope all Tailwind utilities to the Engram panel container
    // This prevents conflicting with other extensions/core that also use Tailwind
    important: '.engram-app-root',
    corePlugins: {
        preflight: false,
    }
};

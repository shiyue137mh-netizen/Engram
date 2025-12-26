/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // 使用 prefix 避免与 SillyTavern 样式冲突
    prefix: 'eg-',
    theme: {
        extend: {
            colors: {
                // Engram 主题色
                primary: {
                    DEFAULT: '#6366f1',
                    hover: '#818cf8',
                    light: '#a5b4fc',
                    dark: '#4f46e5',
                },
                secondary: {
                    DEFAULT: '#22d3ee',
                    hover: '#67e8f9',
                },
                // 背景色
                panel: {
                    dark: 'rgba(15, 15, 25, 0.95)',
                    DEFAULT: 'rgba(30, 30, 45, 0.9)',
                    card: 'rgba(45, 45, 65, 0.8)',
                },
            },
            boxShadow: {
                'glow': '0 0 20px rgba(99, 102, 241, 0.4)',
                'glow-lg': '0 0 30px rgba(99, 102, 241, 0.6)',
            },
            backdropBlur: {
                'panel': '20px',
            },
        },
    },
    plugins: [],
};

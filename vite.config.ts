import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
    plugins: [react()],

    // 开发服务器配置
    server: {
        port: 5173,
        cors: true, // 允许跨域（ST 需要访问）
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // 禁用 HMR 避免跨域 preamble 问题
        hmr: false,
        // 允许访问项目根目录的 assets
        fs: {
            allow: ['..'],
        },
    },

    // public 目录作为静态资源目录
    publicDir: 'public',

    build: {
        outDir: 'dist',
        emptyDirOnBuild: true,

        lib: {
            entry: path.resolve(__dirname, 'src/index.tsx'),
            name: 'Engram',
            fileName: () => 'index.js',
            formats: ['es'],
        },

        rollupOptions: {
            // 不外部化任何依赖，全部打包
            output: {
                inlineDynamicImports: true,
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'style.css';
                    }
                    return assetInfo.name || 'assets/[name][extname]';
                },
            },
        },

        minify: mode === 'production',
        sourcemap: true,
    },

    // 定义环境变量，避免浏览器 process is not defined 错误
    define: {
        'process.env.NODE_ENV': JSON.stringify(mode),
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@components': path.resolve(__dirname, 'src/components'),
        },
    },
}));

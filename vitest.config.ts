import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // 使用 Node 环境（BrainRecallCache 是纯算法，不需要 DOM）
        environment: 'node',
        include: ['test/**/*.test.ts'],
        // 全局 setup
        setupFiles: ['./test/setup.ts'],
        // 覆盖率配置
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'clover'],
            include: ['src/**/*.ts'],
            exclude: ['src/**/*.test.ts', 'src/ui/**', 'src/core/types/**'],
        },
        reporters: process.env.GITHUB_ACTIONS ? ['default', 'github-actions'] : ['default'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});

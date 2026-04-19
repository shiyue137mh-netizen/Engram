import type { IStep } from '../../core/Step';
import type { JobContext } from '../../core/JobContext';
import { Logger } from '@/core/logger';
import { LogModule } from '@/core/logger';

/**
 * 停止 SillyTavern 生成
 * 可作为工作流步骤使用，也可直接调用静态方法
 */
export class StopGeneration implements IStep {
    name = 'StopGeneration';

    async execute(context: JobContext): Promise<void> {
        Logger.info(LogModule.SYSTEM, '执行 StopGeneration 步骤');
        await StopGeneration.abort();
    }

    /**
     * 静态方法：直接终止生成
     */
    static async abort(): Promise<void> {
        try {
            // 路径 1: 使用官方 Context 接口 (Engram 集成层)
            // @ts-expect-error
            const stCtx = window.SillyTavern?.getContext?.();
            if (stCtx?.stopGeneration) {
                stCtx.stopGeneration();
                Logger.info(LogModule.SYSTEM, '通过 ST Context 成功调用 stopGeneration');
                return;
            }

            // 路径 2: 尝试全局作用域下的 stopGeneration (酒馆主脚本可能导出到全局)
            // @ts-expect-error
            if (typeof window.stopGeneration === 'function') {
                // @ts-expect-error
                window.stopGeneration();
                Logger.info(LogModule.SYSTEM, '通过 window.stopGeneration 成功调用');
                return;
            }

            // 路径 3: 暴力模拟 UI 点击 (最后的兜底，只要按钮在 DOM 中就有效)
            const stopButton = document.querySelector('#mes_stop');
            if (stopButton && stopButton.offsetParent !== null) { // 确保按钮可见/在文档中
                stopButton.click();
                Logger.info(LogModule.SYSTEM, '通过模拟点击 #mes_stop 按钮触发中断');
                return;
            }

            Logger.warn(LogModule.SYSTEM, '未找到有效的 StopGeneration 触发路径');
        } catch (error) {
            Logger.warn(LogModule.SYSTEM, '调用 stopGeneration 过程中发生致命错误', error);
        }
    }
}

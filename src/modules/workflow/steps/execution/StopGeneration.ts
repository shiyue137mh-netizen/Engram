import { IStep } from '../../core/Step';
import { JobContext } from '../../core/JobContext';
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
            // @ts-ignore - SillyTavern 全局对象
            const context = window.SillyTavern?.getContext?.();
            if (context?.stopGeneration) {
                context.stopGeneration();
                Logger.info(LogModule.SYSTEM, '已调用酒馆 stopGeneration');
            } else {
                Logger.warn(LogModule.SYSTEM, 'StopGeneration 不可用: 上下文未找到 stopGeneration 方法');
            }
        } catch (e) {
            Logger.warn(LogModule.SYSTEM, '调用 stopGeneration 失败', e);
        }
    }
}

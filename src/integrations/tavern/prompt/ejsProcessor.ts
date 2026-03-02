import { Logger } from '@/core/logger';

export class EjsProcessor {
    /**
     * 利用 ST-Prompt-Template (如果存在) 清洗 EJS 宏
     * V0.8.6: 切换为直接调用 window.EjsTemplate API (参考其他人的做法)
     */
    static async processEJSMacros(entries: string[]): Promise<string[]> {
        if (entries.length === 0) return entries;

        // 检查 ST-Prompt-Template 是否可用
        if (!window.EjsTemplate || typeof window.EjsTemplate.evalTemplate !== 'function') {
            Logger.debug('EjsProcessor', 'ST-Prompt-Template 未检测到，跳过 EJS 处理');
            return entries;
        }

        try {
            // 1. 准备上下文 (自动包含 {{user}}, {{char}} 及所有酒馆变量)
            const context = await window.EjsTemplate.prepareContext();

            // 2. 尝试获取 MVU 变量并合并 (参考脚本.js)
            if (typeof window.Mvu !== 'undefined' && window.Mvu.getMvuData) {
                try {
                    const mvuObj = window.Mvu.getMvuData({ type: 'message', message_id: 'latest' });
                    if (mvuObj && mvuObj.stat_data) {
                        context.mvu = mvuObj.stat_data;
                    }
                } catch (e) {
                    Logger.warn('EjsProcessor', '获取 MVU 数据失败', e);
                }
            }

            // 3. 逐条渲染
            const processed = await Promise.all(entries.map(async (content) => {
                try {
                    return await window.EjsTemplate!.evalTemplate(content, context);
                } catch (err) {
                    Logger.warn('EjsProcessor', 'EJS 渲染单条失败，保留原内容', err);
                    return content;
                }
            }));

            return processed;
        } catch (e) {
            Logger.warn('EjsProcessor', 'EJS 预处理失败', e);
            return entries;
        }
    }
}

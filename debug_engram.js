/**
 * Engram Debug Script
 * 
 * 使用说明：
 * 1. 打开流览器控制台 (F12 -> Console)
 * 2. 复制以下全部内容并粘贴运行
 * 
 * 作用：
 * 1. 检查 Context 中的消息结构（确认内容字段是 mes 还是 content）
 * 2. 模拟 TextProcessor 的清洗逻辑
 * 3. 检查 {{chatHistory}} 宏的替换情况 (模拟)
 */

(async function debugEngram() {
    console.group('🔍 Engram Debug Report');

    // 1. 获取 SillyTavern 上下文
    const context = window.SillyTavern?.getContext?.();
    if (!context) {
        console.error('❌ 无法获取 SillyTavern 上下文 (window.SillyTavern.getContext())');
        console.groupEnd();
        return;
    }
    console.log('✅ 获取到 Context', context);

    // 2. 检查最近的消息
    const chat = context.chat || [];
    const last5 = chat.slice(-5);
    console.group('Message Structure Check (Last 5)');
    last5.forEach((msg, i) => {
        console.log(`[Msg ${i}]`, msg);
        console.log(`   - .mes:`, msg.mes);
        console.log(`   - .content:`, msg.content);
        console.log(`   - .message:`, msg.message);

        const resolvedContent = msg.mes || msg.content || msg.message || '';
        if (!resolvedContent) {
            console.warn(`   ⚠️ 内容为空!`);
        } else {
            console.log(`   ✅ 识别到的内容:`, resolvedContent.substring(0, 50) + '...');
        }
    });
    console.groupEnd();

    // 3. 模拟 RegexProcessor (如果 Engram 全局暴露了 preferably)
    // 假设没有暴露，通过代码逻辑模拟
    console.group('Regex/Macro Simulation');
    try {
        const rawText = last5.map(m => {
            const name = m.name;
            const content = m.mes || m.content || m.message || '';
            const isUser = m.is_user;
            return `${name}: ${content}`;
        }).join('\n');

        console.log('📝 原始拼接文本:', rawText);

        // 模拟简单的清洗（参考 TextProcessor）
        let cleaned = rawText
            .replace(/\n{3,}/g, '\n\n')
            .replace(/^[ \t]+|[ \t]+$/gm, '')
            .trim();

        console.log('🧹 模拟清洗后:', cleaned);

        // 模拟 Prompt 替换
        const promptTemplate = "Summarize this:\n{{chatHistory}}";
        const result = promptTemplate.replace('{{chatHistory}}', cleaned);

        console.log('🔄 宏替换测试:', result);

        if (result.includes('{{chatHistory}}')) {
            console.error('❌ 宏替换失败! 模板中仍包含 {{chatHistory}}');
        } else {
            console.log('✅ 宏替换成功');
        }

    } catch (e) {
        console.error('模拟出错', e);
    }
    console.groupEnd();

    console.log('🏁 Debug 完成');
    console.groupEnd();
})();

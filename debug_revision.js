/**
 * Debug Engram Revision Modal
 * 
 * 运行此脚本以手动触发 Revision Modal 显示。
 * 这将帮助确认 UI 是否正确挂载以及 EventBus 通信是否正常。
 */

(async () => {
    console.log('🧪 Starting Revision Modal Debug...');

    // 1. 获取 EventBus
    // 我们需要通过模块系统获取，或者如果暴露在全局的话。
    // 由于是模块化环境，我们尝试通过 STBridge 或直接模拟事件。
    // 最简单的方法是直接导入（如果是在控制台，这很难）。
    // 但我们的 RevisionModal 监听的是 window.SillyTavern 上的事件吗？
    // 不，是自定义 EventBus。

    // 假设 EventBus 是全局单例，我们很难从外部直接访问闭包中的实例。
    // 但是，Extension 通常会将核心服务暴露到 window.engram (如果实现了的话)。
    // 如果没有，我们只能依赖 Extension 内部的某种机制。

    // 检查是否有全局暴露点
    // @ts-ignore
    const eventBus = window.SillyTavern?.Engram?.EventBus; // 假设

    // 既然我们没有全局暴露 EventBus，我们只能尝试触发 Service 的方法。
    // 我们的 SummarizerService 有 requestRevision 吗？
    // 它是通过 RevisionService 触发的。

    // 让我们尝试加载 Service 模块 (如果使用了 RequireJS 或类似的)
    // 但这是 Webpack 构建的。

    // 💡 替代方案：在 SummarizerService 启动时，将其挂载到 window 以便调试。
    // 我无法修改正在运行的代码。

    // 但是，我们可以检查 DOM 中是否存在 Modal 容器。
    const modalContainer = document.querySelector('.fixed.inset-0.z-\\[11000\\]');
    if (modalContainer) {
        console.log('✅ Found existing Modal container (might be hidden)');
    } else {
        console.log('⚠️ No Modal container found in DOM. React might not have rendered it yet.');
    }

    // 既然无法直接触发 EventBus，我建议您使用以下步骤：
    console.log(`
    === 🛠 手动测试指南 ===
    
    由于 EventBus 封装在模块内部，无法从控制台直接触发。
    请尝试以下操作验证 Modal：

    1. 确保 "启用预览 (Preview Enabled)" 已在【总结面板】中开启。
    2. 在【总结面板】点击 "手动触发 (Manual Trigger)"。
    3. 如果有待总结的内容，这应该会触发总结并弹出 Modal。

    如果仍然没有弹出，可能是 React 渲染问题。
    请检查 Elements 面板，搜索文本 "内容修订" 或 class "z-[11000]"。
    `);

    // 尝试查找 React 组件根节点
    // ...
})();

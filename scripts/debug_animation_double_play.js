/**
 * Engram 动画双播/重绘监控探针 (V6.1 Debug Probe)
 * 脚本说明：监控 CurtainOverlay 的 lifecycle，排查是否发生了“瞬时卸载与重挂”
 */
(() => {
    console.log("🚀 【Engram 核心探针】启动！开始监控动画层生命周期...");
    
    let mountCount = 0;
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('engram-curtain-container')) {
                    mountCount++;
                    const timestamp = new Date().toLocaleTimeString();
                    console.warn(`[${timestamp}] 📥 检测到 CurtainOverlay 挂载！(当前累计第 ${mountCount} 次)`);
                    
                    // 打印当前堆栈，试图找出是谁触发了这次挂载 (虽然 React 内部堆栈可能很难读，但聊胜于无)
                    // console.trace("挂载堆栈追踪:");
                }
            });
            
            mutation.removedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('engram-curtain-container')) {
                    const timestamp = new Date().toLocaleTimeString();
                    console.error(`[${timestamp}] 📤 检测到 CurtainOverlay 卸载！`);
                }
            });
        });
    });

    // 监听整个 body 的直接子元素变动（React Portal 或 Root 挂载点）
    observer.observe(document.body, { childList: true, subtree: true });

    console.log("✅ 拦截器部署成功。请哥哥尝试【刷新页面】或【打开/关闭 Engram】，然后观察下方的打印记录：");
    console.log("💡 如果看到两次连续的 '检测到 CurtainOverlay 挂载'，说明是 React 组件层面的重挂 Bug。");
    console.log("💡 如果只有一次挂载但动画播了两遍，说明是 GSAP 内部逻辑被多次触发但 DOM 没变。");
})();

/**
 * 深度 CSS 调试脚本 V2
 * 检查内联样式是否正确应用
 */

(function debugV2() {
    console.log('=== Engram CSS 深度调试 V2 ===');

    const panel = document.querySelector('#engram-panel-root');
    if (!panel) {
        console.error('未找到 Engram 面板！');
        return;
    }

    // 检查第一个 textarea
    const textarea = panel.querySelector('textarea');
    if (textarea) {
        console.log('\n=== textarea 分析 ===');
        console.log('1. HTML style 属性:', textarea.getAttribute('style'));
        console.log('2. style.background:', textarea.style.background);
        console.log('3. style.backgroundColor:', textarea.style.backgroundColor);
        console.log('4. style.border:', textarea.style.border);
        console.log('5. style.borderBottom:', textarea.style.borderBottom);

        const computed = window.getComputedStyle(textarea);
        console.log('\n计算样式:');
        console.log('6. computed.backgroundColor:', computed.backgroundColor);
        console.log('7. computed.border:', computed.border);
        console.log('8. computed.borderRadius:', computed.borderRadius);

        // 尝试强制修改
        console.log('\n尝试强制修改...');
        textarea.style.setProperty('background', 'transparent', 'important');
        textarea.style.setProperty('background-color', 'transparent', 'important');
        textarea.style.setProperty('border', 'none', 'important');
        textarea.style.setProperty('border-bottom', '2px solid red', 'important');
        textarea.style.setProperty('border-radius', '0', 'important');

        const afterComputed = window.getComputedStyle(textarea);
        console.log('\n强制修改后:');
        console.log('9. computed.backgroundColor:', afterComputed.backgroundColor);
        console.log('10. computed.border:', afterComputed.border);
        console.log('11. computed.borderBottom:', afterComputed.borderBottom);
        console.log('12. computed.borderRadius:', afterComputed.borderRadius);

        if (afterComputed.borderBottom.includes('red')) {
            console.log('✓ !important 可以覆盖');
        } else {
            console.log('✗ 连 !important 都无法覆盖，可能是 Shadow DOM');
        }
    }

    // 检查第一个 select
    const select = panel.querySelector('select');
    if (select) {
        console.log('\n=== select 分析 ===');
        console.log('1. HTML style 属性:', select.getAttribute('style'));
        console.log('2. style.background:', select.style.background);

        const computed = window.getComputedStyle(select);
        console.log('3. computed.backgroundColor:', computed.backgroundColor);
    }

    // 检查是否在 Shadow DOM 中
    console.log('\n=== Shadow DOM 检查 ===');
    let el = textarea || select;
    while (el) {
        if (el.shadowRoot) {
            console.log('发现 Shadow DOM:', el);
        }
        el = el.parentElement;
    }
    console.log('未发现 Shadow DOM');

    // 检查 Engram 面板根节点
    console.log('\n=== Engram 根节点 ===');
    console.log('panel:', panel);
    console.log('panel.shadowRoot:', panel.shadowRoot);

    // 检查 bundle 版本
    console.log('\n=== 检查是否是最新版本 ===');
    console.log('请手动检查 dist/index.js 的修改时间');

    console.log('\n=== 调试完成 ===');
})();

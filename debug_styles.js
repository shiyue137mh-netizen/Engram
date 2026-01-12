(function() {
    console.clear();
    console.log("=== Engram 布局层级样式调试 ===");

    // 尝试找到 MasterDetailLayout 的核心容器
    // 桌面端特征: flex h-full gap-6
    // 或者找 APIPresets 的根
    let target = document.querySelector('.flex.h-full.gap-6');
    
    if (!target) {
        // 尝试找列表容器
        target = document.querySelector('.flex-col.gap-4.h-full');
    }
    
    if (!target) {
        console.warn("未自动找到 MasterDetailLayout 容器，尝试使用当前选定元素 ($0) 或 body");
        target = window.$0 || document.body;
    }

    console.log("当前分析目标节点:", target);

    let el = target;
    let depth = 0;

    while (el && el !== document) {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        
        const isScrollable = style.overflowY === 'auto' || style.overflowY === 'scroll';
        const isFullHeight = style.height === '100%' || rect.height > window.innerHeight * 0.9;
        
        const info = {
            "层级": depth++,
            "元素": `${el.tagName.toLowerCase()}${el.id ? '#'+el.id : ''}${el.className ? '.'+el.className.replace(/ /g, '.') : ''}`,
            "高度 (px)": Math.round(rect.height),
            "Computed Height": style.height,
            "Overflow-Y": style.overflowY,
            "Display": style.display,
            "Flex": style.flex,
            "问题标记": []
        };

        if (isScrollable) info["问题标记"].push("⚠️ 滚动容器");
        if (style.height === 'auto' && !style.flex.includes('1')) info["问题标记"].push("⚠️ Auto高度 (可能断开 h-full)");

        console.groupCollapsed(`节点: ${info["元素"].slice(0, 50)}... ${info["问题标记"].join(' ')}`);
        console.table(info);
        console.groupEnd();

        el = el.parentElement;
    }
    
    console.log("=== 分析结束 ===");
    console.log("提示：如果中间层级出现 'overflow-y: auto'，则内部的 'h-full' 将基于内容高度而非视口高度，导致内部滚动失效。");
})();


(function () {
    console.group("Engram Layout Debugger");

    // 1. Check Root Element
    const root = document.getElementById('engram-layout-root');
    if (!root) {
        console.error("❌ Root element #engram-layout-root not found!");
        console.groupEnd();
        return;
    }

    const rootRect = root.getBoundingClientRect();
    console.log("✅ Root Element Found:", root);
    console.log("📏 Root Dimensions:", {
        width: rootRect.width,
        height: rootRect.height,
        top: rootRect.top,
        left: rootRect.left
    });

    const rootStyle = window.getComputedStyle(root);
    console.log("🎨 Root Computed Style:", {
        display: rootStyle.display,
        position: rootStyle.position,
        flexDirection: rootStyle.flexDirection,
        inset: rootStyle.inset
    });

    // 2. Check Sidebar (Aside)
    // Looking for the aside element specifically
    const aside = root.querySelector('aside');
    if (!aside) {
        console.error("❌ Sidebar (<aside>) element NOT found in DOM under root!");
        // Try looking for it by class if tag name fails? 
        // But code uses <aside>, so it should be there.
    } else {
        const asideStyle = window.getComputedStyle(aside);
        console.log("✅ Sidebar Element Found:", aside);
        console.log("🎨 Sidebar Computed Style:", {
            display: asideStyle.display,
            visibility: asideStyle.visibility,
            width: asideStyle.width,
            position: asideStyle.position,
            zIndex: asideStyle.zIndex
        });

        console.log("🏷 Sidebar Classes:", aside.className);

        // Check breakpoint logic
        const viewportWidth = window.innerWidth;
        console.log("🖥 Viewport Width:", viewportWidth);
        if (aside.classList.contains('md:flex') && viewportWidth < 768) {
            console.warn("⚠️ Viewport width (" + viewportWidth + "px) is less than md (768px). Sidebar is hidden by 'hidden md:flex' class.");
        }
    }

    // 3. Check Mobile Header
    const header = root.querySelector('header');
    if (header) {
        const headerStyle = window.getComputedStyle(header);
        console.log("✅ Mobile Header Found:", {
            display: headerStyle.display,
            visibility: headerStyle.visibility
        });
    } else {
        console.log("ℹ️ Mobile header not found (might be desktop view).");
    }

    // 4. Check Parent Container (SillyTavern context)
    const parent = root.parentElement;
    if (parent) {
        console.log("📦 Parent Element:", parent);
        const parentStyle = window.getComputedStyle(parent);
        console.log("🎨 Parent Computed Style:", {
            position: parentStyle.position,
            display: parentStyle.display,
            overflow: parentStyle.overflow
        });
    }

    console.groupEnd();
})();

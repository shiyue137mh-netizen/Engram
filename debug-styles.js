(function () {
    console.log("=== Engram Style Debugger ===");

    // Find input/select elements
    const inputs = document.querySelectorAll('input, select, textarea');
    console.log(`Found ${inputs.length} input/select/textarea elements.`);

    if (inputs.length === 0) {
        console.warn("No inputs found to debug.");
        return;
    }

    inputs.forEach((el, index) => {
        if (index > 2) return; // Only process first few

        const rect = el.getBoundingClientRect();
        if (rect.width === 0) return; // Skip hidden

        console.group(`Debugging Input #${index} (${el.tagName})`);
        console.log("Classes:", el.className);

        // Computed Styles
        const computed = window.getComputedStyle(el);
        console.log("Computed border-radius:", computed.borderRadius);
        console.log("Computed border:", computed.border);
        console.log("Computed background-color:", computed.backgroundColor);
        console.log("Computed box-shadow:", computed.boxShadow); // Check glow

        // Check specifically for Tailwind 'rounded-md' expectation
        // Default Tailwind 'rounded-md' is usually 0.375rem (6px)
        console.log("--- Expectation vs Reality ---");
        if (el.className.includes('rounded-md')) {
            console.log("Has 'rounded-md' class.");
            if (computed.borderRadius === '0px') {
                console.error("❌ 'rounded-md' is present but computed border-radius is 0px! Something is overriding it.");
            } else {
                console.log(`✅ border-radius is: ${computed.borderRadius}`);
            }
        } else {
            console.warn("⚠️ 'rounded-md' class is MISSING.");
        }

        // Test Overrides
        console.log("--- Testing Inline Override ---");
        const originalRadius = el.style.borderRadius;
        el.style.borderRadius = '20px !important';
        const newComputed = window.getComputedStyle(el).borderRadius;
        console.log(`Forced inline 20px !important -> Computed: ${newComputed}`);

        if (newComputed !== '20px') {
            console.error("😱 Even !important inline style didn't work! Check Browser/Extension strict overrides.");
        } else {
            el.style.borderRadius = originalRadius; // Revert
        }

        console.groupEnd();
    });

    console.log("=== End Debugger ===");
    alert("Style Debug info logged to console.");
})();

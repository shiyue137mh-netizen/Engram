(function () {
    console.log("🔍 Starting CSS Leak Analysis...");

    // Identify Engram's stylesheet
    // Usually it's an inline style or a link with 'index' or 'style' in the name.
    // In Vite dev mode, it might be <style type="text/css" data-vite-dev-id="...">

    const engramKeywords = ['engram', 'index.css', 'style.css'];
    const suspiciousSelectors = ['label', 'input', 'button', '.switch', '[type="checkbox"]'];

    const token = 'ENGRAM_DEBUG';

    let engramSheets = [];

    // Helper to check if selector is global/generic
    const isGeneric = (selector) => {
        // Remove :pseudo-classes
        const base = selector.split(':')[0].trim();
        // Check if it's a tag name
        if (/^[a-z0-9]+$/i.test(base)) return true;

        // Check for specific classes that might leak
        if (base.includes('.switch') || base.includes('.checkbox')) return true;

        // Check for attribute selectors without class restriction
        if (base.startsWith('[') && listIncludes(base, ['type="checkbox"', 'type="radio"'])) return true;

        return false;
    };

    const listIncludes = (str, list) => list.some(item => str.includes(item));

    Array.from(document.styleSheets).forEach((sheet, index) => {
        let isEngram = false;
        try {
            if (sheet.href && engramKeywords.some(k => sheet.href.toLowerCase().includes(k))) {
                isEngram = true;
            } else if (sheet.ownerNode && sheet.ownerNode.innerHTML.includes('engram')) {
                // Heuristic for inline styles
                isEngram = true;
            } else if (sheet.ownerNode && sheet.ownerNode.id && sheet.ownerNode.id.includes('engram')) {
                isEngram = true;
            }

            // If we suspect it's Engram (or just scan everything to find the source of the leak)
            // Let's look for suspicious rules in ALL sheets to find the culprit.

            const rules = sheet.cssRules || sheet.rules;
            if (!rules) return;

            Array.from(rules).forEach(rule => {
                if (rule.selectorText) {
                    // Check if selector targets specific leaking elements
                    if (suspiciousSelectors.some(s => rule.selectorText.includes(s))) {

                        // Filter out scoped selectors (containing IDs or long classes)
                        // If it's just "label" or "label, input", it's BAD.
                        // If it's "#engram-root label", it's GOOD.

                        const selectors = rule.selectorText.split(',');
                        selectors.forEach(sel => {
                            sel = sel.trim();
                            // Check if strict tag match or suspicious class
                            if (isGeneric(sel)) {
                                console.warn(`⚠️ [Leak Potential] Sheet ${index} (${sheet.href || 'inline'}) has global rule: "${sel}"`);
                                console.log('   Properties:', rule.style.cssText);
                            }

                            // Specific check for the user's screenshot details
                            if (sel.includes('.absolute') || sel.includes('cursor-pointer')) {
                                // Tailwind utilities are fine usually, but maybe check specific overrides
                            }
                        });
                    }
                }
            });
        } catch (e) {
            // CORS error for external sheets
        }
    });

    console.log("✅ Analysis Complete.");
})();

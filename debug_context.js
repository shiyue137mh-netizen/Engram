/**
 * Debug Script for Engram
 * usage: Copy and paste this into the browser console where SillyTavern is running.
 */
(function debugEngram() {
    console.log("=== Engram Debug Start ===");

    // 1. Check SillyTavern Global
    if (typeof window.SillyTavern === 'undefined') {
        console.error("❌ window.SillyTavern is undefined");
    } else {
        console.log("✅ window.SillyTavern is present");
    }

    // 2. Check Context
    const context = window.SillyTavern?.getContext ? window.SillyTavern.getContext() : null;
    if (!context) {
        console.error("❌ Context is null! window.SillyTavern.getContext() returned nothing.");
        return;
    }
    console.log("✅ Context retrieved:", context);

    // 3. Check Chat Array
    if (!Array.isArray(context.chat)) {
        console.error("❌ context.chat is not an array:", context.chat);
        return;
    }
    console.log(`✅ context.chat has ${context.chat.length} messages`);

    // 4. Inspect First 3 Messages
    const sampleSize = Math.min(context.chat.length, 3);
    for (let i = 0; i < sampleSize; i++) {
        const msg = context.chat[i];
        console.log(`\n🔍 Message [${i}]:`, msg);
        console.log(`   - mes:`, msg.mes);
        console.log(`   - content (alias?):`, msg.content);
        console.log(`   - is_user:`, msg.is_user);
        console.log(`   - name:`, msg.name);

        if (msg.mes === undefined) {
            console.error(`   ❌ 'mes' property is UNDEFINED in message [${i}]!`);
        }
    }

    // 5. Check Engram Events (Optional)
    // console.log("Checking EventBus if accessible...");
})();

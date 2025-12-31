/**
 * Engram 世界书诊断脚本 v2
 * 
 * 在浏览器控制台中运行此脚本来诊断世界书加载问题
 */

(async function engramWorldInfoDiagnostic() {
    console.log('=== Engram 世界书诊断开始 ===\n');

    // 获取当前角色信息
    const context = window.SillyTavern?.getContext?.();
    const currentChar = context?.name2;
    const characters = context?.characters;
    const this_chid = context?.characterId;
    console.log('当前角色:', currentChar, '(ID:', this_chid, ')');

    // 1. 检查 TavernHelper 是否可用
    console.group('1. TavernHelper 检查');
    const helper = window.TavernHelper;
    if (helper) {
        console.log('✅ TavernHelper 可用');
    } else {
        console.warn('❌ TavernHelper 不可用');
    }
    console.groupEnd();

    // 2. 获取全局世界书
    console.group('2. 全局世界书');
    try {
        if (helper?.getGlobalWorldbookNames) {
            const globalBooks = helper.getGlobalWorldbookNames();
            console.log('全局世界书:', globalBooks);
            if (globalBooks?.length > 0) {
                console.log('✅ 有', globalBooks.length, '个全局世界书');
            } else {
                console.warn('⚠️ 没有启用全局世界书');
            }
        }
    } catch (e) {
        console.error('获取全局世界书失败:', e);
    }
    console.groupEnd();

    // 3. 获取角色世界书
    console.group('3. 角色世界书');
    try {
        if (helper?.getCharWorldbookNames) {
            const charBooks = helper.getCharWorldbookNames('current');
            console.log('角色世界书配置:', charBooks);
            console.log('- 主世界书 (primary):', charBooks?.primary);
            console.log('- 额外世界书 (additional):', charBooks?.additional);

            const engramBook = charBooks?.additional?.find(b => b?.startsWith('[Engram]'));
            if (engramBook) {
                console.log('✅ 找到 Engram 世界书:', engramBook);
            } else {
                console.warn('❌ 未在 additional 中找到 Engram 世界书');
            }
        }
    } catch (e) {
        console.error('获取角色世界书失败:', e);
    }
    console.groupEnd();

    // 4. 检查酒馆内部变量 (关键)
    console.group('4. 酒馆内部变量检查 (关键)');
    try {
        const worldInfoModule = await import('/scripts/world-info.js');
        const settings = worldInfoModule?.getWorldInfoSettings?.();

        // 检查 selected_world_info (全局世界书列表)
        console.log('%cselected_world_info (全局已选):', 'font-weight:bold', settings?.world_info?.globalSelect || '未找到');

        // 检查 world_info.charLore 中当前角色的配置
        if (settings?.world_info?.charLore) {
            const charLore = settings.world_info.charLore;
            console.log('charLore 总数:', charLore.length);

            // 获取当前角色的文件名
            const getCharaFilename = (await import('/scripts/utils.js'))?.getCharaFilename;
            if (typeof getCharaFilename === 'function' && this_chid !== undefined) {
                const fileName = getCharaFilename(this_chid);
                console.log('当前角色 fileName:', fileName);

                // 查找当前角色的 charLore 配置
                const currentCharLore = charLore.find(c => c.name === fileName);
                if (currentCharLore) {
                    console.log('✅ 找到当前角色的 charLore:', currentCharLore);
                    console.log('   extraBooks:', currentCharLore.extraBooks);

                    // 检查是否包含 Engram 世界书
                    const hasEngram = currentCharLore.extraBooks?.some(b => b?.startsWith('[Engram]'));
                    if (hasEngram) {
                        console.log('✅ extraBooks 中包含 Engram 世界书');
                    } else {
                        console.warn('❌ extraBooks 中没有 Engram 世界书');
                    }
                } else {
                    console.warn('❌ 未找到当前角色的 charLore 配置 (fileName:', fileName, ')');
                }
            }
        }
    } catch (e) {
        console.error('检查酒馆内部变量失败:', e);
    }
    console.groupEnd();

    // 5. 直接调用酒馆的 getSortedEntries
    console.group('5. 酒馆 getSortedEntries 检查');
    try {
        const worldInfoModule = await import('/scripts/world-info.js');
        const getSortedEntries = worldInfoModule?.getSortedEntries;

        if (typeof getSortedEntries === 'function') {
            const entries = await getSortedEntries();
            const worldsSet = new Set(entries.map(e => e.world));
            const worlds = [...worldsSet];

            console.log('总条目数:', entries.length);
            console.log('来源世界书:', worlds);

            // 分组统计
            const byWorld = {};
            entries.forEach(e => {
                if (!byWorld[e.world]) byWorld[e.world] = { total: 0, constant: 0 };
                byWorld[e.world].total++;
                if (e.constant) byWorld[e.world].constant++;
            });
            console.table(byWorld);

            // 检查 Engram 世界书条目
            const engramEntries = entries.filter(e => e.world?.startsWith('[Engram]'));
            if (engramEntries.length > 0) {
                console.log('✅ Engram 世界书条目:', engramEntries.length);
            } else {
                console.warn('❌ getSortedEntries 中没有 Engram 世界书条目');
            }
        }
    } catch (e) {
        console.error('调用 getSortedEntries 失败:', e);
    }
    console.groupEnd();

    // 6. 手动获取 Engram 世界书内容
    console.group('6. 手动获取 Engram 世界书');
    try {
        const engramBookName = `[Engram] ${currentChar}`;
        console.log('尝试获取世界书:', engramBookName);

        if (helper?.getWorldbook) {
            const engramEntries = await helper.getWorldbook(engramBookName);
            console.log('Engram 世界书条目数:', engramEntries?.length || 0);
            if (engramEntries?.length > 0) {
                console.log('✅ Engram 世界书存在，包含', engramEntries.length, '个条目');
                console.log('条目示例:', engramEntries[0]);
            }
        } else {
            console.warn('getWorldbook 不可用');
        }
    } catch (e) {
        console.log('获取 Engram 世界书失败 (可能不存在):', e.message);
    }
    console.groupEnd();

    // 7. 检查 getCharacterLore 函数的实际行为
    console.group('7. 模拟 getCharacterLore 逻辑');
    try {
        const character = characters?.[this_chid];
        console.log('角色对象存在:', !!character);

        const baseWorldName = character?.data?.extensions?.world;
        console.log('主世界书 (character.data.extensions.world):', baseWorldName);

        const worldInfoModule = await import('/scripts/world-info.js');
        const settings = worldInfoModule?.getWorldInfoSettings?.();
        const world_info = settings?.world_info;

        // 获取 fileName
        const getCharaFilename = (await import('/scripts/utils.js'))?.getCharaFilename;
        if (typeof getCharaFilename === 'function') {
            const fileName = getCharaFilename(this_chid);
            console.log('getCharaFilename(this_chid) 返回:', fileName);

            const extraCharLore = world_info?.charLore?.find(e => e.name === fileName);
            console.log('world_info.charLore 中的匹配项:', extraCharLore);

            if (extraCharLore?.extraBooks) {
                console.log('额外世界书列表:', extraCharLore.extraBooks);
            }
        }
    } catch (e) {
        console.error('模拟 getCharacterLore 失败:', e);
    }
    console.groupEnd();

    console.log('\n=== Engram 世界书诊断结束 ===');
})();

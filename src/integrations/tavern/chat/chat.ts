import { Logger } from '@/core/logger';
import { getSTContext, STMessage } from '../core/context';

const MODULE = 'TavernChat';

/**
 * 隐藏指定范围的消息
 * @param start 起始楼层
 * @param end 结束楼层
 */
export async function hideMessageRange(start: number, end: number): Promise<void> {
    try {
        const importPath = '/scripts/chats.js';
        const scriptPath = '/script.js';

        const chatsModule = await import(/* @vite-ignore */ importPath);
        const scriptModule = await import(/* @vite-ignore */ scriptPath);

        if (chatsModule && typeof chatsModule.hideChatMessageRange === 'function') {
            await chatsModule.hideChatMessageRange(start, end, false); // unhide=false -> hide

            if (scriptModule && typeof scriptModule.saveChat === 'function') {
                await scriptModule.saveChat();
                Logger.debug(MODULE, `Chat saved after hiding range: ${start}-${end}`);
            } else {
                Logger.warn(MODULE, 'saveChat not found in script.js');
            }

            Logger.debug(MODULE, `Hidden messages range: ${start}-${end}`);
        } else {
            Logger.warn(MODULE, 'hideChatMessageRange not found in chats.js');
        }
    } catch (e) {
        Logger.error(MODULE, 'Failed to hide messages:', e);
    }
}

/**
 * 注入一条消息到聊天记录
 * @param role 角色 ('user' | 'char')
 * @param content 消息内容
 * @param name 发送者名称 (可选，默认使用当前角色或用户名)
 */
export async function injectMessage(role: 'user' | 'char', content: string, name?: string): Promise<void> {
    try {
        const ctx = getSTContext();
        if (!ctx) throw new Error('ST Context unavailable');

        const senderName = name || (role === 'user' ? ctx.name1 : ctx.name2);

        // 动态导入 chats.js 中的核心函数
        const chatsPath = '/scripts/chats.js';
        const scriptPath = '/script.js';

        // 1. 获取必要的模块
        const chatsModule = await import(/* @vite-ignore */ chatsPath);
        const scriptModule = await import(/* @vite-ignore */ scriptPath);

        if (!ctx.chat) throw new Error('Chat array unavailable');

        const newMessage: STMessage = {
            name: senderName,
            is_user: role === 'user',
            is_system: false,
            send_date: Date.now(),
            mes: content,
            // @ts-ignore
            force_avatar: role === 'char' ? scriptModule.characters[ctx.characterId]?.avatar : undefined
        };

        // 3. 推入聊天记录
        ctx.chat.push(newMessage);

        // 4. 保存并刷新
        if (scriptModule.saveChat) {
            await scriptModule.saveChat();
        }

        // 5. 刷新界面
        if (scriptModule.reloadCurrentChat) {
            await scriptModule.reloadCurrentChat();
        }

        Logger.info(MODULE, '已注入消息', { role, length: content.length });
    } catch (e) {
        Logger.error(MODULE, 'Failed to inject message:', e);
        throw e;
    }
}

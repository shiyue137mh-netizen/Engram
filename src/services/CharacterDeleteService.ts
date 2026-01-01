import { getSTContext } from '@/tavern/context';
import { callPopup } from '@/tavern/bridge';
import { Logger } from "@/lib/logger";
import { SettingsManager } from "@/services/settings/Persistence";
import { WorldInfoService } from '@/tavern/api/WorldInfo';
import { notificationService } from '@/services/NotificationService';

export class CharacterDeleteService {
    private static isInitialized = false;

    static init() {
        if (this.isInitialized) return;

        try {
            const context = getSTContext();
            if (context?.eventSource && context?.event_types?.CHARACTER_DELETED) {
                // @ts-ignore - TS 可能无法正确推断 eventSource 的类型，即使我们在 STContext 中定义了
                context.eventSource.on(context.event_types.CHARACTER_DELETED, this.onCharacterDeleted.bind(this));
                Logger.info('CharacterDeleteService', '监听 CHARACTER_DELETED 事件成功');
                this.isInitialized = true;
            } else {
                Logger.warn('CharacterDeleteService', '无法监听 CHARACTER_DELETED 事件: eventSource 或事件类型缺失');
            }
        } catch (e) {
            Logger.error('CharacterDeleteService', '初始化失败', e);
        }
    }

    private static async onCharacterDeleted(data: { id: number; character: any }) {
        const settings = SettingsManager.getSettings().linkedDeletion;
        if (!settings?.enabled) return;

        Logger.debug('CharacterDeleteService', '检测到角色删除', data);

        const characterData = data.character;
        // 获取角色名（多种可能的字段）
        const characterName = characterData?.name || characterData?.avatar || characterData?.ch_name || characterData?.data?.name;

        if (!characterName) {
            Logger.warn('CharacterDeleteService', '无法获取已删除角色的名称');
            return;
        }

        const candidates = new Set<string>();

        // 1. 基于命名规则的猜测 (保底策略)
        // Engram 标准命名: "[Engram] CharName"
        // 同时也兼容一些可能的变体
        candidates.add(`[Engram] ${characterName}`);
        candidates.add(`Engram_${characterName}`);

        // 2. 从角色数据中读取绑定的世界书 (精准策略)
        // 检查 extensions.world 字段 (这是 SillyTavern 存储绑定世界书的地方)
        const dataToCheck = characterData.data || characterData;
        const linkedWorld = dataToCheck?.extensions?.world;

        if (linkedWorld && typeof linkedWorld === 'string') {
            Logger.debug('CharacterDeleteService', `从角色数据中发现绑定世界书: ${linkedWorld}`);
            candidates.add(linkedWorld);
        }

        // 3. 验证存在性并过滤
        // 我们只删除确实存在，且看起来像是 Engram 创建的世界书（安全网）
        const allWorldbooks = await WorldInfoService.getWorldbookNames();
        const allWorldbooksSet = new Set(allWorldbooks);

        const booksToDelete = Array.from(candidates).filter(name => {
            // 必须存在于系统中
            if (!allWorldbooksSet.has(name)) return false;

            // 安全检查：只删除包含 "Engram" 字样的世界书
            // 防止误删用户手动绑定但非 Engram 创建的通用世界书
            const isEngramBook = name.toLowerCase().includes('engram');
            if (!isEngramBook) {
                Logger.info('CharacterDeleteService', `跳过非 Engram 世界书: ${name}`);
            }
            return isEngramBook;
        });

        if (booksToDelete.length === 0) {
            Logger.debug('CharacterDeleteService', `未找到角色 "${characterName}" 关联的 Engram 世界书`);
            return;
        }

        Logger.info('CharacterDeleteService', `准备删除关联世界书: ${booksToDelete.join(', ')}`);

        // 4. 确认删除
        if (settings.showConfirmation) {
            const confirmHtml = `
                <div style="font-size: 0.9em;">
                    <h3>🧹 Engram 联动清理</h3>
                    <p>检测到角色 <b>${characterName}</b> 已被删除。</p>
                    <p>发现以下关联的 Engram 记忆库：</p>
                    <ul style="max-height: 100px; overflow-y: auto; background: var(--black50a); padding: 5px; border-radius: 4px; list-style: none; margin: 10px 0;">
                        ${booksToDelete.map(name => `<li style="padding: 2px 0;">• ${name}</li>`).join('')}
                    </ul>
                    <p>是否一并删除？</p>
                    <small style="opacity: 0.7;">这将永久删除这些记忆库及其包含的所有摘要。</small>
                </div>
            `;

            const confirmed = await callPopup(confirmHtml, 'confirm');
            if (!confirmed) {
                Logger.info('CharacterDeleteService', '用户取消删除关联世界书');
                return;
            }
        }

        // 5. 执行删除
        if (settings.deleteWorldbook) {
            let deletedCount = 0;
            const failedBooks: string[] = [];

            // 显示加载提示
            notificationService.info('正在清理 Engram 记忆库...', 'Engram');

            for (const wbName of booksToDelete) {
                try {
                    const success = await WorldInfoService.deleteWorldbook(wbName);
                    if (success) {
                        deletedCount++;
                        Logger.info('CharacterDeleteService', `已删除世界书: ${wbName}`);
                    } else {
                        failedBooks.push(wbName);
                    }
                } catch (e) {
                    Logger.error('CharacterDeleteService', `删除世界书 ${wbName} 失败`, e);
                    failedBooks.push(wbName);
                }
            }

            if (deletedCount > 0) {
                notificationService.success(`已清理 ${deletedCount} 个关联记忆库`, 'Engram');
            }

            if (failedBooks.length > 0) {
                notificationService.warning(`部分记忆库删除失败: ${failedBooks.join(', ')}`, 'Engram');
            }
        }

        // 6. 删除 IndexedDB 数据 (TODO)
        if (settings.deleteIndexedDB) {
            // Placeholder for future IndexedDB cleanup logic
            // Logger.debug('CharacterDeleteService', 'IndexedDB cleanup is not yet implemented');
        }
    }
}

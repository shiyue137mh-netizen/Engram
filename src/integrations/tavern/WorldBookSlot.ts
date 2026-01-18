/**
 * WorldBookSlotService - WorldBook 槽位初始化服务
 *
 * 负责创建和维护唯一的 {{engramSummaries}} 宏槽位条目
 * 这是 WorldBook 在新架构中的唯一用途：作为宏注入的载体
 */

import { WorldInfoService } from '@/integrations/tavern/api/WorldInfo';
import { Logger } from '@/core/logger';

/** 槽位条目的唯一标识 */
const SLOT_ENTRY_KEY = 'engram_macro_slot';
const SLOT_ENTRY_NAME = 'Engram Memory Context';

/**
 * WorldBookSlotService 类
 */
export class WorldBookSlotService {
    private static isInitialized = false;

    /**
     * 初始化 WorldBook 槽位
     * 确保存在唯一的宏槽位条目
     */
    static async init(): Promise<void> {
        if (this.isInitialized) return;

        try {
            const worldbookName = await WorldInfoService.getOrCreateWorldbook();
            if (!worldbookName) {
                Logger.warn('WorldBookSlotService', '无法获取或创建世界书');
                return;
            }

            // 检查槽位条目是否存在
            const existingEntry = await WorldInfoService.findEntryByKey(worldbookName, SLOT_ENTRY_KEY);

            if (existingEntry) {
                Logger.debug('WorldBookSlotService', '宏槽位条目已存在', {
                    uid: existingEntry.uid,
                    name: existingEntry.name
                });
                this.isInitialized = true;
                return;
            }

            // 创建宏槽位条目
            /**
             * 配置说明：
             * - position: 'at_depth' + depth: 999 → 系统999位置
             * - role: 'system' → 作为系统消息注入
             * - constant: true → 始终激活
             * - content: 包含 {{engramSummaries}} 宏，运行时动态替换
             */
            const success = await WorldInfoService.createEntry(worldbookName, {
                name: SLOT_ENTRY_NAME,
                content: '{{engramSummaries}}',
                keys: [SLOT_ENTRY_KEY],
                constant: true,
                enabled: true,
                position: 'at_depth',
                role: 'system',
                depth: 999,
                order: 9000,  // 固定 order
            });

            if (success) {
                Logger.success('WorldBookSlotService', '宏槽位条目已创建', {
                    worldbook: worldbookName,
                    name: SLOT_ENTRY_NAME
                });
                this.isInitialized = true;
            } else {
                Logger.error('WorldBookSlotService', '创建宏槽位条目失败');
            }

        } catch (e) {
            Logger.error('WorldBookSlotService', '初始化失败', e);
        }
    }

    /**
     * 检查槽位是否已初始化
     */
    static isReady(): boolean {
        return this.isInitialized;
    }

    /**
     * 重置状态（用于测试或聊天切换）
     */
    static reset(): void {
        this.isInitialized = false;
    }
}

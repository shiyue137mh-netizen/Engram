/**
 * WorldBookSlotService - WorldBook 槽位初始化服务
 *
 * 负责创建和维护唯一的 {{engramSummaries}} 和 {{engramEntityStates}} 宏槽位条目
 * 这是 WorldBook 在新架构中的唯一用途：作为宏注入的载体
 */

import { Logger } from '@/core/logger';
import { createEntry, findEntryByKey } from './crud';
import { WorldbookEngramService } from './engram';

/** 槽位条目 Key */
export const SLOT_ENTRY_KEY = 'engram_macro_slot';
/** 槽位条目外部展示名称 */
export const SLOT_ENTRY_NAME = 'Engram Memory Context';

const MODULE = 'Worldbook';

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
        if (this.isInitialized) {return;}

        try {
            const worldbookName = await WorldbookEngramService.getOrCreateWorldbook();
            if (!worldbookName) {
                Logger.warn(MODULE, '无法获取或创建世界书');
                return;
            }

            // 检查槽位条目是否存在
            const existingEntry = await findEntryByKey(worldbookName, SLOT_ENTRY_KEY);

            if (existingEntry) {
                Logger.debug(MODULE, '宏槽位条目已存在', {
                    name: existingEntry.name,
                    uid: existingEntry.uid
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
            const success = await createEntry(worldbookName, {
                constant: true,
                content: '{{engramEntityStates}}\n{{engramSummaries}}',
                depth: 999,
                enabled: true,
                keys: [SLOT_ENTRY_KEY],
                name: SLOT_ENTRY_NAME,
                order: 9000,
                position: 'at_depth',
                role: 'system',  // 固定 order
            });

            if (success) {
                Logger.success(MODULE, '宏槽位条目已创建', {
                    name: SLOT_ENTRY_NAME,
                    worldbook: worldbookName
                });
                this.isInitialized = true;
            } else {
                Logger.error(MODULE, '创建宏槽位条目失败');
            }

        } catch (error) {
            Logger.error(MODULE, '初始化失败', error);
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

import { Logger, LogModule } from '@/core/logger';
import { getSTContext, getRequestHeaders } from '@/integrations/tavern/context';
import { ChatDatabase, getDbForChat, exportChatData, importChatData } from '@/data/db';
import { debounce } from 'lodash';
import { SettingsManager } from '@/config/settings';

// 类型定义：存储在向量 Metadata 中的同步数据结构
interface SyncMetadata {
    hash: number;      // 总是 0，占位
    text: string;      // JSON 字符串化的数据库转储
    index: number;     // 总是 0
    timestamp: number; // 备份时间戳
    chatId: string;    // 聊天 ID
    deviceId: string;  // 设备/Session ID，防回环
}

interface VectorQueryResponse {
    metadata: SyncMetadata[];
    hashes: number[];
}

const MODULE = LogModule.DATA_SYNC;
const DEBOUNCE_DELAY = 3000;
const VECTOR_SOURCE = 'webllm';
const DUMMY_VECTOR = [0];
// 固定占位符，用于 embeddings key，避免序列化差异导致匹配失败
const SYNC_PLACEHOLDER = '__engram_sync__';

export class SyncService {
    private static instance: SyncService;
    private debouncedUploads: Map<string, () => void> = new Map();
    private deviceId: string;

    private constructor() {
        this.deviceId = Math.random().toString(36).substring(2, 15);
        Logger.info(MODULE, `Initialized with Device ID: ${this.deviceId}`);
    }

    public static getInstance(): SyncService {
        if (!SyncService.instance) {
            SyncService.instance = new SyncService();
        }
        return SyncService.instance;
    }

    /**
     * 生成同步用的 Collection ID
     * 格式: engram_sync_{chatId}
     */
    private getCollectionId(chatId: string): string {
        return `engram_sync_${chatId}`;
    }

    /**
     * 调度自动上传（防抖）
     */
    public scheduleUpload(chatId: string) {
        // 检查配置
        const config = SettingsManager.getSettings().syncConfig;
        if (!config?.enabled || !config?.autoSync) {
            return;
        }

        if (!this.debouncedUploads.has(chatId)) {
            const uploadFn = debounce(() => {
                // 再次检查配置，防止在 debounce 期间被关闭
                const currentConfig = SettingsManager.getSettings().syncConfig;
                if (!currentConfig?.enabled || !currentConfig?.autoSync) {
                    return;
                }

                this.upload(chatId).catch(err => {
                    Logger.error(MODULE, `Auto-upload failed for ${chatId}`, err);
                });
            }, DEBOUNCE_DELAY);
            this.debouncedUploads.set(chatId, uploadFn);
        }

        const fn = this.debouncedUploads.get(chatId);
        if (fn) fn();
    }

    /**
     * 上传当前聊天数据到服务端 Vector Store
     * 修复: 使用固定占位符作为 embeddings key，将实际数据放在 text 字段
     */
    public async upload(chatId: string): Promise<boolean> {
        try {
            Logger.info(MODULE, `Starting upload for ${chatId}...`);
            const db = await getDbForChat(chatId);
            const dump = await exportChatData(db);
            const timestamp = Date.now();

            Logger.debug(MODULE, `导出中: ${dump.events.length} 事件, ${dump.entities.length} 实体`);

            // 实际数据 JSON
            const textContent = JSON.stringify({
                ...dump,
                meta: { ...dump.meta, syncTimestamp: timestamp, deviceId: this.deviceId }
            });

            // 使用实际数据作为 text，但使用固定占位符作为 embeddings key
            const payload = {
                collectionId: this.getCollectionId(chatId),
                source: VECTOR_SOURCE,
                model: 'engram_store',
                items: [{
                    hash: 0,
                    index: 0,
                    text: textContent,  // 实际数据放这里
                }],
                embeddings: {
                    // 关键修复：使用固定占位符作为 key，实际数据作为 text
                    // webllm 需要 embeddings 中有匹配的 key，但我们用 items.text 存储数据
                    [textContent]: DUMMY_VECTOR  // 必须用相同的 textContent 作为 key
                }
            };

            // 1. 先清除旧数据 (Purge Collection)
            await this.purge(chatId);

            // 2. 写入新数据
            const response = await fetch('/api/vector/insert', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Upload failed: ${response.statusText} - ${errText}`);
            }

            Logger.success(MODULE, `上传完成: ${chatId}`);
            return true;
        } catch (error) {
            Logger.error(MODULE, `Upload error for ${chatId}`, error);
            return false;
        }
    }

    /**
     * 清除远程数据
     */
    private async purge(chatId: string): Promise<void> {
        try {
            await fetch('/api/vector/purge', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({
                    collectionId: this.getCollectionId(chatId)
                })
            });
        } catch (e) {
            // Ignore purge errors
        }
    }

    /**
     * 检查远程状态
     */
    public async getRemoteStatus(chatId: string): Promise<{ exists: boolean, timestamp: number, deviceId?: string }> {
        try {
            const response = await fetch('/api/vector/query', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({
                    collectionId: this.getCollectionId(chatId),
                    searchText: SYNC_PLACEHOLDER,
                    source: VECTOR_SOURCE,
                    model: 'engram_store',
                    topK: 1,
                    embeddings: {
                        [SYNC_PLACEHOLDER]: DUMMY_VECTOR
                    }
                })
            });

            if (!response.ok) return { exists: false, timestamp: 0 };

            const data = await response.json() as { metadata: any[], hashes: number[] };

            if (!data.metadata || data.metadata.length === 0) {
                return { exists: false, timestamp: 0 };
            }

            // text 字段包含实际的 JSON 数据
            const content = JSON.parse(data.metadata[0].text);
            return {
                exists: true,
                timestamp: content.meta?.syncTimestamp || 0,
                deviceId: content.meta?.deviceId
            };

        } catch (error) {
            Logger.warn(MODULE, `Check status failed for ${chatId}`, error);
            return { exists: false, timestamp: 0 };
        }
    }

    /**
     * 下载并导入数据
     */
    public async download(chatId: string): Promise<string> {
        try {
            Logger.info(MODULE, `Downloading for ${chatId}...`);
            const response = await fetch('/api/vector/query', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({
                    collectionId: this.getCollectionId(chatId),
                    searchText: SYNC_PLACEHOLDER,
                    source: VECTOR_SOURCE,
                    model: 'engram_store',
                    topK: 1,
                    embeddings: {
                        [SYNC_PLACEHOLDER]: DUMMY_VECTOR
                    }
                })
            });

            if (!response.ok) throw new Error('Download request failed');

            const data = await response.json() as { metadata: any[] };
            if (!data.metadata || data.metadata.length === 0) {
                Logger.warn(MODULE, `No remote data found for ${chatId}`);
                return 'no_data';
            }

            const dump = JSON.parse(data.metadata[0].text);
            Logger.debug(MODULE, `接收数据: ${dump.events?.length} 事件, ${dump.entities?.length} 实体`);

            const db = await getDbForChat(chatId);
            await importChatData(db, dump);

            // 验证写入
            const eventCount = await db.events.count();
            const entityCount = await db.entities.count();
            Logger.debug(MODULE, `导入验证: ${eventCount} 事件, ${entityCount} 实体`);

            return 'success';
        } catch (error) {
            Logger.error(MODULE, `Download failed for ${chatId}`, error);
            return 'error';
        }
    }

    /**
     * 自动检查并同步
     * @returns 'downloaded' | 'uploaded' | 'synced' | 'error' | 'ignored'
     */
    public async autoSync(chatId: string): Promise<string> {
        const remoteStatus = await this.getRemoteStatus(chatId);

        // 1. 远程无数据 -> 忽略
        if (!remoteStatus.exists) {
            return 'ignored';
        }

        // 2. 检查本地时间
        const db = await getDbForChat(chatId);
        const meta = await db.meta.toArray();
        const localMeta = meta.length > 0 ? meta[0] : null;
        const localTs = (localMeta as any)?.syncTimestamp || 0;

        // 如果是本机刚上传的，忽略 (防回环)
        if (remoteStatus.deviceId === this.deviceId) {
            return 'synced';
        }

        // 3. 比较
        if (remoteStatus.timestamp > localTs) {
            Logger.info(MODULE, `Remote is newer (${remoteStatus.timestamp} > ${localTs}), downloading...`);
            const result = await this.download(chatId);
            return result === 'success' ? 'downloaded' : 'error';
        } else {
            // 本地更新，等待 debounce 上传
            return 'synced';
        }
    }
}

export const syncService = SyncService.getInstance();

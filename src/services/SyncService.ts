import { Logger } from '@/lib/logger';
import { getSTContext } from '@/tavern/context';
import { ChatDatabase, getDbForChat, exportChatData, importChatData } from '@/services/database/db';
import { debounce } from 'lodash';
import { SettingsManager } from '@/services/settings/Persistence';

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

const MODULE = 'SyncService';
const DEBOUNCE_DELAY = 3000;
const VECTOR_SOURCE = 'webllm';
const DUMMY_VECTOR = [0];

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
     */
    public async upload(chatId: string): Promise<boolean> {
        try {
            Logger.info(MODULE, `Starting upload for ${chatId}...`);
            const db = await getDbForChat(chatId);
            const dump = await exportChatData(db);
            const timestamp = Date.now();

            const payload = {
                collectionId: this.getCollectionId(chatId),
                source: VECTOR_SOURCE,
                items: [{
                    hash: 0, // Hack: 总是覆盖同一个 Item
                    index: 0,
                    text: JSON.stringify({
                        ...dump,
                        meta: { ...dump.meta, syncTimestamp: timestamp, deviceId: this.deviceId }
                    }),
                }]
            };

            // 1. 先清除旧数据 (Purge Collection)
            await this.purge(chatId);

            // 2. 写入新数据
            const response = await fetch('/api/vectors/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            Logger.info(MODULE, `Upload success for ${chatId} at ${new Date(timestamp).toLocaleString()}`);
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
            await fetch('/api/vectors/purge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            const response = await fetch('/api/vectors/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collectionId: this.getCollectionId(chatId),
                    searchText: 'dummy', // 任意文本，webllm 不会用到 embedding
                    source: VECTOR_SOURCE,
                    topK: 1
                })
            });

            if (!response.ok) return { exists: false, timestamp: 0 };

            const list: { metadata: any[] }[] = await response.json();
            // 注意: query 返回结构可能是 { metadata: [...] }[] 或者直接是 metadata 数组，取决于具体实现
            // 这里根据 observed api vectors.js, queryCollection 返回 { metadata, hashes }
            // 但 router.post('/query') 返回 json(results) -> { metadata, hashes }

            // 修正：根据 endpoints/vectors.js:419 return res.json(results);
            // results 是 { metadata: object[], hashes: number[] }
            const data = list as unknown as { metadata: any[] };

            if (!data.metadata || data.metadata.length === 0) {
                return { exists: false, timestamp: 0 };
            }

            // 解析存储的 JSON
            // 我们的 text 字段是 JSON 字符串
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
    public async download(chatId: string): Promise<boolean> {
        try {
            Logger.info(MODULE, `Downloading for ${chatId}...`);
            const response = await fetch('/api/vectors/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collectionId: this.getCollectionId(chatId),
                    searchText: 'dummy',
                    source: VECTOR_SOURCE,
                    topK: 1
                })
            });

            if (!response.ok) throw new Error('Download request failed');

            const data = await response.json() as { metadata: any[] };
            if (!data.metadata || data.metadata.length === 0) {
                Logger.warn(MODULE, `No remote data found for ${chatId}`);
                return false;
            }

            const dump = JSON.parse(data.metadata[0].text);
            const db = await getDbForChat(chatId);

            await importChatData(db, dump);
            Logger.info(MODULE, `Import success for ${chatId}`);
            return true;
        } catch (error) {
            Logger.error(MODULE, `Download failed for ${chatId}`, error);
            return false;
        }
    }

    /**
     * 自动检查并同步
     * @returns 'downloaded' | 'uploaded' | 'synced' | 'error' | 'ignored'
     */
    public async autoSync(chatId: string): Promise<string> {
        const remoteStr = await this.getRemoteStatus(chatId);

        // 1. 远程无数据 -> 上传
        if (!remoteStr.exists) {
            // 仅在首次创建或手动开启同步时上传？
            // 这里不做自动上传，避免意外覆盖？
            // 策略：如果开启了 AutoSync (Settings)，则上传
            // 暂时返回 ignored
            return 'ignored';
        }

        // 2. 检查本地时间
        const db = await getDbForChat(chatId);
        // 需要在 db meta 中存储最后同步时间
        // 获取本地 meta 表
        const meta = await db.meta.toArray();
        const localMeta = meta.length > 0 ? meta[0] : null;
        // 假设我们在 meta 中存储了 syncTimestamp
        // 由于 Dexie 对象是动态的，我们需要扩展类型或容错
        const localTs = (localMeta as any)?.syncTimestamp || 0;

        // 如果是本机刚上传的，忽略 (防回环)
        if (remoteStr.deviceId === this.deviceId) {
            return 'synced';
        }

        // 3. 比较
        if (remoteStr.timestamp > localTs) {
            Logger.info(MODULE, `Remote is newer (${remoteStr.timestamp} > ${localTs}), downloading...`);
            const success = await this.download(chatId);
            return success ? 'downloaded' : 'error';
        } else {
            // 本地更新，等待 debounce 上传
            return 'synced';
        }
    }
}

export const syncService = SyncService.getInstance();

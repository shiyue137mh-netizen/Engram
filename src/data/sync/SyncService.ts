import { Logger, LogModule } from '@/core/logger';
import { getSTContext, getRequestHeaders } from '@/integrations/tavern/context';
import { ChatDatabase, ChatDataDump, getDbForChat, exportChatData, importChatData } from '@/data/db';
import { debounce } from 'lodash';
import { SettingsManager } from '@/config/settings';
import { notificationService } from '@/ui/services/NotificationService';

const MODULE = LogModule.DATA_SYNC;
const DEBOUNCE_DELAY = 3000;
const SYNC_FILE_PREFIX = 'Engram_sync_';
const SYNC_FILE_EXT = '.json';

class SyncService {
    private static instance: SyncService;
    private debouncedUploads: Map<string, () => void> = new Map();
    private isImporting: boolean = false; // 导入锁，防止导入时触发上传

    public get isImportingState(): boolean {
        return this.isImporting;
    }

    private constructor() {
        Logger.info(MODULE, `Initialized SyncService`);
        this.initEventListeners();
    }

    private initEventListeners() {
        // 动态导入 EventBus 以避免循环依赖（如果 EventBus 依赖其他模块）
        // 这里假设 EventBus 是独立的或我们延迟绑定
        // 为确保安全，我们在第一次 getInstance 时不强依赖 Tavern 上下文，
        // 而是依靠外部调用 init 或在构造函数中尝试
        setTimeout(async () => {
            const { EventBus, TavernEventType } = await import('@/integrations/tavern/events');

            // 监听聊天切换事件
            EventBus.on(TavernEventType.CHAT_CHANGED, async () => {
                const { getSTContext } = await import('@/integrations/tavern/context');
                const chatId = getSTContext().chatId;
                if (chatId) {
                    Logger.info(MODULE, `Chat changed to ${chatId}, checking sync...`);
                    // 延迟一点等待 DB 准备好
                    setTimeout(() => this.autoSyncDownload(chatId), 1000);
                }
            });

            // 首次加载也检查一次
            const { getSTContext } = await import('@/integrations/tavern/context');
            if (getSTContext().chatId) {
                this.autoSyncDownload(getSTContext().chatId!);
            }
        }, 2000);
    }

    public static getInstance(): SyncService {
        if (!SyncService.instance) {
            SyncService.instance = new SyncService();
        }
        return SyncService.instance;
    }

    /**
     * 生成同步文件名
     * 格式: Engram_sync_{chatId}.json
     */
    private getSyncFileName(chatId: string): string {
        // 简单清理 chatId，虽然通常已经是安全的
        const safeChatId = chatId.replace(/[^a-zA-Z0-9_-]/g, '_');
        return `${SYNC_FILE_PREFIX}${safeChatId}${SYNC_FILE_EXT}`;
    }

    /**
     * 获取同步文件的完整 URL (用于 fetch)
     */
    private getSyncFileUrl(fileName: string): string {
        // 酒馆上传的文件在 /user/files/ 目录下
        // 添加时间戳防止缓存
        return `/user/files/${fileName}?t=${Date.now()}`;
    }

    /**
     * 调度自动上传（防抖）
     */
    public scheduleUpload(chatId: string) {
        // 检查导入锁
        if (this.isImporting) {
            Logger.debug(MODULE, `Skipping upload schedule for ${chatId} (Importing)`);
            return;
        }

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
     * 上传当前聊天数据到服务端 (作为文件)
     */
    public async upload(chatId: string): Promise<boolean> {
        try {
            Logger.info(MODULE, `Starting upload for ${chatId}...`);
            const db = await getDbForChat(chatId);
            const dump = await exportChatData(db);

            // 使用数据库中的 lastModified 作为同步时间戳
            // 如果是首次上传或旧库，可能没有 lastModified，则使用当前时间并写入
            let lastModified = (await db.meta.get('lastModified'))?.value as number;

            if (!lastModified) {
                lastModified = Date.now();
                await db.meta.put({ key: 'lastModified', value: lastModified });
                // 更新 dump 中的 meta 以包含新的时间戳
                dump.meta['lastModified'] = lastModified;
            }

            const timestamp = lastModified;

            Logger.debug(MODULE, `导出中: ${dump.events.length} 事件, ${dump.entities.length} 实体`);

            const jsonString = JSON.stringify(dump);
            const fileName = this.getSyncFileName(chatId);

            // 使用 /api/files/upload 上传
            // 注意: data 需要是 base64 编码
            const response = await fetch('/api/files/upload', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({
                    name: fileName,
                    data: btoa(unescape(encodeURIComponent(jsonString))) // 处理 UTF-8 字符的 Base64 编码
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Upload failed: ${response.statusText} - ${errText}`);
            }

            Logger.success(MODULE, `上传完成: ${fileName}`);
            return true;
        } catch (error) {
            Logger.error(MODULE, `Upload error for ${chatId}`, error);
            return false;
        }
    }

    /**
     * 删除远程同步文件 (及本地 user/files/ 下的对应文件)
     */
    public async purge(chatId: string): Promise<void> {
        try {
            const fileName = this.getSyncFileName(chatId);
            await fetch('/api/files/delete', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({
                    path: fileName // files API 直接接收文件名作为 path (当不需要子目录时)
                })
            });
        } catch (e) {
            // Ignore purge errors
        }
    }

    /**
     * 检查远程状态
     * 尝试下载文件头或整个文件来检查是否存在和更新时间
     */
    public async getRemoteStatus(chatId: string): Promise<{ exists: boolean, timestamp: number }> {
        try {
            const fileName = this.getSyncFileName(chatId);
            const url = this.getSyncFileUrl(fileName);

            // 使用 fetch HEAD 请求先检查文件是否存在 (酒馆可能不支持 HEAD，直接 GET)
            // 由于我们需要 meta 信息，且通常文件不会极大，直接 GET
            const response = await fetch(url);

            if (!response.ok) return { exists: false, timestamp: 0 };

            const dump = await response.json() as ChatDataDump;

            if (!dump.meta || !dump.meta.lastModified) {
                return { exists: false, timestamp: 0 };
            }

            return {
                exists: true,
                timestamp: dump.meta.lastModified as number,
            };

        } catch (error) {
            // 404 等错误也会进这里
            return { exists: false, timestamp: 0 };
        }
    }

    /**
     * 下载并导入数据
     */
    public async download(chatId: string): Promise<string> {
        try {
            Logger.info(MODULE, `Downloading for ${chatId}...`);
            this.isImporting = true; // 加锁

            const fileName = this.getSyncFileName(chatId);
            const url = this.getSyncFileUrl(fileName);
            const response = await fetch(url);

            if (!response.ok) {
                Logger.warn(MODULE, `No remote data found for ${chatId} (HTTP ${response.status})`);
                this.isImporting = false;
                return 'no_data';
            }

            const dump = await response.json() as ChatDataDump;

            if (!dump.events || !dump.entities) {
                this.isImporting = false;
                throw new Error('Invalid file format: missing events or entities');
            }

            Logger.debug(MODULE, `接收数据: ${dump.events?.length} 事件, ${dump.entities?.length} 实体`);

            const db = await getDbForChat(chatId);
            await importChatData(db, dump);

            // importChatData 应该包含了从服务端来的 meta（其中包含 lastModified）
            // 因此不需要手动 patch 时间戳，数据库状态应当完全与远程一致
            // 如果远程文件是旧版本的（没有 lastModified），则再次上传时会补上

            // 验证写入
            const eventCount = await db.events.count();
            const entityCount = await db.entities.count();
            Logger.debug(MODULE, `导入验证: ${eventCount} 事件, ${entityCount} 实体`);

            return 'success';
        } catch (error) {
            Logger.error(MODULE, `Download failed for ${chatId}`, error);
            return 'error';
        } finally {
            // 延迟释放锁，等待可能的 DB 钩子处理完毕
            setTimeout(() => {
                this.isImporting = false;
            }, 1000);
        }
    }

    /**
     * 自动下载同步 (单向：远程 -> 本地)
     * 用于切换聊天时检查
     */
    public async autoSyncDownload(chatId: string): Promise<void> {
        const config = SettingsManager.getSettings().syncConfig;
        if (!config?.enabled || !config?.autoSync) return;

        const remoteStatus = await this.getRemoteStatus(chatId);
        if (!remoteStatus.exists) return;

        // 检查本地时间
        // 检查本地时间 (lastModified)
        const db = await getDbForChat(chatId);
        const localMeta = await db.meta.get('lastModified');
        const localTs = (localMeta?.value as number) || 0;

        // 如果远程更新
        if (remoteStatus.timestamp > localTs) {
            Logger.info(MODULE, `Found newer remote data (${remoteStatus.timestamp} > ${localTs}), downloading...`);
            const result = await this.download(chatId);
            if (result === 'success') {
                notificationService.success('已自动同步云端数据', 'Engram', { timeOut: 3000 });
            }
        } else {
            Logger.debug(MODULE, `Local data is up to date (Remote: ${remoteStatus.timestamp} <= Local: ${localTs})`);
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
        const localMeta = await db.meta.get('lastModified');
        const localTs = (localMeta?.value as number) || 0;

        // 如果是本机刚上传的，忽略 (防回环)
        // 旧逻辑：通过 deviceId 检查
        // 新逻辑：通过严格时间戳检查 (remote > local)
        // 如果 remote == local，说明是已同步状态，返回 synced
        // 因此不需要特殊的 deviceId 检查

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

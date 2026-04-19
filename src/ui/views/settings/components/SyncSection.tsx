import React, { useState } from 'react';
import { useConfigStore } from "@/state/configStore";
import { Switch } from "@/ui/components/core/Switch";
import { getCurrentChatId } from "@/integrations/tavern";
import { LogModule, Logger } from "@/core/logger";

export const SyncSection: React.FC = () => {
    const { syncConfig, updateConfig } = useConfigStore();
    const [syncStatus, setSyncStatus] = useState<'idle' | 'check' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState<string>('');
    const [lastSyncTime, setLastSyncTime] = useState<number>(0);
    const chatId = getCurrentChatId();

    const handleConfigChange = (key: keyof typeof syncConfig) => (checked: boolean) => {
        updateConfig('syncConfig', { ...syncConfig, [key]: checked } as any);
    };

    const handleManualSync = async () => {
        try {
            setSyncStatus('check');
            setSyncMessage('检查中...');

            const { getSTContext } = await import('@/integrations/tavern');
            const context = getSTContext();
            if (!context?.chatId) {
                alert('请先打开一个聊天以进行同步测试');
                setSyncStatus('idle');
                setSyncMessage('');
                return;
            }

            const {chatId} = context;
            setSyncStatus('syncing');
            setSyncMessage('同步中...');

            const { syncService } = await import('@/data/sync/SyncService');

            // 使用 autoSync 智能同步
            const result = await syncService.autoSync(chatId);

            setLastSyncTime(Date.now());

            switch (result) {
                case 'downloaded': {
                    setSyncStatus('success');
                    setSyncMessage('已从服务端恢复');
                    break;
                }
                case 'uploaded': {
                    setSyncStatus('success');
                    setSyncMessage('已上传至服务端');
                    break;
                }
                case 'synced': {
                    setSyncStatus('success');
                    setSyncMessage('无需同步');
                    break;
                }
                case 'ignored': {
                    setSyncStatus('idle');
                    setSyncMessage('服务端无数据');
                    break;
                }
                case 'error':
                default: {
                    setSyncStatus('error');
                    setSyncMessage('同步失败');
                    break;
                }
            }

            if (result !== 'error') {
                setTimeout(() => {
                    setSyncStatus('idle');
                    setSyncMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setSyncStatus('error');
            setSyncMessage('发生异常');
        }
    };

    return (
        <div className="bg-muted/30 border border-border rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 16h5v5" />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-medium text-heading truncate">多端数据同步 (Beta)</h4>
                            {syncStatus !== 'idle' && (
                                <span className={`text-xs ${syncStatus === 'error' ? 'text-red-500' :
                                    (syncStatus === 'success' ? 'text-green-500' : 'text-blue-500 animate-pulse')
                                    }`}>
                                    {syncMessage}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            利用酒馆文件读写接口存储与同步
                        </p>
                    </div>
                </div>
                <Switch
                    checked={syncConfig?.enabled ?? false}
                    onChange={handleConfigChange('enabled')}
                />
            </div>

            {syncConfig?.enabled && (
                <div className="pl-14 space-y-3 border-t border-border pt-3">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <span className="text-sm text-muted-foreground">自动同步</span>
                            <p className="text-xs text-muted-foreground/60">数据变动3秒后自动上传</p>
                        </div>
                        <Switch
                            checked={syncConfig.autoSync ?? true}
                            onChange={handleConfigChange('autoSync')}
                            className="scale-90"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <span className="text-sm text-muted-foreground">上次同步</span>
                            <p className="text-xs text-muted-foreground/60">
                                {lastSyncTime > 0 ? new Date(lastSyncTime).toLocaleString() : '暂无记录'}
                            </p>
                        </div>
                        <button
                            onClick={handleManualSync}
                            disabled={syncStatus === 'syncing'}
                            className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors disabled:opacity-50"
                        >
                            立即同步
                        </button>
                    </div>

                    <ul className="mt-2 text-xs text-muted-foreground/60 p-2 bg-background/50 rounded list-disc list-inside">
                        <li>数据存储路径: `data/default-user/files/Engram_sync_{chatId ?? '未知'}.json`</li>
                        <li>跨设备同步需手动点击"上传"或开启自动同步</li>
                        <li>请定期备份重要数据</li>
                    </ul>
                </div>
            )}
            
            {/* 强制操作区 - 仅用于调试或手动恢复 */}
            <div className="flex gap-2 justify-end pt-2 border-t border-border/50">
                <button
                    onClick={async () => {
                        try {
                            setSyncStatus('syncing');
                            setSyncMessage('强制上传中...');
                            const { getSTContext } = await import('@/integrations/tavern');
                            const chatId = getSTContext()?.chatId;
                            if (!chatId) {throw new Error('未连接到聊天');}

                            const { syncService } = await import('@/data/sync/SyncService');
                            const success = await syncService.upload(chatId);

                            if (success) {
                                setSyncStatus('success');
                                setSyncMessage('上传成功');
                                setLastSyncTime(Date.now());
                            } else {
                                throw new Error('上传失败');
                            }
                        } catch (error) {
                            Logger.error(LogModule.DATA_SYNC, 'Manual upload failed', error);
                            setSyncStatus('error');
                            setSyncMessage('上传错误: ' + String(error));
                        }
                    }}
                    className="px-2 py-1 text-[10px] font-medium rounded bg-background border border-border hover:bg-blue-500/10 text-muted-foreground hover:text-blue-500 transition-colors"
                >
                    强制上传 (覆盖服务端)
                </button>
                <button
                    onClick={async () => {
                        try {
                            setSyncStatus('syncing');
                            setSyncMessage('强制下载中...');
                            const { getSTContext } = await import('@/integrations/tavern');
                            const chatId = getSTContext()?.chatId;
                            if (!chatId) {throw new Error('未连接到聊天');}

                            const { syncService } = await import('@/data/sync/SyncService');
                            const result = await syncService.download(chatId);

                            if (result === 'success') {
                                setSyncStatus('success');
                                setSyncMessage('下载并导入成功');
                                setLastSyncTime(Date.now());
                            } else {
                                throw new Error(result === 'no_data' ? '服务端无数据' : '下载失败');
                            }
                        } catch (error) {
                            Logger.error(LogModule.DATA_SYNC, 'Manual download failed', error);
                            setSyncStatus('error');
                            setSyncMessage('下载错误: ' + String(error));
                        }
                    }}
                    className="px-2 py-1 text-[10px] font-medium rounded bg-background border border-border hover:bg-orange-500/10 text-muted-foreground hover:text-orange-500 transition-colors"
                >
                    强制下载 (覆盖本地)
                </button>
            </div>
        </div>
    );
};

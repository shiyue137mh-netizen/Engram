import React, { useEffect, useState } from 'react';
import { PageTitle } from "@/components/common/PageTitle";
import { Settings as SettingsIcon, Eye, Trash2 } from 'lucide-react';
import { ThemeSelector } from './components/ThemeSelector';
import { Switch } from "@/components/ui/Switch";
import { NumberField } from '../APIPresets/components/FormField';
import { summarizerService } from "@/services/summarizer";
import { preprocessor } from "@/services/preprocessing";
import { SettingsManager } from "@/services/settings/Persistence";
import { DEFAULT_PREPROCESSING_CONFIG } from "@/services/preprocessing/types";

export const Settings: React.FC = () => {
    const [previewEnabled, setPreviewEnabled] = useState(SettingsManager.getSettings().summarizerConfig?.previewEnabled ?? true);
    const [preprocessingPreviewEnabled, setPreprocessingPreviewEnabled] = useState(SettingsManager.getSettings().preprocessingConfig?.preview ?? DEFAULT_PREPROCESSING_CONFIG.preview);

    // HACK: 强制刷新引用
    const [, forceUpdate] = useState({});

    useEffect(() => {
        SettingsManager.loadSettings();
    }, []);

    const handlePreviewToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enabled = e.target.checked;
        setPreviewEnabled(enabled);
        summarizerService.updateConfig({ previewEnabled: enabled });
    };

    const [linkedDeletion, setLinkedDeletion] = useState(SettingsManager.getSettings().linkedDeletion);

    const handleLinkedDeletionChange = (key: keyof typeof linkedDeletion) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSettings = { ...linkedDeletion, [key]: e.target.checked };
        setLinkedDeletion(newSettings);
        SettingsManager.set('linkedDeletion', newSettings);
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle title="设置" subtitle="扩展全局选项" />
            <div className="p-6 space-y-8">
                {/* Theme Section */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">外观</h3>
                    <ThemeSelector />
                </section>

                {/* Glass Settings Section (Visual) */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">毛玻璃特效 (Glass Effect)</h3>
                    <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-6">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-foreground truncate">启用毛玻璃</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        开启后，面板背景将具有磨砂质感
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={SettingsManager.getSettings().glassSettings?.enabled ?? true}
                                onChange={(checked) => {
                                    const current = SettingsManager.getSettings();
                                    const newSettings = {
                                        ...current.glassSettings,
                                        enabled: checked
                                    };
                                    SettingsManager.set('glassSettings', newSettings);
                                    import('@/services/ThemeManager').then(({ ThemeManager }) => {
                                        ThemeManager.setTheme(ThemeManager.getTheme());
                                    });
                                    forceUpdate({});
                                }}
                            />
                        </div>

                        {(SettingsManager.getSettings().glassSettings?.enabled ?? true) && (
                            <>
                                <NumberField
                                    label="不透明度 (Opacity)"
                                    description="调整面板背景的遮罩强度，数值越低越透明"
                                    value={SettingsManager.getSettings().glassSettings?.opacity ?? 0.8}
                                    onChange={(val) => {
                                        const current = SettingsManager.getSettings();
                                        const newSettings = {
                                            ...current.glassSettings,
                                            opacity: val
                                        };
                                        SettingsManager.set('glassSettings', newSettings);
                                        import('@/services/ThemeManager').then(({ ThemeManager }) => {
                                            ThemeManager.setTheme(ThemeManager.getTheme());
                                        });
                                        forceUpdate({});
                                    }}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    showSlider={true}
                                />
                                <NumberField
                                    label="背景磨砂 (Blur)"
                                    description="调整背景模糊程度 (px)"
                                    value={SettingsManager.getSettings().glassSettings?.blur ?? 10}
                                    onChange={(val) => {
                                        const current = SettingsManager.getSettings();
                                        const newSettings = {
                                            ...current.glassSettings,
                                            blur: val
                                        };
                                        SettingsManager.set('glassSettings', newSettings);
                                        import('@/services/ThemeManager').then(({ ThemeManager }) => {
                                            ThemeManager.setTheme(ThemeManager.getTheme());
                                        });
                                        forceUpdate({});
                                    }}
                                    min={0}
                                    max={50}
                                    step={1}
                                    showSlider={true}
                                />
                            </>
                        )}
                    </div>
                </section>

                {/* Summarizer Section */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">功能</h3>

                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                    <Eye size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-foreground truncate">启用修订模式</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">在写入长期记忆前，弹出预览窗口</p>
                                </div>
                            </div>
                            <Switch
                                checked={previewEnabled}
                                onChange={(checked) => {
                                    setPreviewEnabled(checked);
                                    summarizerService.updateConfig({ previewEnabled: checked });
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Preprocessing Section */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">输入预处理</h3>
                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                    <Eye size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-foreground truncate">预处理修订模式</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">在注入用户输入前，弹出预览窗口</p>
                                </div>
                            </div>
                            <Switch
                                checked={preprocessingPreviewEnabled}
                                onChange={(checked) => {
                                    setPreprocessingPreviewEnabled(checked);
                                    const currentConfig = preprocessor.getConfig();
                                    preprocessor.saveConfig({ ...currentConfig, preview: checked });
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Data Management Section */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">数据管理</h3>

                    <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-4">
                        {/* 联动删除 */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="p-2 rounded-lg bg-red-500/10 text-red-500 flex-shrink-0">
                                    <Trash2 size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-foreground truncate">联动删除</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">删除角色/聊天时，自动清理记忆库</p>
                                </div>
                            </div>
                            <Switch
                                checked={linkedDeletion.enabled}
                                onChange={(checked) => {
                                    const newSettings = { ...linkedDeletion, enabled: checked };
                                    setLinkedDeletion(newSettings);
                                    SettingsManager.set('linkedDeletion', newSettings);
                                }}
                            />
                        </div>

                        {linkedDeletion.enabled && (
                            <div className="pl-14 space-y-3 border-t border-border pt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">删除前确认</span>
                                    <Switch
                                        checked={linkedDeletion.showConfirmation}
                                        onChange={(checked) => {
                                            const newSettings = { ...linkedDeletion, showConfirmation: checked };
                                            setLinkedDeletion(newSettings);
                                            SettingsManager.set('linkedDeletion', newSettings);
                                        }}
                                        className="scale-90"
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <span className="text-sm text-muted-foreground block truncate">删除聊天时同步删除 Worldbook</span>
                                        <p className="text-xs text-muted-foreground/60 line-clamp-2">危险: 多聊天共享 Worldbook 时可能误删</p>
                                    </div>
                                    <Switch
                                        checked={linkedDeletion.deleteChatWorldbook ?? false}
                                        onChange={(checked) => {
                                            const newSettings = { ...linkedDeletion, deleteChatWorldbook: checked };
                                            setLinkedDeletion(newSettings);
                                            SettingsManager.set('linkedDeletion', newSettings);
                                        }}
                                        className="scale-90"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Data Synchronization Section */}
                    <SyncSection />
                </section>

                {/* Future settings sections can go here */}
                <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50">
                        <SettingsIcon size={32} />
                        <p className="text-sm">更多设置开发中...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 提取的 SyncSection 组件避免重新渲染整个 Settings
const SyncSection: React.FC = () => {
    const [syncConfig, setSyncConfig] = useState(SettingsManager.getSettings().syncConfig || { enabled: false, autoSync: true });
    const [syncStatus, setSyncStatus] = useState<'idle' | 'check' | 'syncing' | 'success' | 'error'>('idle');
    const [lastSyncTime, setLastSyncTime] = useState<number>(0);

    const handleConfigChange = (key: keyof typeof syncConfig) => (checked: boolean) => {
        const newConfig = { ...syncConfig, [key]: checked };
        setSyncConfig(newConfig);
        SettingsManager.set('syncConfig', newConfig);
    };

    const handleManualSync = async () => {
        try {
            setSyncStatus('check');
            const { getSTContext } = await import('@/tavern/context');
            if (!getSTContext().chatId) {
                alert('请先打开一个聊天以进行同步测试');
                setSyncStatus('idle');
                return;
            }

            const chatId = getSTContext().chatId;
            setSyncStatus('syncing');

            // 1. 先检查远程状态
            const { syncService } = await import('@/services/SyncService');
            // const status = await syncService.getRemoteStatus(chatId);

            // 简单逻辑：如果远程有更新则下载，否则上传
            // 这里为了演示，我们强制先上传
            const success = await syncService.upload(chatId);

            if (success) {
                setSyncStatus('success');
                setLastSyncTime(Date.now());
                setTimeout(() => setSyncStatus('idle'), 3000);
            } else {
                setSyncStatus('error');
            }
        } catch (e) {
            console.error(e);
            setSyncStatus('error');
        }
    };

    return (
        <div className="bg-muted/30 border border-border rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 16h5v5" />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground truncate">多端数据同步 (Beta)</h4>
                            {syncStatus === 'syncing' && <span className="text-xs text-blue-500 animate-pulse">同步中...</span>}
                            {syncStatus === 'success' && <span className="text-xs text-green-500">同步成功</span>}
                            {syncStatus === 'error' && <span className="text-xs text-red-500">同步失败</span>}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            利用 WebLLM 向量接口存储与同步
                        </p>
                    </div>
                </div>
                <Switch
                    checked={syncConfig.enabled}
                    onChange={handleConfigChange('enabled')}
                />
            </div>

            {syncConfig.enabled && (
                <div className="pl-14 space-y-3 border-t border-border pt-3">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <span className="text-sm text-muted-foreground">自动同步</span>
                            <p className="text-xs text-muted-foreground/60">数据变动3秒后自动上传</p>
                        </div>
                        <Switch
                            checked={syncConfig.autoSync}
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
                            立即上传
                        </button>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground/60 p-2 bg-background/50 rounded">
                        <p>⚠️ Beta 注意事项：</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                            <li>数据存储路径: `data/default-user/vectors/webllm`</li>
                            <li>跨设备同步需手动点击"上传"或开启自动同步</li>
                            <li>请定期备份重要数据</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

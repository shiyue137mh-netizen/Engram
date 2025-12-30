import React, { useEffect, useState } from 'react';
import { PageTitle } from '../components/PageTitle';
import { Settings as SettingsIcon, Eye, Trash2 } from 'lucide-react';
import { ThemeSelector } from './components/ThemeSelector';
import { summarizerService } from '../../core/summarizer';
import { SettingsManager } from '../../infrastructure/SettingsManager';

export const Settings: React.FC = () => {
    const [previewEnabled, setPreviewEnabled] = useState(
        summarizerService.getConfig().previewEnabled
    );

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

                {/* Summarizer Section */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">功能</h3>

                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Eye size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">启用修订模式</h4>
                                    <p className="text-sm text-muted-foreground">在写入长期记忆前，弹出预览窗口进行人工核对</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={previewEnabled}
                                    onChange={handlePreviewToggle}
                                />
                                <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Data Management Section */}
                <section>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">数据管理</h3>

                    <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-4">
                        {/* 联动删除 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">联动删除</h4>
                                    <p className="text-sm text-muted-foreground">删除角色卡时，一并删除关联的 Engram 记忆库</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={linkedDeletion.enabled}
                                    onChange={handleLinkedDeletionChange('enabled')}
                                />
                                <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                            </label>
                        </div>

                        {linkedDeletion.enabled && (
                            <div className="pl-14 space-y-3 border-t border-border pt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">删除前确认</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={linkedDeletion.showConfirmation}
                                            onChange={handleLinkedDeletionChange('showConfirmation')}
                                        />
                                        <div className="w-9 h-5 bg-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
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

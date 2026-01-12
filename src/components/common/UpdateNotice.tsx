/**
 * UpdateNotice - 更新通知弹窗组件
 *
 * 显示最新版本信息和更新日志
 * V0.8.5: 添加一键更新功能
 */

import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle, Download, Loader2 } from 'lucide-react';
import { UpdateService } from '@/services/updater';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface UpdateNoticeProps {
    isOpen: boolean;
    onClose: () => void;
}

/** Engram 扩展名（用于更新 API） */
const EXTENSION_NAME = 'Engram_project';

/**
 * 调用酒馆扩展更新 API
 */
async function updateEngramExtension(): Promise<{ success: boolean; message: string; isUpToDate?: boolean }> {
    try {
        const response = await fetch('/api/extensions/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                extensionName: EXTENSION_NAME,
                global: false, // Engram 是本地扩展
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            return { success: false, message: text || response.statusText };
        }

        const data = await response.json();

        if (data.isUpToDate) {
            return { success: true, message: '扩展已是最新版本', isUpToDate: true };
        }

        return {
            success: true,
            message: `更新成功！新版本: ${data.shortCommitHash || 'latest'}`,
            isUpToDate: false
        };
    } catch (error) {
        console.error('[Engram] 更新失败:', error);
        return { success: false, message: String(error) };
    }
}

export const UpdateNotice: React.FC<UpdateNoticeProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [latestVersion, setLatestVersion] = useState<string | null>(null);
    const [changelog, setChangelog] = useState<string | null>(null);
    const [hasUpdate, setHasUpdate] = useState(false);
    const [isMarking, setIsMarking] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    const currentVersion = UpdateService.getCurrentVersion();

    useEffect(() => {
        if (isOpen) {
            loadUpdateInfo();
            setUpdateMessage(null);
        }
    }, [isOpen]);

    const loadUpdateInfo = async () => {
        setIsLoading(true);
        try {
            const [latest, log, update] = await Promise.all([
                UpdateService.getLatestVersion(),
                UpdateService.getChangelog(),
                UpdateService.hasUpdate(),
            ]);
            setLatestVersion(latest);
            setChangelog(log);
            setHasUpdate(update);
        } catch (e) {
            console.error('[Engram] 加载更新信息失败', e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsRead = async () => {
        setIsMarking(true);
        try {
            const versionToMark = latestVersion || currentVersion;
            console.debug('[Engram] Marking update as read:', versionToMark);
            await UpdateService.markAsRead(versionToMark);
            onClose();
        } finally {
            setIsMarking(false);
        }
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        setUpdateMessage(null);

        try {
            const result = await updateEngramExtension();

            if (result.success && !result.isUpToDate) {
                setUpdateMessage('更新成功！页面将在 2 秒后刷新...');
                // 标记为已读
                if (latestVersion) {
                    await UpdateService.markAsRead(latestVersion);
                }
                // 延迟刷新页面
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else if (result.isUpToDate) {
                setUpdateMessage('当前已是最新版本');
                setHasUpdate(false);
            } else {
                setUpdateMessage(`更新失败: ${result.message}`);
            }
        } catch (error) {
            setUpdateMessage(`更新出错: ${String(error)}`);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRefresh = () => {
        UpdateService.clearCache();
        loadUpdateInfo();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Download size={16} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-foreground">更新通知</h2>
                            <p className="text-xs text-muted-foreground">
                                当前版本: v{currentVersion}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRefresh}
                            className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                            title="刷新"
                        >
                            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <RefreshCw size={24} className="animate-spin mb-3" />
                            <p className="text-sm">正在检查更新...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Version Status */}
                            <div className={`
                                p-4 rounded-lg border
                                ${hasUpdate
                                    ? 'bg-primary/5 border-primary/20'
                                    : 'bg-green-500/5 border-green-500/20'}
                            `}>
                                <div className="flex items-center gap-3">
                                    {hasUpdate ? (
                                        <Download size={20} className="text-primary" />
                                    ) : (
                                        <CheckCircle size={20} className="text-green-500" />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">
                                            {hasUpdate
                                                ? `发现新版本: v${latestVersion}`
                                                : '已是最新版本'}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {hasUpdate
                                                ? '点击下方按钮一键更新'
                                                : '无需更新'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Update Message */}
                            {updateMessage && (
                                <div className={`
                                    p-3 rounded-lg text-sm
                                    ${updateMessage.includes('成功')
                                        ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                                        : updateMessage.includes('失败') || updateMessage.includes('出错')
                                            ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                                            : 'bg-muted/30 text-muted-foreground'}
                                `}>
                                    {updateMessage}
                                </div>
                            )}

                            {/* Changelog */}
                            {changelog && (
                                <div className="space-y-2">
                                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        更新日志
                                    </h3>
                                    <div className="bg-muted/20 rounded-lg p-4 max-h-64 overflow-y-auto engram-changelog-content text-sm">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {changelog}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}

                            {!changelog && !isLoading && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p className="text-sm">无法获取更新日志</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-border/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        关闭
                    </button>
                    {hasUpdate && (
                        <>
                            <button
                                onClick={handleMarkAsRead}
                                disabled={isMarking || isUpdating}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50"
                            >
                                稍后再说
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating || isMarking}
                                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        更新中...
                                    </>
                                ) : (
                                    <>
                                        <Download size={14} />
                                        立即更新
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateNotice;


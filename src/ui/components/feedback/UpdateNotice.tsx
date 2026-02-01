/**
 * UpdateNotice - 更新通知弹窗组件
 *
 * 显示最新版本信息和更新日志
 * V0.8.5: 添加一键更新功能
 * V0.9.12: 修复更新API路径问题，参考 JS-Slash-Runner 实现
 */

import { UpdateService } from '@/core/updater/Updater';
import { notificationService } from '@/ui/services/NotificationService';
import { CheckCircle, Download, Loader2, RefreshCw, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface UpdateNoticeProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Engram 扩展 ID（目录名）
 * 注意：这是目录名，不是 manifest.json 中的 display_name
 */
const EXTENSION_ID = 'Engram';

/**
 * 获取扩展信息 (name, type)
 * 通过调用酒馆的 discover API 获取，这是最可靠的方式
 * 支持识别: Engram, Engram_project, third-party/Engram 等
 */
async function getExtensionInfo(): Promise<{ name: string; type: 'global' | 'local' | 'system' } | null> {
    try {
        const response = await fetch('/api/extensions/discover');
        if (!response.ok) {
            console.warn('[Engram] 获取扩展列表失败:', response.status);
            return null;
        }
        const extensions: { name: string; type: string }[] = await response.json();

        // 查找匹配的扩展
        // 1. 精确匹配 ID
        // 2. 也是很常见的目录名 Engram_project
        // 3. 检查路径结尾 (如 third-party/Engram)
        const targetNames = ['Engram', 'Engram_project'];

        const found = extensions.find(ext => {
            // 检查是否包含关键字
            return targetNames.some(target =>
                ext.name === target ||
                ext.name.endsWith('/' + target) ||
                ext.name.endsWith('\\' + target) // Windows path safety
            );
        });

        if (found) {
            console.debug('[Engram] 找到扩展:', found.name, '类型:', found.type);
            return {
                name: found.name,
                type: found.type as 'global' | 'local' | 'system'
            };
        }

        console.warn('[Engram] 未找到扩展, 将尝试默认配置');
        return null;
    } catch (e) {
        console.warn('[Engram] 获取扩展类型失败', e);
        return null;
    }
}

/**
 * 获取酒馆请求头（用于认证）
 * 从 SillyTavern 上下文或全局变量获取
 */
function getTavernRequestHeaders(): Record<string, string> {
    try {
        // @ts-ignore - 酒馆全局函数
        if (typeof window.getRequestHeaders === 'function') {
            return (window as any).getRequestHeaders();
        }
        // 备用方案：从 SillyTavern context 获取
        // @ts-ignore
        const context = window.SillyTavern?.getContext?.();
        if (context?.getRequestHeaders) {
            return context.getRequestHeaders();
        }
    } catch (e) {
        console.warn('[Engram] 无法获取酒馆请求头', e);
    }
    // 返回最小必要头
    return {
        'Content-Type': 'application/json',
    };
}

/**
 * 调用酒馆扩展更新 API
 * V0.9.12: 动态判断扩展类型，正确设置 global 参数
 */
async function updateEngramExtension(): Promise<{ success: boolean; message: string; isUpToDate?: boolean }> {
    try {
        const headers = getTavernRequestHeaders();

        // 动态获取扩展信息
        const extInit = await getExtensionInfo();

        // 如果没找到，回退到默认
        const extensionName = extInit?.name || EXTENSION_ID;
        const isGlobal = extInit?.type === 'global' || extInit?.type === 'system'; // System usually treated as global for pathing? Or maybe just rely on default.
        // 其实 system extension 一般不可更新，但这里做个保险

        console.debug('[Engram] 准备更新扩展:', extensionName, '| global:', isGlobal);

        const response = await fetch('/api/extensions/update', {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                extensionName: extensionName,
                global: isGlobal,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('[Engram] 更新失败:', response.status, text);
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
                // V0.9.10: 弹 toastr 通知
                notificationService.success('更新成功！页面即将刷新', 'Engram 更新');
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
                // V0.9.10: 弹 toastr 通知
                notificationService.error(`更新失败: ${result.message}`, 'Engram 更新');
            }
        } catch (error) {
            setUpdateMessage(`更新出错: ${String(error)}`);
            notificationService.error(`更新出错: ${String(error)}`, 'Engram 更新');
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

                {/* Footer - 更新按钮始终可见 */}
                <div className="px-5 py-4 border-t border-border/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        关闭
                    </button>
                    {/* 仅在有更新时显示"稍后再说" */}
                    {hasUpdate && (
                        <button
                            onClick={handleMarkAsRead}
                            disabled={isMarking || isUpdating}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50"
                        >
                            稍后再说
                        </button>
                    )}
                    {/* 更新按钮始终可见 */}
                    <button
                        onClick={handleUpdate}
                        disabled={isUpdating || isMarking}
                        className={`px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 ${hasUpdate
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                            }`}
                    >
                        {isUpdating ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                更新中...
                            </>
                        ) : hasUpdate ? (
                            <>
                                <Download size={14} />
                                立即更新
                            </>
                        ) : (
                            <>
                                <RefreshCw size={14} />
                                重新拉取
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};



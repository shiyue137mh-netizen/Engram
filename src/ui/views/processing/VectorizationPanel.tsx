/**
 * VectorizationPanel - 向量化面板组件
 *
 * 应用「无框流体」设计语言
 * 功能：
 * - 显示嵌入统计
 * - 批量嵌入控制
 * - 进度显示
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
    Database,
    Play,
    Square,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Cpu,
    Hash,
    Zap
} from 'lucide-react';
import { embeddingService } from '@/modules/rag';
import type { VectorConfig, EmbeddingConfig } from '@/config/types/rag';
import { DEFAULT_EMBEDDING_CONFIG } from '@/config/types/defaults';
import { SettingsManager } from '@/config/settings';
import { NumberField, SwitchField, SelectField } from '../api-presets/components/FormField';
import { Divider } from '@/ui/components/layout/Divider';

// ==================== 类型 ====================

interface EmbeddingStats {
    total: number;
    embedded: number;
    pending: number;
}

interface EmbeddingProgress {
    current: number;
    total: number;
    errors: number;
}

// ==================== 组件 ====================

export const VectorizationPanel: React.FC = () => {
    // 状态
    const [stats, setStats] = useState<EmbeddingStats>({ total: 0, embedded: 0, pending: 0 });
    const [progress, setProgress] = useState<EmbeddingProgress | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastResult, setLastResult] = useState<{ success: number; failed: number } | null>(null);

    // 配置
    const [config, setConfig] = useState<EmbeddingConfig>({ ...DEFAULT_EMBEDDING_CONFIG });
    const [vectorConfig, setVectorConfig] = useState<VectorConfig | null>(null);

    // 加载初始数据
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            // 加载向量配置
            const settings = SettingsManager.get('apiSettings');
            if (settings?.vectorConfig) {
                setVectorConfig(settings.vectorConfig);
                embeddingService.setConfig(settings.vectorConfig);
            }

            // 加载嵌入配置
            if (settings?.embeddingConfig) {
                setConfig({ ...DEFAULT_EMBEDDING_CONFIG, ...settings.embeddingConfig });
            }

            // 获取统计
            const newStats = await embeddingService.getEmbeddingStats();
            setStats(newStats);
        } catch (e: any) {
            setError(e.message || '加载失败');
        } finally {
            setLoading(false);
        }
    };

    // 刷新统计
    const refreshStats = useCallback(async () => {
        const newStats = await embeddingService.getEmbeddingStats();
        setStats(newStats);
    }, []);

    // 开始嵌入
    const handleStartEmbedding = async () => {
        if (!vectorConfig) {
            setError('请先配置向量化服务');
            return;
        }

        setIsProcessing(true);
        setProgress({ current: 0, total: stats.pending, errors: 0 });
        setError(null);
        setLastResult(null);

        try {
            embeddingService.setConfig(vectorConfig);
            embeddingService.setConcurrency(config.concurrency);

            const result = await embeddingService.embedUnprocessedEvents((current, total, errors) => {
                setProgress({ current, total, errors });
            });

            setLastResult(result);
            await refreshStats();
        } catch (e: any) {
            setError(e.message || '嵌入失败');
        } finally {
            setIsProcessing(false);
            setProgress(null);
        }
    };

    // 停止嵌入
    const handleStopEmbedding = () => {
        embeddingService.stop();
    };

    // 重新嵌入所有
    const handleReembedAll = async () => {
        if (!vectorConfig) {
            setError('请先配置向量化服务');
            return;
        }

        if (!confirm('确定要重新嵌入所有事件吗？这将清除现有嵌入并重新生成。')) {
            return;
        }

        setIsProcessing(true);
        setProgress({ current: 0, total: stats.total, errors: 0 });
        setError(null);
        setLastResult(null);

        try {
            embeddingService.setConfig(vectorConfig);
            embeddingService.setConcurrency(config.concurrency);

            const result = await embeddingService.reembedAllEvents((current, total, errors) => {
                setProgress({ current, total, errors });
            });

            setLastResult(result);
            await refreshStats();
        } catch (e: any) {
            setError(e.message || '重新嵌入失败');
        } finally {
            setIsProcessing(false);
            setProgress(null);
        }
    };

    // 更新配置
    const updateConfig = (updates: Partial<EmbeddingConfig>) => {
        const newConfig = { ...config, ...updates };
        setConfig(newConfig);

        // 保存到 settings
        const settings = SettingsManager.get('apiSettings');
        if (settings) {
            SettingsManager.set('apiSettings', {
                ...settings,
                embeddingConfig: newConfig,
            });
        }
    };

    // 计算进度百分比
    const progressPercent = progress
        ? progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0
        : 0;

    // 检查向量配置是否有效
    const isVectorConfigValid = vectorConfig && (
        vectorConfig.source === 'transformers' ||
        vectorConfig.model
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-48 text-muted-foreground gap-2">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm font-light">加载中...</span>
            </div>
        );
    }

    return (
        <div className="py-4">
            {/* 统计信息 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">总事件</span>
                    <span className="text-2xl font-light">{stats.total}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">已嵌入</span>
                    <span className="text-2xl font-light text-primary">{stats.embedded}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">待处理</span>
                    <span className="text-2xl font-light text-warning">{stats.pending}</span>
                </div>
            </div>

            {/* 进度条 */}
            {progress && (
                <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                            嵌入进度 {progress.current}/{progress.total}
                        </span>
                        <span className="text-sm font-medium">{progressPercent}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    {progress.errors > 0 && (
                        <p className="text-xs text-destructive mt-2">
                            {progress.errors} 个错误
                        </p>
                    )}
                </div>
            )}

            {/* 结果提示 */}
            {lastResult && (
                <div className={`mb-6 p-3 rounded-lg flex items-center gap-2 ${lastResult.failed > 0 ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                    }`}>
                    {lastResult.failed > 0 ? (
                        <AlertCircle size={16} />
                    ) : (
                        <CheckCircle2 size={16} />
                    )}
                    <span className="text-sm">
                        完成：{lastResult.success} 成功
                        {lastResult.failed > 0 && `，${lastResult.failed} 失败`}
                    </span>
                </div>
            )}

            {/* 错误提示 */}
            {error && (
                <div className="mb-6 p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* 向量配置状态 */}
            {!isVectorConfigValid && (
                <div className="mb-6 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        请在
                        <span className="text-primary mx-1">API 配置 → 模型配置 → 向量化</span>
                        中设置向量化服务
                    </p>
                </div>
            )}

            {/* 操作按钮 */}
            <div className="flex flex-wrap gap-3 mb-6">
                {isProcessing ? (
                    <button
                        onClick={handleStopEmbedding}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                    >
                        <Square size={16} />
                        停止
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleStartEmbedding}
                            disabled={stats.pending === 0 || !isVectorConfigValid}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Play size={16} />
                            嵌入未处理 ({stats.pending})
                        </button>
                        <button
                            onClick={handleReembedAll}
                            disabled={stats.total === 0 || !isVectorConfigValid}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw size={16} />
                            重新嵌入所有
                        </button>
                        <button
                            onClick={refreshStats}
                            className="inline-flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </>
                )}
            </div>

            <Divider className="my-6" />

            {/* 配置区域 */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">嵌入设置</h3>

                <SwitchField
                    label="启用自动嵌入"
                    checked={config.enabled}
                    onChange={(checked) => updateConfig({ enabled: checked })}
                    description="触发条件满足时自动嵌入"
                />

                <SelectField
                    label="触发模式"
                    value={config.trigger}
                    onChange={(value) => updateConfig({ trigger: value as EmbeddingConfig['trigger'] })}
                    options={[
                        { value: 'with_trim', label: '与 Trim 联动' },
                        { value: 'standalone', label: '独立触发' },
                        { value: 'manual', label: '仅手动' },
                    ]}
                    description="with_trim: Trim 时自动嵌入 | standalone: 使用相同阈值独立触发"
                />

                <NumberField
                    label="并发数"
                    value={config.concurrency}
                    onChange={(value) => updateConfig({ concurrency: Math.max(1, Math.min(20, value)) })}
                    min={1}
                    max={20}
                    description="同时处理的嵌入请求数 (1-20)"
                />

                {vectorConfig && (
                    <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">当前向量配置</p>
                        <p className="text-sm">
                            <span className="text-primary">{vectorConfig.source}</span>
                            {vectorConfig.model && (
                                <span className="text-muted-foreground ml-2">/ {vectorConfig.model}</span>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VectorizationPanel;

/**
 * SummaryPanel - 总结面板组件
 * 
 * 合并「总结管理」和「精简配置」功能
 * 应用「无框流体」设计语言：
 * - PC端使用水平双栏布局
 * - 状态项按重要性区分字体大小
 * - 去卡片化，使用细线分割
 */
import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, CheckCircle2, AlertCircle, Scissors, Calculator, Layers, Hash } from 'lucide-react';
import type { TrimConfig, TrimTriggerType } from '../../core/api/types';
import { DEFAULT_TRIM_CONFIG } from '../../core/api/types';
import { SettingsManager } from '../../infrastructure/SettingsManager';
import { NumberField, SwitchField } from '../APIPresets/components/FormField';

interface SummarizerStatus {
    running: boolean;
    currentFloor: number;
    lastSummarizedFloor: number;
    pendingFloors: number;
    historyCount: number;
    isSummarizing: boolean;
}

interface SummarizerSettings {
    autoEnabled: boolean;
    autoEnabled: boolean;
    floorInterval: number;
    bufferSize: number;
    autoHide: boolean;
}

const TRIGGER_OPTIONS: { id: TrimTriggerType; label: string; icon: React.ElementType }[] = [
    { id: 'token', label: 'Token 数', icon: Calculator },
    { id: 'floor', label: '楼层数', icon: Layers },
    { id: 'count', label: '总结次数', icon: Hash },
];

export const SummaryPanel: React.FC = () => {
    const [status, setStatus] = useState<SummarizerStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<SummarizerSettings>({
        autoEnabled: true,
        floorInterval: 10,
        bufferSize: 3,
        autoHide: false,
    });
    const [trimConfig, setTrimConfig] = useState<TrimConfig>({ ...DEFAULT_TRIM_CONFIG });
    const [worldbookTokens, setWorldbookTokens] = useState<number>(0);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const { summarizerService } = await import('../../core/summarizer');
            // 获取当前状态
            let currentStatus = summarizerService.getStatus();
            // 如果 lastSummarizedFloor 为 0，可能需要从世界书初始化
            if (currentStatus.lastSummarizedFloor === 0) {
                await summarizerService.initializeForCurrentChat();
                currentStatus = summarizerService.getStatus();
            }
            setStatus(currentStatus);
            const config = summarizerService.getConfig();
            setSettings({
                autoEnabled: config.enabled,
                floorInterval: config.floorInterval,
                bufferSize: config.bufferSize || 3,
                autoHide: config.autoHide || false
            });

            // 加载保存的 trimConfig
            const savedTrimConfig = SettingsManager.getSummarizerSettings()?.trimConfig;
            if (savedTrimConfig) {
                setTrimConfig({ ...DEFAULT_TRIM_CONFIG, ...savedTrimConfig });
            }

            const { WorldInfoService } = await import('../../infrastructure/tavern/WorldInfoService');
            // 只查询已存在的世界书，不创建（避免面板打开时过早创建）
            const worldbookName = WorldInfoService.findExistingWorldbook();
            if (worldbookName) {
                const tokens = await WorldInfoService.countSummaryTokens(worldbookName);
                setWorldbookTokens(tokens);
            } else {
                setWorldbookTokens(0);
            }
        } catch (e) {
            console.error('加载 Summarizer 状态失败:', e);
        }
    };

    const handleStart = async () => {
        try {
            const { summarizerService } = await import('../../core/summarizer');
            summarizerService.start();
            await loadStatus();
        } catch (e) {
            console.error('启动失败:', e);
        }
    };

    const handleStop = async () => {
        try {
            const { summarizerService } = await import('../../core/summarizer');
            summarizerService.stop();
            await loadStatus();
        } catch (e) {
            console.error('停止失败:', e);
        }
    };

    const handleTrigger = async () => {
        setLoading(true);
        try {
            const { summarizerService } = await import('../../core/summarizer');
            await summarizerService.triggerSummary(true);
            await loadStatus();
        } catch (e) {
            console.error('触发失败:', e);
        } finally {
            setLoading(false);
        }
    };

    // 重置进度功能
    const handleReset = async () => {
        if (!confirm('确定要重置总结进度吗？这会导致扫描所有历史消息。')) return;
        setLoading(true);
        try {
            const { summarizerService } = await import('../../core/summarizer');
            // 这是一个 hack，通过设置 lastSummarizedFloor 为 0 来重置
            // 理想情况下应该在 service 中暴露 reset 方法
            await summarizerService.setLastSummarizedFloor(0);
            await loadStatus();
        } catch (e) {
            console.error('重置失败:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleTriggerChange = (trigger: TrimTriggerType) => {
        const newConfig = { ...trimConfig, trigger };
        setTrimConfig(newConfig);
        saveTrimConfig(newConfig);
    };

    const handleLimitChange = (key: 'tokenLimit' | 'floorLimit' | 'countLimit', value: number) => {
        const newConfig = { ...trimConfig, [key]: value };
        setTrimConfig(newConfig);
        saveTrimConfig(newConfig);
    };

    // 保存 trimConfig 到 SettingsManager
    const saveTrimConfig = (config: TrimConfig) => {
        SettingsManager.setSummarizerSettings({ trimConfig: config });
    };

    // enabled 开关切换
    const handleTrimEnabledChange = () => {
        const newConfig = { ...trimConfig, enabled: !trimConfig.enabled };
        setTrimConfig(newConfig);
        saveTrimConfig(newConfig);
    };

    // 获取当前阈值配置
    const getCurrentLimit = () => {
        switch (trimConfig.trigger) {
            case 'token': return { value: trimConfig.tokenLimit, min: 1024, max: 16384, step: 512, label: 'Token 上限' };
            case 'floor': return { value: trimConfig.floorLimit, min: 10, max: 200, step: 10, label: '楼层上限' };
            case 'count': return { value: trimConfig.countLimit, min: 2, max: 20, step: 1, label: '次数上限' };
        }
    };

    const limitConfig = getCurrentLimit();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ========== 左栏：总结管理 ========== */}
            <section className="space-y-8">
                {/* 状态监控 - 按重要性分层 */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">状态监控</h2>
                        <button
                            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                            onClick={loadStatus}
                            title="刷新"
                        >
                            <RefreshCw size={14} />
                        </button>
                    </div>

                    {status ? (
                        <div className="space-y-6">
                            {/* 第一层级：最重要 - 运行状态 + 待处理 */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">运行状态</span>
                                    <div className={`flex items-center gap-2 text-lg font-medium ${status.running ? 'text-green-500' : 'text-muted-foreground'}`}>
                                        {status.running ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                        {status.running ? '运行中' : '已停止'}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">待处理</span>
                                    <div className="text-3xl font-light text-amber-500 font-mono">{status.pendingFloors}</div>
                                </div>
                            </div>

                            {/* 第二层级：次要 - 当前楼层 + 总结次数 */}
                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/30">
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">当前楼层</span>
                                    <div className="text-xl font-mono text-foreground/80">{status.currentFloor}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">总结次数</span>
                                    <div className="text-xl font-mono text-foreground/80">{status.historyCount}</div>
                                </div>
                            </div>

                            {/* 第三层级：信息 - 世界书 Token */}
                            <div className="pt-4 border-t border-border/30">
                                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1">已总结内容 Token (Engram)</span>
                                <div className="text-sm font-mono text-primary/80">{worldbookTokens.toLocaleString()}</div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">加载中...</p>
                    )}
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                    {status?.running ? (
                        <button
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                            onClick={handleStop}
                        >
                            <Pause size={14} />
                            停止监听
                        </button>
                    ) : (
                        <button
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            onClick={handleStart}
                        >
                            <Play size={14} />
                            启动监听
                        </button>
                    )}
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50"
                        onClick={handleTrigger}
                        disabled={loading || status?.isSummarizing}
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        {loading ? '处理中...' : '手动触发'}
                    </button>
                </div>

                {/* 总结设置 */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-sm text-foreground">自动总结</span>
                            <span className="text-xs text-muted-foreground ml-2">每 {settings.floorInterval} 楼</span>
                        </div>
                        <SwitchField
                            label=""
                            checked={settings.autoEnabled}
                            onChange={async (newVal) => {
                                setSettings(s => ({ ...s, autoEnabled: newVal }));
                                const { summarizerService } = await import('../../core/summarizer');
                                summarizerService.updateConfig({ enabled: newVal });
                            }}
                        />
                    </div>

                    {settings.autoEnabled && (
                        <div className="mt-4">
                            <NumberField
                                label="触发间隔 (楼层)"
                                value={settings.floorInterval}
                                onChange={async (val) => {
                                    setSettings(s => ({ ...s, floorInterval: val }));
                                    const { summarizerService } = await import('../../core/summarizer');
                                    summarizerService.updateConfig({ floorInterval: val });
                                }}
                                min={5}
                                max={100}
                                step={5}
                                showSlider={true}
                                suffix=" 楼"
                            />
                        </div>
                    )}

                    <div className="pt-4 border-t border-border/30 grid grid-cols-1 gap-4 text-xs">
                        <NumberField
                            label="缓冲楼层 (Buffer)"
                            value={settings.bufferSize}
                            onChange={(val) => {
                                setSettings(s => ({ ...s, bufferSize: val }));
                                import('../../core/summarizer').then(({ summarizerService }) => {
                                    summarizerService.updateConfig({ bufferSize: val });
                                });
                            }}
                            min={0}
                            max={20}
                            showSlider={false}
                            suffix=" 楼"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex flex-col">
                            <span className="text-sm">自动隐藏</span>
                            <span className="text-[10px] text-muted-foreground">处理完后隐藏原文</span>
                        </div>
                        <SwitchField
                            label=""
                            checked={settings.autoHide}
                            onChange={(newVal) => {
                                setSettings(s => ({ ...s, autoHide: newVal }));
                                import('../../core/summarizer').then(({ summarizerService }) => {
                                    summarizerService.updateConfig({ autoHide: newVal });
                                });
                            }}
                        />
                    </div>
                </div>

                {/* 底部重置按钮区 */}
                <div className="pt-4 border-t border-border/30 flex justify-end">
                    <button
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 border border-red-200 rounded transition-colors"
                        onClick={handleReset}
                        disabled={loading}
                        title="重置进度 (重新扫描历史)"
                    >
                        <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                        重置所有进度
                    </button>
                </div>
            </section>

            {/* ========== 右栏：精简配置 - 无框流体设计 ========== */}
            <section className="space-y-6 lg:border-l lg:border-border/30 lg:pl-8 relative">
                {/* 移动端分割线 (垂直布局时的水平线) */}
                <div className="lg:hidden w-full h-px bg-border/30 my-2" />
                {/* 桌面端分割线 (水平布局时的垂直线) - 使用绝对定位或边框 */}
                {/* 标题 + 开关 */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-foreground">精简配置</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">将多次总结压缩为更简洁的摘要</p>
                    </div>
                    <SwitchField
                        label=""
                        checked={trimConfig.enabled}
                        onChange={handleTrimEnabledChange}
                    />
                </div>

                <div className={`space-y-6 transition-opacity ${trimConfig.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                    {/* 触发条件 - 无框单选 */}
                    <div className="space-y-3">
                        <span className="text-xs text-muted-foreground">触发条件</span>
                        <div className="flex gap-6">
                            {TRIGGER_OPTIONS.map((opt) => (
                                <label
                                    key={opt.id}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${trimConfig.trigger === opt.id
                                            ? 'border-primary bg-primary'
                                            : 'border-border group-hover:border-muted-foreground'}`}
                                    >
                                        {trimConfig.trigger === opt.id && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                                        )}
                                    </span>
                                    <span className={`text-sm transition-colors ${trimConfig.trigger === opt.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {opt.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 阈值设置 - 使用极简 NumberField */}
                    <NumberField
                        label={limitConfig.label}
                        value={limitConfig.value}
                        onChange={(val) => {
                            const key = trimConfig.trigger === 'token' ? 'tokenLimit'
                                : trimConfig.trigger === 'floor' ? 'floorLimit' : 'countLimit';
                            handleLimitChange(key, val);
                        }}
                        min={limitConfig.min}
                        max={limitConfig.max}
                        step={limitConfig.step}
                        showSlider={true}
                    />

                    {/* 执行按钮 */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        onClick={() => console.log('手动触发精简...')}
                    >
                        <Scissors size={14} />
                        手动执行精简
                    </button>

                    {/* 说明 - 简化 */}
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">
                        精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。
                    </p>
                </div>
            </section>
        </div>
    );
};

export default SummaryPanel;

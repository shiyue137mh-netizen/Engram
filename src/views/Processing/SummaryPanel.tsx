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
import type { TrimTriggerType } from '@/services/api/types';
// import { TrimmerConfig, DEFAULT_TRIMMER_CONFIG } from '@/services/summarizer/TrimmerService'; // V0.7 Deprecated
import { DEFAULT_TRIM_CONFIG, type TrimConfig } from '@/services/pipeline/EventTrimmer';
import { SettingsManager } from "@/services/settings/Persistence";
import { NumberField, SwitchField } from '../APIPresets/components/FormField';
import { Divider } from "@/components/layout/Divider";
import type { TrimmerStatus } from "@/services/summarizer";

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
    floorInterval: number;
    bufferSize: number;
    autoHide: boolean;
}

const TRIGGER_OPTIONS: { id: TrimTriggerType; label: string; icon: React.ElementType }[] = [
    { id: 'token', label: 'Token 数', icon: Calculator },
    { id: 'count', label: '活跃事件数', icon: Hash },
];

export const SummaryPanel: React.FC = () => {
    const [status, setStatus] = useState<SummarizerStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [trimLoading, setTrimLoading] = useState(false);
    const [settings, setSettings] = useState<SummarizerSettings>({
        autoEnabled: true,
        floorInterval: 10,
        bufferSize: 3,
        autoHide: false,
    });
    const [trimConfig, setTrimConfig] = useState<TrimConfig>({ ...DEFAULT_TRIM_CONFIG, keepRecentCount: 3 });
    const [trimStatus, setTrimStatus] = useState<TrimmerStatus | null>(null);
    const [worldbookTokens, setWorldbookTokens] = useState<number>(0);
    const [activeEventCount, setActiveEventCount] = useState<number>(0);  // V0.7.1: 蓝灯数


    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const { summarizerService } = await import('@/services/summarizer');
            // V0.7.1: 始终刷新缓存，确保待处理数正确
            await summarizerService.initializeForCurrentChat();
            const currentStatus = summarizerService.getStatus();
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

            // 加载精简服务状态 (使用 EventTrimmer V0.7)
            const { eventTrimmer } = await import('@/services/pipeline/EventTrimmer');
            // 需要 cast 因为 V0.7 定义可能跟旧的有一点差异，但结构兼容
            const trimmerStatus = await eventTrimmer.getStatus() as any;
            setTrimStatus(trimmerStatus);

            // V0.7.1: 从 IndexedDB 读取事件统计
            const { useMemoryStore } = await import('@/stores/memoryStore');
            const store = useMemoryStore.getState();
            const { totalTokens, activeEventCount: activeCount } = await store.countEventTokens();
            setWorldbookTokens(totalTokens);
            setActiveEventCount(activeCount);  // 蓝灯数
        } catch (e) {
            console.error('加载 Summarizer 状态失败:', e);
        }
    };

    const handleStart = async () => {
        try {
            const { summarizerService } = await import('@/services/summarizer');
            summarizerService.start();
            await loadStatus();
        } catch (e) {
            console.error('启动失败:', e);
        }
    };

    const handleStop = async () => {
        try {
            const { summarizerService } = await import('@/services/summarizer');
            summarizerService.stop();
            await loadStatus();
        } catch (e) {
            console.error('停止失败:', e);
        }
    };

    const handleTrigger = async () => {
        setLoading(true);
        try {
            const { summarizerService } = await import('@/services/summarizer');
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
            const { summarizerService } = await import('@/services/summarizer');
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

    const handleLimitChange = (key: keyof TrimConfig, value: any) => {
        const newConfig = { ...trimConfig, [key]: value };
        setTrimConfig(newConfig);
        saveTrimConfig(newConfig);
    };

    // 保存 trimConfig 到 SettingsManager
    const saveTrimConfig = (config: TrimConfig) => {
        SettingsManager.setSummarizerSettings({ trimConfig: config });
    };

    // enabled 开关切换
    const handleTrimEnabledChange = async () => {
        const newConfig = { ...trimConfig, enabled: !trimConfig.enabled };
        setTrimConfig(newConfig);
        saveTrimConfig(newConfig);
        // 同步更新 EventTrimmer 配置
        const { eventTrimmer } = await import('@/services/pipeline/EventTrimmer');
        eventTrimmer.updateConfig({ enabled: newConfig.enabled });
    };

    // 手动触发精简
    const handleTriggerTrim = async () => {
        setTrimLoading(true);
        try {
            const { eventTrimmer } = await import('@/services/pipeline/EventTrimmer');
            await eventTrimmer.trim(true);
            await loadStatus();
        } catch (e) {
            console.error('精简失败:', e);
        } finally {
            setTrimLoading(false);
        }
    };

    // 获取当前阈值配置
    const getCurrentLimit = () => {
        switch (trimConfig.trigger) {
            case 'token': return { value: trimConfig.tokenLimit ?? 10240, min: 1024, max: 100000, step: 1024, label: 'Token 上限' };
            case 'count': return { value: trimConfig.countLimit ?? 5, min: 2, max: 20, step: 1, label: '次数上限' };
            default: return { value: 10240, min: 1024, max: 100000, step: 1024, label: 'Token 上限' };
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

                            {/* 分割线 */}
                            <Divider length={100} spacing="md" />

                            {/* 第二层级：次要 - 当前楼层 + 总结次数 */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">当前楼层</span>
                                    <div className="text-xl font-mono text-foreground/80">{status.currentFloor}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">活跃事件 (蓝灯)</span>
                                    <div className="text-xl font-mono text-foreground/80">{activeEventCount}</div>
                                </div>
                            </div>

                            {/* 分割线 */}
                            <Divider length={30} spacing="md" />

                            {/* 第三层级：信息 - 世界书 Token */}
                            <div>
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
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors hover:bg-accent"
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

                {/* 总结设置 - 重新布局：开关并开关，滑块并滑块 */}
                <div className="pt-6 space-y-6">
                    {/* 分割线 */}
                    <Divider length={100} />

                    {/* 开关区域：自动总结 + 自动隐藏 并列 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">自动总结</span>
                            <SwitchField
                                label=""
                                checked={settings.autoEnabled}
                                onChange={async (newVal) => {
                                    setSettings(s => ({ ...s, autoEnabled: newVal }));
                                    const { summarizerService } = await import('@/services/summarizer');
                                    summarizerService.updateConfig({ enabled: newVal });
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm text-foreground">自动隐藏</span>
                                <span className="text-[10px] text-muted-foreground">处理完后隐藏原文</span>
                            </div>
                            <SwitchField
                                label=""
                                checked={settings.autoHide}
                                onChange={(newVal) => {
                                    setSettings(s => ({ ...s, autoHide: newVal }));
                                    import('@/services/summarizer').then(({ summarizerService }) => {
                                        summarizerService.updateConfig({ autoHide: newVal });
                                    });
                                }}
                            />
                        </div>
                    </div>

                    {/* 滑块区域：触发间隔 + 缓冲楼层 并列 */}
                    {settings.autoEnabled && (
                        <>


                            <div className="grid grid-cols-2 gap-6">
                                {/* 触发间隔 - 指引式标签 */}
                                <div className="space-y-3">
                                    <div className="text-xs text-muted-foreground">
                                        楼层将每隔 <span className="text-base font-medium text-foreground mx-0.5">{settings.floorInterval}</span> 层总结
                                    </div>
                                    <div className="relative h-4 flex items-center group cursor-pointer">
                                        {/* 极简滑块轨道 */}
                                        <div className="absolute inset-x-0 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
                                        {/* Thumb */}
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground"
                                            style={{ left: `${((settings.floorInterval - 5) / (100 - 5)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                                        />
                                        <input
                                            type="range"
                                            min={5}
                                            max={100}
                                            step={5}
                                            value={settings.floorInterval}
                                            onChange={async (e) => {
                                                const val = Number(e.target.value);
                                                setSettings(s => ({ ...s, floorInterval: val }));
                                                const { summarizerService } = await import('@/services/summarizer');
                                                summarizerService.updateConfig({ floorInterval: val });
                                            }}
                                            className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                                            style={{ appearance: 'none', WebkitAppearance: 'none' }}
                                        />
                                    </div>
                                </div>

                                {/* 缓冲楼层 - 指引式标签 */}
                                <div className="space-y-3">
                                    <div className="text-xs text-muted-foreground">
                                        保留最近 <span className="text-base font-medium text-foreground mx-0.5">{settings.bufferSize}</span> 层作为缓冲
                                    </div>
                                    <div className="relative h-4 flex items-center group cursor-pointer">
                                        {/* 极简滑块轨道 */}
                                        <div className="absolute inset-x-0 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
                                        {/* Thumb */}
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground"
                                            style={{ left: `${(settings.bufferSize / 20) * 100}%`, transform: 'translate(-50%, -50%)' }}
                                        />
                                        <input
                                            type="range"
                                            min={0}
                                            max={20}
                                            step={1}
                                            value={settings.bufferSize}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                setSettings(s => ({ ...s, bufferSize: val }));
                                                import('@/services/summarizer').then(({ summarizerService }) => {
                                                    summarizerService.updateConfig({ bufferSize: val });
                                                });
                                            }}
                                            className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                                            style={{ appearance: 'none', WebkitAppearance: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* 底部重置按钮区 */}
                <div className="flex justify-end">
                    <button
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:text-red-400 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10 rounded transition-colors"
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
            <section className="space-y-6 lg:pl-8 relative">
                {/* 响应式分割线 - 30% 长度 */}
                <Divider responsive length={30} />
                {/* 标题 + 开关 */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-foreground">精简配置</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">将多次总结压缩为更简洁的摘要</p>
                    </div>
                    <SwitchField
                        label=""
                        checked={trimConfig.enabled ?? false}
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
                                    onClick={() => handleTriggerChange(opt.id)}
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

                    {/* 阈值设置 - 指引式标签 */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                            {limitConfig.label === 'Token 上限' ? (
                                <>当 Token 数超过 <span className="text-base font-medium text-foreground mx-0.5">{limitConfig.value}</span> 时触发</>
                            ) : (
                                <>当活跃事件超过 <span className="text-base font-medium text-foreground mx-0.5">{limitConfig.value}</span> 条时触发</>
                            )}
                        </div>
                        <div className="relative h-4 flex items-center group cursor-pointer">
                            {/* 极简滑块轨道 */}
                            <div className="absolute inset-x-0 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
                            {/* Thumb */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground"
                                style={{ left: `${((limitConfig.value - limitConfig.min) / (limitConfig.max - limitConfig.min)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                            />
                            <input
                                type="range"
                                min={limitConfig.min}
                                max={limitConfig.max}
                                step={limitConfig.step}
                                value={limitConfig.value}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    const key = trimConfig.trigger === 'token' ? 'tokenLimit' : 'countLimit';
                                    handleLimitChange(key, val);
                                }}
                                className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                                style={{ appearance: 'none', WebkitAppearance: 'none' }}
                            />
                        </div>
                    </div>

                    {/* 缓冲设置 - 指引式标签 */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                            保留最近 <span className="text-base font-medium text-foreground mx-0.5">{trimConfig.keepRecentCount ?? 3}</span> 条不合并
                        </div>
                        <div className="relative h-4 flex items-center group cursor-pointer">
                            {/* 极简滑块轨道 */}
                            <div className="absolute inset-x-0 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
                            {/* Thumb */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground"
                                style={{ left: `${((trimConfig.keepRecentCount ?? 3) / 10) * 100}%`, transform: 'translate(-50%, -50%)' }}
                            />
                            <input
                                type="range"
                                min={0}
                                max={10}
                                step={1}
                                value={trimConfig.keepRecentCount ?? 3}
                                onChange={(e) => handleLimitChange('keepRecentCount', Number(e.target.value))}
                                className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                                style={{ appearance: 'none', WebkitAppearance: 'none' }}
                            />
                        </div>
                    </div>

                    {/* 精简状态显示 */}
                    {trimStatus && (
                        <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between">
                                <span>待合并条目:</span>
                                <span className="font-mono">{trimStatus.pendingEntryCount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>当前{trimConfig.trigger === 'token' ? 'Token' : '条目数'}:</span>
                                <span className={`font-mono ${trimStatus.triggered ? 'text-amber-500' : ''}`}>
                                    {trimStatus.currentValue} / {limitConfig.value}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* 执行按钮 - 边框样式 */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
                        onClick={handleTriggerTrim}
                        disabled={trimLoading || (trimStatus?.pendingEntryCount ?? 0) < 2}
                    >
                        <Scissors size={14} className={trimLoading ? 'animate-pulse' : ''} />
                        {trimLoading ? '精简中...' : '手动执行精简'}
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

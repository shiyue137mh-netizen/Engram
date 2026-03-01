/**
 * SummaryPanel - 总结面板组件
 *
 * 合并「总结管理」和「精简配置」功能
 * 应用「无框流体」设计语言：
 * - PC端使用水平双栏布局
 * - 状态项按重要性区分字体大小
 * - 去卡片化，使用细线分割
 */
import type { TrimTriggerType } from '@/config/types/memory';
import { AlertCircle, Calculator, CheckCircle2, Hash, Pause, Play, RefreshCw, Scissors } from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import { TrimmerConfig, DEFAULT_TRIMMER_CONFIG } from '@/services/summarizer/TrimmerService'; // V0.7 Deprecated
import { type TrimConfig } from '@/modules/memory/EventTrimmer';

import type { TrimmerStatus } from "@/modules/memory";
import { SliderField } from '@/ui/components/core/SliderField';
import { SwitchField } from '@/ui/components/form/FormComponents';
import { Divider } from "@/ui/components/layout/Divider";
import type { UseSummarizerConfigReturn } from '@/ui/hooks/useSummarizerConfig';

interface SummarizerStatus {
    running: boolean;
    currentFloor: number;
    lastSummarizedFloor: number;
    pendingFloors: number;
    historyCount: number;
    isSummarizing: boolean;
}

// Reuse the interface from the hook
type SummarizerSettings = UseSummarizerConfigReturn['summarizerSettings'];

interface SummaryPanelProps {
    summarizerSettings: SummarizerSettings;
    trimConfig: TrimConfig;
    onSummarizerSettingsChange: (settings: SummarizerSettings) => void;
    onTrimConfigChange: (config: TrimConfig) => void;
}

const TRIGGER_OPTIONS: { id: TrimTriggerType; label: string; icon: React.ElementType }[] = [
    { id: 'token', label: 'Token 数', icon: Calculator },
    { id: 'count', label: '活跃事件数', icon: Hash },
];

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
    summarizerSettings: settings,
    trimConfig,
    onSummarizerSettingsChange,
    onTrimConfigChange
}) => {
    const [status, setStatus] = useState<SummarizerStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [trimLoading, setTrimLoading] = useState(false);
    // Remove local state settings and trimConfig, use props instead
    const [trimStatus, setTrimStatus] = useState<TrimmerStatus | null>(null);
    const [worldbookTokens, setWorldbookTokens] = useState<number>(0);
    const [activeEventCount, setActiveEventCount] = useState<number>(0);  // V0.7.1: 蓝灯数
    const [extractedFloor, setExtractedFloor] = useState<number>(0);
    const [editSummarizedFloor, setEditSummarizedFloor] = useState<number>(0);
    const [editExtractedFloor, setEditExtractedFloor] = useState<number>(0);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const { summarizerService } = await import('@/modules/memory');
            // V0.7.1: 始终刷新缓存，确保待处理数正确
            await summarizerService.initializeForCurrentChat();
            const currentStatus = summarizerService.getStatus();
            setStatus(currentStatus);
            // Config loading removed as it comes from props

            // 加载精简服务状态 (使用 EventTrimmer V0.7)
            const { eventTrimmer } = await import('@/modules/memory/EventTrimmer');
            // 需要 cast 因为 V0.7 定义可能跟旧的有一点差异，但结构兼容
            const trimmerStatus = await eventTrimmer.getStatus() as any;
            setTrimStatus(trimmerStatus);

            // V0.7.1: 从 IndexedDB 读取事件统计
            const { useMemoryStore } = await import('@/state/memoryStore');
            const store = useMemoryStore.getState();
            const { totalTokens, activeEventCount: activeCount } = await store.countEventTokens();
            setWorldbookTokens(totalTokens);
            setActiveEventCount(activeCount);  // 蓝灯数

            const { entityBuilder } = await import('@/modules/memory/EntityExtractor');
            const entityStatus = await entityBuilder.getStatus();
            setExtractedFloor(entityStatus.lastExtractedFloor || 0);

            // Sync edit buffers
            setEditSummarizedFloor(currentStatus.lastSummarizedFloor);
            setEditExtractedFloor(entityStatus.lastExtractedFloor || 0);

        } catch (e) {
            console.error('加载 Summarizer 状态失败:', e);
        }
    };

    const handleSetSummarizedFloor = async () => {
        try {
            const { summarizerService } = await import('@/modules/memory');
            await summarizerService.setLastSummarizedFloor(editSummarizedFloor);
            await loadStatus();
            import('@/ui/services/NotificationService').then(({ notificationService }) => {
                notificationService.success(`总结指针已更新至 ${editSummarizedFloor}`, 'Engram');
            });
        } catch (e) {
            console.error('修改总结指针失败:', e);
        }
    };

    const handleSetExtractedFloor = async () => {
        try {
            const { chatManager } = await import('@/data/ChatManager');
            await chatManager.updateState({ last_extracted_floor: editExtractedFloor });
            await loadStatus();
            import('@/ui/services/NotificationService').then(({ notificationService }) => {
                notificationService.success(`提取指针已更新至 ${editExtractedFloor}`, 'Engram');
            });
        } catch (e) {
            console.error('修改提取指针失败:', e);
        }
    };

    const handleStart = async () => {
        try {
            const { summarizerService } = await import('@/modules/memory');
            summarizerService.start();
            await loadStatus();
        } catch (e) {
            console.error('启动失败:', e);
        }
    };

    const handleStop = async () => {
        try {
            const { summarizerService } = await import('@/modules/memory');
            summarizerService.stop();
            await loadStatus();
        } catch (e) {
            console.error('停止失败:', e);
        }
    };

    const handleTrigger = async () => {
        setLoading(true);
        try {
            const { summarizerService } = await import('@/modules/memory');
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
            const { summarizerService } = await import('@/modules/memory');
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
        onTrimConfigChange(newConfig);
    };

    const handleLimitChange = (key: keyof TrimConfig, value: any) => {
        const newConfig = { ...trimConfig, [key]: value };
        onTrimConfigChange(newConfig);
    };

    // enabled 开关切换
    const handleTrimEnabledChange = async () => {
        const newConfig = { ...trimConfig, enabled: !trimConfig.enabled };
        onTrimConfigChange(newConfig);
        // Runtime update if needed, typically handled by save action or service sync
        const { eventTrimmer } = await import('@/modules/memory/EventTrimmer');
        eventTrimmer.updateConfig({ enabled: newConfig.enabled });
    };

    // 手动触发精简
    const handleTriggerTrim = async () => {
        setTrimLoading(true);
        try {
            const { eventTrimmer } = await import('@/modules/memory/EventTrimmer');
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

                            {/* 第三层级：指针管理 */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">总结指针 (已处理)</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={editSummarizedFloor}
                                            onChange={(e) => setEditSummarizedFloor(Number(e.target.value))}
                                            className="w-16 bg-transparent border-b border-border/50 focus:border-primary outline-none transition-colors text-xl font-mono text-foreground/80 pb-0.5"
                                        />
                                        <button
                                            onClick={handleSetSummarizedFloor}
                                            disabled={status.lastSummarizedFloor === editSummarizedFloor}
                                            className="text-[10px] px-2 py-1 rounded bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                                        >
                                            设置
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">提取指针 (已处理)</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={editExtractedFloor}
                                            onChange={(e) => setEditExtractedFloor(Number(e.target.value))}
                                            className="w-16 bg-transparent border-b border-border/50 focus:border-primary outline-none transition-colors text-xl font-mono text-foreground/80 pb-0.5"
                                        />
                                        <button
                                            onClick={handleSetExtractedFloor}
                                            disabled={extractedFloor === editExtractedFloor}
                                            className="text-[10px] px-2 py-1 rounded bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                                        >
                                            设置
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 分割线 */}
                            <Divider length={30} spacing="md" />

                            {/* 第四层级：信息 - 世界书 Token */}
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
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-foreground/30 transition-colors"
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
                                    onSummarizerSettingsChange({ ...settings, autoEnabled: newVal });
                                    const { summarizerService } = await import('@/modules/memory');
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
                                    onSummarizerSettingsChange({ ...settings, autoHide: newVal });
                                    import('@/modules/memory').then(({ summarizerService }) => {
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
                                    <SliderField
                                        min={5}
                                        max={100}
                                        step={5}
                                        value={settings.floorInterval}
                                        onChange={async (val) => {
                                            onSummarizerSettingsChange({ ...settings, floorInterval: val });
                                            const { summarizerService } = await import('@/modules/memory');
                                            summarizerService.updateConfig({ floorInterval: val });
                                        }}
                                    />
                                </div>

                                {/* 缓冲楼层 - 指引式标签 */}
                                <div className="space-y-3">
                                    <div className="text-xs text-muted-foreground">
                                        保留最近 <span className="text-base font-medium text-foreground mx-0.5">{settings.bufferSize}</span> 层作为缓冲
                                    </div>
                                    <SliderField
                                        min={0}
                                        max={20}
                                        step={1}
                                        value={settings.bufferSize}
                                        onChange={(val) => {
                                            onSummarizerSettingsChange({ ...settings, bufferSize: val });
                                            import('@/modules/memory').then(({ summarizerService }) => {
                                                summarizerService.updateConfig({ bufferSize: val });
                                            });
                                        }}
                                    />
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
                        <SliderField
                            min={limitConfig.min}
                            max={limitConfig.max}
                            step={limitConfig.step}
                            value={limitConfig.value}
                            onChange={(val) => {
                                const key = trimConfig.trigger === 'token' ? 'tokenLimit' : 'countLimit';
                                handleLimitChange(key, val);
                            }}
                        />
                    </div>

                    {/* 缓冲设置 - 指引式标签 */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                            保留最近 <span className="text-base font-medium text-foreground mx-0.5">{trimConfig.keepRecentCount ?? 3}</span> 条不合并
                        </div>
                        <SliderField
                            min={0}
                            max={10}
                            step={1}
                            value={trimConfig.keepRecentCount ?? 3}
                            onChange={(val) => handleLimitChange('keepRecentCount', val)}
                        />
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
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-foreground/30 transition-colors disabled:opacity-50"
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


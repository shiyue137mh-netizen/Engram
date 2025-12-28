/**
 * Processing - 处理中心视图
 * 包含：总结剧情、向量化、批量处理
 */
import React, { useState, useEffect } from 'react';
import { Cpu, Play, Pause, RefreshCw, CheckCircle2, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { TrimConfigForm } from './TrimConfigForm';
import type { TrimConfig } from '../../core/api/types';
import { DEFAULT_TRIM_CONFIG } from '../../core/api/types';

type ProcessingTab = 'summarize' | 'vectorize' | 'batch';

const TABS: { id: ProcessingTab; label: string; description: string }[] = [
    { id: 'summarize', label: '总结剧情', description: '将对话内容提炼为剧情摘要' },
    { id: 'vectorize', label: '向量化', description: '将内容转换为向量存储' },
    { id: 'batch', label: '批量处理', description: '批量执行记忆操作' },
];

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
}

interface ProcessingViewProps {
    onNavigate?: (path: string) => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<ProcessingTab>('summarize');
    const [status, setStatus] = useState<SummarizerStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<SummarizerSettings>({
        autoEnabled: true,
        floorInterval: 10,
    });
    const [trimConfig, setTrimConfig] = useState<TrimConfig>({ ...DEFAULT_TRIM_CONFIG });
    const [worldbookTokens, setWorldbookTokens] = useState<number>(0);

    // 加载 Summarizer 状态
    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const { summarizerService } = await import('../../core/summarizer');
            setStatus(summarizerService.getStatus());

            // 获取世界书 token 数
            const { WorldInfoService } = await import('../../infrastructure/tavern/WorldInfoService');
            const content = await WorldInfoService.getActivatedWorldInfo();
            if (content) {
                const tokens = await WorldInfoService.countTokens(content);
                setWorldbookTokens(tokens);
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

    return (
        <div className="flex flex-col gap-4 p-4 h-full overflow-hidden">
            {/* 页面头部 + 快捷跳转 */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <Cpu size={24} className="text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground m-0">处理中心</h2>
                </div>
                {/* 快捷跳转 */}
                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => onNavigate?.('/dev')}
                    >
                        <ExternalLink size={14} />
                        模型日志
                    </button>
                    <button
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => onNavigate?.('/api')}
                    >
                        <FileText size={14} />
                        提示词模板
                    </button>
                </div>
            </div>

            {/* 标签导航 */}
            <div className="flex gap-2 flex-wrap">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium transition-all
                            ${activeTab === tab.id
                                ? 'bg-primary-20 text-primary border-primary-30'
                                : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground hover:border-border'
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto">
                {/* ========== 总结剧情 Tab ========== */}
                {activeTab === 'summarize' && (
                    <div className="flex flex-col gap-4">
                        {/* 状态统计卡片 */}
                        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-foreground m-0">状态统计</h3>
                                <button
                                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={loadStatus}
                                    title="刷新状态"
                                >
                                    <RefreshCw size={14} />
                                </button>
                            </div>

                            {status ? (
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    <div className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">运行状态</span>
                                        <span className={`flex items-center gap-1.5 text-sm font-medium ${status.running ? 'text-green-500' : 'text-muted-foreground'}`}>
                                            {status.running ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                            {status.running ? '运行中' : '已停止'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">当前楼层</span>
                                        <span className="text-foreground font-mono text-sm font-medium">{status.currentFloor}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">待处理</span>
                                        <span className="text-amber-500 font-mono text-sm font-medium">{status.pendingFloors}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">总结次数</span>
                                        <span className="text-foreground font-mono text-sm font-medium">{status.historyCount}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">世界书 Token</span>
                                        <span className="text-primary font-mono text-sm font-medium">{worldbookTokens.toLocaleString()}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">加载中...</p>
                            )}
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex gap-2">
                            {status?.running ? (
                                <button
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border
                                        bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 active:scale-95"
                                    onClick={handleStop}
                                >
                                    <Pause size={16} />
                                    停止监听
                                </button>
                            ) : (
                                <button
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border
                                        bg-primary text-primary-foreground border-primary hover:bg-primary-90 active:scale-95"
                                    onClick={handleStart}
                                >
                                    <Play size={16} />
                                    启动监听
                                </button>
                            )}
                            <button
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border
                                    bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 active:scale-95
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                                onClick={handleTrigger}
                                disabled={loading || status?.isSummarizing}
                            >
                                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                                {loading ? '处理中...' : '手动触发'}
                            </button>
                        </div>

                        {/* 总结设置 */}
                        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                            <h3 className="text-sm font-medium text-foreground mb-4">总结设置</h3>

                            <div className="space-y-6">
                                {/* 自动总结开关 */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-foreground">自动总结</div>
                                        <div className="text-xs text-muted-foreground">达到楼层阈值时自动触发</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSettings(s => ({ ...s, autoEnabled: !s.autoEnabled }))}
                                        className={`relative w-9 h-5 rounded-full transition-colors ${settings.autoEnabled ? 'bg-primary' : 'bg-input'
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.autoEnabled ? 'translate-x-4' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* 楼层间隔滑块 */}
                                <div className={settings.autoEnabled ? '' : 'opacity-50 grayscale pointer-events-none'}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-muted-foreground">楼层间隔</span>
                                        <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">{settings.floorInterval}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={settings.floorInterval}
                                        onChange={(e) => setSettings(s => ({ ...s, floorInterval: Number(e.target.value) }))}
                                        disabled={!settings.autoEnabled}
                                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/90"
                                    />
                                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
                                        <span>1</span>
                                        <span>25</span>
                                        <span>50</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 精简配置 - 直接显示 */}
                        {/* 精简配置 - 直接显示 */}
                        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                            <TrimConfigForm
                                config={trimConfig}
                                onChange={setTrimConfig}
                            />
                        </div>
                    </div>
                )}

                {/* ========== 向量化 Tab ========== */}
                {activeTab === 'vectorize' && (
                    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                        <p className="text-muted-foreground">🚧 向量化功能开发中...</p>
                    </div>
                )}

                {/* ========== 批量处理 Tab ========== */}
                {activeTab === 'batch' && (
                    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                        <p className="text-muted-foreground">🚧 批量处理功能开发中...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessingView;

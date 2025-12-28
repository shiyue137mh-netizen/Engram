/**
 * Processing - 处理中心视图
 * 
 * 应用「无框流体」设计语言：
 * - 减少卡片边框，用细线分割区域
 * - 使用空间和字重体现层级
 */
import React, { useState, useEffect } from 'react';
import { Cpu, Play, Pause, RefreshCw, CheckCircle2, AlertCircle, FileText, ExternalLink, BookOpen, Layers, Boxes, Database } from 'lucide-react';
import { TrimConfigForm } from './TrimConfigForm';
import type { TrimConfig } from '../../core/api/types';
import { DEFAULT_TRIM_CONFIG } from '../../core/api/types';
import { TabPills, Tab } from '../components/TabPills';

type ProcessingTab = 'summarization' | 'vectorization' | 'batch';

const TABS: Tab[] = [
    { id: 'summarization', label: '记忆摘要', icon: <FileText size={16} /> },
    { id: 'vectorization', label: '向量化', icon: <Database size={16} /> },
    { id: 'batch', label: '批量处理', icon: <Layers size={16} /> },
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
    const [activeTab, setActiveTab] = useState<ProcessingTab>('summarization');
    const [status, setStatus] = useState<SummarizerStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<SummarizerSettings>({
        autoEnabled: true,
        floorInterval: 10,
    });
    const [trimConfig, setTrimConfig] = useState<TrimConfig>({ ...DEFAULT_TRIM_CONFIG });
    const [worldbookTokens, setWorldbookTokens] = useState<number>(0);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const { summarizerService } = await import('../../core/summarizer');
            setStatus(summarizerService.getStatus());

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
        <div className="flex flex-col h-full">
            {/* 页面标题 */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Cpu size={20} className="text-muted-foreground" />
                    <h1 className="text-xl font-light text-foreground tracking-tight">处理中心</h1>
                </div>
                {/* 快捷跳转 */}
                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => onNavigate?.('devlog')}
                    >
                        <ExternalLink size={12} />
                        模型日志
                    </button>
                    <button
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => onNavigate?.('presets')}
                    >
                        <FileText size={12} />
                        提示词模板
                    </button>
                </div>
            </div>

            {/* 标签导航 */}
            <TabPills
                tabs={TABS}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as ProcessingTab)}
            />

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto">
                {/* ========== 总结剧情 Tab ========== */}
                {activeTab === 'summarization' && (
                    <div className="space-y-8">
                        {/* 状态统计 - 无边框设计 */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">状态统计</h2>
                                <button
                                    className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={loadStatus}
                                    title="刷新"
                                >
                                    <RefreshCw size={14} />
                                </button>
                            </div>

                            {status ? (
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">运行状态</span>
                                        <div className={`flex items-center gap-1.5 text-sm font-medium ${status.running ? 'text-green-500' : 'text-muted-foreground'}`}>
                                            {status.running ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                            {status.running ? '运行中' : '已停止'}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">当前楼层</span>
                                        <div className="text-foreground font-mono text-lg">{status.currentFloor}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">待处理</span>
                                        <div className="text-amber-500 font-mono text-lg">{status.pendingFloors}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">总结次数</span>
                                        <div className="text-foreground font-mono text-lg">{status.historyCount}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">世界书 Token</span>
                                        <div className="text-primary font-mono text-lg">{worldbookTokens.toLocaleString()}</div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">加载中...</p>
                            )}
                        </section>

                        {/* 操作按钮 */}
                        <div className="flex gap-2">
                            {status?.running ? (
                                <button
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={handleStop}
                                >
                                    <Pause size={14} />
                                    停止监听
                                </button>
                            ) : (
                                <button
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                                    onClick={handleStart}
                                >
                                    <Play size={14} />
                                    启动监听
                                </button>
                            )}
                            <button
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                                onClick={handleTrigger}
                                disabled={loading || status?.isSummarizing}
                            >
                                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                                {loading ? '处理中...' : '手动触发'}
                            </button>
                        </div>

                        {/* 分隔线 */}
                        <div className="border-t border-border" />

                        {/* 总结设置 - 无边框 */}
                        <section>
                            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">总结设置</h2>

                            <div className="space-y-6">
                                {/* 自动总结开关 */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-foreground">自动总结</div>
                                        <div className="text-xs text-muted-foreground">达到楼层阈值时自动触发</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSettings(s => ({ ...s, autoEnabled: !s.autoEnabled }))}
                                        className={`relative w-9 h-5 rounded-full transition-colors ${settings.autoEnabled ? 'bg-primary' : 'bg-input'}`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.autoEnabled ? 'translate-x-4' : 'translate-x-0'}`}
                                        />
                                    </button>
                                </div>

                                {/* 楼层间隔 */}
                                <div className={settings.autoEnabled ? '' : 'opacity-50 pointer-events-none'}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-muted-foreground">楼层间隔</span>
                                        <span className="text-xs font-mono text-primary">{settings.floorInterval}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={settings.floorInterval}
                                        onChange={(e) => setSettings(s => ({ ...s, floorInterval: Number(e.target.value) }))}
                                        disabled={!settings.autoEnabled}
                                        className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
                                        <span>1</span>
                                        <span>25</span>
                                        <span>50</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 分隔线 */}
                        <div className="border-t border-border" />

                        {/* 精简配置 */}
                        <section>
                            <TrimConfigForm
                                config={trimConfig}
                                onChange={setTrimConfig}
                            />
                        </section>
                    </div>
                )}

                {/* ========== 向量化 Tab ========== */}
                {activeTab === 'vectorization' && (
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                        <Layers size={32} strokeWidth={1} className="opacity-30" />
                        <p className="text-sm font-light">向量化功能开发中...</p>
                    </div>
                )}

                {/* ========== 批量处理 Tab ========== */}
                {activeTab === 'batch' && (
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                        <Boxes size={32} strokeWidth={1} className="opacity-30" />
                        <p className="text-sm font-light">批量处理功能开发中...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessingView;

/**
 * Dashboard - 仪表盘主组件
 *
 * V0.9.5: 无框流体设计
 * - 去卡片化，使用细线分割
 * - 状态项按重要性分层
 * - 双栏布局：左侧系统状态，右侧功能开关
 */
import { NAV_ITEMS } from '@/constants/navigation';
import { Logger } from "@/core/logger";
import type { LogEntry } from "@/core/logger/types";
import { Switch } from '@/ui/components/core/Switch';
import { PageTitle } from "@/ui/components/display/PageTitle";
import { Divider } from '@/ui/components/layout/Divider';
import { useDashboardData } from '@/ui/hooks/useDashboardData';
import {
    AlertCircle,
    Brain,
    CheckCircle2,
    ChevronRight,
    Loader2,
    Search,
    Sparkles,
    Wand2
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DashboardProps {
    onNavigate?: (path: string) => void;
}

const getLevelClass = (level: number) => {
    switch (level) {
        case 0: return 'text-muted-foreground';
        case 1: return 'text-primary';
        case 2: return 'text-green-400';
        case 3: return 'text-yellow-400';
        case 4: return 'text-red-400';
        default: return 'text-primary';
    }
};

// 功能开关配置
const FEATURE_CONFIG = [
    { key: 'summarizer' as const, label: '自动总结', desc: '楼层触发剧情摘要', icon: Brain },
    { key: 'entity' as const, label: '实体提取', desc: '提取角色/地点关系', icon: Sparkles },
    { key: 'embedding' as const, label: '语义向量', desc: '事件向量化嵌入', icon: Search },
    { key: 'recall' as const, label: 'RAG 召回', desc: '记忆语义检索', icon: Search },
    { key: 'preprocessing' as const, label: '输入预处理', desc: 'Query 增强/剧情编排', icon: Wand2 },
];

// 快速入口：从 NAV_ITEMS 过滤，排除仪表盘自身
const QUICK_ACTIONS = NAV_ITEMS.filter(item => item.id !== 'dashboard');

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const { system, memory, features, brainStats, contextStats, toggleFeature } = useDashboardData(2000);

    useEffect(() => {
        setLogs(Logger.getLogs().slice(0, 4));
        const unsubscribe = Logger.subscribe((newLog) => {
            setLogs(prev => [newLog, ...prev].slice(0, 4));
        });
        return unsubscribe;
    }, []);

    const handleNavigate = (path: string) => onNavigate?.(path);

    // 计算进度
    const progressPercent = system.floorInterval > 0
        ? Math.min(100, (system.pendingFloors / system.floorInterval) * 100)
        : 0;

    const archivedRatio = memory.eventCount > 0
        ? Math.round((memory.archivedCount / memory.eventCount) * 100)
        : 0;

    return (
        <div className="flex flex-col h-full">
            {/* 页面标题 */}
            <PageTitle
                title="仪表盘"
                subtitle="系统状态概览与快速操作"
                className="mb-6"
            />
            <Divider className="mb-6" />

            {/* 主内容区 - 双栏 + 阶梯动画 */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 engram-stagger-children">

                    {/* ========== 左栏：系统状态 ========== */}
                    <section className="space-y-8">
                        {/* 连接状态 - 第一层级 */}
                        <div>
                            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">系统状态</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">连接状态</span>
                                    <div className={`flex items-center gap-2 text-lg font-medium ${system.isConnected ? 'text-emphasis' : 'text-muted-foreground'}`}>
                                        {system.isConnected ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                        {system.isConnected ? system.characterName : '未连接'}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">待处理楼层</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-light text-emphasis font-mono">{system.pendingFloors}</span>
                                        <span className="text-muted-foreground">/ {system.floorInterval}</span>
                                        {system.isSummarizing && <Loader2 size={14} className="animate-spin text-primary ml-1" />}
                                    </div>
                                    <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${progressPercent >= 80 ? 'bg-amber-500' : 'bg-primary'}`}
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Divider length={100} spacing="md" />

                        {/* 记忆统计 - 第二层级 */}
                        <div>
                            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">记忆统计</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">事件</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-mono text-value">{memory.eventCount}</span>
                                        <span className="text-xs text-meta">~{memory.estimatedTokens.toLocaleString()} tok</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                                        <span>活跃 {memory.activeCount}</span>
                                        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${100 - archivedRatio}%` }} />
                                        </div>
                                        <span>归档 {memory.archivedCount}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">实体</span>
                                    <div className="text-xl font-mono text-value">{memory.entityCount}</div>
                                    {/* 类型分布 */}
                                    {memory.entityCount > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            {Object.entries(memory.entityByType).slice(0, 3).map(([type, count]) => (
                                                <span key={type} className="text-[10px] text-muted-foreground">
                                                    {type}: {count}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Divider length={30} spacing="md" />

                        {/* 召回池状态 - 第三层级 (New) */}
                        <div>
                            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">类脑召回池</h2>
                            <div className="grid grid-cols-2 gap-6 bg-muted/30 p-4 rounded-lg border border-border/50">
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">短期记忆</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-mono text-foreground/80">{brainStats.shortTermCount}</span>
                                        <span className="text-xs text-muted-foreground">/ {brainStats.shortTermLimit}</span>
                                    </div>
                                    {/* 活跃项预览 */}
                                    <div className="mt-3 space-y-1">
                                        {brainStats.topItems.map((item, i) => (
                                            <div key={item.id} className="flex items-center justify-between text-[10px] text-muted-foreground">
                                                <span className="truncate max-w-[80px]" title={item.label}>{item.label}</span>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-12 h-1 bg-border rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary/70" style={{ width: `${Math.min(100, item.score * 100)}%` }} />
                                                    </div>
                                                    <span className="font-mono">{item.score.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">工作记忆</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-xl font-mono ${brainStats.workingCount >= brainStats.workingLimit ? 'text-emphasis' : 'text-value'}`}>
                                            {brainStats.workingCount}
                                        </span>
                                        <span className="text-xs text-meta">/ {brainStats.workingLimit}</span>
                                    </div>

                                    <Divider length={80} className="my-3 opacity-50" />

                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">上下文注入</span>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-mono text-value">{contextStats.estimatedTokens.toLocaleString()} Tok</span>
                                        <span className="text-[10px] text-meta">{contextStats.injectedLength.toLocaleString()} chars</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Divider length={100} />

                        {/* 快速入口 - 使用 NAV_ITEMS */}
                        <div>
                            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">快速入口</h2>
                            <div className="grid grid-cols-5 gap-3">
                                {QUICK_ACTIONS.map(({ id, label, icon: Icon, path }) => (
                                    <button
                                        key={id}
                                        onClick={() => handleNavigate(path.replace('/', ''))}
                                        className="flex flex-col items-center gap-2 p-3 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-[var(--duration-fast)] group hover:translate-y-[-2px] active:scale-95"
                                    >
                                        <Icon size={20} className="text-primary transition-transform duration-[var(--duration-fast)] group-hover:scale-110" />
                                        <span className="text-xs">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ========== 右栏：功能开关 + 日志 ========== */}
                    <section className="space-y-6 lg:pl-8 relative">
                        <Divider responsive length={30} />

                        {/* 功能开关 */}
                        <div>
                            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">功能开关</h2>
                            <div className="space-y-4">
                                {FEATURE_CONFIG.map(({ key, label, desc, icon: Icon }) => {
                                    const isEnabled = features[key];
                                    return (
                                        <div key={key} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <div className={`p-1.5 rounded-lg ${isEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                    <Icon size={14} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <span className={`text-sm ${isEnabled ? 'text-heading' : 'text-muted-foreground'}`}>{label}</span>
                                                    <p className="text-[10px] text-meta truncate">{desc}</p>
                                                </div>
                                            </div>
                                            <Switch checked={isEnabled} onChange={() => toggleFeature(key)} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Divider length={100} spacing="md" />

                        {/* 活动日志 */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">活动日志</h2>
                                <button
                                    onClick={() => handleNavigate('devlog')}
                                    className="text-[10px] text-link hover:underline flex items-center gap-0.5"
                                >
                                    查看全部 <ChevronRight size={12} />
                                </button>
                            </div>
                            <div className="font-mono text-[11px] space-y-1.5">
                                {logs.length === 0 ? (
                                    <div className="text-muted-foreground text-center py-4 italic">暂无日志</div>
                                ) : (
                                    logs.map(log => (
                                        <div key={log.id} className={`flex gap-2 opacity-80 ${getLevelClass(log.level)}`}>
                                            <span className="text-muted-foreground shrink-0">
                                                [{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]
                                            </span>
                                            <span className="text-foreground truncate">{log.message}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};


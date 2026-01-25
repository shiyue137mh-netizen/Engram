/**
 * Dashboard - 仪表盘主组件
 *
 * V0.9.5: 无框流体设计
 * - 去卡片化，使用细线分割
 * - 状态项按重要性分层
 * - 双栏布局：左侧系统状态，右侧功能开关
 */
import React, { useState, useEffect } from 'react';
import {
    Loader2, CheckCircle2, AlertCircle,
    Brain, Sparkles, Search, Wand2, ChevronRight
} from 'lucide-react';
import { PageTitle } from "@/ui/components/display/PageTitle";
import { Switch } from '@/ui/components/core/Switch';
import { Divider } from '@/ui/components/layout/Divider';
import { Logger } from "@/core/logger";
import type { LogEntry } from "@/core/logger/types";
import { useDashboardData } from '@/ui/hooks/useDashboardData';
import { NAV_ITEMS } from '@/constants/navigation';

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
    const [uptime, setUptime] = useState(0);
    const { system, memory, features, toggleFeature } = useDashboardData(2000);

    useEffect(() => {
        setLogs(Logger.getLogs().slice(0, 4));
        const unsubscribe = Logger.subscribe((newLog) => {
            setLogs(prev => [newLog, ...prev].slice(0, 4));
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

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
                                    <div className={`flex items-center gap-2 text-lg font-medium ${system.isConnected ? 'text-green-500' : 'text-muted-foreground'}`}>
                                        {system.isConnected ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                        {system.isConnected ? system.characterName : '未连接'}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">待处理楼层</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-light text-amber-500 font-mono">{system.pendingFloors}</span>
                                        <span className="text-muted-foreground">/ {system.floorInterval}</span>
                                        {system.isSummarizing && <Loader2 size={14} className="animate-spin text-primary ml-1" />}
                                    </div>
                                    {/* 进度条 */}
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
                                        <span className="text-xl font-mono text-foreground/80">{memory.eventCount}</span>
                                        <span className="text-xs text-muted-foreground">~{memory.estimatedTokens.toLocaleString()} tok</span>
                                    </div>
                                    {/* 归档比例条 */}
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
                                    <div className="text-xl font-mono text-foreground/80">{memory.entityCount}</div>
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

                        {/* 运行时间 - 第三层级 */}
                        <div>
                            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1">会话时长</span>
                            <div className="text-sm font-mono text-primary/80">{formatUptime(uptime)}</div>
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
                                                    <span className={`text-sm ${isEnabled ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
                                                    <p className="text-[10px] text-muted-foreground truncate">{desc}</p>
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
                                    className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
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

export default Dashboard;

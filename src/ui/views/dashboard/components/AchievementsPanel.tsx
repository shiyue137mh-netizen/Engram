import { type EngramSettings } from '@/config/settings';
import {
    Activity,
    BrainCircuit,
    Cpu,
    Fingerprint,
    Flame,
    LibraryBig,
    MessageSquareText,
    Star,
    Trophy,
    Zap
} from 'lucide-react';
import React from 'react';

interface AchievementsPanelProps {
    stats: EngramSettings['statistics'];
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ stats }) => {
    // 处理大数字的美化显示
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    };

    // 计算入坑天数与活跃度
    const firstUseDate = stats.firstUseAt ? new Date(stats.firstUseAt) : new Date();
    const daysSinceFirstUse = Math.max(1, Math.floor((Date.now() - firstUseDate.getTime()) / (1000 * 60 * 60 * 24)));
    const activeDaysCount = stats.activeDays?.length || 1;
    const activeRatio = Math.min(100, Math.round((activeDaysCount / daysSinceFirstUse) * 100));

    return (
        <div className="space-y-6">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Trophy size={14} className="text-amber-400" />
                全局统计与成就
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. 总 Token 消耗 (Resource) */}
                <div className="rounded-xl p-4 border border-border/50 bg-muted/20 flex flex-col gap-2 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-[10px] uppercase tracking-wider font-semibold">Token 消耗总计</span>
                        <Cpu size={14} className="text-primary/70" />
                    </div>
                    <div className="flex items-end gap-1.5">
                        <span className="text-2xl font-mono text-value font-medium tracking-tight">
                            {formatNumber(stats.totalTokens)}
                        </span>
                        <span className="text-[10px] text-muted-foreground mb-1 shadow-sm">Tokens</span>
                    </div>
                </div>

                {/* 2. LLM Invoke Count */}
                <div className="rounded-xl p-4 border border-border/50 bg-muted/20 flex flex-col gap-2 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-[10px] uppercase tracking-wider font-semibold">LLM 引擎调用</span>
                        <MessageSquareText size={14} className="text-indigo-400/70" />
                    </div>
                    <div className="flex items-end gap-1.5">
                        <span className="text-2xl font-mono text-value font-medium tracking-tight">
                            {formatNumber(stats.totalLlmCalls)}
                        </span>
                        <span className="text-[10px] text-muted-foreground mb-1 shadow-sm">Calls</span>
                    </div>
                </div>

                {/* 3. Event & Entity Creation (Productivity) */}
                <div className="rounded-xl p-4 border border-border/50 bg-muted/20 flex flex-col gap-2 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-[10px] uppercase tracking-wider font-semibold">系统记忆构建</span>
                        <LibraryBig size={14} className="text-emerald-500/70" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-mono text-emerald-400 font-medium tracking-tight">
                            {formatNumber(stats.totalEvents)}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Fingerprint size={10} />
                            <span>{stats.totalEntities}</span>
                        </div>
                    </div>
                </div>

                {/* 4. RAG Injections & Retention */}
                <div className="rounded-xl p-4 border border-border/50 bg-muted/20 flex flex-col gap-2 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-[10px] uppercase tracking-wider font-semibold">RAG 上下文召回</span>
                        <BrainCircuit size={14} className="text-amber-500/70" />
                    </div>
                    <div className="flex items-end gap-1.5">
                        <span className="text-2xl font-mono text-amber-400 font-medium tracking-tight">
                            {formatNumber(stats.totalRagInjections)}
                        </span>
                        <span className="text-[10px] text-muted-foreground mb-1 shadow-sm">Times</span>
                    </div>
                </div>
            </div>

            {/* 留存进度条 */}
            <div className="bg-muted/10 p-3 rounded-lg border border-border/30 flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <Activity size={16} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-foreground font-medium">使用周期与活跃度</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                            {activeDaysCount} / {daysSinceFirstUse} 天 ({activeRatio}%)
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-1000 ease-out"
                            style={{ width: `${activeRatio}%` }}
                        />
                    </div>
                </div>

                {/* 徽章系统 (Badges) */}
                <div className="flex-shrink-0 flex items-center gap-2 flex-wrap justify-end max-w-[50%]">

                    {/* 1. 活跃度徽章 (Retention) */}
                    {activeDaysCount >= 100 && activeRatio >= 50 ? (
                        <div className="text-[10px] flex items-center gap-1 text-red-500 font-medium bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20" title="连续活跃 100 天">
                            <Flame size={12} fill="currentColor" />
                            百日陪伴
                        </div>
                    ) : activeDaysCount >= 30 && activeRatio >= 40 ? (
                        <div className="text-[10px] flex items-center gap-1 text-rose-400 font-medium bg-rose-400/10 px-2 py-1 rounded-full border border-rose-400/20" title="连续活跃 30 天">
                            <Flame size={12} fill="currentColor" />
                            忠实用户
                        </div>
                    ) : activeDaysCount >= 7 && activeRatio >= 30 ? (
                        <div className="text-[10px] flex items-center gap-1 text-orange-400 font-medium bg-orange-400/10 px-2 py-1 rounded-full border border-orange-400/20" title="连续活跃 7 天">
                            <Flame size={12} />
                            活跃初见
                        </div>
                    ) : null}

                    {/* 2. Token 消耗徽章 (Resource) */}
                    {stats.totalTokens >= 10000000 ? (
                        <div className="text-[10px] flex items-center gap-1 text-purple-500 font-medium bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20" title="消耗 1000 万 Token">
                            <Star size={12} fill="currentColor" />
                            千万 Token
                        </div>
                    ) : stats.totalTokens >= 1000000 ? (
                        <div className="text-[10px] flex items-center gap-1 text-purple-400 font-medium bg-purple-400/10 px-2 py-1 rounded-full border border-purple-400/20" title="消耗 100 万 Token">
                            <Star size={12} />
                            百万 Token
                        </div>
                    ) : stats.totalTokens >= 100000 ? (
                        <div className="text-[10px] flex items-center gap-1 text-purple-300 font-medium bg-purple-300/10 px-2 py-1 rounded-full border border-purple-300/20" title="消耗 10 万 Token">
                            <Star size={10} />
                            十万 Token
                        </div>
                    ) : null}

                    {/* 3. 记忆与实体徽章 (Productivity) */}
                    {stats.totalEvents >= 10000 ? (
                        <div className="text-[10px] flex items-center gap-1 text-emerald-500 font-medium bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20" title="生成 10,000 条记忆">
                            <LibraryBig size={12} />
                            万卷藏书
                        </div>
                    ) : stats.totalEvents >= 1000 ? (
                        <div className="text-[10px] flex items-center gap-1 text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20" title="生成 1,000 条记忆">
                            <LibraryBig size={12} />
                            千思之录
                        </div>
                    ) : null}

                    {/* 4. 召回频次徽章 (RAG) */}
                    {stats.totalRagInjections >= 5000 ? (
                        <div className="text-[10px] flex items-center gap-1 text-blue-500 font-medium bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20" title="成功召回 5,000 次">
                            <Zap size={12} fill="currentColor" />
                            神经漫游者
                        </div>
                    ) : stats.totalRagInjections >= 1000 ? (
                        <div className="text-[10px] flex items-center gap-1 text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded-full border border-blue-400/20" title="成功召回 1,000 次">
                            <Zap size={12} />
                            记忆编织者
                        </div>
                    ) : stats.totalRagInjections >= 100 ? (
                        <div className="text-[10px] flex items-center gap-1 text-blue-300 font-medium bg-blue-300/10 px-2 py-1 rounded-full border border-blue-300/20" title="成功召回 100 次">
                            <Zap size={10} />
                            初窥门径
                        </div>
                    ) : null}

                </div>
            </div>
        </div>
    );
};

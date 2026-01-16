/**
 * MemoryStatsCard - 记忆统计卡片
 *
 * V0.9.5: 展示事件/实体统计和归档比例
 */
import React from 'react';
import { Database, Users, FileText, Archive } from 'lucide-react';
import type { MemoryStats } from '@/hooks/useDashboardData';

interface MemoryStatsCardProps {
    stats: MemoryStats;
}

// 实体类型颜色映射
const TYPE_COLORS: Record<string, string> = {
    char: 'bg-blue-500',
    loc: 'bg-green-500',
    item: 'bg-yellow-500',
    concept: 'bg-purple-500',
    unknown: 'bg-gray-500',
};

const TYPE_LABELS: Record<string, string> = {
    char: '角色',
    loc: '地点',
    item: '物品',
    concept: '概念',
    unknown: '未知',
};

export const MemoryStatsCard: React.FC<MemoryStatsCardProps> = ({ stats }) => {
    const archivedRatio = stats.eventCount > 0
        ? Math.round((stats.archivedCount / stats.eventCount) * 100)
        : 0;

    return (
        <div className="flex flex-col bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border">
                <Database size={16} />
                <span>MEMORY STATS</span>
            </div>

            <div className="p-4 space-y-4">
                {/* Events 统计 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText size={14} />
                        <span className="text-sm">Events</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-foreground font-mono">
                            {stats.eventCount}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            ~{stats.estimatedTokens.toLocaleString()} tok
                        </span>
                    </div>
                </div>

                {/* 归档比例条 */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            Active ({stats.activeCount})
                        </span>
                        <span className="flex items-center gap-1">
                            <Archive size={12} />
                            Archived ({stats.archivedCount})
                        </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${100 - archivedRatio}%` }}
                        />
                    </div>
                </div>

                {/* Entities 统计 */}
                <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users size={14} />
                            <span className="text-sm">Entities</span>
                        </div>
                        <span className="text-lg font-bold text-foreground font-mono">
                            {stats.entityCount}
                        </span>
                    </div>

                    {/* 类型分布 */}
                    {stats.entityCount > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(stats.entityByType).map(([type, count]) => (
                                <div
                                    key={type}
                                    className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs"
                                >
                                    <span className={`w-2 h-2 rounded-full ${TYPE_COLORS[type] || TYPE_COLORS.unknown}`} />
                                    <span className="text-muted-foreground">{TYPE_LABELS[type] || type}</span>
                                    <span className="font-medium text-foreground">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemoryStatsCard;

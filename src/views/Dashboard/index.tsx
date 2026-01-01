import React, { useEffect, useState } from 'react';
import { StatsCard } from './components/StatsCard';
import { Database, Cpu, Server, Terminal as TermIcon, Zap } from 'lucide-react';
import { Logger } from "@/lib/logger";
import type { LogEntry } from "@/lib/logger/types";
import { getSTContext } from '@/tavern/bridge';

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

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [stContext, setStContext] = useState(getSTContext());
    const [uptime, setUptime] = useState(0);

    // 订阅前3条日志
    useEffect(() => {
        // 初始化
        setLogs(Logger.getLogs().slice(0, 3));

        // 订阅更新
        const unsubscribe = Logger.subscribe((newLog) => {
            setLogs(prev => [newLog, ...prev].slice(0, 3));
        });
        return unsubscribe;
    }, []);

    // 运行时间计时器
    useEffect(() => {
        const timer = setInterval(() => {
            setUptime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 格式化时间
    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const characterName = stContext?.name2 || 'Unknown';

    const handleNavigate = (path: string) => {
        if (onNavigate) {
            onNavigate(path);
        }
    };

    return (
        <div className="h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto">

                {/* 1. Status Monitors (环境监测) - 顶部横向三列 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full">
                    <StatsCard
                        title="ACTIVE MODEL"
                        value={stContext ? 'Connected' : 'Offline'}
                        subtext={stContext ? `Chatting with ${characterName}` : 'Waiting for connection...'}
                        icon={Server}
                        highlight={!!stContext}
                    />
                    <StatsCard
                        title="MEMORY NODES"
                        value="0"
                        subtext="Graph Database"
                        icon={Database}
                    />
                    <StatsCard
                        title="SYSTEM UPTIME"
                        value={formatUptime(uptime)}
                        subtext="Session Duration"
                        icon={Cpu}
                    />
                </div>

                {/* 3. Quick Actions (快捷入口) - 下方 */}
                <div className="flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border">
                        <Zap size={16} />
                        <span>QUICK ACTIONS</span>
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-3 p-4">
                        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground" onClick={() => handleNavigate('memory')}>
                            <span className="text-2xl">📜</span>
                            <span className="text-xs font-medium">Memory Stream</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground" onClick={() => handleNavigate('graph')}>
                            <span className="text-2xl">🕸️</span>
                            <span className="text-xs font-medium">Knowledge Graph</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground" onClick={() => handleNavigate('processing')}>
                            <span className="text-2xl">🧠</span>
                            <span className="text-xs font-medium">Brain Console</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground" onClick={() => handleNavigate('settings')}>
                            <span className="text-2xl">⚙️</span>
                            <span className="text-xs font-medium">Settings</span>
                        </button>
                    </div>
                </div>

                {/* 4. Mini Terminal (迷你终端) - 右下 */}
                <div className="flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border">
                        <TermIcon size={16} />
                        <span>SYSTEM LOGS</span>
                        <button className="ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline" onClick={() => handleNavigate('devlog')}>VIEW ALL</button>
                    </div>
                    <div className="flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden">
                        {logs.length === 0 ? (
                            <div className="text-muted-foreground text-center mt-5 italic">No activity recorded</div>
                        ) : (
                            logs.map(log => (
                                <div key={log.id} className={`flex gap-2 mb-1.5 opacity-80 ${getLevelClass(log.level)}`}>
                                    <span className="text-muted-foreground">[{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]</span>
                                    <span className="text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{log.message}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

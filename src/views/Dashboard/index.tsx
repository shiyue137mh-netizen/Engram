import React, { useEffect, useState } from 'react';
import { StatsCard } from './components/StatsCard';
import { Database, Cpu, Server, Terminal as TermIcon, Zap } from 'lucide-react';
import { Logger } from '../../infrastructure/logger';
import type { LogEntry } from '../../infrastructure/logger/types';
import { getSTContext } from '../../infrastructure/adapter/STBridge';

interface DashboardProps {
    onNavigate: (path: string) => void;
}

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
    const userName = stContext?.name1 || 'User';

    return (
        <div className="engram-dashboard">
            <div className="engram-dashboard-grid">

                {/* 1. Status Monitors (环境监测) - 顶部横向三列 */}
                <div className="dashboard-stats-row">
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
                <div className="dashboard-cell cell-actions">
                    <div className="cell-header">
                        <Zap size={16} />
                        <span>QUICK ACTIONS</span>
                    </div>
                    <div className="actions-grid">
                        <button className="action-tile" onClick={() => onNavigate('/memory')}>
                            <span className="tile-icon">📜</span>
                            <span className="tile-label">Memory Stream</span>
                        </button>
                        <button className="action-tile" onClick={() => onNavigate('/graph')}>
                            <span className="tile-icon">🕸️</span>
                            <span className="tile-label">Knowledge Graph</span>
                        </button>
                        <button className="action-tile" onClick={() => onNavigate('/brain')}>
                            <span className="tile-icon">🧠</span>
                            <span className="tile-label">Brain Console</span>
                        </button>
                        <button className="action-tile" onClick={() => onNavigate('/settings')}>
                            <span className="tile-icon">⚙️</span>
                            <span className="tile-label">Settings</span>
                        </button>
                    </div>
                </div>

                {/* 4. Mini Terminal (迷你终端) - 右下 */}
                <div className="dashboard-cell cell-terminal">
                    <div className="cell-header">
                        <TermIcon size={16} />
                        <span>SYSTEM LOGS</span>
                        <button className="mini-link" onClick={() => onNavigate('/dev')}>VIEW ALL</button>
                    </div>
                    <div className="mini-terminal-content">
                        {logs.length === 0 ? (
                            <div className="mini-log-empty">No activity recorded</div>
                        ) : (
                            logs.map(log => (
                                <div key={log.id} className={`mini-log-line level-${log.level}`}>
                                    <span className="log-time">[{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]</span>
                                    <span className="log-msg">{log.message}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

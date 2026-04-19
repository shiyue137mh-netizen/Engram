import React, { useEffect, useState } from 'react';
import { Database, RefreshCw, Trash2 } from 'lucide-react';
import type { DatabaseStats } from '@/data/db';
import { listAllChatIds, getDatabaseStats, deleteDatabase } from '@/data/db';
import { getCurrentChatId } from '@/integrations/tavern';

export const GlobalDatabaseList: React.FC = () => {
    const [dbs, setDbs] = useState<DatabaseStats[]>([]);
    const [loading, setLoading] = useState(false);
    const currentChatId = getCurrentChatId();

    const fetchDatabases = async () => {
        setLoading(true);
        try {
            const chatIds = await listAllChatIds();
            const statsPromises = chatIds.map(id => getDatabaseStats(id));
            const stats = await Promise.all(statsPromises);
            
            // 按照更新时间排序 (最近更新的在前面)
            stats.sort((a, b) => b.lastUpdateTime - a.lastUpdateTime);
            setDbs(stats);
        } catch (error) {
            console.error('Failed to fetch databases', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDatabases();
    }, []);

    const handleDelete = async (chatId: string) => {
        if (chatId === currentChatId) {
            alert('不能在此处直接删除当前正在使用的聊天数据库！请通过上方【手动维护】进行删除。');
            return;
        }

        if (confirm(`确定要删除聊天 ${chatId} 的数据库吗？\n警告：此操作不可逆！`)) {
            try {
                setLoading(true);
                await deleteDatabase(chatId);
                await fetchDatabases();
            } catch (error) {
                alert(`删除失败: ${error}`);
                setLoading(false);
            }
        }
    };

    const handleDeleteAll = async () => {
        if (confirm('⚠️ 危险操作确认 ⚠️\n您确定要删除【所有】不处于活动状态的聊天数据库吗？这将会清空本地所有记忆！')) {
            if (confirm('再次确认：这相当于清空 Engram 的整个本地知识库！(当前打开的聊天不会被删除)')) {
                try {
                    setLoading(true);
                    for (const db of dbs) {
                        if (db.chatId !== currentChatId) {
                            await deleteDatabase(db.chatId);
                        }
                    }
                    alert('清理完成！');
                    await fetchDatabases();
                } catch (error) {
                    alert(`清理出错: ${error}`);
                    setLoading(false);
                }
            }
        }
    };

    const formatTime = (ts: number) => {
        if (!ts) {return '未知';}
        return new Date(ts).toLocaleString();
    };

    return (
        <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                        <Database size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-medium text-heading truncate">全局数据库管理</h4>
                            {loading && <span className="text-xs text-primary animate-pulse">处理中...</span>}
                        </div>
                        <p className="text-sm text-meta line-clamp-2">
                            查看和清理本地所有聊天的记忆数据库 (管理硬盘空间)
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={fetchDatabases}
                        disabled={loading}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors disabled:opacity-50"
                        title="刷新列表"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button 
                        onClick={handleDeleteAll}
                        disabled={loading || dbs.length === 0 || (dbs.length === 1 && dbs[0].chatId === currentChatId)}
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-red-500/10 text-red-500 transition-colors disabled:opacity-50"
                    >
                        清理全部多余库
                    </button>
                </div>
            </div>

            <div className="pl-14">
                {dbs.length === 0 && !loading ? (
                    <div className="text-sm text-muted-foreground/60 py-2">暂无本地数据库</div>
                ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                        {dbs.map((db) => {
                            const isCurrent = db.chatId === currentChatId;
                            return (
                                <div key={db.chatId} className={`flex items-center justify-between p-2 rounded border ${isCurrent ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'} text-sm`}>
                                    <div className="min-w-0 flex-1 pr-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-medium truncate ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                                {db.chatId}
                                            </span>
                                            {isCurrent && <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">当前活动</span>}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-0.5">
                                            修改时间: {formatTime(db.lastUpdateTime)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(db.chatId)}
                                        disabled={isCurrent || loading}
                                        className={`p-1.5 rounded transition-colors ${
                                            isCurrent 
                                            ? 'text-muted-foreground/30 cursor-not-allowed' 
                                            : 'text-muted-foreground hover:bg-red-500/10 hover:text-red-500'
                                        }`}
                                        title={isCurrent ? "无法在此删除当前活动的库" : "删除此库"}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

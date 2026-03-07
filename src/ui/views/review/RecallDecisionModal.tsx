import { AgenticRecall } from '@/modules/preprocessing/types';
import { useMemoryStore } from '@/state/memoryStore';
import { SimpleModal } from '@/ui/components/feedback/SimpleModal';
import { CheckSquare, Database, MessageSquare, Search, Square } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

interface RecallDecisionModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRecalls: AgenticRecall[];
    recalledEntities?: any[]; // V1.4: 传入被激活的实体
    onConfirm: (newRecalls: AgenticRecall[]) => void;
}

/**
 * RecallDecisionModal - Agentic RAG 召回决策审阅与编辑弹窗
 */
export const RecallDecisionModal: React.FC<RecallDecisionModalProps> = ({
    isOpen,
    onClose,
    initialRecalls,
    recalledEntities = [],
    onConfirm
}) => {
    // 状态: 存储组件内编辑的 recalls (基于 initialRecalls 初始化)
    const [editedRecalls, setEditedRecalls] = useState<AgenticRecall[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [allEvents, setAllEvents] = useState<any[]>([]); // 暂不显式 import MemoryEvent 避免循环依赖

    // 在打开时初始化数据
    useEffect(() => {
        if (isOpen) {
            setEditedRecalls([...initialRecalls]);
            setSearchQuery('');
            const store = useMemoryStore.getState();
            store.getAllEvents().then(events => {
                // 只显示 level 0 且已归档的事件
                setAllEvents(events.filter(e => e.level === 0 && e.is_archived));
            });
        }
    }, [isOpen, initialRecalls]);

    // 分类并过滤数据
    const { activeEvents, inactiveEvents } = useMemo(() => {
        const activeIds = new Set(editedRecalls.map(r => r.id));

        // 已激活事件 (保留 LLM 原始顺序和 score/reason)
        const active = editedRecalls.map(r => {
            const event = allEvents.find(e => e.id === r.id);
            return {
                ...r,
                summary: event?.summary || '(事件未找到)',
                type: event?.type || 'unknown'
            };
        }).sort((a, b) => b.score - a.score); // 降序

        // 未激活事件 (支持文本过滤)
        const inactive = allEvents
            .filter(e => !activeIds.has(e.id))
            .filter(e => {
                if (!searchQuery) return true;
                const lowerQ = searchQuery.toLowerCase();
                return e.summary.toLowerCase().includes(lowerQ) ||
                    e.type.toLowerCase().includes(lowerQ);
            });

        return { activeEvents: active, inactiveEvents: inactive };
    }, [allEvents, editedRecalls, searchQuery]);

    // --- 交互处理 ---

    const handleConfirm = () => {
        // 构建最终的 AgenticRecall 列表并抛出
        onConfirm(editedRecalls);
        onClose();
    };

    /** 切换激活状态/更新分数 */
    const handleToggleInactive = (eventId: string, defaultScore: number = 0.5) => {
        // 如果原本未激活，现在变为激活，给个默认理由
        setEditedRecalls(prev => [
            ...prev,
            { id: eventId, score: defaultScore, reason: '用户手动追加召回' }
        ]);
    };

    const handleRemoveActive = (eventId: string) => {
        setEditedRecalls(prev => prev.filter(r => r.id !== eventId));
    };

    const handleUpdateScore = (eventId: string, newScore: number) => {
        setEditedRecalls(prev => prev.map(r =>
            r.id === eventId ? { ...r, score: newScore } : r
        ));
    };

    // --- 渲染渲染函数 ---

    const renderFooter = () => (
        <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground">
                已选中 <strong className="text-value font-mono">{editedRecalls.length}</strong> 条即将注入
            </span>
            <div className="flex gap-2">
                <button
                    className="px-4 py-1.5 text-sm rounded-md bg-transparent border-border text-muted-foreground hover:bg-muted transition-colors"
                    onClick={onClose}
                >
                    取消
                </button>
                <button
                    className="px-4 py-1.5 text-sm rounded-md bg-primary text-bg-app shadow-[0_4px_12px_rgba(var(--primary-rgb),0.25)] hover:brightness-110 transition-all"
                    onClick={handleConfirm}
                >
                    确认激活
                </button>
            </div>
        </div>
    );

    return (
        <SimpleModal
            isOpen={isOpen}
            onClose={onClose}
            title="Agentic 召回审阅"
            maxWidth="max-w-3xl"
            footer={renderFooter()}
        >
            <div className="flex flex-col h-[70vh] engram-animate-fade-up">

                {/* === 上半部: 已激活列表 === */}
                <div className="p-4 border-b border-border bg-card/20 shrink-0">
                    <h4 className="text-sm font-medium text-heading mb-3 flex items-center justify-between">
                        <span>已激活 ({activeEvents.length})</span>
                    </h4>
                    <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2">
                        {activeEvents.map(evt => (
                            <div key={evt.id} className="group flex flex-col gap-1 p-2 rounded hover:bg-muted/20 transition-colors">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-2 flex-1">
                                        <button
                                            className="mt-0.5 text-primary cursor-pointer hover:text-destructive transition-colors shrink-0"
                                            onClick={() => handleRemoveActive(evt.id)}
                                            title="取消激活"
                                        >
                                            <CheckSquare size={16} />
                                        </button>
                                        <p className="text-sm text-foreground/90 leading-relaxed break-words whitespace-pre-wrap" title={evt.summary}>
                                            <span className="text-[10px] uppercase px-1 py-0.5 rounded bg-muted text-label mr-2 select-none">
                                                {evt.type}
                                            </span>
                                            {evt.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-xs text-muted-foreground font-mono w-10 text-right">Score:</span>
                                        <input
                                            type="number"
                                            min="0" max="1" step="0.1"
                                            className="w-14 bg-transparent border-none border-b border-border/50 text-value text-right font-mono text-sm p-0 focus:ring-0 focus:border-primary transition-colors hover:border-muted-foreground"
                                            value={evt.score}
                                            onChange={(e) => handleUpdateScore(evt.id, parseFloat(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                                <div className="pl-6 flex items-start gap-1.5 mt-1">
                                    <MessageSquare size={12} className="text-muted-foreground/50 shrink-0 mt-[3px]" />
                                    <p className="text-xs text-emphasis leading-snug break-words opacity-80 group-hover:opacity-100 transition-opacity">
                                        {evt.reason}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {activeEvents.length === 0 && (
                            <p className="text-xs text-muted-foreground italic py-2 text-center">暂无激活的事件</p>
                        )}
                    </div>

                    {/* V1.4: 被唤醒的实体展示 (只读) */}
                    {recalledEntities.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/40">
                            <h5 className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                                <Database size={12} className="text-primary/60" />
                                已唤醒实体 ({recalledEntities.length})
                            </h5>
                            <div className="flex flex-wrap gap-2 max-h-[15vh] overflow-y-auto pr-1">
                                {recalledEntities.map((ent: any) => (
                                    <div
                                        key={ent.id}
                                        className="px-2 py-1 bg-primary/5 border border-primary/20 rounded text-[10px] text-primary/80 flex items-center gap-1.5 hover:bg-primary/10 transition-colors cursor-default"
                                        title={ent.description || ent.name}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                        <span className="font-medium">{ent.name}</span>
                                        {ent._recallWeight && (
                                            <span className="opacity-40 font-mono">({ent._recallWeight.toFixed(2)})</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-2 text-[10px] text-muted-foreground italic">
                                * 实体将根据关键词匹配或关系联想自动注入对话上下文。
                            </p>
                        </div>
                    )}
                </div>

                {/* === 下半部: 未激活列表 (虚拟滚动) */}
                <div className="flex flex-col flex-1 min-h-0 bg-background">
                    <div className="p-3 border-b border-border flex items-center justify-between shrink-0 bg-background/80 backdrop-blur top-0 z-10 sticky">
                        <h4 className="text-sm font-medium text-heading">
                            待选事件 ({inactiveEvents.length})
                        </h4>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-1.5 text-muted-foreground" size={14} />
                            <input
                                type="text"
                                placeholder="搜索归档事件 summary..."
                                className="w-full bg-transparent border-none border-b border-border/50 pl-7 pr-2 py-1 text-sm text-foreground focus:ring-0 focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 p-2 min-h-0">
                        <Virtuoso
                            style={{ height: '100%' }}
                            data={inactiveEvents}
                            itemContent={(_index, evt) => (
                                <div className="flex flex-col gap-1 p-2 rounded hover:bg-muted/20 transition-colors mb-1 border-b border-border/20 last:border-0 border-transparent">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-2 flex-1">
                                            <button
                                                className="mt-0.5 text-muted-foreground/50 cursor-pointer hover:text-primary transition-colors shrink-0"
                                                onClick={() => handleToggleInactive(evt.id, 0.5)}
                                                title="添加激活"
                                            >
                                                <Square size={16} />
                                            </button>
                                            <p className="text-sm text-foreground/90 leading-relaxed break-words whitespace-pre-wrap" title={evt.summary}>
                                                <span className="text-[10px] uppercase px-1 py-0.5 rounded bg-muted text-label mr-2 select-none">
                                                    {evt.type}
                                                </span>
                                                {evt.summary}
                                            </p>
                                        </div>

                                        {/* 快捷打分 */}
                                        <div className="flex items-center gap-1 shrink-0 px-2 py-1 bg-muted/20 rounded">
                                            {[
                                                { label: '低', val: 0.3 },
                                                { label: '中', val: 0.6 },
                                                { label: '高', val: 0.9 }
                                            ].map(btn => (
                                                <button
                                                    key={btn.label}
                                                    onClick={() => handleToggleInactive(evt.id, btn.val)}
                                                    className="px-2 py-0.5 text-[10px] text-muted-foreground bg-transparent hover:bg-accent hover:text-foreground transition-colors rounded"
                                                >
                                                    {btn.label}
                                                </button>
                                            ))}
                                            <span className="mx-1 text-border">|</span>
                                            <input
                                                type="number"
                                                min="0" max="1" step="0.1"
                                                placeholder="0.0"
                                                className="w-10 bg-transparent border-none border-b border-border/50 text-value text-right font-mono text-xs p-0 focus:ring-0 focus:border-primary transition-colors"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const val = parseFloat((e.target as HTMLInputElement).value) || 0.5;
                                                        handleToggleInactive(evt.id, val);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

            </div>
        </SimpleModal>
    );
};

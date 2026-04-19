import type { AgenticRecall } from '@/modules/preprocessing/types';
import { BrainCircuit, FileText, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface MessageReviewProps {
    content: string;
    onChange: (newContent: string) => void;
    /** Query 内容 (可选) */
    query?: string;
    /** Query 变更回调 (可选) */
    onQueryChange?: (newQuery: string) => void;
    /** Agentic RAG 召回决策 (可选) */
    agenticRecalls?: AgenticRecall[];
    /** 召回决策变更回调 (可选) */
    onAgenticRecallsChange?: (newRecalls: AgenticRecall[]) => void;
    /** 组件内点击编辑时，触发召回 Modal 打开 */
    onOpenRecallModal?: () => void;
}

export const MessageReview: React.FC<MessageReviewProps> = ({
    content,
    onChange,
    query,
    onQueryChange,
    agenticRecalls,
    onAgenticRecallsChange,
    onOpenRecallModal
}) => {
    const [text, setText] = useState(content);
    const [queryText, setQueryText] = useState(query || '');

    useEffect(() => {
        setText(content);
    }, [content]);

    useEffect(() => {
        setQueryText(query || '');
    }, [query]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setText(val);
        onChange(val);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setQueryText(val);
        onQueryChange?.(val);
    };

    const showQuery = query !== undefined && onQueryChange !== undefined;
    const showAgentic = agenticRecalls !== undefined && onAgenticRecallsChange !== undefined;

    return (
        <div className="flex flex-col h-full gap-4 min-h-0">
            <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-md border border-border/50 shrink-0">
                请检查生成的内容。您可以直接编辑文本，或者使用下方按钮进行重生成。
            </div>

            {/* Output 区域 */}
            <div className="flex-1 flex flex-col gap-2 min-h-0">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FileText size={16} className="text-primary" />
                    <span>输出内容 (Output)</span>
                </div>
                <div className="flex-1 relative">
                    <textarea
                        value={text}
                        onChange={handleChange}
                        className="w-full h-full min-h-[100px] p-4 bg-muted/50 border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none custom-scrollbar"
                        spellCheck={false}
                        placeholder="在此编辑输出内容..."
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded pointer-events-none">
                        {text.length} 字符
                    </div>
                </div>
            </div>

            {/* Query 区域 - 仅在有 query 时显示 */}
            {showQuery && (
                <div className="flex flex-col gap-2 shrink-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Search size={16} className="text-accent-foreground" />
                        <span>检索关键词 (Query)</span>
                        <span className="text-xs text-muted-foreground font-normal">用于 RAG 召回</span>
                    </div>
                    <div className="relative">
                        <textarea
                            value={queryText}
                            onChange={handleQueryChange}
                            className="w-full min-h-[80px] p-4 bg-accent/10 border border-accent/30 rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none custom-scrollbar"
                            spellCheck={false}
                            placeholder="RAG 检索关键词..."
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded pointer-events-none">
                            {queryText.length} 字符
                        </div>
                    </div>
                </div>
            )}

            {/* Agentic RAG 召回决策区域 */}
            {showAgentic && (
                <div className="flex flex-col gap-2 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <BrainCircuit size={16} className="text-primary" />
                            <span>Agentic 召回决策</span>
                            <span className="text-xs text-muted-foreground font-normal">基于用户意图的智能检索</span>
                        </div>
                        {onOpenRecallModal && (
                            <button
                                onClick={onOpenRecallModal}
                                className="px-3 py-1 text-xs rounded border border-border bg-card/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                                查看 / 编辑
                            </button>
                        )}
                    </div>
                    {agenticRecalls && agenticRecalls.length > 0 ? (
                        <div className="flex flex-col gap-1 p-2 bg-accent/10 border border-accent/20 rounded-md max-h-[150px] overflow-y-auto custom-scrollbar">
                            {agenticRecalls.map((r, i) => (
                                <div key={i} className="flex flex-col gap-0.5 p-1.5 rounded hover:bg-muted/30">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-mono text-muted-foreground text-xs">{r.id}</span>
                                        <span className="text-value font-mono text-xs">Score: {r.score}</span>
                                    </div>
                                    <p className="text-xs text-emphasis line-clamp-1" title={r.reason}>
                                        {r.reason}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-3 text-xs text-muted-foreground text-center bg-muted/20 border border-border/50 rounded-md">
                            本次无召回决策
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

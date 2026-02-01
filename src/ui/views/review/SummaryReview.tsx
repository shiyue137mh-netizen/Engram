import { Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SummaryReviewProps {
    content: string; // Generic text content (fallback)
    data?: { events?: string[] } | string[]; // Expecting list of events
    onChange: (content: string, data: any) => void;
}

export const SummaryReview: React.FC<SummaryReviewProps> = ({ content, data, onChange }) => {
    // Parse input data to list of events
    const parseEvents = (): string[] => {
        if (Array.isArray(data)) return data;
        if (data && typeof data === 'object' && Array.isArray(data.events)) return data.events;
        // Fallback: split content by newlines if it looks like a list
        if (content) return content.split('\n').filter(l => l.trim().length > 0);
        return [];
    };

    const [events, setEvents] = useState<string[]>(parseEvents());

    useEffect(() => {
        setEvents(parseEvents());
    }, [data, content]);

    // Notify parent of changes
    const notifyChange = (newEvents: string[]) => {
        const newContent = newEvents.join('\n');
        onChange(newContent, { events: newEvents });
    };

    const handleChangeEvent = (index: number, val: string) => {
        const next = [...events];
        next[index] = val;
        setEvents(next);
        notifyChange(next);
    };

    const handleRemoveEvent = (index: number) => {
        const next = events.filter((_, i) => i !== index);
        setEvents(next);
        notifyChange(next);
    };

    const handleAddEvent = () => {
        const next = [...events, ''];
        setEvents(next);
        notifyChange(next);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-md border border-border/50">
                请确认生成的摘要事件列表。您可以修改表述或删除不重要的事件。
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {events.map((evt, idx) => (
                    <div key={idx} className="flex items-start gap-2 group">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        <div className="flex-1 relative">
                            <textarea
                                value={evt}
                                onChange={(e) => handleChangeEvent(idx, e.target.value)}
                                className="w-full min-h-[40px] p-2 bg-muted/30 border border-transparent hover:border-border focus:border-primary rounded-md text-sm resize-none focus:outline-none transition-colors"
                                rows={Math.max(1, Math.ceil(evt.length / 50))}
                            />
                            <button
                                onClick={() => handleRemoveEvent(idx)}
                                className="absolute right-2 top-2 p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                title="移除此事件"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {events.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm italic">
                        暂无事件记录
                    </div>
                )}

                <button
                    onClick={handleAddEvent}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors w-full justify-center border border-dashed border-border hover:border-primary/30"
                >
                    <Plus size={14} />
                    添加事件
                </button>
            </div>
        </div>
    );
};

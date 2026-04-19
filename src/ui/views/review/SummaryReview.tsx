import { Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SummaryReviewProps {
    content: string; // Generic text content (fallback)
    data?: { events?: string[] } | string[]; // Expecting list of events
    onChange: (content: string, data: any) => void;
}

export const SummaryReview: React.FC<SummaryReviewProps> = ({ content, data, onChange }) => {
    // Parse input data to list of events
    const parseEvents = (): any[] => {
        // 1. Try from parsed data object
        if (Array.isArray(data)) {return data;}
        if (data && typeof data === 'object' && Array.isArray(data.events)) {
            return data.events;
        }

        // 2. Try to parse content as JSON if data is missing or malformed
        if (content) {
            try {
                // Remove markdown code blocks if any
                const cleanContent = content.replaceAll(/```(json)?/g, '').trim();
                const parsed = JSON.parse(cleanContent);
                if (Array.isArray(parsed)) {return parsed;}
                if (parsed && typeof parsed === 'object' && Array.isArray(parsed.events)) {
                    return parsed.events;
                }
            } catch {
                // Ignore parse errors, fallback to text splitting
            }

            // 3. Last fallback: split content by newlines assuming it's a plain list
            return content.split('\n')
                .map(l => l.trim())
                .filter(l => l.length > 0 && !l.startsWith('{') && !l.startsWith('}') && !l.startsWith('[') && !l.startsWith(']'));
        }
        return [];
    };

    const [events, setEvents] = useState<any[]>([]);

    // Notify parent of changes
    const notifyChange = (newEvents: any[]) => {
        const newContent = JSON.stringify({ events: newEvents }, null, 2);
        onChange(newContent, { events: newEvents });
    };

    useEffect(() => {
        const parsed = parseEvents();
        setEvents(parsed);
        // Only trigger sync up on initial load if `data.events` is missing
        const parentHasEvents = data && !Array.isArray(data) && typeof data === 'object' && Array.isArray((data as any).events);
        if (!parentHasEvents && parsed.length > 0) {
            onChange(parsed.join('\n'), { events: parsed });
        }
    }, [data, content]);

    const handleUpdateKV = (index: number, key: string, val: string) => {
        const next = [...events];
        if (typeof next[index] !== 'object' || next[index] === null) {
            // If it was a string, convert to object first
            next[index] = { structured_kv: {}, summary: next[index] };
        }

        const evt = next[index];
        const kv = evt.structured_kv || evt.meta || {};

        let finalVal: any = val;
        // Handle array fields
        if (key === 'location' || key === 'role') {
            finalVal = val.split(/[,，]/).map(s => s.trim()).filter(Boolean);
        }

        const newKV = { ...kv, [key]: finalVal };

        // Maintain the same key name (structured_kv or meta)
        if (evt.structured_kv) {
            next[index] = { ...evt, structured_kv: newKV };
        } else if (evt.meta) {
            next[index] = { ...evt, meta: newKV };
        } else {
            next[index] = { ...evt, structured_kv: newKV };
        }

        setEvents(next);
        notifyChange(next);
    };

    const handleChangeEvent = (index: number, val: string) => {
        const next = [...events];
        if (typeof next[index] === 'object' && next[index] !== null) {
            next[index] = { ...next[index], summary: val };
        } else {
            next[index] = val;
        }
        setEvents(next);
        notifyChange(next);
    };

    const handleRemoveEvent = (index: number) => {
        const next = events.filter((_, i) => i !== index);
        setEvents(next);
        notifyChange(next);
    };

    const handleAddEvent = () => {
        const isObjectFormat = events.length > 0 && typeof events[0] === 'object';
        const newItem = isObjectFormat ? { meta: {}, significance_score: 0.5, summary: '' } : '';
        const next = [...events, newItem];
        setEvents(next);
        notifyChange(next);
    };

    // Render KV display (Editable Tags)
    const renderKV = (evt: any, idx: number) => {
        if (typeof evt !== 'object' || !evt) {return null;}
        const kv = evt.structured_kv || evt.meta || {};

        const fields = [
            { color: 'text-value border-value/20 bg-value/5', key: 'time_anchor', label: '时间' },
            { color: 'text-value border-value/20 bg-value/5', key: 'location', label: '地点' },
            { color: 'text-emphasis border-emphasis/20 bg-emphasis/5', key: 'role', label: '人物' },
            { color: 'text-primary border-primary/20 bg-primary/5', key: 'logic', label: '逻辑' },
            { color: 'text-orange-400 border-orange-400/20 bg-orange-400/5', key: 'causality', label: '因果' },
        ];

        return (
            <div className="flex flex-wrap items-center gap-2 mb-3 px-1">
                {fields.map(f => {
                    const rawVal = kv[f.key];
                    const val = Array.isArray(rawVal) ? rawVal.join(', ') : (rawVal || '');

                    return (
                        <div key={f.key} className={`flex items-center gap-1 px-1.5 py-0.5 rounded border ${f.color} transition-all focus-within:ring-1 focus-within:ring-offset-0 focus-within:ring-current`}>
                            <span className="text-[9px] font-bold uppercase opacity-60 pointer-events-none select-none">{f.label}:</span>
                            <input
                                value={val}
                                onChange={(e) => handleUpdateKV(idx, f.key, e.target.value)}
                                className="bg-transparent border-none outline-none text-[10px] w-[60px] focus:w-[120px] transition-all placeholder:italic placeholder:opacity-30"
                                placeholder="..."
                                spellCheck={false}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-md border border-border/50">
                请确认生成的摘要事件列表。您可以直接在标签内修改结构化数据，或在下方修改描述。
            </div>

            <div className="space-y-4 pr-2 pb-4">
                {events.map((evt, idx) => {
                    const isObject = typeof evt === 'object' && evt !== null;
                    const displayTitle = isObject ? (evt.structured_kv?.event || evt.meta?.event || `Event ${idx + 1}`) : `Event ${idx + 1}`;

                    return (
                        <div key={idx} className="relative group bg-card border border-border/50 rounded-lg p-3 shadow-sm hover:border-primary/40 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                                    <input
                                        value={displayTitle}
                                        onChange={(e) => handleUpdateKV(idx, 'event', e.target.value)}
                                        className="text-xs font-medium text-heading truncate uppercase tracking-wider bg-transparent border-none outline-none focus:text-primary max-w-[200px]"
                                        placeholder="事件名称"
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemoveEvent(idx)}
                                    className="p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 rounded"
                                    title="移除此片段"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {renderKV(evt, idx)}

                            <textarea
                                value={isObject ? (evt.summary || '') : evt}
                                onChange={(e) => handleChangeEvent(idx, e.target.value)}
                                className="w-full min-h-[60px] p-2 bg-muted/20 border border-transparent hover:border-border focus:border-primary focus:bg-background rounded-md text-sm resize-none focus:outline-none transition-colors"
                                rows={Math.max(2, Math.ceil((isObject ? (evt.summary || '').length : evt.length) / 40))}
                                placeholder="摘要详情..."
                            />
                        </div>
                    );
                })}

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
        </div >
    );
};

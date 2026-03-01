/**
 * EventEditor - 事件编辑面板
 *
 * V0.8.5:
 * - KV 自动烧录进 summary（始终开启）
 * - 编辑即时反馈到父组件
 */
import type { EventNode } from '@/data/types/graph';
import { TextField } from '@/ui/components/form/FormComponents';
import { Divider } from '@/ui/components/layout/Divider';
import { useResponsive } from '@/ui/hooks/useResponsive';
import { ArrowLeft, Trash2 } from 'lucide-react';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

// ==================== 类型定义 ====================

interface EventEditorProps {
    event: EventNode | null;
    isFullScreen?: boolean;
    /** 编辑回调（暂存修改，不立即保存） */
    onSave?: (id: string, updates: Partial<EventNode>) => void;
    onDelete?: (id: string) => void;
    onClose?: () => void;
}

/** 暴露给父组件的方法 */
export interface EventEditorHandle {
    save: () => void;
    isDirty: () => boolean;
}

interface FieldOverrides {
    eventType?: string;
    timeAnchor?: string;
    location?: string;
    roleText?: string;
    logicText?: string;
    score?: number;
    summary?: string;  // V1.2.9: Add summary to avoid stale closure
}

// ==================== 样式 ====================

const inputStyle: React.CSSProperties = {
    background: 'transparent',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    borderRadius: 0,
    boxShadow: 'none',
    outline: 'none',
    padding: '8px 0',
    fontSize: '14px',
    width: '100%',
    color: 'var(--foreground, inherit)',
};

const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '80px',
};

// ==================== KV 烧录函数 ====================

/**
 * 根据 KV 字段自动生成 summary
 */
function generateSummaryFromKV(kv: Partial<EventNode['structured_kv']>): string {
    const parts: string[] = [];

    // 时间和地点
    const locationStr = Array.isArray(kv.location) ? kv.location.join(', ') : kv.location;
    if (kv.time_anchor && locationStr) {
        parts.push(`【${kv.time_anchor}·${locationStr}】`);
    } else if (kv.time_anchor) {
        parts.push(`【${kv.time_anchor}】`);
    } else if (locationStr) {
        parts.push(`【${locationStr}】`);
    }

    // 人物
    if (kv.role && kv.role.length > 0) {
        parts.push(kv.role.join('、'));
    }

    // 事件
    if (kv.event) {
        parts.push(kv.event);
    }

    // 逻辑标签
    if (kv.logic && kv.logic.length > 0) {
        parts.push(`(${kv.logic.join('/')})`);
    }

    return parts.join(' ');
}

// ==================== 组件 ====================

export const EventEditor = forwardRef<EventEditorHandle, EventEditorProps>(({
    event,
    isFullScreen = false,
    onSave,
    onDelete,
    onClose,
}, ref) => {
    const { isMobile } = useResponsive();
    // 编辑状态
    const [summary, setSummary] = useState('');
    const [eventType, setEventType] = useState('');
    const [timeAnchor, setTimeAnchor] = useState('');
    const [location, setLocation] = useState('');
    const [roleText, setRoleText] = useState('');
    const [logicText, setLogicText] = useState('');
    const [score, setScore] = useState(0.5);
    const [isDirty, setIsDirty] = useState(false);
    const [lastEventId, setLastEventId] = useState<string | null>(null);

    const isComposingRef = useRef(false);
    const isMountedRef = useRef(true);
    const blurTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
        };
    }, []);

    // 同步事件数据到表单
    useEffect(() => {
        if (event && event.id !== lastEventId) {
            setSummary(event.summary);
            setEventType(event.structured_kv.event || '');
            setTimeAnchor(event.structured_kv.time_anchor || '');
            // V1.0.2: location 现在是数组，显示为逗号分隔
            const locArray = event.structured_kv.location || [];
            setLocation(Array.isArray(locArray) ? locArray.join(', ') : String(locArray || ''));
            setRoleText(event.structured_kv.role?.join(', ') || '');
            setLogicText(event.structured_kv.logic?.join(', ') || '');
            setScore(event.significance_score);
            setIsDirty(false);
            setLastEventId(event.id);
        }
    }, [event, lastEventId]);

    const handleDelete = () => {
        if (confirm('确定删除这个事件吗？此操作不可撤销。')) {
            onDelete?.(event!.id);
        }
    };

    const syncToParent = useCallback((overrides: FieldOverrides = {}) => {
        if (!event) return;

        const fields = {
            eventType: overrides.eventType ?? eventType,
            timeAnchor: overrides.timeAnchor ?? timeAnchor,
            location: overrides.location ?? location,
            roleText: overrides.roleText ?? roleText,
            logicText: overrides.logicText ?? logicText,
            score: overrides.score ?? score,
        };

        const splitTrim = (s: string) => s.split(',').map(v => v.trim()).filter(Boolean);

        const kv = {
            event: fields.eventType,
            time_anchor: fields.timeAnchor,
            location: splitTrim(fields.location),
            role: splitTrim(fields.roleText),
            logic: splitTrim(fields.logicText),
            causality: event.structured_kv?.causality || '',
        };

        // V1.2.9: Use overrides.summary if provided, else auto-generate, else use state
        const autoSummary = generateSummaryFromKV(kv);
        const finalSummary = overrides.summary ?? (autoSummary || summary);

        onSave?.(event.id, {
            summary: finalSummary,
            structured_kv: { ...event.structured_kv, ...kv },
            significance_score: fields.score,
        });
    }, [event, eventType, timeAnchor, location, roleText, logicText, score, summary, onSave]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        save: () => syncToParent(),
        isDirty: () => isDirty,
    }), [syncToParent, isDirty]);

    const handleCompositionStart = () => {
        isComposingRef.current = true;
    };

    const handleCompositionEnd = (
        e: React.CompositionEvent<HTMLInputElement>,
        setter: (v: string) => void,
        fieldName: keyof FieldOverrides
    ) => {
        isComposingRef.current = false;
        if (!isMountedRef.current) return;

        const value = e.currentTarget.value;
        setter(value);
        setIsDirty(true);
        syncToParent({ [fieldName]: value });
    };

    const updateField = (setter: (v: string) => void, value: string, fieldName: keyof FieldOverrides) => {
        setter(value);
        setIsDirty(true);
        if (!isComposingRef.current) syncToParent({ [fieldName]: value });
    };

    const handleBlur = () => {
        if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = window.setTimeout(() => {
            if (isMountedRef.current && isDirty) syncToParent();
        }, 50);
    };

    const updateScore = (value: number) => {
        setScore(value);
        setIsDirty(true);
        syncToParent({ score: value });
    };

    if (!event) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2 p-8">
                <p className="text-sm font-light">选择一个事件查看详情</p>
            </div>
        );
    }

    // 共享的表单内容
    const formContent = (
        <>
            {/* 事件类型 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">事件类型</label>
                <input
                    type="text"
                    value={eventType}
                    onChange={(e) => updateField(setEventType, e.target.value, 'eventType')}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={(e) => handleCompositionEnd(e, setEventType, 'eventType')}
                    onBlur={handleBlur}
                    style={inputStyle}
                    className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                    placeholder="如：任务确认、战斗结束"
                />
            </div>

            {/* 摘要 */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <label className="text-xs text-muted-foreground">摘要内容</label>
                    <button
                        onClick={() => {
                            const autoSummary = generateSummaryFromKV({
                                event: eventType,
                                time_anchor: timeAnchor,
                                location: location.split(',').map(s => s.trim()).filter(Boolean),
                                role: roleText.split(',').map(s => s.trim()).filter(Boolean),
                                logic: logicText.split(',').map(s => s.trim()).filter(Boolean),
                            });
                            setSummary(autoSummary);
                            setIsDirty(true);
                            // V1.2.9: Pass summary directly to avoid stale closure
                            syncToParent({ summary: autoSummary });
                        }}
                        className="text-[10px] text-primary hover:underline"
                    >
                        使用 KV 生成
                    </button>
                </div>
                <TextField
                    label=""
                    value={summary}
                    onChange={(value: string) => {
                        setSummary(value);
                        setIsDirty(true);
                        // Summary 变更不立即 sync，依赖 blur 或 save?
                        // 为了保持一致性，还是 sync 吧，但要注意 updateField 逻辑
                        // 这里直接手动 sync
                        onSave?.(event.id, {
                            summary: value,
                            structured_kv: {
                                event: eventType,
                                time_anchor: timeAnchor,
                                location: location.split(',').map(s => s.trim()).filter(Boolean),  // V1.0.2
                                role: roleText.split(',').map(s => s.trim()).filter(Boolean),
                                logic: logicText.split(',').map(s => s.trim()).filter(Boolean),
                                causality: event.structured_kv?.causality || '',
                            },
                            significance_score: score,
                        });
                    }}
                    multiline
                    rows={6}
                    placeholder="输入事件摘要..."
                    className="font-mono text-sm"
                />
            </div>

            {/* 时间锚点 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">时间锚点</label>
                <input
                    type="text"
                    value={timeAnchor}
                    onChange={(e) => updateField(setTimeAnchor, e.target.value, 'timeAnchor')}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={(e) => handleCompositionEnd(e, setTimeAnchor, 'timeAnchor')}
                    onBlur={handleBlur}
                    style={inputStyle}
                    className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                    placeholder="如：太阳历1023年4月4日"
                />
            </div>

            {/* 地点 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">地点</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => updateField(setLocation, e.target.value, 'location')}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={(e) => handleCompositionEnd(e, setLocation, 'location')}
                    onBlur={handleBlur}
                    style={inputStyle}
                    className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                    placeholder="地点（逗号分隔多个），如：边境公会大厅, 小镇酒馆"
                />
            </div>

            {/* 人物 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">人物（逗号分隔）</label>
                <input
                    type="text"
                    value={roleText}
                    onChange={(e) => updateField(setRoleText, e.target.value, 'roleText')}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={(e) => handleCompositionEnd(e, setRoleText, 'roleText')}
                    onBlur={handleBlur}
                    style={inputStyle}
                    className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                    placeholder="如：{{user}}, 赫伯"
                />
            </div>

            {/* 逻辑标签 */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">逻辑标签（逗号分隔）</label>
                <input
                    type="text"
                    value={logicText}
                    onChange={(e) => updateField(setLogicText, e.target.value, 'logicText')}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={(e) => handleCompositionEnd(e, setLogicText, 'logicText')}
                    onBlur={handleBlur}
                    style={inputStyle}
                    className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                    placeholder="如：起点, 伏笔"
                />
            </div>

            {/* 重要性分数 */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <label className="text-xs text-muted-foreground">重要性分数</label>
                    <span className="text-xs font-mono text-foreground">{score.toFixed(2)}</span>
                </div>
                <div className="relative h-4 flex items-center group cursor-pointer">
                    <div
                        className="absolute inset-x-0 h-[1px]"
                        style={{ backgroundColor: 'var(--border)' }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground"
                        style={{ left: `${score * 100}%`, transform: `translate(-50%, -50%)` }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={score}
                        onChange={(e) => updateScore(parseFloat(e.target.value))}
                        className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                        style={{ appearance: 'none', WebkitAppearance: 'none' }}
                    />
                </div>
            </div>

            <Divider spacing="md" />

            {/* 只读信息 */}
            <div className="space-y-1 text-xs text-muted-foreground">
                <p>ID: <span className="font-mono">{event.id.substring(0, 8)}...</span></p>
                <p>Level: {event.level}</p>
                {event.source_range && (
                    <p>来源: {event.source_range.start_index}-{event.source_range.end_index}楼</p>
                )}
                <p>创建时间: {new Date(event.timestamp).toLocaleString()}</p>
                <p>
                    状态:
                    {event.is_archived && <span className="ml-1 text-yellow-500">已归档</span>}
                    {event.is_embedded && <span className="ml-1 text-green-500">已嵌入</span>}
                    {!event.is_archived && !event.is_embedded && <span className="ml-1">活跃</span>}
                </p>
            </div>
        </>
    );

    // 全屏模式（移动端）
    if (isFullScreen) {
        return (
            <div className="h-full flex flex-col bg-transparent">
                {/* 头部 */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 shrink-0">
                    <button
                        onClick={onClose}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h2 className="text-sm font-medium text-foreground flex-1">编辑事件</h2>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                {/* 表单内容 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {formContent}
                </div>

                {/* 底部操作栏 */}
                <div className="p-4 border-t border-border shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                        返回列表
                    </button>
                </div>
            </div>
        );
    }

    // 侧边栏模式（桌面端）
    return (
        <div className="h-full flex flex-col min-h-0">
            {/* 头部 (桌面端显示，移动端由外部 Layout 处理) */}
            {!isMobile && (
                <div className="flex items-center gap-2 pb-4 border-b border-border shrink-0">
                    <button
                        onClick={onClose}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h3 className="text-sm font-medium text-primary flex-1">编辑事件</h3>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                        title="删除"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}

            {/* 表单内容 - 独立滚动 */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
                {formContent}
            </div>
        </div>
    );
});

EventEditor.displayName = 'EventEditor';


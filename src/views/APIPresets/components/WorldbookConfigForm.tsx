import React, { useState } from 'react';
import { SwitchField, FormSection } from './FormField';
import type { WorldbookConfig } from '@/services/api/types';
import { ChevronRight, ChevronDown, Book, FileText, Ban, RefreshCw, AlertCircle, Search } from 'lucide-react';

interface WorldbookConfigFormProps {
    config: WorldbookConfig;
    onChange: (config: WorldbookConfig) => void;
    worldbookStructure?: Record<string, any[]>;
    disabledEntries?: Record<string, number[]>;
    onToggleWorldbook?: (name: string, disabled: boolean) => void;
    onToggleEntry?: (worldbook: string, uid: number, disabled: boolean) => void;
    onRefresh?: () => void;
}

export const WorldbookConfigForm: React.FC<WorldbookConfigFormProps> = ({
    config,
    onChange,
    worldbookStructure = {},
    disabledEntries = {},
    onToggleWorldbook,
    onToggleEntry,
    onRefresh
}) => {
    const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());
    const [filterText, setFilterText] = useState('');

    const handleToggle = (key: keyof WorldbookConfig) => {
        onChange({
            ...config,
            [key]: !config[key],
        });
    };

    const toggleExpand = (book: string) => {
        const newSet = new Set(expandedBooks);
        if (newSet.has(book)) {
            newSet.delete(book);
        } else {
            newSet.add(book);
        }
        setExpandedBooks(newSet);
    };

    const isWorldbookDisabled = (name: string) => {
        return config.disabledWorldbooks?.includes(name) || false;
    };

    const isEntryDisabled = (book: string, uid: number) => {
        return disabledEntries[book]?.includes(uid) || false;
    };

    // 过滤和排序处理
    const worldbooks = Object.keys(worldbookStructure).sort();
    const filteredWorldbooks = worldbooks.filter(book =>
        book.toLowerCase().includes(filterText.toLowerCase()) ||
        worldbookStructure[book].some((e: any) =>
            e.names?.join(' ').toLowerCase().includes(filterText.toLowerCase()) ||
            e.comment?.toLowerCase().includes(filterText.toLowerCase())
        )
    );

    return (
        <div className="flex flex-col gap-6">
            <FormSection title="基础设置" description="控制世界书功能的全局开关">
                <SwitchField
                    label="启用世界书增强"
                    description="是否在生成摘要时注入世界书内容"
                    checked={config.enabled}
                    onChange={() => handleToggle('enabled')}
                />

                <SwitchField
                    label="包含全局世界书"
                    description="是否引入全局世界书（相当于 全选/全不选 全局世界书）"
                    checked={config.includeGlobal}
                    onChange={() => handleToggle('includeGlobal')}
                    disabled={!config.enabled}
                />
            </FormSection>

            {config.enabled && (
                <FormSection title="世界书管理" description="精细控制每个世界书及其条目的启用状态">

                    {/* 工具栏 */}
                    <div className="flex items-center justify-between mb-4 gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="搜索世界书或条目..."
                                className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={onRefresh}
                            className="inline-flex items-center justify-center rounded-md w-9 h-9 hover:bg-accent hover:text-accent-foreground transition-colors"
                            title="刷新列表"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>

                    {/* 世界书列表 */}
                    <div className="flex flex-col gap-2">
                        {filteredWorldbooks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 border border-dashed rounded-lg">
                                <AlertCircle size={24} className="opacity-50" />
                                <span className="text-sm">未找到匹配的世界书</span>
                            </div>
                        ) : (
                            filteredWorldbooks.map(book => {
                                const isDisabled = isWorldbookDisabled(book);
                                const entries = worldbookStructure[book] || [];
                                const isExpanded = expandedBooks.has(book);
                                const activeEntriesCount = entries.filter((e: any) => !isEntryDisabled(book, e.uid)).length;

                                return (
                                    <div key={book} className={`transition-all border-b border-border last:border-0 ${isDisabled ? 'bg-muted/10 opacity-60 grayscale' : ''}`}>
                                        {/* 世界书头部 */}
                                        <div className="flex items-center justify-between p-3">
                                            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                                <button
                                                    onClick={() => toggleExpand(book)}
                                                    className="p-1 hover:bg-accent rounded-sm transition-colors"
                                                >
                                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                </button>
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <Book size={16} className={isDisabled ? 'text-muted-foreground' : 'text-primary'} />
                                                    <span className={`font-medium truncate ${isDisabled ? 'text-muted-foreground line-through' : ''}`}>
                                                        {book}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full whitespace-nowrap">
                                                        {activeEntriesCount} / {entries.length} 激活
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <SwitchField
                                                    label=""
                                                    checked={!isDisabled}
                                                    onChange={(checked) => onToggleWorldbook?.(book, !checked)}
                                                    compact
                                                />
                                            </div>
                                        </div>

                                        {/* 条目列表 (展开时显示) */}
                                        {isExpanded && !isDisabled && (
                                            <div className="pl-4 pr-1 py-1 flex flex-col gap-0 animate-in slide-in-from-top-1 duration-200">
                                                {entries.length === 0 ? (
                                                    <div className="text-xs text-muted-foreground text-center py-4">暂无条目</div>
                                                ) : (
                                                    entries.map((entry: any) => {
                                                        const isEntryItemDisabled = isEntryDisabled(book, entry.uid);
                                                        return (
                                                            <div key={entry.uid} className={`flex items-start justify-between py-2 -mx-2 px-2 rounded hover:bg-accent/40 transition-colors group ${isEntryItemDisabled ? 'bg-muted/10 opacity-60 grayscale' : ''}`}>
                                                                <div className="flex flex-col gap-1 min-w-0 flex-1 pr-4">
                                                                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                                                                        {/* 状态指示灯 */}
                                                                        <div
                                                                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${entry.constant ? 'bg-primary' : 'bg-emerald-500'}`}
                                                                            title={entry.constant ? "常驻 (Constant)" : "条件触发 (Selective)"}
                                                                        />

                                                                        {/* 条目名称 - 添加 truncate 防止溢出 */}
                                                                        <span className={`text-sm font-medium truncate max-w-full ${isEntryItemDisabled ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                                                            {entry.name || `条目 #${entry.uid}`}
                                                                        </span>

                                                                        {/* 关键词 Badge */}
                                                                        {(entry.keys || []).length > 0 && (
                                                                            <div className="flex items-center gap-1 ml-auto md:ml-2 overflow-hidden max-w-full">
                                                                                {(entry.keys).slice(0, 3).map((key: string, i: number) => (
                                                                                    <span key={i} className="text-[10px] px-1 py-0.5 rounded border border-border bg-muted/20 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]">
                                                                                        {key}
                                                                                    </span>
                                                                                ))}
                                                                                {(entry.keys).length > 3 && (
                                                                                    <span className="text-[10px] text-muted-foreground">+{entry.keys.length - 3}</span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {/* 内容预览 - 添加 break-words 和 truncate */}
                                                                    {(entry.comment || entry.content) && (
                                                                        <p className="text-xs text-muted-foreground/80 pl-3.5 break-words line-clamp-2">
                                                                            {entry.comment || entry.content}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <SwitchField
                                                                        label=""
                                                                        checked={!isEntryItemDisabled}
                                                                        onChange={(checked) => onToggleEntry?.(book, entry.uid, !checked)}
                                                                        compact
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </FormSection>
            )}
        </div>
    );
};

export default WorldbookConfigForm;

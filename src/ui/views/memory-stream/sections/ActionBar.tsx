import { MacroService } from '@/integrations/tavern/macros';
import { ArrowDownUp, Database, FileText, Filter, RefreshCw, Save, Sparkles, Trash2 } from 'lucide-react';
import React from 'react';
import type { SortOrder, ViewTab } from '../hooks/useMemoryStream';

interface ActionBarProps {
    viewTab: ViewTab;
    isMobile: boolean;
    hasChanges: boolean;
    pendingCount: number;
    checkedCount: number;
    isLoading: boolean;
    isReembedding: boolean;
    sortOrder: SortOrder;
    showActiveOnly: boolean;
    showMobileActions: boolean;

    // Callbacks
    onSave: () => void;
    onRefresh: () => void;
    onBatchDelete: () => void;
    onImportClick: () => void;
    onReembed: () => void;
    onSortToggle: () => void;
    onActiveToggle: () => void;
    onPreviewClick: (content: string) => void;
    onMobileActionsToggle: () => void;
    onMobileActionsClose: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
    viewTab,
    isMobile,
    hasChanges,
    pendingCount,
    checkedCount,
    isLoading,
    isReembedding,
    sortOrder,
    showActiveOnly,
    showMobileActions,
    onSave,
    onRefresh,
    onBatchDelete,
    onImportClick,
    onReembed,
    onSortToggle,
    onActiveToggle,
    onPreviewClick,
    onMobileActionsToggle,
    onMobileActionsClose,
}) => {

    const handlePreviewOpen = () => {
        const summaries = MacroService.getSummaries() || '(无剧情摘要)';
        const entities = MacroService.getEntityStates() || '(无实体状态)';
        onPreviewClick(`--- [Engram Summaries] ---\n${summaries}\n\n--- [Engram Entity States] ---\n${entities}`);
    };

    return (
        <div className="flex items-center gap-1.5 md:gap-2 relative">
            {/* 保存按钮 - 有修改时显示 */}
            {hasChanges && (
                <button
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors"
                    onClick={onSave}
                >
                    <Save size={12} />
                    {isMobile ? pendingCount : `保存 (${pendingCount})`}
                </button>
            )}

            {/* 刷新按钮 */}
            <button
                onClick={onRefresh}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                title="刷新"
            >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>

            {/* 批量删除 */}
            {checkedCount > 0 && (
                <button
                    onClick={onBatchDelete}
                    className="flex items-center gap-1 px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                >
                    <Trash2 size={12} />
                    {!isMobile && `删除 (${checkedCount})`}
                </button>
            )}

            {!isMobile ? (
                // =============== 桌面端工具栏 ===============
                <div className="flex items-center gap-2 ml-1">
                    <button
                        onClick={onImportClick}
                        className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors"
                        title="导入历史分卷/外部库"
                    >
                        <Database size={12} />
                        合并导入
                    </button>

                    {viewTab === 'list' && (
                        <button
                            onClick={onReembed}
                            disabled={isReembedding}
                            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors disabled:opacity-50"
                            title="重新嵌入所有事件"
                        >
                            <Sparkles size={12} className={isReembedding ? 'animate-pulse' : ''} />
                            {isReembedding ? '嵌入中...' : '重嵌'}
                        </button>
                    )}

                    <div className="w-[1px] h-4 bg-border mx-1" />

                    {viewTab === 'list' && (
                        <button
                            onClick={onSortToggle}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                            title={sortOrder === 'asc' ? '当前: 旧 -> 新' : '当前: 新 -> 旧'}
                        >
                            <ArrowDownUp size={14} className={sortOrder === 'desc' ? 'rotate-180 text-primary' : ''} />
                        </button>
                    )}

                    {viewTab === 'list' && (
                        <button
                            onClick={onActiveToggle}
                            className={`p-1.5 rounded-md transition-colors ${showActiveOnly ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                            title={showActiveOnly ? '显示全部' : '只看激活 (Recall)'}
                        >
                            <Filter size={14} />
                        </button>
                    )}

                    <button
                        onClick={handlePreviewOpen}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                        title="查看当前注入内容"
                    >
                        <FileText size={14} />
                    </button>
                </div>
            ) : (
                // =============== 移动端折叠菜单 ===============
                <div className="relative">
                    <button
                        onClick={onMobileActionsToggle}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                    </button>

                    {showMobileActions && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={onMobileActionsClose} />
                            <div className="absolute right-0 top-full mt-2 w-40 bg-background border border-border rounded-md shadow-lg py-1 z-50 flex flex-col">
                                <button
                                    onClick={() => { onImportClick(); onMobileActionsClose(); }}
                                    className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted text-left"
                                >
                                    <Database size={14} className="text-muted-foreground" />
                                    合并导入
                                </button>

                                {viewTab === 'list' && (
                                    <>
                                        <button
                                            onClick={() => { onReembed(); onMobileActionsClose(); }}
                                            disabled={isReembedding}
                                            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted text-left disabled:opacity-50"
                                        >
                                            <Sparkles size={14} className={isReembedding ? 'text-primary animate-pulse' : 'text-muted-foreground'} />
                                            {isReembedding ? '嵌入中...' : '重嵌'}
                                        </button>

                                        <button
                                            onClick={() => { onSortToggle(); onMobileActionsClose(); }}
                                            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted text-left"
                                        >
                                            <ArrowDownUp size={14} className={sortOrder === 'desc' ? 'rotate-180 text-primary' : 'text-muted-foreground'} />
                                            排序: {sortOrder === 'asc' ? '旧到新' : '新到旧'}
                                        </button>

                                        <button
                                            onClick={() => { onActiveToggle(); onMobileActionsClose(); }}
                                            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted text-left"
                                        >
                                            <Filter size={14} className={showActiveOnly ? 'text-primary' : 'text-muted-foreground'} />
                                            {showActiveOnly ? '显示全部' : '只看激活'}
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={() => { handlePreviewOpen(); onMobileActionsClose(); }}
                                    className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted text-left"
                                >
                                    <FileText size={14} className="text-muted-foreground" />
                                    宏预览
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

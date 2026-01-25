/**
 * CustomMacroList - 自定义宏列表组件
 * V0.9.2: 简化为卡片列表，点击后右侧编辑
 */

import React from 'react';
import { Braces, Trash2, Power, Plus } from 'lucide-react';
import type { CustomMacro } from '@/config/types/prompt';

interface CustomMacroListProps {
    macros: CustomMacro[];
    selectedId: string | null;
    onSelect: (macro: CustomMacro) => void;
    onAdd: () => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const CustomMacroList: React.FC<CustomMacroListProps> = ({
    macros,
    selectedId,
    onSelect,
    onAdd,
    onToggle,
    onDelete,
}) => {
    return (
        <div className="flex flex-col gap-4 h-full">
            {/* 头部操作栏 */}
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">自定义宏</h3>
                <button
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={onAdd}
                    title="添加新宏"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* 说明 */}
            <div className="text-xs text-muted-foreground bg-muted/30 rounded px-2 py-1.5 border border-border/50 leading-relaxed">
                自定义宏可在模板中使用 <code className="bg-muted px-1 rounded">{`{{宏名}}`}</code> 引用
            </div>

            {/* 宏列表 */}
            <div className="flex flex-col gap-1 overflow-y-auto flex-1 no-scrollbar">
                {macros.map((macro) => (
                    <div
                        key={macro.id}
                        className={`
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${selectedId === macro.id
                                ? 'bg-accent/50 border-input'
                                : 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border'
                            }
                            ${!macro.enabled && 'opacity-50'}
                        `}
                        onClick={() => onSelect(macro)}
                    >
                        {/* 状态图标 */}
                        <button
                            className={`
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                                ${macro.enabled
                                    ? selectedId === macro.id ? 'bg-primary/20 text-primary' : 'bg-muted text-primary'
                                    : 'bg-muted text-muted-foreground'
                                }
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggle(macro.id);
                            }}
                            title={macro.enabled ? '点击禁用' : '点击启用'}
                        >
                            <Power size={14} />
                        </button>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <code className={`text-sm font-medium truncate ${selectedId === macro.id ? 'text-primary' : 'text-foreground'}`}>
                                    {`{{${macro.name}}}`}
                                </code>
                            </div>
                            <p className="mt-0.5 text-[10px] text-muted-foreground truncate">
                                {macro.content ? macro.content.slice(0, 50) + (macro.content.length > 50 ? '...' : '') : '(空内容)'}
                            </p>
                        </div>

                        {/* 删除按钮 */}
                        <button
                            className={`p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors ${selectedId === macro.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(macro.id);
                            }}
                            title="删除"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                ))}

                {macros.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg">
                        <Braces size={24} className="opacity-50" />
                        <p className="text-xs">暂无自定义宏</p>
                        <button
                            className="text-xs text-primary hover:underline"
                            onClick={onAdd}
                        >
                            添加第一个宏
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


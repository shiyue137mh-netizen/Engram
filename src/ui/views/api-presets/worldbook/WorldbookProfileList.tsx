import React from 'react';
import { Book, Plus, Trash2, Edit2, RotateCcw } from 'lucide-react';
import type { WorldbookConfigProfile } from '@/config/types/prompt';

interface WorldbookProfileListProps {
    profiles: WorldbookConfigProfile[];
    selectedId: string | null;
    onSelect: (profile: WorldbookConfigProfile) => void;
    onAdd: () => void;
    onDelete: (id: string) => void;
}

export const WorldbookProfileList: React.FC<WorldbookProfileListProps> = ({
    profiles,
    selectedId,
    onSelect,
    onAdd,
    onDelete,
}) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">知识库方案</h3>
                <button
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                    onClick={onAdd}
                    title="新建方案"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {profiles.map(profile => (
                    <div
                        key={profile.id}
                        className={`
                            group relative p-3 rounded-lg border transition-all cursor-pointer
                            ${selectedId === profile.id
                                ? 'bg-primary/10 border-primary shadow-sm'
                                : 'bg-card border-border hover:border-primary/50 hover:bg-muted/50'
                            }
                        `}
                        onClick={() => onSelect(profile)}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`
                                p-2 rounded-md flex-shrink-0 transition-colors
                                ${selectedId === profile.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}
                            `}>
                                <Book size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className={`font-medium text-sm truncate ${selectedId === profile.id ? 'text-primary' : 'text-foreground'}`}>
                                    {profile.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground/70 bg-muted px-1.5 py-0.5 rounded">
                                        {profile.mode === 'custom' ? '自定义' : '跟随全局'}
                                    </span>
                                    {profile.mode === 'custom' && (
                                        <span className="text-xs text-muted-foreground truncate">
                                            {profile.selectedWorldbooks.length} 个世界书
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-all absolute right-2 top-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('确认删除此方案？')) {
                                        onDelete(profile.id);
                                    }
                                }}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {profiles.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed border-muted rounded-lg">
                        <p>暂无配置方案</p>
                        <button
                            className="mt-2 text-primary hover:underline text-xs"
                            onClick={onAdd}
                        >
                            创建第一个方案
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

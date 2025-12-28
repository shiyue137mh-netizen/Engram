import React from 'react';
import { Regex, Trash2, Power } from 'lucide-react';
import type { RegexRule } from '../../core/summarizer/RegexProcessor';

interface RegexRuleListProps {
    rules: RegexRule[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
    onReset: () => void;
}

export const RegexRuleList: React.FC<RegexRuleListProps> = ({
    rules,
    selectedId,
    onSelect,
    onToggle,
    onDelete,
    onAdd,
    onReset,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">正则规则列表</h3>
                <div className="flex gap-2">
                    <button
                        className="text-[10px] text-muted-foreground hover:text-destructive transition-colors"
                        onClick={onReset}
                    >
                        重置默认
                    </button>
                    <button
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        onClick={onAdd}
                    >
                        <Regex size={16} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                {rules.map((rule) => (
                    <div
                        key={rule.id}
                        className={`
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${selectedId === rule.id
                                ? 'bg-accent/50 border-input'
                                : 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border'
                            }
                        `}
                        onClick={() => onSelect(rule.id)}
                    >
                        {/* Status/Toggle Icon */}
                        <button
                            className={`
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${rule.enabled
                                    ? selectedId === rule.id ? 'bg-primary/20 text-primary' : 'bg-muted text-primary'
                                    : 'bg-muted text-muted-foreground'
                                }
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggle(rule.id);
                            }}
                            title={rule.enabled ? "点击禁用" : "点击启用"}
                        >
                            <Power size={14} />
                        </button>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h4 className={`text-sm font-medium truncate ${selectedId === rule.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'} ${!rule.enabled && 'opacity-50 line-through'}`}>
                                    {rule.name}
                                </h4>
                            </div>
                            <div className="mt-0.5 flex items-center gap-2">
                                <code className="text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]">
                                    /{rule.pattern}/{rule.flags}
                                </code>
                            </div>
                        </div>

                        {/* Delete Action */}
                        <div className={`flex items-center ${selectedId === rule.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                            <button
                                className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(rule.id);
                                }}
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </div>
                ))}

                {rules.length === 0 && (
                    <div className="text-center p-8 border border-dashed border-border rounded-lg">
                        <p className="text-xs text-muted-foreground">无规则</p>
                    </div>
                )}
            </div>
        </div>
    );
};

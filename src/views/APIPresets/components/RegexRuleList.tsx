import React from 'react';
import { Regex, Trash2, Power } from 'lucide-react';
import type { RegexRule } from '@/services/pipeline/RegexProcessor';

interface RegexRuleListProps {
    rules: RegexRule[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
    onReset: () => void;
    enableNativeRegex?: boolean;
    onToggleNativeRegex?: (enabled: boolean) => void;
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


            {/* Native Compatibility Toggle */}
            <div className="bg-muted/10 border border-border/50 rounded-lg p-3 mb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium">酒馆原生 Regex 兼容</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">启用后将应用 SillyTavern 的 Regex 脚本（在 Engram 规则之前执行）</p>
                    </div>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={enableNativeRegex}
                        onClick={() => onToggleNativeRegex?.(!enableNativeRegex)}
                        className={`
                            relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
                            ${enableNativeRegex ? 'bg-primary' : 'bg-input'}
                        `}
                    >
                        <span
                            className={`
                                pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform
                                ${enableNativeRegex ? 'translate-x-4' : 'translate-x-0'}
                            `}
                        />
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
                            ${!rule.enabled && 'opacity-50'}
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
        </div >
    );
};

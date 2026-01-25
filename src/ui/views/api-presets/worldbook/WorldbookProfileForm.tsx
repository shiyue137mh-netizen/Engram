
import React, { useState, useEffect } from 'react';
import { Book, Check, Search, Info } from 'lucide-react';
import { TextField, SelectField, FormSection } from '@/ui/components/form/FormComponents';
import type { WorldbookConfigProfile } from '@/config/types/prompt';
import { WorldInfoService } from '@/integrations/tavern/api/WorldInfo';

interface WorldbookProfileFormProps {
    profile: WorldbookConfigProfile;
    onChange: (id: string, updates: Partial<WorldbookConfigProfile>) => void;
    availableWorldbooks: string[]; // List of all WB names
}

export const WorldbookProfileForm: React.FC<WorldbookProfileFormProps> = ({
    profile,
    onChange,
    availableWorldbooks
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWorldbooks = availableWorldbooks.filter(wb =>
        wb.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleWorldbook = (wbName: string) => {
        const current = profile.selectedWorldbooks || [];
        const isSelected = current.includes(wbName);
        let next;
        if (isSelected) {
            next = current.filter(n => n !== wbName);
        } else {
            next = [...current, wbName];
        }
        onChange(profile.id, { selectedWorldbooks: next });
    };

    return (
        <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
                        <Book size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight">编辑知识库方案</h2>
                        <p className="text-sm text-muted-foreground">配置特定的世界书集合，用于绑定到提示词模板</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        label="方案名称"
                        value={profile.name}
                        onChange={(val) => onChange(profile.id, { name: val })}
                        placeholder="例如：科幻背景设定集"
                    />
                    <SelectField
                        label="生效模式"
                        value={profile.mode}
                        onChange={(val: any) => onChange(profile.id, { mode: val })}
                        options={[
                            { value: 'custom', label: '自定义白名单 (推荐)' },
                            { value: 'inherit_global', label: '跟随全局设置 (不推荐)' },
                        ]}
                    />
                </div>

                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5 p-2 bg-blue-500/5 text-blue-600 dark:text-blue-400 rounded border border-blue-500/10">
                    <Info size={14} className="flex-shrink-0" />
                    <span>在"自定义白名单"模式下，只有选中的世界书会被扫描（无论它们在全局是否启用）。</span>
                </div>
            </div>

            {/* Whitelist Editor */}
            {profile.mode === 'custom' && (
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="p-3 border-b border-border flex items-center gap-2 bg-muted/10">
                        <Search size={16} className="text-muted-foreground ml-2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="搜索世界书..."
                            className="flex-1 bg-transparent border-none text-sm focus:outline-none placeholder:text-muted-foreground/50 h-8"
                        />
                        <div className="text-xs text-muted-foreground mr-2">
                            已选: {profile.selectedWorldbooks.length} / {availableWorldbooks.length}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                        <div className="grid grid-cols-1 gap-1">
                            {filteredWorldbooks.length > 0 ? (
                                filteredWorldbooks.map(wbName => {
                                    const isSelected = profile.selectedWorldbooks?.includes(wbName);
                                    return (
                                        <div
                                            key={wbName}
                                            onClick={() => toggleWorldbook(wbName)}
                                            className={`
                                                flex items - center gap - 3 p - 2.5 rounded - md cursor - pointer transition - colors border
                                                ${isSelected
                                                    ? 'bg-primary/5 border-primary/30'
                                                    : 'bg-transparent border-transparent hover:bg-muted'
                                                }
`}
                                        >
                                            <div className={`
w - 4 h - 4 rounded border flex items - center justify - center transition - colors
                                                ${isSelected
                                                    ? 'bg-primary border-primary text-primary-foreground'
                                                    : 'border-muted-foreground/50'
                                                }
`}>
                                                {isSelected && <Check size={10} strokeWidth={4} />}
                                            </div>
                                            <span className={`text - sm truncate ${isSelected ? 'font-medium text-foreground' : 'text-muted-foreground'} `}>
                                                {wbName}
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 text-muted-foreground text-sm">
                                    未找到匹配的世界书
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

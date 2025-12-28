import React from 'react';
import { Edit2, Copy, Trash2, Check, Server, Cloud } from 'lucide-react';
import type { LLMPreset } from './types';

interface PresetCardProps {
    preset: LLMPreset;
    isSelected: boolean;
    onSelect: () => void;
    onEdit: () => void;
    onCopy: () => void;
    onDelete: () => void;
}

export const PresetCard: React.FC<PresetCardProps> = ({
    preset,
    isSelected,
    onSelect,
    onEdit,
    onCopy,
    onDelete,
}) => {
    const SourceIcon = preset.source === 'tavern' || preset.source === 'tavern_profile' ? Server : Cloud;
    const sourceLabel = preset.source === 'tavern'
        ? '酒馆当前'
        : preset.source === 'tavern_profile'
            ? '酒馆配置'
            : '自定义';
    const modelName = preset.source === 'custom'
        ? preset.custom?.model || '未设置'
        : '使用当前';

    return (
        <div
            className={`
                group p-3 rounded-lg transition-all duration-200 cursor-pointer border
                ${isSelected
                    ? 'bg-accent/50 border-input shadow-sm'
                    : 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border'
                }
            `}
            onClick={onSelect}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                        ${isSelected
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground group-hover:text-foreground'
                        }
                    `}
                >
                    <SourceIcon size={16} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className={`m-0 text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {preset.name}
                        </h4>
                        {preset.isDefault && (
                            <span className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-sm font-medium">
                                DEFAULT
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground font-mono hidden md:inline-block">T:{preset.parameters.temperature}</span>
                        <span className="text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground truncate">{modelName}</span>
                    </div>
                </div>

                {isSelected && <Check size={14} className="text-primary" />}
            </div>

            {/* Action Buttons - Only visible on hover or selected */}
            <div className={`mt-2 flex justify-end gap-1 ${isSelected || 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" onClick={onEdit}><Edit2 size={12} /></button>
                <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" onClick={onCopy}><Copy size={12} /></button>
                {!preset.isDefault && (
                    <button className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors" onClick={onDelete}><Trash2 size={12} /></button>
                )}
            </div>
        </div>
    );
};

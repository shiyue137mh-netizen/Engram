import React, { useRef } from 'react';
import { FileText, Copy, Trash2, Download, Upload, Check, Power, RotateCcw } from 'lucide-react';
import type { PromptTemplate, PromptCategory, PromptTemplateSingleExport } from '@/services/api/types';
import { PROMPT_CATEGORIES, createPromptTemplate, getBuiltInTemplateByCategory } from '@/services/api/types';

interface PromptTemplateCardProps {
    template: PromptTemplate;
    isSelected?: boolean;
    onSelect?: () => void;
    onCopy?: () => void;
    onDelete?: () => void;
    onToggleEnabled?: (enabled: boolean) => void;
    onImport?: (template: PromptTemplate) => void;
    onResetToDefault?: (template: PromptTemplate) => void;
}

/**
 * 获取分类标签颜色类名
 */
function getCategoryColorClass(category: PromptCategory): string {
    switch (category) {
        case 'summary':
            return 'text-blue-500 bg-blue-500/10 border border-blue-500/20';
        case 'trim':
            return 'text-orange-500 bg-orange-500/10 border border-orange-500/20';
        case 'query_enhance':
            return 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20';
        default:
            return 'text-muted-foreground bg-muted border border-border';
    }
}

/**
 * 获取分类标签文本
 */
function getCategoryLabel(category: PromptCategory): string {
    return PROMPT_CATEGORIES.find((c: { value: PromptCategory; label: string }) => c.value === category)?.label || category;
}

export const PromptTemplateCard: React.FC<PromptTemplateCardProps> = ({
    template,
    isSelected = false,
    onSelect,
    onCopy,
    onDelete,
    onToggleEnabled,
    onImport,
    onResetToDefault,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 导出单个模板
    const handleExport = (e: React.MouseEvent) => {
        e.stopPropagation();
        const exportData: PromptTemplateSingleExport = {
            version: '1.0',
            exportedAt: Date.now(),
            template: {
                name: template.name,
                category: template.category,
                boundPresetId: template.boundPresetId,
                systemPrompt: template.systemPrompt,
                userPromptTemplate: template.userPromptTemplate,
                outputFormat: template.outputFormat,
                availableVariables: template.availableVariables,
            },
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `engram_template_${template.name.replace(/\s+/g, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // 导入模板（覆盖当前）
    const handleImportClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !onImport) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string) as PromptTemplateSingleExport;
                if (data.version && data.template) {
                    const importedTemplate = createPromptTemplate(
                        data.template.name,
                        data.template.category as PromptCategory,
                        {
                            enabled: template.enabled, // 保持当前启用状态
                            isBuiltIn: template.isBuiltIn, // 保持内置状态
                            boundPresetId: data.template.boundPresetId,
                            systemPrompt: data.template.systemPrompt,
                            userPromptTemplate: data.template.userPromptTemplate,
                            outputFormat: data.template.outputFormat,
                            availableVariables: data.template.availableVariables,
                        }
                    );
                    // 保持原 ID
                    importedTemplate.id = template.id;
                    onImport(importedTemplate);
                }
            } catch (err) {
                console.error('导入失败:', err);
            }
        };
        reader.readAsText(file);

        // 重置 input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div
            className={`
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${isSelected
                    ? 'bg-accent/50 border-input'
                    : 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border'
                }
                ${!template.enabled && 'opacity-50'}
            `}
            onClick={onSelect}
        >
            <div className="flex items-start gap-3">
                {/* 状态图标 */}
                <button
                    className={`
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                        ${template.enabled
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }
                    `}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleEnabled?.(!template.enabled);
                    }}
                >
                    <Power size={14} />
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm font-medium truncate ${isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'} ${!template.enabled && 'line-through'}`}>
                            {template.name}
                        </h4>

                        {/* 标签 */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${getCategoryColorClass(template.category)}`}>
                                {getCategoryLabel(template.category)}
                            </span>
                            {template.isBuiltIn && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground">
                                    BUILTIN
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono">
                        <span className="truncate max-w-[120px]">
                            {template.boundPresetId ? `BOUND: ${template.boundPresetId}` : 'DEFAULT PRESET'}
                        </span>
                        <span>{template.outputFormat.toUpperCase()}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons - Visible on hover or selected */}
            <div className={`mt-2 flex justify-end gap-1 ${isSelected || 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" onClick={handleImportClick} title="Import"><Upload size={12} /></button>
                <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" onClick={handleExport} title="Export"><Download size={12} /></button>
                <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" onClick={(e) => { e.stopPropagation(); onCopy?.(); }} title="Copy"><Copy size={12} /></button>
                {template.isBuiltIn && (
                    <button
                        className="p-1.5 hover:bg-amber-500/10 rounded text-muted-foreground hover:text-amber-500 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            const defaultTemplate = getBuiltInTemplateByCategory(template.category);
                            if (defaultTemplate && onResetToDefault) {
                                // 保留当前模板的 ID 和 enabled 状态，替换内容
                                onResetToDefault({
                                    ...defaultTemplate,
                                    id: template.id,
                                    enabled: template.enabled,
                                });
                            }
                        }}
                        title="恢复默认"
                    >
                        <RotateCcw size={12} />
                    </button>
                )}
                {!template.isBuiltIn && (
                    <button className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors" onClick={(e) => { e.stopPropagation(); onDelete?.(); }} title="Delete"><Trash2 size={12} /></button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
            />
        </div>
    );
};

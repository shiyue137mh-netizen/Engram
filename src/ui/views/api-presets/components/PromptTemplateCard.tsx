import React, { useRef } from 'react';
import { FileText, Copy, Trash2, Download, Upload, Check, Power, RotateCcw } from 'lucide-react';
import type { PromptTemplate, PromptTemplateSingleExport, PromptCategory } from '@/config/types/prompt';
import { PROMPT_CATEGORIES } from '@/config/types/prompt';
import { createPromptTemplate, getBuiltInTemplateByCategory, getBuiltInTemplateById } from '@/config/types/defaults';

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
        case 'preprocessing':
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

    const isPreprocessing = template.category === 'preprocessing';

    return (
        <div
            className={`
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${isSelected
                    ? 'bg-accent/50 border-input'
                    : 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border'
                }
                ${(!template.enabled && !isPreprocessing) && 'opacity-50'}
            `}
            onClick={onSelect}
        >
            <div className="flex items-start gap-3">
                {/* 状态图标 */}
                {!isPreprocessing ? (
                    <button
                        className={`
                            w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                            ${template.enabled
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }
                        `}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleEnabled?.(!template.enabled);
                        }}
                        title={template.enabled ? "点击禁用" : "点击启用"}
                    >
                        <Power size={16} />
                    </button>
                ) : (
                    // 预处理模板始终显示为"就绪"状态
                    <div
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 flex-shrink-0"
                        title="预处理模板 (在快捷面板中激活)"
                    >
                        <Check size={16} />
                    </div>
                )}

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
                    </div>
                </div>
            </div>

            {/* Action Buttons - Visible on hover or selected */}
            <div className={`mt-2 flex justify-end gap-1 ${isSelected || 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                <button className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors" onClick={handleImportClick} title="Import"><Upload size={12} /></button>
                <button className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors" onClick={handleExport} title="Export"><Download size={12} /></button>
                <button className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors" onClick={(e) => { e.stopPropagation(); onCopy?.(); }} title="Copy"><Copy size={12} /></button>
                {template.isBuiltIn && (
                    <button
                        className="p-1.5 hover:bg-amber-500/10 rounded text-muted-foreground hover:text-amber-500 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // 优先尝试通过 ID 精确匹配 (V0.8.6 Fix)
                            let defaultTemplate: PromptTemplate | null | undefined = getBuiltInTemplateById(template.id);

                            // 如果找不到 (可能是旧数据的随机 ID)，回退到分类匹配
                            // 注意：对于 preprocessing 分类，分类匹配可能不准确，建议刷新页面以触发 ID 迁移
                            if (!defaultTemplate) {
                                defaultTemplate = getBuiltInTemplateByCategory(template.category);
                            }

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

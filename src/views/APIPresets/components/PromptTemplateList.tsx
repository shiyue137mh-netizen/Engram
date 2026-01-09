import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { PromptTemplateCard } from './PromptTemplateCard';
import type { PromptTemplate } from '@/services/api/types';
import { createPromptTemplate, PROMPT_CATEGORIES } from '@/services/api/types';

interface PromptTemplateListProps {
    templates: PromptTemplate[];
    selectedId: string | null;
    onSelect: (template: PromptTemplate) => void;
    onAdd: (template: PromptTemplate) => void;
    onUpdate: (template: PromptTemplate) => void;
    onDelete: (template: PromptTemplate) => void;
}

export const PromptTemplateList: React.FC<PromptTemplateListProps> = ({
    templates,
    selectedId,
    onSelect,
    onAdd,
    onUpdate,
    onDelete,
}) => {
    // 新建模板
    const handleAdd = () => {
        const newTemplate = createPromptTemplate(
            `新模板 ${templates.length + 1}`,
            'summary'
        );
        onAdd(newTemplate);
        onSelect(newTemplate);
    };

    // 复制模板
    const handleCopy = (template: PromptTemplate) => {
        const copy = createPromptTemplate(
            `${template.name} (副本)`,
            template.category,
            {
                enabled: false, // 副本默认不启用
                boundPresetId: template.boundPresetId,
                systemPrompt: template.systemPrompt,
                userPromptTemplate: template.userPromptTemplate,
                outputFormat: template.outputFormat,
                availableVariables: [...template.availableVariables],
            }
        );
        onAdd(copy);
    };

    // 切换启用状态
    const handleToggleEnabled = (template: PromptTemplate, enabled: boolean) => {
        // 如果启用，同分类的其他模板要禁用（每个分类只有一个启用）
        if (enabled) {
            templates
                .filter(t => t.category === template.category && t.id !== template.id && t.enabled)
                .forEach(t => onUpdate({ ...t, enabled: false }));
        }
        onUpdate({ ...template, enabled });
    };

    // 导入覆盖模板
    const handleImport = (importedTemplate: PromptTemplate) => {
        onUpdate(importedTemplate);
    };

    // 按分类分组
    const groupedTemplates = PROMPT_CATEGORIES.map(category => ({
        ...category,
        templates: templates.filter(t => t.category === category.value),
    })).filter(group => group.templates.length > 0);

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* 头部操作栏 */}
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">提示词模板</h3>
                <button
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={handleAdd}
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* 模板列表 */}
            <div className="flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar">
                {groupedTemplates.map((group) => (
                    <div key={group.value} className="flex flex-col gap-2">
                        <div className="text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex">
                            {group.label}
                            <div className="h-px bg-border flex-1"></div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {group.templates.map((template) => (
                                <PromptTemplateCard
                                    key={template.id}
                                    template={template}
                                    isSelected={selectedId === template.id}
                                    onSelect={() => onSelect(template)}
                                    onCopy={() => handleCopy(template)}
                                    onDelete={() => onDelete(template)}
                                    onToggleEnabled={(enabled) => handleToggleEnabled(template, enabled)}
                                    onImport={handleImport}
                                    onResetToDefault={(resetTemplate) => onUpdate(resetTemplate)}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {templates.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg">
                        <FileText size={24} className="opacity-50" />
                        <p className="text-xs">暂无模板</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptTemplateList;

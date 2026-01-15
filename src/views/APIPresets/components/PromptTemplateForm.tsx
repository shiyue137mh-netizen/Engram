/**
 * 提示词模板编辑表单
 */
import React from 'react';
import { TextField, SelectField, SwitchField, FormSection } from './FormField';
import type { PromptTemplate, PromptCategory, LLMPreset } from '@/services/api/types';
import { PROMPT_CATEGORIES } from '@/services/api/types';

interface PromptTemplateFormProps {
    template: PromptTemplate;
    llmPresets: LLMPreset[];
    defaultPresetId: string | null;
    onChange: (template: PromptTemplate) => void;
}

// 可用宏定义及说明
const AVAILABLE_MACROS = [
    { name: '{{chatHistory}}', desc: '待处理的对话历史' },
    { name: '{{context}}', desc: '角色卡设定' },
    { name: '{{char}}', desc: '角色名' },
    { name: '{{user}}', desc: '用户名' },
    { name: '{{userInput}}', desc: '当前用户输入' },
    { name: '{{worldbookContext}}', desc: '世界书激活内容' },
    { name: '{{engramSummaries}}', desc: 'Engram 所有摘要（用于精简）' },
];

export const PromptTemplateForm: React.FC<PromptTemplateFormProps> = ({
    template,
    llmPresets,
    defaultPresetId,
    onChange,
}) => {
    // 构建模型来源选项
    const modelSourceOptions = [
        { value: '', label: '使用默认预设' + (defaultPresetId ? ` (${llmPresets.find(p => p.id === defaultPresetId)?.name || defaultPresetId})` : '') },
        ...llmPresets.map(p => ({ value: p.id, label: p.name })),
    ];

    // 更新模板字段
    const updateTemplate = (updates: Partial<PromptTemplate>) => {
        onChange({ ...template, ...updates, updatedAt: Date.now() });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* 基本信息 */}
            <FormSection title="基本信息">
                <TextField
                    label="模板名称"
                    value={template.name}
                    onChange={(value) => updateTemplate({ name: value })}
                    placeholder="输入模板名称"
                    required
                    disabled={template.isBuiltIn}
                />

                <SelectField
                    label="模板分类"
                    value={template.category}
                    onChange={(value) => updateTemplate({ category: value as PromptCategory })}
                    options={PROMPT_CATEGORIES.map(c => ({ value: c.value, label: c.label }))}
                    description={PROMPT_CATEGORIES.find(c => c.value === template.category)?.description}
                />

                <SelectField
                    label="模型来源"
                    value={template.boundPresetId || ''}
                    onChange={(value) => updateTemplate({ boundPresetId: value || null })}
                    options={modelSourceOptions}
                    description="选择用于此模板的 LLM 预设"
                />

                <SelectField
                    label="注入模式"
                    value={template.injectionMode || 'replace'}
                    onChange={(value) => updateTemplate({ injectionMode: value as 'replace' | 'append' | 'prepend' })}
                    options={[
                        { value: 'replace', label: '覆盖 (Overwrite)' },
                        { value: 'append', label: '追加 (Append)' },
                        { value: 'prepend', label: '前置 (Prepend)' },
                    ]}
                    description="预处理结果如何与用户输入组合"
                />


            </FormSection>

            {/* 提示词内容 */}
            <FormSection title="提示词内容">
                <TextField
                    label="系统提示词"
                    value={template.systemPrompt}
                    onChange={(value) => updateTemplate({ systemPrompt: value })}
                    placeholder="输入系统提示词..."
                    multiline
                    rows={4}
                />

                <TextField
                    label="用户提示词模板"
                    value={template.userPromptTemplate}
                    onChange={(value) => updateTemplate({ userPromptTemplate: value })}
                    placeholder="输入用户提示词模板..."
                    multiline
                    rows={6}
                />
            </FormSection>

            {/* 可用宏提示 */}
            <div className="px-3 py-2 bg-muted/30 rounded border border-border">
                <div className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider">可用宏</div>
                <div className="flex flex-col gap-1">
                    {AVAILABLE_MACROS.map((m) => (
                        <div key={m.name} className="flex items-center gap-2 text-[10px]">
                            <code className="px-1.5 py-0.5 bg-muted rounded text-primary font-mono whitespace-nowrap">
                                {m.name}
                            </code>
                            <span className="text-muted-foreground">{m.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromptTemplateForm;

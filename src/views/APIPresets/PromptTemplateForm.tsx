/**
 * 提示词模板编辑表单
 */
import React from 'react';
import { TextField, SelectField, SwitchField, FormSection } from './FormField';
import type { PromptTemplate, PromptCategory, LLMPreset } from './types';
import { PROMPT_CATEGORIES } from './types';

interface PromptTemplateFormProps {
    template: PromptTemplate;
    llmPresets: LLMPreset[];
    defaultPresetId: string | null;
    onChange: (template: PromptTemplate) => void;
}

// 输出格式选项
const OUTPUT_FORMAT_OPTIONS = [
    { value: 'plain', label: '纯文本' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'json', label: 'JSON' },
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
                    label="输出格式"
                    value={template.outputFormat}
                    onChange={(value) => updateTemplate({ outputFormat: value as 'plain' | 'markdown' | 'json' })}
                    options={OUTPUT_FORMAT_OPTIONS}
                />
            </FormSection>

            {/* 提示词内容 */}
            <FormSection title="提示词内容" description="支持变量：{{chatHistory}}, {{context}}, {{char}}, {{user}}, {{userInput}}">
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

            {/* 变量提示 */}
            <div className="px-3 py-2 bg-muted/30 rounded border border-border">
                <div className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider">可用变量</div>
                <div className="flex flex-wrap gap-2">
                    {template.availableVariables.map((v) => (
                        <code key={v} className="px-1.5 py-0.5 bg-muted rounded text-[10px] text-primary font-mono">
                            {v}
                        </code>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromptTemplateForm;

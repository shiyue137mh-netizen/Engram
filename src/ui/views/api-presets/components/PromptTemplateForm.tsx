/**
 * 提示词模板编辑表单
 */
import React from 'react';
import { TextField, SelectField, FormSection } from './FormField';
import type { PromptTemplate, WorldbookConfigProfile, PromptCategory } from '@/config/types/prompt';
import type { LLMPreset } from '@/config/types/llm';
import { PROMPT_CATEGORIES } from '@/config/types/prompt';
import { Plus, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PromptTemplateFormProps {
    template: PromptTemplate;
    llmPresets: LLMPreset[];
    worldbookProfiles: WorldbookConfigProfile[];
    defaultPresetId: string | null;
    onChange: (template: PromptTemplate) => void;
}

// ... imports

interface MacroDef {
    name: string;
    desc: string;
    category: 'Context (上下文)' | 'Text Generation (文本生成)' | 'Data Layer (数据层)';
}

// 可用宏定义及说明
const AVAILABLE_MACROS: MacroDef[] = [
    // Context
    { name: '{{userInput}}', desc: '当前用户输入的内容', category: 'Context (上下文)' },
    { name: '{{chatHistory}}', desc: '最近的对话历史（从总结配置读取数量）', category: 'Context (上下文)' },
    { name: '{{context}}', desc: '角色卡原始设定 (Description/Persona...)', category: 'Context (上下文)' },
    { name: '{{worldbookContext}}', desc: '当前激活的世界书条目内容', category: 'Context (上下文)' },
    { name: '{{userPersona}}', desc: '用户角色设定 (Persona Description)', category: 'Context (上下文)' },
    { name: '{{char}}', desc: '当前角色名称', category: 'Context (上下文)' },
    { name: '{{user}}', desc: '用户名称', category: 'Context (上下文)' },

    // Text Generation
    { name: '{{engramSummaries}}', desc: '所有已生成的事件摘要 (纯文本, 用于剧情回顾/精简)', category: 'Text Generation (文本生成)' },
    { name: '{{engramArchivedSummaries}}', desc: '已归档的历史摘要 (绿灯事件)', category: 'Text Generation (文本生成)' },

    // Data Layer
    { name: '{{engramGraph}}', desc: '完整的图谱数据 JSON (用于实体提取/图谱操作)', category: 'Data Layer (数据层)' },
];

const MacroItem = ({ macro }: { macro: MacroDef }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(macro.name);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-muted/50 group transition-colors">
            <div className="flex flex-col gap-0.5">
                <code className="text-[11px] text-primary font-mono font-medium">{macro.name}</code>
                <span className="text-[10px] text-muted-foreground">{macro.desc}</span>
            </div>
            <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                title="复制宏"
            >
                {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
            </button>
        </div>
    );
};

export const PromptTemplateForm: React.FC<PromptTemplateFormProps> = ({
    template,
    llmPresets,
    worldbookProfiles,
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

    // Group macros
    const groupedMacros = AVAILABLE_MACROS.reduce((acc, macro) => {
        if (!acc[macro.category]) acc[macro.category] = [];
        acc[macro.category].push(macro);
        return acc;
    }, {} as Record<string, MacroDef[]>);

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

                {template.category === 'preprocessing' && (
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
                )}
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
            </FormSection>

            {/* 知识库绑定 (V1.1.0) */}
            <FormSection title="知识库绑定">
                <SelectField
                    label="绑定知识库方案"
                    value={template.boundWorldbookProfileId || ''}
                    onChange={(value) => updateTemplate({ boundWorldbookProfileId: value || null })}
                    options={[
                        { value: '', label: '继承全局设置 (Inherit Global)' },
                        ...worldbookProfiles.map(p => ({ value: p.id, label: p.name })),
                    ]}
                    description="选择此模板专用的世界书加载方案。若选择“继承全局”，则使用全局世界书配置。"
                />
            </FormSection>

            <FormSection title="用户输入">
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
            <div className="px-3 py-3 bg-muted/20 rounded-md border border-border/50 space-y-3">
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <span>可用宏变量</span>
                    <div className="h-px bg-border flex-1"></div>
                </div>

                <div className="flex flex-col gap-4">
                    {Object.entries(groupedMacros).map(([category, macros]) => (
                        <div key={category} className="flex flex-col gap-1">
                            <div className="text-[10px] text-primary/70 font-medium px-1 mb-0.5">{category}</div>
                            <div className="grid grid-cols-1 gap-px bg-border/20 rounded overflow-hidden">
                                {macros.map((m) => (
                                    <div key={m.name} className="bg-background/50">
                                        <MacroItem macro={m} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromptTemplateForm;

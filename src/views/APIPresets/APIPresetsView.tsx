import React, { useState, useEffect } from 'react';
import { Key, Cpu, Layers, Plus, Save, FileText, Settings, Regex, Book } from 'lucide-react';
import { PresetCard } from './PresetCard';
import { LLMPresetForm } from './LLMPresetForm';
import { VectorConfigForm } from './VectorConfigForm';
import { RerankConfigForm } from './RerankConfigForm';
import { PromptTemplateList } from './PromptTemplateList';
import { PromptTemplateForm } from './PromptTemplateForm';
import { RegexRuleList } from './RegexRuleList';
import { RegexRuleForm } from './RegexRuleForm';
import { WorldbookConfigForm } from './WorldbookConfigForm';
import { RegexRule, DEFAULT_REGEX_RULES } from '../../core/summarizer/RegexProcessor';
import { PageTitle } from '../components/PageTitle';
import { TabPills } from '../components/TabPills';
import type {
    EngramAPISettings,
    LLMPreset,
    VectorConfig,
    RerankConfig,
    PromptTemplate,
    WorldbookConfig,
} from './types';
import {
    getDefaultAPISettings,
    createDefaultLLMPreset,
} from './types';

// 主标签页类型
type MainTabType = 'model' | 'prompt' | 'regex' | 'worldbook';

// 模型配置子标签页类型
type ModelSubTabType = 'llm' | 'vector' | 'rerank';

// 模型配置子标签页配置
const MODEL_SUB_TABS: { id: ModelSubTabType; label: string; icon: React.ElementType }[] = [
    { id: 'llm', label: 'LLM 预设', icon: Key },
    { id: 'vector', label: '向量化', icon: Cpu },
    { id: 'rerank', label: 'Rerank', icon: Layers },
];

interface APIPresetsProps {
    onNavigate?: (path: string) => void;
}

export const APIPresets: React.FC<APIPresetsProps> = () => {
    // 主标签页
    const [mainTab, setMainTab] = useState<MainTabType>('model');
    // 模型配置子标签页
    const [modelSubTab, setModelSubTab] = useState<ModelSubTabType>('llm');

    // 配置状态
    const [settings, setSettings] = useState<EngramAPISettings>(getDefaultAPISettings);

    // 编辑状态
    const [editingPreset, setEditingPreset] = useState<LLMPreset | null>(null);
    const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    // 正则规则状态
    const [regexRules, setRegexRules] = useState<RegexRule[]>([...DEFAULT_REGEX_RULES]);
    const [editingRule, setEditingRule] = useState<RegexRule | null>(null);

    // 加载保存的配置
    useEffect(() => {
        // TODO: 从 extension_settings 加载
    }, []);

    // ==================== LLM 预设操作 ====================

    const handleSelectPreset = (preset: LLMPreset) => {
        setSettings((prev) => ({ ...prev, selectedPresetId: preset.id }));
        setEditingPreset(preset);
    };

    const handleAddPreset = () => {
        const newPreset = createDefaultLLMPreset(`预设 ${settings.llmPresets.length + 1}`);
        newPreset.isDefault = false;
        setSettings((prev) => ({
            ...prev,
            llmPresets: [...prev.llmPresets, newPreset],
            selectedPresetId: newPreset.id,
        }));
        setEditingPreset(newPreset);
        setHasChanges(true);
    };

    const handleUpdatePreset = (updated: LLMPreset) => {
        setSettings((prev) => ({
            ...prev,
            llmPresets: prev.llmPresets.map((p) => p.id === updated.id ? updated : p),
        }));
        setEditingPreset(updated);
        setHasChanges(true);
    };

    const handleCopyPreset = (preset: LLMPreset) => {
        const copy: LLMPreset = {
            ...preset,
            id: `preset_${Date.now()}`,
            name: `${preset.name} (副本)`,
            isDefault: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setSettings((prev) => ({ ...prev, llmPresets: [...prev.llmPresets, copy] }));
        setHasChanges(true);
    };

    const handleDeletePreset = (preset: LLMPreset) => {
        if (preset.isDefault) return;
        setSettings((prev) => ({
            ...prev,
            llmPresets: prev.llmPresets.filter((p) => p.id !== preset.id),
            selectedPresetId: prev.selectedPresetId === preset.id ? null : prev.selectedPresetId,
        }));
        if (editingPreset?.id === preset.id) setEditingPreset(null);
        setHasChanges(true);
    };

    // ==================== 提示词模板操作 ====================

    const handleSelectTemplate = (template: PromptTemplate) => {
        setEditingTemplate(template);
    };

    const handleAddTemplate = (template: PromptTemplate) => {
        setSettings((prev) => ({
            ...prev,
            promptTemplates: [...prev.promptTemplates, template],
        }));
        setHasChanges(true);
    };

    const handleUpdateTemplate = (updated: PromptTemplate) => {
        setSettings((prev) => ({
            ...prev,
            promptTemplates: prev.promptTemplates.map((t) => t.id === updated.id ? updated : t),
        }));
        setEditingTemplate(updated);
        setHasChanges(true);
    };

    const handleDeleteTemplate = (template: PromptTemplate) => {
        if (template.isBuiltIn) return;
        setSettings((prev) => ({
            ...prev,
            promptTemplates: prev.promptTemplates.filter((t) => t.id !== template.id),
        }));
        if (editingTemplate?.id === template.id) setEditingTemplate(null);
        setHasChanges(true);
    };

    // ==================== 其他配置操作 ====================

    const handleVectorConfigChange = (config: VectorConfig) => {
        setSettings((prev) => ({ ...prev, vectorConfig: config }));
        setHasChanges(true);
    };

    const handleRerankConfigChange = (config: RerankConfig) => {
        setSettings((prev) => ({ ...prev, rerankConfig: config }));
        setHasChanges(true);
    };

    // ==================== 保存 ====================

    const handleSave = () => {
        // TODO: 保存到 extension_settings
        console.log('保存配置:', settings);
        setHasChanges(false);
    };

    // ==================== 渲染 ====================

    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle
                title="API 配置"
                subtitle="管理模型参数和上下文规则"
                actions={hasChanges && (
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 text-sm shadow-sm"
                        onClick={handleSave}
                    >
                        <Save size={16} />
                        保存更改
                    </button>
                )}
            />

            <TabPills
                tabs={[
                    { id: 'model', label: '模型配置' },
                    { id: 'prompt', label: '提示词模板' },
                    { id: 'regex', label: '正则规则' },
                    { id: 'worldbook', label: '世界书' },
                ]}
                activeTab={mainTab}
                onChange={(id) => setMainTab(id as MainTabType)}
            />

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {/* ========== 模型配置 Tab ========== */}
                {mainTab === 'model' && (
                    <div className="flex flex-col gap-6">
                        {/* 子标签页 */}
                        <div className="flex gap-1 border-b border-border pb-1">
                            {MODEL_SUB_TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`
                                        flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative
                                        ${modelSubTab === tab.id
                                            ? 'text-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }
                                    `}
                                    onClick={() => setModelSubTab(tab.id)}
                                >
                                    <tab.icon size={14} />
                                    {tab.label}
                                    {modelSubTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* LLM 预设 */}
                        {modelSubTab === 'llm' && (
                            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                                {/* 左侧：预设列表 */}
                                <div className="flex flex-col gap-4 border-r border-border/50 pr-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">预设列表</h3>
                                        <button className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleAddPreset}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {settings.llmPresets.map((preset) => (
                                            <PresetCard
                                                key={preset.id}
                                                preset={preset}
                                                isSelected={settings.selectedPresetId === preset.id}
                                                onSelect={() => handleSelectPreset(preset)}
                                                onEdit={() => handleSelectPreset(preset)}
                                                onCopy={() => handleCopyPreset(preset)}
                                                onDelete={() => handleDeletePreset(preset)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* 右侧：编辑表单 */}
                                <div className="flex flex-col">
                                    {editingPreset ? (
                                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                            <LLMPresetForm preset={editingPreset} onChange={handleUpdatePreset} />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-4">
                                            <Key size={32} className="opacity-20" />
                                            <p className="text-sm font-light">选择或创建一个预设开始配置</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 向量化 */}
                        {modelSubTab === 'vector' && (
                            <VectorConfigForm config={settings.vectorConfig} onChange={handleVectorConfigChange} />
                        )}

                        {/* Rerank */}
                        {modelSubTab === 'rerank' && (
                            <RerankConfigForm config={settings.rerankConfig} onChange={handleRerankConfigChange} />
                        )}
                    </div>
                )}

                {/* ========== 提示词模板 Tab ========== */}
                {mainTab === 'prompt' && (
                    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full">
                        {/* 左侧：模板列表 */}
                        <div className="border-r border-border/50 pr-4">
                            <PromptTemplateList
                                templates={settings.promptTemplates}
                                selectedId={editingTemplate?.id || null}
                                onSelect={handleSelectTemplate}
                                onAdd={handleAddTemplate}
                                onUpdate={handleUpdateTemplate}
                                onDelete={handleDeleteTemplate}
                            />
                        </div>

                        {/* 右侧：编辑表单 */}
                        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                            {editingTemplate ? (
                                <PromptTemplateForm
                                    template={editingTemplate}
                                    llmPresets={settings.llmPresets}
                                    defaultPresetId={settings.selectedPresetId}
                                    onChange={handleUpdateTemplate}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-4">
                                    <FileText size={32} className="opacity-20" />
                                    <p className="text-sm font-light">选择一个模板进行编辑</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ========== 正则规则 Tab ========== */}
                {mainTab === 'regex' && (
                    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full">
                        {/* 左侧：规则列表 */}
                        <div className="border-r border-border/50 pr-4">
                            <RegexRuleList
                                rules={regexRules}
                                selectedId={editingRule?.id || null}
                                onSelect={(id) => {
                                    const rule = regexRules.find(r => r.id === id);
                                    setEditingRule(rule || null);
                                }}
                                onToggle={(id) => {
                                    setRegexRules(prev => prev.map(r =>
                                        r.id === id ? { ...r, enabled: !r.enabled } : r
                                    ));
                                    setHasChanges(true);
                                }}
                                onDelete={(id) => {
                                    setRegexRules(prev => prev.filter(r => r.id !== id));
                                    if (editingRule?.id === id) setEditingRule(null);
                                    setHasChanges(true);
                                }}
                                onAdd={() => {
                                    const newRule: RegexRule = {
                                        id: `rule_${Date.now()}`,
                                        name: '新规则',
                                        pattern: '',
                                        replacement: '',
                                        enabled: true,
                                        flags: 'gi',
                                        description: '',
                                    };
                                    setRegexRules(prev => [...prev, newRule]);
                                    setEditingRule(newRule);
                                    setHasChanges(true);
                                }}
                                onReset={() => {
                                    setRegexRules([...DEFAULT_REGEX_RULES]);
                                    setEditingRule(null);
                                    setHasChanges(true);
                                }}
                            />
                        </div>

                        {/* 右侧：编辑表单 */}
                        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                            {editingRule ? (
                                <RegexRuleForm
                                    rule={editingRule}
                                    onChange={(updates) => {
                                        const updated = { ...editingRule, ...updates };
                                        setEditingRule(updated);
                                        setRegexRules(prev => prev.map(r =>
                                            r.id === updated.id ? updated : r
                                        ));
                                        setHasChanges(true);
                                    }}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-4">
                                    <Regex size={32} className="opacity-20" />
                                    <p className="text-sm font-light">选择或创建一个正则规则</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ========== 世界书配置 Tab ========== */}
                {mainTab === 'worldbook' && (
                    <div className="max-w-2xl py-4">
                        <WorldbookConfigForm
                            config={settings.worldbookConfig}
                            onChange={(config) => {
                                setSettings(prev => ({ ...prev, worldbookConfig: config }));
                                setHasChanges(true);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default APIPresets;

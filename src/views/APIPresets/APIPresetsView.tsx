/**
 * API 预设配置视图
 * 
 * 使用 useAPIPresets Hook 管理状态，此组件只负责 UI 渲染。
 */

import React, { useState } from 'react';
import { Key, Cpu, Layers, Plus, Save, FileText, Regex, Book } from 'lucide-react';
// Components
import { PresetCard } from './components/PresetCard';
import { LLMPresetForm } from './components/LLMPresetForm';
import { VectorConfigForm } from './components/VectorConfigForm';
import { RerankConfigForm } from './components/RerankConfigForm';
import { PromptTemplateList } from './components/PromptTemplateList';
import { PromptTemplateForm } from './components/PromptTemplateForm';
import { RegexRuleList } from './components/RegexRuleList';
import { RegexRuleForm } from './components/RegexRuleForm';
import { WorldbookConfigForm } from './components/WorldbookConfigForm';
import { PageTitle } from '../components/PageTitle';
import { TabPills } from '../components/TabPills';
// Hooks
import { useAPIPresets } from '../../hooks/useAPIPresets';

// Tab 类型
type MainTabType = 'model' | 'prompt' | 'regex' | 'worldbook';
type ModelSubTabType = 'llm' | 'vector' | 'rerank';

// 子 Tab 配置
const MODEL_SUB_TABS: { id: ModelSubTabType; label: string; icon: React.ElementType }[] = [
    { id: 'llm', label: 'LLM 预设', icon: Key },
    { id: 'vector', label: '向量化', icon: Cpu },
    { id: 'rerank', label: 'Rerank', icon: Layers },
];

interface APIPresetsProps {
    onNavigate?: (path: string) => void;
    initialTab?: MainTabType;
}

export const APIPresets: React.FC<APIPresetsProps> = ({ initialTab }) => {
    // Tab 状态（UI 专用）
    const [mainTab, setMainTab] = useState<MainTabType>(initialTab || 'model');
    const [modelSubTab, setModelSubTab] = useState<ModelSubTabType>('llm');

    // 使用 Hook 管理业务状态
    const {
        settings,
        editingPreset,
        editingTemplate,
        hasChanges,
        regexRules,
        editingRule,
        selectPreset,
        addPreset,
        updatePreset,
        copyPreset,
        deletePreset,
        selectTemplate,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        updateVectorConfig,
        updateRerankConfig,
        updateWorldbookConfig,
        selectRule,
        addRule,
        updateRule,
        toggleRule,
        deleteRule,
        resetRules,

        save,
        // Worldbook filtering
        worldbookStructure,
        disabledEntries,
        toggleWorldbook,
        toggleEntry,
        refreshWorldbooks,
    } = useAPIPresets();

    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle
                title="API 配置"
                subtitle="管理模型参数和上下文规则"
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
                actions={hasChanges && (
                    <button
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors"
                        onClick={save}
                    >
                        <Save size={12} />
                        保存
                    </button>
                )}
            />

            <div className="flex-1 overflow-y-auto no-scrollbar">
                {/* 模型配置 Tab */}
                {mainTab === 'model' && (
                    <div className="flex flex-col gap-6">
                        {/* 子 Tab */}
                        <TabPills
                            tabs={MODEL_SUB_TABS.map(t => ({ ...t, icon: <t.icon size={14} /> }))}
                            activeTab={modelSubTab}
                            onChange={(id) => setModelSubTab(id as ModelSubTabType)}
                            sticky={true}
                            top={0}
                            className="mb-6"
                        />

                        {/* LLM 预设 */}
                        {modelSubTab === 'llm' && (
                            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                                <div className="flex flex-col gap-4 border-r border-border/50 pr-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">预设列表</h3>
                                        <button className="text-muted-foreground hover:text-foreground transition-colors" onClick={addPreset}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {settings.llmPresets.map((preset) => (
                                            <PresetCard
                                                key={preset.id}
                                                preset={preset}
                                                isSelected={settings.selectedPresetId === preset.id}
                                                onSelect={() => selectPreset(preset)}
                                                onEdit={() => selectPreset(preset)}
                                                onCopy={() => copyPreset(preset)}
                                                onDelete={() => deletePreset(preset)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    {editingPreset ? (
                                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                            <LLMPresetForm preset={editingPreset} onChange={updatePreset} />
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

                        {modelSubTab === 'vector' && <VectorConfigForm config={settings.vectorConfig} onChange={updateVectorConfig} />}
                        {modelSubTab === 'rerank' && <RerankConfigForm config={settings.rerankConfig} onChange={updateRerankConfig} />}
                    </div>
                )}

                {/* 提示词模板 Tab */}
                {mainTab === 'prompt' && (
                    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full">
                        <div className="border-r border-border/50 pr-4">
                            <PromptTemplateList
                                templates={settings.promptTemplates}
                                selectedId={editingTemplate?.id || null}
                                onSelect={selectTemplate}
                                onAdd={addTemplate}
                                onUpdate={updateTemplate}
                                onDelete={deleteTemplate}
                            />
                        </div>
                        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                            {editingTemplate ? (
                                <PromptTemplateForm
                                    template={editingTemplate}
                                    llmPresets={settings.llmPresets}
                                    defaultPresetId={settings.selectedPresetId}
                                    onChange={updateTemplate}
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

                {/* 正则规则 Tab */}
                {mainTab === 'regex' && (
                    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full">
                        <div className="border-r border-border/50 pr-4">
                            <RegexRuleList
                                rules={regexRules}
                                selectedId={editingRule?.id || null}
                                onSelect={selectRule}
                                onToggle={toggleRule}
                                onDelete={deleteRule}
                                onAdd={addRule}
                                onReset={resetRules}
                            />
                        </div>
                        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                            {editingRule ? (
                                <RegexRuleForm rule={editingRule} onChange={updateRule} />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-4">
                                    <Regex size={32} className="opacity-20" />
                                    <p className="text-sm font-light">选择或创建一个正则规则</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 世界书配置 Tab */}
                {mainTab === 'worldbook' && (
                    <div className="max-w-2xl py-4">
                        <WorldbookConfigForm
                            config={settings.worldbookConfig}
                            onChange={updateWorldbookConfig}
                            worldbookStructure={worldbookStructure}
                            disabledEntries={disabledEntries}
                            onToggleWorldbook={toggleWorldbook}
                            onToggleEntry={toggleEntry}
                            onRefresh={refreshWorldbooks}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default APIPresets;

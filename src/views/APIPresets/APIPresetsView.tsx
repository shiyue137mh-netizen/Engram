/**
 * API 预设配置视图
 *
 * 支持移动端 Master-Detail 布局：
 * - 桌面端：左侧列表 + 右侧编辑
 * - 移动端：列表全屏 → 点击 → 编辑全屏
 */

import React, { useState, useEffect } from 'react';
import { Key, Cpu, Layers, Plus, Save, FileText, Regex, Book, ArrowLeft } from 'lucide-react';
// Components
import { PresetCard } from './components/PresetCard';
import { LLMPresetForm } from './components/LLMPresetForm';
import { VectorConfigForm } from './components/VectorConfigForm';
import { Divider } from "@/components/layout/Divider";
import { RerankConfigForm } from './components/RerankConfigForm';
import { PromptTemplateList } from './components/PromptTemplateList';
import { PromptTemplateForm } from './components/PromptTemplateForm';
import { RegexRuleList } from './components/RegexRuleList';
import { RegexRuleForm } from './components/RegexRuleForm';
import { WorldbookConfigForm } from './components/WorldbookConfigForm';
import { PageTitle } from "@/components/common/PageTitle";
import { TabPills } from "@/components/ui/TabPills";
import { MobileFullscreenForm } from "@/components/layout/MobileFullscreenForm";
import { LayoutTabs } from "@/components/layout/LayoutTabs";
// Hooks
import { useAPIPresets } from '../../hooks/useAPIPresets';

// 响应式断点
const DESKTOP_BREAKPOINT = 768;

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
    // Tab 状态
    const [mainTab, setMainTab] = useState<MainTabType>(initialTab || 'model');
    const [modelSubTab, setModelSubTab] = useState<ModelSubTabType>('llm');

    // 移动端状态
    const [isMobile, setIsMobile] = useState(window.innerWidth < DESKTOP_BREAKPOINT);
    const [showMobileForm, setShowMobileForm] = useState(false);

    // 响应式检测
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < DESKTOP_BREAKPOINT;
            setIsMobile(mobile);
            if (!mobile) setShowMobileForm(false); // 切换到桌面端时关闭全屏
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        updateRegexConfig, // New!
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

    // 移动端选择处理
    const handleMobileSelect = (selectFn: () => void) => {
        selectFn();
        if (isMobile) {
            setShowMobileForm(true);
        }
    };

    const handleMobileClose = () => {
        setShowMobileForm(false);
    };

    // =============== 移动端全屏表单 ===============

    // LLM 预设全屏编辑
    if (isMobile && showMobileForm && modelSubTab === 'llm' && editingPreset) {
        return (
            <MobileFullscreenForm
                title="编辑 LLM 预设"
                onClose={handleMobileClose}
                actions={
                    hasChanges && (
                        <button
                            className="p-2 text-primary"
                            onClick={save}
                        >
                            <Save size={18} />
                        </button>
                    )
                }
            >
                <LLMPresetForm preset={editingPreset} onChange={updatePreset} />
            </MobileFullscreenForm>
        );
    }

    // 提示词模板全屏编辑
    if (isMobile && showMobileForm && mainTab === 'prompt' && editingTemplate) {
        return (
            <MobileFullscreenForm
                title="编辑提示词模板"
                onClose={handleMobileClose}
                actions={
                    hasChanges && (
                        <button
                            className="p-2 text-primary"
                            onClick={save}
                        >
                            <Save size={18} />
                        </button>
                    )
                }
            >
                <PromptTemplateForm
                    template={editingTemplate}
                    llmPresets={settings.llmPresets}
                    defaultPresetId={settings.selectedPresetId}
                    onChange={updateTemplate}
                />
            </MobileFullscreenForm>
        );
    }

    // 正则规则全屏编辑
    if (isMobile && showMobileForm && mainTab === 'regex' && editingRule) {
        return (
            <MobileFullscreenForm
                title="编辑正则规则"
                onClose={handleMobileClose}
                actions={
                    hasChanges && (
                        <button
                            className="p-2 text-primary"
                            onClick={save}
                        >
                            <Save size={18} />
                        </button>
                    )
                }
            >
                <RegexRuleForm rule={editingRule} onChange={updateRule} />
            </MobileFullscreenForm>
        );
    }

    // =============== 主视图 ===============
    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle
                title="API 配置"
                subtitle="管理模型参数和上下文规则"
                className="mb-2"
            />

            {/* 顶部标签栏 - 自动 Portal 到 Layout Header */}
            <LayoutTabs
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
                    <div className="flex flex-col gap-2">
                        {/* 子 Tab - 使用负边距扩展到边缘 */}
                        <TabPills
                            tabs={MODEL_SUB_TABS.map(t => ({ ...t, icon: <t.icon size={14} /> }))}
                            activeTab={modelSubTab}
                            onChange={(id) => setModelSubTab(id as ModelSubTabType)}
                            sticky={false}
                            top={0}
                            className="-mx-4 px-4 !mb-4"
                        />

                        {/* LLM 预设 - Master-Detail */}
                        {modelSubTab === 'llm' && (
                            <div className={`flex gap-6 ${isMobile ? 'flex-col' : ''}`}>
                                {/* 列表 */}
                                <div className={`
                                    flex flex-col gap-4
                                    ${isMobile ? 'w-full' : 'w-[30%] min-w-[240px] border-r border-border/50 pr-4'}
                                `}>
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
                                                onSelect={() => handleMobileSelect(() => selectPreset(preset))}
                                                onEdit={() => handleMobileSelect(() => selectPreset(preset))}
                                                onCopy={() => copyPreset(preset)}
                                                onDelete={() => deletePreset(preset)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* 编辑区域 - 仅桌面端 */}
                                {!isMobile && (
                                    <div className="flex-1">
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
                                )}
                            </div>
                        )}

                        {modelSubTab === 'vector' && <VectorConfigForm config={settings.vectorConfig} onChange={updateVectorConfig} />}
                        {modelSubTab === 'rerank' && <RerankConfigForm config={settings.rerankConfig} onChange={updateRerankConfig} />}
                    </div>
                )}

                {/* 提示词模板 Tab - Master-Detail */}
                {mainTab === 'prompt' && (
                    <div className={`flex gap-6 h-full ${isMobile ? 'flex-col' : ''}`}>
                        {/* 列表 */}
                        <div className={`
                            ${isMobile ? 'w-full' : 'w-[30%] min-w-[280px] border-r border-border/50 pr-4'}
                        `}>
                            <PromptTemplateList
                                templates={settings.promptTemplates}
                                selectedId={editingTemplate?.id || null}
                                onSelect={(t) => handleMobileSelect(() => selectTemplate(t))}
                                onAdd={addTemplate}
                                onUpdate={updateTemplate}
                                onDelete={deleteTemplate}
                            />
                        </div>

                        {/* 编辑区域 - 仅桌面端 */}
                        {!isMobile && (
                            <div className="flex-1 overflow-y-auto no-scrollbar">
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
                        )}
                    </div>
                )}

                {/* 正则规则 Tab - Master-Detail */}
                {mainTab === 'regex' && (
                    <div className={`flex gap-6 h-full ${isMobile ? 'flex-col' : ''}`}>
                        {/* 列表 */}
                        <div className={`
                            ${isMobile ? 'w-full' : 'w-[30%] min-w-[280px] border-r border-border/50 pr-4'}
                        `}>
                            <RegexRuleList
                                rules={regexRules}
                                selectedId={editingRule?.id || null}
                                onSelect={(r) => handleMobileSelect(() => selectRule(r))}
                                onToggle={toggleRule}
                                onDelete={deleteRule}
                                onAdd={addRule}
                                onReset={resetRules}
                                enableNativeRegex={settings.regexConfig?.enableNativeRegex ?? true}
                                onToggleNativeRegex={(enabled) => updateRegexConfig({
                                    ...settings.regexConfig,
                                    enableNativeRegex: enabled
                                })}
                            />
                        </div>

                        {/* 编辑区域 - 仅桌面端 */}
                        {!isMobile && (
                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                {editingRule ? (
                                    <RegexRuleForm rule={editingRule} onChange={updateRule} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-4">
                                        <Regex size={32} className="opacity-20" />
                                        <p className="text-sm font-light">选择或创建一个正则规则</p>
                                    </div>
                                )}
                            </div>
                        )}
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

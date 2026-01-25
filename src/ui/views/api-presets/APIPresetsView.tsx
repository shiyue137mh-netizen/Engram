/**
 * API 预设配置视图
 *
 * 支持移动端 Master-Detail 布局：
 * - 桌面端：左侧列表 + 右侧编辑
 * - 移动端：列表全屏 → 点击 → 编辑全屏
 */

import React, { useState, useEffect } from 'react';
import { Key, Cpu, Layers, Plus, Save, FileText, Regex, Book, Braces } from 'lucide-react';
// Components
import { PresetCard } from './shared/PresetCard';
import { LLMPresetForm } from './models/LLMPresetForm';
import { VectorConfigForm } from './models/VectorConfigForm';
import { Divider } from "@/ui/components/layout/Divider";
import { RerankConfigForm } from './models/RerankConfigForm';
import { PromptTemplateList } from './prompts/PromptTemplateList';
import { PromptTemplateForm } from './prompts/PromptTemplateForm';
import { RegexRuleList } from './regex/RegexRuleList';
import { RegexRuleForm } from './regex/RegexRuleForm';
import { WorldbookConfigForm } from './worldbook/WorldbookConfigForm';
import { CustomMacroList } from './prompts/CustomMacroList';  // V0.9.2
import { CustomMacroForm } from './prompts/CustomMacroForm';  // V0.9.2
import { PageTitle } from "@/ui/components/display/PageTitle";
import { TabPills } from "@/ui/components/layout/TabPills";
import { WorldbookProfileList } from './worldbook/WorldbookProfileList';
import { WorldbookProfileForm } from './worldbook/WorldbookProfileForm';

import { LayoutTabs } from "@/ui/components/layout/LayoutTabs";
import { MasterDetailLayout } from "@/ui/components/layout/MasterDetailLayout";
import { MobileFullscreenForm } from "@/ui/components/layout/MobileFullscreenForm"; // Added import
import { EmptyState } from "@/ui/components/feedback/EmptyState";
import { useResponsive } from "@/ui/hooks/useResponsive";
// Hooks
import { useLLMPresets } from '../../hooks/useLLMPresets';
import { useConfig } from '../../hooks/useConfig';
import { useRegexRules } from '../../hooks/useRegexRules';
import { useWorldInfo } from '../../hooks/useWorldInfo';
import type { WorldbookConfigProfile } from '@/config/types/prompt';

// 响应式断点
const DESKTOP_BREAKPOINT = 768;

// Tab 类型
type MainTabType = 'model' | 'prompt' | 'regex' | 'worldbook';
type ModelSubTabType = 'llm' | 'vector' | 'rerank';
type PromptSubTabType = 'templates' | 'macros';  // V0.9.2: 提示词模板子 Tab
type WorldbookSubTabType = 'global' | 'profiles';

// 子 Tab 配置
const MODEL_SUB_TABS: { id: ModelSubTabType; label: string; icon: React.ElementType }[] = [
    { id: 'llm', label: 'LLM 预设', icon: Key },
    { id: 'vector', label: '向量化', icon: Cpu },
    { id: 'rerank', label: 'Rerank', icon: Layers },
];

// Tab 信息映射
const TAB_INFO: Record<MainTabType, { title: string; subtitle: string }> = {
    model: { title: '模型配置', subtitle: '管理 LLM、向量模型和重排序模型参数' },
    prompt: { title: '提示词模板', subtitle: '管理系统提示词、剧情推进和自定义宏' },
    regex: { title: '正则规则', subtitle: '配置基于正则的文本替换和处理规则' },
    worldbook: { title: '世界书', subtitle: '管理世界观设定和通过关键词触发的条目' },
};

interface APIPresetsProps {
    onNavigate?: (path: string) => void;
    initialTab?: MainTabType;
}

export const APIPresets: React.FC<APIPresetsProps> = ({ initialTab }) => {
    // Tab 状态
    const [mainTab, setMainTab] = useState<MainTabType>(initialTab || 'model');
    const currentInfo = TAB_INFO[mainTab];
    const [modelSubTab, setModelSubTab] = useState<ModelSubTabType>('llm');
    const [promptSubTab, setPromptSubTab] = useState<PromptSubTabType>('templates');  // V0.9.2
    const [worldbookSubTab, setWorldbookSubTab] = useState<WorldbookSubTabType>('global');
    const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

    // V0.9.2: 编辑中的自定义宏
    const [editingMacroId, setEditingMacroId] = useState<string | null>(null);

    // 移动端状态
    // V0.9.7: 使用统一的 useResponsive Hook
    const { isMobile } = useResponsive();
    const [showMobileForm, setShowMobileForm] = useState(false);

    // 监听 isMobile 变化，自动关闭全屏表单
    useEffect(() => {
        if (!isMobile) {
            setShowMobileForm(false);
        }
    }, [isMobile]);

    // 使用 Hook 管理业务状态
    // 使用组合 Hooks 管理业务状态
    const {
        llmPresets,
        selectedPresetId,
        promptTemplates,
        editingPreset,
        editingTemplate,
        hasChanges: llmHasChanges,
        selectPreset,
        addPreset,
        updatePreset,
        copyPreset,
        deletePreset,
        selectTemplate,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        resetAllTemplates, // V1.0.2
        saveLLMSettings,
    } = useLLMPresets();

    const {
        vectorConfig,
        rerankConfig,
        regexConfig,
        customMacros,
        updateVectorConfig,
        updateRerankConfig,
        updateRegexConfig,
        addCustomMacro,
        updateCustomMacro,
        deleteCustomMacro,
        toggleCustomMacro,
        saveConfig,
        hasChanges: configHasChanges,
    } = useConfig();

    const {
        regexRules,
        editingRule,
        hasChanges: regexHasChanges,
        selectRule,
        addRule,
        updateRule,
        toggleRule,
        deleteRule,
        resetRules,
        reorderRules,
        saveRegexRules,
    } = useRegexRules();

    const {
        worldbookConfig,
        worldbookStructure,
        disabledEntries,
        worldbookProfiles,
        addProfile,
        updateProfile,
        deleteProfile,
        hasChanges: worldbookHasChanges,
        updateWorldbookConfig,
        toggleWorldbook,
        toggleEntry,
        refreshWorldbooks,
        saveWorldInfo,
        worldbookScopes, // Added
    } = useWorldInfo();

    const availableWorldbooks = Object.keys(worldbookStructure || {});

    // 聚合保存
    const save = async () => {
        if (llmHasChanges) saveLLMSettings();
        if (configHasChanges) saveConfig();
        if (regexHasChanges) saveRegexRules();
        if (worldbookHasChanges) saveWorldInfo();
        // 简单提示
        // alert('配置已保存'); // 可选：使用更好看的 toast
    };

    const hasChanges = llmHasChanges || configHasChanges || regexHasChanges || worldbookHasChanges;

    // 聚合 settings 对象以兼容旧代码解构（如果需要），或者直接替换下方 JSX 中的引用
    // 为了最小化 JSX 变动，我们重构 JSX 中的引用
    const settings = {
        llmPresets,
        selectedPresetId,
        vectorConfig,
        rerankConfig,
        promptTemplates,
        worldbookConfig,
        regexConfig,
        customMacros
    };

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



    // 判断当前是否应该使用 Master-Detail 布局 (需要独立滚动)
    const isMasterDetail =
        ['prompt', 'regex'].includes(mainTab) ||
        (mainTab === 'model' && modelSubTab === 'llm');

    // =============== 移动端独立渲染 (顶层覆盖) ===============
    if (isMobile && showMobileForm) {
        // 1. LLM 预设编辑
        if (mainTab === 'model' && modelSubTab === 'llm' && editingPreset) {
            return (
                <MobileFullscreenForm
                    title="编辑 LLM 预设"
                    onClose={handleMobileClose}
                    actions={hasChanges && (
                        <button className="p-2 text-primary" onClick={save}>
                            <Save size={18} />
                        </button>
                    )}
                >
                    <LLMPresetForm preset={editingPreset} onChange={updatePreset} />
                </MobileFullscreenForm>
            );
        }

        // 2. 提示词模板 / 宏
        if (mainTab === 'prompt') {
            if (promptSubTab === 'templates' && editingTemplate) {
                return (
                    <MobileFullscreenForm
                        title="编辑提示词模板"
                        onClose={handleMobileClose}
                        actions={hasChanges && (
                            <button className="p-2 text-primary" onClick={save}>
                                <Save size={18} />
                            </button>
                        )}
                    >
                        <PromptTemplateForm
                            template={editingTemplate}
                            llmPresets={settings.llmPresets}
                            worldbookProfiles={worldbookProfiles}
                            defaultPresetId={settings.selectedPresetId}
                            onChange={updateTemplate}
                        />
                    </MobileFullscreenForm>
                );
            }
            if (promptSubTab === 'macros') {
                const editingMacro = (settings.customMacros || []).find(m => m.id === editingMacroId);
                if (editingMacro) {
                    return (
                        <MobileFullscreenForm
                            title="编辑自定义宏"
                            onClose={handleMobileClose}
                            actions={hasChanges && (
                                <button className="p-2 text-primary" onClick={save}>
                                    <Save size={18} />
                                </button>
                            )}
                        >
                            <CustomMacroForm
                                macro={editingMacro}
                                onChange={(updates) => updateCustomMacro(editingMacro.id, updates)}
                            />
                        </MobileFullscreenForm>
                    );
                }
            }
        }

        // 3. 正则规则
        if (mainTab === 'regex' && editingRule) {
            return (
                <MobileFullscreenForm
                    title="编辑正则规则"
                    onClose={handleMobileClose}
                    actions={hasChanges && (
                        <button className="p-2 text-primary" onClick={save}>
                            <Save size={18} />
                        </button>
                    )}
                >
                    <RegexRuleForm rule={editingRule} onChange={updateRule} />
                </MobileFullscreenForm>
            );
        }
    }

    // =============== 主视图 ===============
    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle
                breadcrumbs={['API 配置']}
                title={currentInfo.title}
                subtitle={currentInfo.subtitle}
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
                onChange={(id: string) => setMainTab(id as MainTabType)}
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

            <div className={`flex-1 ${isMasterDetail ? 'overflow-hidden flex flex-col' : 'overflow-y-auto no-scrollbar'}`}>
                {/* 模型配置 Tab */}
                {mainTab === 'model' && (
                    <div className="flex flex-col gap-2">
                        {/* 子 Tab - 使用负边距扩展到边缘 */}
                        <TabPills
                            tabs={MODEL_SUB_TABS.map(t => ({ ...t, icon: <t.icon size={14} /> }))}
                            activeTab={modelSubTab}
                            onChange={(id: string) => setModelSubTab(id as ModelSubTabType)}
                            sticky={false}
                            top={0}
                            className="!mb-4"
                        />

                        {/* LLM 预设 - Master-Detail */}
                        {modelSubTab === 'llm' && (
                            <MasterDetailLayout
                                className="h-full"
                                mobileDetailOpen={false} // Handled by early return
                                onMobileDetailClose={handleMobileClose}
                                listWidth="30%"
                                list={
                                    <div className="flex flex-col gap-4">
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
                                }
                                detail={
                                    editingPreset ? (
                                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                            <LLMPresetForm preset={editingPreset} onChange={updatePreset} />
                                        </div>
                                    ) : (
                                        <EmptyState
                                            icon={Key}
                                            title="未选择预设"
                                            description="选择从列表选择一个预设或创建新预设"
                                        />
                                    )
                                }
                            />
                        )}

                        {modelSubTab === 'vector' && <VectorConfigForm config={settings.vectorConfig} onChange={updateVectorConfig} />}
                        {modelSubTab === 'rerank' && <RerankConfigForm config={settings.rerankConfig} onChange={updateRerankConfig} />}
                    </div>
                )}

                {/* 提示词模板 Tab - Master-Detail */}
                {mainTab === 'prompt' && (
                    <MasterDetailLayout
                        listWidth="30%"
                        list={
                            <>
                                {/* V0.9.2: 子标签切换 */}
                                <div className="flex items-center gap-2 mb-4">
                                    <button
                                        onClick={() => setPromptSubTab('templates')}
                                        className={`text-xs font-bold uppercase tracking-wider transition-colors ${promptSubTab === 'templates'
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        提示词模板
                                    </button>
                                    <span className="text-muted-foreground/30">|</span>
                                    <button
                                        onClick={() => setPromptSubTab('macros')}
                                        className={`text-xs font-bold uppercase tracking-wider transition-colors ${promptSubTab === 'macros'
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        自定义宏
                                    </button>
                                </div>

                                {promptSubTab === 'templates' ? (
                                    <PromptTemplateList
                                        templates={settings.promptTemplates}
                                        selectedId={editingTemplate?.id || null}
                                        onSelect={(t) => handleMobileSelect(() => selectTemplate(t))}
                                        onAdd={addTemplate}
                                        onUpdate={updateTemplate}
                                        onDelete={deleteTemplate}
                                        onResetAll={resetAllTemplates}
                                    />
                                ) : (
                                    <CustomMacroList
                                        macros={settings.customMacros || []}
                                        selectedId={editingMacroId}
                                        onSelect={(macro) => handleMobileSelect(() => setEditingMacroId(macro.id))}
                                        onAdd={addCustomMacro}
                                        onToggle={toggleCustomMacro}
                                        onDelete={deleteCustomMacro}
                                    />
                                )}
                            </>
                        }
                        detail={
                            promptSubTab === 'templates' ? (
                                editingTemplate ? (
                                    <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                        <PromptTemplateForm
                                            template={editingTemplate}
                                            llmPresets={settings.llmPresets}
                                            worldbookProfiles={worldbookProfiles}
                                            defaultPresetId={settings.selectedPresetId}
                                            onChange={updateTemplate}
                                        />
                                    </div>
                                ) : (
                                    <EmptyState
                                        icon={FileText}
                                        title="未选择模板"
                                        description="选择一个模板进行编辑"
                                    />
                                )
                            ) : (
                                (() => {
                                    const editingMacro = (settings.customMacros || []).find(m => m.id === editingMacroId);
                                    return editingMacro ? (
                                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                            <CustomMacroForm
                                                macro={editingMacro}
                                                onChange={(updates) => updateCustomMacro(editingMacro.id, updates)}
                                            />
                                        </div>
                                    ) : (
                                        <EmptyState
                                            icon={Braces}
                                            title="未选择宏"
                                            description="选择一个宏进行编辑"
                                        />
                                    );
                                })()
                            )
                        }
                    />
                )}

                {/* 正则规则 Tab - Master-Detail */}
                {mainTab === 'regex' && (
                    <MasterDetailLayout
                        mobileDetailOpen={false} // Already handled by early return
                        onMobileDetailClose={handleMobileClose}
                        listWidth="30%"
                        list={
                            <RegexRuleList
                                rules={regexRules}
                                selectedId={editingRule?.id || null}
                                onSelect={(r) => handleMobileSelect(() => selectRule(r))}
                                onToggle={toggleRule}
                                onDelete={deleteRule}
                                onAdd={addRule}
                                onReset={resetRules}
                                onReorder={reorderRules}
                                enableNativeRegex={settings.regexConfig?.enableNativeRegex ?? true}
                                onToggleNativeRegex={(enabled) => updateRegexConfig({
                                    ...settings.regexConfig,
                                    enableNativeRegex: enabled
                                })}
                            />
                        }
                        detail={
                            editingRule ? (
                                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                    <RegexRuleForm rule={editingRule} onChange={updateRule} />
                                </div>
                            ) : (
                                <EmptyState
                                    icon={Regex}
                                    title="未选择规则"
                                    description="选择从列表选择一个规则或创建新规则"
                                />
                            )
                        }
                    />
                )}

                {/* 世界书配置 Tab */}
                {mainTab === 'worldbook' && (
                    <div className="flex flex-col h-full gap-2">
                        {/* Sub Tabs */}
                        <div className="flex items-center gap-2 mb-2 px-1">
                            <button
                                onClick={() => setWorldbookSubTab('global')}
                                className={`text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-full ${worldbookSubTab === 'global'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                全局设置
                            </button>
                            <button
                                onClick={() => setWorldbookSubTab('profiles')}
                                className={`text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-full ${worldbookSubTab === 'profiles'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                知识库方案
                            </button>
                        </div>

                        {worldbookSubTab === 'global' && (
                            <div className="max-w-2xl py-4 flex-1 overflow-y-auto custom-scrollbar">
                                <WorldbookConfigForm
                                    config={worldbookConfig || { enabled: false, includeGlobal: false, disabledWorldbooks: [] }}
                                    onChange={updateWorldbookConfig}
                                    worldbookStructure={Object.fromEntries(
                                        Object.entries(worldbookStructure || {}).filter(([key]) => {
                                            const scopes = worldbookScopes || { global: [], chat: [] };
                                            return scopes.global.includes(key) || scopes.chat.includes(key);
                                        })
                                    )}
                                    disabledEntries={disabledEntries}
                                    onToggleWorldbook={toggleWorldbook}
                                    onToggleEntry={toggleEntry}
                                    onRefresh={refreshWorldbooks}
                                />
                            </div>
                        )}

                        {worldbookSubTab === 'profiles' && (
                            <MasterDetailLayout
                                listWidth="30%"
                                list={
                                    <WorldbookProfileList
                                        profiles={worldbookProfiles}
                                        selectedId={editingProfileId}
                                        onSelect={(p) => handleMobileSelect(() => setEditingProfileId(p.id))}
                                        onAdd={() => {
                                            const newProfile: WorldbookConfigProfile = {
                                                id: `wb_profile_${Date.now()}`,
                                                name: '新知识库方案',
                                                mode: 'custom',
                                                selectedWorldbooks: worldbookScopes?.chat || [],
                                                createdAt: Date.now(),
                                                updatedAt: Date.now()
                                            };
                                            addProfile(newProfile);
                                            handleMobileSelect(() => setEditingProfileId(newProfile.id));
                                        }}
                                        onDelete={deleteProfile}
                                    />
                                }
                                detail={
                                    (() => {
                                        const profile = worldbookProfiles.find(p => p.id === editingProfileId);
                                        return profile ? (
                                            <div className="h-full animate-in fade-in slide-in-from-right-2 duration-300">
                                                <WorldbookProfileForm
                                                    profile={profile}
                                                    onChange={updateProfile}
                                                    availableWorldbooks={availableWorldbooks}
                                                    charWorldbooks={worldbookScopes?.chat || []}
                                                />
                                            </div>
                                        ) : (
                                            <EmptyState
                                                icon={Book}
                                                title="未选择方案"
                                                description="选择一个方案进行编辑或创建新方案"
                                            />
                                        );
                                    })()
                                }
                                mobileDetailOpen={false}
                                onMobileDetailClose={handleMobileClose}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


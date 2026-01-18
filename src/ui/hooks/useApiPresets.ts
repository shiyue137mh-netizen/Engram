/**
 * useAPIPresets - API 预设管理 Hook (Composite Wrapper)
 *
 * @deprecated 建议直接使用各个独立的 Hook: useLLMPresets, useWorldInfo, useRegexRules, useConfig
 */

import { useCallback } from 'react';
import { useLLMPresets } from './useLLMPresets';
import { useWorldInfo } from './useWorldInfo';
import { useRegexRules } from './useRegexRules';
import { useConfig } from './useConfig';
// import type { UseAPIPresetsReturn } from './useApiPresets'; // Removed self-reference
import type { EngramAPISettings, LLMPreset, PromptTemplate, VectorConfig, RerankConfig, WorldbookConfig, GlobalRegexConfig, RecallConfig, CustomMacro } from '@/config/types/defaults';
import { RegexRule } from '@/modules/memory/extractors/RegexProcessor';

// Re-export interface for backward compatibility
export interface UseAPIPresetsReturn {
    // State
    settings: EngramAPISettings;
    editingPreset: LLMPreset | null;
    editingTemplate: PromptTemplate | null;
    hasChanges: boolean;
    regexRules: RegexRule[];
    editingRule: RegexRule | null;

    worldbookStructure: Record<string, any[]>;
    disabledEntries: Record<string, number[]>;
    currentCharWorldbook: string | null;

    toggleWorldbook: (name: string, disabled: boolean) => void;
    toggleEntry: (worldbook: string, uid: number, disabled: boolean) => void;
    refreshWorldbooks: () => Promise<void>;

    selectPreset: (preset: LLMPreset) => void;
    addPreset: () => void;
    updatePreset: (preset: LLMPreset) => void;
    copyPreset: (preset: LLMPreset) => void;
    deletePreset: (preset: LLMPreset) => void;

    selectTemplate: (template: PromptTemplate) => void;
    addTemplate: (template: PromptTemplate) => void;
    updateTemplate: (template: PromptTemplate) => void;
    deleteTemplate: (template: PromptTemplate) => void;

    updateVectorConfig: (config: VectorConfig) => void;
    updateRerankConfig: (config: RerankConfig) => void;
    updateWorldbookConfig: (config: WorldbookConfig) => void;
    updateRegexConfig: (config: GlobalRegexConfig) => void;
    updateRecallConfig: (config: RecallConfig) => void;

    selectRule: (id: string) => void;
    addRule: () => void;
    updateRule: (updates: Partial<RegexRule>) => void;
    toggleRule: (id: string) => void;
    deleteRule: (id: string) => void;
    resetRules: () => void;
    reorderRules: (rules: RegexRule[]) => void;

    addCustomMacro: () => void;
    updateCustomMacro: (id: string, updates: Partial<CustomMacro>) => void;
    deleteCustomMacro: (id: string) => void;
    toggleCustomMacro: (id: string) => void;

    save: () => void;
}


export function useAPIPresets(): UseAPIPresetsReturn {
    const llm = useLLMPresets();
    const worldInfo = useWorldInfo();
    const regex = useRegexRules();
    const config = useConfig();

    const save = useCallback(() => {
        llm.saveLLMSettings();
        worldInfo.saveWorldInfoState();
        regex.saveRegexRules();
        config.saveConfig();
    }, [llm, worldInfo, regex, config]);

    // Construct the settings object dynamically
    const settings: EngramAPISettings = {
        llmPresets: llm.llmPresets,
        selectedPresetId: llm.selectedPresetId,
        promptTemplates: llm.promptTemplates,
        vectorConfig: config.vectorConfig,
        rerankConfig: config.rerankConfig,
        worldbookConfig: {
            disabledWorldbooks: worldInfo.disabledWorldbooks
        },
        regexConfig: config.regexConfig,
        recallConfig: config.recallConfig,
        customMacros: config.customMacros,
        // Fill other generic fields if necessary, or assume defaults are handled by sub-hooks
    } as EngramAPISettings;

    const hasChanges = llm.hasChanges || regex.hasChanges || config.hasChanges;

    return {
        // LLM
        settings,
        editingPreset: llm.editingPreset,
        editingTemplate: llm.editingTemplate,
        selectPreset: llm.selectPreset,
        addPreset: llm.addPreset,
        updatePreset: llm.updatePreset,
        copyPreset: llm.copyPreset,
        deletePreset: llm.deletePreset,
        selectTemplate: llm.selectTemplate,
        addTemplate: llm.addTemplate,
        updateTemplate: llm.updateTemplate,
        deleteTemplate: llm.deleteTemplate,

        // World Info
        worldbookStructure: worldInfo.worldbookStructure,
        disabledEntries: worldInfo.disabledEntries,
        currentCharWorldbook: worldInfo.currentCharWorldbook,
        toggleWorldbook: worldInfo.toggleWorldbook,
        toggleEntry: worldInfo.toggleEntry,
        refreshWorldbooks: worldInfo.refreshWorldbooks,
        updateWorldbookConfig: () => { console.warn("updateWorldbookConfig via useAPIPresets is partial"); }, // Placeholder as logic moved to useWorldInfo

        // Regex
        regexRules: regex.regexRules,
        editingRule: regex.editingRule,
        selectRule: regex.selectRule,
        addRule: regex.addRule,
        updateRule: regex.updateRule,
        toggleRule: regex.toggleRule,
        deleteRule: regex.deleteRule,
        resetRules: regex.resetRules,
        reorderRules: regex.reorderRules,

        // Config
        updateVectorConfig: config.updateVectorConfig,
        updateRerankConfig: config.updateRerankConfig,
        updateRecallConfig: config.updateRecallConfig,
        updateRegexConfig: config.updateRegexConfig,
        addCustomMacro: config.addCustomMacro,
        updateCustomMacro: config.updateCustomMacro,
        deleteCustomMacro: config.deleteCustomMacro,
        toggleCustomMacro: config.toggleCustomMacro,

        hasChanges,
        save,
    };
}

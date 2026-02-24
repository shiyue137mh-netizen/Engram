/**
 * useLLMPresets - LLM 预设与提示词模板管理
 */

import { SettingsManager } from '@/config/settings';
import type { EngramAPISettings, LLMPreset, PromptTemplate } from '@/config/types/defaults';
import { createDefaultLLMPreset, getBuiltInPromptTemplates, getDefaultAPISettings } from '@/config/types/defaults';
import { useCallback, useEffect, useState } from 'react';

export interface UseLLMPresetsReturn {
    llmPresets: LLMPreset[];
    selectedPresetId: string | null;
    promptTemplates: PromptTemplate[];
    editingPreset: LLMPreset | null;
    editingTemplate: PromptTemplate | null;
    hasChanges: boolean;

    // 预设操作
    selectPreset: (preset: LLMPreset) => void;
    addPreset: () => void;
    updatePreset: (preset: LLMPreset) => void;
    copyPreset: (preset: LLMPreset) => void;
    deletePreset: (preset: LLMPreset) => void;

    // 模板操作
    selectTemplate: (template: PromptTemplate) => void;
    addTemplate: (template: PromptTemplate) => void;
    updateTemplate: (template: PromptTemplate) => void;
    deleteTemplate: (template: PromptTemplate) => void;
    /** V1.0.2: 重置所有内置模板为默认值 */
    resetAllTemplates: () => void;

    // 保存
    saveLLMSettings: () => void;
}

/**
 * 合并提示词模板 (Helper)
 */
function mergePromptTemplates(
    defaultTemplates: PromptTemplate[],
    savedTemplates: PromptTemplate[]
): PromptTemplate[] {
    const result: PromptTemplate[] = [];
    for (const defaultTemplate of defaultTemplates.filter(t => t.isBuiltIn)) {
        let savedBuiltIn = savedTemplates.find(t => t.id === defaultTemplate.id);
        if (!savedBuiltIn) {
            savedBuiltIn = savedTemplates.find(
                t => t.isBuiltIn && t.category === defaultTemplate.category && t.name === defaultTemplate.name
            );
        }
        if (savedBuiltIn) {
            result.push({ ...savedBuiltIn, id: defaultTemplate.id });
        } else {
            result.push(defaultTemplate);
        }
    }
    const customTemplates = savedTemplates.filter(t => !t.isBuiltIn);
    result.push(...customTemplates);
    return result;
}

export function useLLMPresets(): UseLLMPresetsReturn {
    const [settings, setSettings] = useState<EngramAPISettings>(getDefaultAPISettings);
    const [editingPreset, setEditingPreset] = useState<LLMPreset | null>(null);
    const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    // 加载配置
    useEffect(() => {
        const savedAPISettings = SettingsManager.get('apiSettings');
        if (savedAPISettings) {
            const defaultSettings = getDefaultAPISettings();
            setSettings({
                ...defaultSettings,
                ...savedAPISettings,
                selectedPresetId: savedAPISettings.selectedPresetId || defaultSettings.selectedPresetId,
                llmPresets: savedAPISettings.llmPresets?.length > 0
                    ? savedAPISettings.llmPresets
                    : defaultSettings.llmPresets,
                promptTemplates: mergePromptTemplates(
                    defaultSettings.promptTemplates,
                    savedAPISettings.promptTemplates || []
                ),
            });
        }
    }, []);

    const selectPreset = useCallback((preset: LLMPreset) => {
        setSettings(prev => ({ ...prev, selectedPresetId: preset.id }));
        setEditingPreset(preset);
        setHasChanges(true);
    }, []);

    const addPreset = useCallback(() => {
        const newPreset = createDefaultLLMPreset(`预设 ${settings.llmPresets.length + 1}`);
        newPreset.isDefault = false;
        setSettings(prev => ({
            ...prev,
            llmPresets: [...prev.llmPresets, newPreset],
            selectedPresetId: newPreset.id,
        }));
        setEditingPreset(newPreset);
        setHasChanges(true);
    }, [settings.llmPresets.length]);

    const updatePreset = useCallback((updated: LLMPreset) => {
        setSettings(prev => ({
            ...prev,
            llmPresets: prev.llmPresets.map(p => p.id === updated.id ? updated : p),
        }));
        setEditingPreset(updated);
        setHasChanges(true);
    }, []);

    const copyPreset = useCallback((preset: LLMPreset) => {
        const copy: LLMPreset = {
            ...preset,
            id: `preset_${Date.now()}`,
            name: `${preset.name} (副本)`,
            isDefault: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setSettings(prev => ({ ...prev, llmPresets: [...prev.llmPresets, copy] }));
        setHasChanges(true);
    }, []);

    const deletePreset = useCallback((preset: LLMPreset) => {
        if (preset.isDefault) return;
        setSettings(prev => ({
            ...prev,
            llmPresets: prev.llmPresets.filter(p => p.id !== preset.id),
            selectedPresetId: prev.selectedPresetId === preset.id ? null : prev.selectedPresetId,
        }));
        setEditingPreset(current => current?.id === preset.id ? null : current);
        setHasChanges(true);
    }, []);

    const selectTemplate = useCallback((template: PromptTemplate) => {
        setEditingTemplate(template);
    }, []);

    const addTemplate = useCallback((template: PromptTemplate) => {
        setSettings(prev => ({
            ...prev,
            promptTemplates: [...prev.promptTemplates, template],
        }));
        setHasChanges(true);
    }, []);

    const updateTemplate = useCallback((updated: PromptTemplate) => {
        setSettings(prev => ({
            ...prev,
            promptTemplates: prev.promptTemplates.map(t => t.id === updated.id ? updated : t),
        }));
        setEditingTemplate(updated);
        setHasChanges(true);
    }, []);

    const deleteTemplate = useCallback((template: PromptTemplate) => {
        if (template.isBuiltIn) return;
        setSettings(prev => ({
            ...prev,
            promptTemplates: prev.promptTemplates.filter(t => t.id !== template.id),
        }));
        setEditingTemplate(current => current?.id === template.id ? null : current);
        setHasChanges(true);
    }, []);

    /**
     * V1.3.3: 重置所有内置模板为默认值
     * - 将所有内置模板恢复为默认内容
     * - 保留用户自定义的模板
     * - 保留当前启用状态和世界书绑定
     */
    const resetAllTemplates = useCallback(() => {
        const builtInDefaults = getBuiltInPromptTemplates();
        setSettings(prev => {
            // 保留自定义模板
            const customTemplates = prev.promptTemplates.filter(t => !t.isBuiltIn);

            // 合并默认值与当前状态 (保留 enabled 和 extraWorldbooks)
            const mergedDefaults = builtInDefaults.map(def => {
                const current = prev.promptTemplates.find(t => t.id === def.id);
                if (current) {
                    return {
                        ...def,
                        enabled: current.enabled,
                        extraWorldbooks: current.extraWorldbooks,
                    };
                }
                return def;
            });

            return {
                ...prev,
                promptTemplates: [...mergedDefaults, ...customTemplates],
            };
        });
        setEditingTemplate(null);
        setHasChanges(true);
    }, []);

    const saveLLMSettings = useCallback(() => {
        // 仅保存 LLM 相关设置，保留其他设置
        const currentSettings = SettingsManager.get('apiSettings') || {};
        SettingsManager.set('apiSettings', {
            ...currentSettings,
            llmPresets: settings.llmPresets,
            selectedPresetId: settings.selectedPresetId,
            promptTemplates: settings.promptTemplates,
        } as any);
        setHasChanges(false);
    }, [settings]);

    return {
        llmPresets: settings.llmPresets,
        selectedPresetId: settings.selectedPresetId,
        promptTemplates: settings.promptTemplates,
        editingPreset,
        editingTemplate,
        hasChanges,
        selectPreset,
        addPreset,
        updatePreset,
        copyPreset,
        deletePreset,
        selectTemplate,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        resetAllTemplates,
        saveLLMSettings,
    };
}

/**
 * useAPIPresets - API 预设管理 Hook
 * 
 * 将 APIPresetsView 中的状态管理逻辑抽离出来，
 * 使视图组件只负责 UI 渲染。
 */

import { useState, useEffect, useCallback } from 'react';
import type {
    EngramAPISettings,
    LLMPreset,
    VectorConfig,
    RerankConfig,
    PromptTemplate,
    WorldbookConfig,
} from '../core/api/types';
import {
    getDefaultAPISettings,
    createDefaultLLMPreset,
} from '../core/api/types';
import { RegexRule, DEFAULT_REGEX_RULES } from '../core/summarizer/RegexProcessor';
import { SettingsManager } from '../infrastructure/SettingsManager';
import { WorldBookStateService } from '../infrastructure/WorldBookStateService';
import { WorldInfoService } from '../infrastructure/tavern/WorldInfoService';
import { getTavernHelper } from '../infrastructure/tavern/WorldInfoService';

export interface UseAPIPresetsReturn {
    // 状态
    settings: EngramAPISettings;
    editingPreset: LLMPreset | null;
    editingTemplate: PromptTemplate | null;
    hasChanges: boolean;
    regexRules: RegexRule[];
    editingRule: RegexRule | null;

    // 世界书状态
    worldbookStructure: Record<string, any[]>;
    disabledEntries: Record<string, number[]>;
    currentCharWorldbook: string | null;
    // 世界书操作
    toggleWorldbook: (name: string, disabled: boolean) => void;
    toggleEntry: (worldbook: string, uid: number, disabled: boolean) => void;
    refreshWorldbooks: () => Promise<void>;

    // LLM 预设操作
    selectPreset: (preset: LLMPreset) => void;
    addPreset: () => void;
    updatePreset: (preset: LLMPreset) => void;
    copyPreset: (preset: LLMPreset) => void;
    deletePreset: (preset: LLMPreset) => void;

    // 提示词模板操作
    selectTemplate: (template: PromptTemplate) => void;
    addTemplate: (template: PromptTemplate) => void;
    updateTemplate: (template: PromptTemplate) => void;
    deleteTemplate: (template: PromptTemplate) => void;

    // 配置操作
    updateVectorConfig: (config: VectorConfig) => void;
    updateRerankConfig: (config: RerankConfig) => void;
    updateWorldbookConfig: (config: WorldbookConfig) => void;

    // 正则规则操作
    selectRule: (id: string) => void;
    addRule: () => void;
    updateRule: (updates: Partial<RegexRule>) => void;
    toggleRule: (id: string) => void;
    deleteRule: (id: string) => void;
    resetRules: () => void;

    // 保存
    save: () => void;
}

export function useAPIPresets(): UseAPIPresetsReturn {
    // 配置状态
    const [settings, setSettings] = useState<EngramAPISettings>(getDefaultAPISettings);

    // 编辑状态
    const [editingPreset, setEditingPreset] = useState<LLMPreset | null>(null);
    const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    // 正则规则状态
    const [regexRules, setRegexRules] = useState<RegexRule[]>([...DEFAULT_REGEX_RULES]);
    const [editingRule, setEditingRule] = useState<RegexRule | null>(null);

    // 世界书状态
    const [worldbookStructure, setWorldbookStructure] = useState<Record<string, any[]>>({});
    const [disabledEntries, setDisabledEntries] = useState<Record<string, number[]>>({});
    const [currentCharWorldbook, setCurrentCharWorldbook] = useState<string | null>(null);

    // 加载世界书结构和状态
    const loadWorldbookState = useCallback(async () => {
        // 1. 加载结构
        const structure = await WorldInfoService.getWorldbookStructure();
        setWorldbookStructure(structure);

        // 2. 加载当前角色状态
        const helper = getTavernHelper();
        const charBooks = helper?.getCharWorldbookNames?.('current');
        if (charBooks?.primary) {
            setCurrentCharWorldbook(charBooks.primary);
            const state = await WorldBookStateService.loadState(charBooks.primary);
            if (state.disabledEntries) {
                setDisabledEntries(state.disabledEntries);
            }
        }
    }, []);

    // 初始加载
    useEffect(() => {
        loadWorldbookState();
    }, [loadWorldbookState]);

    // 加载保存的配置
    useEffect(() => {
        // 从 SettingsManager 加载 API 设置
        const savedAPISettings = SettingsManager.get('apiSettings');
        if (savedAPISettings) {
            // 合并保存的设置，确保内置模板不丢失
            const defaultSettings = getDefaultAPISettings();
            const mergedSettings: EngramAPISettings = {
                ...defaultSettings,
                ...savedAPISettings,
                // 合并预设：保留用户预设，确保至少有一个默认
                llmPresets: savedAPISettings.llmPresets?.length > 0
                    ? savedAPISettings.llmPresets
                    : defaultSettings.llmPresets,
                // 合并模板：内置模板 + 用户自定义模板
                promptTemplates: [
                    ...defaultSettings.promptTemplates.filter(t => t.isBuiltIn),
                    ...(savedAPISettings.promptTemplates || []).filter((t: PromptTemplate) => !t.isBuiltIn),
                ],
            };
            setSettings(mergedSettings);
        }

        // 从 SettingsManager 加载正则规则
        const savedRules = SettingsManager.getRegexRules();
        if (savedRules && savedRules.length > 0) {
            setRegexRules(savedRules);
        }
    }, []);

    // ==================== LLM 预设操作 ====================

    const selectPreset = useCallback((preset: LLMPreset) => {
        setSettings((prev) => ({ ...prev, selectedPresetId: preset.id }));
        setEditingPreset(preset);
    }, []);

    const addPreset = useCallback(() => {
        const newPreset = createDefaultLLMPreset(`预设 ${settings.llmPresets.length + 1}`);
        newPreset.isDefault = false;
        setSettings((prev) => ({
            ...prev,
            llmPresets: [...prev.llmPresets, newPreset],
            selectedPresetId: newPreset.id,
        }));
        setEditingPreset(newPreset);
        setHasChanges(true);
    }, [settings.llmPresets.length]);

    const updatePreset = useCallback((updated: LLMPreset) => {
        setSettings((prev) => ({
            ...prev,
            llmPresets: prev.llmPresets.map((p) => p.id === updated.id ? updated : p),
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
        setSettings((prev) => ({ ...prev, llmPresets: [...prev.llmPresets, copy] }));
        setHasChanges(true);
    }, []);

    const deletePreset = useCallback((preset: LLMPreset) => {
        if (preset.isDefault) return;
        setSettings((prev) => ({
            ...prev,
            llmPresets: prev.llmPresets.filter((p) => p.id !== preset.id),
            selectedPresetId: prev.selectedPresetId === preset.id ? null : prev.selectedPresetId,
        }));
        setEditingPreset((current) => current?.id === preset.id ? null : current);
        setHasChanges(true);
    }, []);

    // ==================== 提示词模板操作 ====================

    const selectTemplate = useCallback((template: PromptTemplate) => {
        setEditingTemplate(template);
    }, []);

    const addTemplate = useCallback((template: PromptTemplate) => {
        setSettings((prev) => ({
            ...prev,
            promptTemplates: [...prev.promptTemplates, template],
        }));
        setHasChanges(true);
    }, []);

    const updateTemplate = useCallback((updated: PromptTemplate) => {
        setSettings((prev) => ({
            ...prev,
            promptTemplates: prev.promptTemplates.map((t) => t.id === updated.id ? updated : t),
        }));
        setEditingTemplate(updated);
        setHasChanges(true);
    }, []);

    const deleteTemplate = useCallback((template: PromptTemplate) => {
        if (template.isBuiltIn) return;
        setSettings((prev) => ({
            ...prev,
            promptTemplates: prev.promptTemplates.filter((t) => t.id !== template.id),
        }));
        setEditingTemplate((current) => current?.id === template.id ? null : current);
        setHasChanges(true);
    }, []);

    // ==================== 配置操作 ====================

    const updateVectorConfig = useCallback((config: VectorConfig) => {
        setSettings((prev) => ({ ...prev, vectorConfig: config }));
        setHasChanges(true);
    }, []);

    const updateRerankConfig = useCallback((config: RerankConfig) => {
        setSettings((prev) => ({ ...prev, rerankConfig: config }));
        setHasChanges(true);
    }, []);

    const updateWorldbookConfig = useCallback((config: WorldbookConfig) => {
        setSettings((prev) => ({ ...prev, worldbookConfig: config }));
        setHasChanges(true);
    }, []);

    const toggleWorldbook = useCallback((name: string, disabled: boolean) => {
        setSettings(prev => {
            const currentDisabled = prev.worldbookConfig.disabledWorldbooks || [];
            let newDisabled;
            if (disabled) {
                newDisabled = [...new Set([...currentDisabled, name])];
            } else {
                newDisabled = currentDisabled.filter(n => n !== name);
            }
            return {
                ...prev,
                worldbookConfig: {
                    ...prev.worldbookConfig,
                    disabledWorldbooks: newDisabled
                }
            };
        });
        setHasChanges(true);
    }, []);

    const toggleEntry = useCallback((worldbook: string, uid: number, disabled: boolean) => {
        setDisabledEntries(prev => {
            const currentList = prev[worldbook] || [];
            let newList;
            if (disabled) {
                newList = [...new Set([...currentList, uid])];
            } else {
                newList = currentList.filter(id => id !== uid);
            }
            return {
                ...prev,
                [worldbook]: newList
            };
        });
        setHasChanges(true);
    }, []);

    // ==================== 正则规则操作 ====================

    const selectRule = useCallback((id: string) => {
        const rule = regexRules.find(r => r.id === id);
        setEditingRule(rule || null);
    }, [regexRules]);

    const addRule = useCallback(() => {
        const newRule: RegexRule = {
            id: `rule_${Date.now()}`,
            name: '新规则',
            pattern: '',
            replacement: '',
            enabled: true,
            flags: 'gi',
            scope: 'both',
            description: '',
        };
        setRegexRules(prev => [...prev, newRule]);
        setEditingRule(newRule);
        setHasChanges(true);
    }, []);

    const updateRule = useCallback((updates: Partial<RegexRule>) => {
        if (!editingRule) return;
        const updated = { ...editingRule, ...updates };
        setEditingRule(updated);
        setRegexRules(prev => prev.map(r => r.id === updated.id ? updated : r));
        setHasChanges(true);
    }, [editingRule]);

    const toggleRule = useCallback((id: string) => {
        setRegexRules(prev => prev.map(r =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
        ));
        setHasChanges(true);
    }, []);

    const deleteRule = useCallback((id: string) => {
        setRegexRules(prev => prev.filter(r => r.id !== id));
        setEditingRule((current) => current?.id === id ? null : current);
        setHasChanges(true);
    }, []);

    const resetRules = useCallback(() => {
        setRegexRules([...DEFAULT_REGEX_RULES]);
        setEditingRule(null);
        setHasChanges(true);
    }, []);

    // ==================== 保存 ====================

    const save = useCallback(async () => {
        // 保存 API 设置到 SettingsManager
        SettingsManager.set('apiSettings', settings);
        // 保存正则规则到 SettingsManager
        SettingsManager.setRegexRules(regexRules);

        // 保存角色特定的世界书状态
        if (currentCharWorldbook) {
            await WorldBookStateService.saveState(currentCharWorldbook, {
                disabledEntries
            });
        }

        console.log('[Engram] 保存配置:', settings, regexRules, disabledEntries);
        setHasChanges(false);
    }, [settings, regexRules, currentCharWorldbook, disabledEntries]);

    return {
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
        toggleWorldbook,
        toggleEntry,
        refreshWorldbooks: loadWorldbookState,
        worldbookStructure,
        disabledEntries,
        currentCharWorldbook,

        selectRule,
        addRule,
        updateRule,
        toggleRule,
        deleteRule,
        resetRules,

        save,
    };
}

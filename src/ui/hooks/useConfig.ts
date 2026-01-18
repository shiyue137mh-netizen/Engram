/**
 * useConfig - 通用配置管理 Hook
 *
 * 管理 Vector, Rerank, Recall, Preprocessing, CustomMacro 等配置
 */

import { useState, useCallback, useEffect } from 'react';
import { SettingsManager } from "@/config/settings";
import type {
    VectorConfig,
    RerankConfig,
    RecallConfig,
    CustomMacro,
    GlobalRegexConfig
} from '@/config/types/defaults';
import { getDefaultAPISettings } from '@/config/types/defaults';

import { EntityExtractConfig } from '@/config/types/memory';

export interface UseConfigReturn {
    vectorConfig: VectorConfig;
    rerankConfig: RerankConfig;
    recallConfig: RecallConfig;
    regexConfig: GlobalRegexConfig;
    entityExtractConfig: EntityExtractConfig; // New
    customMacros: CustomMacro[];

    updateVectorConfig: (config: VectorConfig) => void;
    updateRerankConfig: (config: RerankConfig) => void;
    updateRecallConfig: (config: RecallConfig) => void;
    updateRegexConfig: (config: GlobalRegexConfig) => void;
    updateEntityExtractConfig: (config: EntityExtractConfig) => void; // New

    // 自定义宏
    addCustomMacro: () => void;
    updateCustomMacro: (id: string, updates: Partial<CustomMacro>) => void;
    deleteCustomMacro: (id: string) => void;
    toggleCustomMacro: (id: string) => void;

    saveConfig: () => void;
    hasChanges: boolean;
}

export function useConfig(): UseConfigReturn {
    // 初始状态使用默认值，避免 null
    const defaults = getDefaultAPISettings();

    const [vectorConfig, setVectorConfig] = useState<VectorConfig>(defaults.vectorConfig!);
    const [rerankConfig, setRerankConfig] = useState<RerankConfig>(defaults.rerankConfig!);
    const [recallConfig, setRecallConfig] = useState<RecallConfig>(defaults.recallConfig!);
    const [regexConfig, setRegexConfig] = useState<GlobalRegexConfig>(defaults.regexConfig!);
    const [entityExtractConfig, setEntityExtractConfig] = useState<EntityExtractConfig>(defaults.entityExtractConfig || { enabled: false, trigger: 'floor', floorInterval: 10, keepRecentCount: 5 });
    const [customMacros, setCustomMacros] = useState<CustomMacro[]>(defaults.customMacros || []);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const saved = SettingsManager.get('apiSettings');
        if (saved) {
            if (saved.vectorConfig) setVectorConfig(saved.vectorConfig);
            if (saved.rerankConfig) setRerankConfig(saved.rerankConfig);
            if (saved.recallConfig) setRecallConfig(saved.recallConfig);
            if (saved.regexConfig) setRegexConfig(saved.regexConfig);
            if (saved.entityExtractConfig) setEntityExtractConfig(saved.entityExtractConfig);
            if (saved.customMacros) setCustomMacros(saved.customMacros);
        }
    }, []);

    const updateVectorConfig = useCallback((config: VectorConfig) => {
        setVectorConfig(config);
        setHasChanges(true);
    }, []);

    const updateRerankConfig = useCallback((config: RerankConfig) => {
        setRerankConfig(config);
        setHasChanges(true);
    }, []);

    const updateRecallConfig = useCallback((config: RecallConfig) => {
        setRecallConfig(config);
        setHasChanges(true);
    }, []);

    const updateRegexConfig = useCallback((config: GlobalRegexConfig) => {
        setRegexConfig(config);
        setHasChanges(true);
    }, []);

    const updateEntityExtractConfig = useCallback((config: EntityExtractConfig) => {
        setEntityExtractConfig(config);
        setHasChanges(true);
    }, []);

    // Custom Macros
    const addCustomMacro = useCallback(() => {
        const newMacro: CustomMacro = {
            id: `custom_${Date.now()}`,
            name: '新宏',
            content: '',
            enabled: true,
            createdAt: Date.now(),
        };
        setCustomMacros(prev => [...prev, newMacro]);
        setHasChanges(true);
    }, []);

    const updateCustomMacro = useCallback((id: string, updates: Partial<CustomMacro>) => {
        setCustomMacros(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
        setHasChanges(true);
    }, []);

    const deleteCustomMacro = useCallback((id: string) => {
        setCustomMacros(prev => prev.filter(m => m.id !== id));
        setHasChanges(true);
    }, []);

    const toggleCustomMacro = useCallback((id: string) => {
        setCustomMacros(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
        setHasChanges(true);
    }, []);

    const saveConfig = useCallback(() => {
        const currentSettings = SettingsManager.get('apiSettings') || {};
        SettingsManager.set('apiSettings', {
            ...currentSettings,
            vectorConfig,
            rerankConfig,
            recallConfig,
            regexConfig,
            entityExtractConfig,
            customMacros,
        } as any);
        setHasChanges(false);
    }, [vectorConfig, rerankConfig, recallConfig, regexConfig, entityExtractConfig, customMacros]);

    return {
        vectorConfig,
        rerankConfig,
        recallConfig,
        regexConfig,
        entityExtractConfig,
        customMacros,
        updateVectorConfig,
        updateRerankConfig,
        updateRecallConfig,
        updateRegexConfig,
        updateEntityExtractConfig,
        addCustomMacro,
        updateCustomMacro,
        deleteCustomMacro,
        toggleCustomMacro,
        saveConfig,
        hasChanges,
    };
}

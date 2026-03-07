import { SettingsManager } from '@/config/settings';
import {
    DEFAULT_EMBEDDING_CONFIG,
    getDefaultAPISettings,
    type CustomMacro,
    type EmbeddingConfig,
    type GlobalRegexConfig,
    type RecallConfig,
    type RerankConfig,
    type VectorConfig,
} from '@/config/types/defaults';
import type { EntityExtractConfig } from '@/config/types/memory';
import { create } from 'zustand';

export interface ConfigState {
    vectorConfig: VectorConfig;
    rerankConfig: RerankConfig;
    recallConfig: RecallConfig;
    regexConfig: GlobalRegexConfig;
    entityExtractConfig: EntityExtractConfig;
    embeddingConfig: EmbeddingConfig;
    customMacros: CustomMacro[];
    hasChanges: boolean;

    updateVectorConfig: (config: VectorConfig) => void;
    updateRerankConfig: (config: RerankConfig) => void;
    updateRecallConfig: (config: RecallConfig) => void;
    updateRegexConfig: (config: GlobalRegexConfig) => void;
    updateEntityExtractConfig: (config: EntityExtractConfig) => void;
    updateEmbeddingConfig: (config: EmbeddingConfig) => void;

    // Batch update to reduce re-renders
    updateMultipleConfigs: (updates: Partial<Omit<ConfigState, 'hasChanges' | 'initFromSettings' | 'saveConfig' | 'updateMultipleConfigs' | 'addCustomMacro' | 'updateCustomMacro' | 'deleteCustomMacro' | 'toggleCustomMacro'>>) => void;

    addCustomMacro: () => void;
    updateCustomMacro: (id: string, updates: Partial<CustomMacro>) => void;
    deleteCustomMacro: (id: string) => void;
    toggleCustomMacro: (id: string) => void;

    saveConfig: () => void;
}

const defaults = getDefaultAPISettings();
const savedContext: any = SettingsManager.get('apiSettings') || {};

export const useConfigStore = create<ConfigState>((set, get) => ({
    vectorConfig: savedContext.vectorConfig || defaults.vectorConfig!,
    rerankConfig: savedContext.rerankConfig || defaults.rerankConfig!,
    recallConfig: savedContext.recallConfig || defaults.recallConfig!,
    regexConfig: savedContext.regexConfig || defaults.regexConfig!,
    entityExtractConfig: savedContext.entityExtractConfig || defaults.entityExtractConfig || { enabled: false, trigger: 'floor', floorInterval: 10, keepRecentCount: 5 },
    embeddingConfig: savedContext.embeddingConfig || defaults.embeddingConfig || DEFAULT_EMBEDDING_CONFIG,
    customMacros: savedContext.customMacros || defaults.customMacros || [],
    hasChanges: false,

    updateVectorConfig: (config) => set({ vectorConfig: config, hasChanges: true }),
    updateRerankConfig: (config) => set({ rerankConfig: config, hasChanges: true }),
    updateRecallConfig: (config) => set({ recallConfig: config, hasChanges: true }),
    updateRegexConfig: (config) => set({ regexConfig: config, hasChanges: true }),
    updateEntityExtractConfig: (config) => set({ entityExtractConfig: config, hasChanges: true }),
    updateEmbeddingConfig: (config) => set({ embeddingConfig: config, hasChanges: true }),

    updateMultipleConfigs: (updates) => set({ ...updates, hasChanges: true }),

    addCustomMacro: () => set((state) => {
        const newMacro: CustomMacro = {
            id: `custom_${Date.now()}`,
            name: '新宏',
            content: '',
            enabled: true,
            createdAt: Date.now(),
        };
        return { customMacros: [...state.customMacros, newMacro], hasChanges: true };
    }),

    updateCustomMacro: (id, updates) => set((state) => ({
        customMacros: state.customMacros.map(m => m.id === id ? { ...m, ...updates } : m),
        hasChanges: true
    })),

    deleteCustomMacro: (id) => set((state) => ({
        customMacros: state.customMacros.filter(m => m.id !== id),
        hasChanges: true
    })),

    toggleCustomMacro: (id) => set((state) => ({
        customMacros: state.customMacros.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m),
        hasChanges: true
    })),

    saveConfig: () => {
        const state = get();
        // Option to add Schema Check here before saving
        const currentSettings = SettingsManager.get('apiSettings') || {};
        SettingsManager.set('apiSettings', {
            ...currentSettings,
            vectorConfig: state.vectorConfig,
            rerankConfig: state.rerankConfig,
            recallConfig: state.recallConfig,
            regexConfig: state.regexConfig,
            entityExtractConfig: state.entityExtractConfig,
            embeddingConfig: state.embeddingConfig,
            customMacros: state.customMacros,
        } as any);
        set({ hasChanges: false });
    }
}));

/**
 * useConfig - 通用配置管理 Hook (代理 useConfigStore)
 *
 * 管理 Vector, Rerank, Recall, Preprocessing, CustomMacro 等配置
 * V1.0: 迁移至 Zustand 全局共享状态，彻底消除挂载时的数据孤岛与保存闭包陷阱。
 * 为了控制渲染粒度，建议新组件直接通过 useConfigStore 选择所需切片，此 hook 仅供向下兼容及简易聚合使用。
 */

import type {
    CustomMacro,
    EmbeddingConfig,
    GlobalRegexConfig,
    RecallConfig,
    RerankConfig,
    VectorConfig,
} from '@/config/types/defaults';
import { EntityExtractConfig } from '@/config/types/memory';
import { useConfigStore } from '@/state/configStore';

export interface UseConfigReturn {
    vectorConfig: VectorConfig;
    rerankConfig: RerankConfig;
    recallConfig: RecallConfig;
    regexConfig: GlobalRegexConfig;
    entityExtractConfig: EntityExtractConfig;
    embeddingConfig: EmbeddingConfig;
    customMacros: CustomMacro[];

    updateVectorConfig: (config: VectorConfig) => void;
    updateRerankConfig: (config: RerankConfig) => void;
    updateRecallConfig: (config: RecallConfig) => void;
    updateRegexConfig: (config: GlobalRegexConfig) => void;
    updateEntityExtractConfig: (config: EntityExtractConfig) => void;
    updateEmbeddingConfig: (config: EmbeddingConfig) => void;

    // Batch update interface (New Feature)
    updateMultipleConfigs: (updates: Partial<{
        vectorConfig: VectorConfig;
        rerankConfig: RerankConfig;
        recallConfig: RecallConfig;
        regexConfig: GlobalRegexConfig;
        entityExtractConfig: EntityExtractConfig;
        embeddingConfig: EmbeddingConfig;
        customMacros: CustomMacro[];
    }>) => void;

    // 自定义宏
    addCustomMacro: () => void;
    updateCustomMacro: (id: string, updates: Partial<CustomMacro>) => void;
    deleteCustomMacro: (id: string) => void;
    toggleCustomMacro: (id: string) => void;

    saveConfig: () => void;
    hasChanges: boolean;
}

export function useConfig(): UseConfigReturn {
    const store = useConfigStore();

    return {
        vectorConfig: store.vectorConfig,
        rerankConfig: store.rerankConfig,
        recallConfig: store.recallConfig,
        regexConfig: store.regexConfig,
        entityExtractConfig: store.entityExtractConfig,
        embeddingConfig: store.embeddingConfig,
        customMacros: store.customMacros,
        hasChanges: store.hasChanges,

        updateVectorConfig: store.updateVectorConfig,
        updateRerankConfig: store.updateRerankConfig,
        updateRecallConfig: store.updateRecallConfig,
        updateRegexConfig: store.updateRegexConfig,
        updateEntityExtractConfig: store.updateEntityExtractConfig,
        updateEmbeddingConfig: store.updateEmbeddingConfig,

        updateMultipleConfigs: store.updateMultipleConfigs,

        addCustomMacro: store.addCustomMacro,
        updateCustomMacro: store.updateCustomMacro,
        deleteCustomMacro: store.deleteCustomMacro,
        toggleCustomMacro: store.toggleCustomMacro,

        saveConfig: store.saveConfig,
    };
}

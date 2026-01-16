/**
 * useDashboardData - Dashboard 数据聚合 Hook
 *
 * V0.9.5: 提供 Dashboard 所需的所有数据
 * - System Health: 连接状态、待处理进度
 * - Memory Stats: 事件/实体统计
 * - Feature Status: 功能开关状态
 */
import { useState, useEffect, useCallback } from 'react';
import { useMemoryStore } from '@/stores/memoryStore';
import { summarizerService } from '@/services/summarizer';
import { SettingsManager } from '@/services/settings/Persistence';
import { getSTContext } from '@/tavern/bridge';
import { EntityType } from '@/services/types/graph';
import type { RecallConfig, EntityExtractConfig, EmbeddingConfig } from '@/services/api/types';
import type { PreprocessingConfig } from '@/services/preprocessing/types';

// ==================== 类型定义 ====================

export interface FeatureStatus {
    summarizer: boolean;
    entity: boolean;
    embedding: boolean;
    recall: boolean;
    preprocessing: boolean;
}

export interface MemoryStats {
    eventCount: number;
    entityCount: number;
    entityByType: Record<string, number>;
    archivedCount: number;
    activeCount: number;
    estimatedTokens: number;
}

export interface SystemHealth {
    isConnected: boolean;
    characterName: string;
    currentFloor: number;
    lastSummarizedFloor: number;
    pendingFloors: number;
    floorInterval: number;
    isSummarizing: boolean;
}

export interface DashboardData {
    system: SystemHealth;
    memory: MemoryStats;
    features: FeatureStatus;
    isLoading: boolean;
}

// ==================== Hook ====================

export function useDashboardData(refreshInterval = 2000): DashboardData & {
    toggleFeature: (feature: keyof FeatureStatus) => void;
    refresh: () => Promise<void>;
} {
    const [isLoading, setIsLoading] = useState(true);
    const [system, setSystem] = useState<SystemHealth>({
        isConnected: false,
        characterName: 'Unknown',
        currentFloor: 0,
        lastSummarizedFloor: 0,
        pendingFloors: 0,
        floorInterval: 10,
        isSummarizing: false,
    });
    const [memory, setMemory] = useState<MemoryStats>({
        eventCount: 0,
        entityCount: 0,
        entityByType: {},
        archivedCount: 0,
        activeCount: 0,
        estimatedTokens: 0,
    });
    const [features, setFeatures] = useState<FeatureStatus>({
        summarizer: true,
        entity: false,
        embedding: false,
        recall: true,
        preprocessing: false,
    });

    // 获取 memoryStore 方法
    const getAllEvents = useMemoryStore(state => state.getAllEvents);
    const getAllEntities = useMemoryStore(state => state.getAllEntities);

    // 刷新数据
    const refresh = useCallback(async () => {
        try {
            // 1. System Health
            const stContext = getSTContext();
            const summarizerStatus = summarizerService.getStatus();
            const summarizerConfig = SettingsManager.get('summarizerConfig') || {};

            setSystem({
                isConnected: !!stContext,
                characterName: stContext?.name2 || 'Unknown',
                currentFloor: summarizerStatus.currentFloor,
                lastSummarizedFloor: summarizerStatus.lastSummarizedFloor,
                pendingFloors: summarizerStatus.pendingFloors,
                floorInterval: summarizerConfig.floorInterval || 10,
                isSummarizing: summarizerStatus.isSummarizing,
            });

            // 2. Memory Stats
            const events = await getAllEvents();
            const entities = await getAllEntities();

            const entityByType: Record<string, number> = {};
            entities.forEach(e => {
                entityByType[e.type] = (entityByType[e.type] || 0) + 1;
            });

            const archivedEvents = events.filter(e => e.is_archived);
            // 估算 Token：每个事件平均 100 tokens
            const estimatedTokens = events.reduce((sum, e) => {
                return sum + Math.ceil((e.summary?.length || 0) / 4);
            }, 0);

            setMemory({
                eventCount: events.length,
                entityCount: entities.length,
                entityByType,
                archivedCount: archivedEvents.length,
                activeCount: events.length - archivedEvents.length,
                estimatedTokens,
            });

            // 3. Feature Status
            const apiSettings = SettingsManager.get('apiSettings');
            const entityConfig = apiSettings?.entityExtractConfig;
            const embeddingConfig = apiSettings?.embeddingConfig;
            const recallConfig = apiSettings?.recallConfig;
            // preprocessingConfig 存储在 SettingsManager 顶层
            const preprocessingConfig = SettingsManager.get('preprocessingConfig') as { enabled?: boolean } | undefined;

            setFeatures({
                summarizer: summarizerConfig.enabled !== false,
                entity: entityConfig?.enabled || false,
                embedding: embeddingConfig?.enabled || false,
                recall: recallConfig?.enabled !== false,
                preprocessing: preprocessingConfig?.enabled || false,
            });

            setIsLoading(false);
        } catch (error) {
            console.error('[useDashboardData] Error refreshing data:', error);
            setIsLoading(false);
        }
    }, [getAllEvents, getAllEntities]);

    // 切换功能开关
    const toggleFeature = useCallback((feature: keyof FeatureStatus) => {
        const apiSettings = SettingsManager.get('apiSettings') || {};
        const summarizerConfig = SettingsManager.get('summarizerConfig') || {};

        switch (feature) {
            case 'summarizer':
                const newSummarizerEnabled = !features.summarizer;
                SettingsManager.set('summarizerConfig', {
                    ...summarizerConfig,
                    enabled: newSummarizerEnabled,
                });
                // 联动服务
                summarizerService.updateConfig({ enabled: newSummarizerEnabled });
                break;

            case 'entity':
                const currentEntityConfig = (apiSettings as any)?.entityExtractConfig || {};
                SettingsManager.set('apiSettings', {
                    ...apiSettings,
                    entityExtractConfig: {
                        ...currentEntityConfig,
                        enabled: !features.entity,
                    },
                } as any);
                break;

            case 'embedding':
                const currentEmbeddingConfig = (apiSettings as any)?.embeddingConfig || {};
                SettingsManager.set('apiSettings', {
                    ...apiSettings,
                    embeddingConfig: {
                        ...currentEmbeddingConfig,
                        enabled: !features.embedding,
                    },
                } as any);
                break;

            case 'recall':
                const currentRecallConfig = (apiSettings as any)?.recallConfig || {};
                SettingsManager.set('apiSettings', {
                    ...apiSettings,
                    recallConfig: {
                        ...currentRecallConfig,
                        enabled: !features.recall,
                    },
                } as any);
                break;

            case 'preprocessing':
                const currentPreprocessingConfig = SettingsManager.get('preprocessingConfig') || {};
                SettingsManager.set('preprocessingConfig', {
                    ...currentPreprocessingConfig,
                    enabled: !features.preprocessing,
                } as any);
                break;
        }

        // 立即刷新状态
        refresh();
    }, [features, refresh]);

    // 初始加载 + 定时刷新
    useEffect(() => {
        refresh();

        const timer = setInterval(refresh, refreshInterval);
        return () => clearInterval(timer);
    }, [refresh, refreshInterval]);

    return {
        system,
        memory,
        features,
        isLoading,
        toggleFeature,
        refresh,
    };
}

export default useDashboardData;

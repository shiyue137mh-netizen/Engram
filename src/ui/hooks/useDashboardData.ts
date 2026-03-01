/**
 * useDashboardData - Dashboard 数据聚合 Hook
 *
 * V0.9.5: 提供 Dashboard 所需的所有数据
 * - System Health: 连接状态、待处理进度
 * - Memory Stats: 事件/实体统计
 * - Feature Status: 功能开关状态
 */
import { SettingsManager } from '@/config/settings';
import { DEFAULT_BRAIN_RECALL_CONFIG } from '@/config/types/defaults';
import { getSTContext } from '@/integrations/tavern/bridge';
import { summarizerService } from '@/modules/memory';
import { DEFAULT_PREPROCESSING_CONFIG } from '@/modules/preprocessing/types';
import { useMemoryStore } from '@/state/memoryStore';
import { useCallback, useEffect, useState } from 'react';

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

export interface BrainStats {
    shortTermCount: number;
    shortTermLimit: number;
    workingCount: number;
    workingLimit: number;
    topItems: { id: string; label: string; score: number }[];
}

export interface ContextStats {
    injectedLength: number;
    estimatedTokens: number;
}

export interface DashboardData {
    system: SystemHealth;
    memory: MemoryStats;
    features: FeatureStatus;
    brainStats: BrainStats;
    contextStats: ContextStats;
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
    const [brainStats, setBrainStats] = useState<BrainStats>({
        shortTermCount: 0,
        shortTermLimit: 0,
        workingCount: 0,
        workingLimit: 0,
        topItems: []
    });
    const [contextStats, setContextStats] = useState<ContextStats>({
        injectedLength: 0,
        estimatedTokens: 0
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
            const preprocessingConfig = SettingsManager.get('preprocessingConfig') as { enabled?: boolean } | undefined;

            setFeatures({
                summarizer: summarizerConfig.enabled !== false,
                entity: entityConfig?.enabled || false,
                embedding: embeddingConfig?.enabled || false,
                recall: recallConfig?.enabled !== false,
                preprocessing: preprocessingConfig?.enabled || false,
            });

            // 4. Brain & Context Stats (Dynamic Import)
            try {
                const { brainRecallCache } = await import('@/modules/rag/retrieval/BrainRecallCache');
                const { MacroService } = await import('@/integrations/tavern/macros');

                const snapshot = brainRecallCache.getShortTermSnapshot();
                // FIX: 直接从 SettingsManager 读取最新的配置，而不是 Cache 里的旧副本
                const apiSettings = SettingsManager.get('apiSettings');
                const brainConfig = apiSettings?.recallConfig?.brainRecall || DEFAULT_BRAIN_RECALL_CONFIG;

                // Get working memory items (Tier = 'working')
                const workingItems = snapshot.filter(s => s.tier === 'working');
                const topActiveItems = snapshot.slice(0, 3).map(s => ({
                    id: s.id,
                    label: s.label,
                    score: s.finalScore
                }));

                const contextText = MacroService.getSummaries();

                setBrainStats({
                    shortTermCount: snapshot.length,
                    shortTermLimit: brainConfig.shortTermLimit,
                    workingCount: workingItems.length,
                    workingLimit: brainConfig.workingLimit,
                    topItems: topActiveItems
                });

                setContextStats({
                    injectedLength: contextText.length,
                    estimatedTokens: Math.ceil(contextText.length / 4)
                });

            } catch (e) {
                console.warn('[useDashboardData] Failed to load brain stats', e);
            }

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
                const currentPreprocessingConfig = SettingsManager.get('preprocessingConfig') || DEFAULT_PREPROCESSING_CONFIG;
                const newPreprocessingEnabled = !features.preprocessing;

                // 1. 更新 Preprocessing Config
                SettingsManager.set('preprocessingConfig', {
                    ...currentPreprocessingConfig,
                    enabled: newPreprocessingEnabled,
                } as any);

                // 2. 同时更新 Recall Config 以保持同步
                import('@/config/types/defaults').then(({ getDefaultAPISettings }) => {
                    const currentApiSettings = SettingsManager.get('apiSettings');
                    const safeApiSettings = currentApiSettings || getDefaultAPISettings();
                    const currentRecallConfig = safeApiSettings.recallConfig || {};

                    SettingsManager.set('apiSettings', {
                        ...safeApiSettings,
                        recallConfig: {
                            ...currentRecallConfig,
                            usePreprocessing: newPreprocessingEnabled
                        }
                    } as any);
                });
                break;
        }

        // 立即刷新状态
        refresh();
    }, [features, refresh]);

    // 初始加载 + 定时刷新 (Phase 3 Performance)
    useEffect(() => {
        refresh(); // 立即执行一次

        let timer: NodeJS.Timeout | null = null;
        let isTabActive = document.visibilityState === 'visible';

        // 动态调整轮询帧率：活动时高频查询，放到后台时降低查询频率
        const scheduleTimer = () => {
            if (timer) clearInterval(timer);
            const currentInterval = isTabActive ? refreshInterval : refreshInterval * 5; // 后台延长 5 倍间隙
            timer = setInterval(refresh, currentInterval);
        };

        const handleVisibilityChange = () => {
            isTabActive = document.visibilityState === 'visible';
            scheduleTimer();
            if (isTabActive) {
                refresh(); // 重新获得焦点时火速更新补偿
            }
        };

        scheduleTimer();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (timer) clearInterval(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [refresh, refreshInterval]);

    return {
        system,
        memory,
        features,
        brainStats,
        contextStats,
        isLoading,
        toggleFeature,
        refresh,
    };
}


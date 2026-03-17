/**
 * useDashboardData - Dashboard 数据聚合 Hook
 *
 * V0.9.5: 提供 Dashboard 所需的所有数据
 * - System Health: 连接状态、待处理进度
 * - Memory Stats: 事件/实体统计
 * - Feature Status: 功能开关状态
 */
import { SettingsManager, type EngramSettings } from '@/config/settings';
import { DEFAULT_BRAIN_RECALL_CONFIG } from '@/config/types/defaults';
import { getSTContext, MacroService, getCurrentChatId } from '@/integrations/tavern';
import { summarizerService } from '@/modules/memory';
import { DEFAULT_PREPROCESSING_CONFIG } from '@/modules/preprocessing/types';
import { brainRecallCache } from '@/modules/rag/retrieval/BrainRecallCache';
import { useMemoryStore } from '@/state/memoryStore';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    globalStats: EngramSettings['statistics'];
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
    const [globalStats, setGlobalStats] = useState<EngramSettings['statistics']>({
        firstUseAt: null,
        activeDays: [],
        totalTokens: 0,
        totalLlmCalls: 0,
        totalEvents: 0,
        totalEntities: 0,
        totalRagInjections: 0,
    });

    const isMounted = useRef(true);
    const lastDbModified = useRef<number>(0);

    // 获取 memoryStore 方法
    const getAllEvents = useMemoryStore(state => state.getAllEvents);
    const getAllEntities = useMemoryStore(state => state.getAllEntities);

    // 刷新数据
    const refresh = useCallback(async () => {
        try {
            if (!isMounted.current) return;

            // 1. System Health
            const stContext = getSTContext();
            const summarizerStatus = summarizerService.getStatus();
            const summarizerConfig = SettingsManager.get('summarizerConfig') || {};

            if (!isMounted.current) return;
            setSystem({
                isConnected: !!stContext,
                characterName: stContext?.name2 || 'Unknown',
                currentFloor: summarizerStatus.currentFloor,
                lastSummarizedFloor: summarizerStatus.lastSummarizedFloor,
                pendingFloors: summarizerStatus.pendingFloors,
                floorInterval: summarizerConfig.floorInterval || 10,
                isSummarizing: summarizerStatus.isSummarizing,
            });

            // 1.5 Global Statistics
            // Use fallback if not found
            const currentStats = SettingsManager.get('statistics') || {
                firstUseAt: null, activeDays: [], totalTokens: 0, totalLlmCalls: 0, totalEvents: 0, totalEntities: 0, totalRagInjections: 0
            };
            if (!isMounted.current) return;
            setGlobalStats(currentStats as EngramSettings['statistics']);

            // 2. Memory Stats
            // P1 Optimization: 只有在数据真正变化时才重新获取数据进行统计
            const chatId = getCurrentChatId();
            if (!chatId) return;

            const dbModule = await import('@/data/db');
            const db = dbModule.tryGetDbForChat(chatId);
            if (!db) return;

            const metaMod = await db.meta.get('lastModified');
            const currentMod = (metaMod?.value as number) || 0;

            if (currentMod !== lastDbModified.current || lastDbModified.current === 0) {
                // 使用 count() 获取总数，避免拉取全表实体
                const eventCount = await db.events.count();
                const entityCount = await db.entities.count();

                // 对于类型分布，如果数量不大可以继续获取，或者使用专用的聚合方法
                // 这里暂时保留获取实体以统计类型，但未来可以考虑索引化
                const entities = await getAllEntities(); 
                const entityByType: Record<string, number> = {};
                entities.forEach(e => {
                    entityByType[e.type] = (entityByType[e.type] || 0) + 1;
                });

                // 获取活跃事件总数 (is_archived 为 0/false)
                const archivedCount = await db.events.where('is_archived').equals(1).count();

                // 估算 Token：这里如果全量拉取仍然重。
                // 优化思路：只拉取最近的 N 条或者在存储时就记下长度。
                // 暂时使用更轻量的逻辑：如果事件很多，只取前 100 条估算平均值，或者直接跳过全量 reduce
                const sampleEvents = await db.events.limit(100).toArray();
                const avgLen = sampleEvents.length > 0 
                    ? sampleEvents.reduce((s, e) => s + (e.summary?.length || 0), 0) / sampleEvents.length 
                    : 0;
                const estimatedTokens = Math.ceil((avgLen * eventCount) / 4);

                if (!isMounted.current) return;
                setMemory({
                    eventCount,
                    entityCount,
                    entityByType,
                    archivedCount,
                    activeCount: eventCount - archivedCount,
                    estimatedTokens,
                });
                lastDbModified.current = currentMod;
            }

            // 3. Feature Status
            const apiSettings = SettingsManager.get('apiSettings');
            const entityConfig = apiSettings?.entityExtractConfig;
            const embeddingConfig = apiSettings?.embeddingConfig;
            const recallConfig = apiSettings?.recallConfig;
            const preprocessingConfig = SettingsManager.get('preprocessingConfig') as { enabled?: boolean } | undefined;

            if (!isMounted.current) return;
            setFeatures({
                summarizer: summarizerConfig.enabled !== false,
                entity: entityConfig?.enabled || false,
                embedding: embeddingConfig?.enabled || false,
                recall: recallConfig?.enabled !== false,
                preprocessing: preprocessingConfig?.enabled || false,
            });

            // 4. Brain & Context Stats
            try {
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

                if (!isMounted.current) return;
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
                if (isMounted.current) {
                    setBrainStats({
                        shortTermCount: 0,
                        shortTermLimit: 0,
                        workingCount: 0,
                        workingLimit: 0,
                        topItems: []
                    });
                }
            }

            if (isMounted.current) setIsLoading(false);
        } catch (error) {
            console.error('[useDashboardData] Error refreshing data:', error);
            if (isMounted.current) setIsLoading(false);
        }
    }, [getAllEvents, getAllEntities]);

    // 切换功能开关
    const toggleFeature = useCallback(async (feature: keyof FeatureStatus) => {
        const apiSettings = SettingsManager.get('apiSettings') || {};
        const summarizerConfig = SettingsManager.get('summarizerConfig') || {};

        // 使用函数式更新获取最新 features 状态，避免闭包陷阱
        setFeatures(prev => {
            const currentStatus = { ...prev };
            
            switch (feature) {
                case 'summarizer': {
                    const nextVal = !currentStatus.summarizer;
                    SettingsManager.set('summarizerConfig', {
                        ...summarizerConfig,
                        enabled: nextVal,
                    });
                    summarizerService.updateConfig({ enabled: nextVal });
                    currentStatus.summarizer = nextVal;
                    break;
                }
                case 'entity': {
                    const settings = apiSettings as any;
                    const nextVal = !currentStatus.entity;
                    SettingsManager.set('apiSettings', {
                        ...settings,
                        entityExtractConfig: {
                            ...(settings?.entityExtractConfig || {}),
                            enabled: nextVal,
                        },
                    } as any);
                    currentStatus.entity = nextVal;
                    break;
                }
                case 'embedding': {
                    const settings = apiSettings as any;
                    const nextVal = !currentStatus.embedding;
                    SettingsManager.set('apiSettings', {
                        ...settings,
                        embeddingConfig: {
                            ...(settings?.embeddingConfig || {}),
                            enabled: nextVal,
                        },
                    } as any);
                    currentStatus.embedding = nextVal;
                    break;
                }
                case 'recall': {
                    const settings = apiSettings as any;
                    const nextVal = !currentStatus.recall;
                    SettingsManager.set('apiSettings', {
                        ...settings,
                        recallConfig: {
                            ...(settings?.recallConfig || {}),
                            enabled: nextVal,
                        },
                    } as any);
                    currentStatus.recall = nextVal;
                    break;
                }
                case 'preprocessing': {
                    const nextVal = !currentStatus.preprocessing;
                    SettingsManager.set('preprocessingConfig', {
                        ...(SettingsManager.get('preprocessingConfig') || {}),
                        enabled: nextVal,
                    } as any);
                    
                    // 异步处理 Recall 同步逻辑
                    import('@/config/types/defaults').then(({ getDefaultAPISettings }) => {
                        const currentApi = SettingsManager.get('apiSettings') || getDefaultAPISettings();
                        SettingsManager.set('apiSettings', {
                            ...currentApi,
                            recallConfig: {
                                ...(currentApi.recallConfig || {}),
                                usePreprocessing: nextVal
                            }
                        } as any);
                        // 对于异步完成的，手动触发一次刷新，甚至可以在这里 refetch
                        refreshRef.current();
                    });
                    
                    currentStatus.preprocessing = nextVal;
                    break;
                }
            }
            return currentStatus;
        });

        // 立即执行一次刷新，确保 UI 与底层同步
        await refresh();
    }, [refresh]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const refreshRef = useRef(refresh);

    // 保持 ref 中的 refresh 永远是最新版本，避免定时器闭包拿到旧回调
    useEffect(() => {
        refreshRef.current = refresh;
    }, [refresh]);

    // 初始加载 + 定时刷新 (Phase 3 Performance)
    useEffect(() => {
        isMounted.current = true;
        refreshRef.current(); // 立即执行一次
        let isTabActive = document.visibilityState === 'visible';

        // 动态调整轮询帧率：活动时高频查询，放到后台时降低查询频率
        const scheduleTimer = () => {
            if (timerRef.current) clearInterval(timerRef.current);
            const currentInterval = isTabActive ? refreshInterval : refreshInterval * 5; // 后台延长 5 倍间隙
            timerRef.current = setInterval(() => {
                if (isMounted.current) refreshRef.current();
            }, currentInterval);
        };

        const handleVisibilityChange = () => {
            isTabActive = document.visibilityState === 'visible';
            scheduleTimer();
            if (isTabActive) {
                refreshRef.current(); // 使用最新 ref 避免闭包陷阱
            }
        };

        scheduleTimer();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            isMounted.current = false;
            if (timerRef.current) clearInterval(timerRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [refreshInterval]);

    return {
        system,
        memory,
        features,
        brainStats,
        contextStats,
        globalStats,
        isLoading,
        toggleFeature,
        refresh,
    };
}


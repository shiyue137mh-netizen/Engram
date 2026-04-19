/**
 * UseDashboardData - Dashboard 数据聚合 Hook
 *
 * V0.9.5: 提供 Dashboard 所需的所有数据
 * - System Health: 连接状态、待处理进度
 * - Memory Stats: 事件/实体统计
 * - Feature Status: 功能开关状态
 */
import { type EngramSettings, SettingsManager } from '@/config/settings';
import { DEFAULT_BRAIN_RECALL_CONFIG, getDefaultAPISettings } from '@/config/types/defaults';
import { LogModule, Logger } from '@/core/logger';
import { MacroService, getCurrentChatId, getSTContext } from '@/integrations/tavern';
import { summarizerService } from '@/modules/memory';
import { brainRecallCache } from '@/modules/rag/retrieval/BrainRecallCache';
import { useConfigStore } from '@/state/configStore';
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
        characterName: 'Unknown',
        currentFloor: 0,
        floorInterval: 10,
        isConnected: false,
        isSummarizing: false,
        lastSummarizedFloor: 0,
        pendingFloors: 0,
    });
    const [memory, setMemory] = useState<MemoryStats>({
        activeCount: 0,
        archivedCount: 0,
        entityByType: {},
        entityCount: 0,
        estimatedTokens: 0,
        eventCount: 0,
    });
    const [features, setFeatures] = useState<FeatureStatus>({
        embedding: false,
        entity: false,
        preprocessing: false,
        recall: true,
        summarizer: true,
    });
    const [brainStats, setBrainStats] = useState<BrainStats>({
        shortTermCount: 0,
        shortTermLimit: 0,
        topItems: [],
        workingCount: 0,
        workingLimit: 0
    });
    const [contextStats, setContextStats] = useState<ContextStats>({
        estimatedTokens: 0,
        injectedLength: 0
    });
    const [globalStats, setGlobalStats] = useState<EngramSettings['statistics']>({
        activeDays: [],
        firstUseAt: null,
        totalEntities: 0,
        totalEvents: 0,
        totalLlmCalls: 0,
        totalRagInjections: 0,
        totalTokens: 0,
    });

    const isMounted = useRef(true);
    const lastDbModified = useRef<number>(0);

    // 获取 memoryStore 方法
    const getAllEntities = useMemoryStore(state => state.getAllEntities);

    // Atomic fetchers
    const fetchSystemHealth = useCallback(() => {
        const stContext = getSTContext();
        const summarizerStatus = summarizerService.getStatus();
        const summarizerConfig = SettingsManager.get('summarizerConfig') || {};

        if (!isMounted.current) {return;}
        setSystem({
            characterName: stContext?.name2 || 'Unknown',
            currentFloor: summarizerStatus.currentFloor,
            floorInterval: summarizerConfig.floorInterval || 10,
            isConnected: !!stContext,
            isSummarizing: summarizerStatus.isSummarizing,
            lastSummarizedFloor: summarizerStatus.lastSummarizedFloor,
            pendingFloors: summarizerStatus.pendingFloors,
        });
    }, []);

    const fetchGlobalStats = useCallback(() => {
        const currentStats = SettingsManager.get('statistics') || {
            activeDays: [], firstUseAt: null, totalEntities: 0, totalEvents: 0, totalLlmCalls: 0, totalRagInjections: 0, totalTokens: 0
        };
        if (!isMounted.current) {return;}
        setGlobalStats(currentStats as EngramSettings['statistics']);
    }, []);

    const fetchMemoryStats = useCallback(async () => {
        const chatId = getCurrentChatId();
        if (!chatId) {return;}

        const dbModule = await import('@/data/db');
        const db = dbModule.tryGetDbForChat(chatId);
        if (!db) {return;}

        const metaMod = await db.meta.get('lastModified');
        const currentMod = (metaMod?.value as number) || 0;

        if (currentMod !== lastDbModified.current || lastDbModified.current === 0) {
            const eventCount = await db.events.count();
            const entityCount = await db.entities.count();

            // P1 Fix: 使用游标遍历进行类型统计，避免将整表读入内存
            const entityByType: Record<string, number> = {};
            // Using Table.each iteration to minimize memory allocations
            await db.entities.each((entity) => {
                const t = entity.type || 'unknown';
                entityByType[t] = (entityByType[t] || 0) + 1;
            });

            const archivedCount = await db.events.filter(e => Boolean(e.is_archived)).count();

            const sampleEvents = await db.events.limit(100).toArray();
            const avgLen = sampleEvents.length > 0 
                ? sampleEvents.reduce((s, e) => s + (e.summary?.length || 0), 0) / sampleEvents.length 
                : 0;
            const estimatedTokens = Math.ceil((avgLen * eventCount) / 4);

            if (!isMounted.current) {return;}
            setMemory({
                activeCount: eventCount - archivedCount,
                archivedCount,
                entityByType,
                entityCount,
                estimatedTokens,
                eventCount,
            });
            lastDbModified.current = currentMod;
        }
    }, []);

    const fetchFeatureStatus = useCallback(async () => {
        const defaults = getDefaultAPISettings();
        const apiSettings = SettingsManager.get('apiSettings') || defaults;
        const currentSummarizerConfig = SettingsManager.get('summarizerConfig') || {};
        const entityConfig = apiSettings?.entityExtractConfig ?? defaults.entityExtractConfig;
        const embeddingConfig = apiSettings?.embeddingConfig ?? defaults.embeddingConfig;
        const recallConfig = apiSettings?.recallConfig ?? defaults.recallConfig;
        const preprocessingConfig = SettingsManager.get('preprocessingConfig') as { enabled?: boolean } | undefined;

        if (!isMounted.current) {return;}
        setFeatures({
            embedding: !!embeddingConfig?.enabled,
            entity: !!entityConfig?.enabled,
            preprocessing: !!preprocessingConfig?.enabled,
            recall: recallConfig?.enabled !== false,
            summarizer: currentSummarizerConfig.enabled !== false,
        });
    }, []);

    const fetchBrainStats = useCallback(() => {
        try {
            const snapshot = brainRecallCache.getShortTermSnapshot();
            const brainApiSettings = SettingsManager.get('apiSettings');
            const brainConfig = brainApiSettings?.recallConfig?.brainRecall || DEFAULT_BRAIN_RECALL_CONFIG;

            const workingItems = snapshot.filter(s => s.tier === 'working');
            const topActiveItems = snapshot.slice(0, 3).map(s => ({
                id: s.id,
                label: s.label,
                score: s.finalScore
            }));

            const contextText = MacroService.getSummaries();

            if (!isMounted.current) {return;}
            setBrainStats({
                shortTermCount: snapshot.length,
                shortTermLimit: brainConfig.shortTermLimit,
                topItems: topActiveItems,
                workingCount: workingItems.length,
                workingLimit: brainConfig.workingLimit
            });

            setContextStats({
                estimatedTokens: Math.ceil(contextText.length / 4),
                injectedLength: contextText.length
            });

        } catch (error) {
            Logger.warn(LogModule.DASHBOARD, '加载 Brain Stats 失败', error);
            if (isMounted.current) {
                setBrainStats({
                    shortTermCount: 0,
                    shortTermLimit: 0,
                    topItems: [],
                    workingCount: 0,
                    workingLimit: 0
                });
            }
        }
    }, []);

    // 主刷新回调，编排原子获取函数
    const refresh = useCallback(async () => {
        try {
            fetchSystemHealth();
            fetchGlobalStats();
            await fetchMemoryStats();
            await fetchFeatureStatus();
            fetchBrainStats();

            if (isMounted.current) {setIsLoading(false);}
        } catch (error) {
            Logger.error(LogModule.DASHBOARD, '刷新 Dashboard 数据失败', { error });
            if (isMounted.current) {setIsLoading(false);}
        }
    }, [fetchSystemHealth, fetchGlobalStats, fetchMemoryStats, fetchFeatureStatus, fetchBrainStats]);

    // 切换功能开关
    // P0 Fix: 副作用全部提取到 setFeatures 外部，保证 setState 更新器是纯函数
    const toggleFeature = useCallback(async (feature: keyof FeatureStatus) => {
        // 1. 读取最新配置（使用完整 defaults 作为 fallback，防止丢失嵌套字段）
        const defaults = getDefaultAPISettings();
        const currentApiSettings = SettingsManager.get('apiSettings') || defaults;
        const currentSummarizerConfig = SettingsManager.get('summarizerConfig') || {};

        // 2. 获取当前功能状态并计算新值
        let nextVal: boolean;

        switch (feature) {
            case 'summarizer': {
                nextVal = !(currentSummarizerConfig.enabled !== false);
                // 写入 SettingsManager
                SettingsManager.set('summarizerConfig', {
                    ...currentSummarizerConfig,
                    enabled: nextVal,
                });
                summarizerService.updateConfig({ enabled: nextVal });
                useConfigStore.getState().updateConfig('summarizerConfig', { ...currentSummarizerConfig, enabled: nextVal });
                break;
            }
            case 'entity': {
                const entityConfig = currentApiSettings.entityExtractConfig || defaults.entityExtractConfig!;
                nextVal = !entityConfig.enabled;
                const newConfig = { ...entityConfig, enabled: nextVal };
                SettingsManager.set('apiSettings', {
                    ...currentApiSettings,
                    entityExtractConfig: newConfig,
                } as any);
                useConfigStore.getState().updateConfig('entityExtractConfig', newConfig);
                break;
            }
            case 'embedding': {
                const embeddingConfig = currentApiSettings.embeddingConfig || defaults.embeddingConfig!;
                nextVal = !embeddingConfig.enabled;
                const newConfig = { ...embeddingConfig, enabled: nextVal };
                SettingsManager.set('apiSettings', {
                    ...currentApiSettings,
                    embeddingConfig: newConfig,
                } as any);
                useConfigStore.getState().updateConfig('embeddingConfig', newConfig);
                break;
            }
            case 'recall': {
                const recallConfig = currentApiSettings.recallConfig || defaults.recallConfig!;
                nextVal = !recallConfig.enabled;
                const newConfig = { ...recallConfig, enabled: nextVal };
                SettingsManager.set('apiSettings', {
                    ...currentApiSettings,
                    recallConfig: newConfig,
                } as any);
                useConfigStore.getState().updateConfig('recallConfig', newConfig);
                break;
            }
            case 'preprocessing': {
                const currentPreprocessingConfig = SettingsManager.get('preprocessingConfig') || {};
                nextVal = !(currentPreprocessingConfig as { enabled?: boolean })?.enabled;
                // 同步写入预处理配置
                SettingsManager.set('preprocessingConfig', {
                    ...currentPreprocessingConfig,
                    enabled: nextVal,
                } as any);

                // 同步写入 Recall 关联配置
                const { getDefaultAPISettings: getDefaults } = await import('@/config/types/defaults');
                const latestApi = SettingsManager.get('apiSettings') || getDefaults();
                SettingsManager.set('apiSettings', {
                    ...latestApi,
                    recallConfig: {
                        ...latestApi.recallConfig,
                        usePreprocessing: nextVal,
                    }
                } as any);
                useConfigStore.getState().updateMultipleConfigs({
                    preprocessingConfig: {
                        ...currentPreprocessingConfig,
                        enabled: nextVal,
                    } as any,
                    recallConfig: {
                        ...latestApi.recallConfig,
                        usePreprocessing: nextVal,
                    } as any
                });
                break;
            }
            default: {
                return;
            }
        }

        // 3. 同步更新 UI state（纯函数，无副作用）
        setFeatures(prev => ({ ...prev, [feature]: nextVal }));

        // 4. 刷新确保与底层同步
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
            if (timerRef.current) {clearInterval(timerRef.current);}
            const currentInterval = isTabActive ? refreshInterval : refreshInterval * 5; // 后台延长 5 倍间隙
            timerRef.current = setInterval(() => {
                if (isMounted.current) {refreshRef.current();}
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
            if (timerRef.current) {clearInterval(timerRef.current);}
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [refreshInterval]);

    return {
        brainStats,
        contextStats,
        features,
        globalStats,
        isLoading,
        memory,
        refresh,
        system,
        toggleFeature,
    };
}

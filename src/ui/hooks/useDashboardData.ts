/**
 * useDashboardData - Dashboard 数据聚合 Hook
 *
 * V0.9.5: 提供 Dashboard 所需的所有数据
 * - System Health: 连接状态、待处理进度
 * - Memory Stats: 事件/实体统计
 * - Feature Status: 功能开关状态
 */
import { SettingsManager, type EngramSettings } from '@/config/settings';
import { DEFAULT_BRAIN_RECALL_CONFIG, getDefaultAPISettings } from '@/config/types/defaults';
import { Logger, LogModule } from '@/core/logger';
import { getSTContext, MacroService, getCurrentChatId } from '@/integrations/tavern';
import { summarizerService } from '@/modules/memory';
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

                // TODO [P1 优化]: 对于类型分布，当实体规模超大时应使用 Dexie 聚合查询或索引
                // 当前阶段实体规模有限，暂时保留 getAllEntities 统计类型分布
                const entities = await getAllEntities(); 
                const entityByType: Record<string, number> = {};
                entities.forEach(e => {
                    entityByType[e.type] = (entityByType[e.type] || 0) + 1;
                });

                // 获取活跃事件总数 (is_archived 为 true)
                // P0 Fix: 回退至 filter 模式，规避部分环境对布尔索引键报错 (DataError)
                const archivedCount = await db.events.filter(e => !!e.is_archived).count();

                // 估算 Token：采样前 100 条估算平均值
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
            // P0 Fix: 使用 getDefaultAPISettings() 提供完整的 fallback，防止可选字段缺失导致显示为 false
            const defaults = getDefaultAPISettings();
            const apiSettings = SettingsManager.get('apiSettings') || defaults;
            const entityConfig = apiSettings?.entityExtractConfig ?? defaults.entityExtractConfig;
            const embeddingConfig = apiSettings?.embeddingConfig ?? defaults.embeddingConfig;
            const recallConfig = apiSettings?.recallConfig ?? defaults.recallConfig;
            const preprocessingConfig = SettingsManager.get('preprocessingConfig') as { enabled?: boolean } | undefined;

            Logger.debug(LogModule.DASHBOARD, '同步 Feature Status', { 
                summarizer: summarizerConfig.enabled, 
                entity: entityConfig?.enabled,
                recall: recallConfig?.enabled,
                preprocessing: preprocessingConfig?.enabled
            });

            if (!isMounted.current) return;
            setFeatures({
                summarizer: summarizerConfig.enabled !== false, // 默认为开启
                entity: !!entityConfig?.enabled,
                embedding: !!embeddingConfig?.enabled,
                recall: recallConfig?.enabled !== false,     // 默认为开启
                preprocessing: !!preprocessingConfig?.enabled,
            });

            // 4. Brain & Context Stats
            try {
                const snapshot = brainRecallCache.getShortTermSnapshot();
                // 直接从 SettingsManager 读取最新的配置
                const brainApiSettings = SettingsManager.get('apiSettings');
                const brainConfig = brainApiSettings?.recallConfig?.brainRecall || DEFAULT_BRAIN_RECALL_CONFIG;

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
                Logger.warn(LogModule.DASHBOARD, '加载 Brain Stats 失败', e);
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
            Logger.error(LogModule.DASHBOARD, '刷新 Dashboard 数据失败', { error });
            if (isMounted.current) setIsLoading(false);
        }
    }, [getAllEntities]);

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
                break;
            }
            case 'entity': {
                const entityConfig = currentApiSettings.entityExtractConfig ?? defaults.entityExtractConfig;
                nextVal = !(entityConfig?.enabled ?? false);
                SettingsManager.set('apiSettings', {
                    ...currentApiSettings,
                    entityExtractConfig: {
                        ...(entityConfig || {}),
                        enabled: nextVal,
                    },
                } as any);
                break;
            }
            case 'embedding': {
                const embeddingConfig = currentApiSettings.embeddingConfig ?? defaults.embeddingConfig;
                nextVal = !(embeddingConfig?.enabled ?? false);
                SettingsManager.set('apiSettings', {
                    ...currentApiSettings,
                    embeddingConfig: {
                        ...(embeddingConfig || {}),
                        enabled: nextVal,
                    },
                } as any);
                break;
            }
            case 'recall': {
                const recallConfig = currentApiSettings.recallConfig ?? defaults.recallConfig;
                nextVal = !(recallConfig?.enabled !== false);
                SettingsManager.set('apiSettings', {
                    ...currentApiSettings,
                    recallConfig: {
                        ...(recallConfig || {}),
                        enabled: nextVal,
                    },
                } as any);
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
                        ...(latestApi.recallConfig || {}),
                        usePreprocessing: nextVal,
                    }
                } as any);
                break;
            }
            default:
                return;
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

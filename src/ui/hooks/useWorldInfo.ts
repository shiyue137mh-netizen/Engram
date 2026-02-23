import { SettingsManager } from "@/config/settings";
import type { EngramAPISettings, WorldbookConfig, WorldbookConfigProfile } from '@/config/types/defaults';
import { getDefaultAPISettings } from '@/config/types/defaults';
import { getTavernHelper, WorldInfoService } from '@/integrations/tavern/worldbook';
import { useCallback, useEffect, useState } from 'react';

export interface UseWorldInfoReturn {
    worldbookStructure: Record<string, any[]>;
    disabledEntries: Record<string, number[]>;
    disabledWorldbooks: string[];
    currentCharWorldbook: string | null;
    worldbookConfig: WorldbookConfig | undefined;
    worldbookProfiles: WorldbookConfigProfile[];
    worldbookScopes: { global: string[]; chat: string[]; installed: string[] };

    toggleWorldbook: (name: string, disabled: boolean) => void;
    toggleEntry: (worldbook: string, uid: number, disabled: boolean) => void;
    updateWorldbookConfig: (config: WorldbookConfig) => void;

    addProfile: (profile: WorldbookConfigProfile) => void;
    updateProfile: (id: string, updates: Partial<WorldbookConfigProfile>) => void;
    deleteProfile: (id: string) => void;

    refreshWorldbooks: () => Promise<void>;
    saveWorldInfo: () => Promise<void>;
    hasChanges: boolean;
}

export function useWorldInfo(): UseWorldInfoReturn {
    const [worldbookStructure, setWorldbookStructure] = useState<Record<string, any[]>>({});
    const [disabledEntries, setDisabledEntries] = useState<Record<string, number[]>>(SettingsManager.get('apiSettings')?.worldbookConfig?.disabledEntries || {});
    const [disabledWorldbooks, setDisabledWorldbooks] = useState<string[]>([]);
    const [currentCharWorldbook, setCurrentCharWorldbook] = useState<string | null>(null);
    const [worldbookConfig, setWorldbookConfig] = useState<WorldbookConfig | undefined>(SettingsManager.get('apiSettings')?.worldbookConfig || getDefaultAPISettings().worldbookConfig);
    const [worldbookProfiles, setWorldbookProfiles] = useState<WorldbookConfigProfile[]>(SettingsManager.get('apiSettings')?.worldbookProfiles || []);
    const [worldbookScopes, setWorldbookScopes] = useState<{ global: string[]; chat: string[]; installed: string[] }>({ global: [], chat: [], installed: [] });
    const [hasChanges, setHasChanges] = useState(false);

    const loadWorldbookState = useCallback(async () => {
        // 1. 加载结构
        const structure = await WorldInfoService.getWorldbookStructure();
        setWorldbookStructure(structure);

        // 加载作用域
        const scopes = WorldInfoService.getScopes();
        setWorldbookScopes(scopes);

        // 2. 加载当前角色状态 (仅记录当前角色世界书用于 fallback)
        const helper = getTavernHelper();
        const charBooks = helper?.getCharWorldbookNames?.('current');
        if (charBooks?.primary) {
            setCurrentCharWorldbook(charBooks.primary);
        }

        // 3. 加载设置
        const apiSettings = SettingsManager.get('apiSettings');
        const config = apiSettings?.worldbookConfig;
        setWorldbookConfig(config);
        if (config?.disabledWorldbooks) {
            setDisabledWorldbooks(config.disabledWorldbooks);
        }
        if (config?.disabledEntries) {
            setDisabledEntries(config.disabledEntries);
        }
        setWorldbookProfiles(apiSettings?.worldbookProfiles || []);
    }, []);

    useEffect(() => {
        loadWorldbookState();
    }, [loadWorldbookState]);

    const toggleWorldbook = useCallback((name: string, disabled: boolean) => {
        setDisabledWorldbooks(prev => {
            const next = disabled ? [...new Set([...prev, name])] : prev.filter(n => n !== name);
            setWorldbookConfig((prevConfig: WorldbookConfig | undefined) => prevConfig ? { ...prevConfig, disabledWorldbooks: next } : { ...getDefaultAPISettings().worldbookConfig, disabledWorldbooks: next });
            return next;
        });
        setHasChanges(true);
    }, []);

    const toggleEntry = useCallback((worldbook: string, uid: number, disabled: boolean) => {
        setDisabledEntries(prev => {
            const currentList = prev[worldbook] || [];
            const nextList = disabled ? [...new Set([...currentList, uid])] : currentList.filter(id => id !== uid);
            return { ...prev, [worldbook]: nextList };
        });
        setHasChanges(true);
    }, []);

    const updateWorldbookConfig = useCallback((config: WorldbookConfig) => {
        setWorldbookConfig(config);
        if (config.disabledWorldbooks) {
            setDisabledWorldbooks(config.disabledWorldbooks);
        }
        setHasChanges(true);
    }, []);

    const addProfile = useCallback((profile: WorldbookConfigProfile) => {
        setWorldbookProfiles(prev => [...prev, profile]);
        setHasChanges(true);
    }, []);

    const updateProfile = useCallback((id: string, updates: Partial<WorldbookConfigProfile>) => {
        setWorldbookProfiles(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p));
        setHasChanges(true);
    }, []);

    const deleteProfile = useCallback((id: string) => {
        setWorldbookProfiles(prev => prev.filter(p => p.id !== id));
        setHasChanges(true);
    }, []);

    const saveWorldInfo = useCallback(async () => {
        // 保存全局配置和Profiles
        const currentSettings = (SettingsManager.get('apiSettings') || {}) as EngramAPISettings;
        const newWorldbookConfig = {
            ...currentSettings.worldbookConfig,
            ...worldbookConfig,
            disabledWorldbooks: disabledWorldbooks,
            disabledEntries: disabledEntries
        };

        SettingsManager.set('apiSettings', {
            ...currentSettings,
            worldbookConfig: newWorldbookConfig,
            worldbookProfiles: worldbookProfiles
        });

        // 角色世界书的本地状态废弃，统一写入上述全局 config
        setHasChanges(false);
    }, [disabledWorldbooks, disabledEntries, currentCharWorldbook, worldbookConfig, worldbookProfiles]);

    return {
        worldbookStructure,
        disabledEntries,
        disabledWorldbooks,
        currentCharWorldbook,
        worldbookConfig,
        worldbookProfiles,
        worldbookScopes,
        toggleWorldbook,
        toggleEntry,
        updateWorldbookConfig,
        addProfile,
        updateProfile,
        deleteProfile,
        refreshWorldbooks: loadWorldbookState,
        saveWorldInfo,
        hasChanges,
    };
}

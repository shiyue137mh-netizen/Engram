/**
 * useWorldInfo - 世界书状态管理
 */

import { useState, useCallback, useEffect } from 'react';
import { WorldBookStateService } from "@/integrations/tavern/WorldBookState";
import { WorldInfoService } from '@/integrations/tavern/api/WorldInfo';
import { getTavernHelper } from '@/integrations/tavern/api/WorldInfo';
import { SettingsManager } from "@/config/settings";
import type { WorldbookConfig, EngramAPISettings } from '@/config/types/defaults';
import { getDefaultAPISettings } from '@/config/types/defaults';

export interface UseWorldInfoReturn {
    worldbookStructure: Record<string, any[]>;
    disabledEntries: Record<string, number[]>;
    disabledWorldbooks: string[];
    currentCharWorldbook: string | null;
    worldbookConfig: WorldbookConfig | undefined; // Added

    toggleWorldbook: (name: string, disabled: boolean) => void;
    toggleEntry: (worldbook: string, uid: number, disabled: boolean) => void;
    updateWorldbookConfig: (config: WorldbookConfig) => void; // Added
    refreshWorldbooks: () => Promise<void>;
    saveWorldInfo: () => Promise<void>; // Renamed
    hasChanges: boolean; // Added
}

export function useWorldInfo(): UseWorldInfoReturn {
    const [worldbookStructure, setWorldbookStructure] = useState<Record<string, any[]>>({});
    const [disabledEntries, setDisabledEntries] = useState<Record<string, number[]>>({});
    const [disabledWorldbooks, setDisabledWorldbooks] = useState<string[]>([]);
    const [currentCharWorldbook, setCurrentCharWorldbook] = useState<string | null>(null);
    const [worldbookConfig, setWorldbookConfig] = useState<WorldbookConfig | undefined>(SettingsManager.get('apiSettings')?.worldbookConfig || getDefaultAPISettings().worldbookConfig);
    const [hasChanges, setHasChanges] = useState(false);

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

        // 3. 加载禁用世界书配置
        const config = SettingsManager.get('apiSettings')?.worldbookConfig;
        setWorldbookConfig(config);
        if (config?.disabledWorldbooks) {
            setDisabledWorldbooks(config.disabledWorldbooks);
        }
    }, []);

    useEffect(() => {
        loadWorldbookState();
    }, [loadWorldbookState]);

    const toggleWorldbook = useCallback((name: string, disabled: boolean) => {
        setDisabledWorldbooks(prev => {
            const next = disabled ? [...new Set([...prev, name])] : prev.filter(n => n !== name);
            // Updating local config state as well
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

    const saveWorldInfo = useCallback(async () => {
        // 保存全局配置 (disabledWorldbooks)
        const currentSettings = (SettingsManager.get('apiSettings') || {}) as EngramAPISettings;
        const newWorldbookConfig = {
            ...currentSettings.worldbookConfig,
            ...worldbookConfig,
            disabledWorldbooks: disabledWorldbooks
        };

        SettingsManager.set('apiSettings', {
            ...currentSettings,
            worldbookConfig: newWorldbookConfig
        });

        // 保存角色状态
        if (currentCharWorldbook) {
            await WorldBookStateService.saveState(currentCharWorldbook, {
                disabledEntries
            });
        }
        setHasChanges(false);
    }, [disabledWorldbooks, disabledEntries, currentCharWorldbook, worldbookConfig]);

    return {
        worldbookStructure,
        disabledEntries,
        disabledWorldbooks,
        currentCharWorldbook,
        worldbookConfig,
        toggleWorldbook,
        toggleEntry,
        updateWorldbookConfig,
        refreshWorldbooks: loadWorldbookState,
        saveWorldInfo,
        hasChanges,
    };
}

/**
 * useSummarizerConfig - 摘要和精简配置管理 Hook
 *
 * 管理 summarizerConfig (自动总结) 和 trimConfig (精简)
 */
import { useState, useCallback, useEffect } from 'react';
import { SettingsManager } from "@/config/settings";
import { DEFAULT_TRIM_CONFIG, type TrimConfig } from '@/modules/memory/EventTrimmer';

// 兼容旧的 Summarizer Config 接口
interface SummarizerSettings {
    autoEnabled: boolean;
    floorInterval: number;
    bufferSize: number;
    autoHide: boolean;
}

const DEFAULT_SUMMARIZER_SETTINGS: SummarizerSettings = {
    autoEnabled: true,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: false,
};

export interface UseSummarizerConfigReturn {
    summarizerSettings: SummarizerSettings;
    trimConfig: TrimConfig;

    updateSummarizerSettings: (settings: SummarizerSettings) => void;
    updateTrimConfig: (config: TrimConfig) => void;

    saveSummarizerConfig: () => void;
    hasChanges: boolean;
}

export function useSummarizerConfig(): UseSummarizerConfigReturn {
    // 状态
    const [summarizerSettings, setSummarizerSettings] = useState<SummarizerSettings>(DEFAULT_SUMMARIZER_SETTINGS);
    const [trimConfig, setTrimConfig] = useState<TrimConfig>(DEFAULT_TRIM_CONFIG);
    const [hasChanges, setHasChanges] = useState(false);

    // 加载初始配置
    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            // 加载 Summarizer Service 状态
            const { summarizerService } = await import('@/modules/memory');
            const config = summarizerService.getConfig();
            setSummarizerSettings({
                autoEnabled: config.enabled,
                floorInterval: config.floorInterval,
                bufferSize: config.bufferSize || 3,
                autoHide: config.autoHide || false
            });

            // 加载 Trim Config
            const savedTrimConfig = SettingsManager.getSummarizerSettings()?.trimConfig;
            if (savedTrimConfig) {
                setTrimConfig({ ...DEFAULT_TRIM_CONFIG, ...savedTrimConfig });
            }
        } catch (e) {
            console.error('Failed to load summarizer config:', e);
        }
    };

    // 更新 Summarizer Settings
    const updateSummarizerSettings = useCallback((settings: SummarizerSettings) => {
        setSummarizerSettings(settings);
        setHasChanges(true);
        // 注意：SummarizerService 的更新通常是即时的，这里只是 UI 状态
        // 实际应用会在 saveSummarizerConfig 中处理
    }, []);

    // 更新 Trim Config
    const updateTrimConfig = useCallback((config: TrimConfig) => {
        setTrimConfig(config);
        setHasChanges(true);
    }, []);

    // 保存配置
    const saveSummarizerConfig = useCallback(async () => {
        try {
            // 1. 保存 Summarizer Service 配置
            const { summarizerService } = await import('@/modules/memory');
            summarizerService.updateConfig({
                enabled: summarizerSettings.autoEnabled,
                floorInterval: summarizerSettings.floorInterval,
                bufferSize: summarizerSettings.bufferSize,
                autoHide: summarizerSettings.autoHide
            });

            // 2. 保存 Trim Config 到 SettingsManager
            SettingsManager.setSummarizerSettings({ trimConfig });

            // 3. 更新 EventTrimmer if needed (usually it reads from settings or gets updated via service)
            // 这里我们显式更新一下，确保一致性
            const { eventTrimmer } = await import('@/modules/memory/EventTrimmer');
            eventTrimmer.updateConfig({ enabled: trimConfig.enabled });

            setHasChanges(false);
        } catch (e) {
            console.error('Failed to save summarizer config:', e);
        }
    }, [summarizerSettings, trimConfig]);

    return {
        summarizerSettings,
        trimConfig,
        updateSummarizerSettings,
        updateTrimConfig,
        saveSummarizerConfig,
        hasChanges
    };
}

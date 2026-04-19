/**
 * UseSummarizerConfig - 摘要和精简配置管理 Hook
 *
 * 管理 summarizerConfig (自动总结) 和 trimConfig (精简)
 */
import { useCallback, useEffect, useState } from 'react';
import { SettingsManager } from "@/config/settings";
import { DEFAULT_TRIM_CONFIG } from '@/config/types/defaults';
import type { TrimConfig } from '@/config/types/memory';

// 兼容旧的 Summarizer Config 接口
interface SummarizerSettings {
    autoEnabled: boolean;
    floorInterval: number;
    bufferSize: number;
    autoHide: boolean;
}

const DEFAULT_SUMMARIZER_SETTINGS: SummarizerSettings = {
    autoEnabled: true,
    autoHide: false,
    bufferSize: 3,
    floorInterval: 10,
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
                autoHide: config.autoHide || false,
                bufferSize: config.bufferSize || 3,
                floorInterval: config.floorInterval
            });

            // 加载 Trim Config
            const savedTrimConfig = SettingsManager.getSummarizerSettings()?.trimConfig;
            if (savedTrimConfig) {
                setTrimConfig({ ...DEFAULT_TRIM_CONFIG, ...savedTrimConfig });
            }
        } catch (error) {
            console.error('Failed to load summarizer config:', error);
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
                autoHide: summarizerSettings.autoHide,
                bufferSize: summarizerSettings.bufferSize,
                enabled: summarizerSettings.autoEnabled,
                floorInterval: summarizerSettings.floorInterval
            });

            // 2. 保存 Trim Config 到 SettingsManager
            SettingsManager.setSummarizerSettings({ trimConfig });

            // 3. 同步运行态 EventTrimmer，避免自动触发仍使用旧阈值
            const { eventTrimmer } = await import('@/modules/memory/EventTrimmer');
            eventTrimmer.updateConfig(trimConfig);

            setHasChanges(false);
        } catch (error) {
            console.error('Failed to save summarizer config:', error);
        }
    }, [summarizerSettings, trimConfig]);

    return {
        hasChanges,
        saveSummarizerConfig,
        summarizerSettings,
        trimConfig,
        updateSummarizerSettings,
        updateTrimConfig
    };
}

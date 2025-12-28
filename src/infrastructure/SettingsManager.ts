import { Logger } from './logger';
import type { PromptTemplate, PromptCategory } from '../core/api/types';

export interface EngramSettings {
    theme: string;
    presets: any; // Define properly later
    templates: any; // Define properly later
    promptTemplates: PromptTemplate[]; // 提示词模板列表
    // Add other persistent keys here
}

export class SettingsManager {
    private static readonly EXTENSION_NAME = 'engram';
    private static saveTimeout: any = null;

    /**
     * Load settings from SillyTavern global state
     */
    public static loadSettings(): EngramSettings {
        try {
            // @ts-ignore
            const st = window.SillyTavern?.extension_settings?.[this.EXTENSION_NAME] || {};
            return {
                theme: st.theme || 'odysseia', // Default to new theme
                presets: st.presets || {},
                templates: st.templates || {},
                promptTemplates: st.promptTemplates || [],
            };
        } catch (e) {
            Logger.warn('SettingsManager', 'Failed to load settings', e);
            return { theme: 'odysseia', presets: {}, templates: {}, promptTemplates: [] };
        }
    }

    /**
     * Get a specific setting value
     */
    public static get<K extends keyof EngramSettings>(key: K): EngramSettings[K] {
        const settings = this.loadSettings();
        return settings[key];
    }

    /**
     * Save a specific setting value
     */
    public static set<K extends keyof EngramSettings>(key: K, value: EngramSettings[K]) {
        const settings = this.loadSettings();
        settings[key] = value;
        this.saveToST(settings);
    }

    /**
     * 获取指定分类下已启用的提示词模板
     * @param category 模板分类
     * @returns 启用的模板，如果没有则返回 null
     */
    public static getEnabledPromptTemplate(category: PromptCategory): PromptTemplate | null {
        const templates = this.get('promptTemplates') || [];
        return templates.find((t: PromptTemplate) => t.category === category && t.enabled) || null;
    }

    /**
     * Persist to SillyTavern extension_settings
     * This updates the global object immediately for local usage,
     * and debounces the server save call.
     */
    private static saveToST(settings: EngramSettings) {
        // 1. Update Global Object
        // @ts-ignore
        if (!window.SillyTavern) return;

        // @ts-ignore
        if (!window.SillyTavern.extension_settings) {
            // @ts-ignore
            window.SillyTavern.extension_settings = {};
        }

        // @ts-ignore
        window.SillyTavern.extension_settings[this.EXTENSION_NAME] = settings;

        // 2. Trigger Save (Debounced)
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.pushToServer();
        }, 1000);
    }

    /**
     * Push settings to server via ST API
     * Note: We use the generic extension settings save mechanism if available,
     * or rely on ST's auto-save if it observes the object. 
     * Usually ST requires manual trigger for extensions.js based extensions,
     * assuming they call `saveSettingsDebounced()` globally.
     */
    private static pushToServer() {
        Logger.info('SettingsManager', 'Persisting settings to server...');
        try {
            // Try calling standard ST save function if exposed
            // @ts-ignore
            if (window.saveSettingsDebounced) {
                // @ts-ignore
                window.saveSettingsDebounced();
            } else {
                // Fallback: Manually fetch
                // This might need adjustment based on valid ST API endpoints for extensions
                // For now, assume global save works or ignore if local-only usage
            }
        } catch (e) {
            Logger.error('SettingsManager', 'Failed to save settings', e);
        }
    }
}


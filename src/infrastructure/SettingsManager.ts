import { Logger } from './logger';
import type { PromptTemplate, PromptCategory } from '../core/api/types';

export interface EngramSettings {
    theme: string;
    presets: any; // Define properly later
    templates: any; // Define properly later
    promptTemplates: PromptTemplate[]; // 提示词模板列表
    hasSeenWelcome: boolean; // 是否已看过欢迎动画
    lastReadVersion: string; // 最后已读的版本号
    summarizerConfig: Partial<any>; // 总结器配置
}

/** 默认设置 */
const defaultSettings: EngramSettings = Object.freeze({
    theme: 'odysseia',
    presets: {},
    templates: {},
    promptTemplates: [],
    hasSeenWelcome: false,
    lastReadVersion: '0.0.0',
    summarizerConfig: {},
});

/**
 * SettingsManager - Engram 设置管理器
 * 
 * 使用 SillyTavern.getContext().extensionSettings API 进行持久化
 * 这是 ST 官方推荐的扩展设置存储方式
 */
export class SettingsManager {
    private static readonly EXTENSION_NAME = 'engram';

    /**
     * 获取 SillyTavern context
     */
    private static getContext(): any {
        // @ts-ignore
        return window.SillyTavern?.getContext?.();
    }

    /**
     * 获取扩展设置对象
     * 如果不存在则创建
     */
    private static getExtensionSettings(): EngramSettings {
        const context = this.getContext();
        if (!context?.extensionSettings) {
            Logger.warn('SettingsManager', 'SillyTavern context.extensionSettings not available');
            return { ...defaultSettings };
        }

        // 如果 engram 设置不存在，初始化它
        if (!context.extensionSettings[this.EXTENSION_NAME]) {
            context.extensionSettings[this.EXTENSION_NAME] = { ...defaultSettings };
            Logger.debug('SettingsManager', 'Initialized engram settings with defaults');
            // 保存初始化的设置
            this.save();
        }

        return context.extensionSettings[this.EXTENSION_NAME];
    }

    /**
     * 初始化设置（在扩展加载时调用）
     * 确保所有必需的字段都存在
     */
    public static initSettings(): void {
        const context = this.getContext();
        if (!context?.extensionSettings) {
            Logger.warn('SettingsManager', 'Cannot init settings: context not available');
            return;
        }

        let shouldSave = false;

        // 如果 engram 设置不存在，创建它
        if (!context.extensionSettings[this.EXTENSION_NAME]) {
            context.extensionSettings[this.EXTENSION_NAME] = { ...defaultSettings };
            shouldSave = true;
            Logger.info('SettingsManager', 'Created engram settings');
        }

        // 确保所有必需的字段都存在（补全缺失的字段）
        const settings = context.extensionSettings[this.EXTENSION_NAME];
        for (const key of Object.keys(defaultSettings) as (keyof EngramSettings)[]) {
            if (!(key in settings)) {
                (settings as any)[key] = (defaultSettings as any)[key];
                shouldSave = true;
                Logger.debug('SettingsManager', `Added missing field: ${key}`);
            }
        }

        if (shouldSave) {
            this.save();
        }
    }

    /**
     * Get a specific setting value
     */
    public static get<K extends keyof EngramSettings>(key: K): EngramSettings[K] {
        const settings = this.getExtensionSettings();
        const value = settings[key];
        // 如果值不存在，返回默认值
        return value !== undefined ? value : defaultSettings[key];
    }

    /**
     * Save a specific setting value
     * 直接更新 context.extensionSettings 中的字段
     */
    public static set<K extends keyof EngramSettings>(key: K, value: EngramSettings[K]): void {
        const context = this.getContext();
        if (!context?.extensionSettings) {
            Logger.warn('SettingsManager', 'Cannot set: context.extensionSettings not available');
            return;
        }

        // 确保 engram 对象存在
        if (!context.extensionSettings[this.EXTENSION_NAME]) {
            context.extensionSettings[this.EXTENSION_NAME] = { ...defaultSettings };
        }

        // 更新单个字段
        context.extensionSettings[this.EXTENSION_NAME][key] = value;
        Logger.debug('SettingsManager', `Set ${String(key)} = ${JSON.stringify(value)}`);

        // 保存到服务器
        this.save();
    }

    /**
     * 保存设置到服务器
     */
    private static save(): void {
        const context = this.getContext();
        if (context?.saveSettingsDebounced) {
            context.saveSettingsDebounced();
            Logger.debug('SettingsManager', 'Saved via context.saveSettingsDebounced');
        } else {
            Logger.warn('SettingsManager', 'saveSettingsDebounced not available');
        }
    }

    /**
     * Load settings from SillyTavern global state
     * 兼容旧代码的接口
     */
    public static loadSettings(): EngramSettings {
        return this.getExtensionSettings();
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
}

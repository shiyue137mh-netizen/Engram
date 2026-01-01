import { Logger } from '@/lib/logger';
import type { PromptTemplate, PromptCategory, EngramAPISettings } from '@/services/api/types';
import type { RegexRule } from '@/services/summarizer/RegexProcessor';

export interface EngramSettings {
    theme: string;
    presets: any; // Define properly later
    templates: any; // Define properly later
    promptTemplates: PromptTemplate[]; // 提示词模板列表
    hasSeenWelcome: boolean; // 是否已看过欢迎动画
    lastReadVersion: string; // 最后已读的版本号
    summarizerConfig: Partial<any>; // 总结器配置
    trimmerConfig: Partial<any>; // 精简器配置
    regexRules: RegexRule[]; // 正则规则列表
    apiSettings: EngramAPISettings | null; // API 配置（LLM 预设、向量化、Rerank 等）
    linkedDeletion: {
        enabled: boolean;          // 是否启用联动删除
        deleteWorldbook: boolean;  // 删除角色时删除 Engram 世界书
        deleteIndexedDB: boolean;  // 删除角色时删除 IndexedDB 数据
        showConfirmation: boolean; // 删除前显示确认对话框
    };
    glassSettings: {
        opacity: number; // 0-1
        blur: number;    // px
    };
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
    trimmerConfig: {},
    regexRules: [],
    apiSettings: null,
    linkedDeletion: {
        enabled: true,
        deleteWorldbook: true,
        deleteIndexedDB: false, // 默认不删数据库，以防万一
        showConfirmation: true,
    },
    glassSettings: {
        opacity: 0.3,
        blur: 10,
    },
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
    public static getSettings(): EngramSettings {
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

    private static getExtensionSettings(): EngramSettings {
        return this.getSettings();
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

    /**
     * 获取总结器设置
     * @returns summarizerConfig 对象
     */
    public static getSummarizerSettings(): any {
        return this.get('summarizerConfig') || {};
    }

    /**
     * 设置总结器设置（合并更新）
     * @param config 要合并的配置对象
     */
    public static setSummarizerSettings(config: Partial<any>): void {
        const current = this.getSummarizerSettings();
        this.set('summarizerConfig', { ...current, ...config });
    }

    /**
     * 获取正则规则列表
     * @returns RegexRule[] 正则规则数组
     */
    public static getRegexRules(): RegexRule[] {
        return this.get('regexRules') || [];
    }

    /**
     * 设置正则规则列表
     * @param rules 规则数组
     */
    public static setRegexRules(rules: RegexRule[]): void {
        this.set('regexRules', rules);
    }
}

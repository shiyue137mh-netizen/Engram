import { Logger } from '@/core/logger';
import type { PromptTemplate } from '@/config/types/prompt';
import type { PromptCategory } from '@/config/types/prompt';
import type { EngramAPISettings } from '@/config/types/defaults';
import { getBuiltInTemplateById } from '@/config/types/defaults';
import type { RegexRule } from '@/modules/workflow/steps';
import type { PreprocessingConfig } from '@/modules/preprocessing/types';

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
    preprocessingConfig: PreprocessingConfig | null; // V0.8: 预处理配置
    linkedDeletion: {
        enabled: boolean;          // 是否启用联动删除
        deleteWorldbook: boolean;  // 删除角色时删除 Engram 世界书
        deleteChatWorldbook: boolean; // 删除聊天时删除 Engram 世界书
        deleteIndexedDB: boolean;  // 删除角色时删除 IndexedDB 数据
        showConfirmation: boolean; // 删除前显示确认对话框
    };
    glassSettings: {
        enabled: boolean; // 是否启用
        opacity: number; // 0-1
        blur: number;    // px
    };
    syncConfig: {
        enabled: boolean;  // 总开关：是否启用同步功能
        autoSync: boolean; // 是否在数据变动时自动上传
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
    preprocessingConfig: null, // V0.8: 默认关闭预处理
    linkedDeletion: {
        enabled: true,
        deleteWorldbook: true,
        deleteChatWorldbook: false, // 默认关闭，防止误删
        deleteIndexedDB: false,
        showConfirmation: true,
    },
    glassSettings: {
        enabled: true,
        opacity: 0.3,
        blur: 10,
    },
    syncConfig: {
        enabled: false, // 默认关闭（Beta功能）
        autoSync: true, // 启用后默认开启自动同步
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
        // 优先从 apiSettings.promptTemplates 读取（这是 useAPIPresets 保存的位置）
        const apiSettings = this.get('apiSettings') as { promptTemplates?: PromptTemplate[] } | null;
        const templates = apiSettings?.promptTemplates || [];
        return templates.find((t: PromptTemplate) => t.category === category && t.enabled) || null;
    }

    /**
     * 根据 ID 获取提示词模板
     * @param id 模板 ID
     * @returns 模板对象，如果未找到则返回 null
     */
    public static getPromptTemplateById(id: string): PromptTemplate | null {
        const apiSettings = this.get('apiSettings') as { promptTemplates?: PromptTemplate[] } | null;
        const templates = apiSettings?.promptTemplates || [];
        // 尝试精确匹配 ID
        const byId = templates.find((t: PromptTemplate) => t.id === id);
        if (byId) return byId;

        // Fallback: 尝试查找内置模板
        const builtIn = getBuiltInTemplateById(id);
        if (builtIn) {
            // 注意：这里返回的内置模板可能没有用户覆盖的配置（如 enabled），
            // 但如果它被 QuickPanel 选中为当前模板，说明用户意图是使用它。
            // 它的 enabled 状态可能在 Settings 里没保存，但在运行时 context 下它是有效的。
            return builtIn;
        }

        // 向下兼容：如果 ID 实际上是 category (旧版配置可能会这样)，尝试按分类查找启用的模板
        // 这种情况主要发生在旧配置未完全迁移时
        return templates.find((t: PromptTemplate) => t.category === id && t.enabled) || null;
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

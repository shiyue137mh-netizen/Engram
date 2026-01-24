import { Logger, LogModule } from '@/core/logger';
import type { PromptTemplate } from '@/config/types/prompt';
// @ts-ignore
const promptFiles = import.meta.glob('./prompts/*.yaml', { eager: true, query: '?raw' });
import loadYaml from 'js-yaml';

/**
 * PromptLoader - 提示词加载器
 * 负责从 YAML 文件加载内置提示词模板
 */
export class PromptLoader {
    private static templates: PromptTemplate[] = [];
    private static initialized = false;

    /**
     * 初始化加载
     */
    public static init() {
        if (this.initialized) return;

        const loadedTemplates: PromptTemplate[] = [];

        for (const path in promptFiles) {
            try {
                // @ts-ignore
                const rawContent = promptFiles[path].default;
                const parsed = loadYaml.load(rawContent) as Record<string, any>;

                // Validate required fields
                if (!parsed.id || !parsed.name) {
                    Logger.warn(LogModule.LLM, `Skipping invalid prompt template in ${path}: missing id or name`);
                    continue;
                }

                loadedTemplates.push({
                    id: parsed.id,
                    name: parsed.name,
                    category: parsed.category || 'other',
                    enabled: parsed.enabled ?? false,
                    isBuiltIn: true,
                    boundPresetId: null,
                    systemPrompt: parsed.systemPrompt || '',
                    userPromptTemplate: parsed.userPromptTemplate || '',
                    injectionMode: parsed.injectionMode,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });
            } catch (e) {
                Logger.error(LogModule.LLM, `Failed to load prompt template from ${path}`, e);
            }
        }

        this.templates = loadedTemplates;
        Logger.info(LogModule.LLM, `Loaded ${this.templates.length} built-in prompt templates from YAML`);
        this.initialized = true;
    }

    /**
     * 获取所有内置模板 (V0.9.1)
     */
    public static getBuiltInTemplates(): PromptTemplate[] {
        // 确保已从 YAML 加载
        this.init();
        return this.templates;
    }

    /**
     * 获取所有模板的 Alias (V1.0.0 Refactor)
     */
    public static getAllTemplates(): PromptTemplate[] {
        return this.getBuiltInTemplates();
    }
}

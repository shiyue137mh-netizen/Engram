/**
 * TrimmerService - 精简服务 (二层总结)
 * 
 * 将多条第一层总结 (剧情摘要) 合并精简为更简洁的记忆
 * 
 * 触发条件：
 * - Token 模式：总结条目的总 Token 超过阈值
 * - 楼层模式：覆盖的总楼层数超过阈值
 * - 条目数模式：总结条目数量超过阈值
 */

import { WorldInfoService, WorldInfoEntry, SUMMARY_ENTRY_KEY } from '../../infrastructure/tavern/WorldInfoService';
import { LLMAdapter, llmAdapter } from './LLMAdapter';
import { RegexProcessor, regexProcessor } from './RegexProcessor';
import { Logger } from '../../infrastructure/logger';
import { ModelLogger } from '../../infrastructure/logger/ModelLogger';
import { notificationService } from '../../infrastructure/NotificationService';
import { SettingsManager } from '../../infrastructure/SettingsManager';
import { revisionService } from '../services/RevisionService';
import { getCurrentCharacter, getCurrentModel } from '../../infrastructure/STContext';
import type { TrimConfig, TrimTriggerType } from '../api/types';
import { DEFAULT_TRIM_CONFIG } from '../api/types';

/** 精简服务配置 */
export interface TrimmerConfig extends TrimConfig {
    /** 保留最近 N 条不合并 */
    keepRecentCount: number;
    /** 是否保留原始条目（禁用而非删除） */
    preserveOriginal: boolean;
    /** 是否启用预览确认 */
    previewEnabled: boolean;
}

/** 默认精简服务配置 */
export const DEFAULT_TRIMMER_CONFIG: TrimmerConfig = {
    ...DEFAULT_TRIM_CONFIG,
    keepRecentCount: 3,
    preserveOriginal: false,
    previewEnabled: true,
};

/** 精简请求 */
export interface TrimRequest {
    /** 待合并的条目 */
    entries: WorldInfoEntry[];
    /** 合并后的楼层范围 */
    floorRange: [number, number];
}

/** 精简结果 */
export interface TrimResult {
    /** 精简后的内容 */
    content: string;
    /** Token 数量 */
    tokenCount: number;
    /** 被合并的条目 UID */
    sourceEntryIds: number[];
    /** 新的楼层范围 */
    newFloorRange: [number, number];
    /** 新条目使用的 order */
    newOrder: number;
}

/** 精简状态 */
export interface TrimmerStatus {
    /** 是否达到触发条件 */
    triggered: boolean;
    /** 当前触发类型 */
    triggerType: TrimTriggerType;
    /** 当前值 */
    currentValue: number;
    /** 触发阈值 */
    threshold: number;
    /** 待合并的条目数 */
    pendingEntryCount: number;
    /** 是否正在执行 */
    isTrimming: boolean;
}

/** 备用精简提示词模板 */
const FALLBACK_TRIM_PROMPT = {
    system: `你是一个信息压缩助手。你的任务是将多条剧情摘要合并、精简为一条更简洁的综合摘要。

规则：
1. 保留最重要的信息：关键事件、重要人物、核心转折
2. 删除重复或冗余的内容
3. 合并相似或连续的事件
4. 保持时间顺序
5. 保留原有的格式风格（如时间标记、人物标注等）
6. 输出应该是输入总长度的 30-50%

警告：
- 绝对不要添加任何新内容或推测
- 绝对不要改变事件的含义
- 保留所有专有名词和关键数据`,

    user: `请将以下多条剧情摘要合并精简：

{{engramSummaries}}

---
请输出一条精简后的综合摘要：`,
};

/**
 * TrimmerService 类
 * 精简服务核心
 */
export class TrimmerService {
    private config: TrimmerConfig;
    private llmAdapter: LLMAdapter;
    private isTrimming = false;

    constructor(
        config?: Partial<TrimmerConfig>,
        adapter?: LLMAdapter
    ) {
        // 加载配置
        const savedConfig = SettingsManager.get('trimmerConfig') as Partial<TrimmerConfig> || {};
        this.config = { ...DEFAULT_TRIMMER_CONFIG, ...savedConfig, ...config };
        this.llmAdapter = adapter || llmAdapter;
    }

    // ==================== 配置管理 ====================

    /**
     * 获取配置
     */
    getConfig(): TrimmerConfig {
        return { ...this.config };
    }

    /**
     * 更新配置
     */
    updateConfig(config: Partial<TrimmerConfig>): void {
        this.config = { ...this.config, ...config };
        // 持久化保存 (作为 summarizerConfig 的一部分)
        const currentSettings = SettingsManager.get('summarizerConfig') || {};
        SettingsManager.set('summarizerConfig', {
            ...currentSettings,
            trimmer: this.config,
        });
        this.log('debug', '配置已更新', this.config);
    }

    // ==================== 状态检查 ====================

    /**
     * 获取当前状态
     */
    async getStatus(): Promise<TrimmerStatus> {
        const worldbook = WorldInfoService.findExistingWorldbook();
        if (!worldbook) {
            return {
                triggered: false,
                triggerType: this.config.trigger,
                currentValue: 0,
                threshold: this.getThreshold(),
                pendingEntryCount: 0,
                isTrimming: this.isTrimming,
            };
        }

        const entries = await WorldInfoService.getSummaryEntries(worldbook);
        const pendingCount = Math.max(0, entries.length - this.config.keepRecentCount);
        const currentValue = await this.getCurrentTriggerValue(worldbook, entries);
        const threshold = this.getThreshold();

        return {
            triggered: this.config.enabled && currentValue >= threshold,
            triggerType: this.config.trigger,
            currentValue,
            threshold,
            pendingEntryCount: pendingCount,
            isTrimming: this.isTrimming,
        };
    }

    /**
     * 获取当前触发器的阈值
     */
    private getThreshold(): number {
        switch (this.config.trigger) {
            case 'token':
                return this.config.tokenLimit;
            case 'count':
                return this.config.countLimit;
            default:
                return 0;
        }
    }

    /**
     * 获取当前触发器的值
     */
    private async getCurrentTriggerValue(worldbook: string, entries: WorldInfoEntry[]): Promise<number> {
        switch (this.config.trigger) {
            case 'token':
                return await WorldInfoService.countSummaryTokens(worldbook);

            case 'count':
                return entries.length;

            default:
                return 0;
        }
    }

    /**
     * 检查是否达到触发条件
     */
    async checkTrigger(): Promise<boolean> {
        const status = await this.getStatus();
        return status.triggered;
    }

    // ==================== 精简逻辑 ====================

    /**
     * 获取待合并的条目
     * 排除最近 N 条
     */
    async getEntriesToMerge(): Promise<WorldInfoEntry[]> {
        const worldbook = WorldInfoService.findExistingWorldbook();
        if (!worldbook) return [];

        const entries = await WorldInfoService.getSummaryEntries(worldbook);

        // 排除最近 N 条
        const keepCount = this.config.keepRecentCount;
        if (entries.length <= keepCount) {
            return [];
        }

        // 返回除了最后 keepCount 条之外的所有条目
        return entries.slice(0, entries.length - keepCount);
    }

    /**
     * 手动/自动触发精简
     */
    async triggerTrim(manual = false): Promise<TrimResult | null> {
        if (this.isTrimming) {
            this.log('warn', '正在执行精简，跳过本次触发');
            return null;
        }

        if (!this.config.enabled && !manual) {
            this.log('debug', '精简功能已禁用');
            return null;
        }

        const worldbook = WorldInfoService.findExistingWorldbook();
        if (!worldbook) {
            this.log('warn', '世界书未找到');
            notificationService.warning('未找到 Engram 世界书', 'Engram');
            return null;
        }

        // 获取待合并的条目
        const entriesToMerge = await this.getEntriesToMerge();
        if (entriesToMerge.length < 2) {
            if (manual) {
                notificationService.info('待合并的条目不足 (需要至少 2 条)', 'Engram');
            }
            return null;
        }

        this.isTrimming = true;
        this.log('info', '开始执行精简', {
            entryCount: entriesToMerge.length,
            manual,
        });

        try {
            // 计算楼层范围
            const floorRanges = entriesToMerge
                .map(e => WorldInfoService.parseFloorRangeFromName(e.name))
                .filter((r): r is [number, number] => r !== null);

            if (floorRanges.length === 0) {
                this.log('error', '无法解析楼层范围');
                return null;
            }

            const minFloor = Math.min(...floorRanges.map(r => r[0]));
            const maxFloor = Math.max(...floorRanges.map(r => r[1]));
            const newFloorRange: [number, number] = [minFloor, maxFloor];

            // 获取摘要内容
            const summariesContent = entriesToMerge
                .map(e => {
                    const range = WorldInfoService.parseFloorRangeFromName(e.name);
                    const label = range ? `【${range[0]}-${range[1]}楼】` : `【${e.name}】`;
                    // 移除元数据注释
                    const content = e.content.replace(/\{\{\/\/.*?\}\}/gs, '').trim();
                    return `${label}\n${content}`;
                })
                .join('\n\n---\n\n');

            // 获取提示词模板
            const template = SettingsManager.getEnabledPromptTemplate('trim');
            const systemPrompt = template?.systemPrompt || FALLBACK_TRIM_PROMPT.system;
            const userPromptTemplate = template?.userPromptTemplate || FALLBACK_TRIM_PROMPT.user;

            // 构建用户提示词
            const userPrompt = userPromptTemplate
                .replace('{{engramSummaries}}', summariesContent)
                .replace('{{context}}', summariesContent);

            this.log('debug', '使用提示词模板', {
                source: template ? 'APIPresets' : 'fallback',
                templateName: template?.name || 'default',
                inputLength: summariesContent.length,
            });

            // 记录到模型日志并调用 LLM
            const logId = ModelLogger.logSend({
                type: 'trim',
                systemPrompt,
                userPrompt,
                floorRange: newFloorRange,
                model: getCurrentModel(),
                character: getCurrentCharacter()?.name,
            });

            const startTime = Date.now();
            const response = await this.llmAdapter.generate({
                systemPrompt,
                userPrompt,
            });

            // 记录响应
            ModelLogger.logReceive(logId, {
                response: response.content,
                status: response.success ? 'success' : 'error',
                error: response.error,
                duration: Date.now() - startTime,
            });

            if (!response.success) {
                this.log('error', 'LLM 调用失败', { error: response.error });
                notificationService.error(`精简失败: ${response.error}`, 'Engram 错误');
                return null;
            }

            // 清洗输出
            const cleanedContent = regexProcessor.process(response.content, 'output');
            const tokenCount = await WorldInfoService.countTokens(cleanedContent);

            // 获取最小的 order（复用）
            const minOrder = Math.min(...entriesToMerge.map(e => e.order));

            // 创建结果
            const result: TrimResult = {
                content: cleanedContent,
                tokenCount,
                sourceEntryIds: entriesToMerge.map(e => e.uid),
                newFloorRange,
                newOrder: minOrder,
            };

            // 预览确认
            if (this.config.previewEnabled) {
                this.log('info', '预览模式：等待用户确认', { result });

                try {
                    const revisedContent = await revisionService.requestRevision(
                        '精简摘要修订',
                        `合并 ${entriesToMerge.length} 条 | 范围: ${newFloorRange[0]}-${newFloorRange[1]} 楼 | Token: ${tokenCount}`,
                        result.content
                    );

                    result.content = revisedContent;
                    result.tokenCount = await WorldInfoService.countTokens(revisedContent);
                    this.log('info', '用户确认并修订了摘要');
                } catch (e) {
                    this.log('warn', '用户取消了精简写入');
                    notificationService.info('已取消精简操作', '操作取消');
                    return null;
                }
            }

            // 写入新条目
            const writeSuccess = await this.writeCompactedEntry(worldbook, result);
            if (!writeSuccess) {
                this.log('error', '写入精简条目失败');
                return null;
            }

            // 删除/禁用原始条目
            await this.removeOriginalEntries(worldbook, result.sourceEntryIds);

            notificationService.success(
                `已精简 ${entriesToMerge.length} 条摘要为 1 条 (${newFloorRange[0]}-${newFloorRange[1]} 楼)`,
                'Engram'
            );

            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            this.log('error', '精简执行异常', { error: errorMsg });
            notificationService.error(`精简异常: ${errorMsg}`, 'Engram 错误');
            return null;
        } finally {
            this.isTrimming = false;
        }
    }

    /**
     * 写入精简后的条目
     */
    private async writeCompactedEntry(worldbook: string, result: TrimResult): Promise<boolean> {
        try {
            // 添加元数据注释
            const metadataComment = `{{// ${JSON.stringify({
                floors: result.newFloorRange,
                tokens: result.tokenCount,
                timestamp: Date.now(),
                layer: 2,  // 标记为二层精简
                mergedFrom: result.sourceEntryIds.length,
            })} }}`;
            const finalContent = `${result.content}\n\n${metadataComment}`;

            const success = await WorldInfoService.createEntry(worldbook, {
                name: `剧情摘要_${result.newFloorRange[0]}-${result.newFloorRange[1]}`,
                content: finalContent,
                keys: [SUMMARY_ENTRY_KEY],  // 添加关键词用于筛选
                enabled: true,
                constant: true,
                order: result.newOrder,
            });

            if (success) {
                this.log('success', '已写入精简条目', {
                    worldbook,
                    floorRange: result.newFloorRange,
                    order: result.newOrder,
                });
            }

            return success;
        } catch (e) {
            this.log('error', '写入精简条目失败', { error: String(e) });
            return false;
        }
    }

    /**
     * 删除/禁用原始条目
     */
    private async removeOriginalEntries(worldbook: string, entryIds: number[]): Promise<void> {
        if (this.config.preserveOriginal) {
            // 禁用而非删除
            for (const uid of entryIds) {
                await WorldInfoService.updateEntry(worldbook, uid, { enabled: false });
            }
            this.log('info', '已禁用原始条目', { count: entryIds.length });
        } else {
            // 删除
            const success = await WorldInfoService.deleteEntries(worldbook, entryIds);
            if (success) {
                this.log('info', '已删除原始条目', { count: entryIds.length });
            }
        }
    }

    // ==================== 工具方法 ====================

    /**
     * 记录日志
     */
    private log(
        level: 'debug' | 'info' | 'success' | 'warn' | 'error',
        message: string,
        data?: unknown
    ): void {
        Logger[level]('Trimmer', message, data);
    }
}

/** 默认实例 */
export const trimmerService = new TrimmerService();

export default TrimmerService;

export type TrimTriggerType = 'token' | 'count';

export interface TrimConfig {
    /** 是否启用精简 */
    enabled: boolean;
    /** 触发器类型 */
    trigger: TrimTriggerType;
    /** Token 上限（trigger='token' 时使用） */
    tokenLimit: number;
    /** 总结次数上限（trigger='count' 时使用） */
    countLimit: number;
    /** 保留最近 N 条不合并 */
    keepRecentCount?: number;
    /** 是否保留原始条目（禁用而非删除） */
    preserveOriginal?: boolean;
    /** 是否启用预览确认 */
    previewEnabled?: boolean;
}

export type EntityTriggerType = 'floor' | 'manual';

export interface EntityExtractConfig {
    /** 是否启用自动提取 */
    enabled: boolean;
    /** 触发器类型 */
    trigger: EntityTriggerType;
    /** 楼层间隔 (每 N 楼触发一次，默认 50) */
    floorInterval: number;
    /** 保留最近 N 条对话不处理 */
    keepRecentCount: number;
}

export interface GlobalRegexConfig {
    /** 是否启用酒馆原生 Regex (SillyTavern) */
    enableNativeRegex: boolean;
    /** 是否启用 Engram 内部 Regex */
    enableEngramRegex: boolean;
}

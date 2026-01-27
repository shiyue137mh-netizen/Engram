/**
 * Preprocessing Types - V0.8
 * 输入预处理系统类型定义
 */

import { PreprocessingConfig, DEFAULT_PREPROCESSING_CONFIG } from '@/config/types/data_processing';

// 重新导出以便模块内其他文件使用
export type { PreprocessingConfig };
export { DEFAULT_PREPROCESSING_CONFIG };

/** 预处理模式 */
type PreprocessingMode =
    | 'query_enhance'    // RAG Query 增强
    | 'plot_director'    // 剧情构思
    | 'description'      // 描写增强
    | 'custom';          // 自定义

/** 预处理结果 */
export interface PreprocessingResult {
    /** 是否成功 */
    success: boolean;
    /** <output> 标签内容 - 注入到用户消息 */
    output: string | null;
    /** <query> 标签内容 - RAG 检索关键词 (Query 增强模式) */
    query: string | null;
    /** 原始 LLM 输出 (已清理 <think>) */
    rawOutput: string;
    /** 召回的事件 ID (Query 增强模式) */
    recalledIds?: string[];
    /** 处理耗时 (ms) */
    processingTime: number;
    /** 错误信息 */
    error?: string;
}

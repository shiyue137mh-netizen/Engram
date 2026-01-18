/**
 * Summarizer 模块导出
 */

export { SummarizerService, summarizerService } from './Summarizer';
export { TrimmerService, trimmerService, DEFAULT_TRIMMER_CONFIG } from './Trimmer';
export type { TrimmerConfig, TrimRequest, TrimResult, TrimmerStatus } from './TrimmerService';

// Re-export 通用服务（保持向后兼容）
export { TextProcessor, textProcessor } from '@/modules/memory/extractors/TextProcessor';
export { LLMAdapter, llmAdapter, type LLMRequest, type LLMResponse } from '@/integrations/llm/Adapter';
export { RegexProcessor, regexProcessor, DEFAULT_REGEX_RULES, type RegexRule } from '@/modules/memory/extractors/RegexProcessor';

export type {
    SummarizerConfig,
    SummarizerStatus,
    SummaryResult,
    SummarizeRequest,
    TriggerMode,
    WorldbookBindMode,
} from './types';

export { DEFAULT_SUMMARIZER_CONFIG } from './types';

/**
 * Summarizer 模块导出
 */

export { SummarizerService, summarizerService } from './SummarizerService';
export { TrimmerService, trimmerService, DEFAULT_TRIMMER_CONFIG } from './TrimmerService';
export type { TrimmerConfig, TrimRequest, TrimResult, TrimmerStatus } from './TrimmerService';

export { TextProcessor, textProcessor } from './TextProcessor';
export { LLMAdapter, llmAdapter } from './LLMAdapter';
export { RegexProcessor, regexProcessor, DEFAULT_REGEX_RULES } from './RegexProcessor';
export type { RegexRule } from './RegexProcessor';

export type {
    SummarizerConfig,
    SummarizerStatus,
    SummaryResult,
    SummarizeRequest,
    LLMRequest,
    LLMResponse,
    TriggerMode,
    WorldbookBindMode,
} from './types';

export { DEFAULT_SUMMARIZER_CONFIG } from './types';

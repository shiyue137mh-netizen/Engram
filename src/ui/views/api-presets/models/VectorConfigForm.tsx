/**
 * 向量化配置表单
 */
import type { VectorConfig, VectorSource } from '@/config/types/rag';
import { ModelAPIType, ModelInfo, ModelService } from '@/integrations/llm/ModelDiscovery';
import { FormSection, SearchableSelectField, SelectField, TextField } from '@/ui/components/form/FormComponents';
import { Loader2, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';


interface VectorConfigFormProps {
    config: VectorConfig;
    onChange: (config: VectorConfig) => void;
}

// 向量源选项
const VECTOR_SOURCE_OPTIONS: { value: VectorSource; label: string }[] = [
    { value: 'custom', label: '自定义 (OpenAI 兼容)' },
    { value: 'transformers', label: 'Transformers (本地)' },
    { value: 'openai', label: 'OpenAI Embeddings' },
    { value: 'ollama', label: 'Ollama' },
    { value: 'vllm', label: 'vLLM' },
    { value: 'cohere', label: 'Cohere' },
    { value: 'jina', label: 'Jina AI' },
    { value: 'voyage', label: 'Voyage AI' },
];

// 各向量源的默认/推荐模型
const DEFAULT_MODELS: Record<VectorSource, string> = {
    custom: 'text-embedding-3-small',
    transformers: 'Xenova/all-MiniLM-L6-v2',
    openai: 'text-embedding-3-small',
    ollama: 'nomic-embed-text',
    vllm: 'BAAI/bge-m3',
    cohere: 'embed-multilingual-v3.0',
    jina: 'jina-embeddings-v3',
    voyage: 'voyage-large-2',
};

// 需要 API URL 的源
const NEEDS_API_URL: VectorSource[] = ['custom', 'ollama', 'vllm'];
// 需要 API Key 的源
const NEEDS_API_KEY: VectorSource[] = ['custom', 'openai', 'cohere', 'jina', 'voyage'];

export const VectorConfigForm: React.FC<VectorConfigFormProps> = ({
    config,
    onChange,
}) => {
    const updateConfig = (updates: Partial<VectorConfig>) => {
        onChange({ ...config, ...updates });
    };

    const handleSourceChange = (source: VectorSource) => {
        updateConfig({
            source,
            model: DEFAULT_MODELS[source],
            apiUrl: NEEDS_API_URL.includes(source) ? config.apiUrl : undefined,
            apiKey: NEEDS_API_KEY.includes(source) ? config.apiKey : undefined,
        });
    };

    const needsUrl = NEEDS_API_URL.includes(config.source);
    const needsKey = NEEDS_API_KEY.includes(config.source);

    // 模型列表状态
    const [modelList, setModelList] = useState<ModelInfo[]>([]);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [modelError, setModelError] = useState<string | null>(null);

    // 获取模型列表
    const fetchModelList = async () => {
        setIsLoadingModels(true);
        setModelError(null);

        try {
            let models: ModelInfo[] = [];
            const fetchConfig = { apiUrl: config.apiUrl || '', apiKey: config.apiKey };

            switch (config.source) {
                case 'custom':
                    // custom 使用 OpenAI 兼容 API
                    if (!config.apiUrl) {
                        setModelError('请先填写 API URL');
                        return;
                    }
                    models = await ModelService.fetchOpenAIModels(fetchConfig);
                    break;
                case 'ollama':
                    if (!config.apiUrl) {
                        setModelError('请先填写 API URL');
                        return;
                    }
                    models = await ModelService.fetchOllamaModels(fetchConfig);
                    break;
                case 'vllm':
                    if (!config.apiUrl) {
                        setModelError('请先填写 API URL');
                        return;
                    }
                    models = await ModelService.fetchVLLMModels(fetchConfig);
                    break;
                case 'openai':
                case 'cohere':
                case 'jina':
                case 'voyage':
                    // 这些使用预设列表
                    models = ModelService.getPresetModels(config.source as ModelAPIType);
                    break;
                default:
                    models = [];
            }

            setModelList(models);
            if (models.length === 0) {
                setModelError('未找到可用模型');
            }
        } catch (error: any) {
            setModelError(error.message || '获取模型列表失败');
            setModelList([]);
        } finally {
            setIsLoadingModels(false);
        }
    };

    return (
        <div className="">
            <FormSection title="向量化设置" description="配置文本向量化使用的模型和端点">
                <SelectField
                    label="向量源"
                    value={config.source}
                    onChange={(value) => handleSourceChange(value as VectorSource)}
                    options={VECTOR_SOURCE_OPTIONS}
                    description="选择向量化服务提供商"
                />

                {needsUrl && (
                    <div className="flex flex-col gap-1">
                        {/* URL 标签行：包含标签和自动后缀复选框 */}
                        <div className="flex items-center justify-between">
                            <label className="text-xs text-muted-foreground">
                                {config.source === 'ollama' ? 'API Endpoint' : 'API Base URL'}
                            </label>
                            {config.source !== 'ollama' && (
                                <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={config.autoSuffix !== false}
                                        onChange={(e) => updateConfig({ autoSuffix: e.target.checked })}
                                        className="w-3 h-3 rounded border-border accent-primary cursor-pointer"
                                    />
                                    自动后缀
                                </label>
                            )}
                        </div>
                        <input
                            type="url"
                            value={config.apiUrl || ''}
                            onChange={(e) => updateConfig({ apiUrl: e.target.value })}
                            placeholder={
                                config.source === 'ollama'
                                    ? 'http://localhost:11434'
                                    : 'http://localhost:8000'
                            }
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid var(--border)',
                                borderRadius: 0,
                                padding: '8px 0',
                                fontSize: '14px',
                                width: '100%',
                                color: 'var(--foreground)',
                                outline: 'none',
                            }}
                            className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                        />
                        <p className="text-[10px] text-muted-foreground/70 break-all">
                            {config.source === 'ollama'
                                ? '填写 base URL 即可，会自动拼接 /api/embeddings'
                                : (config.autoSuffix !== false && config.apiUrl)
                                    ? `完整 URL: ${config.apiUrl.replace(/\/+$/, '')}/embeddings`
                                    : '输入 base URL (如 http://xxx/v1)，将自动添加 /embeddings 后缀'
                            }
                        </p>
                    </div>
                )}

                {needsKey && (
                    <TextField
                        label="API Key"
                        type="password"
                        value={config.apiKey || ''}
                        onChange={(value) => updateConfig({ apiKey: value })}
                        placeholder="输入 API 密钥"
                    />
                )}

                {/* 模型选择: 下拉 + 手动输入 + 获取按钮 */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-end gap-2">
                        {modelList.length > 0 ? (
                            <div className="flex-1 relative">
                                <SearchableSelectField
                                    className="!mb-0"
                                    label="模型名称"
                                    value={config.model || ''}
                                    onChange={(value) => updateConfig({ model: value })}
                                    options={modelList.map(m => ({ value: m.id, label: m.name || m.id }))}
                                    placeholder="选择模型"
                                    emptyText="未找到可用模型"
                                />
                            </div>
                        ) : (
                            <TextField
                                className="flex-1 !mb-0"
                                label="模型名称"
                                value={config.model || ''}
                                onChange={(value) => updateConfig({ model: value })}
                                placeholder={DEFAULT_MODELS[config.source]}
                                description="使用的向量化模型"
                            />
                        )}
                        {(needsUrl || needsKey) && (
                            <button
                                type="button"
                                className="h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={fetchModelList}
                                disabled={isLoadingModels}
                                title="获取模型列表"
                            >
                                {isLoadingModels ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <RefreshCw size={16} />
                                )}
                            </button>
                        )}
                    </div>
                    {modelError && (
                        <p className="text-xs text-destructive">{modelError}</p>
                    )}
                    {modelList.length > 0 && (
                        <p className="text-xs text-muted-foreground">已加载 {modelList.length} 个模型</p>
                    )}
                </div>
            </FormSection>

            <FormSection title="高级选项" collapsible defaultCollapsed>
                <TextField
                    label="向量维度"
                    value={config.dimensions?.toString() || ''}
                    onChange={(value) => {
                        const num = parseInt(value, 10);
                        updateConfig({ dimensions: isNaN(num) ? undefined : num });
                    }}
                    placeholder="自动"
                    description="指定向量维度（留空则使用模型默认值）"
                />
            </FormSection>
        </div>
    );
};

/**
 * 向量化配置表单
 */
import React from 'react';
import { TextField, SelectField, FormSection } from './FormField';
import type { VectorConfig, VectorSource } from '../../../core/api/types';


interface VectorConfigFormProps {
    config: VectorConfig;
    onChange: (config: VectorConfig) => void;
}

// 向量源选项
const VECTOR_SOURCE_OPTIONS: { value: VectorSource; label: string }[] = [
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
    transformers: 'Xenova/all-MiniLM-L6-v2',
    openai: 'text-embedding-3-small',
    ollama: 'nomic-embed-text',
    vllm: 'BAAI/bge-m3',
    cohere: 'embed-multilingual-v3.0',
    jina: 'jina-embeddings-v3',
    voyage: 'voyage-large-2',
};

// 需要 API URL 的源
const NEEDS_API_URL: VectorSource[] = ['ollama', 'vllm'];
// 需要 API Key 的源
const NEEDS_API_KEY: VectorSource[] = ['openai', 'cohere', 'jina', 'voyage'];

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
                    <TextField
                        label="API URL"
                        type="url"
                        value={config.apiUrl || ''}
                        onChange={(value) => updateConfig({ apiUrl: value })}
                        placeholder={
                            config.source === 'ollama'
                                ? 'http://localhost:11434'
                                : 'http://localhost:8000'
                        }
                        description={`${config.source} 服务的 API 端点`}
                    />
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

                <TextField
                    label="模型名称"
                    value={config.model || ''}
                    onChange={(value) => updateConfig({ model: value })}
                    placeholder={DEFAULT_MODELS[config.source]}
                    description="使用的向量化模型"
                />
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

/**
 * 向量化配置表单
 */
import type { VectorConfig, VectorSource } from '@/config/types/rag';
import type { ModelAPIType, ModelInfo} from '@/integrations/llm/ModelDiscovery';
import { ModelService } from '@/integrations/llm/ModelDiscovery';
import { FormSection, SearchableSelectField, SelectField, TextField } from '@/ui/components/form/FormComponents';
import { AlertCircle, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';


/**
 * 部署诊断组件 (针对 Failed to fetch 常见错误进行实时提示)
 */
const DeploymentDiagnostics: React.FC<{ url: string }> = ({ url }) => {
    if (!url) {return null;}

    const isHttpsPage = window.location.protocol === 'https:';
    const isHttpUrl = url.startsWith('http:');
    const isLocalhostUrl = url.includes('127.0.0.1') || url.includes('localhost');
    const isLocalhostPage = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    const alerts = [];

    // 1. 混合内容拦截检测 (HTTPS -> HTTP)
    if (isHttpsPage && isHttpUrl) {
        alerts.push({
            content: '当前酒馆为 HTTPS 环境，无法直接请求 HTTP 接口。请配置 HTTPS 或使用 Nginx 同源代理。',
            icon: <AlertCircle size={14} className="text-destructive" />,
            title: '混合内容屏蔽 (Mixed Content)',
            type: 'error'
        });
    }

    // 2. 本地回路检测 (远程访问填了 127.0.0.1)
    if (isLocalhostUrl && !isLocalhostPage) {
        alerts.push({
            content: '127.0.0.1 指向的是你的电脑而非服务器。远程访问时请填写服务器的公网或局域网 IP。',
            icon: <AlertTriangle size={14} className="text-warning" />,
            title: '获取者身份冲突',
            type: 'warning'
        });
    }

    if (alerts.length === 0) {return null;}

    return (
        <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
            {alerts.map((alert, i) => (
                <div key={i} className={`p-2 rounded border text-[10px] flex gap-2 ${
                    alert.type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-warning/10 border-warning/20 text-warning'
                }`}>
                    <div className="mt-0.5 shrink-0">{alert.icon}</div>
                    <div className="flex-1">
                        <div className="font-bold underline mb-0.5">{alert.title}</div>
                        <div className="opacity-90 leading-tight">{alert.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};


interface VectorConfigFormProps {
    config: VectorConfig;
    onChange: (config: VectorConfig) => void;
}

// 向量源选项
const VECTOR_SOURCE_OPTIONS: { value: VectorSource; label: string }[] = [
    { label: '自定义 (OpenAI 兼容)', value: 'custom' },
    { label: 'Transformers (本地)', value: 'transformers' },
    { label: 'OpenAI Embeddings', value: 'openai' },
    { label: 'Ollama', value: 'ollama' },
    { label: 'vLLM', value: 'vllm' },
    { label: 'Cohere', value: 'cohere' },
    { label: 'Jina AI', value: 'jina' },
    { label: 'Voyage AI', value: 'voyage' },
];

// 各向量源的默认/推荐模型
const DEFAULT_MODELS: Record<VectorSource, string> = {
    cohere: 'embed-multilingual-v3.0',
    custom: 'text-embedding-3-small',
    jina: 'jina-embeddings-v3',
    ollama: 'nomic-embed-text',
    openai: 'text-embedding-3-small',
    transformers: 'Xenova/all-MiniLM-L6-v2',
    vllm: 'BAAI/bge-m3',
    voyage: 'voyage-large-2',
};

// 需要 API URL 的源
const NEEDS_API_URL = new Set<VectorSource>(['custom', 'ollama', 'vllm']);
// 需要 API Key 的源
const NEEDS_API_KEY = ['custom', 'openai', 'cohere', 'jina', 'voyage'] as VectorSource[];

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
            apiUrl: NEEDS_API_URL.has(source) ? config.apiUrl : undefined,
            apiKey: NEEDS_API_KEY.includes(source) ? config.apiKey : undefined,
        });
    };

    const needsUrl = NEEDS_API_URL.has(config.source);
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
            const fetchConfig = { apiKey: config.apiKey, apiUrl: config.apiUrl || '' };

            switch (config.source) {
                case 'custom': {
                    // custom 使用 OpenAI 兼容 API
                    if (!config.apiUrl) {
                        setModelError('请先填写 API URL');
                        return;
                    }
                    models = await ModelService.fetchOpenAIModels(fetchConfig);
                    break;
                }
                case 'ollama': {
                    if (!config.apiUrl) {
                        setModelError('请先填写 API URL');
                        return;
                    }
                    models = await ModelService.fetchOllamaModels(fetchConfig);
                    break;
                }
                case 'vllm': {
                    if (!config.apiUrl) {
                        setModelError('请先填写 API URL');
                        return;
                    }
                    models = await ModelService.fetchVLLMModels(fetchConfig);
                    break;
                }
                case 'openai':
                case 'cohere':
                case 'jina':
                case 'voyage': {
                    // 这些使用预设列表
                    models = ModelService.getPresetModels(config.source as ModelAPIType);
                    break;
                }
                default: {
                    models = [];
                }
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
                                color: 'var(--foreground)',
                                fontSize: '14px',
                                outline: 'none',
                                padding: '8px 0',
                                width: '100%',
                            }}
                            className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors"
                        />
                        <p className="text-[10px] text-muted-foreground/70 break-all">
                            {config.source === 'ollama'
                                ? '填写 base URL 即可，会自动拼接 /api/embeddings'
                                : ((config.autoSuffix !== false && config.apiUrl)
                                    ? `完整 URL: ${config.apiUrl.replace(/\/+$/, '')}/embeddings`
                                    : '输入 base URL (如 http://xxx/v1)，将自动添加 /embeddings 后缀')
                            }
                        </p>
                        {/* 部署诊断组件 (针对 Failed to fetch 错误) */}
                        <DeploymentDiagnostics url={config.apiUrl || ''} />
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
                                    className="mb-0!"
                                    label="模型名称"
                                    value={config.model || ''}
                                    onChange={(value) => updateConfig({ model: value })}
                                    options={modelList.map(m => ({ label: m.name || m.id, value: m.id }))}
                                    placeholder="选择模型"
                                    emptyText="未找到可用模型"
                                />
                            </div>
                        ) : (
                            <TextField
                                className="flex-1 mb-0!"
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
                                className="h-10.5 w-10.5 min-w-10.5 flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
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
                        const num = Number.parseInt(value, 10);
                        updateConfig({ dimensions: isNaN(num) ? undefined : num });
                    }}
                    placeholder="自动"
                    description="指定向量维度（留空则使用模型默认值）"
                />

                <TextField
                    label="最大尝试次数"
                    type="number"
                    value={config.retryConfig?.maxAttempts?.toString() ?? ''}
                    onChange={(value) => {
                        const num = Number.parseInt(value, 10);
                        updateConfig({ retryConfig: { ...config.retryConfig, maxAttempts: isNaN(num) ? 3 : num, retryDelay: config.retryConfig?.retryDelay ?? 2000 } });
                    }}
                    placeholder="3"
                    description="包含首次请求和后续重试的最大次数（1表示不重试）"
                />
                
                <TextField
                    label="重试初始延迟 (ms)"
                    type="number"
                    value={config.retryConfig?.retryDelay?.toString() ?? ''}
                    onChange={(value) => {
                        const num = Number.parseInt(value, 10);
                        updateConfig({ retryConfig: { ...config.retryConfig, maxAttempts: config.retryConfig?.maxAttempts ?? 3, retryDelay: isNaN(num) ? 2000 : num } });
                    }}
                    placeholder="2000"
                    description="首次重试的等待时间，后续重试将进行指数退避"
                />
            </FormSection>
        </div>
    );
};

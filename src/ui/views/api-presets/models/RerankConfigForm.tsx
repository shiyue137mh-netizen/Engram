import React, { useState } from 'react';
import { TextField, NumberField, SwitchField, FormSection, SelectField, SearchableSelectField } from '@/ui/components/form/FormComponents';
import type { RerankConfig } from '@/config/types/rag';
import { RefreshCw, Loader2 } from 'lucide-react';
import { ModelService, ModelInfo } from '@/integrations/llm/ModelDiscovery';

interface RerankConfigFormProps {
    config: RerankConfig;
    onChange: (config: RerankConfig) => void;
}

// 常用 Rerank 模型
const COMMON_MODELS = [
    'BAAI/bge-reranker-v2-m3',
    'BAAI/bge-reranker-base',
    'BAAI/bge-reranker-large',
    'cross-encoder/ms-marco-MiniLM-L-12-v2',
    'Xenova/ms-marco-MiniLM-L-6-v2',
];

export const RerankConfigForm: React.FC<RerankConfigFormProps> = ({
    config,
    onChange,
}) => {
    const updateConfig = (updates: Partial<RerankConfig>) => {
        onChange({ ...config, ...updates });
    };

    // 模型列表状态
    const [modelList, setModelList] = useState<ModelInfo[]>([]);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [modelError, setModelError] = useState<string | null>(null);

    // 获取模型列表
    const fetchModelList = async () => {
        if (!config.url) {
            setModelError('请先填写 API URL');
            return;
        }

        setIsLoadingModels(true);
        setModelError(null);

        try {
            // 尝试从 OpenAI 兼容 API 获取
            const models = await ModelService.fetchOpenAIModels({
                apiUrl: config.url,
                apiKey: config.apiKey
            });

            if (models.length > 0) {
                setModelList(models);
            } else {
                // 如果 API 不返回模型，使用常用预设
                setModelList(ModelService.getCommonRerankModels());
            }
        } catch (error: any) {
            // 失败时使用常用模型预设
            setModelList(ModelService.getCommonRerankModels());
        } finally {
            setIsLoadingModels(false);
        }
    };

    return (
        <div className="">
            <FormSection title="Rerank 设置" description="配置重排序模型以优化检索结果">
                <SwitchField
                    label="启用 Rerank"
                    checked={config.enabled}
                    onChange={(value) => updateConfig({ enabled: value })}
                    description="使用 Rerank 模型对检索结果进行重新排序"
                />
            </FormSection>

            {config.enabled && (
                <>
                    <FormSection title="API 配置">
                        <div className="flex flex-col gap-1">
                            {/* URL 标签行：包含标签和自动后缀复选框 */}
                            <div className="flex items-center justify-between">
                                <label className="text-xs text-muted-foreground">
                                    API Base URL
                                </label>
                                <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={config.autoSuffix !== false}
                                        onChange={(e) => updateConfig({ autoSuffix: e.target.checked })}
                                        className="w-3 h-3 rounded border-border accent-primary cursor-pointer"
                                    />
                                    自动后缀
                                </label>
                            </div>
                            <input
                                type="url"
                                value={config.url}
                                onChange={(e) => updateConfig({ url: e.target.value })}
                                placeholder="http://localhost:8000"
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
                                {(config.autoSuffix !== false && config.url)
                                    ? `完整 URL: ${config.url.replace(/\/+$/, '')}/rerank`
                                    : '输入基础 URL，将自动添加 /rerank 后缀'
                                }
                            </p>
                        </div>

                        <TextField
                            label="API Key"
                            type="password"
                            value={config.apiKey}
                            onChange={(value) => updateConfig({ apiKey: value })}
                            placeholder="输入 API 密钥（如需要）"
                        />

                        <div className="flex flex-col gap-2">
                            <div className="flex items-end gap-2">
                                {modelList.length > 0 ? (
                                    <div className="flex-1 relative">
                                        <SearchableSelectField
                                            className="!mb-0"
                                            label="模型名称"
                                            value={config.model}
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
                                        value={config.model}
                                        onChange={(value) => updateConfig({ model: value })}
                                        placeholder="BAAI/bge-reranker-v2-m3"
                                        description="使用的 Rerank 模型"
                                        required
                                    />
                                )}
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
                            </div>
                            {modelError && (
                                <p className="text-xs text-destructive">{modelError}</p>
                            )}
                            {modelList.length > 0 && (
                                <p className="text-xs text-muted-foreground">已加载 {modelList.length} 个模型</p>
                            )}
                        </div>
                    </FormSection>
                </>
            )}
        </div>
    );
};

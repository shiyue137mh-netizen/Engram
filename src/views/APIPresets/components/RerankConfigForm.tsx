import React, { useState } from 'react';
import { TextField, NumberField, SwitchField, FormSection, SelectField } from './FormField';
import type { RerankConfig } from '@/services/api/types';
import { RefreshCw, Loader2 } from 'lucide-react';
import { ModelService, ModelInfo } from '@/services/api/ModelDiscovery';

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
                        <TextField
                            label="API URL"
                            type="url"
                            value={config.url}
                            onChange={(value) => updateConfig({ url: value })}
                            placeholder="http://localhost:8000/rerank"
                            description="Rerank 服务的 API 端点"
                            required
                        />

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
                                    <SelectField
                                        className="flex-1 !mb-0"
                                        label="模型名称"
                                        value={config.model}
                                        onChange={(value) => updateConfig({ model: value })}
                                        options={modelList.map(m => ({ value: m.id, label: m.name || m.id }))}
                                        placeholder="选择模型"
                                    />
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

                    <FormSection title="参数设置">
                        <NumberField
                            label="Top-N"
                            value={config.topN}
                            onChange={(value) => updateConfig({ topN: value })}
                            min={1}
                            max={50}
                            step={1}
                            description="重排后返回的结果数量"
                        />

                        <NumberField
                            label="混合权重 (Hybrid Alpha)"
                            value={config.hybridAlpha}
                            onChange={(value) => updateConfig({ hybridAlpha: value })}
                            min={0}
                            max={1}
                            step={0.1}
                            description="0 = 纯向量检索评分，1 = 纯 Rerank 评分"
                        />
                    </FormSection>
                </>
            )}
        </div>
    );
};

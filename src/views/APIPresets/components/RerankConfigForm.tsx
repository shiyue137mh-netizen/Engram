import React from 'react';
import { TextField, NumberField, SwitchField, FormSection } from './FormField';
import type { RerankConfig } from '../../../core/api/types';

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
                            <TextField
                                label="模型名称"
                                value={config.model}
                                onChange={(value) => updateConfig({ model: value })}
                                placeholder="BAAI/bge-reranker-v2-m3"
                                description="使用的 Rerank 模型"
                                required
                            />

                            {/* 常用模型快速选择 */}
                            <div>
                                <span className="block text-[10px] text-muted-foreground mb-2">常用模型：</span>
                                <div className="flex flex-wrap gap-2">
                                    {COMMON_MODELS.map((model) => (
                                        <button
                                            key={model}
                                            type="button"
                                            className={`
                                                px-2.5 py-1 border rounded text-xs cursor-pointer transition-all 
                                                ${config.model === model
                                                    ? 'bg-accent border-input text-foreground'
                                                    : 'bg-transparent border-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
                                                }
                                            `}
                                            onClick={() => updateConfig({ model })}
                                        >
                                            {model.split('/').pop()}
                                        </button>
                                    ))}
                                </div>
                            </div>
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

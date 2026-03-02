/**
 * LLM 预设编辑表单
 */
import type { APISource, LLMPreset } from '@/config/types/llm';
import { ModelInfo, ModelService } from '@/integrations/llm/ModelDiscovery';
import { SliderField } from '@/ui/components/core/SliderField';
import { FormSection, SelectField, SwitchField, TextField } from '@/ui/components/form/FormComponents';
import { Loader2, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';


interface LLMPresetFormProps {
    preset: LLMPreset;
    onChange: (preset: LLMPreset) => void;
    isNew?: boolean;
}

// API 源选项
const API_SOURCE_OPTIONS: { value: APISource; label: string }[] = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'ollama', label: 'Ollama' },
    { value: 'vllm', label: 'vLLM' },
    { value: 'azure', label: 'Azure OpenAI' },
    { value: 'custom', label: '自定义' },
];

// 配置源选项
const SOURCE_OPTIONS = [
    { value: 'tavern', label: '使用酒馆当前配置' },
    { value: 'custom', label: '自定义 API 配置' },
];

export const LLMPresetForm: React.FC<LLMPresetFormProps> = ({
    preset,
    onChange,
    isNew = false,
}) => {
    // 模型列表状态 (自定义 API 用)
    const [modelList, setModelList] = useState<ModelInfo[]>([]);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [modelError, setModelError] = useState<string | null>(null);

    // 加载模型列表 (自定义 API)
    const fetchModelList = async () => {
        const { apiUrl, apiKey, apiSource } = preset.custom || {};
        if (!apiUrl) {
            setModelError('请先填写 API URL');
            return;
        }

        setIsLoadingModels(true);
        setModelError(null);

        try {
            // 根据 API 类型选择获取方式
            let models: ModelInfo[] = [];
            if (apiSource === 'ollama') {
                models = await ModelService.fetchOllamaModels({ apiUrl });
            } else {
                // OpenAI 兼容 API (openai, vllm, azure, custom)
                models = await ModelService.fetchOpenAIModels({ apiUrl, apiKey });
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



    // 更新预设字段
    const updatePreset = (updates: Partial<LLMPreset>) => {
        onChange({ ...preset, ...updates, updatedAt: Date.now() });
    };

    // 更新采样参数
    const updateParameters = (key: keyof typeof preset.parameters, value: number) => {
        updatePreset({
            parameters: { ...preset.parameters, [key]: value },
        });
    };

    // 更新上下文设置
    const updateContext = (key: keyof typeof preset.context, value: any) => {
        updatePreset({
            context: { ...preset.context, [key]: value },
        });
    };

    // 更新自定义配置
    const updateCustom = (key: string, value: any) => {
        updatePreset({
            custom: {
                apiUrl: preset.custom?.apiUrl || '',
                apiKey: preset.custom?.apiKey || '',
                model: preset.custom?.model || '',
                apiSource: preset.custom?.apiSource || 'openai',
                [key]: value,
            },
        });
    };

    // 处理配置源变更
    const handleSourceChange = (value: string) => {
        const source = value as 'tavern' | 'custom';
        updatePreset({ source });
    };

    return (
        <div className="">
            {/* 基本信息 */}
            <FormSection title="基本信息">
                <TextField
                    label="预设名称"
                    value={preset.name}
                    onChange={(value) => updatePreset({ name: value })}
                    placeholder="输入预设名称"
                    required
                />

                <SelectField
                    label="配置源"
                    value={preset.source}
                    onChange={handleSourceChange}
                    options={SOURCE_OPTIONS}
                    description="选择 API 配置的来源"
                />

                <SwitchField
                    label="流式传输 (Streaming)"
                    checked={preset.stream || false}
                    onChange={(checked) => updatePreset({ stream: checked })}
                    description="针对特定后端的兼容性开关。开启后对强制校验 stream 的 Custom API 生效，同时解放酒馆原生 generateRaw 获取流式分块（后台自动拼合，不影响前台展现）。遇报错时可尝试拨动。"
                />
            </FormSection>



            {/* 自定义 API 配置 */}
            {preset.source === 'custom' && (
                <FormSection title="API 配置" description="自定义 API 端点和密钥">
                    <SelectField
                        label="API 类型"
                        value={preset.custom?.apiSource || 'openai'}
                        onChange={(value) => updateCustom('apiSource', value)}
                        options={API_SOURCE_OPTIONS}
                    />

                    <TextField
                        label="API URL"
                        type="url"
                        value={preset.custom?.apiUrl || ''}
                        onChange={(value) => updateCustom('apiUrl', value)}
                        placeholder="https://api.openai.com/v1"
                        required
                    />

                    <TextField
                        label="API Key"
                        type="password"
                        value={preset.custom?.apiKey || ''}
                        onChange={(value) => updateCustom('apiKey', value)}
                        placeholder="sk-..."
                    />

                    {/* 模型选择: 下拉 + 手动输入 + 获取按钮 */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-end gap-2">
                            {modelList.length > 0 ? (
                                <SelectField
                                    className="flex-1 !mb-0"
                                    label="模型名称"
                                    value={preset.custom?.model || ''}
                                    onChange={(value) => updateCustom('model', value)}
                                    options={modelList.map(m => ({ value: m.id, label: m.name || m.id }))}
                                    placeholder="选择模型"
                                />
                            ) : (
                                <TextField
                                    className="flex-1 !mb-0"
                                    label="模型名称"
                                    value={preset.custom?.model || ''}
                                    onChange={(value) => updateCustom('model', value)}
                                    placeholder="gpt-4o-mini"
                                    required
                                />
                            )}
                            <button
                                type="button"
                                className="h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={fetchModelList}
                                disabled={isLoadingModels || !preset.custom?.apiUrl}
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
            )}

            {/* 采样参数 */}
            <FormSection title="采样参数" description="控制模型输出的随机性和多样性">
                <div className="space-y-8">
                    {/* Temperature */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground flex items-center">
                            模型的温度为
                            <input
                                type="number" min={0} max={2} step={0.1}
                                value={preset.parameters.temperature}
                                onChange={(e) => updateParameters('temperature', Number(e.target.value))}
                                className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-base font-medium text-foreground mx-1 text-center w-12 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                            />
                        </div>
                        <SliderField min={0} max={2} step={0.1} value={preset.parameters.temperature} onChange={(val) => updateParameters('temperature', val)} />
                        <div className="text-xs text-muted-foreground/70">较高的值使输出更随机，较低的值使输出更确定。</div>
                    </div>

                    {/* Top-P */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground flex items-center">
                            核采样阈值 (Top-P) 为
                            <input
                                type="number" min={0} max={1} step={0.05}
                                value={preset.parameters.topP}
                                onChange={(e) => updateParameters('topP', Number(e.target.value))}
                                className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-base font-medium text-foreground mx-1 text-center w-12 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                            />
                        </div>
                        <SliderField min={0} max={1} step={0.05} value={preset.parameters.topP} onChange={(val) => updateParameters('topP', val)} />
                        <div className="text-xs text-muted-foreground/70">控制候选 token 的累积概率截断。</div>
                    </div>

                    {/* Top-K */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground flex items-center">
                            候选词采样截断 (Top-K) 为
                            <input
                                type="number" min={0} max={200} step={1}
                                value={preset.parameters.topK ?? 60}
                                onChange={(e) => updateParameters('topK', Number(e.target.value))}
                                className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-base font-medium text-foreground mx-1 text-center w-12 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                            />
                        </div>
                        <SliderField min={0} max={200} step={1} value={preset.parameters.topK ?? 60} onChange={(val) => updateParameters('topK', val)} />
                        <div className="text-xs text-muted-foreground/70">只从前 K 个最可能的结果中进行概率抽取（建议保留 0 为关闭或 60 默认）。</div>
                    </div>

                    {/* Max Tokens */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground flex items-center">
                            最大输出 Token 为
                            <input
                                type="number" min={64} max={16384} step={64}
                                value={preset.parameters.maxTokens}
                                onChange={(e) => updateParameters('maxTokens', Number(e.target.value))}
                                className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-base font-medium text-foreground mx-1 text-center w-16 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                            />
                        </div>
                        <SliderField min={64} max={16384} step={64} value={preset.parameters.maxTokens} onChange={(val) => updateParameters('maxTokens', val)} />
                    </div>

                    {/* Max Context */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground flex items-center">
                            上下文 Token 上限为
                            <input
                                type="number" min={0} max={2000000} step={1000}
                                value={preset.parameters.maxContext ?? 150000}
                                onChange={(e) => updateParameters('maxContext', Number(e.target.value))}
                                className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-base font-medium text-foreground mx-1 text-center w-20 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                            />
                        </div>
                        <SliderField min={0} max={2000000} step={1000} value={preset.parameters.maxContext ?? 150000} onChange={(val) => updateParameters('maxContext', val)} />
                        <div className="text-xs text-muted-foreground/70">建议值: 150000。限制传给大模型的最大上下文 Token 长度。</div>
                    </div>

                    {/* Frequency Penalty */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground flex items-center">
                            频率惩罚为
                            <input
                                type="number" min={-2} max={2} step={0.1}
                                value={preset.parameters.frequencyPenalty}
                                onChange={(e) => updateParameters('frequencyPenalty', Number(e.target.value))}
                                className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-base font-medium text-foreground mx-1 text-center w-12 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                            />
                        </div>
                        <SliderField min={-2} max={2} step={0.1} value={preset.parameters.frequencyPenalty} onChange={(val) => updateParameters('frequencyPenalty', val)} />
                        <div className="text-xs text-muted-foreground/70">降低重复 token 的概率。</div>
                    </div>

                    {/* Presence Penalty */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground flex items-center">
                            存在惩罚为
                            <input
                                type="number" min={-2} max={2} step={0.1}
                                value={preset.parameters.presencePenalty}
                                onChange={(e) => updateParameters('presencePenalty', Number(e.target.value))}
                                className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-base font-medium text-foreground mx-1 text-center w-12 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                            />
                        </div>
                        <SliderField min={-2} max={2} step={0.1} value={preset.parameters.presencePenalty} onChange={(val) => updateParameters('presencePenalty', val)} />
                        <div className="text-xs text-muted-foreground/70">鼓励模型讨论新主题。</div>
                    </div>
                </div>
            </FormSection>
        </div>
    );
};

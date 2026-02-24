/**
 * LLM 预设编辑表单
 */
import type { APISource, LLMPreset } from '@/config/types/llm';
import { ModelInfo, ModelService } from '@/integrations/llm/ModelDiscovery';
import { FormSection, NumberField, SelectField, SwitchField, TextField } from '@/ui/components/form/FormComponents';
import { Loader2, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';


interface LLMPresetFormProps {
    preset: LLMPreset;
    onChange: (preset: LLMPreset) => void;
    isNew?: boolean;
}

// 酒馆 connection_profile 类型
interface TavernProfile {
    id: string;
    name: string;
    mode: 'cc' | 'tc';
    api?: string;
    model?: string;
    preset?: string;
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
    { value: 'tavern_profile', label: '使用酒馆配置文件' },
    { value: 'custom', label: '自定义 API 配置' },
];

// 从酒馆获取 connection_profiles
function getTavernProfiles(): TavernProfile[] {
    try {
        // @ts-ignore - 访问酒馆的 extension_settings
        const extensionSettings = window.SillyTavern?.getContext?.()?.extensionSettings;
        const profiles = extensionSettings?.connectionManager?.profiles || [];
        return profiles;
    } catch (e) {
        console.warn('[Engram] 无法获取酒馆 connection_profiles:', e);
        return [];
    }
}

export const LLMPresetForm: React.FC<LLMPresetFormProps> = ({
    preset,
    onChange,
    isNew = false,
}) => {
    // 酒馆配置文件列表
    const [tavernProfiles, setTavernProfiles] = useState<TavernProfile[]>([]);
    const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

    // 模型列表状态 (自定义 API 用)
    const [modelList, setModelList] = useState<ModelInfo[]>([]);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [modelError, setModelError] = useState<string | null>(null);

    // 加载酒馆配置文件
    const loadTavernProfiles = () => {
        setIsLoadingProfiles(true);
        try {
            const profiles = getTavernProfiles();
            setTavernProfiles(profiles);
        } finally {
            setIsLoadingProfiles(false);
        }
    };

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

    // 组件挂载时加载
    useEffect(() => {
        loadTavernProfiles();
    }, []);

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
        const source = value as 'tavern' | 'tavern_profile' | 'custom';
        updatePreset({
            source,
            tavernProfileId: source === 'tavern_profile' ? preset.tavernProfileId : undefined,
        });

        if (source === 'tavern_profile') {
            loadTavernProfiles();
        }
    };

    // 构建配置文件选项
    const profileOptions = tavernProfiles.map(p => ({
        value: p.id,
        label: `${p.name} (${p.api || 'Unknown'} - ${p.model || 'Unknown'})`,
    }));

    // 获取选中的配置文件信息
    const selectedProfile = tavernProfiles.find(p => p.id === preset.tavernProfileId);

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

            {/* 酒馆配置文件选择 */}
            {preset.source === 'tavern_profile' && (
                <FormSection title="酒馆配置文件" description="选择一个已保存的酒馆连接配置">
                    <div className="flex items-end gap-2">
                        <SelectField
                            className="flex-1 !mb-0"
                            label="选择配置文件"
                            value={preset.tavernProfileId || ''}
                            onChange={(value) => updatePreset({ tavernProfileId: value })}
                            options={profileOptions}
                            placeholder={isLoadingProfiles ? '加载中...' : '请选择配置文件'}
                            disabled={isLoadingProfiles || profileOptions.length === 0}
                        />
                        <button
                            type="button"
                            className="h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground"
                            onClick={loadTavernProfiles}
                            disabled={isLoadingProfiles}
                            title="刷新配置列表"
                        >
                            <RefreshCw size={16} className={isLoadingProfiles ? "animate-spin" : ''} />
                        </button>
                    </div>

                    {profileOptions.length === 0 && !isLoadingProfiles && (
                        <div className="p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3">
                            未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。
                        </div>
                    )}

                    {selectedProfile && (
                        <div className="mt-4 p-3 bg-card rounded-lg border border-border">
                            <div className="flex items-center gap-2 py-1 text-sm border-b border-border last:border-0">
                                <span className="text-muted-foreground min-w-[60px]">API:</span>
                                <span className="text-foreground font-mono">{selectedProfile.api || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2 py-1 text-sm border-b border-border last:border-0">
                                <span className="text-muted-foreground min-w-[60px]">模型:</span>
                                <span className="text-foreground font-mono">{selectedProfile.model || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2 py-1 text-sm border-b border-border last:border-0">
                                <span className="text-muted-foreground min-w-[60px]">预设:</span>
                                <span className="text-foreground font-mono">{selectedProfile.preset || '-'}</span>
                            </div>
                        </div>
                    )}
                </FormSection>
            )}

            {/* 酒馆原生配置覆盖 */}
            {preset.source === 'tavern' && (
                <FormSection title="酒馆预设覆盖" description="在使用酒馆当前连接配置时，可临时覆盖部分配置">
                    <TextField
                        label="模型名称覆盖 (可选)"
                        value={preset.modelOverride || ''}
                        onChange={(value) => updatePreset({ modelOverride: value })}
                        placeholder="例如 gpt-4o-mini，留空则使用酒馆默认模型"
                        description="将会以 custom_api 对象包装后传给酒馆生成宏，并非所有后端支持"
                    />
                </FormSection>
            )}

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
                <NumberField
                    label="温度 (Temperature)"
                    value={preset.parameters.temperature}
                    onChange={(value) => updateParameters('temperature', value)}
                    min={0}
                    max={2}
                    step={0.1}
                    description="较高的值使输出更随机，较低的值使输出更确定"
                />

                <NumberField
                    label="Top-P"
                    value={preset.parameters.topP}
                    onChange={(value) => updateParameters('topP', value)}
                    min={0}
                    max={1}
                    step={0.05}
                    description="核采样阈值，控制候选 token 的累积概率"
                />

                <NumberField
                    label="最大输出 Tokens"
                    value={preset.parameters.maxTokens}
                    onChange={(value) => updateParameters('maxTokens', value)}
                    min={64}
                    max={16384}
                    step={64}
                    showSlider={false}
                />

                <NumberField
                    label="上下文 Token 上限 (Max Context)"
                    value={preset.parameters.maxContext ?? 150000}
                    onChange={(value) => updateParameters('maxContext', value)}
                    min={0}
                    max={2000000}
                    step={1000}
                    showSlider={false}
                    description="建议值: 150000。限制传给大模型的最大上下文 Token 长度。"
                />

                <NumberField
                    label="频率惩罚"
                    value={preset.parameters.frequencyPenalty}
                    onChange={(value) => updateParameters('frequencyPenalty', value)}
                    min={-2}
                    max={2}
                    step={0.1}
                    description="降低重复 token 的概率"
                />

                <NumberField
                    label="存在惩罚"
                    value={preset.parameters.presencePenalty}
                    onChange={(value) => updateParameters('presencePenalty', value)}
                    min={-2}
                    max={2}
                    step={0.1}
                    description="鼓励模型讨论新主题"
                />
            </FormSection>
        </div>
    );
};

/**
 * LLM 预设编辑表单
 */
import React, { useState, useEffect } from 'react';
import { TextField, NumberField, SelectField, SwitchField, FormSection } from './FormField';
import type { LLMPreset, APISource } from '../../../core/api/types';
import { RefreshCw } from 'lucide-react';


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

                    <TextField
                        label="模型名称"
                        value={preset.custom?.model || ''}
                        onChange={(value) => updateCustom('model', value)}
                        placeholder="gpt-4o-mini"
                        required
                    />
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

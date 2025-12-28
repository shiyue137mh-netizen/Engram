/**
 * 精简配置表单组件
 * 用于配置二层总结（精简）的触发条件
 */
import React from 'react';
import { Scissors, Hash, Layers, Calculator } from 'lucide-react';
import type { TrimConfig, TrimTriggerType } from '../../core/api/types';
import { FormSection, SwitchField, NumberField } from '../APIPresets/components/FormField';

interface TrimConfigFormProps {
    config: TrimConfig;
    onChange: (config: TrimConfig) => void;
}

const TRIGGER_OPTIONS: { id: TrimTriggerType; label: string; description: string; icon: React.ElementType }[] = [
    { id: 'token', label: 'Token 数', description: '总结内容达到 Token 上限时触发', icon: Calculator },
    { id: 'floor', label: '楼层数', description: '总结覆盖的楼层达到上限时触发', icon: Layers },
    { id: 'count', label: '总结次数', description: '执行总结的次数达到上限时触发', icon: Hash },
];

export const TrimConfigForm: React.FC<TrimConfigFormProps> = ({
    config,
    onChange,
}) => {
    const handleToggle = (checked: boolean) => {
        onChange({ ...config, enabled: checked });
    };

    const handleTriggerChange = (trigger: TrimTriggerType) => {
        onChange({ ...config, trigger });
    };

    const handleLimitChange = (key: 'tokenLimit' | 'floorLimit' | 'countLimit', value: number) => {
        onChange({ ...config, [key]: value });
    };

    return (
        <div className="space-y-6">
            <FormSection
                title="精简配置"
                description="将多次总结压缩为更简洁的摘要"
                className="!mb-4"
            >
                <SwitchField
                    label="启用精简"
                    checked={config.enabled}
                    onChange={handleToggle}
                />
            </FormSection>

            <div className={`space-y-6 transition-opacity ${config.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                {/* 触发器选择 */}
                <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">触发条件</label>
                    <div className="grid grid-cols-3 gap-3">
                        {TRIGGER_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleTriggerChange(opt.id)}
                                className={`
                                    flex flex-col items-center gap-2 p-3 rounded-lg border transition-all text-sm
                                    ${config.trigger === opt.id
                                        ? 'border-primary bg-primary/10 text-primary font-medium shadow-sm'
                                        : 'border-border bg-card text-muted-foreground hover:bg-muted hover:border-primary/50'
                                    }
                                `}
                            >
                                {React.createElement(opt.icon, { className: 'w-4 h-4' })}
                                <span>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 阈值设置 */}
                <div className="space-y-4">
                    {config.trigger === 'token' && (
                        <NumberField
                            label="Token 上限"
                            description="当总结内容 Token 超过此值时触发精简"
                            value={config.tokenLimit}
                            onChange={(v) => handleLimitChange('tokenLimit', v)}
                            min={1024}
                            max={16384}
                            step={512}
                        />
                    )}

                    {config.trigger === 'floor' && (
                        <NumberField
                            label="楼层上限"
                            description="当总结覆盖楼层数超过此值时触发精简"
                            value={config.floorLimit}
                            onChange={(v) => handleLimitChange('floorLimit', v)}
                            min={10}
                            max={200}
                            step={10}
                        />
                    )}

                    {config.trigger === 'count' && (
                        <NumberField
                            label="总结次数上限"
                            description="当执行总结次数超过此值时触发精简"
                            value={config.countLimit}
                            onChange={(v) => handleLimitChange('countLimit', v)}
                            min={2}
                            max={20}
                            step={1}
                        />
                    )}
                </div>

                {/* 手动触发按钮 */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                        bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-sm"
                    onClick={() => {
                        console.log('手动触发精简...');
                        // TODO: 实现精简逻辑
                    }}
                >
                    <Scissors className="w-4 h-4" />
                    手动执行精简
                </button>

                {/* 说明 */}
                <div className="p-3 rounded-lg bg-accent/50 border border-accent text-xs text-accent-foreground">
                    <strong>说明：</strong>精简会将多次总结内容使用 <code>trim</code> 类型的提示词模板压缩为更简洁的摘要，减少 Token 消耗。
                </div>
            </div>
        </div>
    );
};

export default TrimConfigForm;


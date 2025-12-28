import React from 'react';
import { SwitchField, FormSection } from './FormField';
import type { WorldbookConfig } from '../../../core/api/types';

interface WorldbookConfigFormProps {
    config: WorldbookConfig;
    onChange: (config: WorldbookConfig) => void;
}

export const WorldbookConfigForm: React.FC<WorldbookConfigFormProps> = ({
    config,
    onChange,
}) => {
    const handleToggle = (key: keyof WorldbookConfig) => {
        onChange({
            ...config,
            [key]: !config[key],
        });
    };

    return (
        <div className="">
            <FormSection title="世界书配置" description="总结时会自动获取所有始终激活（constant=true）的世界书条目作为背景设定注入到提示词中。">
                <SwitchField
                    label="启用世界书"
                    description="总结时注入始终激活（蓝灯）的世界书条目"
                    checked={config.enabled}
                    onChange={() => handleToggle('enabled')}
                />

                <SwitchField
                    label="包含全局世界书"
                    description="关闭后只读取角色世界书和聊天世界书"
                    checked={config.includeGlobal}
                    onChange={() => handleToggle('includeGlobal')}
                    disabled={!config.enabled}
                />
            </FormSection>
        </div>
    );
};

export default WorldbookConfigForm;

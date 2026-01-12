import React, { useState, useEffect } from 'react';
import { SettingsManager } from '@/services/settings/Persistence';
import { RecallConfigForm } from '@/views/APIPresets/components/RecallConfigForm';
import type { RecallConfig } from '@/services/api/types';
import { DEFAULT_RECALL_CONFIG } from '@/services/api/types';
import { Logger } from '@/lib/logger';

export const RecallPanel: React.FC = () => {
    const [config, setConfig] = useState<RecallConfig>(DEFAULT_RECALL_CONFIG);

    // 加载配置
    useEffect(() => {
        const apiSettings = SettingsManager.get('apiSettings');
        if (apiSettings?.recallConfig) {
            setConfig(apiSettings.recallConfig);
        }
    }, []);

    // 保存配置
    const handleConfigChange = (newConfig: RecallConfig) => {
        setConfig(newConfig);

        const apiSettings = SettingsManager.get('apiSettings');
        if (apiSettings) {
            SettingsManager.set('apiSettings', {
                ...apiSettings,
                recallConfig: newConfig,
            });
            Logger.debug('RecallPanel', '召回配置已保存', newConfig);
        }
    };

    return (
        <div className="p-1">
            <RecallConfigForm config={config} onChange={handleConfigChange} />
        </div>
    );
};

export default RecallPanel;

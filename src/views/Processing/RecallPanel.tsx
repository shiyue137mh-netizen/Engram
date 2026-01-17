import React, { useState, useEffect } from 'react';
import { SettingsManager } from '@/services/settings/Persistence';
import { RecallConfigForm } from '@/views/APIPresets/components/RecallConfigForm';
import type { RecallConfig, RerankConfig } from '@/services/api/types';
import { DEFAULT_RECALL_CONFIG, DEFAULT_RERANK_CONFIG } from '@/services/api/types';
import { Logger } from '@/lib/logger';

export const RecallPanel: React.FC = () => {
    const [config, setConfig] = useState<RecallConfig>(DEFAULT_RECALL_CONFIG);
    const [rerankConfig, setRerankConfig] = useState<RerankConfig>(DEFAULT_RERANK_CONFIG);

    // 加载配置
    useEffect(() => {
        const apiSettings = SettingsManager.get('apiSettings');
        if (apiSettings?.recallConfig) {
            setConfig(apiSettings.recallConfig);
        }
        if (apiSettings?.rerankConfig) {
            setRerankConfig(apiSettings.rerankConfig);
        }
    }, []);

    // 保存 RecallConfig
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

    // 保存 RerankConfig 业务参数
    const handleRerankChange = (newConfig: RerankConfig) => {
        setRerankConfig(newConfig);

        const apiSettings = SettingsManager.get('apiSettings');
        if (apiSettings) {
            SettingsManager.set('apiSettings', {
                ...apiSettings,
                rerankConfig: newConfig,
            });
            Logger.debug('RecallPanel', 'Rerank 配置已保存', newConfig);
        }
    };

    return (
        <div className="p-1">
            <RecallConfigForm
                config={config}
                onChange={handleConfigChange}
                rerankConfig={rerankConfig}
                onRerankChange={handleRerankChange}
            />
        </div>
    );
};

export default RecallPanel;


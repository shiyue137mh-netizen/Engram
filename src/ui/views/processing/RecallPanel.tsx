import React from 'react';
import { RecallConfigForm } from '@/ui/views/api-presets/components/RecallConfigForm';
import type { RecallConfig, RerankConfig } from '@/config/types/defaults';

interface RecallPanelProps {
    recallConfig: RecallConfig;
    rerankConfig: RerankConfig;
    onRecallConfigChange: (config: RecallConfig) => void;
    onRerankConfigChange: (config: RerankConfig) => void;
}

export const RecallPanel: React.FC<RecallPanelProps> = ({
    recallConfig,
    rerankConfig,
    onRecallConfigChange,
    onRerankConfigChange
}) => {
    return (
        <div className="p-1 space-y-4">
            <RecallConfigForm
                config={recallConfig}
                onChange={onRecallConfigChange}
                rerankConfig={rerankConfig}
                onRerankChange={onRerankConfigChange}
            />
        </div>
    );
};

export default RecallPanel;


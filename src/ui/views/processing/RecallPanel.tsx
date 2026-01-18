import React from 'react';
import { RecallConfigForm } from '@/ui/views/api-presets/components/RecallConfigForm';
import { useConfig } from '@/ui/hooks/useConfig';
import { Save } from 'lucide-react';

export const RecallPanel: React.FC = () => {
    const {
        recallConfig,
        rerankConfig,
        updateRecallConfig,
        updateRerankConfig,
        saveConfig,
        hasChanges
    } = useConfig();

    return (
        <div className="p-1 space-y-4">
            <RecallConfigForm
                config={recallConfig}
                onChange={updateRecallConfig}
                rerankConfig={rerankConfig}
                onRerankChange={updateRerankConfig}
            />

            {hasChanges && (
                <div className="flex justify-end pt-2">
                    <button
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors"
                        onClick={saveConfig}
                    >
                        <Save size={12} />
                        保存配置
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecallPanel;


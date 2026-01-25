import React from 'react';
import { RecallConfigForm } from './components/RecallConfigForm';
import type { RecallConfig, RerankConfig } from '@/config/types/defaults';

interface RecallPanelProps {
    recallConfig: RecallConfig;
    rerankConfig: RerankConfig;
    onRecallConfigChange: (config: RecallConfig) => void;
    onRerankConfigChange: (config: RerankConfig) => void;
}

// 导入图标
import { Play, Loader2 } from 'lucide-react';
import { retriever } from '@/modules/rag/retrieval/Retriever';

export const RecallPanel: React.FC<RecallPanelProps> = ({
    recallConfig,
    rerankConfig,
    onRecallConfigChange,
    onRerankConfigChange
}) => {
    // 测试状态
    const [testQuery, setTestQuery] = React.useState('');
    const [isTesting, setIsTesting] = React.useState(false);

    // 处理测试
    const handleTest = async () => {
        if (!testQuery.trim() || isTesting) return;

        setIsTesting(true);
        try {
            await retriever.search(testQuery);
            // 成功后提醒查看日志 (这里简单用 console，或者依靠 Log 面板自动刷新)
            console.log('Test completed, check recall logs');
        } catch (error) {
            console.error('Test failed', error);
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <div className="p-1 space-y-4">
            <RecallConfigForm
                config={recallConfig}
                onChange={onRecallConfigChange}
                rerankConfig={rerankConfig}
                onRerankChange={onRerankConfigChange}
            />

            {/* 快速测试区 */}
            <div className="pt-6 border-t border-border mt-6">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Play size={16} className="text-primary" />
                    快速测试 (Quick Test)
                </h3>

                <div className="flex gap-2">
                    <textarea
                        value={testQuery}
                        onChange={(e) => setTestQuery(e.target.value)}
                        placeholder="输入测试文本，模拟 User Input 触发召回..."
                        className="flex-1 min-h-[80px] p-3 rounded-md bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-y"
                    />
                    <button
                        onClick={handleTest}
                        disabled={!testQuery.trim() || isTesting}
                        className={`
                            px-4 rounded-md font-medium text-sm transition-all flex flex-col items-center justify-center gap-1 min-w-[80px]
                            ${!testQuery.trim() || isTesting
                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'}
                        `}
                    >
                        {isTesting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span className="text-xs">运行中</span>
                            </>
                        ) : (
                            <>
                                <Play size={18} fill="currentColor" />
                                <span className="text-xs">测试</span>
                            </>
                        )}
                    </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 pl-1">
                    * 测试结果将显示在 <span className="text-foreground font-medium">Dev Log</span> 面板中
                </p>
            </div>
        </div>
    );
};



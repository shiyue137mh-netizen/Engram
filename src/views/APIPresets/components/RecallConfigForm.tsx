
import React from 'react';
import { RecallConfig } from '@/services/api/types';
import { NumberField, SwitchField } from './FormField';
import { Switch } from '@/components/ui/Switch';
import { Network, Database, BrainCircuit, Zap, AlertTriangle, Layers } from 'lucide-react';

interface RecallConfigFormProps {
    config: RecallConfig;
    onChange: (config: RecallConfig) => void;
}

export const RecallConfigForm: React.FC<RecallConfigFormProps> = ({ config, onChange }) => {

    // 更新配置的辅助函数
    const updateConfig = (updates: Partial<RecallConfig>) => {
        const newConfig = { ...config, ...updates };
        onChange(newConfig);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* 总开关 */}
            <div className="bg-secondary/20 p-4 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${config.enabled ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            <Network size={20} />
                        </div>
                        <div>
                            <div className="font-medium">启用 RAG 召回系统</div>
                            <div className="text-xs text-muted-foreground">即使未启用，配置也会被保存</div>
                        </div>
                    </div>
                    <Switch
                        checked={config.enabled}
                        onChange={(val) => updateConfig({ enabled: val })}
                    />
                </div>
            </div>

            {/* 核心策略 */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
                    召回策略配置
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 暴力召回 */}
                    <div className={`p-4 rounded-lg border transition-all ${config.useBruteForce ? 'bg-primary/5 border-primary/30' : 'bg-card border-border/50 hover:border-border'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Zap size={16} className={config.useBruteForce ? 'text-primary' : 'text-muted-foreground'} />
                                暴力召回 (Brute Force)
                            </div>
                            <Switch
                                checked={config.useBruteForce}
                                onChange={(val) => updateConfig({ useBruteForce: val })}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            不使用向量检索，直接基于滚动窗口读取最近的事件。可作为兜底策略。
                        </p>
                    </div>

                    {/* 向量检索 */}
                    <div className={`p-4 rounded-lg border transition-all ${config.useEmbedding ? 'bg-primary/5 border-primary/30' : 'bg-card border-border/50 hover:border-border'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Database size={16} className={config.useEmbedding ? 'text-primary' : 'text-muted-foreground'} />
                                向量检索 (Embedding)
                            </div>
                            <Switch
                                checked={config.useEmbedding}
                                onChange={(val) => updateConfig({ useEmbedding: val })}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            使用语义向量匹配历史事件，RAG 的核心能力。需要配置向量模型。
                        </p>
                    </div>

                    {/* 预处理增强 */}
                    <div className={`p-4 rounded-lg border transition-all ${config.usePreprocessing ? 'bg-primary/5 border-primary/30' : 'bg-card border-border/50 hover:border-border'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <BrainCircuit size={16} className={config.usePreprocessing ? 'text-primary' : 'text-muted-foreground'} />
                                LLM 预处理增强
                            </div>
                            <Switch
                                checked={config.usePreprocessing}
                                onChange={(val) => updateConfig({ usePreprocessing: val })}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            使用 LLM 优化用户输入，生成更好的检索查询词。
                        </p>
                    </div>

                    {/* Rerank 重排序 */}
                    <div className={`p-4 rounded-lg border transition-all ${config.useRerank ? 'bg-primary/5 border-primary/30' : 'bg-card border-border/50 hover:border-border'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Layers size={16} className={config.useRerank ? 'text-primary' : 'text-muted-foreground'} />
                                Rerank 重排序
                            </div>
                            <Switch
                                checked={config.useRerank}
                                disabled={!config.useEmbedding} // 依赖 Embedding
                                onChange={(val) => updateConfig({ useRerank: val })}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            对初筛结果进行二次精排。需要配置 Rerank 模型。
                            {!config.useEmbedding && <span className="text-yellow-500 block mt-1 text-[10px] flex items-center gap-1"><AlertTriangle size={10} /> 需要先启用向量检索</span>}
                        </p>
                    </div>
                </div>
            </div>

            {/* 高级参数 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/30">
                <NumberField
                    label="初筛数量 (Top-K)"
                    description="从向量数据库中检索的候选数量"
                    min={1}
                    max={100}
                    value={config.embedding.topK}
                    onChange={(val) => updateConfig({
                        embedding: { ...config.embedding, topK: val }
                    })}
                />

                <NumberField
                    label="相似度阈值"
                    description="过滤相关性过低的结果 (0.0 - 1.0)"
                    min={0}
                    max={1}
                    step={0.05}
                    value={config.embedding.minScoreThreshold}
                    onChange={(val) => updateConfig({
                        embedding: { ...config.embedding, minScoreThreshold: val }
                    })}
                />
            </div>

            {/* 黏性系统简单配置 */}
            <div className="space-y-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        黏性系统 (Sticky)
                    </h3>
                    <Switch
                        checked={config.sticky?.enabled ?? true}
                        onChange={(val) => updateConfig({
                            sticky: {
                                ...(config.sticky || { decayFactor: 0.15, maxStickRounds: 3 }),
                                enabled: val
                            }
                        })}
                    />
                </div>
                {config.sticky?.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NumberField
                            label="衰减系数"
                            description="每次连续召回的惩罚权重 (0-1)"
                            min={0}
                            max={1}
                            step={0.05}
                            value={config.sticky.decayFactor}
                            onChange={(val) => updateConfig({
                                sticky: { ...config.sticky!, decayFactor: val }
                            })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

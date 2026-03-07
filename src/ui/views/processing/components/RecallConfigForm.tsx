
import type { RecallConfig, RerankConfig } from '@/config/types/rag';
import { Switch } from '@/ui/components/core/Switch';
import { NumberField } from '@/ui/components/form/FormComponents';
import { AlertTriangle, BrainCircuit, Database, Layers, Network, Search, Sliders, Sparkles, Zap } from 'lucide-react';
import React from 'react';

interface RecallConfigFormProps {
    config: RecallConfig;
    onChange: (config: RecallConfig) => void;
    /** Rerank 配置（用于业务参数） */
    rerankConfig?: RerankConfig;
    onRerankChange?: (config: RerankConfig) => void;
}

export const RecallConfigForm: React.FC<RecallConfigFormProps> = ({ config, onChange, rerankConfig, onRerankChange }) => {

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
                    {/* 关键词召回 (0 消耗) */}
                    <div className={`p-4 rounded-lg border transition-all ${config.useKeywordRecall ? 'bg-primary/5 border-primary/30' : 'bg-card border-border/50 hover:border-border'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Search size={16} className={config.useKeywordRecall ? 'text-primary' : 'text-muted-foreground'} />
                                关键词召回 (Keyword)
                            </div>
                            <Switch
                                checked={config.useKeywordRecall ?? true}
                                onChange={(val) => updateConfig({ useKeywordRecall: val })}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                            基于 Trigger Keywords 和元数据进行正则扫描，<span className="text-amber-500/80 font-medium">零 Token 消耗</span>。
                        </p>
                        {config.useKeywordRecall && (
                            <div className="mt-3 pt-3 border-t border-primary/10 grid grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">检索实体</span>
                                    <Switch
                                        checked={config.enableEntityKeyword ?? true}
                                        onChange={(val) => updateConfig({ enableEntityKeyword: val })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">检索事件</span>
                                    <Switch
                                        checked={config.enableEventKeyword ?? true}
                                        onChange={(val) => updateConfig({ enableEventKeyword: val })}
                                    />
                                </div>
                            </div>
                        )}
                        {config.useKeywordRecall && !config.useEmbedding && !config.useAgenticRAG && !config.enableEntityKeyword && !config.enableEventKeyword && (
                            <p className="text-[10px] text-yellow-500 mt-2 flex items-center gap-1">
                                <AlertTriangle size={10} /> 关键词已开启但无生效项目
                            </p>
                        )}
                        {config.useKeywordRecall && !config.useEmbedding && !config.useAgenticRAG && (config.enableEntityKeyword || config.enableEventKeyword) && (
                            <p className="text-[10px] text-primary mt-2 flex items-center gap-1">
                                <Zap size={10} /> 当前处于纯 0 消耗模式
                            </p>
                        )}
                    </div>

                    {/* Agentic RAG */}
                    <div className={`p-4 rounded-lg border transition-all overflow-hidden ${config.useAgenticRAG ? 'bg-primary/5 border-primary/30' : 'bg-card border-border/50 hover:border-border'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Zap size={16} className={config.useAgenticRAG ? 'text-primary' : 'text-muted-foreground'} />
                                Agentic RAG
                            </div>
                            <Switch
                                checked={config.useAgenticRAG}
                                onChange={(val) => updateConfig({ useAgenticRAG: val, useEmbedding: val ? false : config.useEmbedding })}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed break-words">
                            LLM 裁判式召回：精准选出档案 ID，跳过向量检索。产生 Token 消耗。
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
                                onChange={(val) => updateConfig({ useEmbedding: val, useAgenticRAG: val ? false : config.useAgenticRAG })}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            使用语义向量匹配历史事件，RAG 的核心能力。产生 Token 消耗。
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
                            使用 LLM 优化用户输入。产生 Token 消耗。
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
                            对初筛结果进行二次精排。产生 Token 消耗。
                            {!config.useEmbedding && <span className="text-yellow-500 mt-1 text-[10px] flex items-center gap-1"><AlertTriangle size={10} /> 需要先启用向量检索</span>}
                        </p>
                    </div>
                </div>
            </div>

            {/* 实体召回说明 */}
            <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-md">
                <p className="text-[10px] text-amber-500/90 leading-relaxed flex items-start gap-1.5">
                    <Sparkles size={12} className="shrink-0 mt-0.5" />
                    <span>
                        💡 <strong>提示：</strong>目前实体（NPC/地点）召回仅支持基于触发词 (Trigger Keywords) 的关键词扫描和关系链关联。这是为了保证在极低消耗下提供最高的一致性与响应准确度。
                    </span>
                </p>
            </div>

            {/* 高级参数 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/30">
                <NumberField
                    label="初筛数量 (Top-K)"
                    description="从向量数据库中检索的候选数量"
                    min={1}
                    max={100}
                    value={config.embedding?.topK ?? 20}
                    onChange={(val) => updateConfig({
                        embedding: {
                            topK: val,
                            minScoreThreshold: config.embedding?.minScoreThreshold ?? 0.3
                        }
                    })}
                />

                <NumberField
                    label="相似度阈值"
                    description="过滤相关性过低的结果 (0.0 - 1.0)"
                    min={0}
                    max={1}
                    step={0.05}
                    value={config.embedding?.minScoreThreshold ?? 0.3}
                    onChange={(val) => updateConfig({
                        embedding: {
                            topK: config.embedding?.topK ?? 20,
                            minScoreThreshold: val
                        }
                    })}
                />
            </div>

            {/* 类脑召回系统 (V0.9.5 实验性) */}
            <div
                className={`space-y-4 pt-4 border-t border-border/30 relative transition-all duration-300 ${config.brainRecall?.enabled
                    ? 'pl-4 border-l-2 border-l-primary'
                    : ''
                    }`}
            >

                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className={`p-1.5 rounded-md transition-colors ${config.brainRecall?.enabled
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                <BrainCircuit size={16} />
                            </div>
                            <h3
                                className={`text-sm font-medium uppercase tracking-wider transition-all ${config.brainRecall?.enabled
                                    ? 'text-primary'
                                    : 'text-muted-foreground'
                                    }`}
                            >
                                类脑召回
                            </h3>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${config.brainRecall?.enabled
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                                : 'bg-muted text-muted-foreground border-transparent'
                                }`}>
                                实验性功能,不保证更好的召回效力
                            </span>
                        </div>
                        <Switch
                            checked={config.brainRecall?.enabled ?? false}
                            onChange={(val) => updateConfig({
                                brainRecall: {
                                    enabled: val,
                                    workingLimit: config.brainRecall?.workingLimit ?? 10,
                                    shortTermLimit: config.brainRecall?.shortTermLimit ?? 35,
                                    reinforceFactor: config.brainRecall?.reinforceFactor ?? 0.2,
                                    decayRate: config.brainRecall?.decayRate ?? 0.08,
                                    evictionThreshold: config.brainRecall?.evictionThreshold ?? 0.25,
                                    contextSwitchThreshold: config.brainRecall?.contextSwitchThreshold ?? 0.4,
                                    gateThreshold: config.brainRecall?.gateThreshold ?? 0.6,
                                    maxDamping: config.brainRecall?.maxDamping ?? 3.0,
                                    sigmoidTemperature: config.brainRecall?.sigmoidTemperature ?? 5.0,
                                    boredomThreshold: config.brainRecall?.boredomThreshold ?? 3,
                                    boredomPenalty: config.brainRecall?.boredomPenalty ?? 0.2,
                                    mmrThreshold: config.brainRecall?.mmrThreshold ?? 0.6,
                                    newcomerBoost: config.brainRecall?.newcomerBoost ?? 0.3,
                                },
                            })}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pl-8 leading-relaxed">
                        模拟人脑记忆机制：强化、衰减、竞争淘汰、上下文感知。
                        <span className="opacity-70 ml-1">替代旧版黏性系统。</span>
                    </p>
                </div>

                {config.brainRecall?.enabled && (
                    <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* 容量配置 */}
                        <div className="space-y-3 pl-2 border-l-2 border-primary/20 ml-2">
                            <div className="flex items-center gap-2 text-xs text-primary/80 font-medium uppercase tracking-wider">
                                <Layers size={12} />
                                记忆容量
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <NumberField
                                    label="工作记忆"
                                    description="当前轮使用的记忆数量"
                                    min={1}
                                    max={20}
                                    step={1}
                                    value={config.brainRecall.workingLimit}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, workingLimit: val }
                                    })}
                                />
                                <NumberField
                                    label="短期记忆"
                                    description="缓存的记忆总量上限"
                                    min={1}
                                    max={50}
                                    step={1}
                                    value={config.brainRecall.shortTermLimit}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, shortTermLimit: val }
                                    })}
                                />
                            </div>
                        </div>

                        {/* 动态参数 */}
                        <div className="space-y-3 pl-2 border-l-2 border-primary/20 ml-2">
                            <div className="flex items-center gap-2 text-xs text-primary/80 font-medium uppercase tracking-wider">
                                <Zap size={12} />
                                动态参数
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <NumberField
                                    label="强化系数"
                                    description="再次召回时增强"
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={config.brainRecall.reinforceFactor}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, reinforceFactor: val }
                                    })}
                                />
                                <NumberField
                                    label="衰减速率"
                                    description="每轮未召回的衰减"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={config.brainRecall.decayRate}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, decayRate: val }
                                    })}
                                />
                            </div>
                        </div>

                        {/* 上下文感知 */}
                        <div className="space-y-3 pl-2 border-l-2 border-primary/20 ml-2">
                            <div className="flex items-center gap-2 text-xs text-primary/80 font-medium uppercase tracking-wider">
                                <AlertTriangle size={12} />
                                上下文感知
                            </div>
                            <NumberField
                                label="切换阈值"
                                description="当前分/首次分低于此值时重置短期记忆"
                                min={0}
                                max={1}
                                step={0.1}
                                value={config.brainRecall.contextSwitchThreshold}
                                onChange={(val) => updateConfig({
                                    brainRecall: { ...config.brainRecall!, contextSwitchThreshold: val }
                                })}
                            />
                        </div>

                        {/* 进阶调优 (V1.2) */}
                        <div className="space-y-3 pl-2 border-l-2 border-primary/20 ml-2">
                            <div className="flex items-center gap-2 text-xs text-primary/80 font-medium uppercase tracking-wider">
                                <Sliders size={12} />
                                进阶调优 (V1.2)
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <NumberField
                                    label="Rerank 门控"
                                    description="Rerank 分数 < 此值不进行强化"
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={config.brainRecall.gateThreshold ?? 0.6}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, gateThreshold: val }
                                    })}
                                />
                                <NumberField
                                    label="最大阻尼"
                                    description="单次强化的最大增量限制"
                                    min={0.1}
                                    max={10.0}
                                    step={0.1}
                                    value={config.brainRecall.maxDamping ?? 3.0}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, maxDamping: val }
                                    })}
                                />
                                <NumberField
                                    label="Sigmoid 温度"
                                    description="控制强化曲线的陡峭程度 (越小越陡)"
                                    min={0.1}
                                    max={20.0}
                                    step={0.5}
                                    value={config.brainRecall.sigmoidTemperature ?? 5.0}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, sigmoidTemperature: val }
                                    })}
                                />
                            </div>
                        </div>

                        {/* 多样性与厌倦 (V1.3) */}
                        <div className="space-y-3 pl-2 border-l-2 border-primary/20 ml-2">
                            <div className="flex items-center gap-2 text-xs text-primary/80 font-medium uppercase tracking-wider">
                                <Sparkles size={12} />
                                多样性与厌倦 (V1.3)
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <NumberField
                                    label="厌倦阈值"
                                    description="连续进入工作记忆多少次触发厌倦"
                                    min={1}
                                    max={20}
                                    step={1}
                                    value={config.brainRecall.boredomThreshold ?? 3}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, boredomThreshold: val }
                                    })}
                                />
                                <NumberField
                                    label="厌倦惩罚"
                                    description="触发厌倦时的额外衰减系数"
                                    min={0}
                                    max={2.0}
                                    step={0.1}
                                    value={config.brainRecall.boredomPenalty ?? 0.2}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, boredomPenalty: val }
                                    })}
                                />

                                <NumberField
                                    label="新人红利"
                                    description="新记忆条目的初始加成"
                                    min={0}
                                    max={2.0}
                                    step={0.1}
                                    value={config.brainRecall.newcomerBoost ?? 0.3}
                                    onChange={(val) => updateConfig({
                                        brainRecall: { ...config.brainRecall!, newcomerBoost: val }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

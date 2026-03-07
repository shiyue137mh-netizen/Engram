import type { RecallConfig, RerankConfig } from '@/config/types/defaults';
import React from 'react';
import { RecallConfigForm } from './components/RecallConfigForm';

interface RecallPanelProps {
    recallConfig: RecallConfig;
    rerankConfig: RerankConfig;
    onRecallConfigChange: (config: RecallConfig) => void;
    onRerankConfigChange: (config: RerankConfig) => void;
}

import { scanEntities, scanEvents } from '@/modules/memory/EntityScanner';
import { preprocessor } from '@/modules/preprocessing';
import { type AgenticRecall } from '@/modules/preprocessing/types';
import { retriever } from '@/modules/rag/retrieval/Retriever';
import { useMemoryStore } from '@/state/memoryStore';
import { notificationService } from '@/ui/services/NotificationService';
import { RecallDecisionModal } from '@/ui/views/review/RecallDecisionModal';
import { BrainCircuit, Database, History, Loader2, Play, Search, Zap } from 'lucide-react';

export const RecallPanel: React.FC<RecallPanelProps> = ({
    recallConfig,
    rerankConfig,
    onRecallConfigChange,
    onRerankConfigChange
}) => {
    // --- 状态管理 ---
    const [testQuery, setTestQuery] = React.useState('');
    const [isTesting, setIsTesting] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [currentRecalls, setCurrentRecalls] = React.useState<AgenticRecall[]>([]);
    const [currentEntities, setCurrentEntities] = React.useState<any[]>([]); // V1.4: 被激活实体状态

    // Scan Dry Run 专属状态
    const [scanQuery, setScanQuery] = React.useState('');
    const [matchedEntities, setMatchedEntities] = React.useState<any[]>([]);
    const [matchedEvents, setMatchedEvents] = React.useState<any[]>([]);

    const isAgenticMode = recallConfig.useAgenticRAG;

    // --- 逻辑处理 ---

    /** 静态扫描 Dry Run：零消耗测试关键词/正则匹配 */
    const handleScanDryRun = async () => {
        if (!scanQuery.trim()) {
            setMatchedEntities([]);
            setMatchedEvents([]);
            return;
        }

        const store = useMemoryStore.getState();
        const entities = await store.getAllEntities();
        const events = await store.getAllEvents();

        // 执行扫描 (Level 0 事件才参与)
        const hitEntities = scanEntities(scanQuery, entities);
        const hitEvents = scanEvents(scanQuery, events.filter(e => e.level === 0));

        setMatchedEntities(hitEntities);
        setMatchedEvents(hitEvents);

        if (hitEntities.length === 0 && hitEvents.length === 0) {
            notificationService.warning('关键词扫描未命中任何实体或事件', 'Scan Dry Run');
        } else {
            notificationService.success(`扫描命中: ${hitEntities.length} 个实体, ${hitEvents.length} 条事件`, 'Scan Dry Run');
        }
    };

    /** 统一处理预览测试：前置确认 -> 调取大模型 / 向量检索引擎 -> 弹出 Modal (统一样式) */
    const handlePreviewTest = async () => {
        if (!testQuery.trim() || isTesting) return;

        // 向用户提供明确的 Token 扣费警告
        // V1.4: 如果仅启用了关键词召回 (0 消耗)，则跳过确认
        const isZeroCost = recallConfig.useKeywordRecall && !recallConfig.useEmbedding && !recallConfig.useAgenticRAG && !recallConfig.usePreprocessing;

        if (!isZeroCost) {
            const userAgreed = window.confirm('召回预览将马上调用远端模型（大语言模型或 Embedding/Rerank 模型）来生成结果，这会产生 Token 消耗，请确认是否继续？');
            if (!userAgreed) return;
        }

        setIsTesting(true);
        try {
            if (isAgenticMode) {
                // Agentic 模式：由大模型预先生成 JSON
                const result = await preprocessor.process(testQuery);
                if (!result.success) {
                    notificationService.error(result.error || 'Agentic 预处理失败', 'Agentic RAG');
                    return;
                }
                const recalls = result.agenticRecalls ?? [];
                if (recalls.length === 0) {
                    notificationService.warning('预处理完成但未产生召回决策', 'Agentic RAG');
                    return;
                }
                setCurrentRecalls(recalls);
                setCurrentEntities([]); // Agentic 模式暂不直接显示实体（除非后续扩展预处理）
                setIsModalOpen(true);
            } else {
                // 普通（向量/混合）模式：先进行标准检索
                const searchResult = await retriever.search(testQuery);
                const candidates = searchResult.candidates || [];
                const recalledEntities = searchResult.recalledEntities || [];

                if (candidates.length === 0 && recalledEntities.length === 0) {
                    notificationService.warning('检索未命中任何事件或实体', 'RAG');
                    return;
                }
                // 把检索返回的带分数的 candidate 元素组装为相同的结构格式供 Modal 消费
                const pseudoRecalls: AgenticRecall[] = candidates.map(c => ({
                    id: c.id,
                    score: c.hybridScore ?? c.rerankScore ?? c.embeddingScore ?? 0,
                    reason: c.rerankScore != null ? 'Rerank 优化命中' : '向量检索 (TopK) 命中'
                }));

                setCurrentRecalls(pseudoRecalls);
                setCurrentEntities(recalledEntities);
                setIsModalOpen(true);
            }
        } catch (error) {
            notificationService.error('召回预览执行失败，请查阅控制台报错', 'RAG');
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

            {/* 静态扫描快速测试（零消耗） */}
            <div className="pt-6 border-t border-border mt-6">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-amber-500" />
                    Keyword Scan Dry Run
                    <span className="text-[10px] bg-amber-500/10 text-amber-500/80 px-1.5 py-0.5 rounded ml-1 font-normal">
                        零消耗・正则测试
                    </span>
                </h3>

                <div className="flex gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                        <textarea
                            value={scanQuery}
                            onChange={(e) => setScanQuery(e.target.value)}
                            placeholder="输入文本测试匹配 (实际检索会自动回溯最近 5 条消息)..."
                            className="min-h-[80px] p-3 rounded-md bg-secondary/20 border border-border/40 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-y"
                        />

                        {/* 扫描匹配结果直接在这里渲染，不使用弹窗 */}
                        {(matchedEntities.length > 0 || matchedEvents.length > 0) && (
                            <div className="flex flex-col gap-2 p-2 bg-muted/20 rounded border border-border/20">
                                {matchedEntities.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        <div className="text-[10px] text-muted-foreground w-full mb-1 flex items-center gap-1">
                                            <Database size={10} /> 命中的实体:
                                        </div>
                                        {matchedEntities.map(ent => (
                                            <span key={ent.id} className="px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded text-[10px] font-medium">
                                                {ent.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {matchedEvents.length > 0 && (
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[10px] text-muted-foreground w-full mb-1 flex items-center gap-1">
                                            <History size={10} /> 命中的事件摘要:
                                        </div>
                                        {matchedEvents.map(evt => (
                                            <div key={evt.id} className="text-[10px] text-foreground/70 bg-secondary/30 p-1.5 rounded truncate border-l-2 border-primary/40">
                                                {evt.summary}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleScanDryRun}
                        disabled={!scanQuery.trim()}
                        className={`
                            px-4 rounded-md font-medium text-sm transition-all flex flex-col items-center justify-center gap-1 min-w-[80px]
                            ${!scanQuery.trim()
                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                : 'bg-primary/80 text-primary-foreground hover:bg-primary shadow-sm'}
                        `}
                    >
                        <Search size={18} />
                        <span className="text-xs">扫描测试</span>
                    </button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 pl-1 italic">
                    * 基于实体别名(Trigger Keywords)与事件元数据(Role/Loc)的正则匹配，完全本地执行。
                </p>
            </div>

            {/* 模型召回测试（有消耗） */}
            <div className="pt-6 border-t border-border mt-8">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    {isAgenticMode ? (
                        <>
                            <BrainCircuit size={16} className="text-primary" />
                            Agentic RAG Test
                        </>
                    ) : (
                        <>
                            <Search size={16} className="text-primary" />
                            Vector/Hybrid Retrieval Test
                        </>
                    )}
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1 font-normal italic">
                        注意: 产生 Token 消耗
                    </span>
                </h3>

                <div className="flex gap-2">
                    <textarea
                        value={testQuery}
                        onChange={(e) => setTestQuery(e.target.value)}
                        placeholder={isAgenticMode
                            ? '模拟用户输入触发 Agentic 预处理...'
                            : '模拟 User Input 触发向量召回预览...'
                        }
                        className="flex-1 min-h-[80px] p-3 rounded-md bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-y"
                    />
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handlePreviewTest}
                            disabled={!testQuery.trim() || isTesting}
                            className={`
                                px-4 py-3 rounded-md font-medium text-sm transition-all flex flex-col items-center justify-center gap-1 min-w-[100px] flex-1
                                ${!testQuery.trim() || isTesting
                                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'}
                            `}
                        >
                            {isTesting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span className="text-xs text-center">检索并<br />推理中</span>
                                </>
                            ) : (
                                <>
                                    <Play size={18} fill="currentColor" />
                                    <span className="text-xs">执行召回预览</span>
                                </>
                            )}
                        </button>
                        {isAgenticMode && currentRecalls.length > 0 && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                disabled={isTesting}
                                className={`
                                    py-2 rounded-md font-medium text-[10px] transition-all flex items-center justify-center gap-1 border border-border bg-transparent text-muted-foreground hover:bg-muted/50
                                `}
                            >
                                <BrainCircuit size={14} />
                                <span>审阅结果</span>
                            </button>
                        )}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 pl-1">
                    * 将执行一次真实的召回流程并弹窗确认，用于校验 Rerank 与 Agentic 评估效果。
                    {isAgenticMode && <><br /><span className="text-amber-500/80">* 注: Agentic 模式由专门提示词控制。</span></>}
                </p>
            </div>

            {/* 统一 RAG 回顾弹窗 */}
            <RecallDecisionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialRecalls={currentRecalls}
                recalledEntities={currentEntities}
                onConfirm={async (newRecalls) => {
                    setCurrentRecalls(newRecalls);
                    try {
                        setIsTesting(true);
                        // 确认后，通过提供明确的 ID 数组强制触发最终的内容装配与记录，绕过额外的无谓检索
                        const searchResult = await retriever.agenticSearch(newRecalls);
                        notificationService.success(
                            `预览确认完成! 强一致性注入 ${searchResult.nodes?.length ?? 0} 条事件，请查看日志`,
                            'RAG'
                        );
                    } catch (error) {
                        notificationService.error('确认后重新执行内容装配失败', 'RAG');
                    } finally {
                        setIsTesting(false);
                    }
                }}
            />
        </div>
    );
};

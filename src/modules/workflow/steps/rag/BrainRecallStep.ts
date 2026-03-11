import { SettingsManager } from '@/config/settings';
import { DEFAULT_BRAIN_RECALL_CONFIG, DEFAULT_RECALL_CONFIG } from '@/config/types/defaults';
import type { BrainRecallConfig, RecallConfig } from '@/config/types/rag';
import { Logger, LogModule } from '@/core/logger';
import { tryGetDbForChat } from '@/data/db';
import { getCurrentChatId } from '@/integrations/tavern';
import { brainRecallCache, type RecallCandidate } from '@/modules/rag/retrieval/BrainRecallCache';
import type { ScoredEvent } from '@/modules/rag/retrieval/HybridScorer';
import { JobContext } from '../../core/JobContext';
import { IStep } from '../../core/Step';

export class BrainRecallStep implements IStep {
    name = 'BrainRecallStep';

    async execute(context: JobContext): Promise<void> {
        context.data = context.data || {};
        let candidates: ScoredEvent[] = context.data.candidates || [];
        const config: RecallConfig = context.data.recallConfig || SettingsManager.get('apiSettings')?.recallConfig || DEFAULT_RECALL_CONFIG;
        const brainConfig: BrainRecallConfig = config.brainRecall || DEFAULT_BRAIN_RECALL_CONFIG;
        const keywordEntityIds: { id: string, score: number }[] = context.data.keywordEntityIds || [];

        // V1.4.1 Fix: 即使没有事件候选，只要有实体召回，也必须继续
        if (candidates.length === 0 && keywordEntityIds.length === 0) {
            Logger.info(LogModule.RAG_INJECT, '没有检索到任何事件或实体，跳过 BrainRecallStep');
            return;
        }

        const chatId = getCurrentChatId();
        const db = tryGetDbForChat(chatId || '');
        const allEntities = await (db?.entities.toArray() || []);
        const entityMap = new Map(allEntities.map(e => [e.id, e]));

        if (brainConfig.enabled) {
            brainRecallCache.setConfig(brainConfig);
            brainRecallCache.nextRound();

            // 1. 转换实体候选并投入类脑系统更新强度
            const entityCandidates: RecallCandidate[] = keywordEntityIds
                .filter(ke => entityMap.has(ke.id))
                .map(ke => {
                    const entity = entityMap.get(ke.id)!;
                    return {
                        id: entity.id,
                        label: entity.name,
                        category: 'entity',
                        embeddingScore: 1.0,
                        rerankScore: 1.0,
                    };
                });

            // 2. 转换普通事件候选
            const mappedCandidates: RecallCandidate[] = candidates.map(c => {
                let rerankScore = c.rerankScore;
                if (rerankScore === undefined && config.useRerank) {
                    const baseScore = typeof c.embeddingScore === 'number' ? c.embeddingScore : 0;
                    rerankScore = Math.min(0.8, baseScore);
                }

                return {
                    id: c.id,
                    label: c.node?.structured_kv?.event || (c.summary ? c.summary.slice(0, 10) : 'event'),
                    embeddingScore: c.embeddingScore || 0,
                    rerankScore: rerankScore,
                    embeddingVector: c.node?.embedding,
                };
            });

            const allMappedCandidates = [...mappedCandidates, ...entityCandidates];
            Logger.debug(LogModule.RAG_INJECT, `类脑引擎输入: 事件=${mappedCandidates.length}, 实体=${entityCandidates.length}`);

            const brainResults = brainRecallCache.process(allMappedCandidates);

            // 3. 更新事件候选分数 (V1.4.5: 改为增量加成模式，不再直接覆盖)
            const candidateMap = new Map(candidates.map(c => [c.id, c]));
            context.data.candidates = brainResults
                .filter(slot => candidateMap.has(slot.id))
                .map(slot => {
                    const original = candidateMap.get(slot.id)!;
                    
                    // 类脑加成逻辑：finalScore (0-1) 作为权重系数
                    // 基础保留 80% 的原始分，类脑强度贡献最高 40% 的额外增益 (总计 1.2x)
                    // 这样即使类脑分是 0.5 (中性)，最终得分也接近原始分 (0.8 + 0.4*0.5 = 1.0)
                    const originalScore = original.hybridScore ?? (original.embeddingScore || 0);
                    const brainBoost = 0.8 + (0.4 * slot.finalScore);
                    
                    return {
                        ...original,
                        hybridScore: Math.min(0.99, originalScore * brainBoost),
                        _brainIntensity: slot.finalScore // 保留原始强度用于可能的调试
                    };
                });

            // 4. P3 Fix: 关键词命中实体不再“永远保送”
            // 目标：保留关键词唤醒能力，但避免永久霸榜，仍然受类脑强度/衰减影响。
            // 策略：
            // - 若类脑选入（brainSlot 存在），权重使用 finalScore（随衰减变化）
            // - 若未选入，则仅给一个有限保底（floor），并按 ke.score 上限夹紧
            //   这样实体能被召回用于状态/注入，但不会碾压事件与其它实体
            const recalledEntities = keywordEntityIds
                .filter(ke => entityMap.has(ke.id))
                .map(ke => {
                    const entity = entityMap.get(ke.id)!;
                    const brainSlot = brainResults.find(s => s.id === entity.id);
                    const floor = 0.35;
                    const raw = ke.score || 1.0;
                    const clamped = Math.max(floor, Math.min(0.9, raw));

                    return {
                        ...entity,
                        _recallWeight: brainSlot ? brainSlot.finalScore : clamped,
                    };
                });

            context.data.recalledEntities = recalledEntities;

            Logger.debug(LogModule.RAG_INJECT, '类脑召回已应用', {
                eventOutput: context.data.candidates.length,
                entityOutput: recalledEntities.length,
                isWorkingMemory: brainResults.length
            });
        } else {
            // V1.4.1: 类脑引擎未启用，执行降级透传
            context.data.recalledEntities = keywordEntityIds
                .filter(ke => entityMap.has(ke.id))
                .map(ke => ({
                    ...entityMap.get(ke.id)!,
                    _recallWeight: ke.score || 1.0
                }));

            Logger.debug(LogModule.RAG_INJECT, '类脑引擎未开启，执行关键词实体直通', {
                entityCount: context.data.recalledEntities?.length || 0
            });
        }
    }
}

import { WorkflowDefinition } from '../core/WorkflowEngine';
import { BrainRecallStep } from '../steps/rag/BrainRecallStep';
import { KeywordRetrieveStep } from '../steps/rag/KeywordRetrieveStep';
import { RecordRecallLogStep } from '../steps/rag/RecordRecallLogStep';
import { RerankMergeStep } from '../steps/rag/RerankMergeStep';
import { VectorRetrieveStep } from '../steps/rag/VectorRetrieveStep';

export const createRetrievalWorkflow = (): WorkflowDefinition => ({
    name: 'RetrievalWorkflow',
    steps: [
        new KeywordRetrieveStep(), // 优先进行关键词硬扫
        new VectorRetrieveStep(),  // 然后进行向量检索
        new RerankMergeStep(),     // 合并两者并可选执行 Rerank
        new BrainRecallStep(),     // 投入类脑缓存进行衰减处理
        new RecordRecallLogStep()
    ]
});

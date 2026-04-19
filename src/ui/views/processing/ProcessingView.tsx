/**
 * ProcessingView - 处理中心视图容器
 *
 * 只负责框架和 Tab 切换，具体业务逻辑在子组件中
 * 类似 APIPresetsView 的架构设计
 */
import React, { useEffect, useState } from 'react';
import { BookOpen, Database, FileText, Layers, Network, Save, ScrollText, Search } from 'lucide-react';
import type { Tab } from "@/ui/components/layout/TabPills";
import { LayoutTabs } from "@/ui/components/layout/LayoutTabs";
import { Divider } from "@/ui/components/layout/Divider";
import type { QuickLink } from '@/ui/components/layout/QuickLinks';
import { QuickLinks } from '@/ui/components/layout/QuickLinks';
import { PageTitle } from "@/ui/components/display/PageTitle";
import { useConfig } from '@/ui/hooks/useConfig';
import { useSummarizerConfig } from '@/ui/hooks/useSummarizerConfig';

import { SummaryPanel } from './SummaryPanel';
import { VectorizationPanel } from './VectorizationPanel';
import { RecallPanel } from './RecallPanel';
import { EntityConfigPanel } from './EntityConfigPanel';
import { BatchProcessingPanel } from './BatchProcessingPanel';

type ProcessingTab = 'summary' | 'vectorization' | 'recall' | 'entity' | 'batch';

// 主 Tab 配置 - V0.9.6: 添加批量处理
const MAIN_TABS: Tab[] = [
    { icon: <FileText size={16} />, id: 'summary', label: '记忆摘要' },
    { icon: <Network size={16} />, id: 'entity', label: '实体提取' },
    { icon: <Database size={16} />, id: 'vectorization', label: '向量化' },
    { icon: <Search size={16} />, id: 'recall', label: '召回配置' },
    { icon: <Layers size={16} />, id: 'batch', label: '批量处理' },
];

// 快速跳转链接配置（使用 page:subtab 格式精确跳转）
const QUICK_LINKS: QuickLink[] = [
    { icon: ScrollText, id: 'devlog', label: '模型日志', linkTo: 'devlog:model' },
    { icon: BookOpen, id: 'presets', label: '提示词模板', linkTo: 'presets:prompt' },
];

interface ProcessingViewProps {
    onNavigate?: (path: string) => void;
    initialTab?: ProcessingTab;
}

interface TabInfo {
    title: string;
    subtitle: string;
}

const TAB_INFO: Record<ProcessingTab, TabInfo> = {
    batch: { subtitle: '批量处理历史消息和外部文本导入', title: '批量处理' },
    entity: { subtitle: '配置实体提取规则和提取结果', title: '实体提取' },
    recall: { subtitle: '配置 RAG 召回策略和参数', title: '召回配置' },
    summary: { subtitle: '查看和管理自动生成的剧情摘要', title: '记忆摘要' },
    vectorization: { subtitle: '管理记忆事件的向量嵌入状态', title: '向量化' },
};

export const ProcessingView: React.FC<ProcessingViewProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<ProcessingTab>('summary');
    const currentInfo = TAB_INFO[activeTab];

    // Unified State Management
    const {
        recallConfig,
        rerankConfig,
        entityExtractConfig,
        embeddingConfig,
        vectorConfig,
        updateRecallConfig,
        updateRerankConfig,
        updateEntityExtractConfig,
        updateEmbeddingConfig,
        saveConfig,
        hasChanges: configHasChanges
    } = useConfig();

    const {
        summarizerSettings,
        trimConfig,
        updateSummarizerSettings,
        updateTrimConfig,
        saveSummarizerConfig,
        hasChanges: summarizerHasChanges
    } = useSummarizerConfig();

    // Unified Save Handler
    const handleSave = async () => {
        if (configHasChanges) {saveConfig();}
        if (summarizerHasChanges) {await saveSummarizerConfig();}
        // Optional: Toast notification here
        // Alert('配置已保存');
    };

    const hasChanges = configHasChanges || summarizerHasChanges;

    return (
        <div className="flex flex-col h-full w-full overflow-x-hidden animate-in fade-in">
            {/* 页面标题 - 统一样式：大标题 + 简短介绍 */}
            <PageTitle
                breadcrumbs={['数据处理']}
                title={currentInfo.title}
                subtitle={currentInfo.subtitle}
                className="mb-6"
            />
            <Divider className="mb-6" />

            {/* 标签导航 - 自动 Portal 到 Header */}
            <LayoutTabs
                tabs={MAIN_TABS}
                activeTab={activeTab}
                onChange={(id: string) => setActiveTab(id as ProcessingTab)}
                actions={
                    <div className="flex items-center gap-2">
                        {hasChanges && (
                            <button
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors"
                                onClick={handleSave}
                            >
                                <Save size={12} />
                                保存
                            </button>
                        )}
                        <QuickLinks
                            links={QUICK_LINKS}
                            onNavigate={(path) => onNavigate?.(path)}
                        />
                    </div>
                }
            />

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {/* 记忆摘要 Tab - 使用 SummaryPanel 组件 */}
                {activeTab === 'summary' && (
                    <SummaryPanel
                        summarizerSettings={summarizerSettings}
                        trimConfig={trimConfig}
                        onSummarizerSettingsChange={updateSummarizerSettings}
                        onTrimConfigChange={updateTrimConfig}
                    />
                )}

                {/* 向量化 Tab - V0.7 使用 VectorizationPanel */}
                {activeTab === 'vectorization' && (
                    <VectorizationPanel
                        config={embeddingConfig}
                        vectorConfig={vectorConfig}
                        onConfigChange={(updates) => updateEmbeddingConfig({ ...embeddingConfig, ...updates })}
                    />
                )}

                {/* 召回配置 Tab - V0.8.5 */}
                {activeTab === 'recall' && (
                    <RecallPanel
                        recallConfig={recallConfig}
                        rerankConfig={rerankConfig}
                        onRecallConfigChange={updateRecallConfig}
                        onRerankConfigChange={updateRerankConfig}
                    />
                )}

                {/* 实体提取 Tab - V0.9 */}
                {activeTab === 'entity' && (
                    <EntityConfigPanel
                        config={entityExtractConfig}
                        onChange={updateEntityExtractConfig}
                    />
                )}

                {/* 批量处理 Tab - V0.9.6 */}
                {activeTab === 'batch' && <BatchProcessingPanel />}
            </div>
        </div>
    );
};


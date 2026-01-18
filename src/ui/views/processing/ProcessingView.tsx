/**
 * ProcessingView - 处理中心视图容器
 *
 * 只负责框架和 Tab 切换，具体业务逻辑在子组件中
 * 类似 APIPresetsView 的架构设计
 */
import React, { useState } from 'react';
import { FileText, Database, Layers, Network, ScrollText, BookOpen, Search } from 'lucide-react';
import { Tab } from "@/ui/components/ui/TabPills";
import { LayoutTabs } from "@/ui/components/layout/LayoutTabs";
import { Divider } from "@/ui/components/layout/Divider";
import { QuickLinks, QuickLink } from '@/ui/components/common/QuickLinks';
import { SummaryPanel } from './SummaryPanel';
import { VectorizationPanel } from './VectorizationPanel';
import { RecallPanel } from './RecallPanel';
import { EntityConfigPanel } from './EntityConfigPanel';
import { BatchProcessingPanel } from './BatchProcessingPanel';

type ProcessingTab = 'summary' | 'vectorization' | 'recall' | 'entity' | 'batch';

// 主 Tab 配置 - V0.9.6: 添加批量处理
const MAIN_TABS: Tab[] = [
    { id: 'summary', label: '记忆摘要', icon: <FileText size={16} /> },
    { id: 'entity', label: '实体提取', icon: <Network size={16} /> },
    { id: 'vectorization', label: '向量化', icon: <Database size={16} /> },
    { id: 'recall', label: '召回配置', icon: <Search size={16} /> },
    { id: 'batch', label: '批量处理', icon: <Layers size={16} /> },
];

// 快速跳转链接配置（使用 page:subtab 格式精确跳转）
const QUICK_LINKS: QuickLink[] = [
    { id: 'devlog', label: '模型日志', icon: ScrollText, linkTo: 'devlog:model' },
    { id: 'presets', label: '提示词模板', icon: BookOpen, linkTo: 'presets:prompt' },
];

interface ProcessingViewProps {
    onNavigate?: (path: string) => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<ProcessingTab>('summary');

    return (
        <div className="flex flex-col h-full">
            {/* 页面标题 - 统一样式：大标题 + 简短介绍 */}
            <div className="mb-6">
                <h1 className="text-2xl font-light text-foreground tracking-tight mb-2">数据处理</h1>
                <p className="text-sm text-muted-foreground">记忆摘要、向量化存储和 RAG 召回配置</p>
            </div>
            <Divider className="mb-6" />

            {/* 标签导航 - 自动 Portal 到 Header */}
            <LayoutTabs
                tabs={MAIN_TABS}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as ProcessingTab)}
                actions={
                    <QuickLinks
                        links={QUICK_LINKS}
                        onNavigate={(path) => onNavigate?.(path)}
                    />
                }
            />

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {/* 记忆摘要 Tab - 使用 SummaryPanel 组件 */}
                {activeTab === 'summary' && <SummaryPanel />}

                {/* 向量化 Tab - V0.7 使用 VectorizationPanel */}
                {activeTab === 'vectorization' && <VectorizationPanel />}

                {/* 召回配置 Tab - V0.8.5 */}
                {activeTab === 'recall' && <RecallPanel />}

                {/* 实体提取 Tab - V0.9 */}
                {activeTab === 'entity' && <EntityConfigPanel />}

                {/* 批量处理 Tab - V0.9.6 */}
                {activeTab === 'batch' && <BatchProcessingPanel />}
            </div>
        </div>
    );
};

export default ProcessingView;


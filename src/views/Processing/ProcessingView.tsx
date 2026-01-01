/**
 * ProcessingView - 处理中心视图容器
 * 
 * 只负责框架和 Tab 切换，具体业务逻辑在子组件中
 * 类似 APIPresetsView 的架构设计
 */
import React, { useState } from 'react';
import { FileText, Database, Layers, Boxes, ScrollText, BookOpen } from 'lucide-react';
import { Tab, TabPills } from "@/components/ui/TabPills";
import { QuickLinks, QuickLink } from '@/components/common/QuickLinks';
import { SummaryPanel } from './SummaryPanel';

type ProcessingTab = 'summary' | 'vectorization' | 'batch';

// 主 Tab 配置
const MAIN_TABS: Tab[] = [
    { id: 'summary', label: '记忆摘要', icon: <FileText size={16} /> },
    { id: 'vectorization', label: '向量化', icon: <Database size={16} /> },
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
                <p className="text-sm text-muted-foreground">记忆摘要、向量化存储和批量任务管理</p>
            </div>

            {/* 标签导航 - 使用 TabPills 组件以获得统一的磨砂效果 */}
            <TabPills
                tabs={MAIN_TABS}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as ProcessingTab)}
                actions={
                    <div className="hidden md:flex">
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
                {activeTab === 'summary' && <SummaryPanel />}

                {/* 向量化 Tab */}
                {activeTab === 'vectorization' && (
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                        <Database size={32} strokeWidth={1} className="opacity-30" />
                        <p className="text-sm font-light">向量化功能开发中...</p>
                    </div>
                )}

                {/* 批量处理 Tab */}
                {activeTab === 'batch' && (
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                        <Boxes size={32} strokeWidth={1} className="opacity-30" />
                        <p className="text-sm font-light">批量处理功能开发中...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessingView;

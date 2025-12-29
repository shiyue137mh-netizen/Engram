/**
 * ProcessingView - 处理中心视图容器
 * 
 * 只负责框架和 Tab 切换，具体业务逻辑在子组件中
 * 类似 APIPresetsView 的架构设计
 */
import React, { useState } from 'react';
import { FileText, Database, Layers, Boxes, ScrollText, BookOpen } from 'lucide-react';
import { Tab } from '../components/TabPills';
import { QuickLinks, QuickLink } from '../components/QuickLinks';
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

            {/* 标签导航 - 整体 sticky */}
            <div className="sticky top-0 z-10 bg-background -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 pt-2 -mt-2">
                <div className="flex items-center justify-between border-b border-border pb-2">
                    {/* 左侧：主 Tab */}
                    <div className="flex overflow-x-auto gap-2 no-scrollbar">
                        {MAIN_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as ProcessingTab)}
                                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${activeTab === tab.id
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* 右侧：快速跳转链接 */}
                    <QuickLinks
                        links={QUICK_LINKS}
                        onNavigate={(path) => onNavigate?.(path)}
                    />
                </div>
            </div>

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

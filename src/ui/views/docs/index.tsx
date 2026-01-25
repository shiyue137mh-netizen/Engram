/**
 * DocsView - 文档页视图
 * V0.9.11
 *
 * 使用 LayoutTabs (Portal 到 Header) 实现无框流体设计
 */

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { LayoutTabs } from '@/ui/components/layout/LayoutTabs';
import { DOCS } from '@/docs';
import type { Tab } from '@/ui/components/layout/TabPills';

interface DocsViewProps {
    initialTab?: string;
}

export const DocsView: React.FC<DocsViewProps> = ({ initialTab }) => {
    const [activeDocId, setActiveDocId] = useState<string>(initialTab || DOCS[0]?.id || '');
    const [searchQuery, setSearchQuery] = useState('');

    // 监听 initialTab 变化
    React.useEffect(() => {
        if (initialTab) {
            setActiveDocId(initialTab);
        }
    }, [initialTab]);

    // 当前激活的文档
    const activeDoc = useMemo(() =>
        DOCS.find(d => d.id === activeDocId) || DOCS[0],
        [activeDocId]
    );

    // 过滤文档（简单关键词匹配）
    const filteredDocs = useMemo(() => {
        if (!searchQuery.trim()) return DOCS;
        const query = searchQuery.toLowerCase();
        return DOCS.filter(doc =>
            doc.label.toLowerCase().includes(query) ||
            doc.keywords?.some(k => k.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    // 转换为 TabPills 格式
    const tabs: Tab[] = useMemo(() =>
        filteredDocs.map(doc => ({
            id: doc.id,
            label: doc.label,
            icon: <doc.icon size={14} />,
        })),
        [filteredDocs]
    );

    const ActiveComponent = activeDoc?.component;

    // 搜索输入框作为右侧 actions
    const searchAction = (
        <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
                type="text"
                placeholder="搜索文档..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 pl-8 pr-3 py-1 text-sm bg-muted/30 border border-border/50 rounded-md
                         focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50
                         placeholder:text-muted-foreground/60 transition-all duration-[var(--duration-fast)]"
            />
        </div>
    );

    return (
        <div className="h-full flex flex-col">
            {/* Portal 到 Header 的 Tabs */}
            <LayoutTabs
                tabs={tabs}
                activeTab={activeDocId}
                onChange={setActiveDocId}
                actions={searchAction}
            />

            {/* 文档内容区 */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="w-full max-w-none px-4 py-4 md:px-6 lg:px-8">
                    {ActiveComponent ? (
                        <>
                            <style>{`
                                #engram-docs-content {
                                    width: 100%;
                                    max-width: 100%;
                                }
                                #engram-docs-content * {
                                    max-width: 100% !important;
                                    white-space: normal !important;
                                    word-wrap: break-word !important;
                                    overflow-wrap: break-word !important;
                                    box-sizing: border-box !important;
                                }
                                #engram-docs-content p {
                                    margin-bottom: 1em !important;
                                }
                                #engram-docs-content pre {
                                    white-space: pre-wrap !important;
                                    overflow-x: auto !important;
                                }
                                #engram-docs-content code {
                                    white-space: pre-wrap !important;
                                    word-break: break-all !important;
                                }
                            `}</style>
                            <article id="engram-docs-content" className="prose prose-sm dark:prose-invert max-w-none
                                              prose-headings:font-light prose-headings:tracking-tight
                                              prose-h1:text-2xl prose-h1:text-primary prose-h1:mb-4 prose-h1:pb-2 prose-h1:border-b prose-h1:border-primary/20
                                              prose-h2:text-lg prose-h2:text-primary/90 prose-h2:mt-6 prose-h2:mb-3
                                              prose-h3:text-base prose-h3:text-foreground prose-h3:mt-4 prose-h3:mb-2
                                              prose-p:text-muted-foreground prose-p:leading-relaxed
                                              prose-li:text-muted-foreground
                                              prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-normal
                                              prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border
                                              prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:py-2
                                              prose-strong:text-foreground prose-strong:font-medium
                                              prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                                <ActiveComponent />
                            </article>
                        </>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            暂无文档内容
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};


// 记忆操作视图（含二级导航）
import React, { useState } from 'react';
import { Brain } from 'lucide-react';

type BrainTab = 'summarize' | 'vectorize' | 'batch';

const TABS: { id: BrainTab; label: string }[] = [
    { id: 'summarize', label: '总结剧情' },
    { id: 'vectorize', label: '向量化' },
    { id: 'batch', label: '批量处理' },
];

export const BrainView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<BrainTab>('summarize');

    return (
        <div className="engram-brain-view">
            <div className="engram-page-header">
                <Brain size={24} />
                <h2>记忆</h2>
            </div>

            {/* 二级标签导航 */}
            <div className="engram-tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`engram-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="engram-page-content">
                {activeTab === 'summarize' && (
                    <div>
                        <p className="engram-placeholder">总结剧情功能...</p>
                    </div>
                )}
                {activeTab === 'vectorize' && (
                    <div>
                        <p className="engram-placeholder">向量化功能...</p>
                    </div>
                )}
                {activeTab === 'batch' && (
                    <div>
                        <p className="engram-placeholder">批量处理功能...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrainView;

/**
 * FeatureToggles - 功能开关面板
 *
 * V0.9.5: Dashboard 操作中心，与 Processing 联动
 * 复用 Switch 组件，遵循 Settings 页面设计风格
 */
import React from 'react';
import { Power, Brain, Sparkles, Search, Wand2 } from 'lucide-react';
import { Switch } from '@/ui/components/core/Switch';
import type { FeatureStatus } from '@/ui/hooks/useDashboardData';

interface FeatureTogglesProps {
    features: FeatureStatus;
    onToggle: (feature: keyof FeatureStatus) => void;
}

// 功能配置
const FEATURE_CONFIG: {
    key: keyof FeatureStatus;
    label: string;
    description: string;
    icon: React.ElementType;
}[] = [
        {
            key: 'summarizer',
            label: '自动总结',
            description: '楼层触发剧情摘要',
            icon: Brain,
        },
        {
            key: 'entity',
            label: '实体提取',
            description: '提取角色/地点关系',
            icon: Sparkles,
        },
        {
            key: 'embedding',
            label: '语义向量',
            description: '事件向量化嵌入',
            icon: Search,
        },
        {
            key: 'recall',
            label: 'RAG 召回',
            description: '记忆语义检索',
            icon: Search,
        },
        {
            key: 'preprocessing',
            label: '输入预处理',
            description: 'Query 增强/剧情编排',
            icon: Wand2,
        },
    ];

export const FeatureToggles: React.FC<FeatureTogglesProps> = ({ features, onToggle }) => {
    return (
        <div className="flex flex-col bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border">
                <Power size={16} />
                <span>FEATURE TOGGLES</span>
            </div>

            <div className="p-4 space-y-3">
                {FEATURE_CONFIG.map(({ key, label, description, icon: Icon }) => {
                    const isEnabled = features[key];

                    return (
                        <div
                            key={key}
                            className="flex items-start justify-between gap-3"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className={`p-1.5 rounded-lg flex-shrink-0 ${isEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    <Icon size={16} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className={`text-sm font-medium leading-tight ${isEnabled ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                        {label}
                                    </h4>
                                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                                        {description}
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={isEnabled}
                                onChange={() => onToggle(key)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeatureToggles;

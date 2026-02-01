import { EntityNode } from '@/data/types/graph';
import { AlertTriangle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface EntityReviewProps {
    data: {
        newEntities: EntityNode[];
        updatedEntities: EntityNode[];
        error?: string;
    };
    onChange: (newData: { newEntities: EntityNode[]; updatedEntities: EntityNode[] }) => void;
}

export const EntityReview: React.FC<EntityReviewProps> = ({ data, onChange }) => {
    const [newEntities, setNewEntities] = useState<EntityNode[]>(data.newEntities || []);
    const [updatedEntities, setUpdatedEntities] = useState<EntityNode[]>(data.updatedEntities || []);

    // Sync when external data might change (e.g. reroll result)
    useEffect(() => {
        setNewEntities(data.newEntities || []);
        setUpdatedEntities(data.updatedEntities || []);
    }, [data]);

    const notifyChange = (n: EntityNode[], u: EntityNode[]) => {
        onChange({ newEntities: n, updatedEntities: u });
    };

    const handleRemoveNew = (index: number) => {
        const next = newEntities.filter((_, i) => i !== index);
        setNewEntities(next);
        notifyChange(next, updatedEntities);
    };

    const handleRemoveUpdated = (index: number) => {
        const next = updatedEntities.filter((_, i) => i !== index);
        setUpdatedEntities(next);
        notifyChange(newEntities, next);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-md border border-border/50">
                请确认本次提取的结果。您可以移除不准确的条目，或者点击下方按钮进行操作。
            </div>

            {data.error && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    <AlertTriangle size={16} />
                    <span>提取过程发生错误: {data.error}</span>
                </div>
            )}

            {/* New Entities Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-green-500">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    新增实体 ({newEntities.length})
                </div>

                {newEntities.length === 0 ? (
                    <div className="text-xs text-muted-foreground italic pl-4">无新增实体</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {newEntities.map((entity, idx) => (
                            <div key={idx} className="relative group p-3 rounded-lg border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                                <button
                                    onClick={() => handleRemoveNew(idx)}
                                    className="absolute top-2 right-2 p-1 bg-transparent text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="移除"
                                >
                                    <X size={14} />
                                </button>

                                <div className="flex items-start justify-between pr-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-foreground">{entity.name}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background border border-border text-muted-foreground uppercase">
                                                {entity.type}
                                            </span>
                                        </div>
                                        <div className="text-xs text-muted-foreground line-clamp-2" title={entity.description}>
                                            {entity.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Updated Entities Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-500">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    更新实体 ({updatedEntities.length})
                </div>

                {updatedEntities.length === 0 ? (
                    <div className="text-xs text-muted-foreground italic pl-4">无实体变更</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {updatedEntities.map((entity, idx) => (
                            <div key={idx} className="relative group p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                                <button
                                    onClick={() => handleRemoveUpdated(idx)}
                                    className="absolute top-2 right-2 p-1 bg-transparent text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="移除"
                                >
                                    <X size={14} />
                                </button>

                                <div className="flex items-start justify-between pr-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-foreground">{entity.name}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background border border-border text-muted-foreground uppercase">
                                                {entity.type}
                                            </span>
                                        </div>
                                        <div className="text-xs text-muted-foreground line-clamp-2" title={entity.description}>
                                            {entity.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

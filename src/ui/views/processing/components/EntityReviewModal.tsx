
import React, { useState, useEffect } from 'react';
import { Modal } from '@/ui/components/feedback/Modal';
import { ModernButton as Button } from '@/ui/components/core/Button';
import { EntityNode } from '@/data/types/graph';
import { Check, X } from 'lucide-react';

interface EntityReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { newEntities: EntityNode[]; updatedEntities: EntityNode[] }) => Promise<void>;
    newEntities: EntityNode[];
    updatedEntities: EntityNode[];
}

export const EntityReviewModal: React.FC<EntityReviewModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    newEntities: initialNew,
    updatedEntities: initialUpdated,
}) => {
    const [newEntities, setNewEntities] = useState<EntityNode[]>(initialNew);
    const [updatedEntities, setUpdatedEntities] = useState<EntityNode[]>(initialUpdated);
    const [isSaving, setIsSaving] = useState(false);

    // Sync state with props when modal opens
    useEffect(() => {
        if (isOpen) {
            setNewEntities(initialNew);
            setUpdatedEntities(initialUpdated);
        }
    }, [isOpen, initialNew, initialUpdated]);

    // Remove entity from list
    const handleRemoveNew = (index: number) => {
        setNewEntities(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveUpdated = (index: number) => {
        setUpdatedEntities(prev => prev.filter((_, i) => i !== index));
    };

    const handleConfirm = async () => {
        setIsSaving(true);
        try {
            await onConfirm({ newEntities, updatedEntities });
            onClose();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="实体提取预览"
            size="lg"
        >
            <div className="flex flex-col h-[70vh]">
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground">请确认本次提取的结果。您可以移除不准确的条目。</p>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
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
                                            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
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
                                                <div className="text-xs text-muted-foreground line-clamp-2">
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
                                            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
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
                                                <div className="text-xs text-muted-foreground line-clamp-2">
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

                {/* Footer */}
                <div className="flex justify-end gap-2 pt-4 border-t border-border mt-4">
                    <Button label="取消" size="sm" onClick={onClose} disabled={isSaving} />
                    <Button
                        label="确认保存"
                        size="sm"
                        primary
                        icon={Check}
                        onClick={handleConfirm}
                        disabled={isSaving || (newEntities.length === 0 && updatedEntities.length === 0)}
                    />
                </div>
            </div>
        </Modal>
    );
};


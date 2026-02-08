import { EntityNode, EntityType } from '@/data/types/graph';
import { ModernButton as Button } from '@/ui/components/core/Button';
import { AlertTriangle, Edit2, Save, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface EntityReviewProps {
    data: {
        newEntities: EntityNode[];
        updatedEntities: EntityNode[];
        error?: string;
    };
    onChange: (newData: { newEntities: EntityNode[]; updatedEntities: EntityNode[] }) => void;
}

// 扩展类型以包含 diff 信息
interface EntityNodeWithDiff extends EntityNode {
    _diff?: any[];
}

export const EntityReview: React.FC<EntityReviewProps> = ({ data, onChange }) => {
    const [newEntities, setNewEntities] = useState<EntityNodeWithDiff[]>(data.newEntities || []);
    const [updatedEntities, setUpdatedEntities] = useState<EntityNodeWithDiff[]>(data.updatedEntities || []);
    const [editingEntity, setEditingEntity] = useState<{ list: 'new' | 'updated', index: number, entity: EntityNodeWithDiff } | null>(null);

    // Sync when external data changes
    useEffect(() => {
        setNewEntities(data.newEntities || []);
        setUpdatedEntities(data.updatedEntities || []);
    }, [data]);

    const notifyChange = (n: EntityNodeWithDiff[], u: EntityNodeWithDiff[]) => {
        // Remove _diff before passing back if needed, or keep it.
        // SaveEntity (DryRun=false) ignores _diff usually, or we should clean it?
        // Actually SaveEntity expects EntityNode, _diff is extra. It's fine to pass it.
        onChange({ newEntities: n, updatedEntities: u });
    };

    const handleRemove = (list: 'new' | 'updated', index: number) => {
        if (list === 'new') {
            const next = newEntities.filter((_, i) => i !== index);
            setNewEntities(next);
            notifyChange(next, updatedEntities);
        } else {
            const next = updatedEntities.filter((_, i) => i !== index);
            setUpdatedEntities(next);
            notifyChange(newEntities, next);
        }
    };

    const handleEditStart = (list: 'new' | 'updated', index: number, entity: EntityNodeWithDiff) => {
        setEditingEntity({ list, index, entity: JSON.parse(JSON.stringify(entity)) });
    };

    const handleEditSave = () => {
        if (!editingEntity) return;
        const { list, index, entity } = editingEntity;

        if (list === 'new') {
            const next = [...newEntities];
            next[index] = entity;
            setNewEntities(next);
            notifyChange(next, updatedEntities);
        } else {
            const next = [...updatedEntities];
            next[index] = entity;
            // Clear diff on edit because it's now manually overridden
            delete next[index]._diff;
            setUpdatedEntities(next);
            notifyChange(newEntities, next);
        }
        setEditingEntity(null);
    };

    const handleEditCancel = () => {
        setEditingEntity(null);
    };

    return (
        <div className="flex flex-col gap-6 font-sans">
            <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-md border border-border/50">
                请确认本次提取的结果。点击卡片可进行编辑，点击右上角删除可移除。
            </div>

            {data.error && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    <AlertTriangle size={16} />
                    <span>提取过程发生错误: {data.error}</span>
                </div>
            )}

            {/* Editing Modal/Overlay */}
            {editingEntity && (
                <div
                    className="fixed inset-0 z-[12000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in"
                    style={{ height: '100dvh', width: '100vw' }}
                >
                    <div className="w-full max-w-2xl bg-popover border border-border rounded-lg shadow-2xl p-6 flex flex-col gap-4 animate-in zoom-in-95 h-[85dvh] sm:h-auto sm:max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <h3 className="text-lg font-bold">编辑实体</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-muted-foreground">名称</label>
                                <input
                                    className="p-2 rounded-md bg-muted border border-border text-sm"
                                    value={editingEntity.entity.name}
                                    onChange={(e) => setEditingEntity({ ...editingEntity, entity: { ...editingEntity.entity, name: e.target.value } })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-muted-foreground">类型</label>
                                <select
                                    className="p-2 rounded-md bg-muted border border-border text-sm"
                                    value={editingEntity.entity.type}
                                    onChange={(e) => setEditingEntity({ ...editingEntity, entity: { ...editingEntity.entity, type: e.target.value as EntityType } })}
                                >
                                    {Object.values(EntityType).map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-muted-foreground">描述 (Description)</label>
                            <textarea
                                className="p-2 rounded-md bg-muted border border-border text-xs min-h-[80px] font-mono"
                                value={editingEntity.entity.description}
                                onChange={(e) => setEditingEntity({ ...editingEntity, entity: { ...editingEntity.entity, description: e.target.value } })}
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1 min-h-[200px]">
                            <label className="text-xs font-medium text-muted-foreground">详细属性 (Profile JSON)</label>
                            <textarea
                                className="p-2 rounded-md bg-muted border border-border text-xs flex-1 font-mono"
                                value={JSON.stringify(editingEntity.entity.profile, null, 2)}
                                onChange={(e) => {
                                    try {
                                        const profile = JSON.parse(e.target.value);
                                        setEditingEntity({ ...editingEntity, entity: { ...editingEntity.entity, profile } });
                                    } catch (err) {
                                        // Ignore parse error while typing
                                    }
                                }}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-2">
                            <Button label="取消" onClick={handleEditCancel} />
                            <Button label="保存" onClick={handleEditSave} primary icon={Save} />
                        </div>
                    </div>
                </div>
            )}

            {/* Updated Entities Section (Show first as they are usually more critical) */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-500">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    更新实体 ({updatedEntities.length})
                </div>

                {updatedEntities.length === 0 ? (
                    <div className="text-xs text-muted-foreground italic pl-4">无实体变更</div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {updatedEntities.map((entity, idx) => (
                            <EntityCard
                                key={idx}
                                entity={entity}
                                type="updated"
                                onRemove={() => handleRemove('updated', idx)}
                                onEdit={() => handleEditStart('updated', idx, entity)}
                            />
                        ))}
                    </div>
                )}
            </div>

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
                            <EntityCard
                                key={idx}
                                entity={entity}
                                type="new"
                                onRemove={() => handleRemove('new', idx)}
                                onEdit={() => handleEditStart('new', idx, entity)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper to format values for display
const formatValue = (v: any) => {
    if (typeof v === 'object' && v !== null) {
        const str = JSON.stringify(v);
        return str.length > 60 ? str.slice(0, 60) + '...' : str;
    }
    return String(v);
};

// Sub-component for individual card
const EntityCard: React.FC<{
    entity: EntityNodeWithDiff;
    type: 'new' | 'updated';
    onRemove: () => void;
    onEdit: () => void;
}> = ({ entity, type, onRemove, onEdit }) => {
    const isUpdated = type === 'updated';
    const borderColor = isUpdated ? 'border-amber-500/30' : 'border-green-500/30';
    const bgColor = isUpdated ? 'bg-amber-500/5' : 'bg-green-500/5';
    const textColor = isUpdated ? 'text-amber-500' : 'text-green-500';

    return (
        <div
            className={`relative group p-4 rounded-lg border ${borderColor} ${bgColor} hover:bg-opacity-20 transition-all cursor-pointer`}
            onClick={onEdit}
        >
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="p-1.5 bg-background/50 hover:bg-background rounded-md text-muted-foreground hover:text-foreground transition-colors"
                    title="编辑"
                >
                    <Edit2 size={14} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    className="p-1.5 bg-background/50 hover:bg-background rounded-md text-muted-foreground hover:text-destructive transition-colors"
                    title="移除"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            <div className="flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-foreground">{entity.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border border-current opacity-80 uppercase ${textColor}`}>
                        {entity.type}
                    </span>
                </div>

                {/* Diff View for Updated Entities */}
                {isUpdated && entity._diff ? (
                    <div className="flex flex-col gap-1 mt-1 bg-background/50 p-2.5 rounded text-xs font-mono">
                        {entity._diff.map((op, i) => (
                            <div key={i} className="flex gap-2 break-all items-baseline">
                                {/* Path */}
                                <span className="font-medium text-foreground/80 shrink-0 min-w-[30px]">{op.path}</span>

                                <div className="flex flex-wrap gap-1.5 items-center">
                                    {/* Old Value (Red) - for replace/remove */}
                                    {(op.op === 'replace' || op.op === 'remove') && op.oldValue !== undefined && (
                                        <span className="text-destructive line-through decoration-destructive/40 bg-destructive/5 px-1 rounded border border-destructive/10">
                                            {formatValue(op.oldValue)}
                                        </span>
                                    )}

                                    {/* Arrow for replace */}
                                    {op.op === 'replace' && <span className="text-muted-foreground text-[10px]">➜</span>}

                                    {/* New Value (Green) - for replace/add */}
                                    {(op.op === 'replace' || op.op === 'add') && op.value !== undefined && (
                                        <span className="text-green-600 dark:text-green-400 bg-green-500/10 px-1 rounded border border-green-500/20 font-semibold">
                                            {formatValue(op.value)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-xs text-muted-foreground line-clamp-3 leading-relaxed break-words">
                        {entity.description}
                    </div>
                )}
            </div>
        </div>
    );
};

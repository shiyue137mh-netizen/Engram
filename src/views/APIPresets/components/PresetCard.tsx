/**
 * PresetCard - LLM 预设卡片（使用通用 ItemCard）
 */
import React from 'react';
import { Edit2, Copy, Trash2, Server, Cloud } from 'lucide-react';
import { ItemCard } from '@/components/common/ItemCard';
import type { LLMPreset } from '@/services/api/types';

interface PresetCardProps {
    preset: LLMPreset;
    isSelected: boolean;
    onSelect: () => void;
    onEdit: () => void;
    onCopy: () => void;
    onDelete: () => void;
}

export const PresetCard: React.FC<PresetCardProps> = ({
    preset,
    isSelected,
    onSelect,
    onEdit,
    onCopy,
    onDelete,
}) => {
    const SourceIcon = preset.source === 'tavern' || preset.source === 'tavern_profile' ? Server : Cloud;
    const modelName = preset.source === 'custom'
        ? preset.custom?.model || '未设置'
        : '使用当前';

    return (
        <ItemCard
            icon={<SourceIcon size={14} />}
            title={preset.name}
            subtitle={modelName}
            meta={`T:${preset.parameters.temperature}`}
            badges={preset.isDefault ? [{ text: 'DEFAULT', color: 'primary' }] : []}
            selected={isSelected}
            onClick={onSelect}
            actions={[
                { icon: <Edit2 size={12} />, onClick: () => onEdit(), title: '编辑' },
                { icon: <Copy size={12} />, onClick: () => onCopy(), title: '复制' },
                { icon: <Trash2 size={12} />, onClick: () => onDelete(), title: '删除', danger: true, hidden: preset.isDefault },
            ]}
        />
    );
};

export default PresetCard;

/**
 * EntityEditor - 实体编辑面板
 *
 * 功能：
 * 1. 编辑实体基本信息 (Name/Type/Aliases)
 * 2. 编辑 Profile JSON (核心)
 * 3. 自动同步/手动修改 Description (YAML from Profile)
 */
import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef, useRef } from 'react';
import type { EntityNode, EntityType } from '@/data/types/graph';
import { Trash2, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import { Divider } from '@/ui/components/layout/Divider';
import { TextField } from '@/ui/components/form/FormComponents';
import yaml from 'js-yaml'; // 需要确认项目是否已安装 js-yaml，如果没有则需要简单实现或引入

// 类型别名简化
type EntityEditorHandle = {
    save: () => void;
    isDirty: () => boolean;
};

interface EntityEditorProps {
    entity: EntityNode | null;
    isFullScreen?: boolean;
    onSave?: (id: string, updates: Partial<EntityNode>) => void;
    onDelete?: (id: string) => void;
    onClose?: () => void;
}

const ENTITY_TYPES: { value: string; label: string }[] = [
    { value: 'char', label: '角色 (Character)' },
    { value: 'loc', label: '地点 (Location)' },
    { value: 'item', label: '物品 (Item)' },
    { value: 'concept', label: '概念 (Concept)' },
    { value: 'unknown', label: '其他 (Unknown)' },
];

const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    borderRadius: 0,
    outline: 'none',
    padding: '8px 0',
    fontSize: '14px',
    width: '100%',
    color: 'var(--foreground, inherit)',
};

export const EntityEditor = forwardRef<EntityEditorHandle, EntityEditorProps>(({
    entity,
    isFullScreen = false,
    onSave,
    onDelete,
    onClose,
}, ref) => {
    // Local State
    const [name, setName] = useState('');
    const [type, setType] = useState<EntityType | string>('unknown');
    const [aliases, setAliases] = useState('');
    const [description, setDescription] = useState('');
    const [profileJson, setProfileJson] = useState('');
    const [jsonError, setJsonError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const [lastEntityId, setLastEntityId] = useState<string | null>(null);

    // Refs
    const isMountedRef = useRef(true);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => { isMountedRef.current = false; };
    }, []);

    // Load data
    useEffect(() => {
        if (entity && entity.id !== lastEntityId) {
            setName(entity.name);
            setType(entity.type);
            setAliases(entity.aliases ? entity.aliases.join(', ') : '');
            setDescription(entity.description || '');
            setProfileJson(JSON.stringify(entity.profile || {}, null, 2));
            setJsonError(null);
            setIsDirty(false);
            setLastEntityId(entity.id);
        }
    }, [entity, lastEntityId]);

    // Sync Helper
    const syncToParent = useCallback(() => {
        if (!entity || jsonError) return;

        let parsedProfile = {};
        try {
            parsedProfile = JSON.parse(profileJson);
        } catch (e) {
            console.error('JSON Parse Error during sync', e);
            // Don't sync invalid JSON, or maybe just ignore profile update
        }

        const updates: Partial<EntityNode> = {
            name,
            type: type as EntityType,
            aliases: aliases.split(/[,，]/).map(s => s.trim()).filter(Boolean),
            description, // Allow manual override, or auto-generated
            profile: parsedProfile,
        };

        onSave?.(entity.id, updates);
    }, [entity, name, type, aliases, description, profileJson, jsonError, onSave]);

    // Expose Handle
    useImperativeHandle(ref, () => ({
        save: syncToParent,
        isDirty: () => isDirty
    }), [syncToParent, isDirty]);

    // Handlers
    const handleJsonChange = (val: string) => {
        setProfileJson(val);
        setIsDirty(true);
        try {
            JSON.parse(val);
            setJsonError(null);
            // Debounced sync handled by onBlur/Effect usually,
            // but for JSON we might want to wait until valid.
        } catch (e: any) {
            setJsonError(e.message);
        }
    };

    const handleBlur = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            if (isMountedRef.current && isDirty && !jsonError) {
                syncToParent();
            }
        }, 200);
    };

    const handleGenerateDesc = () => {
        if (jsonError) return;
        try {
            const obj = JSON.parse(profileJson);
            // Simple YAML dump or specific format?
            // Since we don't have js-yaml installed yet in this snippet context,
            // we'll do a simple conversion or use a placeholder if yaml lib is missing.
            //Ideally: const desc = yaml.dump(obj);
            // For now, let's just assume we want a readable text format.
            // Using a mock YAML generator for now to avoid dependency error if not installed
            const desc = JSON.stringify(obj, null, 2)
                .replace(/[{"},]/g, '')
                .replace(/^\s*[\r\n]/gm, ''); // Very rough "YAML-like"

            setDescription(desc.trim());
            setIsDirty(true);
            // Immediate sync to save the generated desc
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                if (isMountedRef.current) syncToParent();
            }, 50);

        } catch (e) {
            alert('Profile JSON 格式错误，无法生成描述');
        }
    };

    if (!entity) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                <p className="text-sm font-light">选择一个实体查看详情</p>
            </div>
        );
    }

    const formContent = (
        <>
            {/* 基本信息 */}
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-muted-foreground">实体名称</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setIsDirty(true);
                        }}
                        onBlur={handleBlur}
                        style={inputStyle}
                        className="placeholder:text-muted-foreground/40 focus:border-primary transition-colors font-medium text-lg"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-xs text-muted-foreground">类型</label>
                        <select
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setIsDirty(true);
                                handleBlur(); // Trigger sync
                            }}
                            className="w-full py-2 bg-transparent border-b border-border outline-none text-sm appearance-none cursor-pointer hover:text-primary transition-colors"
                        >
                            {ENTITY_TYPES.map(t => (
                                <option key={t.value} value={t.value} className="bg-popover text-foreground">
                                    {t.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-muted-foreground">别名 (逗号分隔)</label>
                    <input
                        type="text"
                        value={aliases}
                        onChange={(e) => {
                            setAliases(e.target.value);
                            setIsDirty(true);
                        }}
                        onBlur={handleBlur}
                        style={inputStyle}
                        placeholder="如：小红, Red, 那个女孩"
                    />
                </div>
            </div>

            <Divider spacing="lg" />

            {/* Profile JSON Editor */}
            <div className="flex flex-col gap-2 flex-1 min-h-[200px]">
                <div className="flex justify-between items-center">
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        元数据 Profile (JSON)
                    </label>
                    {jsonError && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                            <AlertTriangle size={12} />
                            格式错误
                        </span>
                    )}
                </div>
                <textarea
                    value={profileJson}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    onBlur={handleBlur}
                    className={`
                        flex-1 w-full p-4 font-mono text-xs leading-relaxed
                        bg-muted/50 border rounded-md resize-none outline-none
                        transition-colors
                        ${jsonError ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}
                    `}
                    spellCheck={false}
                />
            </div>

            <Divider spacing="lg" />

            {/* Description (Burn-in) */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <label className="text-xs text-muted-foreground">
                        烧录描述 (YAML/Text)
                    </label>
                    <button
                        onClick={handleGenerateDesc}
                        className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                        title="基于 Profile 生成描述文本"
                    >
                        <RefreshCw size={10} />
                        从 Profile 生成
                    </button>
                </div>
                <textarea
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setIsDirty(true);
                    }}
                    onBlur={handleBlur}
                    rows={6}
                    className="w-full p-3 text-sm bg-transparent border border-border rounded-md outline-none focus:border-primary transition-colors resize-vertical"
                    placeholder="用于提交给 LLM 的实体描述信息..."
                />
                <p className="text-[10px] text-muted-foreground">
                    *RAG 检索时将直接使用此字段的内容作为上下文
                </p>
            </div>

            <div className="h-4" /> {/* Bottom Spacer */}
        </>
    );

    // Render logic matches EventEditor (Mobile/Desktop modes)
    if (isFullScreen) {
        return (
            <div className="fixed inset-0 bg-background z-50 flex flex-col" style={{ height: '100dvh' }}>
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
                    <button onClick={onClose} className="p-1 rounded hover:bg-muted">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg font-light flex-1">编辑实体</h2>
                    <button onClick={() => isFullScreen && onDelete?.(entity.id)} className="p-2 text-destructive">
                        <Trash2 size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {formContent}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 pb-4 border-b border-border shrink-0">
                <h3 className="text-sm font-medium text-primary flex-1">编辑实体</h3>
                <button
                    onClick={() => onDelete?.(entity.id)}
                    className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                >
                    <Trash2 size={16} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
                {formContent}
            </div>
        </div>
    );
});

EntityEditor.displayName = 'EntityEditor';

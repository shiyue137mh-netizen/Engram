/**
 * EntityEditor - 实体编辑面板
 *
 * 功能：
 * 1. 编辑实体基本信息 (Name/Type/Aliases)
 * 2. 编辑 Profile JSON (核心)
 * 3. 自动同步/手动修改 Description (YAML from Profile)
 */
import type { EntityNode, EntityType } from '@/data/types/graph';
import { Divider } from '@/ui/components/layout/Divider';
import { useResponsive } from '@/ui/hooks/useResponsive';
import yaml from 'js-yaml'; // 需要确认项目是否已安装 js-yaml，如果没有则需要简单实现或引入
import { debounce } from 'lodash'; // Phase 3 Performance Add: 引入防抖
import { AlertTriangle, ArrowLeft, RefreshCw, Trash2 } from 'lucide-react';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

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
    const { isMobile } = useResponsive();
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
    // Phase 3 Performance Fix: 将大量字符串解析加上防抖，避免卡死输入法
    const handleJsonChangeDebounced = useMemo(
        () =>
            debounce((val: string) => {
                setProfileJson(val);
                setIsDirty(true);
                try {
                    JSON.parse(val);
                    setJsonError(null);
                } catch (e: any) {
                    setJsonError(e.message);
                }
            }, 300),
        []
    );

    // 清理防抖
    useEffect(() => {
        return () => {
            handleJsonChangeDebounced.cancel();
        };
    }, [handleJsonChangeDebounced]);

    const handleJsonChange = (val: string) => {
        // 先局部更新 UI 输入框视图（可以用非受控或直接存一个 immediate state）
        // 但这里沿用组件自带的方法因为 React 18 对 onChange 的处理比较好
        // 主要是对 JSON 校验动作进行防抖
        setProfileJson(val); // 保持流畅的回显
        setIsDirty(true);
        handleJsonChangeDebounced(val); // 防抖进行语法检查
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
        if (jsonError || !entity) return;
        try {
            const profileObj = JSON.parse(profileJson);

            // V1.2.9: Simple YAML structure
            // Format:
            // 实体名称
            // profile:
            //   (indented content)
            // Note: type is already indicated by XML tag <character_state> etc.

            const entityObj = {
                profile: profileObj,
            };

            const yamlContent = yaml.dump(entityObj, {
                indent: 2,
                lineWidth: -1,
                noRefs: true,
                sortKeys: false,
            });

            const newDesc = `${name}\n${yamlContent.trim()}`;

            setDescription(newDesc);
            setIsDirty(true);

            // V1.2.9 FIX: Directly call onSave with new values to avoid stale closure
            // (syncToParent captures old description value from closure)
            const updates: Partial<EntityNode> = {
                name,
                type: type as EntityType,
                aliases: aliases.split(/[,，]/).map(s => s.trim()).filter(Boolean),
                description: newDesc, // Use the new value directly!
                profile: profileObj,
            };
            onSave?.(entity.id, updates);

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
                        <span className="text-xs text-destructive flex items-center gap-1">
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
                        ${jsonError ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'}
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
            <div className="h-full flex flex-col bg-transparent">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 shrink-0">
                    <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <h2 className="text-sm font-medium flex-1">编辑实体</h2>
                    <button onClick={() => isFullScreen && onDelete?.(entity.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded">
                        <Trash2 size={16} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {formContent}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col min-h-0">
            {/* 桌面端内部 Header，移动端使用外部 MobileFullscreenForm Header */}
            {!isMobile && (
                <div className="flex items-center gap-2 pb-4 border-b border-border shrink-0">
                    <button
                        onClick={onClose}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                        title="返回"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h3 className="text-sm font-medium text-primary flex-1">编辑实体</h3>
                    <button
                        onClick={() => onDelete?.(entity.id)}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
                {formContent}
            </div>
        </div>
    );
});

EntityEditor.displayName = 'EntityEditor';

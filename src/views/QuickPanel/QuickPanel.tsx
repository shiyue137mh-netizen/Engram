/**
 * QuickPanel - V0.8 快捷面板组件
 *
 * 独立于主面板的可拖拽悬浮面板
 * 用于快捷切换预处理模式、查看 RAG 状态等
 *
 * 注意：预置的模式只是 UI 占位，需要用户在 API 配置 → 提示词模板中
 * 创建对应分类的模板并启用才能生效。
 */

/**
 * QuickPanel - V0.8 快捷面板组件
 *
 * 独立于主面板的可拖拽悬浮面板
 * 用于快捷切换预处理模式、查看 RAG 状态等
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FloatingPanel } from '@/components/ui/FloatingPanel';
import { Switch } from '@/components/ui/Switch';
import { preprocessor } from '@/services/preprocessing';
import type { PreprocessingConfig } from '@/services/preprocessing/types';
import { DEFAULT_PREPROCESSING_CONFIG } from '@/services/preprocessing/types';
import { Search, AlertCircle, Wand2 } from 'lucide-react';
import { useAPIPresets } from '@/hooks/useAPIPresets';
import { Logger } from '@/lib/logger';

interface QuickPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QuickPanel({ isOpen, onClose }: QuickPanelProps) {
    const [config, setConfig] = useState<PreprocessingConfig>(
        preprocessor.getConfig() || DEFAULT_PREPROCESSING_CONFIG
    );

    // 获取所有预处理模板
    const { settings, updateRecallConfig, save } = useAPIPresets();
    const recallConfig = settings.recallConfig;

    // 计算当前的启用状态：必须两者都开启才算开启 (但 UI 上我们尽量同步它们)
    const isIdsEnabled = config.enabled && (recallConfig?.usePreprocessing ?? false);

    const availableModes = useMemo(() => {
        return settings.promptTemplates
            .filter(t => t.category === 'preprocessing')
            .map(t => ({
                id: t.id,
                name: t.name,
                description: t.userPromptTemplate.slice(0, 30).replace(/\n/g, ' ') + '...', // 简略描述
                icon: Wand2, // 统一图标，或者根据名称关键词映射不同图标
            }));
    }, [settings.promptTemplates]);

    // 刷新配置
    useEffect(() => {
        if (isOpen) {
            setConfig(preprocessor.getConfig() || DEFAULT_PREPROCESSING_CONFIG);
        }
    }, [isOpen]);

    // 切换启用状态 (同时更新 recallConfig 和 preprocessorConfig)
    const handleToggle = useCallback(() => {
        // 只要当前是关闭的，就试图开启；只要是开启的，就试图关闭
        // 以 recallConfig 为准
        const currentRecallState = recallConfig?.usePreprocessing ?? false;
        const newState = !currentRecallState;

        Logger.debug('QuickPanel', '切换预处理状态', { from: currentRecallState, to: newState });

        // 1. 更新全局 Recall Config
        if (recallConfig) {
            updateRecallConfig({ ...recallConfig, usePreprocessing: newState });
        }

        // 2. 更新 Preprocessor Config
        const newPreConfig = { ...config, enabled: newState };
        setConfig(newPreConfig);
        preprocessor.saveConfig(newPreConfig);

        // 3. 立即持久化（关键修复：save() 调用）
        save();
    }, [config, recallConfig, updateRecallConfig, save]);

    // 切换模式 (选中模板时自动开启预处理)
    const handleModeChange = useCallback((templateId: string) => {
        Logger.debug('QuickPanel', '切换预处理模式', { templateId });

        // 1. 更新 Preprocessor Config
        const newPreConfig = { ...config, templateId: templateId, enabled: true };
        setConfig(newPreConfig);
        preprocessor.saveConfig(newPreConfig);

        // 2. 确保全局 Recall Config 也是开启的
        if (recallConfig && !recallConfig.usePreprocessing) {
            updateRecallConfig({ ...recallConfig, usePreprocessing: true });
        }

        // 3. 立即持久化
        save();
    }, [config, recallConfig, updateRecallConfig, save]);

    // 如果当前选中的模板不在可用列表中（除了默认或未设置），给个提示
    const isCurrentTemplateValid = !config.templateId || availableModes.some(m => m.id === config.templateId);

    return (
        <FloatingPanel
            isOpen={isOpen}
            onClose={onClose}
            title="Engram 快捷面板"
            width={300}
        >
            <div className="space-y-3">
                {/* 预处理开关 */}
                <div
                    className="flex items-center justify-between p-2 rounded-md"
                    style={{
                        backgroundColor: 'var(--surface, rgba(255,255,255,0.05))',
                        border: '1px solid var(--border, rgba(255,255,255,0.1))',
                    }}
                >
                    <div className="flex items-center gap-2">
                        <Search size={14} style={{ color: 'var(--primary, #ef7357)' }} />
                        <span className="text-sm font-medium">输入预处理</span>
                    </div>
                    <Switch
                        checked={recallConfig?.usePreprocessing ?? config.enabled}
                        onChange={handleToggle}
                    />
                </div>

                {/* 预览开关 */}
                {(recallConfig?.usePreprocessing ?? config.enabled) && (
                    <div
                        className="flex items-center justify-between p-2 rounded-md"
                        style={{
                            backgroundColor: 'var(--surface, rgba(255,255,255,0.05))',
                            border: '1px solid var(--border, rgba(255,255,255,0.1))',
                        }}
                    >
                        <div className="flex items-center gap-2 pl-2">
                            <span className="text-xs text-muted-foreground">预览修订</span>
                        </div>
                        <Switch
                            checked={config.preview}
                            onChange={() => {
                                const newConfig = { ...config, preview: !config.preview };
                                setConfig(newConfig);
                                preprocessor.saveConfig(newConfig);
                            }}
                        />
                    </div>
                )}

                {/* 模式选择 */}
                {(recallConfig?.usePreprocessing ?? config.enabled) && (
                    <div className="space-y-2">
                        <div className="text-xs px-1" style={{ color: 'var(--muted-foreground, #888)' }}>
                            预处理模式
                        </div>

                        {availableModes.length === 0 ? (
                            <div
                                className="flex items-start gap-2 p-2 rounded-md text-xs mt-2"
                                style={{
                                    backgroundColor: 'rgba(var(--primary-rgb, 239,115,87), 0.1)',
                                    border: '1px solid rgba(var(--primary-rgb, 239,115,87), 0.3)',
                                    color: 'var(--muted-foreground, #888)',
                                }}
                            >
                                <AlertCircle size={14} style={{ color: 'var(--primary, #ef7357)', flexShrink: 0, marginTop: 2 }} />
                                <span>
                                    暂无预处理模板。请前往 API 配置 → 提示词模板中创建 'preprocessing' 类别的模板。
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {availableModes.map((mode) => {
                                    const Icon = mode.icon;
                                    const isSelected = config.templateId === mode.id;
                                    return (
                                        <button
                                            key={mode.id}
                                            onClick={() => handleModeChange(mode.id)}
                                            className="w-full flex items-center gap-3 p-2 rounded-md transition-all text-left"
                                            style={{
                                                backgroundColor: isSelected
                                                    ? 'rgba(var(--primary-rgb, 239,115,87), 0.15)'
                                                    : 'var(--surface, rgba(255,255,255,0.05))',
                                                border: isSelected
                                                    ? '1px solid var(--primary, #ef7357)'
                                                    : '1px solid var(--border, rgba(255,255,255,0.1))',
                                                color: 'var(--foreground, #fff)',
                                            }}
                                        >
                                            <Icon
                                                size={16}
                                                style={{
                                                    color: isSelected
                                                        ? 'var(--primary, #ef7357)'
                                                        : 'var(--muted-foreground, #888)'
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">{mode.name}</div>
                                                <div
                                                    className="text-xs truncate"
                                                    style={{ color: 'var(--muted-foreground, #888)' }}
                                                >
                                                    {mode.description}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* 状态指示 */}
                <div
                    className="text-xs text-center pt-2"
                    style={{
                        borderTop: '1px solid var(--border, rgba(255,255,255,0.1))',
                        color: 'var(--muted-foreground, #888)',
                    }}
                >
                    {(recallConfig?.usePreprocessing ?? config.enabled)
                        ? availableModes.find(m => m.id === config.templateId)?.name
                            ? `已启用 · ${availableModes.find(m => m.id === config.templateId)?.name}`
                            : '已启用 · 未知模板'
                        : '预处理已禁用'}
                </div>
            </div>
        </FloatingPanel>
    );
}

export default QuickPanel;

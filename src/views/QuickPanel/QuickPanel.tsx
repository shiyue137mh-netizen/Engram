/**
 * QuickPanel - V0.8 快捷面板组件
 *
 * 独立于主面板的可拖拽悬浮面板
 * 用于快捷切换预处理模式、查看 RAG 状态等
 *
 * 注意：预置的模式只是 UI 占位，需要用户在 API 配置 → 提示词模板中
 * 创建对应分类的模板并启用才能生效。
 */

import React, { useState, useCallback, useEffect } from 'react';
import { FloatingPanel } from '@/components/ui/FloatingPanel';
import { Switch } from '@/components/ui/Switch';
import { preprocessor } from '@/services/preprocessing';
import type { PreprocessingConfig } from '@/services/preprocessing/types';
import { DEFAULT_PREPROCESSING_CONFIG } from '@/services/preprocessing/types';
import { Search, BookOpen, PenTool, AlertCircle } from 'lucide-react';

/** 预处理模式选项 - 这些是 UI 占位，实际模板需要用户创建 */
const PREPROCESSING_MODES = [
    { id: 'query_enhance', name: 'Query 增强', description: 'RAG 检索优化', icon: Search },
    { id: 'plot_director', name: '剧情构思', description: '生成导演指令', icon: BookOpen },
    { id: 'description', name: '描写增强', description: '补充细节描写', icon: PenTool },
];

interface QuickPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QuickPanel({ isOpen, onClose }: QuickPanelProps) {
    const [config, setConfig] = useState<PreprocessingConfig>(
        preprocessor.getConfig() || DEFAULT_PREPROCESSING_CONFIG
    );

    // 刷新配置
    useEffect(() => {
        if (isOpen) {
            setConfig(preprocessor.getConfig() || DEFAULT_PREPROCESSING_CONFIG);
        }
    }, [isOpen]);

    // 切换启用状态
    const handleToggle = useCallback(() => {
        const newEnabled = !config.enabled;
        const newConfig = { ...config, enabled: newEnabled };
        setConfig(newConfig);
        preprocessor.saveConfig(newConfig);
    }, [config]);

    // 切换模式
    const handleModeChange = useCallback((modeId: string) => {
        const newConfig = { ...config, templateId: modeId };
        setConfig(newConfig);
        preprocessor.saveConfig(newConfig);
    }, [config]);

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
                        checked={config.enabled}
                        onChange={handleToggle}
                    />
                </div>

                {/* 模式选择 */}
                {config.enabled && (
                    <div className="space-y-2">
                        <div className="text-xs px-1" style={{ color: 'var(--muted-foreground, #888)' }}>
                            预处理模式
                        </div>
                        <div className="space-y-1">
                            {PREPROCESSING_MODES.map((mode) => {
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

                        {/* 提示：需要创建模板 */}
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
                                需要在 API 配置 → 提示词模板中创建对应分类的模板并启用
                            </span>
                        </div>
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
                    {config.enabled
                        ? `已启用 · ${PREPROCESSING_MODES.find(m => m.id === config.templateId)?.name || config.templateId}`
                        : '预处理已禁用'}
                </div>
            </div>
        </FloatingPanel>
    );
}

export default QuickPanel;

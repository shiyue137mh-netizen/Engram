/**
 * EntityConfigPanel - 实体提取配置面板
 *
 * V0.9.2: 遵循「无框流体」设计，与 SummaryPanel 风格统一
 * - 默认关闭
 * - 顶层开关 + 详细配置
 * - 去卡片化，使用细线分割
 */
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { EntityBuilder, entityBuilder } from "@/modules/memory/EntityExtractor";
import { TextField, NumberField, SwitchField, FormSection } from '@/ui/components/form/FormComponents';
import { Divider } from '@/ui/components/layout/Divider';
import { EntityReviewModal } from './components/EntityReviewModal';
import type { EntityExtractConfig } from '@/config/types/memory';

interface EntityStatus {
    enabled: boolean;
    trigger: string;
    floorInterval: number;
    lastExtractedFloor: number;
    entityCount: number;
    isExtracting: boolean;
}

interface EntityConfigPanelProps {
    config: EntityExtractConfig;
    onChange: (config: EntityExtractConfig) => void;
}

export const EntityConfigPanel: React.FC<EntityConfigPanelProps> = ({ config, onChange }) => {
    const [status, setStatus] = useState<EntityStatus | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 加载状态 (Operational Status)
    const loadStatus = async () => {
        try {
            const s = await entityBuilder.getStatus();
            setStatus(s);
            // Config is managed by parent via props
        } catch (e) {
            console.error('[EntityConfigPanel] Failed to load status:', e);
        }
    };

    useEffect(() => {
        loadStatus();
    }, []);

    // 切换启用状态
    const handleToggleEnabled = () => {
        const newConfig = { ...config, enabled: !config.enabled };
        onChange(newConfig);
        // Runtime update if needed, but optimally should react to config prop change or parent saves
        entityBuilder.updateConfig(newConfig);
    };

    // 更新楼层间隔
    const handleIntervalChange = (value: number) => {
        const newConfig = { ...config, floorInterval: Math.max(2, value) };
        onChange(newConfig);
        entityBuilder.updateConfig(newConfig);
    };

    // 预览弹窗状态
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewData, setReviewData] = useState<{ newEntities: any[], updatedEntities: any[] }>({ newEntities: [], updatedEntities: [] });

    // 手动提取 (带预览)
    const handleManualExtract = async () => {
        setIsLoading(true);
        try {
            // 1. Dry Run
            const result = await entityBuilder.extractManual(true);

            if (result && result.success && (result.newEntities.length > 0 || result.updatedEntities.length > 0)) {
                // 2. Show Preview
                setReviewData({
                    newEntities: result.newEntities,
                    updatedEntities: result.updatedEntities
                });
                setShowReviewModal(true);
            } else if (result && result.success) {
                // No changes
                await loadStatus();
            }
        } catch (e) {
            console.error('[EntityConfigPanel] Manual extraction failed:', e);
        } finally {
            setIsLoading(false);
        }
    };

    // 确认保存
    const handleConfirmReview = async (data: { newEntities: any[], updatedEntities: any[] }) => {
        try {
            await entityBuilder.saveRawEntities(data.newEntities, data.updatedEntities);
            await loadStatus();
        } catch (e) {
            console.error('[EntityConfigPanel] Failed to save reviewed entities:', e);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ========== 左栏：状态监控 ========== */}
            <section className="space-y-8">
                {/* 状态标题 + 刷新 */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">状态监控</h2>
                        <button
                            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                            onClick={loadStatus}
                            title="刷新"
                        >
                            <RefreshCw size={14} />
                        </button>
                    </div>

                    {status ? (
                        <div className="space-y-6">
                            {/* 第一层级：运行状态 + 实体总数 */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">功能状态</span>
                                    <div className={`text-lg font-medium ${config.enabled ? 'text-green-500' : 'text-muted-foreground'}`}>
                                        {config.enabled ? '已启用' : '已禁用'}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">实体总数</span>
                                    <div className="text-3xl font-light text-primary font-mono">{status.entityCount}</div>
                                </div>
                            </div>

                            <Divider length={100} spacing="md" />

                            {/* 第二层级：楼层信息 */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">楼层间隔</span>
                                    <div className="text-xl font-mono text-foreground/80">{status.floorInterval}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1">上次提取楼层</span>
                                    <div className="text-xl font-mono text-foreground/80">{status.lastExtractedFloor}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">加载中...</p>
                    )}
                </div>

                {/* 操作按钮 - 边框样式 */}
                <div className="flex gap-3">
                    <button
                        onClick={handleManualExtract}
                        disabled={isLoading || status?.isExtracting || !config.enabled}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                        {isLoading ? '提取中...' : '手动提取'}
                    </button>
                </div>
            </section>

            {/* ========== 右栏：配置 ========== */}
            <section className="space-y-6 lg:pl-8 relative">
                <Divider responsive length={30} />

                {/* 标题 + 开关 */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-foreground">实体提取</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">从对话中提取角色、地点、物品等实体</p>
                    </div>
                    <SwitchField
                        label=""
                        checked={config.enabled}
                        onChange={handleToggleEnabled}
                    />
                </div>

                <div className={`space-y-6 transition-opacity ${config.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                    {/* 楼层间隔 - 指引式标签 */}
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                            每隔 <span className="text-base font-medium text-foreground mx-0.5">{config.floorInterval}</span> 楼触发一次提取
                        </div>
                        <div className="relative h-4 flex items-center group cursor-pointer">
                            {/* 极简滑块轨道 */}
                            <div className="absolute inset-x-0 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
                            {/* Thumb */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground"
                                style={{ left: `${((config.floorInterval - 2) / (100 - 2)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                            />
                            <input
                                type="range"
                                min={2}
                                max={100}
                                step={5}
                                value={config.floorInterval}
                                onChange={(e) => handleIntervalChange(parseInt(e.target.value))}
                                className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
                                style={{ appearance: 'none', WebkitAppearance: 'none' }}
                            />
                        </div>
                    </div>

                    {/* 说明 */}
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">
                        实体提取会从对话中识别并提取角色、地点、物品等关键信息，用于构建知识图谱。
                    </p>
                </div>
            </section>

            {/* 预览弹窗 */}
            <EntityReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                onConfirm={handleConfirmReview}
                newEntities={reviewData.newEntities}
                updatedEntities={reviewData.updatedEntities}
            />
        </div>
    );
};


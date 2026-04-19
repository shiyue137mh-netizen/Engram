import React from 'react';
import { useConfigStore } from "@/state/configStore";
import { Switch } from "@/ui/components/core/Switch";
import { Brain, Eye, ShieldCheck } from 'lucide-react';
import { entityBuilder, summarizerService } from "@/modules/memory";
import { preprocessor } from "@/modules/preprocessing";

export const FeaturesTab: React.FC = () => {
    const { 
        summarizerConfig, 
        preprocessingConfig, 
        entityExtractConfig,
        globalPreviewEnabled,
        updateConfig 
    } = useConfigStore();

    const previewEnabled = summarizerConfig?.previewEnabled ?? true;
    const preprocessingPreviewEnabled = preprocessingConfig?.preview ?? true;
    const entityPreviewEnabled = entityExtractConfig?.previewEnabled ?? true;

    return (
        <div className="space-y-8 animate-in fade-in">
            {/* 全局控制 */}
            <section>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">预览与审核总控</h3>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="p-2 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-heading truncate">启用预览修订模式 (全局)</h4>
                                <p className="text-sm text-meta line-clamp-2">总开关。关闭后将跳过所有自动触发的修订窗口</p>
                            </div>
                        </div>
                        <Switch
                            checked={globalPreviewEnabled}
                            onChange={(checked) => updateConfig('globalPreviewEnabled', checked)}
                        />
                    </div>
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">自动触发审核项</h3>
                    {!globalPreviewEnabled && (
                        <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20">已由全局开关禁用</span>
                    )}
                </div>

                <div className="space-y-3">
                    {/* 总结预览 */}
                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                    <Brain size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-heading truncate">总结修订模式</h4>
                                    <p className="text-sm text-meta line-clamp-2">在写入长期记忆前，弹出预览窗口</p>
                                </div>
                            </div>
                            <Switch
                                disabled={!globalPreviewEnabled}
                                checked={previewEnabled}
                                onChange={(checked) => {
                                    updateConfig('summarizerConfig', { ...summarizerConfig, previewEnabled: checked });
                                    summarizerService.updateConfig({ previewEnabled: checked });
                                }}
                            />
                        </div>
                    </div>

                    {/* 实体预览 */}
                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                    <Eye size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-heading truncate">实体提取修订模式</h4>
                                    <p className="text-sm text-meta line-clamp-2">检测到新实体时，弹出确认窗口</p>
                                </div>
                            </div>
                            <Switch
                                disabled={!globalPreviewEnabled}
                                checked={entityPreviewEnabled}
                                onChange={(checked) => {
                                    const newConfig = { ...entityExtractConfig, previewEnabled: checked };
                                    updateConfig('entityExtractConfig', newConfig);
                                    entityBuilder.updateConfig(newConfig);
                                }}
                            />
                        </div>
                    </div>

                    {/* 预处理预览 */}
                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                    <Eye size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-heading truncate">预处理修订模式</h4>
                                    <p className="text-sm text-meta line-clamp-2">在注入用户输入前，弹出预览窗口</p>
                                </div>
                            </div>
                            <Switch
                                disabled={!globalPreviewEnabled}
                                checked={preprocessingPreviewEnabled}
                                onChange={(checked) => {
                                    const newConfig = { ...preprocessingConfig, preview: checked };
                                    updateConfig('preprocessingConfig', newConfig as any);
                                    preprocessor.saveConfig(newConfig as any);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

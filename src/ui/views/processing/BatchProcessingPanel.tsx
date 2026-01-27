/**
 * BatchProcessingPanel - 批量处理面板
 *
 * V0.9.6: Processing 子面板
 * - 历史消息批处理
 * - 外部 txt 导入
 */
import React, { useState, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Upload, FileText, RefreshCw, CheckCircle2, XCircle, Clock, Square } from 'lucide-react';
import { Divider } from '@/ui/components/layout/Divider';
import { FormSection, NumberField } from '@/ui/components/form/FormComponents';
import { batchProcessor, type HistoryAnalysis, type ImportMode } from '@/modules/batch';
import { summarizerService } from '@/modules/memory';
import { useWorkflow } from '@/ui/hooks/useWorkflow';

// 任务状态图标
const TaskStatusIcon: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case 'done':
            return <CheckCircle2 size={14} className="text-green-500" />;
        case 'error':
            return <XCircle size={14} className="text-red-500" />;
        case 'running':
            return <RefreshCw size={14} className="text-primary animate-spin" />;
        case 'skipped':
            return <Clock size={14} className="text-muted-foreground" />;
        default:
            return <Clock size={14} className="text-muted-foreground/50" />;
    }
};

// 任务类型中文映射
const TASK_TYPE_LABELS: Record<string, string> = {
    summary: '剧情总结',
    entity: '实体提取',
    trim: '事件精简',
    embed: '向量化',
};

export const BatchProcessingPanel: React.FC = () => {
    // 使用 Workflow Hook
    const {
        status: workflowStatus,
        queue,
        progress: workflowProgress, // 0-100
        start,
        pause,
        resume,
        stop,
        clear
    } = useWorkflow();

    // 文件选择器引用
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 历史批处理状态
    const [analysis, setAnalysis] = useState<HistoryAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [startFloor, setStartFloor] = useState(0);
    const [endFloor, setEndFloor] = useState<number>(summarizerService.getStatus().currentFloor || 0);

    // 外部导入状态
    const [importMode, setImportMode] = useState<ImportMode>('detailed');
    const [chunkSize, setChunkSize] = useState(2000);
    const [overlapSize, setOverlapSize] = useState(200);
    const [importText, setImportText] = useState('');
    const [importProgress, setImportProgress] = useState<{ current: number; total: number } | null>(null);

    // 任务类型选择
    const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
        summary: true,
        entity: true,
        trim: true,
        embed: true
    });

    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    // 分析历史
    const handleAnalyze = useCallback(async () => {
        setIsAnalyzing(true);
        try {
            // Convert selection map to array
            const types = Object.entries(selectedTypes)
                .filter(([_, enabled]) => enabled)
                .map(([type]) => type) as any[];

            const result = await batchProcessor.analyzeHistory(startFloor, endFloor, types);
            setAnalysis(result);
            setEndFloor(result.endFloor);
        } catch (error) {
            console.error('[BatchPanel] Analyze failed:', error);
        } finally {
            setIsAnalyzing(false);
        }
    }, [startFloor, endFloor, selectedTypes]);

    // 开始批处理
    const handleStart = useCallback(async () => {
        if (!analysis) return;
        const types = Object.entries(selectedTypes)
            .filter(([_, enabled]) => enabled)
            .map(([type]) => type) as any[];

        await batchProcessor.start(analysis.startFloor, analysis.endFloor, undefined, types);
        // useWorkflow 会自动更新状态
    }, [analysis, selectedTypes]);

    // 暂停/恢复
    const handlePauseResume = useCallback(() => {
        if (queue.isPaused) resume();
        else pause();
    }, [queue.isPaused, resume, pause]);

    // 停止
    const handleStop = useCallback(() => stop(), [stop]);

    // 重置
    const handleReset = useCallback(() => {
        clear();
        setAnalysis(null);
    }, [clear]);

    // 导入外部文本
    const handleImport = useCallback(async () => {
        if (!importText.trim()) return;

        try {
            const result = await batchProcessor.importText(
                importText,
                { mode: importMode, chunkSize, overlapSize },
                (q) => {
                    // 更新本地导入进度，获得更平滑的反馈
                    if (q.tasks[0]) {
                        setImportProgress(q.tasks[0].progress);
                    }
                }
            );
            alert(`导入完成：${result.success} 成功，${result.failed} 失败`);
        } catch (e) {
            console.error('Import failed', e);
            alert('导入失败');
        } finally {
            setImportProgress(null);
        }
    }, [importText, importMode, chunkSize, overlapSize]);

    // 文件选择
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => setImportText(event.target?.result as string || '');
        reader.readAsText(file);
    }, []);

    // 触发文件选择对话框
    const triggerFileSelect = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    // 计算进度百分比
    const overallPercent = queue?.overallProgress && queue.overallProgress.total > 0
        ? Math.round((queue.overallProgress.current / queue.overallProgress.total) * 100)
        : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ========== 左栏：历史消息批处理 ========== */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-sm font-medium text-foreground mb-1">历史消息批处理</h2>
                    <p className="text-xs text-muted-foreground">根据当前配置处理历史聊天记录</p>
                </div>

                {/* 范围设置 */}
                <div className="grid grid-cols-2 gap-6">
                    <NumberField
                        label="起始楼层"
                        value={startFloor}
                        onChange={setStartFloor}
                        min={0}
                        max={endFloor}
                        step={1}
                        showSlider={false}
                    />
                    <NumberField
                        label="结束楼层"
                        value={endFloor}
                        onChange={setEndFloor}
                        min={startFloor}
                        step={1}
                        showSlider={false}
                    />
                </div>

                {/* 任务类型选择 (Checkbox Grid) */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-muted/10 rounded-lg border border-border/50">
                    <span className="col-span-2 text-xs text-muted-foreground font-medium mb-1">选择任务类型</span>
                    {Object.entries(TASK_TYPE_LABELS).map(([type, label]) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary focus:ring-primary h-3.5 w-3.5"
                                checked={selectedTypes[type]}
                                onChange={() => handleTypeToggle(type)}
                                disabled={queue.isRunning}
                            />
                            <span className="text-sm text-foreground">{label}</span>
                        </label>
                    ))}
                </div>

                {/* 分析按钮 */}
                <button
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || queue.isRunning}
                >
                    <RefreshCw size={14} className={isAnalyzing ? 'animate-spin' : ''} />
                    {isAnalyzing ? '分析中...' : '分析任务'}
                </button>

                {/* 分析结果 */}
                {analysis && (
                    <>
                        <Divider length={100} spacing="md" />

                        <div className="space-y-4">
                            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">预计任务队列</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">① 剧情总结</span>
                                    <span className="font-mono text-foreground">{analysis.summaryTasks} 次</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">② 实体提取</span>
                                    <span className="font-mono text-foreground">{analysis.entityTasks} 次</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">③ 事件精简</span>
                                    <span className="font-mono text-foreground">~{analysis.trimTasks} 次</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">④ 向量化</span>
                                    <span className="font-mono text-foreground">~{analysis.embedTasks} 条</span>
                                </div>
                                <Divider length={30} spacing="sm" />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">预计 Token</span>
                                    <span className="font-mono text-primary">~{(analysis.estimatedTokens / 1000).toFixed(0)}k</span>
                                </div>
                            </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex gap-3 flex-wrap">
                            {!queue.isRunning ? (
                                <button
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                    onClick={handleStart}
                                >
                                    <Play size={14} />
                                    开始批处理
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                                        onClick={handlePauseResume}
                                    >
                                        {queue.isPaused ? <Play size={14} /> : <Pause size={14} />}
                                        {queue.isPaused ? '继续' : '暂停'}
                                    </button>
                                    <button
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg transition-colors"
                                        onClick={handleStop}
                                    >
                                        <Square size={14} />
                                        停止
                                    </button>
                                </>
                            )}
                            {queue && !queue.isRunning && (
                                <button
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                                    onClick={handleReset}
                                >
                                    <RotateCcw size={14} />
                                    重置
                                </button>
                            )}
                        </div>

                        {/* 进度显示 */}
                        {queue && (queue.isRunning || queue.tasks.length > 0) && (
                            <div className="space-y-3">
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-300"
                                        style={{ width: `${overallPercent}%` }}
                                    />
                                </div>
                                <div className="text-xs text-muted-foreground text-center">
                                    {overallPercent}% - {queue.currentTaskIndex}/{queue.overallProgress.total} 任务
                                </div>

                                {/* 任务列表 */}
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {queue.tasks.slice(0, 10).map((task) => (
                                        <div key={task.id} className="flex items-center gap-2 text-xs">
                                            <TaskStatusIcon status={task.status} />
                                            <span className={task.status === 'running' ? 'text-foreground' : 'text-muted-foreground'}>
                                                {TASK_TYPE_LABELS[task.type] || task.type}
                                            </span>
                                            {task.floorRange && (
                                                <span className="text-muted-foreground/50 font-mono">
                                                    #{task.floorRange.start}-{task.floorRange.end}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                    {queue.tasks.length > 10 && (
                                        <div className="text-xs text-muted-foreground/50">
                                            ...还有 {queue.tasks.length - 10} 个任务
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* ========== 右栏：外部导入 ========== */}
            <section className="space-y-6 lg:pl-8 relative">
                <Divider responsive length={30} />

                <div>
                    <h2 className="text-sm font-medium text-foreground mb-1">外部文本导入</h2>
                    <p className="text-xs text-muted-foreground">导入小说、电子书等外部文本</p>
                </div>

                {/* 文件选择 - 隐藏的 input + 按钮触发 */}
                <div className="flex items-center gap-3">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.md"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                        onClick={triggerFileSelect}
                    >
                        <Upload size={14} />
                        选择文件
                    </button>
                    {importText && (
                        <span className="text-xs text-muted-foreground">
                            已加载 {(importText.length / 1024).toFixed(1)} KB
                        </span>
                    )}
                </div>

                {/* 处理模式 */}
                <div className="space-y-3">
                    <span className="text-xs text-muted-foreground">处理模式</span>
                    <div className="space-y-2">
                        <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setImportMode('fast')}>
                            <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${importMode === 'fast' ? 'border-primary bg-primary' : 'border-border group-hover:border-muted-foreground'}`}>
                                {importMode === 'fast' && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                            </span>
                            <div>
                                <span className={`text-sm ${importMode === 'fast' ? 'text-foreground' : 'text-muted-foreground'}`}>快速模式</span>
                                <p className="text-[10px] text-muted-foreground">按字数分块 → 直接向量化（不调用 LLM）</p>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setImportMode('detailed')}>
                            <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${importMode === 'detailed' ? 'border-primary bg-primary' : 'border-border group-hover:border-muted-foreground'}`}>
                                {importMode === 'detailed' && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                            </span>
                            <div>
                                <span className={`text-sm ${importMode === 'detailed' ? 'text-foreground' : 'text-muted-foreground'}`}>精细模式</span>
                                <p className="text-[10px] text-muted-foreground">按字数分块 → LLM 总结 → 向量化</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* 分块设置 */}
                <div className="grid grid-cols-2 gap-6">
                    <NumberField
                        label="块大小（字）"
                        value={chunkSize}
                        onChange={setChunkSize}
                        min={100}
                        max={10000}
                        step={100}
                        showSlider={false}
                    />
                    <NumberField
                        label="重叠（字）"
                        value={overlapSize}
                        onChange={setOverlapSize}
                        min={0}
                        max={chunkSize / 2}
                        step={50}
                        showSlider={false}
                    />
                </div>

                {/* 预览 */}
                {importText && (
                    <div>
                        <span className="text-xs text-muted-foreground block mb-2">预览</span>
                        <div className="bg-muted/20 border border-border rounded-lg p-3 max-h-32 overflow-y-auto text-xs text-muted-foreground font-mono">
                            {importText.slice(0, 500)}...
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1">
                            预计 {Math.ceil((importText.length - overlapSize) / (chunkSize - overlapSize))} 块
                        </div>
                    </div>
                )}

                {/* 导入按钮 */}
                <button
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    onClick={handleImport}
                    disabled={!importText || (importProgress !== null)}
                >
                    <FileText size={14} />
                    {importProgress ? `导入中 ${importProgress.current}/${importProgress.total}` : '开始导入'}
                </button>

                {/* 导入进度 */}
                {importProgress && (
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${(importProgress.current / importProgress.total) * 100}%` }}
                        />
                    </div>
                )}
            </section>
        </div>
    );
};


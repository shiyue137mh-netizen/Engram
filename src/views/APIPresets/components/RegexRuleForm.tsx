/**
 * RegexRuleForm - 正则规则编辑表单
 */
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Play, Info } from 'lucide-react';
import type { RegexRule } from '../../../core/summarizer/RegexProcessor';
import { RegexProcessor } from '../../../core/summarizer/RegexProcessor';

interface RegexRuleFormProps {
    rule: RegexRule;
    onChange: (updates: Partial<RegexRule>) => void;
}

const FLAGS_OPTIONS = [
    { value: 'g', label: '全局匹配', description: '匹配所有结果' },
    { value: 'i', label: '忽略大小写', description: '不区分大小写' },
    { value: 'm', label: '多行模式', description: '^$ 匹配每行' },
    { value: 's', label: '点号匹配换行', description: '. 匹配换行符' },
];

export const RegexRuleForm: React.FC<RegexRuleFormProps> = ({ rule, onChange }) => {
    const [testInput, setTestInput] = useState('');
    const [testOutput, setTestOutput] = useState('');
    const [validation, setValidation] = useState<{ valid: boolean; error?: string }>({ valid: true });

    const processor = new RegexProcessor();

    // 验证正则表达式
    useEffect(() => {
        const result = processor.validatePattern(rule.pattern, rule.flags);
        setValidation(result);
    }, [rule.pattern, rule.flags]);

    // 更新测试输出
    useEffect(() => {
        if (testInput && validation.valid) {
            const output = processor.processWithRule(testInput, rule);
            setTestOutput(output);
        } else {
            setTestOutput('');
        }
    }, [testInput, rule, validation.valid]);

    const handleFlagToggle = (flag: string) => {
        const currentFlags = rule.flags.split('');
        const index = currentFlags.indexOf(flag);
        if (index >= 0) {
            currentFlags.splice(index, 1);
        } else {
            currentFlags.push(flag);
        }
        onChange({ flags: currentFlags.join('') });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* 基本信息 */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">规则名称</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={rule.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                        placeholder="例如：移除思维链"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">描述（可选）</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={rule.description || ''}
                        onChange={(e) => onChange({ description: e.target.value })}
                        placeholder="简短描述此规则的用途"
                    />
                </div>
            </div>

            {/* 正则表达式 */}
            <div className="flex flex-col gap-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-foreground">正则表达式</label>
                        {validation.valid ? (
                            <CheckCircle size={14} className="text-green-500" />
                        ) : (
                            <AlertCircle size={14} className="text-red-500" />
                        )}
                    </div>
                    <input
                        type="text"
                        className={`w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${validation.valid ? 'border-input focus:ring-ring' : 'border-red-500 focus:ring-red-500'
                            }`}
                        value={rule.pattern}
                        onChange={(e) => onChange({ pattern: e.target.value })}
                        placeholder="例如：<think>[\s\S]*?</think>"
                    />
                    {!validation.valid && validation.error && (
                        <p className="text-xs text-red-500">{validation.error}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">替换为</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={rule.replacement}
                        onChange={(e) => onChange({ replacement: e.target.value })}
                        placeholder="留空表示删除匹配内容"
                    />
                </div>

                {/* 标志选择 */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">匹配选项</label>
                    <div className="flex flex-wrap gap-2">
                        {FLAGS_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                className={`px-2 py-1 text-xs rounded-md border transition-colors ${rule.flags.includes(opt.value)
                                        ? 'bg-primary-20 border-primary text-primary'
                                        : 'bg-background border-border text-muted-foreground hover:bg-muted'
                                    }`}
                                onClick={() => handleFlagToggle(opt.value)}
                                title={opt.description}
                            >
                                {opt.label} ({opt.value})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 测试区域 */}
            <div className="flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Play size={14} />
                    测试正则
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-muted-foreground">输入文本</label>
                    <textarea
                        className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        placeholder="在此输入测试文本，例如：&#10;<think>这是思考内容</think>&#10;正常对话内容"
                    />
                </div>

                {testInput && validation.valid && (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">处理结果</label>
                        <div className="min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap">
                            {testOutput || <span className="text-muted-foreground italic">（无内容）</span>}
                        </div>
                    </div>
                )}
            </div>

            {/* 提示 */}
            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400">
                <Info size={16} className="shrink-0 mt-0.5" />
                <div>
                    正则规则会在发送给 LLM 之前应用于聊天内容，用于清理干扰信息。
                    常用规则如移除思维链 <code className="bg-blue-500/20 px-1 rounded">&lt;think&gt;</code> 标签等。
                </div>
            </div>
        </div>
    );
};

export default RegexRuleForm;

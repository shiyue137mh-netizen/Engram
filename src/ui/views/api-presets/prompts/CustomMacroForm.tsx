/**
 * CustomMacroForm - 自定义宏编辑表单
 * V0.9.2: 右侧详情页编辑（类似提示词模板）
 */
import React from 'react';
import { TextField, FormSection } from '@/ui/components/form/FormComponents';
import type { CustomMacro } from '@/config/types/prompt';

interface CustomMacroFormProps {
    macro: CustomMacro;
    onChange: (updates: Partial<CustomMacro>) => void;
}

export const CustomMacroForm: React.FC<CustomMacroFormProps> = ({
    macro,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-4">
            {/* 基本信息 */}
            <FormSection title="基本信息">
                <TextField
                    label="宏名称"
                    value={macro.name}
                    onChange={(value) => onChange({ name: value })}
                    placeholder="输入宏名称（不含花括号）"
                    required
                    description="在模板中使用 {{宏名称}} 引用"
                />
            </FormSection>

            {/* 宏内容 */}
            <FormSection title="宏内容">
                <TextField
                    label="内容"
                    value={macro.content}
                    onChange={(value) => onChange({ content: value })}
                    placeholder="输入宏内容（可为空，用户自行填写）"
                    multiline
                    rows={8}
                />
            </FormSection>

            {/* 使用说明 */}
            <div className="px-3 py-2 bg-muted/30 rounded border border-border">
                <div className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider">使用方式</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                    <p>在任意提示词模板中使用 <code className="px-1 py-0.5 bg-muted rounded text-primary font-mono">{`{{${macro.name || '宏名称'}}}`}</code> 即可引用此宏的内容。</p>
                    <p className="mt-1">宏内容会在每次刷新缓存时自动同步到 SillyTavern 宏系统。</p>
                </div>
            </div>
        </div>
    );
};

export default CustomMacroForm;

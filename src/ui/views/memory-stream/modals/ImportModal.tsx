import { SimpleModal } from '@/ui/components/feedback/SimpleModal';
import { Database } from 'lucide-react';
import React from 'react';

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExecute: () => void;
    availableDbs: string[];
    selectedDb: string;
    onSelectDb: (dbName: string) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
    isOpen,
    onClose,
    onExecute,
    availableDbs,
    selectedDb,
    onSelectDb
}) => {
    return (
        <SimpleModal
            isOpen={isOpen}
            onClose={onClose}
            title="合并历史数据库"
            icon={<Database size={16} />}
            footer={
                <div className="flex justify-end gap-2 w-full">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                    >
                        取消
                    </button>
                    <button
                        onClick={onExecute}
                        disabled={availableDbs.length === 0}
                        className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 transition-colors"
                    >
                        执行穿梭合并
                    </button>
                </div>
            }
        >
            <div className="p-4 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                    基于全新的绝对时间单库对齐架构，您可以无缝、极速地将旧存档（或其他聊天）的底层知识与历史事迹全盘并入当前聊天中！
                </p>

                {availableDbs.length === 0 ? (
                    <div className="p-4 border border-dashed border-border/50 rounded text-center text-sm text-muted-foreground bg-muted/20">
                        未找到其他 Engram 历史数据库
                    </div>
                ) : (
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-foreground">选择要合并提取的底层库源：</label>
                        <select
                            value={selectedDb}
                            onChange={(e) => onSelectDb(e.target.value)}
                            className="w-full p-2 text-sm bg-background border border-border rounded focus:ring-1 focus:ring-primary outline-none text-foreground"
                        >
                            {availableDbs.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </SimpleModal>
    );
};

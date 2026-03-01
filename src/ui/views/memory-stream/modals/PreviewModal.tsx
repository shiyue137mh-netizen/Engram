import { SimpleModal } from '@/ui/components/feedback/SimpleModal';
import { FileText } from 'lucide-react';
import React from 'react';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, content }) => {
    return (
        <SimpleModal
            isOpen={isOpen}
            onClose={onClose}
            title="宏注入预览 (Active Injection)"
            icon={<FileText size={16} />}
            maxWidth="max-w-2xl"
            footer={
                <div className="text-[10px] text-muted-foreground">
                    *此内容为 {'{{engramSummaries}}'} 和 {'{{engramEntityStates}}'} 宏在当前上下文中的实际输出值
                </div>
            }
        >
            <div className="p-4">
                <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded border border-border/50">
                    {content}
                </pre>
            </div>
        </SimpleModal>
    );
};

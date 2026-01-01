import React from 'react';
import { PageTitle } from "@/components/common/PageTitle";
import { Brain } from 'lucide-react';

export const MemoryStream: React.FC = () => {
    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle title="记忆流" subtitle="查看和管理记忆碎片" />
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
                <Brain size={48} className="opacity-20" />
                <p>记忆流功能正在开发中...</p>
            </div>
        </div>
    );
};

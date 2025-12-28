import React from 'react';
import { PageTitle } from '../components/PageTitle';
import { Cpu } from 'lucide-react';

export const Processing: React.FC = () => {
    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle title="处理队列" subtitle="后台任务监控" />
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
                <Cpu size={48} className="opacity-20" />
                <p>处理队列功能正在开发中...</p>
            </div>
        </div>
    );
};

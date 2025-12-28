import React from 'react';
import { PageTitle } from '../components/PageTitle';
import { Settings as SettingsIcon } from 'lucide-react';
import { ThemeSelector } from './components/ThemeSelector';

export const Settings: React.FC = () => {
    return (
        <div className="flex flex-col h-full animate-in fade-in">
            <PageTitle title="设置" subtitle="扩展全局选项" />
            <div className="p-6">
                <ThemeSelector />

                {/* Future settings sections can go here */}
                <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50">
                        <SettingsIcon size={32} />
                        <p className="text-sm">更多设置开发中...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

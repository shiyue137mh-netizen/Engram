import React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface TabPillsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
}

export const TabPills: React.FC<TabPillsProps> = ({ tabs, activeTab, onChange }) => (
    <div className="flex overflow-x-auto gap-2 mb-8 pb-1 no-scrollbar px-4 md:px-0 border-b border-border">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`whitespace-nowrap px-4 py-2 text-sm transition-all relative ${activeTab === tab.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
            >
                {tab.label}
                {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]"></div>
                )}
            </button>
        ))}
    </div>
);

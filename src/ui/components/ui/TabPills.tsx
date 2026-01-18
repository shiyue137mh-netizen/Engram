/**
 * TabPills - 主导航标签组件
 * 支持 sticky 固定在页面顶部
 * 支持右侧 actions 插槽
 */
import React from 'react';


export interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface TabPillsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
    sticky?: boolean;
    top?: number | string; // 允许自定义吸顶距离
    className?: string;
    actions?: React.ReactNode; // 右侧操作区域
}

export const TabPills: React.FC<TabPillsProps> = ({ tabs, activeTab, onChange, sticky = true, top = 0, className = '', actions }) => (
    <div
        className={`
            flex items-center justify-between gap-4 mb-6 border-b border-border
            ${sticky ? 'glass-sticky sticky z-20 pt-4 pb-0 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12' : 'px-0'}
            ${className}
        `}
        style={sticky ? {
            top
        } : undefined}
    >
        {/* 左侧 Tabs (充当当前页面的标签页功能）*/}
        <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`flex items-center gap-2 whitespace-nowrap px-4 py-1.5 text-sm transition-all relative ${activeTab === tab.id
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)] z-10 transition-all duration-300"></div>
                    )}
                </button>
            ))}
        </div>

        {/* 右侧操作区域 */}
        {actions && (
            <div className="flex items-center gap-2 pb-1 shrink-0">
                {actions}
            </div>
        )}
    </div>
);


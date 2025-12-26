import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    subtext?: string;
    highlight?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    icon: Icon,
    subtext,
    highlight = false
}) => {
    return (
        <div className={`engram-stats-card ${highlight ? 'highlight' : ''}`}>
            <div className="stats-header">
                <div className="stats-icon-wrapper">
                    <Icon size={20} />
                </div>
                {highlight && <div className="stats-pulse"></div>}
            </div>
            <div className="stats-content">
                <div className="stats-value">{value}</div>
                <div className="stats-title">{title}</div>
                {subtext && <div className="stats-subtext">{subtext}</div>}
            </div>
        </div>
    );
};

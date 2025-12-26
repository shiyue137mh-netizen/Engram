// 世界图谱视图
import React from 'react';
import { Network } from 'lucide-react';

export const GraphView: React.FC = () => {
    return (
        <div className="engram-graph-view">
            <div className="engram-page-header">
                <Network size={24} />
                <h2>世界图谱</h2>
            </div>
            <div className="engram-page-content">
                <p className="engram-placeholder">React Flow 图谱编辑器将在这里展示...</p>
                {/* TODO: React Flow 画布 */}
            </div>
        </div>
    );
};

export default GraphView;

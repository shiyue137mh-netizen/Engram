// 记忆流视图
import React from 'react';
import { Clock } from 'lucide-react';

export const MemoryStream: React.FC = () => {
    return (
        <div className="engram-memory-stream">
            <div className="engram-page-header">
                <Clock size={24} />
                <h2>记忆流</h2>
            </div>
            <div className="engram-page-content">
                <p className="engram-placeholder">记忆时间轴将在这里展示...</p>
                {/* TODO: 记忆卡片列表 */}
            </div>
        </div>
    );
};

export default MemoryStream;

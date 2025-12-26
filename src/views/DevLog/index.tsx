// 开发日志视图
import React from 'react';
import { Terminal } from 'lucide-react';

export const DevLog: React.FC = () => {
    return (
        <div className="engram-dev-log">
            <div className="engram-page-header">
                <Terminal size={24} />
                <h2>开发日志</h2>
            </div>
            <div className="engram-page-content">
                <div className="engram-log-container">
                    <p className="engram-placeholder">日志输出将在这里显示...</p>
                    {/* TODO: 日志列表 */}
                </div>
            </div>
        </div>
    );
};

export default DevLog;

// API 预设管理视图，用于管理提示词预设和模型api
import React from 'react';
import { Key } from 'lucide-react';

export const APIPresets: React.FC = () => {
    return (
        <div className="engram-api-presets">
            <div className="engram-page-header">
                <Key size={24} />
                <h2>API 预设</h2>
            </div>
            <div className="engram-page-content">
                <p className="engram-placeholder">API 和 预设配置将在这里管理...</p>
                {/* TODO: API 预设列表和编辑器 */}
            </div>
        </div>
    );
};

export default APIPresets;

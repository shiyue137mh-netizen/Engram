// 设置页面视图
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
    return (
        <div className="engram-settings">
            <div className="engram-page-header">
                <SettingsIcon size={24} />
                <h2>设置</h2>
            </div>
            <div className="engram-page-content">
                <p className="engram-placeholder">设置选项将在这里展示...</p>
                {/* TODO: 设置选项 */}
            </div>
        </div>
    );
};

export default Settings;

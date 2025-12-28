import React, { useState } from 'react';
import { MainLayout } from './views/Layout/MainLayout';
// Import Views
import { Dashboard } from './views/Dashboard';
import { GraphView } from './views/Graph';
import { DevLog } from './views/DevLog';
import { APIPresets } from './views/APIPresets/APIPresetsView';
import { Settings } from './views/Settings';
import { MemoryStream } from './views/MemoryStream';
import { Processing } from './views/Processing';

interface AppProps {
    onClose: () => void;
}

export const App: React.FC<AppProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard onNavigate={setActiveTab} />;
            case 'presets':
                return <APIPresets />;
            case 'graph':
                return <GraphView />;
            case 'devlog':
                return <DevLog />;
            case 'settings':
                return <Settings />;
            case 'memory':
                return <MemoryStream />;
            case 'processing':
                return <Processing />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <MainLayout activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose}>
            {renderContent()}
        </MainLayout>
    );
};

export default App;

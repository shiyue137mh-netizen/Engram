import React from 'react';

export const NeuralOrb: React.FC = () => {
    return (
        <div className="engram-neural-orb-wrapper">
            <div className="engram-neural-orb">
                <div className="orb-core"></div>
                <div className="orb-ring ring-1"></div>
                <div className="orb-ring ring-2"></div>
                <div className="orb-particles"></div>
            </div>
            <div className="engram-neural-status">
                <span className="status-dot"></span>
                SYSTEM ONLINE
            </div>
        </div>
    );
};

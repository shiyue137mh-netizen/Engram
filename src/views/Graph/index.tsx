import React, { useState } from 'react';
import { Plus, Maximize2, Settings2, Terminal, Cpu, Database, Play } from 'lucide-react';
import { PageTitle } from "@/components/common/PageTitle";
import { ModernButton } from "@/components/ui/Button";

const SimulatedReactFlow = () => {
    // Simple state to simulate dragging (visual only for mockup)
    const [nodes] = useState([
        { id: '1', x: 250, y: 150, label: 'User Input', type: 'input' },
        { id: '2', x: 250, y: 300, label: 'Memory Retriever', type: 'process' },
        { id: '3', x: 100, y: 450, label: 'Summary Agent', type: 'output' },
        { id: '4', x: 400, y: 450, label: 'Context Builder', type: 'output' },
    ]);

    // Mock edges
    const edges = [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
        { source: '2', target: '4' },
    ];

    return (
        <div className="h-full flex flex-col relative bg-card rounded-xl overflow-hidden border border-border shadow-inner group">
            {/* 1. Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#555 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* 2. Controls Overlay */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors"><Plus size={16} /></button>
                <button className="p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors"><Maximize2 size={16} /></button>
                <button className="p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors"><Settings2 size={16} /></button>
            </div>

            <div className="absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                Render Engine: Mock 1.0
            </div>

            {/* 3. Canvas Area */}
            <svg className="w-full h-full pointer-events-none">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" opacity="0.5" />
                    </marker>
                </defs>
                {edges.map((edge, i) => {
                    const source = nodes.find(n => n.id === edge.source);
                    const target = nodes.find(n => n.id === edge.target);
                    if (!source || !target) return null;

                    // Bezier curve calculation
                    const startX = source.x + 150 / 2; // center width
                    const startY = source.y + 60;   // bottom
                    const endX = target.x + 150 / 2;
                    const endY = target.y;          // top

                    const path = `M ${startX} ${startY} C ${startX} ${startY + 50}, ${endX} ${endY - 50}, ${endX} ${endY}`;

                    return (
                        <g key={i}>
                            <path d={path} stroke="#3b82f6" strokeWidth="1.5" fill="none" className="opacity-40" markerEnd="url(#arrowhead)" />
                        </g>
                    );
                })}
            </svg>

            {/* 4. Interactive Nodes */}
            {nodes.map(node => (
                <div
                    key={node.id}
                    className="absolute w-[150px] group/node cursor-grab active:cursor-grabbing"
                    style={{ left: node.x, top: node.y }}
                >
                    {/* Node Handles */}
                    {node.type !== 'input' && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10"></div>}
                    {node.type !== 'output' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10"></div>}

                    {/* Node Body */}
                    <div className={`
                        bg-background/90 border rounded-md p-3 backdrop-blur-sm transition-all duration-300
                        ${node.type === 'input'
                            ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                            : 'border-border group-hover/node:border-border shadow-lg'}
                    `}>
                        <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-2 font-bold">{node.type}</div>
                        <div className="text-xs text-foreground font-medium flex items-center gap-2">
                            {node.type === 'input' && <Terminal size={12} className="text-blue-400" />}
                            {node.type === 'process' && <Cpu size={12} className="text-purple-400" />}
                            {node.type === 'output' && <Database size={12} className="text-emerald-400" />}
                            {node.label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const GraphView = () => {
    return (
        <div className="h-[calc(100vh-140px)] animate-in fade-in flex flex-col">
            <PageTitle
                title="神经图谱"
                subtitle="知识节点可视化"
                actions={
                    <div className="flex gap-2">
                        <ModernButton icon={Play} label="Auto Layout" size="sm" />
                        <ModernButton icon={Settings2} label="Config" size="sm" />
                    </div>
                }
            />
            <div className="flex-1 pb-4 min-h-0">
                <SimulatedReactFlow />
            </div>
        </div>
    );
};

export default GraphView;

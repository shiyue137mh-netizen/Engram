import React, { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard,
    BrainCircuit,
    Network,
    Settings2,
    Database,
    Terminal,
    Menu,
    X,
    Search,
    ChevronRight,
    Plus,
    Play,
    Save,
    Trash2,
    RefreshCw,
    Cpu,
    Layers,
    Maximize2,
    Code2,
    Variable,
    Regex,
    MessageSquare,
    Clock,
    Zap,
    MoreVertical,
    CheckCircle2,
    XCircle
} from 'lucide-react';

// --- Font Injection & Global Styles ---
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    
    /* Custom Scrollbar for dark theme */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #3f3f46;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #52525b;
    }

    /* Animation Utilities */
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `}</style>
);

// --- Types & Mock Data ---

const NAV_ITEMS = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'memory', label: '记忆流', icon: BrainCircuit },
    { id: 'graph', label: '神经图谱', icon: Network }, // Will use simulated ReactFlow
    { id: 'processing', label: '数据处理', icon: Cpu },
    { id: 'presets', label: 'API 预设', icon: Database }, // Will include Prompt/Regex Editor
    { id: 'devlog', label: '开发日志', icon: Terminal }, // Will include Model Log
    { id: 'settings', label: '系统设置', icon: Settings2 },
];

// --- Shared Components ---

const PageTitle = ({ title, subtitle, actions }: { title: string; subtitle?: string, actions?: React.ReactNode }) => (
    <div className="mb-8 px-4 md:px-0 flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-light tracking-tight text-zinc-100">{title}</h1>
            {subtitle && <p className="mt-2 text-zinc-500 text-sm font-light">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
    </div>
);

const ModernButton = ({ icon: Icon, label, primary = false, onClick, size = 'md' }: any) => (
    <button
        onClick={onClick}
        className={`
      flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
      ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'}
      ${primary
                ? 'bg-zinc-100 text-zinc-900 hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                : 'text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50'}
    `}
    >
        {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
        {label}
    </button>
);

const TabPills = ({ tabs, activeTab, onChange }: any) => (
    <div className="flex overflow-x-auto gap-2 mb-8 pb-1 no-scrollbar px-4 md:px-0 border-b border-zinc-900">
        {tabs.map((tab: any) => (
            <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`whitespace-nowrap px-4 py-2 text-sm transition-all relative ${activeTab === tab.id
                        ? 'text-zinc-100'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
            >
                {tab.label}
                {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                )}
            </button>
        ))}
    </div>
);

// --- Feature: ReactFlow Simulation (Graph View) ---

const SimulatedReactFlow = () => {
    // Simple state to simulate dragging (visual only for mockup)
    const [nodes, setNodes] = useState([
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
        <div className="h-full flex flex-col relative bg-[#111] rounded-xl overflow-hidden border border-zinc-800 shadow-inner">
            {/* 1. Grid Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#555 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* 2. Controls Overlay */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button className="p-2 bg-zinc-800 text-zinc-400 hover:text-white rounded border border-zinc-700 shadow-lg"><Plus size={16} /></button>
                <button className="p-2 bg-zinc-800 text-zinc-400 hover:text-white rounded border border-zinc-700 shadow-lg"><Maximize2 size={16} /></button>
                <button className="p-2 bg-zinc-800 text-zinc-400 hover:text-white rounded border border-zinc-700 shadow-lg"><Settings2 size={16} /></button>
            </div>

            <div className="absolute bottom-4 left-4 z-10 bg-zinc-900/80 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded-full text-xs text-zinc-500 font-mono">
                ReactFlow Renderer Mock
            </div>

            {/* 3. Canvas Area */}
            <svg className="w-full h-full pointer-events-none">
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
                            <path d={path} stroke="#3b82f6" strokeWidth="2" fill="none" className="opacity-60" />
                            <circle cx={endX} cy={endY} r="3" fill="#3b82f6" />
                        </g>
                    );
                })}
            </svg>

            {/* 4. Interactive Nodes */}
            {nodes.map(node => (
                <div
                    key={node.id}
                    className="absolute w-[150px] group cursor-grab active:cursor-grabbing transition-shadow hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    style={{ left: node.x, top: node.y }}
                >
                    {/* Node Handles */}
                    {node.type !== 'input' && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-400 rounded-full border border-black z-10"></div>}
                    {node.type !== 'output' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-400 rounded-full border border-black z-10"></div>}

                    {/* Node Body */}
                    <div className={`
            bg-zinc-900 border rounded-md p-3
            ${node.type === 'input' ? 'border-blue-500/50' : 'border-zinc-700'}
          `}>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-bold">{node.type}</div>
                        <div className="text-sm text-zinc-200 font-medium flex items-center gap-2">
                            {node.type === 'input' && <Terminal size={12} className="text-blue-400" />}
                            {node.type === 'process' && <Cpu size={12} className="text-purple-400" />}
                            {node.type === 'output' && <Database size={12} className="text-green-400" />}
                            {node.label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Feature: Prompt Editor ---

const PromptEditor = () => {
    const [content, setContent] = useState('{{user_input}}\n\n请根据以上内容，为我生成一份详细的摘要。要求：\n1. 风格简洁\n2. 包含 {{key_points}} 个要点\n3. 语气 {{tone}}');

    // Simple syntax highlighting mock
    const renderHighlighted = (text: string) => {
        return text.split(/(\{\{.*?\}\})/).map((part, i) => {
            if (part.startsWith('{{') && part.endsWith('}}')) {
                return <span key={i} className="text-blue-400 font-bold">{part}</span>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] animate-in fade-in">
            {/* 1. Variable List */}
            <div className="lg:col-span-2 border-r border-zinc-800 pr-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Variable size={14} /> 变量库
                </div>
                <div className="space-y-2">
                    {['user_input', 'char_name', 'world_info', 'chat_history', 'current_date'].map(v => (
                        <button key={v} className="w-full text-left px-3 py-2 rounded text-xs font-mono text-zinc-400 hover:text-blue-400 hover:bg-blue-900/20 border border-transparent hover:border-blue-900 transition-colors truncate">
                            {`{{${v}}}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Editor Area */}
            <div className="lg:col-span-6 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-medium text-zinc-500">Prompt 模板内容</label>
                    <div className="flex gap-2">
                        <span className="text-[10px] text-zinc-600">Markdown 支持</span>
                        <span className="text-[10px] text-green-600/70 flex items-center gap-1"><CheckCircle2 size={10} /> 自动保存</span>
                    </div>
                </div>

                <div className="flex-1 relative bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden font-mono text-sm leading-relaxed group focus-within:border-blue-500/50 transition-colors">
                    {/* Highlight Layer (Behind) */}
                    <div className="absolute inset-0 p-4 pointer-events-none whitespace-pre-wrap text-transparent z-0">
                        {content}
                    </div>
                    {/* Real Textarea (Foreground) */}
                    <textarea
                        className="absolute inset-0 w-full h-full bg-transparent p-4 text-zinc-300 resize-none focus:outline-none z-10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* 3. Live Preview */}
            <div className="lg:col-span-4 pl-4 border-l border-zinc-800 flex flex-col">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Play size={14} /> 实时预览
                </div>
                <div className="flex-1 bg-black border border-zinc-800 rounded-lg p-4 overflow-y-auto">
                    <div className="text-sm text-zinc-400 whitespace-pre-wrap">
                        {renderHighlighted(content)}
                    </div>
                </div>
                <div className="mt-4 p-3 bg-zinc-900/50 rounded border border-zinc-800">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-500">预估 Tokens</span>
                        <span className="text-zinc-300 font-mono">145</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full w-[15%]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Feature: Regex Editor ---

const RegexEditor = () => {
    const [regex, setRegex] = useState('(?<=\\[).*?(?=\\])');
    const [testString, setTestString] = useState('这是一段测试文本 [需要提取的内容] 以及 [另一个标签]');

    return (
        <div className="space-y-6 animate-in fade-in">
            {/* Pattern Input */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Regex size={14} /> 正则表达式
                </label>
                <div className="flex gap-2">
                    <span className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono text-sm rounded-l-md flex items-center">/</span>
                    <input
                        type="text"
                        value={regex}
                        onChange={(e) => setRegex(e.target.value)}
                        className="flex-1 bg-zinc-900 border-y border-zinc-700 text-purple-300 font-mono text-sm px-4 focus:outline-none focus:bg-black transition-colors"
                    />
                    <span className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono text-sm rounded-r-md flex items-center">/gm</span>
                </div>
            </div>

            {/* Test Area */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500">测试文本</label>
                    <textarea
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        className="w-full h-40 bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-300 font-mono focus:outline-none focus:border-purple-500/50 resize-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500">匹配结果</label>
                    <div className="w-full h-40 bg-black border border-zinc-800 rounded-lg p-4 text-sm text-zinc-500 font-mono overflow-y-auto">
                        {/* Mock Result Highlight */}
                        这是一段测试文本 <span className="bg-purple-900/50 text-purple-200 border-b border-purple-500">[需要提取的内容]</span> 以及 <span className="bg-purple-900/50 text-purple-200 border-b border-purple-500">[另一个标签]</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-900/30 rounded border border-zinc-800/50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-zinc-400">Valid Pattern</span>
                </div>
                <div className="h-4 w-[1px] bg-zinc-800"></div>
                <div className="text-xs text-zinc-500">Matches found: 2</div>
            </div>
        </div>
    );
};

// --- Feature: Model Log View ---

const ModelLogView = () => {
    const [selectedLog, setSelectedLog] = useState<number | null>(null);

    const LOGS = [
        { id: 1, model: 'GPT-4 Turbo', type: 'Completion', time: '14:20:05', duration: '1.2s', tokens: { in: 450, out: 120 }, status: 'success' },
        { id: 2, model: 'Claude 3 Opus', type: 'Summarization', time: '14:18:22', duration: '4.5s', tokens: { in: 2400, out: 300 }, status: 'success' },
        { id: 3, model: 'Gemini Pro', type: 'Embedding', time: '14:15:00', duration: '0.4s', tokens: { in: 120, out: 0 }, status: 'error' },
    ];

    return (
        <div className="flex h-[calc(100vh-200px)] border border-zinc-800 rounded-lg overflow-hidden animate-in fade-in">
            {/* Log List */}
            <div className="w-1/3 border-r border-zinc-800 bg-zinc-900/30 flex flex-col">
                <div className="p-3 border-b border-zinc-800 bg-zinc-900/50">
                    <input className="w-full bg-black border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none" placeholder="Filter logs..." />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {LOGS.map(log => (
                        <div
                            key={log.id}
                            onClick={() => setSelectedLog(log.id)}
                            className={`p-4 border-b border-zinc-800/50 cursor-pointer hover:bg-zinc-800/30 transition-colors ${selectedLog === log.id ? 'bg-blue-900/10 border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${log.status === 'success' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>{log.model}</span>
                                <span className="text-[10px] text-zinc-500 font-mono">{log.time}</span>
                            </div>
                            <div className="text-xs text-zinc-300 mb-2">{log.type} Task</div>
                            <div className="flex gap-3 text-[10px] text-zinc-500">
                                <span className="flex items-center gap-1"><Clock size={10} /> {log.duration}</span>
                                <span className="flex items-center gap-1"><Zap size={10} /> {log.tokens.in + log.tokens.out} toks</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Log Detail */}
            <div className="flex-1 bg-black flex flex-col font-mono">
                {selectedLog ? (
                    <>
                        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
                            <div className="flex items-center gap-4">
                                <h3 className="text-sm text-zinc-200 font-medium">Request ID: req_823792</h3>
                                <span className="text-xs text-zinc-500">trace_id: xyz-abc</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1 hover:bg-zinc-800 rounded text-zinc-400"><Code2 size={16} /></button>
                                <button className="p-1 hover:bg-zinc-800 rounded text-zinc-400"><Maximize2 size={16} /></button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-0">
                            <div className="border-b border-zinc-800/50">
                                <div className="px-4 py-2 bg-zinc-900/30 text-xs text-blue-400 font-bold border-b border-zinc-800/30">USER PROMPT</div>
                                <div className="p-4 text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">
                                    {`You are a helpful assistant living in a cyberpunk world...
                   
Current Context:
- Time: 2077-10-24
- Location: Night City`}
                                </div>
                            </div>

                            <div className="">
                                <div className="px-4 py-2 bg-zinc-900/30 text-xs text-green-400 font-bold border-b border-zinc-800/30 border-t border-zinc-800">MODEL COMPLETION</div>
                                <div className="p-4 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                    {`Understood. The neon lights flicker overhead as I access the Engram database. "What data are you looking for, traveler?"`}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-600 flex-col gap-4">
                        <Terminal size={48} className="opacity-20" />
                        <p className="text-sm">Select a log entry to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Views Container ---

const PresetsView = () => {
    const [tab, setTab] = useState('prompt');

    return (
        <div className="animate-in fade-in">
            <PageTitle title="预设管理" subtitle="定制您的 AI 交互逻辑" />
            <TabPills
                tabs={[
                    { id: 'prompt', label: 'Prompt 模板' },
                    { id: 'regex', label: '正则处理' },
                    { id: 'connection', label: 'API 连接' }
                ]}
                activeTab={tab}
                onChange={setTab}
            />
            {tab === 'prompt' && <PromptEditor />}
            {tab === 'regex' && <RegexEditor />}
            {tab === 'connection' && <div className="text-zinc-500 p-12 text-center border border-dashed border-zinc-800 rounded">API Connection Form Placeholder</div>}
        </div>
    );
};

const DevLogContainer = () => {
    const [tab, setTab] = useState('model');

    return (
        <div className="animate-in fade-in">
            <PageTitle title="开发日志" subtitle="系统诊断与监控" />
            <TabPills
                tabs={[
                    { id: 'model', label: '模型交互' },
                    { id: 'system', label: '系统事件' },
                    { id: 'error', label: '错误追踪' }
                ]}
                activeTab={tab}
                onChange={setTab}
            />
            {tab === 'model' && <ModelLogView />}
            {tab === 'system' && <div className="text-zinc-500 p-12 text-center font-mono text-sm">System Logs Placeholder</div>}
        </div>
    );
};

// --- Updated Dashboard & Other Views (Keeping the minimal style) ---

const DashboardView = () => (
    <div className="space-y-8 animate-in fade-in">
        <PageTitle title="仪表盘" subtitle="系统概览" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
                { label: 'Total Memories', value: '12,405', trend: '+12%' },
                { label: 'Active Context', value: '842', trend: '-5%' },
                { label: 'Vector Usage', value: '45MB', trend: 'stable' },
                { label: 'API Cost', value: '$4.20', trend: '+2%' },
            ].map((stat, i) => (
                <div key={i} className="p-6 bg-zinc-900/20 border border-zinc-800/50 rounded-lg">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{stat.label}</div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-light text-zinc-100">{stat.value}</span>
                        <span className={`text-xs mb-1.5 ${stat.trend.includes('+') ? 'text-green-500' : 'text-zinc-600'}`}>{stat.trend}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Quick Action Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="border border-zinc-800/50 rounded-xl p-6 bg-gradient-to-br from-zinc-900/50 to-transparent relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><BrainCircuit size={100} /></div>
                <h3 className="text-lg font-light text-zinc-200 mb-2">继续会话</h3>
                <p className="text-sm text-zinc-500 mb-6 max-w-xs">从上次中断的地方继续，系统已为您准备好最新的上下文快照。</p>
                <ModernButton label="Resume Session" icon={Play} primary />
            </div>
            <div className="border border-zinc-800/50 rounded-xl p-6 bg-gradient-to-br from-zinc-900/50 to-transparent relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Database size={100} /></div>
                <h3 className="text-lg font-light text-zinc-200 mb-2">知识库同步</h3>
                <p className="text-sm text-zinc-500 mb-6 max-w-xs">检测到 3 个新文件需要向量化处理。预计耗时 2 分钟。</p>
                <ModernButton label="Start Sync" icon={RefreshCw} />
            </div>
        </div>
    </div>
);

// --- Main Layout ---

export default function EngramRedesignV2() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-black text-zinc-300 overflow-hidden">
            <GlobalStyles />

            {/* Sidebar */}
            <aside className="w-64 bg-black border-r border-zinc-900 hidden md:flex flex-col">
                <div className="p-8">
                    <div className="flex items-center gap-3 text-zinc-100">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <BrainCircuit size={18} className="text-white" />
                        </div>
                        <span className="text-lg font-medium tracking-tight font-sans">Engram</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-md transition-all duration-200 group
                  ${isActive
                                        ? 'text-white bg-zinc-900 font-medium'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 font-light'}
                `}
                            >
                                <Icon size={18} strokeWidth={1.5} className={isActive ? 'text-blue-400' : 'group-hover:text-zinc-400'} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-zinc-900">
                    <div className="bg-zinc-900/30 rounded-lg p-3 flex items-center gap-3 border border-zinc-800/50">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-medium">SH</div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-zinc-300 truncate">Shiyue Netizen</div>
                            <div className="text-[10px] text-zinc-600 truncate">Pro Workspace</div>
                        </div>
                        <MoreVertical size={14} className="text-zinc-600" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col relative">
                {/* Mobile Header (Hidden on Desktop) */}
                <div className="md:hidden h-14 border-b border-zinc-900 flex items-center justify-between px-4">
                    <span className="font-medium text-zinc-100">Engram</span>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={20} /></button>
                </div>

                <div className="flex-1 overflow-auto p-6 md:p-12 scroll-smooth">
                    <div className="max-w-6xl mx-auto min-h-full">
                        {activeTab === 'dashboard' && <DashboardView />}
                        {activeTab === 'graph' && (
                            <div className="h-[calc(100vh-140px)] animate-in fade-in">
                                <PageTitle title="神经图谱" subtitle="知识节点可视化" actions={
                                    <div className="flex gap-2">
                                        <ModernButton icon={Play} label="Auto Layout" size="sm" />
                                        <ModernButton icon={Settings2} label="Config" size="sm" />
                                    </div>
                                } />
                                <div className="h-full pb-8">
                                    <SimulatedReactFlow />
                                </div>
                            </div>
                        )}
                        {activeTab === 'presets' && <PresetsView />}
                        {activeTab === 'devlog' && <DevLogContainer />}
                        {activeTab === 'memory' && <div className="text-center text-zinc-600 pt-20">Memory Stream View (Same as V1)</div>}
                        {activeTab === 'processing' && <div className="text-center text-zinc-600 pt-20">Processing Config (Same as V1)</div>}
                        {activeTab === 'settings' && <div className="text-center text-zinc-600 pt-20">Settings View (Same as V1)</div>}
                    </div>
                </div>
            </main>
        </div>
    );
}
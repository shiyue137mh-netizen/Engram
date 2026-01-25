/**
 * GraphView - 图谱可视化组件
 *
 * V0.9: 使用 React Flow 实现交互式图谱可视化
 * - dagre 自动布局
 * - 语义缩放 (LOD)
 * - 节点拖拽
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    ReactFlow,
    Node,
    Edge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    useStore,
    Handle,
    Position,
    MarkerType,
    ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { LayoutGrid, RefreshCw } from 'lucide-react';
import type { EventNode as EventNodeDataType, EntityNode as EntityNodeDataType, EntityRelation } from '@/data/types/graph';
import { getLayoutedElements } from './layoutHelper';

// ==================== 节点数据类型定义 ====================

interface EventFlowNodeData {
    label: string;
    summary: string;
    time_anchor?: string;
    roles?: string[];
    significance?: number;
    [key: string]: unknown;
}

interface EntityFlowNodeData {
    label: string;
    type: string;
    description: string;
    profile?: Record<string, unknown>;
    [key: string]: unknown;
}

// ==================== 自定义节点组件 ====================

/**
 * 事件节点 - 支持 LOD
 */
const EventNodeComponent: React.FC<{ data: EventFlowNodeData }> = ({ data }) => {
    const zoom = useStore((s) => s.transform[2]);

    // LOD 0: 极简模式 - 降低阈值到 0.15，让默认缩放下显示更多信息
    if (zoom < 0.15) {
        return (
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e07850', border: '2px solid #e07850', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Handle type="target" position={Position.Top} style={{ backgroundColor: '#e07850' }} />
                <Handle type="source" position={Position.Bottom} style={{ backgroundColor: '#e07850' }} />
            </div>
        );
    }

    // LOD 2: 详情模式 (zoom > 1.0)
    if (zoom > 1.0) {
        return (
            <div className="w-[280px] p-3 rounded-lg border border-border bg-card shadow-md">
                <Handle type="target" position={Position.Top} className="!bg-primary" />
                <div className="text-xs text-muted-foreground mb-1">{data.time_anchor || ''}</div>
                <div className="text-sm font-medium text-foreground mb-2 line-clamp-3">{data.summary}</div>
                <div className="flex flex-wrap gap-1">
                    {data.roles?.map((role: string, i: number) => (
                        <span key={i} className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded">
                            {role}
                        </span>
                    ))}
                </div>
                <Handle type="source" position={Position.Bottom} className="!bg-primary" />
            </div>
        );
    }

    // LOD 1: 摘要模式 (默认)
    return (
        <div style={{ width: 220, padding: 8, borderRadius: 8, border: '1px solid #444', backgroundColor: '#2a2a2a', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            <Handle type="target" position={Position.Top} style={{ backgroundColor: '#e07850' }} />
            <div style={{ fontSize: 11, color: '#888', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.time_anchor || '未知时间'}</div>
            <div style={{ fontSize: 13, color: '#eee', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.label}</div>
            <Handle type="source" position={Position.Bottom} style={{ backgroundColor: '#e07850' }} />
        </div>
    );
};

/**
 * 实体节点 - 支持 LOD
 */
const EntityNodeComponent: React.FC<{ data: EntityFlowNodeData }> = ({ data }) => {
    const zoom = useStore((s) => s.transform[2]);

    // LOD 0: 微缩模式 - 降低阈值到 0.15
    if (zoom < 0.15) {
        return (
            <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#555', border: '1px solid #666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Handle type="target" position={Position.Top} style={{ backgroundColor: '#888' }} />
                <Handle type="source" position={Position.Bottom} style={{ backgroundColor: '#888' }} />
            </div>
        );
    }

    // LOD 2: 详情模式
    if (zoom > 1.0) {
        return (
            <div className="w-[160px] p-2 rounded-lg border border-border bg-muted/50">
                <Handle type="target" position={Position.Top} className="!bg-muted-foreground" />
                <div className="text-xs text-muted-foreground uppercase">{data.type}</div>
                <div className="text-sm font-medium text-foreground">{data.label}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{data.description}</div>
                <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground" />
            </div>
        );
    }

    // LOD 1: 摘要模式
    return (
        <div style={{ width: 120, padding: 6, borderRadius: 6, border: '1px solid #555', backgroundColor: '#333' }}>
            <Handle type="target" position={Position.Top} style={{ backgroundColor: '#888' }} />
            <div style={{ fontSize: 12, color: '#ddd', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.label}</div>
            <Handle type="source" position={Position.Bottom} style={{ backgroundColor: '#888' }} />
        </div>
    );
};

// 节点类型映射
const nodeTypes = {
    event: EventNodeComponent,
    entity: EntityNodeComponent,
};

// ==================== GraphView 主组件 ====================

interface GraphViewProps {
    events: EventNodeDataType[];
    entities: EntityNodeDataType[];
}

export const GraphView: React.FC<GraphViewProps> = ({ events, entities }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [isLayouting, setIsLayouting] = useState(false);
    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

    // 将数据转换为 React Flow 节点和边
    const convertToGraphElements = useCallback(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        // 1. 创建事件节点
        events.forEach((event, index) => {
            newNodes.push({
                id: event.id,
                type: 'event',
                position: { x: 0, y: index * 120 },
                data: {
                    label: event.summary.substring(0, 50) + (event.summary.length > 50 ? '...' : ''),
                    summary: event.summary,
                    time_anchor: event.structured_kv?.time_anchor,
                    roles: event.structured_kv?.role,
                    significance: event.significance_score,
                } as EventFlowNodeData,
            });

            // 2. 创建时间线边 (NEXT)
            if (index > 0) {
                newEdges.push({
                    id: `e-${events[index - 1].id}-${event.id}`,
                    source: events[index - 1].id,
                    target: event.id,
                    type: 'smoothstep',
                    animated: false,
                    style: { stroke: 'var(--primary)', strokeWidth: 2 },
                    markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--primary)' },
                });
            }
        });

        // 3. 创建实体节点
        entities.forEach((entity, index) => {
            newNodes.push({
                id: entity.id,
                type: 'entity',
                position: { x: 300 + (index % 3) * 100, y: (Math.floor(index / 3)) * 80 },
                data: {
                    label: entity.name,
                    type: entity.type,
                    description: entity.description,
                    profile: entity.profile,
                } as EntityFlowNodeData,
            });
        });

        // 4. V0.9.4: 创建显式关系边 (从 profile.relations)
        entities.forEach((entity) => {
            const relations = entity.profile?.relations as EntityRelation[] | undefined;
            if (relations && Array.isArray(relations)) {
                relations.forEach((rel) => {
                    // 查找目标实体
                    const targetEntity = entities.find(e => e.name === rel.target);
                    if (targetEntity) {
                        newEdges.push({
                            id: `rel-${entity.id}-${targetEntity.id}`,
                            source: entity.id,
                            target: targetEntity.id,
                            type: 'smoothstep',
                            animated: false,
                            label: rel.type,
                            style: { stroke: '#888', strokeWidth: 1 },
                            labelStyle: { fontSize: 10, fill: '#aaa' },
                        });
                    }
                });
            }
        });

        // 5. V0.9.4: 创建隐式共现边 (从 EventNode.role 反查)
        events.forEach((event) => {
            const roles = event.structured_kv?.role || [];
            // 找到这些角色对应的实体节点
            const involvedEntities = entities.filter(e =>
                roles.includes(e.name) || e.aliases?.some(alias => roles.includes(alias))
            );
            // 将每个实体连接到该事件
            involvedEntities.forEach((entity) => {
                newEdges.push({
                    id: `co-${entity.id}-${event.id}`,
                    source: entity.id,
                    target: event.id,
                    type: 'smoothstep',
                    animated: false,
                    style: { stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeDasharray: '4 2' },
                });
            });
        });

        return { nodes: newNodes, edges: newEdges };
    }, [events, entities]);

    // 执行自动布局
    const handleAutoLayout = useCallback(() => {
        setIsLayouting(true);
        const { nodes: rawNodes, edges: rawEdges } = convertToGraphElements();
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(rawNodes, rawEdges, 'TB');
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        setIsLayouting(false);

        // 布局后调用 fitView 自动适配视口
        setTimeout(() => {
            reactFlowInstance.current?.fitView({ padding: 0.2 });
        }, 50);
    }, [convertToGraphElements, setNodes, setEdges]);

    // 初始化加载
    useEffect(() => {
        if (events.length > 0 || entities.length > 0) {
            handleAutoLayout();
        }
    }, [events.length, entities.length]);

    // 空状态
    if (events.length === 0 && entities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                <LayoutGrid size={48} className="opacity-20" />
                <p className="text-sm">暂无图谱数据</p>
                <p className="text-xs">请先在记忆摘要中生成事件，然后提取实体</p>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            {/* 工具栏 */}
            <div className="absolute top-2 left-2 z-10 flex gap-2">
                <button
                    onClick={handleAutoLayout}
                    disabled={isLayouting}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-card border border-border text-foreground hover:bg-accent transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={12} className={isLayouting ? 'animate-spin' : ''} />
                    自动布局
                </button>
            </div>

            {/* React Flow 画布 */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onInit={(instance) => { reactFlowInstance.current = instance; }}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.1}
                maxZoom={2}
                colorMode="dark"
                defaultEdgeOptions={{
                    type: 'smoothstep',
                }}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="#333" gap={20} />
                <Controls className="!bg-card !border-border" />
                <MiniMap
                    nodeColor={(node) => node.type === 'event' ? '#e07850' : '#888'}
                    className="!bg-card !border-border"
                />
            </ReactFlow>
        </div>
    );
};


/**
 * GraphView - 图谱可视化组件
 *
 * V0.9: 使用 React Flow 实现交互式图谱可视化
 * - dagre 自动布局
 * - 语义缩放 (LOD)
 * - 节点拖拽
 */
import React, { useState, useCallback, useEffect } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { LayoutGrid, RefreshCw } from 'lucide-react';
import type { EventNode as EventNodeDataType, EntityNode as EntityNodeDataType } from '@/services/types/graph';
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
    [key: string]: unknown;
}

// ==================== 自定义节点组件 ====================

/**
 * 事件节点 - 支持 LOD
 */
const EventNodeComponent: React.FC<{ data: EventFlowNodeData }> = ({ data }) => {
    const zoom = useStore((s) => s.transform[2]);

    // LOD 0: 极简模式 (zoom < 0.4)
    if (zoom < 0.4) {
        return (
            <div className="w-8 h-8 rounded-full bg-primary/80 border-2 border-primary flex items-center justify-center">
                <Handle type="target" position={Position.Top} className="!bg-primary" />
                <Handle type="source" position={Position.Bottom} className="!bg-primary" />
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
        <div className="w-[220px] p-2 rounded-lg border border-border bg-card/90 shadow-sm">
            <Handle type="target" position={Position.Top} className="!bg-primary" />
            <div className="text-xs text-muted-foreground mb-1 truncate">{data.time_anchor || '未知时间'}</div>
            <div className="text-sm text-foreground line-clamp-2">{data.label}</div>
            <Handle type="source" position={Position.Bottom} className="!bg-primary" />
        </div>
    );
};

/**
 * 实体节点 - 支持 LOD
 */
const EntityNodeComponent: React.FC<{ data: EntityFlowNodeData }> = ({ data }) => {
    const zoom = useStore((s) => s.transform[2]);

    // LOD 0: 微缩模式
    if (zoom < 0.4) {
        return (
            <div className="w-6 h-6 rounded-full bg-accent border border-border flex items-center justify-center">
                <Handle type="target" position={Position.Top} className="!bg-muted-foreground" />
                <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground" />
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
        <div className="w-[120px] p-1.5 rounded-md border border-border bg-muted/30">
            <Handle type="target" position={Position.Top} className="!bg-muted-foreground" />
            <div className="text-xs text-foreground truncate">{data.label}</div>
            <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground" />
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
                } as EntityFlowNodeData,
            });

            // 4. 创建 INVOLVED_IN 边
            entity.related_events?.forEach((eventId) => {
                if (events.find(e => e.id === eventId)) {
                    newEdges.push({
                        id: `e-${entity.id}-${eventId}`,
                        source: entity.id,
                        target: eventId,
                        type: 'smoothstep',
                        animated: false,
                        style: { stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeDasharray: '4 2' },
                    });
                }
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
        <div className="w-full h-full relative">
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
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.1}
                maxZoom={2}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                }}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="var(--border)" gap={20} />
                <Controls className="!bg-card !border-border" />
                <MiniMap
                    nodeColor={(node) => node.type === 'event' ? 'var(--primary)' : 'var(--muted-foreground)'}
                    className="!bg-card !border-border"
                />
            </ReactFlow>
        </div>
    );
};

export default GraphView;


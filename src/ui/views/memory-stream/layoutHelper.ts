/**
 * layoutHelper - dagre 布局辅助
 *
 * V0.9: 使用 dagre 计算节点的 (x, y) 坐标
 */
import dagre from 'dagre';
import { Node, Edge, Position } from '@xyflow/react';

/**
 * 使用 dagre 自动布局节点
 *
 * @param nodes React Flow 节点数组
 * @param edges React Flow 边数组
 * @param direction 布局方向，'TB' = Top-to-Bottom, 'LR' = Left-to-Right
 * @returns 带有计算位置的节点和边
 */
export function getLayoutedElements(
    nodes: Node[],
    edges: Edge[],
    direction: 'TB' | 'LR' = 'TB'
): { nodes: Node[]; edges: Edge[] } {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({
        rankdir: direction,
        nodesep: 50,      // 节点间距
        ranksep: 80,      // 层级间距
        marginx: 20,
        marginy: 20,
    });

    // 1. 注册节点（Event 宽，Entity 窄）
    nodes.forEach((node) => {
        const width = node.type === 'event' ? 250 : 150;
        const height = node.type === 'event' ? 100 : 60;
        dagreGraph.setNode(node.id, { width, height });
    });

    // 2. 注册边
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // 3. 计算布局
    dagre.layout(dagreGraph);

    // 4. 应用坐标回 React Flow 节点
    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        if (!nodeWithPosition) return node;

        const width = node.type === 'event' ? 250 : 150;
        const height = node.type === 'event' ? 100 : 60;

        return {
            ...node,
            targetPosition: isHorizontal ? Position.Left : Position.Top,
            sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
            position: {
                x: nodeWithPosition.x - width / 2,
                y: nodeWithPosition.y - height / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
}

/**
 * 获取事件节点的默认样式配置
 */
function getEventNodeDimensions(zoom: number): { width: number; height: number } {
    if (zoom < 0.4) {
        // LOD 0: 极简模式
        return { width: 40, height: 40 };
    } else if (zoom > 1.0) {
        // LOD 2: 详情模式
        return { width: 300, height: 150 };
    }
    // LOD 1: 摘要模式
    return { width: 250, height: 100 };
}

/**
 * 获取实体节点的默认样式配置
 */
function getEntityNodeDimensions(zoom: number): { width: number; height: number } {
    if (zoom < 0.4) {
        // LOD 0: 隐藏或微缩
        return { width: 30, height: 30 };
    } else if (zoom > 1.0) {
        // LOD 2: 详情模式
        return { width: 180, height: 80 };
    }
    // LOD 1: 摘要模式
    return { width: 150, height: 60 };
}

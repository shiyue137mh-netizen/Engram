// 导航配置
import { List, Network, Brain, Key, Settings, Terminal, LayoutDashboard, type LucideIcon } from 'lucide-react';

export interface NavItem {
    id: string;
    icon: LucideIcon;
    label: string;
    path: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: '仪表盘', path: '/dashboard' },
    { id: 'memory', icon: List, label: '记忆流', path: '/memory' },
    { id: 'graph', icon: Network, label: '世界图谱', path: '/graph' },
    { id: 'brain', icon: Brain, label: '记忆', path: '/brain' },
    { id: 'api', icon: Key, label: 'API 预设', path: '/api' },
    { id: 'dev', icon: Terminal, label: '开发日志', path: '/dev' },
    { id: 'settings', icon: Settings, label: '设置', path: '/settings' },
];

// 默认路由
export const DEFAULT_ROUTE = '/dashboard';


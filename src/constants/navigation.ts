// 导航配置
import { ListTree, Cpu, Key, Settings, Terminal, LayoutDashboard, BookOpen, type LucideIcon } from 'lucide-react';

export interface NavItem {
    id: string;
    icon: LucideIcon;
    label: string;
    path: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: '仪表盘', path: '/dashboard' },
    { id: 'memory', icon: ListTree, label: '记忆编辑', path: '/memory' },
    { id: 'processing', icon: Cpu, label: '数据处理', path: '/processing' },
    { id: 'presets', icon: Key, label: 'API 预设', path: '/presets' },
    { id: 'devlog', icon: Terminal, label: '开发日志', path: '/devlog' },
    { id: 'docs', icon: BookOpen, label: '帮助文档', path: '/docs' },  // V0.9.11
    { id: 'settings', icon: Settings, label: '设置', path: '/settings' },
];

// 默认路由
export const DEFAULT_ROUTE = '/dashboard';

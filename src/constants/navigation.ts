// 导航配置
import { BookOpen, Cpu, Key, LayoutDashboard, ListTree, type LucideIcon, Settings, Terminal } from 'lucide-react';

export interface NavItem {
    id: string;
    icon: LucideIcon;
    label: string;
    path: string;
}

export const NAV_ITEMS: NavItem[] = [
    { icon: LayoutDashboard, id: 'dashboard', label: '仪表盘', path: '/dashboard' },
    { icon: ListTree, id: 'memory', label: '记忆编辑', path: '/memory' },
    { icon: Cpu, id: 'processing', label: '数据处理', path: '/processing' },
    { icon: Key, id: 'presets', label: 'API 预设', path: '/presets' },
    { icon: Terminal, id: 'devlog', label: '开发日志', path: '/devlog' },
    { icon: BookOpen, id: 'docs', label: '帮助文档', path: '/docs' },  // V0.9.11
    { icon: Settings, id: 'settings', label: '设置', path: '/settings' },
];

// 默认路由
const DEFAULT_ROUTE = '/dashboard';

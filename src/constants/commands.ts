/**
 * Command Palette 命令配置
 */
import { List, Network, Brain, Key, Terminal, Settings, LogOut, Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CommandItem {
    id: string;
    icon: LucideIcon;
    label: string;
    description?: string;
    action: (navigate: (path: string) => void) => void;
    keywords: string[]; // 用于搜索匹配
    type: 'navigation' | 'action';
}

export const COMMANDS: CommandItem[] = [
    // 导航命令
    {
        id: 'nav-memory',
        icon: List,
        label: '前往记忆流',
        description: '查看所有记忆片段的时间线',
        action: (nav) => nav('/memory'),
        keywords: ['memory', 'stream', 'timeline', '记忆'],
        type: 'navigation',
    },
    {
        id: 'nav-graph',
        icon: Network,
        label: '前往世界图谱',
        description: '探索实体关系可视化网络',
        action: (nav) => nav('/graph'),
        keywords: ['graph', 'world', 'map', '图谱'],
        type: 'navigation',
    },
    {
        id: 'nav-brain',
        icon: Brain,
        label: '前往大脑控制台',
        description: '记忆操作、总结与向量化',
        action: (nav) => nav('/brain'),
        keywords: ['brain', 'console', 'summarize', '大脑'],
        type: 'navigation',
    },
    {
        id: 'nav-api',
        icon: Key,
        label: 'API 预设配置',
        description: '管理 LLM 连接设置',
        action: (nav) => nav('/api'),
        keywords: ['api', 'config', 'llm', '设置'],
        type: 'navigation',
    },
    {
        id: 'nav-dev',
        icon: Terminal,
        label: '开发日志',
        description: '查看系统运行日志和状态',
        action: (nav) => nav('/dev'),
        keywords: ['dev', 'log', 'debug', '日志'],
        type: 'navigation',
    },
    {
        id: 'nav-settings',
        icon: Settings,
        label: '系统设置',
        description: '调整 Engram 全局选项',
        action: (nav) => nav('/settings'),
        keywords: ['settings', 'config', 'option', '选项'],
        type: 'navigation',
    },
];

/**
 * 搜索命令
 */
export function searchCommands(query: string): CommandItem[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return COMMANDS;

    return COMMANDS.filter((cmd) => {
        return (
            cmd.label.toLowerCase().includes(lowerQuery) ||
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
        );
    });
}

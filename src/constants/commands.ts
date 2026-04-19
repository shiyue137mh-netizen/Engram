/**
 * Command Palette 命令配置
 */
import { Brain, Home, Key, List, LogOut, Network, Settings, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CommandItem {
    id: string;
    icon: LucideIcon;
    label: string;
    description?: string;
    action: (navigate: (path: string) => void) => void;
    keywords: string[]; // 用于搜索匹配
    type: 'navigation' | 'action';
}

export const COMMANDS: CommandItem[] = [
    // Sub-view Navigation (Deep Links)
    // These are NOT in the main sidebar, so we keep them here.
    {
        action: (nav) => nav('presets:prompt'),
        description: '编辑和导入 Prompt 模板',
        icon: Settings,
        id: 'nav-prompt',
        keywords: ['prompt', 'template', '提示词', '模板'],
        label: '管理提示词模板',
        type: 'navigation',
    },
    {
        action: (nav) => nav('presets:regex'),
        description: '配置自定义 Regex 替换规则',
        icon: Settings,
        id: 'nav-regex',
        keywords: ['regex', 'rule', '正则', '脚本'],
        label: '管理正则脚本',
        type: 'navigation',
    },
    {
        action: (nav) => nav('presets:worldbook'),
        description: '管理 World Info 和 Lorebook',
        icon: Home,
        id: 'nav-worldbook',
        keywords: ['world', 'book', 'lore', '世界书'],
        label: '世界书配置',
        type: 'navigation',
    },
];

/**
 * 搜索命令
 */
function searchCommands(query: string): CommandItem[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {return COMMANDS;}

    return COMMANDS.filter((cmd) => (
            cmd.label.toLowerCase().includes(lowerQuery) ||
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
        ));
}

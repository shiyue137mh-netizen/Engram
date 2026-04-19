import { COMMANDS } from '@/constants/commands';
import type { NavItem } from '@/constants/navigation';
import { NAV_ITEMS } from '@/constants/navigation';
import { useThemeStore } from '@/state/themeStore';
import { Moon, Palette, Sun } from 'lucide-react';
import type { SearchAdapter, SearchResult } from '../SearchService';

export class CommandAdapter implements SearchAdapter {
    async search(query: string): Promise<SearchResult[]> {
        const lowerQuery = query.toLowerCase().trim();

        // 1. Navigation Items (From Sidebar Config) - "Interface Text"
        // This ensures what you see in the sidebar is always searchable
        const navResults: SearchResult[] = NAV_ITEMS.map((item: NavItem) => ({
            id: `nav-${item.id}`,
            type: 'navigation' as const, // Explicitly cast to 'navigation' | 'action' | 'setting' | 'log'
            title: item.label,
            description: `Navigate to ${item.label}`, // Auto-generated description
            icon: item.icon,
            action: (nav: (path: string) => void) => nav(item.path),
            score: 10,
        })).filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.id.includes(lowerQuery)
        );

        // 2. Extra Manual Commands (Deep links, etc.)
        // We filter out any that might duplicate NAV_ITEMS if IDs collide,
        // But here we assume COMMANDS contains "extra" things.
        const manualResults: SearchResult[] = COMMANDS.filter(cmd =>
            cmd.label.toLowerCase().includes(lowerQuery) ||
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.keywords.some(k => k.toLowerCase().includes(lowerQuery))
        ).map(cmd => ({
            action: cmd.action,
            description: cmd.description,
            icon: cmd.icon,
            id: cmd.id,
            score: 9,
            title: cmd.label,
            type: 'command' as const,
        }));

        // 3. Theme Commands (Dynamic)
        const themeResults = this.getThemeCommands().filter(cmd =>
            cmd.title.toLowerCase().includes(lowerQuery) ||
            cmd.keywords?.some(k => k.toLowerCase().includes(lowerQuery))
        );

        return [...navResults, ...manualResults, ...themeResults];
    }

    private getThemeCommands(): SearchResult[] {
        const {setTheme} = useThemeStore.getState();

        return [
            {
                action: () => setTheme('tokyoLight'),
                description: '清爽明亮的浅色风格',
                icon: Sun,
                id: 'theme-tokyo-light',
                keywords: ['theme', 'light', 'white', 'tokyo', 'paper', '主题'],
                score: 5,
                title: '主题: Tokyo Light',
                type: 'command' as const
            },
            {
                action: () => setTheme('twitterDark'),
                description: '纯黑、高对比度的推特深色风格',
                icon: Moon,
                id: 'theme-twitter-dark',
                keywords: ['theme', 'dark', 'black', 'twitter', 'blue', '主题'],
                score: 5,
                title: '主题: Twitter Dark',
                type: 'command' as const
            },
            {
                action: () => setTheme('claudeDark'),
                description: '深色纸感风格',
                icon: Moon,
                id: 'theme-claude-dark',
                keywords: ['theme', 'dark', 'claude', 'paper', '主题'],
                score: 5,
                title: '主题: Claude Dark',
                type: 'command' as const
            },
            {
                action: () => setTheme('catppuccin'),
                description: '柔和的粉彩深色主题',
                icon: Palette,
                id: 'theme-catppuccin',
                keywords: ['theme', 'dark', 'catppuccin', 'mocha', '主题'],
                score: 5,
                title: '主题: Catppuccin Mocha',
                type: 'command' as const
            },
            {
                action: () => setTheme('everforest'),
                description: '护眼的绿色森林风格',
                icon: Palette,
                id: 'theme-everforest',
                keywords: ['theme', 'dark', 'everforest', 'green', 'wood', '主题'],
                score: 5,
                title: '主题: Everforest',
                type: 'command' as const
            }
        ];
    }
}

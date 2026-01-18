import { SearchAdapter, SearchResult } from '../SearchService';
import { COMMANDS } from '@/constants/commands';
import { NAV_ITEMS, NavItem } from '@/constants/navigation';
import { useThemeStore } from '@/state/themeStore';
import { Sun, Moon, Palette } from 'lucide-react';

export class CommandAdapter implements SearchAdapter {
    async search(query: string): Promise<SearchResult[]> {
        const lowerQuery = query.toLowerCase().trim();

        // 1. Navigation Items (From Sidebar Config) - "Interface Text"
        // This ensures what you see in the sidebar is always searchable
        const navResults: SearchResult[] = NAV_ITEMS.map((item: NavItem) => ({
            id: `nav-${item.id}`,
            type: 'navigation', // Explicitly cast to 'navigation' | 'action' | 'setting' | 'log'
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
        // but here we assume COMMANDS contains "extra" things.
        const manualResults: SearchResult[] = COMMANDS.filter(cmd =>
            cmd.label.toLowerCase().includes(lowerQuery) ||
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.keywords.some(k => k.toLowerCase().includes(lowerQuery))
        ).map(cmd => ({
            id: cmd.id,
            type: 'command',
            title: cmd.label,
            description: cmd.description,
            icon: cmd.icon,
            action: cmd.action,
            score: 9,
        }));

        // 3. Theme Commands (Dynamic)
        const themeResults = this.getThemeCommands().filter(cmd =>
            cmd.title.toLowerCase().includes(lowerQuery) ||
            cmd.keywords?.some(k => k.toLowerCase().includes(lowerQuery))
        );

        return [...navResults, ...manualResults, ...themeResults];
    }

    private getThemeCommands(): SearchResult[] {
        const setTheme = useThemeStore.getState().setTheme;

        return [
            {
                id: 'theme-paper-light',
                type: 'command',
                title: '主题: Paper Light (Twitter)',
                description: '清爽明亮的推特风格',
                icon: Sun,
                action: () => setTheme('paperLight'),
                keywords: ['theme', 'light', 'white', 'twitter', 'paper', '主题'],
                score: 5
            },
            {
                id: 'theme-twitter-dark',
                type: 'command',
                title: '主题: Twitter Dark',
                description: '纯黑、高对比度的推特深色风格',
                icon: Moon,
                action: () => setTheme('twitterDark'),
                keywords: ['theme', 'dark', 'black', 'twitter', 'blue', '主题'],
                score: 5
            },
            {
                id: 'theme-claude-dark',
                type: 'command',
                title: '主题: Claude Dark',
                description: '深色纸感风格',
                icon: Moon,
                action: () => setTheme('claudeDark'),
                keywords: ['theme', 'dark', 'claude', 'paper', '主题'],
                score: 5
            },
            {
                id: 'theme-catppuccin',
                type: 'command',
                title: '主题: Catppuccin Mocha',
                description: '柔和的粉彩深色主题',
                icon: Palette,
                action: () => setTheme('catppuccin'),
                keywords: ['theme', 'dark', 'catppuccin', 'mocha', '主题'],
                score: 5
            },
            {
                id: 'theme-discord',
                type: 'command',
                title: '主题: Discord Dark',
                description: '经典的 Discord 深色风格',
                icon: Palette,
                action: () => setTheme('discord'),
                keywords: ['theme', 'dark', 'discord', 'game', '主题'],
                score: 5
            }
        ];
    }
}

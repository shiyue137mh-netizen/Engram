/**
 * CommandPalette - 万用功能搜索框 (Spotlight 风格)
 *
 * 位于顶栏作为触发器，点击后全屏模态框显示。
 * 支持搜索命令、导航页面和搜索记忆。
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, CornerDownLeft, Palette, Moon, Sun } from 'lucide-react';
import { COMMANDS, searchCommands, CommandItem } from '@/constants/commands';
import { useThemeStore } from '@/stores/themeStore';

interface CommandPaletteProps {
    onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
    const setTheme = useThemeStore(state => state.setTheme);
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredCommands, setFilteredCommands] = useState<CommandItem[]>(COMMANDS);

    const inputRef = useRef<HTMLInputElement>(null);

    // 生成主题命令
    const themeCommands: CommandItem[] = [
        {
            id: 'theme-paper-light',
            icon: Sun,
            label: '主题: Paper Light (Twitter)',
            description: '清爽明亮的推特风格',
            action: () => setTheme('paperLight'),
            keywords: ['theme', 'light', 'white', 'twitter', 'paper', '主题'],
            type: 'action',
        },
        {
            id: 'theme-twitter-dark',
            icon: Moon,
            label: '主题: Twitter Dark',
            description: '纯黑、高对比度的推特深色风格',
            action: () => setTheme('twitterDark'),
            keywords: ['theme', 'dark', 'black', 'twitter', 'blue', '主题'],
            type: 'action',
        },
        {
            id: 'theme-claude-dark',
            icon: Moon,
            label: '主题: Claude Dark',
            description: '深色纸感风格',
            action: () => setTheme('claudeDark'),
            keywords: ['theme', 'dark', 'claude', 'paper', '主题'],
            type: 'action',
        },
        {
            id: 'theme-catppuccin',
            icon: Palette,
            label: '主题: Catppuccin Mocha',
            description: '柔和的粉彩深色主题',
            action: () => setTheme('catppuccin'),
            keywords: ['theme', 'dark', 'catppuccin', 'mocha', '主题'],
            type: 'action',
        },
        {
            id: 'theme-discord',
            icon: Palette,
            label: '主题: Discord Dark',
            description: '经典的 Discord 深色风格',
            action: () => setTheme('discord'),
            keywords: ['theme', 'dark', 'discord', 'game', '主题'],
            type: 'action',
        }
    ];

    // 搜索过滤
    useEffect(() => {
        const baseCmds = searchCommands(query);

        const lowerQuery = query.toLowerCase().trim();
        const filteredThemeCmds = themeCommands.filter(cmd =>
            !lowerQuery ||
            cmd.label.toLowerCase().includes(lowerQuery) ||
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.keywords.some(k => k.toLowerCase().includes(lowerQuery))
        );

        setFilteredCommands([...baseCmds, ...filteredThemeCmds]);
        setSelectedIndex(0);
    }, [query]);

    // 键盘快捷键 (Open)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K or Ctrl+K to open
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // 自动聚焦
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // 键盘导航 (Navigation)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const totalItems = filteredCommands.length + (query ? 1 : 0); // +1 for "Search Memory" option

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % totalItems);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
                break;
            case 'Enter':
                e.preventDefault();
                executeSelected();
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const executeSelected = () => {
        if (filteredCommands.length > 0 && selectedIndex < filteredCommands.length) {
            const cmd = filteredCommands[selectedIndex];
            cmd.action(onNavigate);
        } else if (query) {
            console.log('Searching memory for:', query);
            onNavigate('/memory'); // Pass query if needed
        }
        setIsOpen(false);
        setQuery('');
    };

    return (
        <>
            {/* Trigger Button (Icons only or small bar) */}
            {/* Trigger Button (Icons only) */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground"
                title="搜索 (Cmd+K)"
            >
                <Search size={20} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 animate-in fade-in duration-200"
                    style={{
                        height: '100dvh',
                        width: '100vw',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'var(--glass-backdrop-filter, blur(4px))' // Apply global glass blur variable
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    <div
                        className="w-full max-w-xl border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-top-4 duration-200"
                        style={{
                            backgroundColor: 'var(--popover)', // This will pick up the transparent color from theme
                            color: 'var(--popover-foreground)',
                            backdropFilter: 'var(--glass-backdrop-filter)' // Ensure the modal content itself also blurs what's behind it if it's transparent
                        }}
                    >
                        {/* Input Area */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                            <Search size={20} className="text-muted-foreground shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50"
                                placeholder="输入命令、跳转页面或搜索记忆..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50">ESC</div>
                        </div>

                        {/* Results List */}
                        <div className="max-h-[60vh] overflow-y-auto p-2 scroll-smooth">
                            {/* ... (Existing List Rendering Logic) ... */}
                            {filteredCommands.length > 0 && (
                                <div className="space-y-1">
                                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">建议操作</div>
                                    {filteredCommands.map((cmd, index) => (
                                        <div
                                            key={cmd.id}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${index === selectedIndex ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/50'}`}
                                            onClick={() => {
                                                cmd.action(onNavigate);
                                                setIsOpen(false);
                                                setQuery('');
                                            }}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <cmd.icon size={18} className={`shrink-0 ${index === selectedIndex ? 'text-primary' : 'text-muted-foreground'}`} />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium">{cmd.label}</div>
                                                {cmd.description && (
                                                    <div className="text-xs text-muted-foreground/80 truncate">{cmd.description}</div>
                                                )}
                                            </div>
                                            {index === selectedIndex && <CornerDownLeft size={16} className="text-muted-foreground/50" />}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {query && (
                                <div className="mt-2 pt-2 border-t border-border/50">
                                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">全站搜索</div>
                                    <div
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${selectedIndex === filteredCommands.length ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/50'}`}
                                        onClick={() => executeSelected()}
                                        onMouseEnter={() => setSelectedIndex(filteredCommands.length)}
                                    >
                                        <Search size={18} className={`shrink-0 ${selectedIndex === filteredCommands.length ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium">搜索记忆: "<span className="text-primary">{query}</span>"</div>
                                            <div className="text-xs text-muted-foreground/80">在记忆流和知识图谱中深度搜索</div>
                                        </div>
                                        {selectedIndex === filteredCommands.length && <CornerDownLeft size={16} className="text-muted-foreground/50" />}
                                    </div>
                                </div>
                            )}

                            {filteredCommands.length === 0 && !query && (
                                <div className="px-4 py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                                    <Search size={32} className="opacity-20 mb-2" />
                                    <p>输入关键词开始搜索...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

/**
 * CommandPalette - 万用功能搜索框
 *
 * 位于顶栏，支持搜索命令、导航页面和搜索记忆
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, CornerDownLeft, Palette, Moon, Sun } from 'lucide-react';
import { COMMANDS, searchCommands, CommandItem } from '../../constants/commands';
import { useTheme } from '../../contexts/ThemeContext';

interface CommandPaletteProps {
    onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
    const { setTheme } = useTheme();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredCommands, setFilteredCommands] = useState<CommandItem[]>(COMMANDS);

    const wrapperRef = useRef<HTMLDivElement>(null);
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

    // 点击外部关闭
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 键盘快捷键
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K or Ctrl+K to open
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
            }
            return;
        }

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
                inputRef.current?.blur();
                break;
        }
    };

    const executeSelected = () => {
        if (filteredCommands.length > 0 && selectedIndex < filteredCommands.length) {
            // 执行命令
            const cmd = filteredCommands[selectedIndex];
            cmd.action(onNavigate);
        } else if (query) {
            // 搜索记忆 (最后一项)
            console.log('Searching memory for:', query);
            onNavigate('/memory');
        }
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-xl" ref={wrapperRef}>
            <div className={`flex items-center gap-2 px-3 py-2 bg-muted-50 border border-input rounded-md transition-all duration-200 ${isOpen ? 'ring-2 ring-ring border-transparent bg-background' : 'hover:bg-muted-80'}`}>
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
                    placeholder="搜索命令、页面或记忆... (Cmd+K)"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                {!query && <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-mono border border-border"><Command size={10} />K</div>}
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-1 bg-popover-95 backdrop-blur-md border border-border rounded-lg shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100">
                    {/* 命令列表 */}
                    {filteredCommands.length > 0 && (
                        <div className="py-1">
                            <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">功能与导航</div>
                            {filteredCommands.map((cmd, index) => (
                                <div
                                    key={cmd.id}
                                    className={`flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors ${index === selectedIndex ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted-50'}`}
                                    onClick={() => {
                                        cmd.action(onNavigate);
                                        setIsOpen(false);
                                        setQuery('');
                                    }}
                                >
                                    <cmd.icon size={16} className={`shrink-0 ${index === selectedIndex ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium">{cmd.label}</div>
                                        {cmd.description && (
                                            <div className="text-xs text-muted-foreground truncate">{cmd.description}</div>
                                        )}
                                    </div>
                                    {index === selectedIndex && <CornerDownLeft size={14} className="text-muted-foreground" />}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 记忆搜索选项 (仅当有输入时显示) */}
                    {query && (
                        <div className="py-1 border-t border-border mt-1 pt-1">
                            <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">搜索</div>
                            <div
                                className={`flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors ${selectedIndex === filteredCommands.length ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted-50'}`}
                                onClick={() => {
                                    executeSelected();
                                }}
                            >
                                <Search size={16} className={`shrink-0 ${selectedIndex === filteredCommands.length ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium">搜索记忆: "{query}"</div>
                                    <div className="text-xs text-muted-foreground">在记忆流和图谱中搜索此关键词</div>
                                </div>
                                {selectedIndex === filteredCommands.length && <CornerDownLeft size={14} className="text-muted-foreground" />}
                            </div>
                        </div>
                    )}

                    {filteredCommands.length === 0 && !query && (
                        <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                            无需搜索，直接输入...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

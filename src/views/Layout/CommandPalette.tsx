/**
 * CommandPalette - 万用功能搜索框
 *
 * 位于顶栏，支持搜索命令、导航页面和搜索记忆
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, CornerDownLeft } from 'lucide-react';
import { COMMANDS, searchCommands, CommandItem } from '../../constants/commands';

interface CommandPaletteProps {
    onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredCommands, setFilteredCommands] = useState<CommandItem[]>(COMMANDS);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 搜索过滤
    useEffect(() => {
        setFilteredCommands(searchCommands(query));
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
            // TODO: 这里可以改为携带参数跳转，目前先跳转到 memory
            console.log('Searching memory for:', query);
            onNavigate('/memory');
            // 可以通过 EventBus 发送搜索词，或者 URL 参数
        }
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className="engram-command-palette" ref={wrapperRef}>
            <div className={`engram-cp-input-wrapper ${isOpen ? 'active' : ''}`}>
                <Search size={16} className="engram-cp-icon" />
                <input
                    ref={inputRef}
                    type="text"
                    className="engram-cp-input"
                    placeholder="搜索命令、页面或记忆... (Cmd+K)"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                {!query && <div className="engram-cp-shortcut"><Command size={12} />K</div>}
            </div>

            {isOpen && (
                <div className="engram-cp-dropdown">
                    {/* 命令列表 */}
                    {filteredCommands.length > 0 && (
                        <div className="engram-cp-group">
                            <div className="engram-cp-label">功能与导航</div>
                            {filteredCommands.map((cmd, index) => (
                                <div
                                    key={cmd.id}
                                    className={`engram-cp-item ${index === selectedIndex ? 'selected' : ''}`}
                                    onClick={() => {
                                        cmd.action(onNavigate);
                                        setIsOpen(false);
                                        setQuery('');
                                    }}
                                >
                                    <cmd.icon size={16} className="engram-cp-item-icon" />
                                    <div className="engram-cp-item-content">
                                        <div className="engram-cp-item-title">{cmd.label}</div>
                                        {cmd.description && (
                                            <div className="engram-cp-item-desc">{cmd.description}</div>
                                        )}
                                    </div>
                                    {index === selectedIndex && <CornerDownLeft size={14} className="engram-cp-enter" />}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 记忆搜索选项 (仅当有输入时显示) */}
                    {query && (
                        <div className="engram-cp-group">
                            <div className="engram-cp-label">搜索</div>
                            <div
                                className={`engram-cp-item ${selectedIndex === filteredCommands.length ? 'selected' : ''}`}
                                onClick={() => {
                                    executeSelected();
                                }}
                            >
                                <Search size={16} className="engram-cp-item-icon" />
                                <div className="engram-cp-item-content">
                                    <div className="engram-cp-item-title">搜索记忆: "{query}"</div>
                                    <div className="engram-cp-item-desc">在记忆流和图谱中搜索此关键词</div>
                                </div>
                                {selectedIndex === filteredCommands.length && <CornerDownLeft size={14} className="engram-cp-enter" />}
                            </div>
                        </div>
                    )}

                    {filteredCommands.length === 0 && !query && (
                        <div className="engram-cp-empty">
                            无需搜索，直接输入...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

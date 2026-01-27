import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Search, CornerDownLeft, Command } from 'lucide-react';
import { searchService, SearchResult } from '@/modules/search/SearchService';
// Register adapters (ensure they are registered once)
import { CommandAdapter } from '@/modules/search/adapters/CommandAdapter';
import { SettingAdapter } from '@/modules/search/adapters/SettingAdapter';
import { LogAdapter } from '@/modules/search/adapters/LogAdapter';
import { MemoryAdapter } from '@/modules/search/adapters/MemoryAdapter';
import { PresetAdapter } from '@/modules/search/adapters/PresetAdapter';

// Singleton registration (simple check)
// @ts-ignore
// @ts-ignore
if (!window.__ENGRAM_SEARCH_INIT__) {
    searchService.registerAdapter(new CommandAdapter());
    searchService.registerAdapter(new SettingAdapter());
    searchService.registerAdapter(new LogAdapter());
    searchService.registerAdapter(new MemoryAdapter());
    searchService.registerAdapter(new PresetAdapter());
    // @ts-ignore
    window.__ENGRAM_SEARCH_INIT__ = true;
}

interface CommandPaletteProps {
    onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [results, setResults] = useState<SearchResult[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    // Search Effect
    useEffect(() => {
        const doSearch = async () => {
            // If query matches nothing, maybe show default commands?
            // For now we just search based on query.
            // If query empty, show static commands (CommandAdapter handles this if implemented,
            // but currently SearchServiceImpl checks if query.trim()).

            if (!query.trim()) {
                // Empty query: show default recommended commands
                const defaultResults = await new CommandAdapter().search('');
                // Filter to only navigation/action types generally useful
                setResults(defaultResults);
                return;
            }

            const res = await searchService.search(query);
            setResults(res);
            setSelectedIndex(0);
        };
        doSearch();
    }, [query, isOpen]);

    // Keyboard Shortcuts (Open)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto Focus
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // 注册外部打开回调（供键盘快捷键调用）
    useEffect(() => {
        // 动态导入避免循环依赖
        import('@/index').then(({ setCommandPaletteCallback }) => {
            setCommandPaletteCallback(() => setIsOpen(true));
        }).catch(() => {
            // 忽略导入失败
        });
    }, []);

    // Navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const totalItems = results.length + (query ? 1 : 0); // +1 for "Search Memory"

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
        if (results.length > 0 && selectedIndex < results.length) {
            const item = results[selectedIndex];
            item.action(onNavigate);
        } else if (query) {
            // "Search Memory" fallback
            console.log('Searching memory for:', query);
            onNavigate('/memory');
        }
        setIsOpen(false);
        setQuery('');
    };

    // Modal Content
    const modalContent = (
        <div className="engram-app-root" style={{ display: 'contents' }}>
            <div
                className="fixed inset-0 flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200"
                style={{
                    height: '100dvh',
                    width: '100vw',
                    backgroundColor: 'rgba(0,0,0,0.4)', // Slightly more transparent to not feel too heavy
                    backdropFilter: 'var(--glass-backdrop-filter, blur(4px))',
                    zIndex: 2147483647, // Max safe integer to ensure it's on top of SillyTavern UI
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setIsOpen(false);
                }}
            >
                <div
                    className="w-full max-w-xl border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-top-4 duration-200"
                    style={{
                        backgroundColor: 'var(--popover)',
                        color: 'var(--popover-foreground)',
                        backdropFilter: 'var(--glass-backdrop-filter)',
                        maxHeight: '70vh'
                    }}
                >
                    {/* Input Area */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                        <Search size={20} className="text-muted-foreground shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50"
                            placeholder="输入命令、设置或关键词..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50 hidden sm:block">ESC</div>
                    </div>

                    {/* Results List */}
                    <div className="overflow-y-auto p-2 scroll-smooth">
                        {/* Explicit Results */}
                        {results.length > 0 && (
                            <div className="space-y-1">
                                {results.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-[var(--duration-fast)] ${index === selectedIndex
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-foreground hover:bg-muted/50'
                                            }`}
                                        onClick={() => {
                                            item.action(onNavigate);
                                            setIsOpen(false);
                                            setQuery('');
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        {/* Icon Box */}
                                        <div className={`
                                        w-8 h-8 rounded-md flex items-center justify-center shrink-0
                                        ${index === selectedIndex ? 'bg-primary/20' : 'bg-muted/50 text-muted-foreground'}
                                    `}>
                                            {item.icon ? <item.icon size={16} /> : <Command size={16} />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{item.title}</span>
                                                {item.type !== 'command' && (
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground uppercase">
                                                        {item.type}
                                                    </span>
                                                )}
                                            </div>
                                            {item.description && (
                                                <div className="text-xs text-muted-foreground/80 truncate">{item.description}</div>
                                            )}
                                        </div>

                                        {index === selectedIndex && <CornerDownLeft size={16} className="text-muted-foreground/50" />}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Fallback: Search Memory */}
                        {query && (
                            <div className={`
                            mt-2 pt-2 border-t border-border/50
                            flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                            ${selectedIndex === results.length ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/50'}
                        `}
                                onClick={() => executeSelected()}
                                onMouseEnter={() => setSelectedIndex(results.length)}
                            >
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${selectedIndex === results.length ? 'bg-primary/20' : 'bg-muted/50 text-muted-foreground'}`}>
                                    <Search size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium">全站搜索: "<span className="text-primary">{query}</span>"</div>
                                    <div className="text-xs text-muted-foreground/80">在记忆和知识图谱中查找...</div>
                                </div>
                                {selectedIndex === results.length && <CornerDownLeft size={16} className="text-muted-foreground/50" />}
                            </div>
                        )}

                        {/* Empty State */}
                        {results.length === 0 && !query && (
                            <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                                <Command size={32} className="mx-auto mb-2 opacity-20" />
                                <p>随时随地，想搜就搜 (Cmd+K)</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-[var(--duration-fast)] text-muted-foreground hover:scale-110 active:scale-95"
                title="搜索 (Cmd+K)"
            >
                <Search size={20} />
            </button>
            {isOpen && ReactDOM.createPortal(modalContent, document.body)}
        </>
    );
};

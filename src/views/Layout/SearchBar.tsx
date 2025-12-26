// 搜索栏组件
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(query);
    };

    return (
        <footer className="engram-searchbar">
            <form onSubmit={handleSubmit} className="engram-search-form">
                <Search size={18} className="engram-search-icon" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="搜索记忆..."
                    className="engram-search-input"
                />
            </form>
        </footer>
    );
};

export default SearchBar;

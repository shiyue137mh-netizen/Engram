import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeName, themes } from '../styles/themes';
import { ThemeManager } from '../infrastructure/ThemeManager';

interface ThemeContextType {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Initialize state from Manager's current state
    const [theme, setThemeState] = useState<ThemeName>(ThemeManager.getTheme());

    const isDarkMode = theme !== 'paperLight';

    // Sync React state -> Manager
    const setTheme = (t: ThemeName) => {
        ThemeManager.setTheme(t);
        setThemeState(t);
    };

    // Ensure manager is in sync on mount (double check)
    useEffect(() => {
        const current = ThemeManager.getTheme();
        if (current !== theme) {
            setThemeState(current);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

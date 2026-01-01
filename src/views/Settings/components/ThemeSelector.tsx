import React, { useEffect, useState } from 'react';
import { ThemeManager } from '@/services/ThemeManager';
import { themes, ThemeName } from '../../../styles/themes';
import { SettingsManager } from '@/services/settings/Persistence';

interface ThemeOption {
    id: ThemeName;
    name: string;
    primary: string;
    background: string;
    sidebar: string;
}

export const ThemeSelector: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('claudeDark');

    useEffect(() => {
        setCurrentTheme(ThemeManager.getTheme());
    }, []);

    const handleThemeChange = (themeId: ThemeName) => {
        ThemeManager.setTheme(themeId);
        SettingsManager.set('theme', themeId); // Persist to ST settings
        setCurrentTheme(themeId);
    };

    // Prepare theme options for display
    const options: ThemeOption[] = Object.entries(themes).map(([key, theme]) => {
        let bg = theme.colors.background;
        let prim = theme.colors.primary;

        // Handle CSS variables for SillyTavern theme preview
        // if (key === 'sillytavern') {
        //     bg = 'var(--SmartThemeBlurTintColor, #333)';
        //     prim = 'var(--SmartThemeQuoteColor, #0af)';
        // }

        return {
            id: key as ThemeName,
            name: theme.name,
            background: bg,
            sidebar: theme.colors.sidebar, // Add sidebar color
            primary: prim
        };
    });

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">主题设置</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleThemeChange(option.id)}
                        className={`
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${currentTheme === option.id
                                ? 'border-primary bg-accent/10'
                                : 'border-transparent hover:bg-accent/5'
                            }
                        `}
                    >
                        {/* Circular Swatch */}
                        {/* 3-Color Swatch Palette */}
                        <div className="flex items-center justify-center -space-x-3 mb-2">
                            {/* Main Background */}
                            <div
                                className="w-8 h-8 rounded-full border border-border shadow-sm z-10"
                                style={{ background: option.background }}
                                title="Background"
                            />
                            {/* Sidebar Background */}
                            <div
                                className="w-8 h-8 rounded-full border border-border shadow-sm z-20"
                                style={{ background: option.sidebar }}
                                title="Sidebar"
                            />
                            {/* Primary Accent */}
                            <div
                                className="w-8 h-8 rounded-full border border-border shadow-sm z-30 ring-2 ring-background"
                                style={{ background: option.primary }}
                                title="Primary"
                            />
                        </div>

                        <span className={`text-sm font-medium ${currentTheme === option.id ? 'text-primary' : 'text-muted-foreground'}`}>
                            {option.name}
                        </span>

                        {currentTheme === option.id && (
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

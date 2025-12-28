export interface Theme {
    name: string;
    colors: {
        background: string;
        foreground: string;
        card: string;
        cardForeground: string;
        popover: string;
        popoverForeground: string;
        primary: string;
        primaryForeground: string;
        secondary: string;
        secondaryForeground: string;
        muted: string;
        mutedForeground: string;
        accent: string;
        accentForeground: string;
        destructive: string;
        destructiveForeground: string;
        border: string;
        input: string;
        ring: string;
        chart1: string;
        chart2: string;
        chart3: string;
        chart4: string;
        chart5: string;
        sidebar: string;
        sidebarForeground: string;
        sidebarPrimary: string;
        sidebarPrimaryForeground: string;
        sidebarAccent: string;
        sidebarAccentForeground: string;
        sidebarBorder: string;
        sidebarRing: string;
    };
    variables: {
        radius: string;
    }
}

import { create } from 'zustand';

interface CommandStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    toggle: () => void;

    // Navigation Bridge
    navigate: (path: string) => void;
    setNavigateCallback: (cb: (path: string) => void) => void;
}

export const useCommandStore = create<CommandStore>((set, get) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),

    // Default no-op, will be overridden by App
    navigate: (path: string) => console.warn('Navigation not connected', path),
    setNavigateCallback: (cb) => set({ navigate: cb })
}));

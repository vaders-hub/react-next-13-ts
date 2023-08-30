import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';
interface ThemeState {
  mode: ThemeMode;
  actions: {
    toggleTheme: (newMode: ThemeMode) => void;
  };
}

const useThemeStore = create<ThemeState>()(
  devtools(
    (set, get) => ({
      mode: 'light',
      actions: {
        toggleTheme: newMode => set({ mode: newMode }),
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
);

export const useTheme = () => useThemeStore(state => state.mode);
export const useThemeActions = () => useThemeStore(state => state.actions);

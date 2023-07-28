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

interface BearState {
  bears: number;
  fish: number;
  actions: {
    increasePopulation: (by: number) => void;
    eatFish: () => void;
    removeAllBears: () => void;
  };
}

const useBearStore = create<BearState>()(
  devtools(
    (set, get) => ({
      bears: 1,
      fish: 0,
      actions: {
        increasePopulation: by => set(state => ({ bears: state.bears + by })),
        eatFish: () => set(state => ({ fish: state.fish - 1 })),
        removeAllBears: () => set({ bears: 0 }),
      },
    }),
    {
      name: 'bear-storage',
    },
  ),
);

export const useTheme = () => useThemeStore(state => state.mode);
export const useThemeActions = () => useThemeStore(state => state.actions);
export const useBears = () => useBearStore(state => state.bears);
export const useBearActions = () => useBearStore(state => state.actions);

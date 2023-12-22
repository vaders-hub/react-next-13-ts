import { create, createStore, useStore } from 'zustand';
import { devtools, persist, createJSONStorage, StateStorage } from 'zustand/middleware';

import { createNewsSlice } from 'store/news';

type ThemeMode = 'light' | 'dark';
type CallbackType = null | ((param?: any) => any);
interface CommonState {
  pageLoaded: boolean;
  favoriteOpened: boolean;
  modal: { visible: boolean; component?: string; callback?: CallbackType };
  nav: any;
  actions: {
    setPageLoad: (flag: boolean) => void;
    toggleFavorite: () => void;
    setNav: (data: any) => void;
    showModal: (param: any) => void;
    closeModal: () => void;
  };
}

interface ThemeState {
  mode: ThemeMode;
  actions: {
    toggleTheme: (newMode: ThemeMode) => void;
  };
}

export const createBearSlice = (set: any) => ({
  bears: 0,
  addBear: () => set((state: any) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state: any) => ({ fishes: state.fishes - 1 })),
});

export const useCommonStore = create<any>()(
  devtools((set, get) => ({
    ...createBearSlice(set),
    ...createNewsSlice(set),
    pageLoaded: false,
    favoriteOpened: false,
    modal: { visible: false, component: '', callback: null },
    nav: [],
    actions: {
      ...createNewsSlice(set).actions,
      setPageLoad: (flag: any) => set({ pageLoaded: flag }),
      toggleFavorite: () => set((state: any) => ({ favoriteOpened: !state.favoriteOpened })),
      setNav: (data: any) => set({ nav: data }, false, 'setGlobalNav'),
      showModal: (param: any) =>
        set((state: any) => ({
          modal: { ...state.modal, visible: true, ...param },
        })),
      closeModal: () => set((state: any) => ({ modal: { visible: false, component: '', callback: null } })),
    },
  })),
);

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

export const usePageLoaded = () => useCommonStore(state => state.pageLoaded);
export const usePageLoadActions = () => useCommonStore(state => state.actions);
export const useFavoriteToggle = () => useCommonStore(state => state.favoriteOpened);
export const useFavoriteToggleAction = () => useCommonStore(state => state.actions.toggleFavorite);
export const useModal = () => useCommonStore(state => state.modal);
export const useModalActions = () => useCommonStore(state => state.actions);
export const useNav = () => useCommonStore(state => state.nav);
export const useNavActions = () => useCommonStore(state => state.actions);
export const useTheme = () => useThemeStore(state => state.mode);
export const useThemeActions = () => useThemeStore(state => state.actions);

import { create, createStore, useStore } from 'zustand';
import { devtools, persist, createJSONStorage, StateStorage } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';
type CallbackType = null | (() => any);
interface CommonState {
  pageLoaded: boolean;
  favoriteOpened: boolean;
  modal: { visible: boolean; component?: string; callback?: CallbackType };
  nav: any;
  actions: {
    setPageLoad: (flag: boolean) => void;
    toggleFavorite: () => void;
    setNav: (data: any) => void;
    modal: {
      showModal: () => void;
      closeModal: () => void;
    };
  };
}

interface ThemeState {
  mode: ThemeMode;
  actions: {
    toggleTheme: (newMode: ThemeMode) => void;
  };
}

export const createNewCustomStore = (initProps?: Partial<any>) => {
  const DEFAULT_PROPS: any = {
    pageLoaded: false,
    modal: { visible: false, component: '', callback: null },
    nav: [],
  };

  return createStore<CommonState>()(set => ({
    ...DEFAULT_PROPS,
    ...initProps,
    pageLoaded: false,
    modal: { visible: false, component: '', callback: null },
    // nav: [],
    actions: {
      setPageLoad: flag => set({ pageLoaded: flag }),
      setNav: data => set({ nav: data }),
      modal: {
        showModal: () => set(state => ({ modal: { ...state.modal, visible: true } })),
        closeModal: () => set(state => ({ modal: { visible: false, component: '', callback: null } })),
      },
    },
  }));
};

export const useCommonStore = create<CommonState>()(
  devtools(
    persist(
      (set, get) => ({
        pageLoaded: false,
        favoriteOpened: false,
        modal: { visible: false, component: '', callback: null },
        nav: [],
        actions: {
          setPageLoad: flag => set({ pageLoaded: flag }),
          toggleFavorite: () => set(state => ({ favoriteOpened: !state.favoriteOpened })),
          setNav: data => set({ nav: data }),
          modal: {
            showModal: () => set(state => ({ modal: { ...state.modal, visible: true } })),
            closeModal: () => set(state => ({ modal: { visible: false, component: '', callback: null } })),
          },
        },
      }),
      {
        name: 'common-storage',
        partialize: state => ({ nav: state.nav }),
      },
    ),
  ),
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
export const useModalActions = () => useCommonStore(state => state.actions.modal);
export const useNav = () => useCommonStore(state => state.nav);
export const useNavActions = () => useCommonStore(state => state.actions);
export const useTheme = () => useThemeStore(state => state.mode);
export const useThemeActions = () => useThemeStore(state => state.actions);

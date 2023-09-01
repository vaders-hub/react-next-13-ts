import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';
type CallbackType = null | (() => any);
interface CommonState {
  pageLoaded: boolean;
  modal: { visible: boolean; component?: string; callback?: CallbackType };
  actions: {
    setPageLoad: () => void;
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

const useCommonStore = create<CommonState>()(
  devtools(
    (set, get) => ({
      pageLoaded: false,
      modal: { visible: false, component: '', callback: null },
      actions: {
        setPageLoad: () => set(state => ({ pageLoaded: !state.pageLoaded })),
        modal: {
          showModal: () => set(state => ({ modal: { ...state.modal, visible: true } })),
          closeModal: () => set(state => ({ modal: { visible: false, component: '', callback: null } })),
        },
      },
    }),
    {
      name: 'common-storage',
    },
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
export const useModal = () => useCommonStore(state => state.modal);
export const useModalActions = () => useCommonStore(state => state.actions.modal);
export const useTheme = () => useThemeStore(state => state.mode);
export const useThemeActions = () => useThemeStore(state => state.actions);

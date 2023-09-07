import { useContext } from 'react';
import { useStore } from 'zustand';

import { createContext } from 'react';

export const CommonContext = createContext<any>(null);

type CallbackType = null | (() => any);
interface CommonState {
  pageLoaded: boolean;
  modal: { visible: boolean; component?: string; callback?: CallbackType };
  nav: any;
  actions: {
    setPageLoad: (flag: boolean) => void;
    setNav: (data: any) => void;
    modal: {
      showModal: () => void;
      closeModal: () => void;
    };
  };
}

export default function useCommonContext<T>(selector: (state: any) => T): T {
  const store = useContext(CommonContext);
  console.log('store', store);
  // if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStore(store, selector);
}

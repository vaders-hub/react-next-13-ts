import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface SessionState {
  isLoggedIn: boolean;
  actions: {
    updateStatus: () => void;
  };
}

export const fetchAuth = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoggedIn: false,
        actions: {
          updateStatus: () => {
            /*
              update other store
              
              const newStore = useNewsStore.getState();
              newStore.selected = 'abc';
              
            */
            set({ isLoggedIn: true });
          },
        },
      }),
      {
        name: 'session-storage',
        partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => !['actions'].includes(key))),
      },
    ),
  ),
);

export const useSession = () => useSessionStore(state => state.isLoggedIn);
export const useSessionActions = () => useSessionStore(state => state.actions);
export { useSessionStore };

import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { useNewsStore } from 'store/news';

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
              * update other store
              
              const newStore = useNewsStore.getState();
              newStore.selected = 'abc';
              
            */
            set({ isLoggedIn: true });
          },
        },
      }),
      {
        name: 'session-storage',
      },
    ),
  ),
);

export const useSession = () => useSessionStore(state => state.isLoggedIn);
export const useSessionActions = () => useSessionStore(state => state.actions);

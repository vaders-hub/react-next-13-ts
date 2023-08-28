import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { cafeAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

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
    (set, get) => ({
      isLoggedIn: false,
      actions: {
        updateStatus: () => set({ isLoggedIn: true }),
      },
    }),
    {
      name: 'session-storage',
    },
  ),
);

export const useSession = () => useSessionStore(state => state.isLoggedIn);
export const useSessionActions = () => useSessionStore(state => state.actions);

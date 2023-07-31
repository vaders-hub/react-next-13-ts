import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import cafeAxiosInstance from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface CafeState {
  list: [];
}

const fetchCafe = async (): Promise<any> => {
  const response = await cafeAxiosInstance.get('cafes', { params: { page: 1, search: '' } });
  return response.data;
};

export const useCafeQuery = () => {
  const queryInfo = useQuery({ queryKey: ['cafe'], queryFn: fetchCafe });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

const useCafeStore = create<CafeState>()(
  devtools(
    (set, get) => ({
      list: [],
    }),
    {
      name: 'theme-storage',
    },
  ),
);

export const useCafeList = () => useCafeStore(state => state.list);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import cafeAxiosInstance from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface CafeState {
  list: [];
}

interface CafePrams {
  page: number;
}

const fetchCafe = async ({ page }: CafePrams): Promise<any> => {
  const response = await cafeAxiosInstance.get('cafes', { params: { page, search: '' } });
  return response.data;
};

export const useCafeQuery = ({ page }: CafePrams) => {
  const queryInfo = useQuery({ queryKey: ['cafe', { page }], queryFn: () => fetchCafe({ page }) });

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

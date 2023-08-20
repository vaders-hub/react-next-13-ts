import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { cafeAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface CafeState {
  list: [];
}

interface CafePrams {
  page: number;
  search: string;
}

const fetchCafe = async ({ page, search }: CafePrams): Promise<any> => {
  const response = await cafeAxiosInstance.get('cafes', { params: { page, search } });
  return response.data;
};

export const useCafeQuery = ({ page, search }: CafePrams) => {
  const queryInfo = useQuery({ queryKey: ['cafe', { page, search }], queryFn: () => fetchCafe({ page, search }) });

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
      name: 'cafe-storage',
    },
  ),
);

export const useCafeList = () => useCafeStore(state => state.list);

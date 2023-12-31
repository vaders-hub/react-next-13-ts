import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { wretchInstance } from 'util/wretch';
import { cafeAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface CafeState {
  list: [];
}

interface CafePrams {
  page: number;
  search: string;
}

export const fetchCafe = async ({ page, search }: CafePrams): Promise<any> => {
  const response = await cafeAxiosInstance.get('cafes', { params: { page, search } });
  // const wretchResponse = await wretchInstance.get('/todos/1');
  return response.data;
};

export const useCafeQuery = ({ page, search }: CafePrams) => {
  const queryInfo = useQuery({ queryKey: ['cafe', { page, search }], queryFn: () => fetchCafe({ page, search }) });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

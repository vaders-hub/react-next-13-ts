import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { newsAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface NewsState {
  selected: string | null;
  actions: {
    setSelected: (index: string) => void;
  };
}

interface NewsParams {
  q: string | null;
  from: string;
  to: string;
  sortBy: string;
  pageSize?: number;
  page?: number;
}

export const fetchNews = async (params: NewsParams): Promise<any> => {
  const response = await newsAxiosInstance.get('everything/', { params });
  return response.data;
};

export const useNewsQuery = (params: NewsParams, flag: any) => {
  const queryInfo = useQuery({
    queryKey: ['news', params],
    queryFn: () => fetchNews(params),
    enabled: flag,
    staleTime: 5 * 1000,
  });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

const useNewsStore = create<NewsState>()(
  devtools(
    (set, get) => ({
      selected: null,
      actions: {
        setSelected: index => set({ selected: index }),
      },
    }),
    {
      name: 'news-storage',
    },
  ),
);

export const useSelectedNews = () => useNewsStore(state => state.selected);
export const useSelectedNewsActions = () => useNewsStore(state => state.actions);

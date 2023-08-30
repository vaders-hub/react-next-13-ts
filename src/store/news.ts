import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { newsAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface NewsState {
  topics: string[];
  selected: string | null;
  actions: {
    addTopcis: (topics: string[]) => void;
    clearTopics: () => void;
    setSelected: (index: string) => void;
  };
}

interface NewsParams {
  q: string | any;
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

export const useNewsStore = create<NewsState>()(
  devtools(
    persist(
      (set, get) => ({
        topics: [],
        selected: null,
        actions: {
          addTopcis: topics => set({ topics: [...topics] }),
          clearTopics: () => set({ topics: [] }),
          setSelected: topic => set({ selected: topic }),
        },
      }),
      {
        name: 'news-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => !['actions'].includes(key))),
      },
    ),
  ),
);

export const useTopics = () => useNewsStore(state => state.topics);
export const useSelectedTopic = () => useNewsStore(state => state.selected);
export const useSelectedTopicActions = () => useNewsStore(state => state.actions);

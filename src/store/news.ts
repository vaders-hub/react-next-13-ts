import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { newsAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface RedditParams {
  q: string;
  from: string;
  to: string;
  sortBy: string;
  pageSize?: number;
  page?: number;
}

export const fetchNews = async (params: RedditParams): Promise<any> => {
  const response = await newsAxiosInstance.get('everything/', { params });
  return response.data;
};

export const useNewsQuery = (params: RedditParams, flag: any) => {
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

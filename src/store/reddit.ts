import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { redditAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface RedditParams {
  limit: string;
  t: string;
}

export const fetchReddit = async (params: RedditParams): Promise<any> => {
  const response = await redditAxiosInstance.get('top.json?', { params });
  return response.data;
};

export const useRedditQuery = (params: RedditParams, init: any) => {
  const queryInfo = useQuery({
    queryKey: ['reddit', params],
    queryFn: () => fetchReddit(params),
    initialData: init.posts,
    suspense: true,
    staleTime: 5 * 1000,
  });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { redditAxiosInstance } from 'util/axios';
import { useQuery } from '@tanstack/react-query';

interface CafeState {
  list: [];
}

interface RedditParams {
  limit: string;
  t: string;
}

const fetchReddit = async (params: RedditParams): Promise<any> => {
  const response = await redditAxiosInstance.get('top.json?', { params });
  return response.data;
};

export const useRedditQuery = (params: CafePrams) => {
  const queryInfo = useQuery({ queryKey: ['reddit', params], queryFn: () => fetchReddit(params) });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

import { wretchNextInstance } from 'util/wretch';

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
  // const response = await newsAxiosInstance.get('everything/', { params });
  // return response.data;
  const data: any = wretchNextInstance.get('/news');

  return data;
};

import axios from 'axios';
import { useCommonStore } from 'store';

const cafeAxiosInstance = axios.create({
  baseURL: 'https://api.roastandbrew.coffee/api/v1/',
});

cafeAxiosInstance.interceptors.request.use(
  config => {
    /*
      call store outside hook
      
      console.log('useSessionRoot', useSessionStore.getState());
     */
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

cafeAxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

const newsAxiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

const newsKey = process.env.NEWS_KEY;

newsAxiosInstance.interceptors.request.use(
  config => {
    const baseConfig = {
      ...config,
      params: {
        ...config.params,
        apiKey: newsKey,
      },
    };

    const commonState = useCommonStore.getState();
    const pageStat = commonState?.pageLoaded;
    console.log('api call', pageStat);

    return baseConfig;
  },
  error => {
    return Promise.reject(error);
  },
);

newsAxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export { cafeAxiosInstance, newsAxiosInstance };

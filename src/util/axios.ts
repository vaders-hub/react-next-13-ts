import axios from 'axios';
import { useSessionStore } from 'store/session';

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

newsAxiosInstance.interceptors.request.use(
  config => {
    const baseConfig = {
      ...config,
      params: {
        ...config.params,
        apiKey: '7e3e8748837845e0a3763d6711159528', // '71eecdf3565f41b0bf4d80fc01205d8f',
      },
    };

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

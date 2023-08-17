import axios from 'axios';

const cafeAxiosInstance = axios.create({
  baseURL: 'https://api.roastandbrew.coffee/api/v1/',
});

cafeAxiosInstance.interceptors.request.use(
  config => {
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
        apiKey: '7e3e8748837845e0a3763d6711159528',
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

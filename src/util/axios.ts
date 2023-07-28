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

export default cafeAxiosInstance;

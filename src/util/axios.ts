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

const redditAxiosInstance = axios.create({
  baseURL: 'https://www.reddit.com/r/Wallstreetbets/',
});

redditAxiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

redditAxiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);
export { cafeAxiosInstance, redditAxiosInstance };

import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : `http://localhost:8000/api`,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error.response || error.message)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  }
);
export default axiosClient;

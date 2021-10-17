import axios from 'axios';
import { IParams } from 'models/common';
import queryString from 'query-string';

const axiosFileClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : `http://localhost:8000/api`,
  headers: {
    'content-type': 'multipart/form-data',
  },
  paramsSerializer: (params: IParams) => queryString.stringify(params),
});

axiosFileClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error.response || error.message)
);

axiosFileClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  }
);
export default axiosFileClient;

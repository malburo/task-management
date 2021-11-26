import axios from 'axios';
import { IParams } from 'models/common';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : `http://localhost:8000/api`,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params: IParams) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error.response || error.message)
);

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // if (error.response.status === 403) {
    //   localStorage.removeItem('access_token');
    //   window.location.replace('/auth/login');
    // }
    if (error.response.status === 401) {
      window.location.replace('/unauthorized');
    }
    return Promise.reject(error.response.data.error || error.message);
  }
);
export default axiosClient;

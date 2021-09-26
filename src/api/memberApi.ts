import axiosClient from './axiosClient';

const memberApi = {
  create(payload: any): Promise<any> {
    return axiosClient.post('/members', payload);
  },
};

export default memberApi;

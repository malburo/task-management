import axiosClient from './axiosClient';

const uploadApi = {
  upload(payload: any): Promise<any> {
    return axiosClient.post('/uploads', payload);
  },
};

export default uploadApi;

import { Response, ResponseList } from 'models/common';
import axiosClient from './axiosClient';

const userApi = {
  getAll(params?: any): Promise<ResponseList<any>> {
    return axiosClient.get('/users', { params });
  },
  update(payload: any): Promise<Response<any>> {
    return axiosClient.put(`/users/${payload.userId}`, payload.data);
  },
};

export default userApi;

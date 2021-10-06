import { IParams, Response, ResponseList } from 'models/common';
import { IUser } from 'models/user';
import axiosClient from './axiosClient';

const userApi = {
  getAll(params?: IParams): Promise<ResponseList<IUser[]>> {
    return axiosClient.get('/users', { params });
  },
  getOne(params?: any): Promise<Response<IUser>> {
    return axiosClient.get('/users', { params });
  },
  update(payload: { userId: string; data: Partial<IUser> }): Promise<Response<IUser>> {
    return axiosClient.put(`/users/${payload.userId}`, payload.data);
  },
};

export default userApi;

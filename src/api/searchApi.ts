import { IParams, Response } from 'models/common';
import { IUser } from 'models/user';
import axiosClient from './axiosClient';

const searchApi = {
  searchUsers(params?: IParams): Promise<Response<IUser[]>> {
    return axiosClient.get('/search/users', { params });
  },
  searchNewMembers(boardId: string, params?: IParams): Promise<Response<IUser[]>> {
    return axiosClient.get(`/search/${boardId}/members`, { params });
  },
};

export default searchApi;

import { Response } from 'models/common';
import { IMember } from 'models/member';
import axiosClient from './axiosClient';

const memberApi = {
  create(payload: any): Promise<any> {
    return axiosClient.post('/members', payload);
  },
  getOne(boardId: string, userId: string): Promise<Response<IMember>> {
    return axiosClient.get(`/members/board/${boardId}/user/${userId}`);
  },
};

export default memberApi;

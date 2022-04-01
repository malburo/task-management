import { Response } from 'models/common';
import { IMessage } from 'models/messages';
import axiosClient from './axiosClient';

const messageApi = {
  create(payload: any): Promise<Response<IMessage>> {
    return axiosClient.post(`/messages`, payload);
  },
  getAll(payload: any): any {
    return axiosClient.get(`/messages/rooms/${payload.roomId}`, { params: payload.params });
  },
};

export default messageApi;

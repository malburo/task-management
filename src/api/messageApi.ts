import { Response } from 'models/common';
import { IMessage } from 'models/messages';
import axiosClient from './axiosClient';

const messageApi = {
  getAllInRoom(payload: any): Promise<any> {
    if (payload.seed == null) payload.seed = 0;
    return axiosClient.get(`messages/room/${payload.id}/${payload.seed}`);
  },
  create(payload: any): Promise<Response<IMessage>> {
    return axiosClient.post(`messages/`, payload);
  },
  update(payload: any): Promise<Response<IMessage>> {
    return axiosClient.put(`messages/${payload.messageId}`, payload);
  },
  deleteOne(payload: any): Promise<Response<IMessage>> {
    return axiosClient.delete(`messages/${payload.messageId}`);
  },
};

export default messageApi;

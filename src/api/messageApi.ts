import { Response } from 'models/common';
import { IMessage } from 'models/messages';
import axiosClient from './axiosClient';
import axiosFileClient from './axiosFileClient';

const messageApi = {
  getAllInRoom(payload: any): Promise<any> {
    if (payload.seed == null) payload.seed = 0;
    return axiosClient.get(`messages/room/${payload.id}/${payload.seed}`);
  },
  create(payload: any): Promise<Response<IMessage>> {
    return axiosClient.post(`messages/`, payload);
  },
  createImageMessage(payload: any): Promise<any> {
    const data = new FormData();
    data.append('file', payload.file);
    return axiosFileClient.post(`messages/image/${payload.roomId}`, data);
  },
  update(payload: any): Promise<Response<IMessage>> {
    return axiosClient.put(`messages/${payload.messageId}`, payload);
  },
  deleteOne(payload: any): Promise<Response<IMessage>> {
    return axiosClient.delete(`messages/${payload.messageId}`);
  },
  read(payload: any): Promise<any> {
    return axiosClient.patch(`messages/room/${payload.roomId}`);
  },
};

export default messageApi;

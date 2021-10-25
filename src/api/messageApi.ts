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
  createImageMessage(payload: any): Promise<Response<IMessage>> {
    const data = new FormData();
    data.append('file', payload.file, payload.file.name);
    return axiosClient.post(`messages/image/${payload.roomId}`, data);
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
  createFormMessage(payload: any): Promise<any> {
    return axiosClient.post(`messages/form/select/${payload.roomId}`, payload);
  },
  chooseOption(payload: any): Promise<any> {
    return axiosClient.put(`messages/form/select/${payload.roomId}/option`, payload);
  },
};

export default messageApi;

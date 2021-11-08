import { Response } from 'models/common';
import { IMessage } from 'models/messages';
import axiosClient from './axiosClient';

const messageApi = {
  getAllInRoom(id: string, seed: number): Promise<Response<IMessage[]>> {
    if (seed === null) seed = 0;
    return axiosClient.get(`messages/room/${id}/${seed}`);
  },
  create(payload: Pick<IMessage, '_id' | 'content'>): Promise<Response<IMessage>> {
    return axiosClient.post(`messages/`, payload);
  },
  createImageMessage(payload: any): Promise<Response<IMessage>> {
    const data = new FormData();
    data.append('file', payload.file, payload.file.name);
    return axiosClient.post(`messages/image/${payload.roomId}`, data);
  },
  update(payload: Pick<IMessage, '_id' | 'content'>): Promise<Response<IMessage>> {
    return axiosClient.put(`messages/${payload._id}`, payload);
  },
  deleteOne(messageId: string): Promise<Response<IMessage>> {
    return axiosClient.delete(`messages/${messageId}`);
  },
  // read(boardId: string): Promise<any> {
  //   return axiosClient.patch(`messages/room/${boardId}`);
  // },
  createFormMessage(payload: any): Promise<Response<IMessage>> {
    return axiosClient.post(`messages/form/select/${payload.roomId}`, payload);
  },
  chooseOption(roomId: string, optionId: string): Promise<any> {
    return axiosClient.put(`messages/form/select/${roomId}/option`, { optionId });
  },
  addOption(payload: { roomId: string; text: string; formId: string }): Promise<any> {
    return axiosClient.post(`messages/form/select/${payload.roomId}/option`, payload);
  },
};

export default messageApi;

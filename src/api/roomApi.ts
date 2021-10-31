import { IRoom } from 'models/room';
import axiosClient from './axiosClient';
import { Response } from 'models/common';

const roomApi = {
  createChanel(payload?: any): Promise<any> {
    return axiosClient.post('/rooms/channel', payload);
  },
  getOne(payload?: any): Promise<any> {
    return axiosClient.get(`/rooms/${payload}`);
  },
  getAllYourRoomInBoard(payload?: any): Promise<any> {
    return axiosClient.get(`/rooms/board/${payload.boardId}`);
  },
  addMember(payload?: any): Promise<any> {
    return axiosClient.post(`/rooms/board/${payload.boardId}/member`, payload);
  },
  removeMember(payload?: any): Promise<any> {
    return axiosClient.delete(`/rooms/board/${payload.boardId}/member`, payload);
  },
  getAllChannel(): Promise<any> {
    return axiosClient.get(`/rooms/channel`);
  },
  search(payload: { boardId: string; params: any }): Promise<any> {
    return axiosClient.get(`/rooms/board/${payload.boardId}/search`, { params: payload.params });
  },
  getGeneralRoom(payload: string): Promise<Response<IRoom>> {
    return axiosClient.get(`/rooms/board/${payload}/generalRoom`);
  },
};

export default roomApi;

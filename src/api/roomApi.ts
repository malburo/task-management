import { IRoom } from 'models/room';
import axiosClient from './axiosClient';
import { Response } from 'models/common';

const roomApi = {
  getOne(payload: string): Promise<Response<IRoom>> {
    return axiosClient.get(`/rooms/${payload}`);
  },
  getAllYourRoomInBoard(payload: string): Promise<Response<IRoom[]>> {
    return axiosClient.get(`/rooms/board/${payload}`);
  },
  addMember(payload?: any): Promise<Response<IRoom>> {
    return axiosClient.post(`/rooms/board/${payload.boardId}/member`, payload);
  },
  removeMember(payload?: any): Promise<Response<IRoom>> {
    return axiosClient.delete(`/rooms/board/${payload.boardId}/member`, payload);
  },
  search(payload: { boardId: string; params: any }): Promise<Response<IRoom[]>> {
    return axiosClient.get(`/rooms/board/${payload.boardId}/search`, { params: payload.params });
  },
  getGeneralRoom(payload: string): Promise<Response<IRoom>> {
    return axiosClient.get(`/rooms/board/${payload}/generalRoom`);
  },
};

export default roomApi;

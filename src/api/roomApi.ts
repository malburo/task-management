import { IRoom } from 'models/room';
import axiosClient from './axiosClient';
import { Response } from 'models/common';

const roomApi = {
  getOne(payload: any): Promise<Response<IRoom>> {
    return axiosClient.get(`/rooms/${payload.roomId}`);
  },
  getAll(payload: any): Promise<Response<IRoom[]>> {
    return axiosClient.get(`/rooms`, { params: payload });
  },
  getRoomByMemberId(payload: any): any {
    return axiosClient.get(`/rooms/members/${payload.memberId}`, { params: payload });
  },
};

export default roomApi;

import { Response } from 'models/common';
import axiosClient from './axiosClient';

const whiteboardApi = {
  getOne(whiteboardId: string): Promise<Response<any>> {
    return axiosClient.get(`/whiteboards/${whiteboardId}`);
  },
  getAll(payload: any): Promise<Response<any>> {
    return axiosClient.get(`/whiteboards`, { params: payload });
  },
  create(payload: any): Promise<Response<any>> {
    return axiosClient.post('/whiteboards', payload);
  },
  update(whiteboardId: string, payload: any): Promise<Response<any>> {
    return axiosClient.put(`/whiteboards/${whiteboardId}`, payload);
  },
};

export default whiteboardApi;

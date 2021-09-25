import { IBoard } from 'models/board';
import { Response, ResponseList } from 'models/common';
import axiosClient from './axiosClient';

const boardApi = {
  getAll(params?: any): Promise<ResponseList<any>> {
    return axiosClient.get('/boards', { params });
  },
  getOne(payload: any): Promise<Response<IBoard>> {
    return axiosClient.get(`/boards/${payload.boardId}`);
  },
  update(payload: any): Promise<Response<IBoard>> {
    return axiosClient.put(`/boards/${payload.boardId}`, payload.data);
  },
};

export default boardApi;

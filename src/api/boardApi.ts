import { IBoard } from 'models/board';
import { Response } from 'models/common';
import axiosClient from './axiosClient';

const boardApi = {
  getAll(): Promise<Response<IBoard[]>> {
    return axiosClient.get('/boards');
  },
  getOne(payload: any): Promise<Response<IBoard>> {
    return axiosClient.get(`/boards/${payload.boardId}`);
  },
  update(payload: any): Promise<Response<IBoard>> {
    return axiosClient.put(`/boards/${payload.boardId}`, payload.data);
  },
};

export default boardApi;

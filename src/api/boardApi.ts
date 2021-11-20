import { AddBoardFormValues } from 'features/Boards/components/board/AddBoard';
import { IBoard } from 'models/board';
import { Response, ResponseList, IParams } from 'models/common';
import axiosClient from './axiosClient';

const boardApi = {
  getAll(params?: IParams): Promise<ResponseList<IBoard[]>> {
    return axiosClient.get('/boards', { params });
  },
  getMyBoards(params?: IParams): Promise<ResponseList<IBoard[]>> {
    return axiosClient.get('/boards/myBoard/owner', { params });
  },
  getMyBoardsJoined(params?: IParams): Promise<ResponseList<IBoard[]>> {
    return axiosClient.get('/boards/myBoard/joined', { params });
  },
  getOne(payload: { boardId: string }): Promise<Response<IBoard>> {
    return axiosClient.get(`/boards/${payload.boardId}`);
  },
  create(payload: AddBoardFormValues): Promise<Response<IBoard>> {
    return axiosClient.post('/boards', payload);
  },
  update(payload: { boardId: string; data: Partial<IBoard> }): Promise<Response<IBoard>> {
    return axiosClient.put(`/boards/${payload.boardId}`, payload.data);
  },
};

export default boardApi;

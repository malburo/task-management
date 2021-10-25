import { AddColumnPayload } from 'features/Boards/components/form/AddColumn';
import { Response } from 'models/common';
import { IColumn } from './../models/column';
import axiosClient from './axiosClient';

const columnApi = {
  create(payload: AddColumnPayload): Promise<Response<IColumn>> {
    return axiosClient.post('/columns', payload);
  },
  update(payload: {
    columnId: string;
    data: Partial<IColumn> & { taskId?: string | null };
  }): Promise<Response<IColumn>> {
    return axiosClient.put(`/columns/${payload.columnId}`, payload.data);
  },
  deleteOne(payload: { columnId: string }): Promise<Response<IColumn>> {
    return axiosClient.delete(`/columns/${payload.columnId}`);
  },
};

export default columnApi;

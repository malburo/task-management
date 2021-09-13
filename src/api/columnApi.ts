import { Response } from 'models/common';
import { IColumn } from './../models/column';
import axiosClient from './axiosClient';

const columnApi = {
  update(payload: any): Promise<Response<IColumn>> {
    return axiosClient.put(`/columns/${payload.columnId}`, { taskOrder: payload.taskOrder, taskId: payload.taskId });
  },
};

export default columnApi;

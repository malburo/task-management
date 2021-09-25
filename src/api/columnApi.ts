import { Response } from 'models/common';
import { IColumn } from './../models/column';
import axiosClient from './axiosClient';

const columnApi = {
  update(payload: any): Promise<Response<IColumn>> {
    return axiosClient.put(`/columns/${payload.columnId}`, payload.data);
  },
};

export default columnApi;

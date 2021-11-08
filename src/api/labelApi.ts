import axiosClient from './axiosClient';

const labelApi = {
  create(payload: any): Promise<any> {
    return axiosClient.post(`/boards/${payload.boardId}/labels`, payload);
  },
  update(payload: any): Promise<any> {
    return axiosClient.put(`/boards/${payload.boardId}/labels/${payload.labelId}`, payload.data);
  },
};

export default labelApi;

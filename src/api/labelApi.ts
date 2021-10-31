import axiosClient from './axiosClient';

const labelApi = {
  create(payload: any): Promise<any> {
    return axiosClient.post(`/boards/${payload.boardId}/labels`, payload);
  },
};

export default labelApi;

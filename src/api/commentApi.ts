import axiosClient from './axiosClient';

const commentApi = {
  getByTaskId(payload: { taskId: string }): Promise<any> {
    return axiosClient.get(`/comments/tasks/${payload.taskId}`);
  },
  create(payload: any): Promise<any> {
    return axiosClient.post(`/comments`, payload);
  },
  update(payload: any): Promise<any> {
    return axiosClient.put(`/comments/${payload.commentId}`, payload.data);
  },
  deleteOne(payload: any): Promise<any> {
    return axiosClient.delete(`/comments/${payload.commentId}`, { data: payload.data });
  },
};

export default commentApi;

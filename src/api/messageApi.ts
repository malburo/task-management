import axiosClient from './axiosClient';

const messageApi = {
  getAllInRoom(payload: any): Promise<any> {
    if (payload.seed == null) payload.seed = 0;
    return axiosClient.get(`messages/room/${payload.id}/${payload.seed}`);
  },
  update(payload: any): Promise<any> {
    return axiosClient.put(`messages/${payload.messageId}`, payload);
  },
  deleteOne(payload: any): Promise<any> {
    return axiosClient.delete(`messages/${payload.messageId}`);
  },
};

export default messageApi;

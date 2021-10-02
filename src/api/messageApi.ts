import axiosClient from './axiosClient';

const messageApi = {
  getAllInRoom(payload: any): Promise<any> {
    return axiosClient.get(`messages/room/${payload}`);
  },
  update(payload: any): Promise<any> {
    console.log('call me');
    return axiosClient.put(`messages/${payload.messageId}`, payload);
  },
};

export default messageApi;

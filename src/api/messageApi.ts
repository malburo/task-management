import axiosClient from './axiosClient';

const messageApi = {
  getAllInRoom(payload: any): Promise<any> {
    return axiosClient.get(`messages/room/${payload}`);
  },
};

export default messageApi;

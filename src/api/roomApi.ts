import axiosClient from './axiosClient';

const roomApi = {
  createChanel(payload?: any): Promise<any> {
    return axiosClient.post('/rooms/channel', payload);
  },
  getOne(payload?: any): Promise<any> {
    return axiosClient.get(`/rooms/${payload}`);
  },
  getAllYourRoomInBoard(payload?: any): Promise<any> {
    return axiosClient.get(`/rooms/board/${payload.boardId}`);
  },
  addMember(payload?: any): Promise<any> {
    return axiosClient.post(`/rooms/board/${payload.boardId}/member`, payload);
  },
  removeMember(payload?: any): Promise<any> {
    return axiosClient.delete(`/rooms/board/${payload.boardId}/member`, payload);
  },
};

export default roomApi;

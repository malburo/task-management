import axiosClient from './axiosClient';

const notificationApi = {
  getAll(params: any): Promise<any> {
    return axiosClient.get(`/notifications`, { params });
  },
  deleteAll(): Promise<any> {
    return axiosClient.delete(`/notifications`);
  },
};

export default notificationApi;

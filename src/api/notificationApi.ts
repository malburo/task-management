import axiosClient from './axiosClient';

const notificationApi = {
  getAll(): Promise<any> {
    return axiosClient.get(`/notifications`);
  },
};

export default notificationApi;

import axiosClient from './axiosClient';

const notificationApi = {
  getAll(params: any): Promise<any> {
    return axiosClient.get(`/notifications`, { params });
  },
};

export default notificationApi;

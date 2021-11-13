import axiosClient from './axiosClient';

const activityApi = {
  getAllActivitiesInBoard(payload: { boardId: string }): Promise<any> {
    return axiosClient.get(`/boards/${payload.boardId}/activities`);
  },
};

export default activityApi;

import axiosClient from './axiosClient';

const activityApi = {
  getAllActivitiesInBoard(payload: { boardId: string }): Promise<any> {
    return axiosClient.get(`/boards/${payload.boardId}/activities`);
  },
  getByMember(payload: { boardId: string; memberId: string }): Promise<any> {
    return axiosClient.get(`/boards/${payload.boardId}/activities/members/${payload.memberId}`);
  },
};

export default activityApi;
